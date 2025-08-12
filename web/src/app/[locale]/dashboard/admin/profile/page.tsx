"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminProfilePage() {
  const t = useTranslations("AdminProfile");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  const formSchema = z
    .object({
      name: z.string().min(1, { message: t("fieldRequired") }),
      email: z.string().email({ message: t("invalidEmail") }),
      password: z.string().min(8, { message: t("passwordHint") }),
      confirmPassword: z.string().min(8, { message: t("passwordHint") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch") || "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "rotaly",
      email: "info@rotaly.xyz",
      password: "",
      confirmPassword: "",
    },
  });

  // İlk aşama: Formu validate et ve OTP dialog aç
  const handleOpenOtp = () => {
    const isValid = form.trigger(["password", "confirmPassword"]);
    isValid.then((valid) => {
      if (valid) {
        setOpen(true);
      } else {
        toast.error("Lütfen şifreleri doğru şekilde giriniz.");
      }
    });
  };

  // İkinci aşama: OTP doğrula ve form submit et
  const otpSubmit = () => {
    if (otp.length !== 6) {
      toast.error("Lütfen 6 haneli kodu giriniz.");
      return;
    }

    // Örnek OTP kontrol
    if (otp === "123456") {
      toast.success("OTP Doğrulandı");

      const formData = form.getValues();
      console.log("Form Data:", formData);
      console.log("OTP:", otp);

      // Burada backend'e gönder
      // await updatePassword(formData, otp);

      setTimeout(() => {
        setOpen(false);
        setOtp("");
        form.reset();
      }, 1000);
    } else {
      toast.error("OTP Doğrulanamadı");
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Profile Image */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="h-full">
              <CardContent className="flex justify-center items-center py-6">
                <Image
                  src="/images/logo3.PNG"
                  alt="Admin Profile"
                  width={200}
                  height={200}
                  className="rounded-full object-cover border-4 border-gray-200"
                />
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="col-span-12 lg:col-span-8">
            <Card>
              <CardContent className="py-6">
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                              <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                              <Input type="email" disabled {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("newPassword")}</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("confirmPassword")}</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 border-t pt-4">
                      <Button type="button" variant="outline">
                        {t("cancel") || "Cancel"}
                      </Button>
                      <Button type="button" onClick={handleOpenOtp}>
                        Şifreyi Değiştir
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* OTP Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full rounded-2xl p-6 space-y-6">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-2xl font-semibold">
              Doğrulama Kodu
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              E-mail adresinize gönderilen 6 haneli kodu giriniz.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 rounded-lg text-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 rounded-lg text-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <DialogFooter className="flex justify-center gap-4">
            <DialogClose asChild>
              <Button variant="outline">Vazgeç</Button>
            </DialogClose>
            <Button onClick={otpSubmit} className="bg-primary text-white">
              Onayla ve Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
