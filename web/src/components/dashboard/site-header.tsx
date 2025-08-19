import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useRouter } from "@/i18n/routing";
import { ModeToggle } from "../mode-toggle";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPageTitle } from "@/store/dashboard/dashboard-slice";

export function SiteHeader() {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const logoutTranslations = useTranslations("Dashboard.logoutModal");
  const pageTitle = useSelector((state: RootState) => state.dashboard.pageTitle);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sayfa başlığı boşsa varsayılan başlığı ayarla
    if (!pageTitle) {
      dispatch(setPageTitle(t("WelcamePage")));
    }
  }, [pageTitle, dispatch, t]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("hotelName");
    dispatch(setPageTitle(t("WelcamePage")));
    router.push("/login");
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button
                variant="default"
                asChild
                size="sm"
                className="hidden sm:flex text-white bg-red-500 hover:bg-red-600"
              >
                <Link href="#" onClick={() => setOpen(true)}>
                  {t("logout")}
                </Link>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{logoutTranslations("title")}</DialogTitle>
                <DialogDescription>
                  {logoutTranslations("description")}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  {logoutTranslations("cancel")}
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  {logoutTranslations("confirm")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
