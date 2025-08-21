"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, Search } from "lucide-react"
import { SingleDatePicker } from "./single-date-picker"
import { GuestSelector } from "./guest-selector"
import { useTypewriter } from "react-simple-typewriter"
import { useDispatch, useSelector } from "react-redux"
import { setCity, setCheckInDate, setCheckOutDate, setGuestsCount } from "@/store/search/search-slice"
import type { RootState } from "@/store/store"
import { useToastMessages } from "@/hooks/toast-messages"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../ui/command"
import hotelsData from "@/data/hotelsData.json"
import { popularHotels } from "@/data/dumy"
import type { HotelNew } from "@/types/hotel"
import { useTranslations } from "next-intl"

interface BookingSearchProps {
  handleSearch: () => void
}

export function BookingSearch({ handleSearch }: BookingSearchProps) {
  const t = useTranslations("HomePage.bookingSearch")

  const dispatch = useDispatch()
  const { showError } = useToastMessages()
  const [isOpen, setIsOpen] = useState(false)

  // Store'dan mevcut verileri al
  const {
    city,
    checkIn: storeCheckIn,
    checkOut: storeCheckOut,
    guests: storeGuests,
  } = useSelector((state: RootState) => state.search)

  // Local state'leri store verileriyle başlat
  const [destination, setDestination] = useState(city)
  const [searchTerm, setSearchTerm] = useState("")
  const [checkIn, setCheckIn] = useState<Date | undefined>(storeCheckIn ? new Date(storeCheckIn) : undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(storeCheckOut ? new Date(storeCheckOut) : undefined)
  const [guests, setGuests] = useState({
    adults: storeGuests || 1,
    children: 0,
  })

  // Search fonksiyonu - store'a veri kaydet ve parent'a bildir
  const handleSearchClick = () => {
    if (!destination.trim()) {
      showError(t("errors.selectCity"))
      return
    }
    if (!checkIn) {
      showError(t("errors.selectCheckIn"))
      return
    }
    if (!checkOut) {
      showError(t("errors.selectCheckOut"))
      return
    }
    if (guests.adults < 1) {
      showError(t("errors.selectAdults"))
      return
    }

    // Store'a veri kaydet
    dispatch(setCity(destination))
    dispatch(setCheckInDate(checkIn.toISOString()))
    dispatch(setCheckOutDate(checkOut.toISOString()))
    dispatch(setGuestsCount(guests.adults + guests.children))

    // Parent component'e bildir ve categories sayfasına git
    handleSearch()
  }

  const handleDateRangeChange = (newCheckIn: Date | undefined, newCheckOut: Date | undefined) => {
    setCheckIn(newCheckIn ?? new Date())
    setCheckOut(newCheckOut ?? new Date())
  }

  const [text] = useTypewriter({
    words: [t("typewriter.hotel"), t("typewriter.pension"), t("typewriter.apartment")],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 1000,
  })

  const filteredHotels = useMemo(() => {
    if (searchTerm.length > 2) {
      return hotelsData.filter((hotel: HotelNew) => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return []
  }, [searchTerm])

  return (
    <div className="relative">
      {/* Search Form */}
      <div className="relative z-10 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-card border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
              {/* Destination */}
              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  <span className="md:block hidden">{text}</span>
                  <span className="md:hidden block">
                    {t("labels.withRotaly")} {text}
                  </span>
                </Label>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                      <Input
                        placeholder={t("placeholders.searchCity")}
                        value={destination}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setDestination(e.target.value)
                          setIsOpen(true)
                        }}
                        className="pl-10 pr-10 bg-white dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400 h-10 sm:h-12 cursor-pointer"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[380px] md:w-[400px] p-0 bg-card border-gray-300 dark:border-gray-600" align="center">
                    <div className="p-2">
                      {/* Results */}
                      <div className="max-h-80 overflow-y-auto p-2 overflow-hidden">
                        <div className="mt-2">
                          <div className="relative mb-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder={t("placeholders.startSearching")}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400"
                            />
                          </div>
                          <Command className="bg-card">
                            <CommandList className="bg-card">
                              <CommandEmpty>{t("search.noResults")}</CommandEmpty>
                              {filteredHotels.length > 0 ? (
                                <CommandGroup heading={t("search.results")}>
                                  {filteredHotels.map((hotel) => (
                                    <CommandItem
                                      key={hotel.name}
                                      onSelect={() => {
                                        setDestination(hotel.name)
                                        setIsOpen(false)
                                      }}
                                    >
                                      <div className="flex flex-row gap-4">
                                        <div className="flex justify-center items-center">
                                          <MapPin width={4} hanging={4} />
                                        </div>
                                        <div className="flex flex-col">
                                          <p className="text-md">{hotel.city}</p>
                                          <p className="text-gray-400 text-sm">{hotel.location}</p>
                                          <p></p>
                                        </div>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              ) : (
                                <CommandGroup heading={t("search.results")}>
                                  <span className="text-gray-400 py-2 text-sm">
                                    {searchTerm === "" ? t("search.startSearching") : t("search.noResults")}
                                  </span>
                                </CommandGroup>
                              )}
                              <CommandSeparator />
                            </CommandList>
                            {filteredHotels.length === 0 && (
                              <CommandList>
                                <CommandGroup>
                                  <div className="px-2 py-1 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                  {t("search.popularSearches")}
                                </div>
                                {popularHotels.map((hotel) => (
                                  <CommandItem
                                    key={hotel.name}
                                    onSelect={() => {
                                      setDestination(hotel.name)
                                      setIsOpen(false)
                                    }}
                                  >
                                    <div className="flex flex-row gap-4">
                                      <div className="flex justify-center items-center">
                                        <MapPin width={4} hanging={4} />
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-md">{hotel.city}</p>
                                        <p className="text-gray-400 text-sm">{hotel.location}</p>
                                        <p></p>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>

                              <CommandSeparator />
                            </CommandList>
                            )}
                          </Command>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-in Date */}
              <div className="lg:col-span-1 overflow-hidden">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  {t("labels.checkIn")}
                </Label>
                <SingleDatePicker
                  date={checkIn}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={(date) => setCheckIn(date ?? new Date())}
                  onDateRangeChange={handleDateRangeChange}
                  placeholder={t("placeholders.selectCheckIn")}
                  type="checkin"
                />
              </div>

              {/* Check-out Date */}
              <div className="lg:col-span-1 overflow-hidden">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  {t("labels.checkOut")}
                </Label>
                <SingleDatePicker
                  date={checkOut}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={(date) => setCheckOut(date ?? new Date())}
                  onDateRangeChange={handleDateRangeChange}
                  placeholder={t("placeholders.selectCheckOut")}
                  type="checkout"
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-1">
                <Label className="text-black dark:text-white text-sm font-medium mb-2 block">
                  {t("labels.guestCount")}
                </Label>
                <GuestSelector guests={guests} onGuestsChange={setGuests} />
              </div>

              {/* Search Button */}
              <div className="col-span-full lg:col-span-1">
                <Button
                  onClick={handleSearchClick}
                  className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t("buttons.search")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
