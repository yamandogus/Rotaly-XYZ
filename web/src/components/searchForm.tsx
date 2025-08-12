"use client";

import React, { useState, useEffect } from "react";
import { type DateRange } from "react-day-picker";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import { useTypewriter } from "react-simple-typewriter";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setCity, setCheckIn, setCheckOut, setGuests } from "@/store/search/search-slice";
import GuestSelector from "./guest-selector";
import { cities } from "@/data/dumy";

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
  const [adultCount, setAdultCount] = useState<string>("1");
  const [childCount, setChildCount] = useState<string>("0");
  const [totalCount, setTotalCount] = useState<string>("1");
  
  const dispatch = useDispatch();

  // totalCount'u otomatik hesapla
  useEffect(() => {
    const total = parseInt(adultCount) + parseInt(childCount);
    setTotalCount(total.toString());
  }, [adultCount, childCount]);

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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: { value: string; name: string }) => {
    setSearchQuery(city.name);
    dispatch(setCity(city.name));
    dispatch(setCheckIn(dateRange?.from?.toISOString() || ""));
    dispatch(setCheckOut(dateRange?.to?.toISOString() || ""));
    dispatch(setGuests(parseInt(totalCount)));
    setIsDropdownOpen(false);
  };

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
    console.log(searchQuery, dateRange?.from?.toISOString(), dateRange?.to?.toISOString(), totalCount);
    
    dispatch(setCity(searchQuery));
    dispatch(setCheckIn(dateRange?.from?.toISOString() || ""));
    dispatch(setCheckOut(dateRange?.to?.toISOString() || ""));
    dispatch(setGuests(parseInt(totalCount))); // totalCount kullan
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
              <GuestSelector
                value={{ adults: parseInt(adultCount), children: parseInt(childCount), total: parseInt(totalCount) }}
                onChange={(value) => {
                  setAdultCount(value.adults.toString());
                  setChildCount(value.children.toString());
                  setTotalCount(value.total.toString());
                }}
              />
            </div>

            {/* Arama Butonu */}
            <div className="flex flex-col">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 font-medium transition-colors rounded-lg cursor-pointer"
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
              <GuestSelector
                value={{ adults: parseInt(adultCount), children: parseInt(childCount), total: parseInt(totalCount) }}
                onChange={(value) => {
                  setAdultCount(value.adults.toString());
                  setChildCount(value.children.toString());
                  setTotalCount(value.total.toString());
                }}
              />
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
