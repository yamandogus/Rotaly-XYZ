"use client";

import React, { useState, useEffect } from "react";
import { type DateRange } from "react-day-picker";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import { useTypewriter } from "react-simple-typewriter";
import { Input } from "./ui/input";

const SearchForm = () => {
  const [text] = useTypewriter({
    words: ["Otel", "Pansiyon", "Kiralık Daire"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 1000,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState<string>("1");

  // Tarih seçimi işleyicisi
  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    // Eğer hem giriş hem çıkış tarihi seçildiyse direkt kullan
    if (newDateRange?.from && newDateRange?.to) {
      setDateRange(newDateRange);
    }
    // Eğer sadece giriş tarihi seçildiyse, çıkış tarihini giriş tarihinden 3 gün sonrası olarak ayarla
    else if (newDateRange?.from && !newDateRange?.to) {
      const checkOutDate = new Date(newDateRange.from);
      checkOutDate.setDate(checkOutDate.getDate() + 3);
      
      setDateRange({
        from: newDateRange.from,
        to: checkOutDate
      });
    }
    // Eğer hiçbir tarih seçilmediyse veya sadece çıkış tarihi seçildiyse
    else {
      setDateRange(newDateRange);
    }
  };

  const cities = [
    { value: "istanbul", name: "İstanbul" },
    { value: "ankara", name: "Ankara" },
    { value: "izmir", name: "İzmir" },
    { value: "antalya", name: "Antalya" },
    { value: "bodrum", name: "Bodrum" },
    { value: "cappadocia", name: "Kapadokya" },
    { value: "trabzon", name: "Trabzon" },
    { value: "bursa", name: "Bursa" },
    { value: "adana", name: "Adana" },
    { value: "gaziantep", name: "Gaziantep" },
    { value: "konya", name: "Konya" },
    { value: "kayseri", name: "Kayseri" },
  ];

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: { value: string; name: string }) => {
    setSearchQuery(city.name);
    setIsDropdownOpen(false);
  };

  // Dropdown'u dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".city-search-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Form submit fonksiyonu
  const handleSubmit = () => {
    const formData = {
      city: searchQuery,
      dateRange: dateRange,
      guestCount: guestCount,
      checkIn: dateRange?.from,
      checkOut: dateRange?.to,
    };

    console.log("Arama Bilgileri:", formData);

    // Burada API çağrısı veya routing yapılabilir
    // Örnek: router.push('/hotels?...')
  };

  return (
    <div className="relative z-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-6">
          {/* bilgisayar için */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-end">
            {/* Şehir Seçimi */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                {text}
              </Label>
              <div className="relative city-search-container">
                <Input
                  type="text"
                  placeholder="Şehir arayın ve seçin"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full h-9 border border-border focus:border-blue-500 rounded-lg"
                />
                {isDropdownOpen && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-[60] max-h-48 overflow-y-auto mt-1">
                    {filteredCities.map((city) => (
                      <div
                        key={city.value}
                        className="px-3 py-2 hover:bg-accent cursor-pointer text-sm transition-colors"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Giriş Tarihi */}
            <div className="flex flex-col gap-2 border-l-[0.5px] border-border pl-2">
              <Label className="text-sm font-medium text-foreground">
                Giriş
              </Label>
              <DateRangePicker
                value={dateRange}
                onValueChange={handleDateRangeChange}
                placeholder="Giriş tarihi seçin"
                showType="checkin"
              />
            </div>

            {/* Çıkış Tarihi */}
            <div className="flex flex-col gap-2 border-l-[0.5px] border-border pl-2">
              <Label className="text-sm font-medium text-foreground">
                Çıkış
              </Label>
              <DateRangePicker
                value={dateRange}
                onValueChange={handleDateRangeChange}
                placeholder="Çıkış tarihi seçin"
                showType="checkout"
              />
            </div>

            {/* Kişi Sayısı */}
            <div className="flex flex-col gap-2 border-l-[0.5px] border-border pl-2">
              <Label className="text-sm font-medium text-foreground">
                Kişi Sayısı
              </Label>
              <Select value={guestCount} onValueChange={setGuestCount}>
                <SelectTrigger className="w-full h-11 border border-border focus:border-blue-500 rounded-lg">
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
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 font-medium transition-colors rounded-lg"
              >
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
                <Label className="text-sm font-medium text-foreground">
                  Şehir
                </Label>
                <div className="relative city-search-container">
                  <Input
                    type="text"
                    placeholder="Şehir arayın ve seçin"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full h-11 border border-border focus:border-blue-500 rounded-lg"
                  />
                  {isDropdownOpen && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-[60] max-h-48 overflow-y-auto mt-1">
                      {filteredCities.map((city) => (
                        <div
                          key={city.value}
                          className="px-3 py-2 hover:bg-accent cursor-pointer text-sm transition-colors"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* İkinci Satır - Tarihler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 border-l-[0.5px] border-border pl-2">
                <Label className="text-sm font-medium text-foreground">
                  Giriş
                </Label>
                <DateRangePicker
                  value={dateRange}
                  onValueChange={handleDateRangeChange}
                  placeholder="Giriş tarihi seçin"
                  showType="checkin"
                />
              </div>

              {/* Çıkış Tarihi */}
              <div className="flex flex-col gap-2 border-l-[0.5px] border-border pl-2">
                <Label className="text-sm font-medium text-foreground">
                  Çıkış
                </Label>
                <DateRangePicker
                  value={dateRange}
                  onValueChange={handleDateRangeChange}
                  placeholder="Çıkış tarihi seçin"
                  showType="checkout"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Kişi Sayısı
              </Label>
              <Select value={guestCount} onValueChange={setGuestCount}>
                <SelectTrigger className="w-full h-11 border border-border focus:border-blue-500 rounded-lg">
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

            {/* Üçüncü Satır - Arama Butonu */}
            <div className="pt-2">
              <Button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium transition-colors rounded-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Ara
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SearchForm;
