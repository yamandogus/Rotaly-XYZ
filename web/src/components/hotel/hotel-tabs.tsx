"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Rating, RatingButton } from "../ui/shadcn-io/rating";


export default function HotelTabs() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Açıklama</TabsTrigger>
          <TabsTrigger value="reviews">Değerlendirme</TabsTrigger>
          <TabsTrigger value="map">Harita</TabsTrigger>
        </TabsList>

               <TabsContent value="description" className="pt-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold mb-3">Marakeş'in Kalbinde Huzurlu Bir Kaçış</h2>
            <p className="mb-4">
              Marakeş'in kalbinde yer alan Riad Deluxe, geleneksel Fas mimarisiyle modern konforu birleştiriyor. Geniş avlusu, serinletici havuzu ve huzurlu bahçeleriyle şehrin gürültüsünden uzaklaşmak için ideal bir sığınak sunar. Her odası özenle dekore edilmiş olup, Fas el sanatlarının zenginliğini yansıtır.
            </p>
            <p className="mb-4">
              Tüm önemli turistik mekanlara yürüme mesafesinde olan otelimiz, Djemaa el-Fna Meydanı'na ve Medine çarşılarına kolay erişim sağlar. Misafirlerimiz, geleneksel Fas hamamımızda rahatlayabilir veya çatı terasımızda panoramik şehir manzarası eşliğinde nane çayı keyfi yapabilirler.
            </p>
            <h3 className="text-lg font-semibold mb-2 mt-4">Odalar ve Süitler</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Özenle dekore edilmiş, konforlu odalar ve lüks süitler.</li>
              <li>Her odada özel banyo, klima, ücretsiz Wi-Fi ve düz ekran TV.</li>
              <li>Geleneksel Fas el sanatları ve modern olanaklar.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Hizmetler</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>24 Saat Resepsiyon</li>
              <li>Oda Servisi</li>
              <li>Ücretsiz Wi-Fi</li>
              <li>Restoran ve Bar</li>
              <li>Açık Havuz</li>
              <li>Geleneksel Hamam</li>
              <li>Çatı Terası</li>
              <li>Havalimanı Transferi (ek ücretli)</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-4">Yerel İpuçları</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Djemaa el-Fna Meydanı'nı ziyaret edin ve akşam yemeği için yerel yemek tezgahlarını deneyin.</li>
              <li>Medine'nin dar sokaklarında kaybolun ve el yapımı ürünler bulun.</li>
              <li>Jardin Majorelle'i keşfedin.</li>
              <li>Baharat çarşılarını ziyaret edin.</li>
            </ul>
          </TabsContent>

      <TabsContent value="reviews" className="pt-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold mb-3">Misafir Değerlendirmeleri (125)</h2>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-blue-600">4.8</span>
                <Rating defaultValue={4.8} readOnly>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton
                      key={index}
                      size={20}
                      className="text-yellow-500"
                    />
                  ))}
                </Rating>
                <span className="text-sm text-gray-500">Mükemmel</span>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((starCount) => (
                  <div key={starCount} className="flex items-center gap-2">
                    <span className="text-sm">{starCount} Yıldız</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width:
                            starCount === 5
                              ? "90%"
                              : starCount === 4
                              ? "70%"
                              : starCount === 3
                              ? "30%"
                              : starCount === 2
                              ? "10%"
                              : "5%",
                        }} // Example widths
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews (mock) */}
            <div className="border-t pt-4 mt-4 space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="font-semibold mr-2">Ayşe Yılmaz</div>
                  <Rating defaultValue={5} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} size={14} className="text-yellow-500" />
                    ))}
                  </Rating>
                  <span className="text-sm text-gray-500 ml-2">5 gün önce</span>
                </div>
                <p className="text-sm">
                  "Harika bir deneyimdi! Otelin konumu muhteşem, personel çok ilgili ve odalar tertemizdi. Kesinlikle tekrar kalacağım."
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="font-semibold mr-2">Mehmet Demir</div>
                  <Rating defaultValue={4} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} size={14} className="text-yellow-500" />
                    ))}
                  </Rating>
                  <span className="text-sm text-gray-500 ml-2">2 hafta önce</span>
                </div>
                <p className="text-sm">
                  "Otel çok şık, Fas atmosferini sonuna kadar yaşatıyor. Kahvaltı biraz daha çeşitli olabilirdi ama genel olarak çok memnun kaldık."
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4">Tüm Değerlendirmeleri Gör</Button>
            </div>
          </TabsContent>

     <TabsContent value="map" className="pt-4">
            <h2 className="text-xl font-semibold mb-3">Harita</h2>
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              {/* Placeholder for map */}
              <Image
                src="/images/map_placeholder.png" // Placeholder image for a map
                alt="Hotel Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                <span className="text-lg font-semibold">Harita Yükleniyor...</span>
              </div>
            </div>
            <Button variant="outline" className="mt-4">Google Haritalar'da Aç</Button>
          </TabsContent>
      </Tabs>
    </div>
  );
}
