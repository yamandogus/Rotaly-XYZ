import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Users, 
  FileText, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Rotaly",
  description: "Rotaly gizlilik politikası ve kişisel veri koruma ilkeleri",
};

export default function PrivacyPage() {
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
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kişisel verilerinizin güvenliği bizim için çok önemli. Bu politika, verilerinizin 
            nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
          </p>
          <div className="mt-6">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 text-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              KVKK Uyumlu
            </Badge>
          </div>
        </div>

        {/* Last Updated */}
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-8">
          <Calendar className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Son Güncelleme:</strong> 15 Ocak 2024. Bu politika düzenli olarak güncellenir.
          </AlertDescription>
        </Alert>

        {/* Data Collection */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Topladığımız Veriler
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Hizmet kalitemizi artırmak için topladığımız veri türleri
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  Kişisel Bilgiler
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Ad, soyad ve iletişim bilgileri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Doğum tarihi ve kimlik bilgileri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Ödeme ve kredi kartı bilgileri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Pasaport ve seyahat belgeleri
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  Kullanım Verileri
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Web sitesi kullanım istatistikleri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Arama geçmişi ve tercihler
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cihaz ve tarayıcı bilgileri
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Konum verileri (izinle)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Usage */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verilerin Kullanım Amacı
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Kişisel verilerinizi hangi amaçlarla kullanıyoruz
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Rezervasyon İşlemleri</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Otel rezervasyonlarınızı gerçekleştirmek ve yönetmek için
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Müşteri Hizmetleri</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Size daha iyi destek hizmeti sunmak için
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Kişiselleştirme</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Size özel öneriler ve deneyimler sunmak için
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Güvenlik</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Hesabınızı ve verilerinizi korumak için
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Lock className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Veri Koruma Önlemleri
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Verilerinizi korumak için aldığımız güvenlik önlemleri
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Teknik Güvenlik</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>SSL/TLS şifreleme ile güvenli veri aktarımı</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Güvenli sunucu altyapısı ve düzenli güvenlik güncellemeleri</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Çok faktörlü kimlik doğrulama sistemi</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Düzenli güvenlik denetimleri ve penetrasyon testleri</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organizasyonel Güvenlik</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span>Çalışanlarımıza düzenli gizlilik eğitimleri</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span>Veri erişim yetkilerinin sınırlandırılması</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span>Gizlilik sözleşmeleri ve yasal uyumluluk</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span>Veri işleme kayıtları ve denetim izleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Veri Paylaşımı
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Verilerinizi kimlerle paylaşıyoruz ve neden
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  Önemli Not
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Kişisel verilerinizi asla üçüncü taraflarla satmıyor veya kiralıyoruz. 
                  Sadece hizmet kalitemizi artırmak için gerekli durumlarda paylaşıyoruz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Otel Ortaklarımız</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Rezervasyon işlemlerinizi tamamlamak için sadece gerekli bilgileri 
                    otel ortaklarımızla paylaşırız.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Ödeme Sağlayıcıları</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Güvenli ödeme işlemleri için lisanslı ödeme sağlayıcılarıyla 
                    çalışırız.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Yasal Zorunluluklar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Yasal yükümlülüklerimiz gereği yetkili makamlarla veri paylaşımı 
                    yapabiliriz.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Analitik Hizmetleri</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Hizmet kalitemizi artırmak için anonim analitik verileri 
                    kullanırız.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Kullanıcı Hakları
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  KVKK kapsamında sahip olduğunuz haklar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bilgi Alma Hakkı</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Hangi verilerinizin işlendiğini öğrenme
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Verilerinizin hangi amaçla kullanıldığını öğrenme
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Verilerinizin kimlerle paylaşıldığını öğrenme
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Müdahale Hakkı</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Verilerinizin düzeltilmesini isteme
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Verilerinizin silinmesini isteme
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Veri işlemeye itiraz etme
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Gizlilik Sorularınız mı var?</h2>
              <p className="text-green-100">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçin
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-1">E-posta</h3>
                <p className="text-green-100">privacy@rotaly.com</p>
                <p className="text-xs text-green-200">Gizlilik ekibi</p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-1">Telefon</h3>
                <p className="text-green-100">0850 XXX XX XX</p>
                <p className="text-xs text-green-200">Gizlilik hattı</p>
              </div>
              
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-green-100">İstanbul, Türkiye</p>
                <p className="text-xs text-green-200">Veri Sorumlusu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 