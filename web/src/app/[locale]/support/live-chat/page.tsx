"use client";

import React from 'react';
import { SendIcon, PhoneIcon, ClockIcon, MessageCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveChatSupportPage = () => {
 
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Canlı Destek</h1>
          <p className="text-gray-600">Destek ekibimizle anında iletişime geçin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Alanı */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage />
                    </Avatar>
                    <div>
                      <CardTitle className="text-white text-lg">Rotaly Hotel</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={'default'} className="text-xs">
                          Çevrimiçi
                        </Badge>
                        <span className="text-sm opacity-90">Rotaly Hotel Asistanı</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">Yanıt süresi: ~2 dk</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                {/* Mesajlar Alanı */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
              
                </div>

                {/* Mesaj Gönderme Alanı */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mesajınızı yazın..."
                      className="flex-1"
                    />
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <SendIcon className="w-4 h-4" />
                    </Button>
                  </div>
                 
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Yan Panel */}
          <div className="space-y-4">
            {/* Bağlantı Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bağlantı Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                  <span className="text-sm">
                    Bağlandı
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Destek ekibimizle bağlantınız kuruldu.
                </p>
              </CardContent>
            </Card>

            {/* Hızlı Yanıtlar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı Yanıtlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Rezervasyon iptal etmek istiyorum",
                    "Ödeme sorunu yaşıyorum",
                    "Oda değişikliği yapmak istiyorum",
                    "Kampanya kodları hakkında bilgi"
                  ].map((text, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2"
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* İletişim Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İletişim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">+90 212 555 0123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">destek@rotaly.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">7/24 Hizmet</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatSupportPage;