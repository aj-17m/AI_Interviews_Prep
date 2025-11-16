import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Desktop Sidebar */}
      <Sidebar userName={user?.name} userEmail={user?.email} />

      {/* Mobile Navigation */}
      <MobileNav userName={user?.name} />

      {/* Main Content */}
      <main className="lg:ml-64 pt-0 lg:pt-0 min-h-screen">
        <div className="max-lg:pt-16">
          <div className="root-layout">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
