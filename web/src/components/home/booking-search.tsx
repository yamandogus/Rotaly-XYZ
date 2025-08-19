"use client";

import { useMemo, useState } from "react";
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
import { RootState } from "@/store/store";
import { useToastMessages } from "@/hooks/toast-messages";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import hotelsData from "@/data/hotelsData.json";
import { popularHotels } from "@/data/dumy";
import { HotelNew } from "@/types/hotel";

interface BookingSearchProps {
  handleSearch: () => void;
}


export function BookingSearch({ handleSearch }: BookingSearchProps) {
  const dispatch = useDispatch();
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
    adults: storeGuests || 1,
    children: 0,
  });

  // Search fonksiyonu - store'a veri kaydet ve parent'a bildir
  const handleSearchClick = () => {
    if (!destination.trim()) {
      showError("Lütfen bir şehir seçin");
      return;
    }
    if (!checkIn) {
      showError("Lütfen giriş tarihi seçin");
      return;
    }
    if (!checkOut) {
      showError("Lütfen çıkış tarihi seçin");
      return;
    }
    if (guests.adults < 1) {
      showError("En az 1 yetişkin seçin");
      return;
    }

    // Store'a veri kaydet
    dispatch(setCity(destination));
    dispatch(setCheckInDate(checkIn.toISOString()));
    dispatch(setCheckOutDate(checkOut.toISOString()));
    dispatch(setGuestsCount(guests.adults + guests.children));

    // Parent component'e bildir ve categories sayfasına git
    handleSearch();
  };



  const handleDateRangeChange = (
    newCheckIn: Date | undefined,
    newCheckOut: Date | undefined
  ) => {
    setCheckIn(newCheckIn ?? new Date());
    setCheckOut(newCheckOut ?? new Date());
  };

  const [text] = useTypewriter({
    words: ["Otel", "Pansiyon", "Kiralık Daire"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 1000,
  });

  const filteredHotels = useMemo(() => {
    if (searchTerm.length > 2) {
      return hotelsData.filter((hotel: HotelNew) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [searchTerm]);

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
                  <span className="md:block hidden">{text}</span>
                  <span className="md:hidden block">Rotaly ile {" "} {text}</span>
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
                    className="w-[400px] p-0 bg-card border-gray-300 dark:border-gray-600"
                    align="center"
                  >
                    <div className="p-2">
                      {/* Search Input */}

                      {/* Results */}
                      <div className="max-h-80 overflow-y-auto p-2 overflow-hidden">
                        <div className="mt-2">
                          <div className="relative mb-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Şehir aramaya başlayın..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400"
                            />
                          </div>
                          <Command className="bg-card">
                            <CommandList className="bg-card">
                              <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
                              {filteredHotels.length > 0 ? (
                                <CommandGroup heading="Sonuçlar">
                                  {filteredHotels.map((hotel) => (
                                    <CommandItem
                                      key={hotel.name}
                                      onSelect={() => {
                                        setDestination(hotel.name);
                                        setIsOpen(false);
                                      }}
                                    >
                                      <div className="flex flex-row gap-4">
                                        <div className="flex justify-center items-center">
                                          <MapPin width={4} hanging={4} />
                                        </div>
                                        <div className="flex flex-col">
                                          <p className="text-md">
                                            {hotel.city}
                                          </p>
                                          <p className="text-gray-400 text-sm">
                                            {hotel.location}
                                          </p>
                                          <p></p>
                                        </div>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              ) : (
                                <CommandGroup heading="Sonuçlar">
                                  <span className="text-gray-400 py-2 text-sm">
                                    {searchTerm === ""
                                      ? "Şehir aramaya başlayın..."
                                      : "Sonuç bulunamadı."}
                                  </span>
                                </CommandGroup>
                              )}
                              <CommandSeparator />
                            </CommandList>
                            <CommandList>
                              <CommandGroup>
                                <div className="px-2 py-1 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                  Popüler aramalar
                                </div>
                                {popularHotels.map((hotel) => (
                                  <CommandItem
                                    key={hotel.name}
                                    onSelect={() => {
                                      setDestination(hotel.name);
                                      setIsOpen(false);
                                    }}
                                  >
                                    <div className="flex flex-row gap-4">
                                      <div className="flex justify-center items-center">
                                        <MapPin width={4} hanging={4} />
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-md">{hotel.city}</p>
                                        <p className="text-gray-400 text-sm">
                                          {hotel.location}
                                        </p>
                                        <p></p>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>

                              <CommandSeparator />
                            </CommandList>
                          </Command>
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

              <div className="col-span-full lg:col-span-1">
                <Button
                  onClick={handleSearchClick}
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
