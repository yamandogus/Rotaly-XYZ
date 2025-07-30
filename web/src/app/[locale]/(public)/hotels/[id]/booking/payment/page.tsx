import { bookingData, hotelData, paymentMethods } from "@/data/dumy";
import HotelSummary from "@/components/booking/hotel-summary";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, PlusIcon } from "lucide-react";

interface BookingPaymentPageProps {
  setCurrentStep: (step: number) => void;
}

const BookingPaymentPage = ({ setCurrentStep }: BookingPaymentPageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
        <h1 className="text-2xl font-semibold">Ödeme Seçenekleri</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <RadioGroup defaultValue="comfortable">
            {paymentMethods.map((paymentMethod) => (
              <div key={paymentMethod.id} className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-md p-2">
                <RadioGroupItem value={paymentMethod.id.toString()} id="r1" />
                <div className="flex flex-row gap-10">
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="r1" className="text-sm">**** 8304</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Visa * <a href="#" className="text-sm hover:border-b hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300">Düzenle</a></p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="text-sm text-[paymentMethod.cardType  === 'Visa' ? '#0742A6' : paymentMethod.cardType === 'Mastercard' ? '#f1e468' : '#000000'] dark:text-gray-400 font-bold">{paymentMethod.cardType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" className="flex flex-col py-6" >
              <PlusIcon color="blue" className="w-4 h-4 border border-blue-500 rounded-sm mt-1" />
              <p className="text-sm">Ekle</p>
            </Button>
          </div>
        </div>
        <div>
          <p>Kart Bilgileri</p>
        </div>
      </div>
      <div>
        <HotelSummary hotel={hotelData} booking={bookingData} />
      </div>
    </div>
  );
};

export default BookingPaymentPage;
