"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, MessageCircleIcon, FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const adminMenu = [
  {
    title: "Canlı Destek",
    icon: MessageCircleIcon,
    description: "Canlı destek ile müşteri desteği sağlayabilirsiniz.",
    link: "/dashboard/support/live-support",
    color: "text-green-500",
  },
  {
    title: "İstatistikler & Raporlar",
    icon: BarChart3Icon,
    description: "Rezervasyon istatistikleri ve sistem raporlarını görüntüleyebilirsiniz.",
    link: "/dashboard/support/statistic",
    color: "text-purple-500",
  },
  {
    title: "Bilgilendirme ve Sistem Bilgileri",
    icon: FileTextIcon,
    description: "Bilgilendirme ve sistem bilgilerini görüntüleyebilirsiniz.",
    link: "/dashboard/support/information",
    color: "text-blue-500",
  },
];

export default function SupportDashboard() {
  const router = useRouter();
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Admin Menü Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {adminMenu.map((item, index) => {
            const IconComponent = item.icon;
            const handleClick = () => {
              if (item.link !== "#") {
                router.push(item.link);
              }
            };

            return (
              <Card 
                key={index}
                onClick={handleClick}
                className="bg-card cursor-pointer  hover:bg-accent hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <IconComponent className={`w-10 h-10 ${item.color}`} />
                    <CardTitle className="text-center">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="">
                  <p className="text-center text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
