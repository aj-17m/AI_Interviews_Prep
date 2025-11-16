import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
        <div className="inline-block mb-4">
          <div className="px-4 py-2 bg-primary-200/10 rounded-full border border-primary-200/20">
            <p className="text-primary-200 text-sm font-medium">AI-Powered Interview Prep</p>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-light-100 bg-clip-text text-transparent">
          Create Your Interview
        </h1>
        <p className="text-light-400 text-base sm:text-lg">
          Customize your practice session with AI-generated questions tailored to your role
        </p>
      </div>

      {/* Interview Form */}
      <InterviewForm userId={user?.id!} userName={user?.name!} />
    </div>
  );
};

export default Page;
