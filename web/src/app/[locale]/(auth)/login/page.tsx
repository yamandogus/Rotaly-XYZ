"use client";

import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToastMessages } from "@/hooks/toast-messages";
import {
  BottomGradient,
  LabelInputContainer,
} from "@/components/auth/auth-components";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/store/testUser/test-user-slice";
import { useTranslations } from "next-intl";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { setUser } from "@/store/auth/auth-slice";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginSuccess, loginError } = useToastMessages();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const loginSchema = z.object({
    email: z.string().email({ message: t("invalidEmail") }),
    password: z.string().min(8, { message: t("invalidPassword") }),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Test kullanıcıları
  const testUser = {
    email: "user@user.com",
    password: "12345678",
    role: "user",
  };

  const testHotel = {
    email: "hotel@hotel.com",
    password: "12345678",
    role: "hotel",
  };

  const testAdmin = {
    email: "admin@admin.com",
    password: "12345678",
    role: "admin",
  };

  const testSupport = {
    email: "support@support.com",
    password: "12345678",
    role: "support",
  };

  const handleLogin = async (data: LoginFormData) => {
    console.log("login data", data);

    try {
      // Önce API ile login dene
      const response = await authService.login(data);
      console.log("login response", response);

      if (response.success) {
        // API login başarılı - kullanıcı profilini al
        const userResponse = await userService.getUserProfile();
        console.log("user response", userResponse);
        
        if (userResponse.data.isVerified === false) {
          setOpen(true);
        } else {
          // Kullanıcı doğrulanmış - role göre yönlendir
          switch (userResponse.data.role) {
            case 'ADMIN':
              localStorage.setItem("userRole", "admin");
              loginSuccess("admin");
              dispatch(setUser(userResponse.data));
              router.push("/dashboard/admin");
              break;
            case 'OWNER':
              localStorage.setItem("userRole", "hotel");
              loginSuccess("hotel");
              dispatch(setUser(userResponse.data));
              router.push("/dashboard/hotel");
              break;
            case 'SUPPORT':
              localStorage.setItem("userRole", "support");
              loginSuccess("support");
              dispatch(setUser(userResponse.data));
              router.push("/dashboard/support");
              break;
            case 'CUSTOMER':
              localStorage.setItem("userRole", "user");
              loginSuccess("user");
              dispatch(setUser(userResponse.data));
              router.push("/");
              break;
            default:
              router.push("/");
              loginError();
          }
        }
      } else {
        // API login başarısız - test kullanıcılarını kontrol et
        handleTestUserLogin(data);
      }
    } catch (error) {
      console.error("API login error:", error);
      // API hatası - test kullanıcılarını kontrol et
      handleTestUserLogin(data);
    }
  };

  // Test kullanıcıları için ayrı fonksiyon
  const handleTestUserLogin = (data: LoginFormData) => {
    // Normal kullanıcı girişi
    if (data.email === testUser.email && data.password === testUser.password) {
      localStorage.setItem("userRole", "user");
      dispatch(setUserRole(testUser.role));
      loginSuccess("user");
      router.push("/");
    }
    // Otel girişi
    else if (data.email === testHotel.email && data.password === testHotel.password) {
      localStorage.setItem("userRole", "hotel");
      dispatch(setUserRole(testHotel.role));
      loginSuccess("hotel");
      router.push("/dashboard");
    }
    // Admin girişi
    else if (data.email === testAdmin.email && data.password === testAdmin.password) {
      localStorage.setItem("userRole", "admin");
      dispatch(setUserRole(testAdmin.role));
      loginSuccess("admin");
      router.push("/dashboard");
    }
    // Support girişi
    else if (data.email === testSupport.email && data.password === testSupport.password) {
      localStorage.setItem("userRole", "support");
      dispatch(setUserRole(testSupport.role));
      loginSuccess("support");
      router.push("/dashboard/support");
    }
    // Hatalı giriş
    else {
      loginError();
    }
  };

  const otpSubmit = async () => {
    if (otp.length !== 6) {
      toast.error("Doğrulama kodu 6 haneli olmalıdır.");
      setOpen(false);
      setOtp("");
      form.reset();
      return;
    }else{
      const response = await authService.verifyEmail(otp);
      console.log("verify email response", response);
    

      if(response.success){
        toast.success("Hesabınız doğrulandı.");
      }else{
        toast.error("Doğrulama kodu geçersiz.");
      }
    }


    setOpen(false);
    setOtp("");
    form.reset();
  };


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl shadow-input mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            {t("welcome")}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            {t("subtitle")}
          </p>

          <Form {...form}>
            <form className="my-8" onSubmit={form.handleSubmit(handleLogin)}>
              <div className="mb-4 flex flex-col space-y-2">
                <LabelInputContainer className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("emailPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="w-full">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("password")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("passwordPlaceholder")}
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
              </div>
              <div className="flex justify-end my-2">
                <Link
                  href="/reset-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
              </div>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                {t("loginButton")} &rarr;
                <BottomGradient />
              </button>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              <div className="flex items-center justify-center gap-2 mt-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {t("noAccount")}
                </p>
                <Link
                  href="/register"
                  className="text-sm text-primary hover:underline"
                >
                  {t("register")}
                </Link>
              </div>
            </form>
          </Form>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md w-full rounded-2xl p-6 space-y-6">
              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-2xl font-semibold">
                  Hesabı Doğrula
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Lütfen doğrulama kodunu giriniz.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 ..."
                      />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {[3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 ..."
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <DialogFooter className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button variant="outline">İptal</Button>
                </DialogClose>
                <Button onClick={otpSubmit} className="bg-primary text-white">
                  Hesabı Doğrula
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
