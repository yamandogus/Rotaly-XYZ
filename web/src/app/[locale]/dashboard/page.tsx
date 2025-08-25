"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import AdminDashboard from "./admin/page";
import HotelDashboard from "./hotel/page";
import SupportDashboard from "./support/page";
import { TokenTest } from "../../../components/auth/TokenTest";

type UserRole = "admin" | "hotel" | "support" | null;

export default function Page() {
  const t = useTranslations("Support");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTokenTest, setShowTokenTest] = useState(false);

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
        <div className="text-lg">{t("loading")}</div>
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
      case "support":
        return <SupportDashboard />;
      default:
        return (
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <button
                    onClick={() => setShowTokenTest(!showTokenTest)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {showTokenTest ? "🔒 Token Test'i Gizle" : "🔑 Token Test'i Göster"}
                  </button>
                </div>
                
                {showTokenTest && <TokenTest />}
              </div>
            </div>
          </div>
        );
    }
  };

  return renderDashboardContent();
}
