"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";

const interviewFormSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters"),
  level: z.enum(["Junior", "Mid-Level", "Senior", "Lead"]),
  type: z.enum(["Technical", "Behavioral", "Mixed"]),
  techstack: z.string().min(2, "Please enter at least one technology"),
  amount: z.string().min(1, "Please select number of questions"),
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
    },
  });

  const onSubmit = async (data: z.infer<typeof interviewFormSchema>) => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userid: userId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Interview questions generated successfully!");
        // Fetch the latest interview for this user
        const interviewsResponse = await fetch(`/api/interviews?userId=${userId}`);
        const interviews = await interviewsResponse.json();
        
        if (interviews.length > 0) {
          setGeneratedInterview(interviews[0]);
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
    <div className="card-border max-w-2xl">
      <div className="card p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 form">
            <FormField
              control={form.control}
              name="role"
              label="Job Role"
              placeholder="e.g., Frontend Developer, Data Scientist"
              type="text"
            />

            <div>
              <label className="label block mb-2">Experience Level</label>
              <select
                {...form.register("level")}
                className="input w-full"
              >
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div>
              <label className="label block mb-2">Interview Type</label>
              <select
                {...form.register("type")}
                className="input w-full"
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <FormField
              control={form.control}
              name="techstack"
              label="Tech Stack"
              placeholder="e.g., React, Node.js, Python (comma separated)"
              type="text"
            />

            <div>
              <label className="label block mb-2">Number of Questions</label>
              <select
                {...form.register("amount")}
                className="input w-full"
              >
                <option value="3">3 Questions</option>
                <option value="5">5 Questions</option>
                <option value="7">7 Questions</option>
                <option value="10">10 Questions</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="btn w-full"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating Questions..." : "Generate Interview Questions"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm;
