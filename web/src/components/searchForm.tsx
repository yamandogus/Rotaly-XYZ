import React from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { DatePicker } from './date-picker'

const searchForm = () => {
  return (
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
                  <DatePicker />
                </div>

                {/* Çıkış Tarihi */}
                <div className="flex flex-col gap-2 border-l-[0.5px] border-gray-300 pl-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Çıkış Tarihi
                  </Label>
                  <DatePicker/>
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
                    <DatePicker/>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Çıkış Tarihi
                    </Label>
                    <DatePicker/>
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
  )
}

export default searchForm