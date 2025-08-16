"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "lucide-react"
import { DateRangeCalendar } from "./date-range-calendar"

interface SingleDatePickerProps {
  date?: Date
  checkIn?: Date
  checkOut?: Date
  onDateChange: (date: Date | undefined) => void
  onDateRangeChange: (checkIn: Date | undefined, checkOut: Date | undefined) => void
  placeholder: string
  type: "checkin" | "checkout"
}

export function SingleDatePicker({
  date,
  checkIn,
  checkOut,
  onDateChange,
  onDateRangeChange,
  placeholder,
  type,
}: SingleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleDateRangeChange = (newCheckIn: Date | undefined, newCheckOut: Date | undefined) => {
    onDateRangeChange(newCheckIn, newCheckOut)

    if (type === "checkin") {
      onDateChange(newCheckIn)
    } else {
      onDateChange(newCheckOut)
    }

    // Users can manually close by clicking outside or on the trigger button again
  }

  const buttonClassName = date
    ? "w-full h-12 justify-start text-left bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-white dark:hover:bg-gray-800"
    : "w-full h-12 justify-start text-left bg-white dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-white dark:hover:bg-gray-700/50"

  const displayText = date 
  ? formatDate(date) 
  : placeholder;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-card border-gray-300 dark:border-gray-700" align="start">
        <DateRangeCalendar checkIn={checkIn} checkOut={checkOut} onDateRangeChange={handleDateRangeChange} />
      </PopoverContent>
    </Popover>
  )
}
