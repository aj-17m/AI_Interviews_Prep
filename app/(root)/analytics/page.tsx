import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { BarChart3, TrendingUp, Award, Clock, Target, Calendar } from "lucide-react";

const AnalyticsPage = async () => {
  const user = await getCurrentUser();
  const interviews = await getInterviewsByUserId(user?.id!);

  const totalInterviews = interviews?.length || 0;
  const completedInterviews = interviews?.filter(
    (i) => i.status === "completed" || i.scheduleType === "now"
  ).length || 0;
  const scheduledInterviews = interviews?.filter((i) => i.status === "scheduled").length || 0;
  const incompleteInterviews = interviews?.filter((i) => i.status === "incomplete").length || 0;

  // Calculate tech stack frequency
  const techStackCount: Record<string, number> = {};
  interviews?.forEach((interview) => {
    interview.techstack.forEach((tech) => {
      techStackCount[tech] = (techStackCount[tech] || 0) + 1;
    });
  });

  const topTechStacks = Object.entries(techStackCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Calculate interview types
  const typeCount: Record<string, number> = {};
  interviews?.forEach((interview) => {
    typeCount[interview.type] = (typeCount[interview.type] || 0) + 1;
  });

  const stats = [
    {
      label: "Total Interviews",
      value: totalInterviews,
      icon: BarChart3,
      color: "text-primary-200",
      bgColor: "bg-primary-200/10",
    },
    {
      label: "Completed",
      value: completedInterviews,
      icon: Award,
      color: "text-success-100",
      bgColor: "bg-success-100/10",
    },
    {
      label: "Scheduled",
      value: scheduledInterviews,
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Incomplete",
      value: incompleteInterviews,
      icon: Clock,
      color: "text-destructive-100",
      bgColor: "bg-destructive-100/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-light-400">Track your interview preparation progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="card-border"
            >
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-5 h-5 text-light-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-light-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Technologies */}
        <div className="card-border">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary-200" />
              <h3 className="text-xl font-bold">Top Technologies</h3>
            </div>

            {topTechStacks.length > 0 ? (
              <div className="space-y-4">
                {topTechStacks.map(([tech, count]) => {
                  const percentage = (count / totalInterviews) * 100;
                  return (
                    <div key={tech}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-light-100">{tech}</span>
                        <span className="text-sm font-bold text-primary-200">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-200 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-light-400 text-center py-8">
                No data available yet. Start taking interviews!
              </p>
            )}
          </div>
        </div>

        {/* Interview Types */}
        <div className="card-border">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary-200" />
              <h3 className="text-xl font-bold">Interview Types</h3>
            </div>

            {Object.keys(typeCount).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(typeCount).map(([type, count]) => {
                  const percentage = (count / totalInterviews) * 100;
                  return (
                    <div key={type}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-light-100">{type}</span>
                        <span className="text-sm font-bold text-primary-200">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-200 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-light-400 text-center py-8">
                No data available yet. Start taking interviews!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-border">
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>

          {interviews && interviews.length > 0 ? (
            <div className="space-y-3">
              {interviews.slice(0, 5).map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between p-4 bg-dark-200/30 rounded-xl hover:bg-dark-200/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-200/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white capitalize">
                        {interview.role}
                      </p>
                      <p className="text-xs text-light-400">
                        {interview.type} • {interview.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-light-400">
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interview.status === "completed"
                          ? "bg-success-100/20 text-success-100"
                          : interview.status === "scheduled"
                          ? "bg-blue-400/20 text-blue-400"
                          : "bg-destructive-100/20 text-destructive-100"
                      }`}
                    >
                      {interview.status || "completed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-light-400 text-center py-8">
              No interviews yet. Create your first interview to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
