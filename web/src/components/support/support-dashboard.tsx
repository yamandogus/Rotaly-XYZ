"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTicketForm } from "./create-ticket-form";
import { TicketList } from "./ticket-list";
import { AdminDashboard } from "./admin-dashboard";
import { SupportTicket } from "@/types/support";
import { Ticket, Plus, List, HelpCircle, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

type ViewMode = "list" | "create" | "admin";
type UserRole = "admin" | "hotel" | "support" | "user" | null;

export const SupportDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const ticketParam = searchParams.get("ticket");

  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const t = useTranslations("Support");

  useEffect(() => {
    // Get user role from localStorage
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole") as UserRole;
      setUserRole(role);
    }
  }, []);

  const handleTicketCreated = (ticket: SupportTicket) => {
    console.log("Ticket created:", ticket);
    setCurrentView("list");
  };

  const handleTicketSelect = (ticket: SupportTicket) => {
    // This will be handled by the router navigation in TicketList
    console.log("Ticket selected:", ticket);
  };

  const renderNavigation = () => (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 mb-6 rounded-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("supportTitle")}
              </h1>
            </div>

            <div className="flex space-x-2">
              <Button
                variant={currentView === "list" ? "default" : "outline"}
                onClick={() => setCurrentView("list")}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                {t("myTickets")}
              </Button>

              <Button
                variant={currentView === "create" ? "default" : "outline"}
                onClick={() => setCurrentView("create")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {t("createNewTicket")}
              </Button>

              {(userRole === "admin" || userRole === "support") && (
                <Button
                  variant={currentView === "admin" ? "default" : "outline"}
                  onClick={() => setCurrentView("admin")}
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  {t("adminPanel")}
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {t("24x7Support")}
            </div>
            {userRole && (
              <div className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {userRole === "admin"
                  ? t("admin")
                  : userRole === "support"
                  ? t("support")
                  : t("customer")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "list":
        return (
          <TicketList
            onTicketSelect={handleTicketSelect}
            onCreateNew={() => setCurrentView("create")}
          />
        );

      case "create":
        return (
          <CreateTicketForm
            onTicketCreated={handleTicketCreated}
            onCancel={() => setCurrentView("list")}
          />
        );

      case "admin":
        return userRole === "admin" || userRole === "support" ? (
          <AdminDashboard />
        ) : (
          <div className="text-center p-8">
            <p className="text-red-600">{t("accessDenied")}</p>
          </div>
        );

      default:
        return null;
    }
  };

  // Show notification if there's a ticket parameter (from AI chat)
  const renderTicketNotification = () => {
    if (ticketParam) {
      return (
        <Card className="mb-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-200">
                  Destek bileti oluşturuldu!
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  AI chat üzerinden destek bileti #{ticketParam.slice(-8)}{" "}
                  oluşturuldu. Biletinizi listede görebilir veya detaylarını
                  inceleyebilirsiniz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderNavigation()}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTicketNotification()}
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 Rotaly. Tüm hakları saklıdır.</p>
            <p className="mt-1">
              Müşteri memnuniyeti bizim önceliğimizdir - 7/24 destek hizmeti
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
