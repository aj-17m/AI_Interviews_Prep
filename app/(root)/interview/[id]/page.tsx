import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
  updateInterviewStatus,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  // Check if interview is scheduled and if it's time to start
  if (interview.status === "scheduled" && interview.scheduledFor) {
    const scheduledTime = new Date(interview.scheduledFor);
    const now = new Date();
    const minutesPassed = (now.getTime() - scheduledTime.getTime()) / (1000 * 60);
    
    // If scheduled time hasn't arrived yet
    if (minutesPassed < 0) {
      redirect("/?error=too-early");
    }
    
    // If more than 5 minutes have passed
    if (minutesPassed > 5) {
      // Mark as incomplete and redirect
      await updateInterviewStatus(id, "incomplete");
      redirect("/?error=expired");
    }
    
    // Update status to in-progress
    await updateInterviewStatus(id, "in-progress");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name || "Ajay"}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
