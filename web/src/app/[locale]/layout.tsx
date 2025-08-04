import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/store-provider";
import LayoutWrapper from "./layout-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ["tr", "en"];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "tr"
        ? "Rotaly - Otel Rezervasyon Sistemi"
        : "Rotaly - Hotel Reservation System",
    description:
      locale === "tr"
        ? "Modern otel rezervasyon ve yönetim sistemi"
        : "Modern hotel reservation and management system",
    icons: {
      icon: "/images/logo3.png",
      shortcut: "/images/logo3.png",
      apple: "/images/logo3.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Geçerli locale kontrolü
  if (!locales.includes(locale)) {
    notFound();
  }

  // Çeviri mesajlarını getir
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
