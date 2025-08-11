import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  XCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Phone, 
  Mail, 
  FileText,
  ArrowRight,
  RefreshCw,
  CreditCard
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "İptal ve Değişim - Rotaly",
  description: "Rotaly otel rezervasyon iptal ve değişim politikaları",
};

export default function CancellationPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/images/logo3.png"
                alt="Rotaly Logo"
                width={80}
                height={80}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            İptal ve Değişim Politikaları
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Rezervasyonunuzu iptal etmek veya değiştirmek istiyorsanız, aşağıdaki politikalarımızı 
            inceleyebilirsiniz. Size en uygun seçeneği bulmanıza yardımcı oluyoruz.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">İptal Et</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Rezervasyonunuzu iptal etmek için tıklayın
              </p>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                İptal Et
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <RefreshCw className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Değiştir</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tarih veya otel bilgilerinizi değiştirin
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Değiştir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Destek</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Müşteri hizmetlerimizle iletişime geçin
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Arama Yap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Cancellation Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Cancellation */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Ücretsiz İptal
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Belirli süreler içinde ücretsiz iptal
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  24 saat öncesine kadar ücretsiz iptal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Tam iade garantisi
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Anında işlem onayı
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                Önerilen
              </Badge>
            </CardContent>
          </Card>

          {/* Partial Refund */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Kısmi İade
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Belirli koşullarda kısmi iade
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  12-24 saat arası %50 iade
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Kısmi iade işlemi
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  3-5 iş günü içinde iade
                </span>
              </div>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 w-fit">
                Koşullu
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Policies */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Detaylı İptal Politikaları
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Farklı otel türleri ve rezervasyon koşulları için iptal politikaları
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Hotel Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Image src="/images/opportunity1.jpg" alt="Otel" width={24} height={24} className="rounded mr-2" />
                    Oteller
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>24+ saat önce:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">%100 İade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>12-24 saat arası:</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">%50 İade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>12 saatten az:</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">İade Yok</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Image src="/images/opportunity2.jpg" alt="Villa" width={24} height={24} className="rounded mr-2" />
                    Villalar
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>48+ saat önce:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">%100 İade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>24-48 saat arası:</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">%75 İade</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>24 saatten az:</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">İade Yok</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Conditions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  Özel Koşullar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="space-y-2">
                    <p>• Sezonluk oteller için farklı politikalar uygulanabilir</p>
                    <p>• Promosyonlu fiyatlar iade edilemeyebilir</p>
                    <p>• Grup rezervasyonları için özel koşullar</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Doğal afet durumlarında tam iade</p>
                    <p>• Sağlık sorunları için doktor raporu gerekli</p>
                    <p>• İş seyahati iptalleri için şirket onayı</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Policies */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Değişim Politikaları
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Rezervasyon tarihlerinizi veya otel bilgilerinizi değiştirme koşulları
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tarih Değişikliği</h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24+ saat önce ücretsiz değişiklik</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>12-24 saat arası ücretli değişiklik</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>12 saatten az değişiklik yok</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Otel Değişikliği</h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Aynı tarih için ücretsiz değişiklik</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>Fiyat farkı varsa ek ücret</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>Müsaitlik durumuna bağlı</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Önemli:</strong> İptal ve değişim işlemleriniz için rezervasyon numaranızı 
            hazır bulundurun. Müşteri hizmetlerimiz size en hızlı şekilde yardımcı olacaktır.
          </AlertDescription>
        </Alert>

        {/* Contact Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-red-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Yardıma mı ihtiyacınız var?</h2>
                <p className="text-red-100">
                  İptal veya değişim işlemleriniz için bizimle iletişime geçin
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-red-200" />
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <p className="text-red-100">0850 XXX XX XX</p>
                  <p className="text-xs text-red-200">7/24 Hizmet</p>
                </div>
                
                <div className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-red-200" />
                  <h3 className="font-semibold mb-1">E-posta</h3>
                  <p className="text-red-100">iptal@rotaly.com</p>
                  <p className="text-xs text-red-200">24 saat içinde yanıt</p>
                </div>
                
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-3 text-red-200" />
                  <h3 className="font-semibold mb-1">Canlı Destek</h3>
                  <p className="text-red-100">Anında Yardım</p>
                  <p className="text-xs text-red-200">Sohbet başlatın</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 