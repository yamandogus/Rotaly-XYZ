import { Metadata } from "next";
import { TicketDetailView } from "@/components/support";

export const metadata: Metadata = {
  title: "Destek Bileti - Rotaly",
  description: "Destek bileti detayları ve mesaj geçmişi",
};

interface TicketPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { id } = await params;
  return <TicketDetailView ticketId={id} />;
}
