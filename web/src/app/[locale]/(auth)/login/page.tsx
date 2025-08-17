"use client";

import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import React from "react";
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
import { useDispatch} from "react-redux";
import { setUserRole } from "@/store/testUser/test-user-slice";



const loginShema = z.object({
  email: z.string().email({ message: "Geçersiz e-posta adresi" }),
  password: z.string().min(8, { message: "Geçersiz şifre" }),
});

type LoginFormData = z.infer<typeof loginShema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { loginSuccess, loginError } = useToastMessages();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

    //const response = await api.login(data);
    //console.log("login response", response);

    // const response = await api.login(data)
    // const user = response.data.userData.email
    // console.log(user);

    // const profileResponse = await api.getUserProfile()

    // console.log("res",profileResponse);
    
    
    // console.log("response", response);
    // console.log("test");
    
    
    // if(response.success){
    //   router.push("/")
    // }

    // Normal kullanıcı girişi
    if (data.email === testUser.email && data.password === testUser.password) {
      localStorage.setItem("userRole", "user");
      dispatch(setUserRole(testUser.role))
      loginSuccess("user");
      router.push("/");
    }
    // Otel girişi
    else if (
      data.email === testHotel.email &&
      data.password === testHotel.password
    ) {
      localStorage.setItem("userRole", "hotel");
      loginSuccess("hotel");
      router.push("/dashboard");
    }
    // Admin girişi
    else if (
      data.email === testAdmin.email &&
      data.password === testAdmin.password
    ) {
      localStorage.setItem("userRole", "admin");
      loginSuccess("admin");
      router.push("/dashboard");
    }
    // Support girişi
    else if (
      data.email === testSupport.email &&
      data.password === testSupport.password
    ) {
      localStorage.setItem("userRole", "support");
      loginSuccess("support");
      router.push("/dashboard/support");
    }
    // Hatalı giriş
    else {
      loginError();
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

          <Form {...form}>
            <form className="my-8" onSubmit={form.handleSubmit(handleLogin)}>
              <div className="mb-4 flex flex-col space-y-2">
                <LabelInputContainer className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input placeholder="ornek@email.com" {...field} />
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
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            {...field}
                          />
                        </FormControl>
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
                  Şifremi Unuttum
                </Link>
              </div>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                Giriş Yap &rarr;
                <BottomGradient />
              </button>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
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
          </Form>
        </div>
      </div>
    </div>
  );
}
