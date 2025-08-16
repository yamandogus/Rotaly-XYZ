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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus } from "lucide-react";

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
  setCurrentStep?: (step: number) => void;
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4 py-2">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg px-4 py-3 hover:no-underline group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Yeni Kart
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Güvenli
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Kart Bilgilerini Gir
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance pt-4">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
                <FormLabel className="text-sm">Telefon Numarası</FormLabel>
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
              onClick={() => {
                // Bir önceki adıma dön
                setCurrentStep?.(1);
              }}
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
