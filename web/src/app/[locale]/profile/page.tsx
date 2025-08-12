"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileTabContent from "@/components/profil/profil-tab-content"
import { useTranslations } from "next-intl";
import ReservationsContent from "@/components/profil/reservations-tabs-content";
import PastReservations from "@/components/profil/past-tabs-content";
import Notifications from "@/components/profil/notifications-tabs-content";


export default function ProfilePage() {
  const t = useTranslations("Profile");

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-80">
          <TabsList className="flex flex-col gap-3 self-start mt-18 ml-4 w-full bg-transparent p-6">
            {[
              { value: "profile", label: t("title"), icon: "👤" },
              { value: "reservations", label: t("reservations"), icon: "📅" },
              { value: "past", label: t("pastReservations"), icon: "🕓" },
              { value: "notifications", label: t("notifications"), icon: "🔔" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="w-full px-6 py-4 text-base font-medium text-left rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
 <div className="flex-1 space-y-10">
<TabsContent value="profile">
 <ProfileTabContent t={t} />
</TabsContent>

<TabsContent value="reservations">
  <ReservationsContent />
</TabsContent>

    <TabsContent value="past">
  <PastReservations />
</TabsContent>

        <TabsContent value="notifications">
  <Notifications />
</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
