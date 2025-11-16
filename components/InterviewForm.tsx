"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Briefcase, TrendingUp, Target, Code, Hash, Sparkles, ArrowRight, RotateCcw, Calendar, Clock } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";

const interviewFormSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters"),
  level: z.enum(["Junior", "Mid-Level", "Senior", "Lead"]),
  type: z.enum(["Technical", "Behavioral", "Mixed"]),
  techstack: z.string().min(2, "Please enter at least one technology"),
  amount: z.string().min(1, "Please select number of questions"),
  scheduleType: z.enum(["now", "later"]),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
}).refine((data) => {
  if (data.scheduleType === "later") {
    return data.scheduledDate && data.scheduledTime;
  }
  return true;
}, {
  message: "Please select date and time for scheduled interview",
  path: ["scheduledDate"],
});

interface InterviewFormProps {
  userId: string;
  userName: string;
}

const InterviewForm = ({ userId, userName }: InterviewFormProps) => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInterview, setGeneratedInterview] = useState<any>(null);

  const form = useForm<z.infer<typeof interviewFormSchema>>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      role: "",
      level: "Junior",
      type: "Mixed",
      techstack: "",
      amount: "5",
      scheduleType: "now",
      scheduledDate: "",
      scheduledTime: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof interviewFormSchema>) => {
    setIsGenerating(true);

    try {
      // Calculate scheduled timestamp if scheduling for later
      let scheduledFor = null;
      if (data.scheduleType === "later" && data.scheduledDate && data.scheduledTime) {
        scheduledFor = new Date(`${data.scheduledDate}T${data.scheduledTime}`).toISOString();
      }

      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userid: userId,
          scheduledFor,
          scheduleType: data.scheduleType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (data.scheduleType === "later") {
          toast.success("Interview scheduled successfully!");
          router.push("/"); // Redirect to dashboard
        } else {
          toast.success("Interview questions generated successfully!");
          // Fetch the latest interview for this user
          const interviewsResponse = await fetch(`/api/interviews?userId=${userId}`);
          const interviews = await interviewsResponse.json();
          
          if (interviews.length > 0) {
            setGeneratedInterview(interviews[0]);
          }
        }
      } else {
        toast.error("Failed to generate interview questions");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while generating questions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartVoiceInterview = () => {
    if (generatedInterview) {
      router.push(`/interview/${generatedInterview.id}`);
    }
  };

  if (generatedInterview) {
    return (
      <div className="card-border max-w-4xl">
        <div className="card p-8">
          <h3 className="mb-6">Generated Interview Questions</h3>
          
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-light-400 text-sm">Role</p>
              <p className="text-white font-semibold">{generatedInterview.role}</p>
            </div>
            
            <div>
              <p className="text-light-400 text-sm">Level</p>
              <p className="text-white font-semibold">{generatedInterview.level}</p>
            </div>
            
            <div>
              <p className="text-light-400 text-sm">Type</p>
              <p className="text-white font-semibold">{generatedInterview.type}</p>
            </div>
            
            <div>
              <p className="text-light-400 text-sm">Tech Stack</p>
              <p className="text-white font-semibold">{generatedInterview.techstack.join(", ")}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Questions:</h4>
            <ol className="space-y-3">
              {generatedInterview.questions.map((question: string, index: number) => (
                <li key={index} className="text-light-100">
                  <span className="text-primary-200 font-bold">{index + 1}.</span> {question}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleStartVoiceInterview}
              className="btn-primary flex-1"
            >
              Start Voice Interview
            </Button>
            
            <Button 
              onClick={() => setGeneratedInterview(null)}
              className="btn-secondary flex-1"
            >
              Create Another Interview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="card-border">
        <div className="card p-6 sm:p-8 lg:p-10">
          {/* Form Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-200/10 rounded-2xl mb-4">
              <Sparkles className="w-7 h-7 text-primary-200" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Customize Your Interview</h3>
            <p className="text-light-400">Fill in the details to generate personalized questions</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Job Role Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <Briefcase className="w-4 h-4 text-primary-200" />
                  Job Role
                </label>
                <FormField
                  control={form.control}
                  name="role"
                  placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
                  type="text"
                />
                {form.formState.errors.role && (
                  <p className="text-destructive-100 text-sm">{form.formState.errors.role.message}</p>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <TrendingUp className="w-4 h-4 text-primary-200" />
                  Experience Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "Junior", icon: "🌱", label: "Junior" },
                    { value: "Mid-Level", icon: "📈", label: "Mid-Level" },
                    { value: "Senior", icon: "⭐", label: "Senior" },
                    { value: "Lead", icon: "👑", label: "Lead" }
                  ].map((level) => (
                    <label
                      key={level.value}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${form.watch("level") === level.value 
                          ? "border-primary-200 bg-primary-200/10 shadow-lg shadow-primary-200/20" 
                          : "border-light-800/20 hover:border-primary-200/50 bg-dark-200/30 hover:bg-dark-200/50"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={level.value}
                        {...form.register("level")}
                        className="sr-only"
                      />
                      <div className="text-3xl mb-2">{level.icon}</div>
                      <div className={`text-sm font-medium text-center ${form.watch("level") === level.value ? "text-primary-200" : "text-light-100"}`}>
                        {level.label}
                      </div>
                      {form.watch("level") === level.value && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Interview Type */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <Target className="w-4 h-4 text-primary-200" />
                  Interview Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "Technical", icon: "💻", label: "Technical", desc: "Code & System Design" },
                    { value: "Behavioral", icon: "🧠", label: "Behavioral", desc: "Soft Skills & Experience" },
                    { value: "Mixed", icon: "🎯", label: "Mixed", desc: "Both Technical & Behavioral" }
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`
                        relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all
                        ${form.watch("type") === type.value 
                          ? "border-primary-200 bg-primary-200/10 shadow-lg shadow-primary-200/20" 
                          : "border-light-800/20 hover:border-primary-200/50 bg-dark-200/30 hover:bg-dark-200/50"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...form.register("type")}
                        className="sr-only"
                      />
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className={`text-base font-semibold mb-1 ${form.watch("type") === type.value ? "text-primary-200" : "text-white"}`}>
                        {type.label}
                      </div>
                      <div className="text-xs text-light-400 text-center">
                        {type.desc}
                      </div>
                      {form.watch("type") === type.value && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tech Stack Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <Code className="w-4 h-4 text-primary-200" />
                  Tech Stack
                </label>
                <FormField
                  control={form.control}
                  name="techstack"
                  placeholder="e.g., React, Node.js, Python, AWS (comma separated)"
                  type="text"
                />
                {form.formState.errors.techstack && (
                  <p className="text-destructive-100 text-sm">{form.formState.errors.techstack.message}</p>
                )}
                <p className="text-light-400 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Separate multiple technologies with commas
                </p>
              </div>

              {/* Number of Questions */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <Hash className="w-4 h-4 text-primary-200" />
                  Number of Questions
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["3", "5", "7", "10"].map((num) => (
                    <label
                      key={num}
                      className={`
                        relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${form.watch("amount") === num 
                          ? "border-primary-200 bg-primary-200/10" 
                          : "border-light-800/20 hover:border-primary-200/50 bg-dark-200/30"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={num}
                        {...form.register("amount")}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${form.watch("amount") === num ? "text-primary-200" : "text-white"}`}>
                          {num}
                        </div>
                        <div className="text-xs text-light-400 mt-1">Questions</div>
                      </div>
                      {form.watch("amount") === num && (
                        <div className="absolute top-2 right-2">
                          <svg className="w-4 h-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Schedule Type */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                  <Calendar className="w-4 h-4 text-primary-200" />
                  When would you like to take this interview?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: "now", icon: "⚡", label: "Start Now", desc: "Begin interview immediately" },
                    { value: "later", icon: "📅", label: "Schedule for Later", desc: "Pick a date and time" }
                  ].map((schedule) => (
                    <label
                      key={schedule.value}
                      className={`
                        relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all
                        ${form.watch("scheduleType") === schedule.value 
                          ? "border-primary-200 bg-primary-200/10 shadow-lg shadow-primary-200/20" 
                          : "border-light-800/20 hover:border-primary-200/50 bg-dark-200/30 hover:bg-dark-200/50"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={schedule.value}
                        {...form.register("scheduleType")}
                        className="sr-only"
                      />
                      <div className="text-4xl mb-3">{schedule.icon}</div>
                      <div className={`text-base font-semibold mb-1 ${form.watch("scheduleType") === schedule.value ? "text-primary-200" : "text-white"}`}>
                        {schedule.label}
                      </div>
                      <div className="text-xs text-light-400 text-center">
                        {schedule.desc}
                      </div>
                      {form.watch("scheduleType") === schedule.value && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time Picker (shown only when scheduling for later) */}
              {form.watch("scheduleType") === "later" && (
                <div className="space-y-4 p-5 bg-dark-200/30 rounded-xl border border-primary-200/20 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                        <Calendar className="w-4 h-4 text-primary-200" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        {...form.register("scheduledDate")}
                        min={new Date().toISOString().split('T')[0]}
                        className="input w-full"
                      />
                      {form.formState.errors.scheduledDate && (
                        <p className="text-destructive-100 text-sm">{form.formState.errors.scheduledDate.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-light-100 font-medium text-sm">
                        <Clock className="w-4 h-4 text-primary-200" />
                        Select Time
                      </label>
                      <input
                        type="time"
                        {...form.register("scheduledTime")}
                        className="input w-full"
                      />
                      {form.formState.errors.scheduledTime && (
                        <p className="text-destructive-100 text-sm">{form.formState.errors.scheduledTime.message}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-light-400 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    You'll have 5 minutes after the scheduled time to start the interview
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="btn w-full group relative overflow-hidden"
                  disabled={isGenerating}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Your Questions...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Interview Questions
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {!isGenerating && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-200/0 via-primary-200/20 to-primary-200/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                </Button>
              </div>

              {/* Helper Text */}
              <div className="text-center pt-2">
                <p className="text-light-400 text-sm">
                  ✨ AI will generate personalized questions based on your inputs
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
