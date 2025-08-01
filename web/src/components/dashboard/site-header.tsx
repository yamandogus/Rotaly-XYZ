import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useRouter } from "@/i18n/routing";
import { ModeToggle } from "../mode-toggle";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher";

export function SiteHeader() {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-medium">{t("Hotel Management System")}</h1>
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
