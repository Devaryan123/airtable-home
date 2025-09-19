"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="w-full flex items-center justify-center h-15 shadow-md shadow-muted/20 fixed bg-sidebar top-0 left-0 z-50 border-b-1">
      <div className="w-[98%] flex items-center justify-between">
        <div className="flex h-5 items-center space-x-3 md:space-x-5 text-sm">
            <SidebarTrigger />
            <Image src="/Airtable_Logo.png" width={70} height={70} alt="airtable" className="md:w-30"></Image>
          
          <Separator orientation="vertical" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
