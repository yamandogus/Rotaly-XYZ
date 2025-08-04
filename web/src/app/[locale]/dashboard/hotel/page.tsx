import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDaysIcon, BedDoubleIcon, SettingsIcon, BarChart3Icon, UsersIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function HotelDashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-foreground">
            Otel Yönetim Paneli
          </h1>
          <p className="text-muted-foreground mt-4">
            Otel yönetim paneline hoş geldiniz. Rezervasyonlarınızı, odalarınızı ve otel bilgilerinizi buradan yönetebilirsiniz.
          </p>
        </div>
        
        {/* Ana Yönetim Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
                <CardTitle className="text-center">
                  Rezervasyon Yönetimi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Gelen rezervasyonları görüntüleyebilir, onaylayabilir ve yönetebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <BedDoubleIcon className="w-10 h-10 text-green-500" />
                <CardTitle className="text-center">
                  Oda & Fiyat Yönetimi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Odalarınızı düzenleyebilir, fiyatlarınızı güncelleyebilir ve müsaitliği ayarlayabilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <SettingsIcon className="w-10 h-10 text-purple-500" />
                <CardTitle className="text-center">
                  Otel Profili
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Otel bilgilerinizi, fotoğraflarınızı ve hizmet bilgilerinizi güncelleyebilirsiniz.
              </p>
            </CardContent>
          </Card>
        </div>

     {/* İkincil Özellik Kartları */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
  <Link href="/statistics">
    <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex flex-col justify-center items-center gap-2">
          <BarChart3Icon className="w-10 h-10 text-orange-500" />
          <CardTitle className="text-center">
            İstatistikler & Raporlar
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Doluluk oranları, gelir analizleri ve performans raporlarını görüntüleyebilirsiniz.
        </p>
      </CardContent>
    </Card>
  </Link>
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <UsersIcon className="w-10 h-10 text-teal-500" />
                <CardTitle className="text-center">
                  Misafir Yönetimi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Misafir bilgilerini görüntüleyebilir ve iletişim geçmişini takip edebilirsiniz.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col justify-center items-center gap-2">
                <StarIcon className="w-10 h-10 text-yellow-500" />
                <CardTitle className="text-center">
                  Değerlendirmeler
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-center text-sm text-muted-foreground">
                Misafir yorumlarını ve değerlendirmelerini görüntüleyebilir ve yanıtlayabilirsiniz.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}