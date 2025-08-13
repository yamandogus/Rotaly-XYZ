"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  Download,
  Building2,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";

// Dummy data for admin statistics - Tüm aylar
const monthlyRevenueData = [
  { month: "Ocak", revenue: 45000, bookings: 120 },
  { month: "Şubat", revenue: 52000, bookings: 135 },
  { month: "Mart", revenue: 48000, bookings: 110 },
  { month: "Nisan", revenue: 61000, bookings: 150 },
  { month: "Mayıs", revenue: 55000, bookings: 130 },
  { month: "Haziran", revenue: 68000, bookings: 165 },
  { month: "Temmuz", revenue: 72000, bookings: 180 },
  { month: "Ağustos", revenue: 85000, bookings: 210 },
  { month: "Eylül", revenue: 65000, bookings: 160 },
  { month: "Ekim", revenue: 58000, bookings: 145 },
  { month: "Kasım", revenue: 52000, bookings: 130 },
  { month: "Aralık", revenue: 75000, bookings: 190 },
];

const bookingSourceData = [
  { name: "Booking.com", value: 35, color: "#003580" },
  { name: "Airbnb", value: 25, color: "#FF5A5F" },
  { name: "Web Sitesi", value: 20, color: "#10B981" },
  { name: "Expedia", value: 15, color: "#FF6B35" },
  { name: "Diğer", value: 5, color: "#6B7280" },
];

const COLORS = bookingSourceData.map((d) => d.color);

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, trend }) => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      {trend && (
        <div className="flex items-center mt-2">
          <TrendingUp className={`h-3 w-3 mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

const RevenueChartCard = () => {
  return (
    <Card className="col-span-2 h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Aylık Gelir Trendi</CardTitle>
        <p className="text-xs text-muted-foreground">Tüm aylar gelir ve rezervasyon sayısı</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Gelir (₺)" />
            <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} name="Rezervasyon" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const BookingSourceCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Rezervasyon Kaynakları</CardTitle>
        <p className="text-xs text-muted-foreground">Rezervasyonların kaynak dağılımı</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={bookingSourceData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {bookingSourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center mt-2 text-xs">
          {bookingSourceData.map((item) => (
            <div key={item.name} className="flex items-center mr-3 mb-1">
              <span className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const QuickStatsCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Hızlı İstatistikler</CardTitle>
        <p className="text-xs text-muted-foreground">Önemli metrikler</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Bekleyen Ödemeler</span>
            <Badge variant="secondary">₺45,200</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Bu Hafta Rezervasyon</span>
            <Badge variant="outline">156</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Aktif Destek Talepleri</span>
            <Badge variant="destructive">8</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Yeni Otel Başvuruları</span>
            <Badge variant="default">3</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentActivityCard = () => {
  const activities = [
    { type: "rezervasyon", message: "Yeni rezervasyon: Antalya Resort", time: "2 dk önce", amount: "₺2,500" },
    { type: "ödeme", message: "Ödeme alındı: İstanbul Hotel", time: "15 dk önce", amount: "₺1,800" },
    { type: "iptal", message: "Rezervasyon iptali: Kapadokya Lodge", time: "1 saat önce", amount: "₺1,200" },
    { type: "rezervasyon", message: "Yeni rezervasyon: Bodrum Villa", time: "2 saat önce", amount: "₺3,000" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "rezervasyon": return <Calendar className="h-4 w-4 text-blue-500" />;
      case "ödeme": return <CreditCard className="h-4 w-4 text-green-500" />;
      case "iptal": return <Activity className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Son Aktiviteler</CardTitle>
        <p className="text-xs text-muted-foreground">Sistemdeki son işlemler</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{activity.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const StatisticPage = () => {
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Aylık Gelir Verileri\n" +
      "Ay,Gelir,Rezervasyon\n" +
      monthlyRevenueData.map(row => `${row.month},${row.revenue},${row.bookings}`).join("\n") +
      "\n\nRezervasyon Kaynakları\n" +
      "Kaynak,Yüzde\n" +
      bookingSourceData.map(row => `${row.name},${row.value}%`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "admin_statistics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin İstatistikleri</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-1" />
            CSV Dışa Aktar
          </Button>
        </div>
      </div>

      {/* 5 Card Layout - 3x2 Grid with one 2-span card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* İstatistik Kartları (3 adet) */}
        <MetricCard
          title="Toplam Gelir"
          value="₺289,000"
          subtitle="Bu ay"
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Aktif Oteller"
          value="24"
          subtitle="Sistemde kayıtlı"
          icon={<Building2 className="h-4 w-4 text-blue-500" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <MetricCard
          title="Toplam Rezervasyon"
          value="810"
          subtitle="Bu ay"
          icon={<Calendar className="h-4 w-4 text-purple-500" />}
          trend={{ value: 15.2, isPositive: true }}
        />

        {/* Aylık Gelir Trendi (2'lik yer kaplıyor) */}
        <RevenueChartCard />

        {/* Diğer Kartlar */}
        <BookingSourceCard />
        <QuickStatsCard />
        <RecentActivityCard />
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
            <p className="text-xs text-muted-foreground">Platform genel durumu</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sunucu Durumu</span>
                <Badge variant="default" className="bg-green-500">Aktif</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Veritabanı</span>
                <Badge variant="default" className="bg-green-500">Bağlı</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Durumu</span>
                <Badge variant="default" className="bg-green-500">Çalışıyor</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Son Güncelleme</span>
                <Badge variant="outline">2 dk önce</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticPage;