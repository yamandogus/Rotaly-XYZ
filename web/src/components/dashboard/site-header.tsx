import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useRouter } from "@/i18n/routing";
import { ModeToggle } from "../mode-toggle";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hotelName, setHotelName] = useState<string>("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    // Hotel adını localStorage'dan al (geçici olarak, normalde API'den gelir)
    const storedHotelName = localStorage.getItem("hotelName") || "Hotel";
    setHotelName(storedHotelName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("hotelName");
    router.push("/login");
  };

  const getHeaderTitle = () => {
    if (userRole === "admin") {
      return t("admin-management-system");
    } else if (userRole === "hotel") {
      return `${hotelName} ${t("hotel-management-system")}`;
    }
    return t("rotaly");
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-medium">{getHeaderTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        <ModeToggle />
          <Button
            onClick={handleLogout}
            variant="default"
            asChild
            size="sm"
            className="hidden sm:flex text-white bg-red-500 hover:bg-red-600"
          >
            <Link href="/login">{t("logout")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
