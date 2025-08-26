"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SupportRepStatistics } from "@/types/support";
import { SupportService } from "@/services/supportService";
import { toast } from "react-hot-toast";
import { Users, Ticket, TrendingUp, Clock } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<{
    supportReps: SupportRepStatistics[];
    summary: {
      totalReps: number;
      totalOpenTickets: number;
      averageTicketsPerRep: number;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const data = await SupportService.getSupportRepStatistics();
      setStatistics(data);
    } catch (error) {
      console.error("Error loading statistics:", error);
      toast.error("İstatistikler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-600">İstatistikler yükleniyor...</p>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">İstatistik verileri yüklenemedi</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Destek Yönetim Paneli
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Destek Temsilcisi
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.summary.totalReps}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Açık Bilet
            </CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {statistics.summary.totalOpenTickets}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temsilci Başına Ortalama
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.summary.averageTicketsPerRep.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Representatives Table */}
      <Card>
        <CardHeader>
          <CardTitle>Destek Temsilcileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Temsilci
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    E-posta
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Açık Biletler
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Toplam Biletler
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    İş Yükü
                  </th>
                </tr>
              </thead>
              <tbody>
                {statistics.supportReps.map((rep) => (
                  <tr
                    key={rep.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {rep.name} {rep.surname}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                      {rep.email}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge
                        variant={
                          rep.openTickets > 10
                            ? "destructive"
                            : rep.openTickets > 5
                            ? "default"
                            : "secondary"
                        }
                      >
                        {rep.openTickets}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">
                      {rep.totalTickets}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              rep.openTickets > 10
                                ? "bg-red-500"
                                : rep.openTickets > 5
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                (rep.openTickets / 15) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {Math.round((rep.openTickets / 15) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
