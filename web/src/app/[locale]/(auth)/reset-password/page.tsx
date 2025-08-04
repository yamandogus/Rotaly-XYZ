"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import React from "react";
import { BottomGradient } from "../register/page";
import Link from "next/link";

const ResetPassword = () => {
  const t = useTranslations("ResetPassword");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-sm text-gray-500">{t("description")}</p>
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input type="email" id="email" placeholder={t("email")} />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input type="password" id="password" placeholder={t("password")} />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="confirm_password">{t("confirm_password")}</Label>
            <Input
              type="password"
              id="confirm_password"
              placeholder={t("confirm_password")}
            />
          </div>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mt-4"
            type="submit"
          >
            {t("submit")}
            <BottomGradient />
          </button>
        </form>
        <div className="flex justify-end ">
          <Link href="/login" className="text-sm text-primary hover:underline">
            {t("back")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
