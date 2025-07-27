import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Shield, CreditCard, Calendar, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular - Rotaly",
  description: "Rotaly otel rezervasyon sistemi hakkında sıkça sorulan sorular ve cevapları",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/images/RT.png"
                alt="Rotaly Logo"
                width={80}
                height={80}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Rotaly otel rezervasyon sistemi hakkında merak ettiğiniz her şeyi burada bulabilirsiniz.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Sorunuzu yazın..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Link href="/privacy">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Güvenlik</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Ödeme ve veri güvenliği</p>
            </CardContent>
            </Link>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <CreditCard className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Ödeme</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Ödeme yöntemleri ve faturalar</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Link href="/categories/hotel">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Rezervasyon</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Rezervasyon işlemleri</p>
            </CardContent>
            </Link>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Link href="/support/live-chat">
            <CardContent 
               className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Canlı Destek</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Canlı Destek Ekibine Bağlanın</p>
            </CardContent></Link>
          </Card>
        </div>

        {/* FAQ Accordion */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Genel Sorular
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              En çok sorulan sorular ve detaylı cevapları
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Rezervasyon
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Rezervasyonumu nasıl iptal edebilirim?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    Rezervasyonunuzu iptal etmek için hesabınıza giriş yapın ve Rezervasyonlarım
                    bölümünden ilgili rezervasyonu seçin. İptal işlemi için otel politikalarına 
                    bağlı olarak belirli süreler geçerlidir. Detaylı bilgi için müşteri hizmetlerimizle 
                    iletişime geçebilirsiniz.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Ödeme
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Hangi ödeme yöntemlerini kabul ediyorsunuz?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    Kredi kartı, banka kartı, PayPal ve banka havalesi gibi güvenli ödeme yöntemlerini 
                    kabul ediyoruz. Tüm ödeme işlemleriniz SSL şifreleme ile korunmaktadır. 
                    Ödeme bilgileriniz asla üçüncü taraflarla paylaşılmaz.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Değişiklik
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Rezervasyon tarihlerimi değiştirebilir miyim?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    Evet, rezervasyon tarihlerinizi değiştirebilirsiniz. Bu işlem için otel 
                    müsaitlik durumuna ve iptal politikalarına bağlıdır. Değişiklik talebinizi 
                    en az 24 saat önceden yapmanızı öneririz.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      Destek
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Müşteri hizmetlerine nasıl ulaşabilirim?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    7/24 müşteri hizmetlerimiz size yardımcı olmaya hazır. Canlı sohbet, 
                    telefon (0850 XXX XX XX) veya e-posta (destek@rotaly.com) yoluyla 
                    bizimle iletişime geçebilirsiniz.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Güvenlik
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Kişisel bilgilerim güvende mi?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    Kişisel bilgilerinizin güvenliği bizim için çok önemli. Tüm verileriniz 
                    SSL şifreleme ile korunur ve KVKK uyumlu olarak saklanır. Bilgileriniz 
                    asla üçüncü taraflarla paylaşılmaz.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Fiyat
                    </Badge>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Fiyatlara vergiler dahil mi?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                  <p>
                    Sitemizde gösterilen fiyatlar genellikle vergiler dahil değildir. 
                    Final fiyatı rezervasyon sırasında detaylı olarak gösterilir. 
                    Konaklama vergisi ve diğer ek ücretler otel politikalarına göre değişebilir.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Hala sorunuz mu var?</h2>
                <p className="text-blue-100">
                  Müşteri hizmetlerimiz size yardımcı olmaya hazır
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <p className="text-blue-100">0850 XXX XX XX</p>
                </div>
                
                <div className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">E-posta</h3>
                  <p className="text-blue-100">destek@rotaly.com</p>
                </div>
                
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                  <p className="text-blue-100">7/24 Hizmet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 