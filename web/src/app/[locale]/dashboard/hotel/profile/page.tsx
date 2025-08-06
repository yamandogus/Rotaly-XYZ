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
    <div className="p-8 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-3xl rounded-2xl shadow-lg ring-1 ring-border p-8 space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Otel Bilgileri</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            {/* Otel Görselleri */}
            <FormField
              control={form.control}
              name="hotelImages"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Otel Görselleri
                  </FormLabel>
                  <div className="flex gap-4 overflow-x-auto py-1">
                    {field.value.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-48 h-32 rounded-lg overflow-hidden border border-border shadow-sm"
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
                          className="absolute top-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-bl-md px-2 py-1 text-xs"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-48 h-32 text-sm flex flex-col items-center justify-center border-dashed border-2"
                      onClick={() => {
                        field.onChange([...field.value, "/images/hotel3.jpg"]);
                      }}
                    >
                      <UploadIcon className="w-6 h-6 mb-1" />
                      Görsel Ekle
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            {/* Otel Adı */}
            <FormField
              control={form.control}
              name="hotelName"
              rules={{ required: "Otel adı zorunludur." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Otel Adı *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Otel Adı"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
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
                  <FormLabel>Email Adresi *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
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
                  <FormLabel>Telefon *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Telefon"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
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
                  <FormLabel>Vergi No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vergi Numarası"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Adres Bilgileri Başlığı */}
            <h3 className="col-span-2 text-lg font-semibold text-foreground">
              Adres Bilgileri
            </h3>

            {/* Ülke */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ülke</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-gray-100 text-foreground">
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

            {/* Adres */}
            <FormField
              control={form.control}
              name="address"
              rules={{ required: "Adres zorunludur." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adres"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Şehir */}
            <FormField
              control={form.control}
              name="city"
              rules={{ required: "Şehir zorunludur." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şehir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Şehir"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
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
                  <FormLabel>İlçe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="İlçe"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
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
                <FormItem className="col-span-2">
                  <FormLabel>Posta Kodu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Posta Kodu"
                      {...field}
                      className="bg-gray-100 text-foreground placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kaydet Butonu */}
            <div className="col-span-2 flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-blue-600 dark:bg-blue-500 hover:bg-green-700 dark:hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md flex items-center gap-2"
              >
                <SaveIcon className="w-4 h-4" />
                Kaydet
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
