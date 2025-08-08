"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  Menu,
  Heart,
  SearchIcon,
  Mic,
  MessageCircle,
  Hotel,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "../language-switcher";
import Image from "next/image";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import Notification from "../notifications/page";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { SheetTrigger } from "../ui/sheet";
import { SheetContent } from "../ui/sheet";
import { toast } from "react-hot-toast";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isListOpen, setIsListOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const handleListOpen = () => {
    setIsListOpen(!isListOpen);
    toast.success("Success", {
      duration: 3000,
      position: "top-right",
    });
    toast.error("Error", {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex h-18 items-center">
        {/* Logo - Sol taraf */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo3.png"
              alt="logo"
              width={100}
              height={100}
              className="w-12 h-12 hover:scale-105 transition-transform duration-300"
            />
            <span className="text-lg font-bold text-foreground">ROTALY</span>
          </Link>
        </div>

        {/* Search - Orta */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="pl-8 rounded-lg border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 pointer-events-none opacity-50" />
            <Mic
              color={darkMode ? "white" : "black"}
              size={isListOpen ? 18 : 16}
              className={`absolute right-2.5 top-2.5 opacity-50 cursor-pointer z-10 `}
              onClick={handleListOpen}
            />
          </div>
        </div>

        {/* Right Side - Sağ taraf */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <div className="flex items-center space-x-2">
            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="sm"
                className="relative cursor-pointer"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#ed2f2f] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center text-[10px] font-medium">
                  3
                </span>
              </Button>
            </Link>

            {/* Notification */}
            <div className="flex items-center">
              <Notification />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Kullanıcı</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <User className="mr-2 h-4 w-4" />
                    {t("login")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">
                    <User className="mr-2 h-4 w-4" />
                    {t("register")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/hotel">
                    <User className="mr-2 h-4 w-4" />
                    {t("Hotels Add")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support/contact">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("contact")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
             
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="md:hidden flex justify-end">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>ROTALY</SheetTitle>
                <SheetDescription>
                  ROTALY ile rezervasyon yapın, otel bulun, otel rezervasyonu
                  yapın.
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
                  <Link href="/support/contact">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-5 w-5" />
                      {t("contact")}
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
                  <Button variant="outline">Kapat</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Navigation */}
    </nav>
  );
}
