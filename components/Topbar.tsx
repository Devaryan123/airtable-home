"use client";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@stackframe/stack";
import {
    Bell,
    CircleQuestionMark
} from "lucide-react";
import Image from "next/image";
import { Avatar } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const TopBar = () => {
  return (
    <div className="w-full flex items-center justify-center h-15 shadow-md shadow-muted/20 fixed bg-sidebar top-0 left-0 z-50 border-b">
      <div className="w-[98%] flex items-center justify-between">
        {/* Left side: Sidebar + Logo */}
        <div className="flex h-5 items-center space-x-3 md:space-x-5 text-sm">
          <SidebarTrigger />
          <Image
            src="/Airtable_Logo.png"
            width={70}
            height={70}
            alt="airtable"
            className="md:w-30"
          />
          <Separator orientation="vertical" />
        </div>

        {/* Center: Search bar */}
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background shadow-sm"
          />
        </div>

        {/* Right side: You can add profile/settings buttons later */}
        <div className="flex items-center space-x-4">
          <button className="">
            <CircleQuestionMark strokeWidth={1.5} />
          </button>
          <button className="border rounded-full">
            <Bell strokeWidth={1.5} className="p-1" />
          </button>
          {/* Example placeholder */}
          <Avatar className="pb-2">
            <UserButton showUserInfo={true} />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
