"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@/services/api";
import { useToastMessages } from "@/hooks/toast-messages";

const registerSchema = z
.object({
  firstname: z.string().min(1, { message: "Ad alanı boş bırakılamaz" }),
  lastname: z.string().min(1, { message: "Soyad alanı boş bırakılamaz" }),
  email: z.string().email({ message: "Geçersiz e-posta adresi" }),
  phone: z.string().min(1, { message: "Telefon numarası alanı boş bırakılamaz" }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
  confirmPassword: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Şifreler eşleşmiyor"
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { showError, showSuccess } = useToastMessages();
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }
  })
  const handleSubmit =  async (data: RegisterFormData) => { 
    try {
      const response = await api.register({
        name: data.firstname,
        surname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log("response", response);
      if (response.success) {
        showSuccess("Kayıt işlemi başarılı", 3000);
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Kayıt işlemi başarısız oldu";
      showError(errorMessage);
    }
  };


  
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-card border border-border rounded-2xl shadow-input mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8 ">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Rotaly&apos;ye Hoş Geldiniz
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Hesabınızı oluşturun ve otel rezervasyonlarınızı yönetin
        </p>
        <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad</FormLabel>
                    <FormControl>
                      <Input placeholder="Adınız" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soyad</FormLabel>
                    <FormControl>
                      <Input placeholder="Soyadınız" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
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
          <LabelInputContainer className="mb-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon Numarası</FormLabel>
                  <FormControl>
                    <Input placeholder="+90 5XX XXX XX XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre Tekrar</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Kayıt Ol &rarr;
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
                Google ile Kayıt Ol
              </span>
              <BottomGradient />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">Hesabınız var mı?</p>
            <Link href="/login" className="text-sm text-primary hover:underline">
              Giriş Yap
            </Link>
          </div>
        </form>
        </Form>
      </div>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};


export const GoogleIcon = () => (
  <svg className="h-4 w-4 text-neutral-800 dark:text-neutral-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);