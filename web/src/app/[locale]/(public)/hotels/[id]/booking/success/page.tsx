import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { hotelData } from "@/data/dumy";

interface BookingSuccessPageProps {
  setCurrentStep: (step: number) => void;
}

export default function BookingSuccessPage({ setCurrentStep }: BookingSuccessPageProps) {
  // Random rezervasyon numarası oluştur
  const reservationNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başarı Mesajı */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-center">
          {/* Onay İkonu */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Rezervasyon Numarası */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Rezervasyon No: {reservationNumber}
          </h1>

          {/* Başarı Mesajı */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Tebrikler! {hotelData.name} için rezervasyonunuz başarıyla alınmıştır.
          </h2>

          {/* Alt Metin */}
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Konaklamanızla ilgili tüm detaylar aşağıda yer almaktadır
          </p>

          {/* Ana Sayfaya Dön Butonu */}
          <Link href="/">
            <Button
              className="bg-[#2F6FED] hover:bg-[#2F6FED]/90 text-white px-8 py-3 rounded-lg font-medium"
            >
              Ana sayfaya dön
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
} 