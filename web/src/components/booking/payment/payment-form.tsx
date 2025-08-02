import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface PaymentFormData {
  expiryDate: string;
  cvv: string;
  cardNumber: string;
  address: string;
  country: string;
  phoneNumber: string;
  specialRequest: string;
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  setCurrentStep: (step: number) => void;
}

const PaymentForm = ({ onSubmit, setCurrentStep }: PaymentFormProps) => {
  const form = useForm<PaymentFormData>({
    defaultValues: {
      expiryDate: "",
      cvv: "",
      cardNumber: "",
      address: "",
      country: "",
      phoneNumber: "",
      specialRequest: "",
    },
  });

  return (
    <Form {...form}>
      <div>
        <p>Kart Bilgileri</p>
      </div>
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
                      required
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
                      required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
              className="bg-[#2F6FED] text-white hover:bg-[#2F6FED]/90 transition-all duration-300"
            >
              <p className="text-sm">Ödeme işlemini tamamla</p>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;