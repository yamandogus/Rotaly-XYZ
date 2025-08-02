import { bookingData, hotelData } from "@/data/dumy";
import HotelSummary from "@/components/booking/hotel-summary";
import React, { useState } from "react";
import PaymentMethodSelector from "@/components/booking/payment/payment-method-selector";
import PaymentForm, { PaymentFormData } from "@/components/booking/payment/payment-form";
import PaymentProcessing from "@/components/booking/payment/payment-processing";

interface BookingPaymentPageProps {
  setCurrentStep: (step: number) => void;
}

const BookingPaymentPage = ({ setCurrentStep }: BookingPaymentPageProps) => {
  const [isPaymentControl, setIsPaymentControl] = useState(true);

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment form data:", data);
    setIsPaymentControl(false);
    setTimeout(() => {
      if (
        data.cardNumber &&
        data.cvv &&
        data.expiryDate &&
        data.address &&
        data.country &&
        data.phoneNumber &&
        data.specialRequest
      ) {
        setCurrentStep(3);
      }
    }, 6000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
        <h1 className="text-2xl font-semibold">Ödeme Seçenekleri</h1>
        
        {/* Payment Methods */}
        <PaymentMethodSelector />

        <div>
          {isPaymentControl ? (
            <PaymentForm onSubmit={onSubmit} setCurrentStep={setCurrentStep} />
          ) : (
            <PaymentProcessing />
          )}
        </div>
      </div>
      <div>
        <HotelSummary
          hotel={{
            id: hotelData[0].id.toString(),
            name: hotelData[0].name,
            location: hotelData[0].location,
            image: hotelData[0].image,
            rating: hotelData[0].rating,
            ratingCount: 120, // Default rating count
            features: {
              cancelFree: hotelData[0].cancel,
              breakfast: hotelData[0].breakfast,
              parking: hotelData[0].parking,
            },
          }}
          booking={bookingData}
        />
      </div>
    </div>
  );
};

export default BookingPaymentPage;
