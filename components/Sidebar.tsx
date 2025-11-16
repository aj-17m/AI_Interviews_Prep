"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, History, User, LogOut, Plus, BarChart3, Settings } from "lucide-react";
import { toast } from "sonner";

import { signOut } from "@/lib/actions/auth.action";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

const Sidebar = ({ userName, userEmail }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      description: "Dashboard overview",
    },
    {
      label: "New Interview",
      icon: Plus,
      href: "/interview",
      description: "Create interview",
    },
    {
      label: "Scheduled",
      icon: Calendar,
      href: "/#scheduled",
      description: "Upcoming interviews",
    },
    {
      label: "History",
      icon: History,
      href: "/#history",
      description: "Past interviews",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      description: "Performance stats",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-200 border-r border-light-800/20 flex flex-col z-50 max-lg:hidden">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-light-800/20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-200/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">PrepWise</h2>
            <p className="text-xs text-light-400">AI Interview Prep</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-light-800/20">
        <div className="flex items-center gap-3 p-3 bg-dark-300 rounded-xl">
          <div className="w-10 h-10 bg-primary-200/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-200" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {userName || "User"}
            </p>
            <p className="text-xs text-light-400 truncate">
              {userEmail || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${active 
                    ? "bg-primary-200/10 text-primary-200 shadow-lg shadow-primary-200/10" 
                    : "text-light-100 hover:bg-dark-300 hover:text-white"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${active ? "text-primary-200" : "text-light-400 group-hover:text-primary-200"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-light-400">{item.description}</p>
                </div>
                {active && (
                  <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-dark-300 rounded-xl border border-light-800/20">
          <p className="text-xs text-light-400 mb-3">Quick Stats</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-light-100">Total Interviews</span>
              <span className="text-sm font-bold text-primary-200">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-light-100">Avg Score</span>
              <span className="text-sm font-bold text-primary-200">-</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-light-800/20 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-light-100 hover:bg-dark-300 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5 text-light-400" />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive-100 hover:bg-destructive-100/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
