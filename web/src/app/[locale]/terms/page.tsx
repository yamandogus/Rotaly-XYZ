import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Scale, 
  Shield, 
  Users, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Gavel,
  Handshake
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Şartlar ve Koşullar - Rotaly",
  description: "Rotaly kullanım şartları ve koşulları",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
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
              <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Şartlar ve Koşullar
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Rotaly platformunu kullanarak aşağıdaki şartları ve koşulları kabul etmiş sayılırsınız. 
            Bu belge, hizmetlerimizi kullanırken uymanız gereken kuralları içerir.
          </p>
          <div className="mt-6">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-2 text-lg">
              <Gavel className="h-5 w-5 mr-2" />
              Yasal Uyumlu
            </Badge>
          </div>
        </div>

        {/* Last Updated */}
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-8">
          <Calendar className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Son Güncelleme:</strong> 27 Temmuz 2025. Bu şartlar düzenli olarak güncellenir.
          </AlertDescription>
        </Alert>

        {/* General Terms */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Genel Şartlar
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Platform kullanımı için temel kurallar ve koşullar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Hizmet Kapsamı</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Rotaly, otel rezervasyonu, konaklama hizmetleri ve seyahat planlaması 
                  konularında aracılık hizmeti sunar. Doğrudan otel sahibi değiliz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Kullanıcı Sorumlulukları
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Doğru ve güncel bilgi sağlama</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Hesap güvenliğini koruma</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Platform kurallarına uyma</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Yasal düzenlemelere uyum</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Platform Sorumlulukları
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Güvenli hizmet sunma</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Veri koruma ve gizlilik</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>7/24 destek hizmeti</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Şeffaf fiyatlandırma</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Terms */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Rezervasyon Şartları
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Rezervasyon yaparken uymanız gereken kurallar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rezervasyon Süreci</h3>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">1</div>
                      <span>Otel seçimi ve tarih belirleme</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">2</div>
                      <span>Kişisel bilgi girişi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">3</div>
                      <span>Ödeme işlemi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">4</div>
                      <span>Onay ve konfirmasyon</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ödeme Koşulları</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Tüm fiyatlar vergiler dahil değildir
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Ödeme anında gerçekleşir
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Güvenli ödeme yöntemleri kullanılır
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Fatura e-posta ile gönderilir
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  Önemli Not
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Rezervasyon onaylandıktan sonra değişiklik yapmak için otel politikalarına 
                  uygun hareket etmeniz gerekir. İptal ve değişiklik koşulları otelden otele farklılık gösterir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  İptal ve Değişiklik Politikası
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Rezervasyon iptal ve değişiklik koşulları
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">24+ Saat</div>
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Ücretsiz İptal</h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Tam iade garantisi
                </p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">12-24 Saat</div>
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Kısmi İade</h4>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  %50 iade
                </p>
              </div>
              
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">12 Saat</div>
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">İade Yok</h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  İptal edilemez
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Gavel className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Yasaklı Faaliyetler
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Platform kullanımında yasak olan davranışlar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hesap Güvenliği</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Başkalarının hesabını kullanma</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Hesap bilgilerini paylaşma</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Sahte hesap oluşturma</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Otomatik bot kullanımı</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">İçerik ve Davranış</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Yanıltıcı bilgi paylaşma</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Spam ve reklam içeriği</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Yasadışı faaliyetler</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span>Diğer kullanıcıları rahatsız etme</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Handshake className="h-8 w-8 text-purple-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Fikri Mülkiyet Hakları
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Platform içeriği ve telif hakları
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                                 Rotaly platformundaki tüm içerik, tasarım, logo, yazılım ve diğer materyaller 
                 Rotaly&apos;nin fikri mülkiyeti altındadır. Bu içeriklerin kopyalanması, dağıtılması 
                 veya ticari amaçla kullanılması yasaktır.
              </p>
              <p>
                Kullanıcılar tarafından paylaşılan içerikler (yorumlar, fotoğraflar vb.) 
                kullanıcının sorumluluğundadır. Rotaly, bu içeriklerin telif hakları ihlali 
                durumunda sorumlu tutulamaz.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-gray-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sorumluluk Sınırları
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Rotaly&apos;nin sorumluluk kapsamı ve sınırları
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Rotaly, otel hizmetlerinin kalitesi, konaklama koşulları veya otel politikaları 
                konusunda doğrudan sorumlu değildir. Bu konularda sorumluluk ilgili otel işletmecisine aittir.
              </p>
              <p>
                                 Platform kullanımından kaynaklanan teknik sorunlar, veri kaybı veya hizmet 
                 kesintileri için Rotaly&apos;nin sorumluluğu, ödediğiniz ücretle sınırlıdır.
              </p>
              <p>
                Seyahat planlarınızın iptal edilmesi, gecikmesi veya değişmesi durumlarında 
                Rotaly, sadece platform üzerinden yapılan rezervasyonlar için sorumludur.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Şartlar Hakkında Sorularınız mı var?</h2>
              <p className="text-purple-100">
                Şartlar ve koşullarımız hakkında detaylı bilgi için bizimle iletişime geçin
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-1">E-posta</h3>
                <p className="text-purple-100">legal@rotaly.com</p>
                <p className="text-xs text-purple-200">Hukuk departmanı</p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-1">Telefon</h3>
                <p className="text-purple-100">0850 XXX XX XX</p>
                <p className="text-xs text-purple-200">Hukuk hattı</p>
              </div>
              
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-purple-100">İstanbul, Türkiye</p>
                <p className="text-xs text-purple-200">Merkez ofis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 