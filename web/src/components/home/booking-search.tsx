"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Search } from "lucide-react";
import { SingleDatePicker } from "./single-date-picker";
import { GuestSelector } from "./guest-selector";
import { useTypewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setCheckInDate,
  setCheckOutDate,
  setGuestsCount,
} from "@/store/search/search-slice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useToastMessages } from "@/hooks/toast-messages";

export function BookingSearch() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showError } = useToastMessages();
  const [isOpen, setIsOpen] = useState(false);

  // Store'dan mevcut verileri al
  const {
    city,
    checkIn: storeCheckIn,
    checkOut: storeCheckOut,
    guests: storeGuests,
  } = useSelector((state: RootState) => state.search);

  // Local state'leri store verileriyle başlat
  const [destination, setDestination] = useState(city);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    storeCheckIn ? new Date(storeCheckIn) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    storeCheckOut ? new Date(storeCheckOut) : undefined
  );
  const [guests, setGuests] = useState({
    adults: storeGuests,
    children: 0,
  });

  const handleSearch = () => {
    if (checkIn && destination && checkOut && guests) {
      console.log("Searching with:", {
        destination,
        checkIn,
        checkOut,
        guests,
      });
      const totalGuest = guests.adults + guests.children;
      dispatch(setCity(destination));
      dispatch(setCheckInDate(checkIn?.toISOString() ?? ""));
      dispatch(setCheckOutDate(checkOut?.toISOString() ?? ""));
      dispatch(setGuestsCount(totalGuest));
      router.push(`/categories`);
    } else {
      showError("Lütfen boş alanları doldurunuz");
    }
  };

  const handleDateRangeChange = (
    newCheckIn: Date | undefined,
    newCheckOut: Date | undefined
  ) => {
    setCheckIn(newCheckIn ?? new Date());
    setCheckOut(newCheckOut ?? new Date());
  };

  // const handleCitySelect = (selectedCity: string) => {
  //   setDestination(selectedCity);
  //   setIsOpen(false);
  // };

  const [text] = useTypewriter({
    words: ["Otel", "Pansiyon", "Kiralık Daire"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 1000,
  });

  return (
    <div className="relative">
      {/* Search Form */}
      <div className="relative z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-card border border-gray-200 dark:border-gray-600 rounded-2xl p-6 md:p-8 shadow-lg dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Destination */}
              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  {text}
                </Label>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                      <Input
                        placeholder="Şehir arayın ve seçin"
                        value={destination}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setDestination(e.target.value);
                          setIsOpen(true);
                        }}
                        className="pl-10 pr-10 bg-white dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400 h-12 cursor-pointer"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[300px] p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    align="center"
                  >
                    <div className="p-2">
                      {/* Search Input */}
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Şehir ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400"
                        />
                      </div>

                      {/* Results */}
                      <div className="max-h-60 overflow-y-auto">
                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                          Şehir aramaya başlayın...
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Diğer alanlar aynı kalacak */}
              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  Giriş
                </Label>
                <SingleDatePicker
                  date={checkIn}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={(date) => setCheckIn(date ?? new Date())}
                  onDateRangeChange={handleDateRangeChange}
                  placeholder="Giriş tarihi seçin"
                  type="checkin"
                />
              </div>

              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  Çıkış
                </Label>
                <SingleDatePicker
                  date={checkOut}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={(date) => setCheckOut(date ?? new Date())}
                  onDateRangeChange={handleDateRangeChange}
                  placeholder="Çıkış tarihi seçin"
                  type="checkout"
                />
              </div>

              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  Kişi Sayısı
                </Label>
                <GuestSelector guests={guests} onGuestsChange={setGuests} />
              </div>

              <div className="lg:col-span-1">
                <Button
                  onClick={handleSearch}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Ara
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
