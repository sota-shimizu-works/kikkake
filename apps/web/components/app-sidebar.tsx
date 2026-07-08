"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navData = {
  navMain: [
    {
      title: "ダッシュボード",
      url: "/dashboard",
      icon: IconDashboard,
    },
  ],
  navSecondary: [
    {
      title: "アカウント設定",
      url: "/dashboard/account",
      icon: IconSettings,
    },
    {
      title: "アカウント管理",
      url: "/dashboard/accounts",
      icon: IconUsers,
    },
  ],
};

type SidebarUser = {
  name: string;
  email: string;
  avatar: string;
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: SidebarUser }) {
  const fallbackUser: SidebarUser = {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const displayUser = user ?? fallbackUser;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <IconInnerShadowTop className="!size-5" />
            <span className="text-base font-semibold">System tmp</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
