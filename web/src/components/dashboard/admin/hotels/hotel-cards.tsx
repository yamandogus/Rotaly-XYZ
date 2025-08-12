import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React from 'react'





const HotelCards = () => {
  const t = useTranslations("AdminHotels");

  const statsData = [
    {
      title: t("allRegisteredHotels"),
      value: "20",
      subtitle: "",
    },
    {
      title: t("activeHotels"),
      value: "16",
      subtitle: "",
    },
    {
      title: t("totalBookings"),
      value: "3,245",
      subtitle: "",
    },
    {
      title: t("totalRevenue"),
      value: "18.2M TL",
      subtitle: "",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {statsData.map((stat, index) => (
      <Card key={index} className="bg-card border border-border hover:bg-accent transition-all duration-300 cursor-pointer">
        <CardContent className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-foreground text-center">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              {stat.title}
            </p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}   

export default HotelCards;