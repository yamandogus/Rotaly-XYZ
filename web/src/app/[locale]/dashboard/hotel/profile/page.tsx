"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface HotelFormData {
  hotelImages: string[];
  hotelName: string;
  emailAddress: string;
  phoneNumber: string;
  taxId: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export default function HotelPage() {
  const form = useForm<HotelFormData>({
    defaultValues: {
      hotelImages: [
        "/images/opportunity3.jpg",
        "/images/opportunity6.jpg",
        "/images/opportunity7.jpg",
      ],
      hotelName: "Rotaly XYZ Otel",
      emailAddress: "info@rotalyxyz.com",
      phoneNumber: "+90 555 123 4567",
      taxId: "1234567890",
      country: "turkey",
      address: "Atatürk Caddesi No: 123 Konyaaltı",
      city: "Antalya",
      state: "Antalya",
      postalCode: "07070",
    },
  });

  const onSubmit = (data: HotelFormData) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
                 {/* Header */}
         <div className="text-center space-y-2">
           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">
             Otel Profil Yönetimi
           </h1>
           <p className="text-muted-foreground">
             Otel bilgilerinizi güncelleyin ve yönetin
           </p>
         </div>

         {/* Main Form Card */}
         <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl border border-border/50 overflow-hidden">

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-8"
          >
            {/* Otel Görselleri */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Otel Görselleri
                </h3>
              </div>
              <FormField
                control={form.control}
                name="hotelImages"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-4 overflow-x-auto py-2">
                      {field.value.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-48 h-32 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src={img}
                            alt={`Hotel Image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImgs = [...field.value];
                              newImgs.splice(idx, 1);
                              field.onChange(newImgs);
                            }}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-xs transition-colors duration-200"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-48 h-32 text-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 transition-colors duration-200 rounded-xl"
                        onClick={() => {
                          field.onChange([...field.value, "/images/hotel3.jpg"]);
                        }}
                      >
                        <UploadIcon className="w-8 h-8 mb-2 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Görsel Ekle</span>
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Temel Bilgiler */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🏨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Temel Bilgiler
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Otel Adı */}
                <FormField
                  control={form.control}
                  name="hotelName"
                  rules={{ required: "Otel adı zorunludur." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Otel Adı *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Otel Adı"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="emailAddress"
                  rules={{
                    required: "Email zorunludur.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Geçerli bir email adresi girin.",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Adresi *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Telefon */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  rules={{
                    required: "Telefon numarası zorunludur.",
                    pattern: {
                      value: /^(\+90|0)?5\d{9}$/,
                      message:
                        "Geçerli bir Türkiye telefon numarası girin. (örn: +905551234567 veya 05551234567)",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefon *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Telefon"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vergi Numarası */}
                <FormField
                  control={form.control}
                  name="taxId"
                  rules={{
                    required: "Vergi numarası zorunludur.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Vergi numarası sadece rakamlardan oluşmalıdır.",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Vergi No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Vergi Numarası"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Adres Bilgileri */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Adres Bilgileri
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ülke */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Ülke</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <SelectValue placeholder="Ülke Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="turkey">Türkiye 🇹🇷</SelectItem>
                            <SelectItem value="unitedStates">ABD 🇺🇸</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  rules={{ required: "Ülke seçimi zorunludur." }}
                />

                {/* Şehir */}
                <FormField
                  control={form.control}
                  name="city"
                  rules={{ required: "Şehir zorunludur." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Şehir</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Şehir"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* İlçe */}
                <FormField
                  control={form.control}
                  name="state"
                  rules={{ required: "İlçe zorunludur." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">İlçe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="İlçe"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Posta Kodu */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  rules={{
                    required: "Posta kodu zorunludur.",
                    pattern: {
                      value: /^\d{5,10}$/,
                      message: "Geçerli bir posta kodu girin.",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Posta Kodu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Posta Kodu"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Adres - Tam Genişlik */}
                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: "Adres zorunludur." }}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Adres</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adres"
                          {...field}
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Kaydet Butonu */}
            <div className="flex justify-center ">
                             <Button
                 type="submit"
                 className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 min-w-[200px]"
               >
                <SaveIcon className="w-5 h-5 " />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </form>
        </Form>
        </div>
      </div>
    </div>
  );
}
