import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2Icon, HotelIcon, UsersIcon, BarChart3Icon, SettingsIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const adminMenu = [
  {
    title: "Kullanıcı Yönetimi",
    icon: UsersIcon,
    description: "Tüm kullanıcıları görüntüleyebilir, düzenleyebilir ve yönetebilirsiniz.",
    link: "#",
    color: "text-blue-500",
  },
  {
    title: "Müşteri Yönetimi",
    icon: HotelIcon,
    description: "Otelleri görüntüleyebilir, onaylayabilir ve düzenleyebilirsiniz.",
    link: "/dashboard/admin/customers",
    color: "text-green-500",
  },
  {
    title: "İstatistikler & Raporlar",
    icon: BarChart3Icon,
    description: "Rezervasyon istatistikleri ve sistem raporlarını görüntüleyebilirsiniz.",
    link: "/dashboard/admin/statistics",
    color: "text-purple-500",
  },
  {
    title: "Şirket Ayarları",
    icon: Building2Icon,
    description: "Şirket bilgilerini ve genel sistem ayarlarını yönetebilirsiniz.",
    link: "/dashboard/admin/company",
    color: "text-orange-500",
  },
  {
    title: "Güvenlik & Denetim",
    icon: ShieldCheckIcon,
    description: "Sistem güvenliği ve kullanıcı aktivitelerini denetleyebilirsiniz.",
    link: "#",
    color: "text-red-500",
  },
  {
    title: "Sistem Ayarları",
    icon: SettingsIcon,
    description: "Uygulama ayarları, entegrasyonlar ve yapılandırmaları yönetebilirsiniz.",
    link: "#",
    color: "text-gray-500",
  },
];

export default function AdminDashboard() {
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
