'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/routing';
import {useTransition} from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'tr' | 'en') => {
    startTransition(() => {
      router.replace(pathname, {locale: newLocale});
    });
  };

  const languages = {
    tr: { label: 'Türkçe', code: 'TR' },
    en: { label: 'English', code: 'EN' }
  };

  const currentLanguage = languages[locale as keyof typeof languages];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 gap-1"
          disabled={isPending}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.code}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {Object.entries(languages).map(([langCode, lang]) => (
          <DropdownMenuItem
            key={langCode}
            onClick={() => switchLocale(langCode as 'tr' | 'en')}
            className={`cursor-pointer ${
              locale === langCode ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{lang.label}</span>
              <span className="text-sm text-muted-foreground">{lang.code}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 