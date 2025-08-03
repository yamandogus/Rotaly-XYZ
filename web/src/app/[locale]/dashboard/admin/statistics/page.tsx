import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartLineLabelCustom } from "@/components/dashboard/chart-line-label";
import React from "react";
import { Calendar, Hotel, User } from "lucide-react";

const StatisticsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">İstatistikler</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Toplam Müşteri Sayısı</CardTitle>
            <CardDescription>Toplam müşteri sayısı</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 justify-between">
            <p>1015</p>
            <User className="w-4 h-4" />
          </CardContent>
        </Card>
        <Card className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Toplam Rezervasyon Sayısı</CardTitle>
            <CardDescription>Toplam rezervasyon sayısı</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 justify-between">
            <p>14000</p>
            <Calendar className="w-4 h-4" />
          </CardContent>
        </Card>
        <Card className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Toplam Otel Sayısı</CardTitle>
            <CardDescription>Toplam otel sayısı</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 justify-between">
            <p>1000</p>
            <Hotel className="w-4 h-4" />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Müşteri Sayısı
        </h2>
        <ChartLineLabelCustom/>
      </div>
    </div>
  );
};

export default StatisticsPage;
