"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import Image from "next/image";
import ChatWidget from "@/components/chat/chat-widget";

type Props = {
  children: ReactNode;
};

type UserRole = "admin" | "hotel" | "user" | null;

export default function DashboardLayout({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı rolünü localStorage'dan al
    const role = localStorage.getItem("userRole") as UserRole;
    
    // Eğer rol yoksa login sayfasına yönlendir
    if (!role) {
      router.push("/login");
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div>
          <Image src="/images/logo3.png" alt="Loading" width={100} height={100} />
          <div className="text-lg">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
        <ChatWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}