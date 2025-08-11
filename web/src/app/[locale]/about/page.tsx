import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Globe, 
  Award, 
  Shield, 
  Heart, 
  Star, 
  TrendingUp,
  Target,
  Lightbulb
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda - Rotaly",
  description: "Rotaly otel rezervasyon sistemi hakkında detaylı bilgi ve misyonumuz",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/images/logo3.png"
                alt="Rotaly Logo"
                width={120}
                height={120}
              />
              <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Rotaly Hakkında
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            2020 yılından bu yana Türkiye&apos;nin önde gelen otel rezervasyon platformlarından biri olarak, 
            misafirlerimize en iyi konaklama deneyimini sunmaya devam ediyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 text-lg">
              <Users className="h-5 w-5 mr-2" />
              1M+ Mutlu Misafir
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 text-lg">
              <Globe className="h-5 w-5 mr-2" />
              50+ Şehir
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-2 text-lg">
              <Award className="h-5 w-5 mr-2" />
              1000+ Otel
            </Badge>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-10 w-10 text-blue-500" />
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Misyonumuz
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Misafirlerimize en uygun fiyatlarla, en kaliteli konaklama seçeneklerini sunarak, 
                  unutulmaz tatil deneyimleri yaşatmak. Teknoloji ve müşteri memnuniyetini birleştirerek, 
                  seyahat endüstrisinde güvenilir bir partner olmak.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">99%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Müşteri Memnuniyeti</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Destek Hizmeti</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="h-10 w-10 text-green-500" />
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Vizyonumuz
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Türkiye&apos;nin ve bölgenin en büyük dijital konaklama platformu olmak. 
                  Yapay zeka ve makine öğrenmesi teknolojileriyle kişiselleştirilmiş 
                  öneriler sunarak, seyahat deneyimini yeniden tanımlamak.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5M+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Hedef Misafir</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Şehir Hedefi</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 px-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Değerlerimiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Her kararımızda ve her işlemimizde bu değerleri ön planda tutuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Güvenilirlik</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Müşteri verilerinin güvenliği ve şeffaf işlemler bizim için çok önemli
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Müşteri Odaklılık</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Her kararımızda müşteri memnuniyetini ön planda tutuyoruz
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sürekli İyileştirme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Teknolojimizi ve hizmetlerimizi sürekli geliştiriyoruz
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Kalite</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  En yüksek kalite standartlarında hizmet sunmaya odaklanıyoruz
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ekibimiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deneyimli ve uzman ekibimizle size en iyi hizmeti sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-2xl">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/opportunity3.jpg"
                    alt="CEO"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Ahmet Yılmaz
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">CEO & Kurucu</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  15+ yıl seyahat endüstrisi deneyimi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/opportunity4.jpg"
                    alt="CTO"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Zeynep Kaya
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-2">CTO</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Teknoloji ve inovasyon uzmanı
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/opportunity5.jpg"
                    alt="COO"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Mehmet Demir
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">COO</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Operasyon ve müşteri deneyimi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 mb-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Rakamlarla Rotaly</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Başarılarımızı sayılarla gösteriyoruz
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Mutlu Misafir</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Ortak Otel</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Şehir</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Memnuniyet</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
} 