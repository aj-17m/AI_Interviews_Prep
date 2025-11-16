"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { getAdminDB } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const db = getAdminDB();
    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const db = getAdminDB();
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const db = getAdminDB();
  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const db = getAdminDB();
  // Simplified query to avoid complex index requirement
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .limit(limit)
    .get();

  // Filter out current user's interviews in memory
  const filteredInterviews = interviews.docs
    .filter((doc) => doc.data().userId !== userId)
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  // Sort by createdAt in memory
  filteredInterviews.sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return filteredInterviews as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const db = getAdminDB();
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getScheduledInterviews(
  userId: string
): Promise<Interview[] | null> {
  const db = getAdminDB();
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .where("status", "==", "scheduled")
    .get();

  // Sort in memory to avoid composite index requirement
  const interviewList = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];

  return interviewList.sort((a, b) => {
    if (!a.scheduledFor || !b.scheduledFor) return 0;
    return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
  });
}

export async function getIncompleteInterviews(
  userId: string
): Promise<Interview[] | null> {
  const db = getAdminDB();
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .where("status", "==", "incomplete")
    .get();

  // Sort in memory to avoid composite index requirement
  const interviewList = interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];

  return interviewList.sort((a, b) => {
    if (!a.scheduledFor || !b.scheduledFor) return 0;
    return new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime();
  });
}

export async function updateInterviewStatus(
  interviewId: string,
  status: string
): Promise<{ success: boolean }> {
  try {
    const db = getAdminDB();
    await db.collection("interviews").doc(interviewId).update({
      status,
      startedAt: status === "in-progress" ? new Date().toISOString() : null,
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating interview status:", error);
    return { success: false };
  }
}

export async function checkAndUpdateExpiredInterviews(
  userId: string
): Promise<void> {
  try {
    const db = getAdminDB();
    const now = new Date();
    
    // Get all scheduled interviews
    const scheduledInterviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .where("status", "==", "scheduled")
      .get();

    // Check each interview and mark as incomplete if past 5-minute window
    const batch = db.batch();
    scheduledInterviews.docs.forEach((doc) => {
      const interview = doc.data();
      if (interview.scheduledFor) {
        const scheduledTime = new Date(interview.scheduledFor);
        const minutesPassed = (now.getTime() - scheduledTime.getTime()) / (1000 * 60);
        
        if (minutesPassed > 5) {
          batch.update(doc.ref, { status: "incomplete" });
        }
      }
    });

    await batch.commit();
  } catch (error) {
    console.error("Error checking expired interviews:", error);
  }
}
