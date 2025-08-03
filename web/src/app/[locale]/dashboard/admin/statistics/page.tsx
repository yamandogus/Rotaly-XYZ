import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

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
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
        <Card className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Toplam Rezervasyon Sayısı</CardTitle>
            <CardDescription>Toplam rezervasyon sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
        <Card className="bg-card cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Toplam Otel Sayısı</CardTitle>
            <CardDescription>Toplam otel sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
