"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/routing";
import React from "react";
import {
  BottomGradient,
  GoogleIcon,
  LabelInputContainer,
} from "../register/page";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
  const router = useRouter();


const testUser = {
  email: "user@user.com",
  password: "123456",
  role: "user",
};

const testHotel = {
  email: "hotel@hotel.com",
  password: "123456",
  role: "hotel",
};

const testAdmin = {
  email: "admin@admin.com",
  password: "123456",
  role: "admin",
};

const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  console.log("Login attempt:", { email, password, role });

  // Normal kullanıcı girişi
  if (email === testUser.email && password === testUser.password && role === "user") {
    localStorage.setItem("userRole", "user");
    toast.success("Kullanıcı girişi başarılı");
    router.push("/dashboard");
  } 
  // Otel girişi
  else if (email === testHotel.email && password === testHotel.password && role === "hotel") {
    localStorage.setItem("userRole", "hotel");
    toast.success("Otel girişi başarılı");
    router.push("/dashboard");
  } 
  // Admin girişi
  else if (email === testAdmin.email && password === testAdmin.password && role === "admin") {
    localStorage.setItem("userRole", "admin");
    toast.success("Admin girişi başarılı");
    router.push("/dashboard");
  } 
  // Hatalı giriş
  else {
    toast.error("Hatalı e-posta, şifre veya rol seçimi!");
  }
};

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl shadow-input mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Rotaly&apos;ye Hoş Geldiniz!
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            E-posta adresinize giriş yapın ve otel rezervasyonlarınızı yönetin
          </p>

          <form className="my-8" onSubmit={handleLogin}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input id="email" name="email" placeholder="ornek@email.com" type="email" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" name="password" placeholder="••••••••" type="password" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="role">Rol</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Kullanıcı</SelectItem>
                    <SelectItem value="hotel">Otel</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </LabelInputContainer>
            </div>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Giriş Yap &rarr;
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <div className="flex flex-col space-y-4">
              <button
                className="border border-border group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                type="button"
              >
                <GoogleIcon />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Google ile Giriş Yap
                </span>
                <BottomGradient />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Hesabınız yok mu?
              </p>
              <Link
                href="/register"
                className="text-sm text-primary hover:underline"
              >
                Kayıt Ol
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
