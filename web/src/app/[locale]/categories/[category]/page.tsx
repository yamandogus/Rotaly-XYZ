import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const filterOrder = ["Klima", "Mutfak", "Wifi", "TV",];

export default async function CategoryPage() {
  return (
    <div className="min-h-screen">
      <div className="relative mb-16">
        {/* Hero Banner Section */}
        <div className="relative w-full h-[55vh] overflow-hidden">
          <Image
            src="/images/MAPPA.png"
            alt="Banner"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* arama formu */}
        <div className="relative -mt-60 z-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              {/* bilgisayar için */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-end">
                {/* Şehir Seçimi */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Şehir
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 border border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Şehir seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="istanbul">İstanbul</SelectItem>
                      <SelectItem value="ankara">Ankara</SelectItem>
                      <SelectItem value="izmir">İzmir</SelectItem>
                      <SelectItem value="antalya">Antalya</SelectItem>
                      <SelectItem value="bodrum">Bodrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Giriş Tarihi */}
                <div className="flex flex-col gap-2 border-l-[0.5px] border-gray-300 pl-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Giriş Tarihi
                  </Label>
                  <DatePickerDemo />
                </div>

                {/* Çıkış Tarihi */}
                <div className="flex flex-col gap-2 border-l-[0.5px] border-gray-300 pl-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Çıkış Tarihi
                  </Label>
                  <DatePickerDemo />
                </div>

                {/* Kişi Sayısı */}
                <div className="flex flex-col gap-2 border-l-[0.5px] border-gray-300 pl-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Kişi Sayısı
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full h-11 border border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Kişi sayısı" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Kişi</SelectItem>
                      <SelectItem value="2">2 Kişi</SelectItem>
                      <SelectItem value="3">3 Kişi</SelectItem>
                      <SelectItem value="4">4 Kişi</SelectItem>
                      <SelectItem value="5">5+ Kişi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Arama Butonu */}
                <div className="flex flex-col">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 font-medium transition-colors rounded-lg">
                    <Search className="w-4 h-4 mr-2" />
                    Ara
                  </Button>
                </div>
              </div>

              {/* mobil için */}
              <div className="lg:hidden space-y-4">
                {/* İlk Satır - Şehir ve Kişi Sayısı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Şehir
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full h-11 border border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">İstanbul</SelectItem>
                        <SelectItem value="ankara">Ankara</SelectItem>
                        <SelectItem value="izmir">İzmir</SelectItem>
                        <SelectItem value="antalya">Antalya</SelectItem>
                        <SelectItem value="bodrum">Bodrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Kişi Sayısı
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full h-11 border border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Kişi sayısı" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Kişi</SelectItem>
                        <SelectItem value="2">2 Kişi</SelectItem>
                        <SelectItem value="3">3 Kişi</SelectItem>
                        <SelectItem value="4">4 Kişi</SelectItem>
                        <SelectItem value="5">5+ Kişi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* İkinci Satır - Tarihler */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Giriş Tarihi
                    </Label>
                    <DatePickerDemo />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Çıkış Tarihi
                    </Label>
                    <DatePickerDemo />
                  </div>
                </div>

                {/* Üçüncü Satır - Arama Butonu */}
                <div className="pt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium transition-colors rounded-lg">
                    <Search className="w-5 h-5 mr-2" />
                    Ara
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtre ve Liste Bölümü */}
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filtreler - Sol Sidebar */}
            <div className="lg:col-span-1">
              <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filtreler
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 rounded-full border-gray-300 text-sm font-medium h-8 px-3"
                >
                  Temizle
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Filtre içerikleri buraya gelecek */}
                <div className="space-y-4">
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Kategori</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Değerlendirme</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Fiyat</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Diğer</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-row gap-2 flex-wrap">
                            {filterOrder.map((item) => (
                              <Button
                                key={item}
                                variant="outline"
                                className="w-1/4 rounded-full"
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste - Ana İçerik */}
            <div className="lg:col-span-3">
              <div className="bg-white ">
                {/* Liste Header */}
                <div className=" px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Liste
                    </h2>
                    <div className="text-sm text-gray-500">
                      127 sonuç bulundu
                    </div>
                  </div>
                </div>

                {/* Liste İçeriği */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Placeholder kartları */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-48 bg-gray-200 relative">
                          <Image
                            src="/images/opportunity1.jpg"
                            alt="Banner"
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">
                            Otel Örneği {item}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            İstanbul, Türkiye
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-blue-600">
                              ₺250
                            </span>
                            <span className="text-sm text-gray-500">
                              / gece
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
