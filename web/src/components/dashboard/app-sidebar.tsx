"use client";

import * as React from "react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";

import {
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconFileDescription,
  IconBuilding,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type UserRole = "admin" | "hotel" | "user" | null;


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    // Kullanıcı rolünü localStorage'dan al
    const role = localStorage.getItem("userRole") as UserRole;
    setUserRole(role);
  }, []);


  const getNavMainByRole = (role: UserRole) => {
    switch (role) {
      case "admin":
        return [
          {
            title: t("home"),
            url: "/dashboard",
            icon: <IconDashboard />,
          },
          {
            title: t("customers"),
            url: "/dashboard/admin/customers",
            icon: <IconUsers />,
          },
          {
            title: t("company"),
            url: "/dashboard/admin/company",
            icon: <IconFileDescription />,
          },
          {
            title: t("profile"),
            url: "/dashboard/admin/profile",
            icon: <IconFolder />,
          },
        ];
      case "hotel":
        return [
          {
            title: t("home"),
            url: "/dashboard",
            icon: <IconDashboard />,
          },
          {
            title: t("hotel-info"),
            url: "/dashboard/hotel/hotel-info",
            icon: <IconBuilding />,
          },
          {
            title: t("reservations"),
            url: "/dashboard/hotel/reservations",
            icon: <IconChartBar />,
          },
          {
            title: t("company"),
            url: "/dashboard/hotel/company",
            icon: <IconFileDescription />,
          },
        ];
      default:
        return [];
    }
  };
  
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
 
  };
  

  const navMainItems = getNavMainByRole(userRole);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/images/logo3.png"
                  alt="Rotaly"
                  className="w-10 h-10"
                  width={40}
                  height={40}
                />
                <a href="#">
                  <span className="text-xl font-bold ">Rotaly</span>
                </a>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
