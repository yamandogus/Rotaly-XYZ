"use client";
import React from "react";
import { useTranslations } from "next-intl";
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
  Tooltip as PieTooltip,
} from "recharts";
import {
  ChevronDown,
  Repeat,
  Download,
  Home,
  Utensils,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const reservationSourceData = [
  { name: "İç rezervasyon", value: 400, color: "#8884d8" },
  { name: "Booking.com", value: 300, color: "#83a6ed" },
  { name: "Airbnb", value: 300, color: "#8dd1e1" },
  { name: "Web sitesi", value: 200, color: "#a4de6c" },
  { name: "Expedia", value: 100, color: "#d0ed57" },
];

const COLORS = reservationSourceData.map((d) => d.color);

const revenueData = [
  { name: "Ocak", uv: 400 },
  { name: "Şubat", uv: 300 },
  { name: "Mart", uv: 500 },
  { name: "Nisan", uv: 200 },
  { name: "Mayıs", uv: 300 },
];

interface StatsCardProps {
  title: string;
  status: string;
  tlValue: string | number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, status, tlValue, icon }) => (
  <Card className="flex flex-col h-full">
    <CardHeader className="flex items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground">{status}</p>
      <div className="flex flex-col mt-2">
        <span className="text-xl font-bold">₺{tlValue}</span>
        <span className="text-sm text-muted-foreground">Toplam</span>
      </div>
    </CardContent>
  </Card>
);

const RevenueSharingCard = () => {
  const t = useTranslations("Statistics");
  return (
    <Card className="col-span-1 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t("revenueSharing.title")}</CardTitle>
        <p className="text-xs text-muted-foreground">{t("revenueSharing.description")}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {[
          { icon: <Home className="h-4 w-4 text-primary" />, label: t("revenueSharing.rooms"), value: "₺11.040", badge: "94.85%", progress: 94.85 },
          { icon: <Utensils className="h-4 w-4 text-primary" />, label: t("revenueSharing.food"), value: "₺600", badge: "5.15%", progress: 5.15 },
          { icon: <Star className="h-4 w-4 text-primary" />, label: t("revenueSharing.extraServices"), value: "₺0", badge: "0.00%", progress: 0 },
        ].map(({ icon, label, value, badge, progress }, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">{icon}<span className="text-sm font-medium">{label}</span></div>
              <div className="text-sm font-medium">
                {value} <Badge variant="secondary">{badge}</Badge>
              </div>
            </div>
            <progress value={progress} max={100} className="h-2 w-full mt-1 rounded" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const PaymentTypeCard = () => {
  const t = useTranslations("Statistics");
  return (
    <Card className="col-span-1 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t("paymentTypes.title")}</CardTitle>
        <p className="text-xs text-muted-foreground">{t("paymentTypes.description")}</p>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">{t("paymentTypes.noData")}</div>
      </CardContent>
    </Card>
  );
};

const ReservationSourceCard = () => {
  const t = useTranslations("Statistics");
  return (
    <Card className="col-span-1 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t("reservationSources.title")}</CardTitle>
        <p className="text-xs text-muted-foreground">{t("reservationSources.description")}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={reservationSourceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {reservationSourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center mt-2 text-xs">
          {reservationSourceData.map((item) => (
            <div key={item.name} className="flex items-center mr-4">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="ml-1 text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RevenueAndOccupancyCard = () => {
  const t = useTranslations("Statistics");
  return (
    <Card className="col-span-3 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t("revenueAndOccupancy.title")}</CardTitle>
        <p className="text-xs text-muted-foreground">{t("revenueAndOccupancy.description")}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-3xl font-bold">28.63%</p>
            <p className="text-xs text-muted-foreground">{t("revenueAndOccupancy.occupancy")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold">₺11.640</p>
            <p className="text-xs text-muted-foreground">{t("revenueAndOccupancy.totalRevenue")}</p>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const StatisticPage = () => {
  const t = useTranslations("Statistics");
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><span>{t("dateRange")}</span><ChevronDown className="h-4 w-4 ml-2" /></Button>
          <Button variant="outline"><span>{t("allRooms")}</span><ChevronDown className="h-4 w-4 ml-2" /></Button>
          <Button><Repeat className="h-4 w-4 mr-1" />{t("compare")}</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-1" />{t("exportCsv")}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
        <StatsCard
          title={t("payments.received.title")}
          status={t("payments.received.status", { count: 6 })}
          tlValue="3.560"
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title={t("payments.pending.title")}
          status={t("payments.pending.status", { count: 17 })}
          tlValue="8.080"
          icon={<AlertCircle className="h-4 w-4 text-yellow-500" />}
        />
        <RevenueSharingCard />
        <PaymentTypeCard />
        <ReservationSourceCard />
        <RevenueAndOccupancyCard />
      </div>
    </div>
  );
};

export default StatisticPage;
