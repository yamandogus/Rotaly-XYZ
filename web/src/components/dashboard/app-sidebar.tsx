"use client";

import * as React from "react";
import { NavDocuments } from "@/components/dashboard/nav-documents";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";

import {
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconBuilding,
  IconUserCheck,
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

type UserRole = "admin" | "hotel" | "user" | null;

const getNavMainByRole = (role: UserRole) => {
  switch (role) {
    case "admin":
      return [
        {
          title: "Anasayfa",
          url: "/dashboard",
          icon: <IconDashboard />,
        },
        {
          title: "Oteller",
          url: "/dashboard/admin/hotels",
          icon: <IconBuilding />,
        },
        {
          title: "Müşteriler",
          url: "/dashboard/admin/customers",
          icon: <IconUsers />,
        },
        {
          title: "Şirket Bilgileri",
          url: "/dashboard/admin/company",
          icon: <IconFileDescription />,
        },
        {
          title: "Adminler",
          url: "/dashboard/admin/admins",
          icon: <IconUserCheck />,
        },
        {
          title: "Profile",
          url: "/dashboard/admin/profile",
          icon: <IconFolder />,
        },
      ];
    case "hotel":
      return [
        {
          title: "Anasayfa",
          url: "/dashboard",
          icon: <IconDashboard />,
        },
        {
          title: "Hotel Bilgileri",
          url: "/dashboard/hotel/hotel-info",
          icon: <IconBuilding />,
        },
        {
          title: "Rezervasyonlar",
          url: "/dashboard/hotel/reservations",
          icon: <IconChartBar />,
        },
        {
          title: "Profile",
          url: "/dashboard/hotel/profile",
          icon: <IconFolder />,
        },
        {
          title: "Şirket Bilgileri",
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
  navClouds: [
    {
      title: "Raporlar",
      icon: <IconCamera />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Aktif Rezervasyonlar",
          url: "#",
        },
        {
          title: "Pasif Rezervasyonlar",
          url: "#",
        },
      ],
    },
    {
      title: "Müşteriler",
      icon: <IconFileDescription />,
      url: "#",
      items: [
        {
          title: "Aktif Müşteriler",
          url: "#",
        },
        {
          title: "Pasif Müşteriler",
          url: "#",
        },
      ],
    },
    {
     title: "Hizmetler",
      icon: <IconFileAi />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Ayarlar",
      url: "#",
      icon: <IconSettings />,
    },
    {
      title: "Yardım",
      url: "#",
      icon: <IconHelp />,
    },
    {
      title: "Arama",
      url: "#",
      icon: <IconSearch />,
    },
  ],
  documents: [
    {
      name: "Veri Tabanı",
      url: "#", 
      icon: <IconDatabase />,
    },
    {
      name: "Raporlar",
      url: "#",
      icon: <IconReport />,
    },
    {
      name: "Word Yardımcısı",
      url: "#",
      icon: <IconFileWord />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Kullanıcı rolünü localStorage'dan al
    const role = localStorage.getItem("userRole") as UserRole;
    setUserRole(role);
  }, []);

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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
