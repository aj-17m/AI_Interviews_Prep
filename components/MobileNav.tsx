"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, Calendar, History, Plus, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { signOut } from "@/lib/actions/auth.action";

interface MobileNavProps {
  userName?: string;
}

const MobileNav = ({ userName }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
    { label: "Home", icon: Home, href: "/" },
    { label: "New Interview", icon: Plus, href: "/interview" },
    { label: "Scheduled", icon: Calendar, href: "/#scheduled" },
    { label: "History", icon: History, href: "/#history" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-200 border-b border-light-800/20 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-bold text-white">PrepWise</h2>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-dark-300 transition-colors"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-dark-200 border-l border-light-800/20 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* User Info */}
        <div className="p-4 border-b border-light-800/20">
          <div className="flex items-center gap-3 p-3 bg-dark-300 rounded-xl">
            <div className="w-10 h-10 bg-primary-200/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {userName || "User"}
              </p>
              <p className="text-xs text-light-400">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${active 
                      ? "bg-primary-200/10 text-primary-200" 
                      : "text-light-100 hover:bg-dark-300 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-light-800/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive-100 hover:bg-destructive-100/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
