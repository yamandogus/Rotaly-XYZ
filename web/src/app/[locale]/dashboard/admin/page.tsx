import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2Icon, HotelIcon, UsersIcon, BarChart3Icon, SettingsIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">

        {/* Ana Menü Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <UsersIcon className="w-10 h-10 text-blue-500" />
                <CardTitle className="text-center">
                  Kullanıcı Yönetimi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Tüm kullanıcıları görüntüleyebilir, düzenleyebilir ve yönetebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <HotelIcon className="w-10 h-10 text-green-500" />
                <CardTitle className="text-center">
                  Otel Yönetimi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Otelleri görüntüleyebilir, onaylayabilir ve düzenleyebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <BarChart3Icon className="w-10 h-10 text-purple-500" />
                <CardTitle className="text-center">
                  İstatistikler & Raporlar
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Rezervasyon istatistikleri ve sistem raporlarını görüntüleyebilirsiniz.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* İkincil Menü Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card onClick={() => router.push("/dashboard/admin/company")} className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <Building2Icon className="w-10 h-10 text-orange-500" />
                <CardTitle className="text-center">
                  Şirket Ayarları
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Şirket bilgilerini ve genel sistem ayarlarını yönetebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <ShieldCheckIcon className="w-10 h-10 text-red-500" />
                <CardTitle className="text-center">
                  Güvenlik & Denetim
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Sistem güvenliği ve kullanıcı aktivitelerini denetleyebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <SettingsIcon className="w-10 h-10 text-gray-500" />
                <CardTitle className="text-center">
                  Sistem Ayarları
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Uygulama ayarları, entegrasyonlar ve yapılandırmaları yönetebilirsiniz.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
