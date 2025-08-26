"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetStep } from "@/store/step/step-slice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface BookingPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const { id, locale } = use(params);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Booking sayfasına ilk girişte step'i sıfırla ve information sayfasına yönlendir
  setTimeout(() => {
    dispatch(resetStep());
    router.replace(`/${locale}/hotels/${id}/booking/information`);
  }, 4000);
  }, [id, locale, router, dispatch]);

  return (
    <div className="min-h-screen bg-background flex flex-col gap-4 items-center justify-center">
      <div className="w-full h-full">
      <DotLottieReact
        src="https://lottie.host/e837e66a-b157-4633-9758-332486d48d06/ZqA0wj2vcp.lottie"
        loop
        className="w-full h-full "
        autoplay
      />
      </div>
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">Yönlendiriliyor...</p>
      </div>
    </div>
  );
}
