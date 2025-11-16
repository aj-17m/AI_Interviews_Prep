import { getCurrentUser } from "@/lib/actions/auth.action";
import { User, Mail, Shield, Bell, Palette } from "lucide-react";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  const settingsSections = [
    {
      title: "Profile Information",
      icon: User,
      items: [
        { label: "Full Name", value: user?.name || "Not set" },
        { label: "Email Address", value: user?.email || "Not set" },
        { label: "User ID", value: user?.id || "Not set" },
      ],
    },
    {
      title: "Account Security",
      icon: Shield,
      items: [
        { label: "Password", value: "••••••••" },
        { label: "Two-Factor Auth", value: "Disabled" },
        { label: "Active Sessions", value: "1 device" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Email Notifications", value: "Enabled" },
        { label: "Interview Reminders", value: "Enabled" },
        { label: "Performance Updates", value: "Enabled" },
      ],
    },
    {
      title: "Preferences",
      icon: Palette,
      items: [
        { label: "Theme", value: "Dark Mode" },
        { label: "Language", value: "English" },
        { label: "Timezone", value: "Auto-detect" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-light-400">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card-border max-w-4xl">
        <div className="card p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-primary-200/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{user?.name || "User"}</h2>
              <p className="text-light-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary">
              Edit Profile
            </button>
            <button className="btn-secondary">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="card-border">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-200/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary-200" />
                  </div>
                  <h3 className="text-lg font-bold">{section.title}</h3>
                </div>

                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center p-3 bg-dark-200/30 rounded-lg hover:bg-dark-200/50 transition-colors"
                    >
                      <span className="text-sm text-light-100">{item.label}</span>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="card-border max-w-4xl border-destructive-100/30">
        <div className="card p-6 border border-destructive-100/20">
          <h3 className="text-lg font-bold text-destructive-100 mb-4">Danger Zone</h3>
          <p className="text-light-400 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-4 py-2 bg-destructive-100/10 text-destructive-100 rounded-lg hover:bg-destructive-100/20 transition-colors text-sm font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
