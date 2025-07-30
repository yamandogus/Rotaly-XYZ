"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "./admin/page";
import HotelDashboard from "./hotel/page";

type UserRole = "admin" | "hotel" | "user" | null;

export default function Page() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı rolünü localStorage'dan al
    const role = localStorage.getItem("userRole") as UserRole;
    setUserRole(role);
    setIsLoading(false);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  // Role'a göre içerik render et
  const renderDashboardContent = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "hotel":
        return <HotelDashboard />;
      default:
        return (
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
            </div>
          </div>
        );
    }
  };

  return renderDashboardContent();
}
