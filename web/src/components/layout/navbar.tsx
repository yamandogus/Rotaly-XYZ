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
import { useState, useRef, useEffect } from "react";
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
import { hotelData } from "@/data/dumy";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isListOpen, setIsListOpen] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca listeyi kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsListOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListOpen = () => {
    setIsListOpen(true);
    toast.success("Success", { duration: 2000, position: "top-right" });
  };

  const filteredHotels = hotelData.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(query.toLowerCase()) ||
      hotel.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleHotelClick = () => {
    setQuery("");
    setIsListOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex h-18 items-center">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo3.PNG"
              alt="logo"
              width={100}
              height={100}
              className="w-12 h-12 hover:scale-105 transition-transform duration-300"
            />
            <span className="text-lg font-bold text-foreground">ROTALY</span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 justify-center" ref={searchRef}>
          <div className="relative w-full max-w-md">
            <Input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length > 2) setIsListOpen(true);
              }}
              placeholder={t("searchPlaceholder")}
              className="pl-10 rounded-lg border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
            <SearchIcon className="absolute left-3 top-2 h-5 w-5 pointer-events-none opacity-50" />
            <Mic
              color={darkMode ? "white" : "black"}
              size={18}
              className="absolute right-3 top-2.5 opacity-70 cursor-pointer z-10 hover:opacity-100 transition-opacity"
              onClick={handleListOpen}
            />

            {isListOpen && query.length > 2 && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-background border border-gray-200 rounded-lg shadow-lg z-50
                           max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
              >
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={"/hotels/3"}
                      className="flex items-center justify-between gap-4 p-3 hover:bg-accent/30 transition-colors rounded-lg cursor-pointer"
                      onClick={handleHotelClick}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover flex-shrink-0 shadow-md"
                        />
                        <div className="flex flex-col overflow-hidden max-w-[180px]">
                          <span className="font-semibold text-foreground truncate">
                            {hotel.name}
                          </span>
                          <span className="text-sm text-muted-foreground truncate">
                            {hotel.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">
                        {hotel.price}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Sonuç bulunamadı
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sağ taraf */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <Link href="/favorites">
            <Button variant="ghost" size="sm" className="relative cursor-pointer">
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
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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

        {/* Mobil Menü */}
        <div className="md:hidden flex justify-end">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>ROTALY</SheetTitle>
                <SheetDescription>
                  ROTALY ile rezervasyon yapın, otel bulun.
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
    </nav>
  );
}
