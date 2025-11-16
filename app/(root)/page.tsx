import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import ScheduledInterviewCard from "@/components/ScheduledInterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getScheduledInterviews,
  getIncompleteInterviews,
  checkAndUpdateExpiredInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  // Check and update expired interviews first
  await checkAndUpdateExpiredInterviews(user?.id!);

  const [userInterviews, allInterview, scheduledInterviews, incompleteInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
    getScheduledInterviews(user?.id!),
    getIncompleteInterviews(user?.id!),
  ]);

  // Filter out scheduled and incomplete from user interviews
  const completedInterviews = userInterviews?.filter(
    (interview) => interview.status === "completed" || interview.scheduleType === "now"
  ) || [];

  const hasPastInterviews = (completedInterviews?.length || 0) > 0;
  const hasUpcomingInterviews = (allInterview?.length || 0) > 0;
  const hasScheduledInterviews = (scheduledInterviews?.length || 0) > 0;
  const hasIncompleteInterviews = (incompleteInterviews?.length || 0) > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Scheduled Interviews Section */}
      {hasScheduledInterviews && (
        <section id="scheduled" className="flex flex-col gap-6 mt-8 scroll-mt-8">
          <div className="flex items-center gap-3">
            <h2>📅 Scheduled Interviews</h2>
            <span className="px-3 py-1 bg-primary-200/20 rounded-full text-primary-200 text-sm font-medium">
              {scheduledInterviews?.length}
            </span>
          </div>

          <div className="interviews-section">
            {scheduledInterviews?.map((interview) => (
              <ScheduledInterviewCard
                key={interview.id}
                interview={interview}
              />
            ))}
          </div>
        </section>
      )}

      {/* Incomplete Interviews Section */}
      {hasIncompleteInterviews && (
        <section className="flex flex-col gap-6 mt-8">
          <div className="flex items-center gap-3">
            <h2>⏰ Incomplete Interviews</h2>
            <span className="px-3 py-1 bg-destructive-100/20 rounded-full text-destructive-100 text-sm font-medium">
              {incompleteInterviews?.length}
            </span>
          </div>

          <div className="interviews-section">
            {incompleteInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.scheduledFor || interview.createdAt}
              />
            ))}
          </div>
          <p className="text-light-400 text-sm">
            ⚠️ These interviews were not started within 5 minutes of the scheduled time
          </p>
        </section>
      )}

      <section id="history" className="flex flex-col gap-6 mt-8 scroll-mt-8">
        <h2>Your Completed Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            completedInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t completed any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
