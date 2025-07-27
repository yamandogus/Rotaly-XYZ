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
  LogOut,
  Menu,
  Heart,
  Bell,
  SearchIcon,
  X,
  Mic,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "../language-switcher";
import Image from "next/image";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  const [isListOpen, setIsListOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex h-18 items-center">
        {/* Logo - Sol taraf */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/RT.png"
              alt="logo"
              width={200}
              height={200}
              className="w-20 h-20"
            />
            <span className="text-xl font-bold text-foreground">ROTALY</span>
          </Link>
        </div>

        {/* Search - Orta */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="pl-8 rounded-lg border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 pointer-events-none opacity-50" />
            <Mic
              color={isListOpen ? "red" : "blue"}
              size={isListOpen ? 18 : 16}
              className={`absolute right-2.5 top-2.5 opacity-50 cursor-pointer z-10 `}
              onClick={() => setIsListOpen(!isListOpen)}
            />
          </div>
        </div>

        {/* Right Side - Sağ taraf */}
        <div className="flex-1 flex items-center justify-end space-x-2">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="relative cursor-pointer"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 bg-[#2F6FED] text-white rounded-full text-xs w-2 h-2 flex items-center justify-center"></span>
            </Button>

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
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("login")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/hotels"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("hotels")}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Dil
                  </span>
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
