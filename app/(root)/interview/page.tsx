import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="text-center mb-8">
        <h2>Create New Interview</h2>
        <p className="mt-2">Fill in the details to generate your personalized interview questions</p>
      </div>

      <InterviewForm userId={user?.id!} userName={user?.name!} />
    </div>
  );
};

export default Page;
