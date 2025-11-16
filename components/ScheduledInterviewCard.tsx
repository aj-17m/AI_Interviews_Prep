"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Briefcase } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button } from "./ui/button";

dayjs.extend(relativeTime);

interface ScheduledInterviewCardProps {
  interview: Interview;
}

const ScheduledInterviewCard = ({ interview }: ScheduledInterviewCardProps) => {
  const router = useRouter();
  
  // Add null check for scheduledFor
  if (!interview.scheduledFor) {
    return null;
  }
  
  const scheduledTime = dayjs(interview.scheduledFor);
  const now = dayjs();
  const canStart = now.isAfter(scheduledTime) && now.diff(scheduledTime, "minute") <= 5;
  const isPast = now.diff(scheduledTime, "minute") > 5;

  const handleStartInterview = () => {
    if (canStart) {
      router.push(`/interview/${interview.id}`);
    }
  };

  return (
    <div className="card-interview group hover:scale-[1.02] transition-transform">
      {/* Cover Image */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden rounded-t-2xl">
        <Image
          src={interview.coverImage || "/covers/default.png"}
          alt="cover"
          width={400}
          height={128}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-100"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-20">
        {/* Badge */}
        <div className="inline-block px-3 py-1 bg-primary-200/20 rounded-full border border-primary-200/30 mb-4">
          <span className="badge-text text-primary-200">📅 Scheduled</span>
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-primary-200" />
          <h3 className="text-xl font-bold capitalize">{interview.role}</h3>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-light-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{scheduledTime.format("MMM D, YYYY")}</span>
          </div>
          <div className="flex items-center gap-2 text-light-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{scheduledTime.format("h:mm A")}</span>
            <span className="text-primary-200">({scheduledTime.fromNow()})</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {interview.techstack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-dark-200/50 rounded-lg text-xs text-light-100 border border-light-800/20"
              >
                {tech}
              </span>
            ))}
            {interview.techstack.length > 5 && (
              <span className="px-3 py-1 bg-dark-200/50 rounded-lg text-xs text-light-400">
                +{interview.techstack.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Interview Type */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-dark-200/50 rounded-lg text-sm">
            {interview.type}
          </span>
          <span className="px-3 py-1 bg-dark-200/50 rounded-lg text-sm">
            {interview.level}
          </span>
        </div>

        {/* Action Button */}
        {canStart ? (
          <Button
            onClick={handleStartInterview}
            className="btn-primary w-full"
          >
            Start Interview Now
          </Button>
        ) : isPast ? (
          <div className="text-center p-3 bg-destructive-100/10 rounded-lg border border-destructive-100/30">
            <p className="text-destructive-100 text-sm">
              ⏰ Time window expired (5 min limit)
            </p>
          </div>
        ) : (
          <div className="text-center p-3 bg-primary-200/10 rounded-lg border border-primary-200/30">
            <p className="text-primary-200 text-sm">
              ⏳ Available {scheduledTime.fromNow()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledInterviewCard;
