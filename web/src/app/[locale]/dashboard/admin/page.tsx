"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2Icon, HotelIcon, BarChart3Icon, ShieldCheckIcon, UsersIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TokenTest } from "@/components/auth/TokenTest";

export default function AdminDashboard() {
  const t = useTranslations("Admin");
  const [showTokenTest, setShowTokenTest] = useState(false);
  
  const adminMenu = [
    {
      title: t("hotelManagement"),
      icon: HotelIcon,
      description: t("hotelManagementDesc"),
      link: "/dashboard/admin/hotels",
      color: "text-blue-500",
    },
    {
      title: t("customerManagement"),
      icon: UsersIcon,
      description: t("customerManagementDesc"),
      link: "/dashboard/admin/customers",
      color: "text-green-500",
    },
    {
      title: t("statisticsReports"),
      icon: BarChart3Icon,
      description: t("statisticsReportsDesc"),
      link: "/dashboard/admin/statistics",
      color: "text-purple-500",
    },
    {
      title: t("companySettings"),
      icon: Building2Icon,
      description: t("companySettingsDesc"),
      link: "/dashboard/admin/company",
      color: "text-orange-500",
    },
    {
      title: t("securityAudit"),
      icon: ShieldCheckIcon,
      description: t("securityAuditDesc"),
      link: "/dashboard/admin/security",
      color: "text-red-500",
    },
    {
      title: t("profile"),
      icon: UserIcon,
      description: t("profileDesc"),
      link: "/dashboard/admin/profile",
      color: "text-gray-500",
    },
  ];
  const router = useRouter();
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header ve Token Test Butonu */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setShowTokenTest(!showTokenTest)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            {showTokenTest ? "🔑 Token Test'i Gizle" : "🔑 Token Test'i Göster"}
          </button>
        </div>

        {/* Token Test Bileşeni */}
        {showTokenTest && (
          <div className="mb-8">
            <TokenTest />
          </div>
        )}

        {/* Admin Menü Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {adminMenu.map((item, index) => {
            const IconComponent = item.icon;
            const handleClick = () => {
              if (item.link !== "#") {
                router.push(item.link);
              }
            };

            return (
              <Card 
                key={index}
                onClick={handleClick}
                className="bg-card cursor-pointer  hover:bg-accent hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <IconComponent className={`w-10 h-10 ${item.color}`} />
                    <CardTitle className="text-center">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="">
                  <p className="text-center text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
