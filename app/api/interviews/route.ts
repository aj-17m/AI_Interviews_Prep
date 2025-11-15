import { NextRequest } from "next/server";
import { db } from "@/firebase/admin";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    const interviewData = interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(interviewData, { status: 200 });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return Response.json({ error: "Failed to fetch interviews" }, { status: 500 });
  }
}
