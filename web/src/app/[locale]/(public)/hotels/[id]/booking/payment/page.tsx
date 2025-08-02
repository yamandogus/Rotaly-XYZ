import { bookingData, hotelData, paymentMethods } from "@/data/dumy";
import HotelSummary from "@/components/booking/hotel-summary";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface BookingPaymentPageProps {
  setCurrentStep: (step: number) => void;
}

interface PaymentFormData {
  expiryDate: string;
  cvv: string;
  cardNumber: string;
  address: string;
  country: string;
  phoneNumber: string;
  specialRequest: string;
}

const BookingPaymentPage = ({ setCurrentStep }: BookingPaymentPageProps) => {
  const form = useForm<PaymentFormData>();

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment form data:", data);
    // Burada ödeme işlemi yapılacak
    // Başarılı olursa success sayfasına yönlendir
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
        <h1 className="text-2xl font-semibold">Ödeme Seçenekleri</h1>
        {/* Payment Methods */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-8">
            <RadioGroup
              className="flex flex-col gap-4"
              defaultValue="comfortable"
            >
              {paymentMethods.map((paymentMethod) => (
                <div
                  key={paymentMethod.id}
                  className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-md p-2"
                >
                  <RadioGroupItem value={paymentMethod.id.toString()} id="r1" />
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-row gap-10">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="r1" className="text-sm">
                          **** 8304
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Visa *{" "}
                          <a
                            href="#"
                            className="text-sm hover:border-b hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300"
                          >
                            Düzenle
                          </a>
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1">
                        <p className="text-sm text-[paymentMethod.cardType  === 'Visa' ? '#0742A6' : paymentMethod.cardType === 'Mastercard' ? '#f1e468' : '#000000'] dark:text-gray-400 font-bold">
                          {paymentMethod.cardType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="col-span-4 flex justify-end items-start">
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="flex flex-col py-2 h-full">
                <PlusIcon
                  color="blue"
                  className="w-4 h-4 border border-blue-500 rounded-sm mt-1"
                />
                <p className="text-sm">Ekle</p>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p>Kart Bilgileri</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-4 px-4 py-2">
                {/* Son Kullanma Tarihi ve CVV */}
                <div className="flex flex-row gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm">
                          Son Kullanma Tarihi
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="MM/YY"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm">CVV</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="CVV"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Kart Numarası */}
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Kart Numarası</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Kart Numarası"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Adres */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Adres</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Adres"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Ülke/Bölge */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Ülke/Bölge</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ülke/Bölge"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Telefon Numarası */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Telefon Numarası
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Telefon Numarası"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Özel İstek */}
                <FormField
                  control={form.control}
                  name="specialRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Özel İstek</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Özel İstek"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex flex-row gap-2  mt-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    type="button"
                  >
                    <p className="text-sm">Geri</p>
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setCurrentStep(3)}
                    className="bg-[#2F6FED] text-white hover:bg-[#2F6FED]/90 transition-all duration-300"
                  >
                    <p className="text-sm">Ödeme işlemini tamamla</p>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <HotelSummary hotel={hotelData} booking={bookingData} />
      </div>
    </div>
  );
};

export default BookingPaymentPage;
