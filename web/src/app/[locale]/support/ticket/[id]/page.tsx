import { Metadata } from "next";
import { TicketDetailView } from "@/components/support";

export const metadata: Metadata = {
  title: "Destek Bileti - Rotaly",
  description: "Destek bileti detayları ve mesaj geçmişi",
};

interface TicketPageProps {
  params: {
    id: string;
  };
}

export default function TicketPage({ params }: TicketPageProps) {
  return <TicketDetailView ticketId={params.id} />;
}
