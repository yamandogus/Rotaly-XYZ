import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDaysIcon, BedDoubleIcon, SettingsIcon, BarChart3Icon, UsersIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const hotelMenu = [
  {
    title: "Rezervasyon Yönetimi",
    icon: CalendarDaysIcon,
    description: "Gelen rezervasyonları görüntüleyebilir, onaylayabilir ve yönetebilirsiniz.",
    link: "/dashboard/hotel/reservations",
    color: "text-blue-500",
  },
  {
    title: "Oda & Fiyat Yönetimi",
    icon: BedDoubleIcon,
    description: "Odalarınızı düzenleyebilir, fiyatlarınızı güncelleyebilir ve müsaitliği ayarlayabilirsiniz.",
    link: "/dashboard/hotel/rooms",
    color: "text-green-500",
  },
  {
    title: "Otel Profili",
    icon: SettingsIcon,
    description: "Otel bilgilerinizi, fotoğraflarınızı ve hizmet bilgilerinizi güncelleyebilirsiniz.",
    link: "/dashboard/hotel/profile",
    color: "text-purple-500",
  },
  {
    title: "İstatistikler & Raporlar",
    icon: BarChart3Icon,
    description: "Doluluk oranları, gelir analizleri ve performans raporlarını görüntüleyebilirsiniz.",
    link: "/dashboard/hotel/statistic",
    color: "text-orange-500",
  },
  {
    title: "Misafir Yönetimi",
    icon: UsersIcon,
    description: "Misafir bilgilerini görüntüleyebilir ve iletişim geçmişini takip edebilirsiniz.",
    link: "/dashboard/hotel/guests",
    color: "text-teal-500",
  },
  {
    title: "Değerlendirmeler",
    icon: StarIcon,
    description: "Misafir yorumlarını ve değerlendirmelerini görüntüleyebilir ve yanıtlayabilirsiniz.",
    link: "/dashboard/hotel/reviews",
    color: "text-yellow-500",
  },
];

export default function HotelDashboard() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
     

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {hotelMenu.map((item, index) => {
            const IconComponent = item.icon;
            const handleClick = () => {
              router.push(item.link);
            };

            return (
              <Card
                key={index}
                onClick={handleClick}
                className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <IconComponent className={`w-10 h-10 ${item.color}`} />
                    <CardTitle className="text-center">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
