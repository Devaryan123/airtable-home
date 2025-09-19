import AppSidebar from "@/components/Sidebar";
import TopBar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <TopBar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;