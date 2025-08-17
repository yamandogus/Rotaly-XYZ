"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Heart, LogOut } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import { User } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Notification from "../../notifications/page";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/testUser/test-user-slice";

const UserActions = () => {
  const t = useTranslations("Navigation");
  const dispatch = useDispatch();
  const { role, email } = useSelector((state: RootState) => state.testUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
      {role === "user" ? (
        <React.Fragment>
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
          <Notification />
          <LanguageSwitcher />
          <ModeToggle />

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
                    {email || "user@example.com"}
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
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  {t("profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/hotel">
                  <User className="mr-2 h-4 w-4" />
                  {t("Hotels Add")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Canlı Destek
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </React.Fragment>
      ) : (
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" className="cursor-pointer">
              Giriş Yap
            </Button>
          </Link>
          <Link href="/register">
            <Button className="cursor-pointer">Kayıt Ol</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActions;
