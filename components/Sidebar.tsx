import { Separator } from "@/components/ui/separator";
import {
    BookOpen,
    ChevronDown,
    Download,
    Forward,
    Home,
    Plus,
    ShoppingBag,
    Star,
    Users2
} from "lucide-react";
import Image from "next/image";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar";
// import { SelectedTeamSwitcher, UserButton } from "@stackframe/stack";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const main = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
];
const general = [
  {
    title: "Shared",
    url: "#",
    icon: Forward,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="pt-10 bg-sidebar">
      <SidebarHeader>
         <Image src="/Airtable_Logo.png" width={100} height={100} alt="Logo" className="m-3 md:hidden pb-3" />
        {/* <Image src={"/AJ_logo.svg"} alt="" width={100} height={100} /> */}
        {/* <SelectedTeamSwitcher /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="pb-1">
              {main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="space-x-2">
                      <item.icon strokeWidth={1.5} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton className="pt-1 mt-1 space-x-2"><Star strokeWidth={1.5}/><span>Starred </span> <ChevronDown strokeWidth={1.5}/></SidebarMenuSubButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem className="flex justify-center items-center gap-1 p-1"><Star strokeWidth={1.5} className="border p-0.5 rounded-sm" /><span className="font-sans font-light line-clamp-1 hover:line-clamp-none">Your starred items will appear here</span></SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="pb-1">
              {general.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="space-x-2 ">
                      <item.icon strokeWidth={1.5} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton className="pt-1 mt-2 space-x-2">
                      <Users2 strokeWidth={1.5}/>
                      <span>Workspaces </span> <Plus strokeWidth={1.5}/><ChevronDown strokeWidth={1.5}/>
                    </SidebarMenuSubButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem className="flex justify-center items-center gap-1">
                        <Users2
                          strokeWidth={1.2}
                          className="border p-0.5 rounded-sm"
                        />
                        <span className="font-sans font-light p-1 ">
                          My First Workspace
                        </span>
                      </SidebarMenuSubItem>
                      
                    </SidebarMenuSub>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem className="flex justify-start items-center pl-4 gap-1">
                        <Users2
                          strokeWidth={1.2}
                          className="border p-0.5 rounded-sm"
                        />
                        <span className="font-sans font-light p-1 ">
                          Workspaces
                        </span>
                      </SidebarMenuSubItem>
                      
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator/>
        <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2"><BookOpen strokeWidth={1.5} />Templates And apps</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
          <SidebarGroupLabel className="gap-2"><ShoppingBag strokeWidth={1.5} />Marketplace</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
          <SidebarGroupLabel className="gap-2"><Download strokeWidth={1.5} />Import</SidebarGroupLabel>        
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
