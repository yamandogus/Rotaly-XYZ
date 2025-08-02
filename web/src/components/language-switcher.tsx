"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const languages = {
    tr: { label: "Türkçe", code: "TR" },
    en: { label: "English", code: "EN" }
  };

  const currentLanguage = languages[locale as keyof typeof languages];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-1 cursor-pointer"
          disabled={isPending}
          onClick={toggleLanguage}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.code}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {Object.values(languages).map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={toggleLanguage}
          >
            <span className="mr-2">{lang.code}</span>
            <span className="text-sm">{lang.label}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
