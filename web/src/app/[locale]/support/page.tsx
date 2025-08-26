import { Metadata } from "next";
import { SupportDashboard } from "@/components/support";

export const metadata: Metadata = {
  title: "Destek - Rotaly",
  description:
    "Rotaly destek sistemi - Destek bileti oluşturun ve mevcut biletlerinizi görüntüleyin",
};

export default function SupportPage() {
  return <SupportDashboard />;
}
