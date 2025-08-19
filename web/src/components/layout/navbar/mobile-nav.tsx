import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { Hotel, Menu, MessageCircle, Settings, User } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

const MobileNav = () => {
  const t = useTranslations("Navigation");
  return (
    <div className="md:hidden flex justify-end">
        <LanguageSwitcher />    
      <ModeToggle />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t("sheetTitle")}</SheetTitle>
            <SheetDescription>
              {t("sheetDescription")}
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <SheetClose asChild>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  <Settings className="h-5 w-5" />
                  {t("dashboard")}
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <User className="h-5 w-5" />
                  {t("login")}
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  <User className="h-5 w-5" />
                  {t("register")}
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/hotel">
                <Button variant="outline" className="w-full">
                  <Hotel className="h-5 w-5" />
                  {t("Hotels Add")}
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/support">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-5 w-5" />
                  {t("live-chat")}
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/profile">
                <Button variant="outline" className="w-full">
                  <User className="h-5 w-5" />
                  {t("profile")}
                </Button>
              </Link>
            </SheetClose>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
