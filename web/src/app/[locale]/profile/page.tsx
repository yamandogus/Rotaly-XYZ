'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'

const ProfilePage = () => {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  return (
    <div>
      <div className="p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date.from && !date.to && "text-muted-foreground"
            )}
          >
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "PPP")} - {format(date.to, "PPP")}
                </>
              ) : (
                format(date.from, "PPP")
              )
            ) : (
              "Check-in ve Check-out tarihlerini seçin"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(selectedDate) => setDate(selectedDate || { from: undefined, to: undefined })}
            initialFocus
            numberOfMonths={2} // İki aylık görünüm, check-in/check-out için ideal
            disabled={(date) => date < new Date()} // Geçmiş tarihleri devre dışı bırak
          />
        </PopoverContent>
      </Popover>
      {date.from && date.to && (
        <div className="mt-4">
          <p>Check-in: {format(date.from, "PPP")}</p>
          <p>Check-out: {format(date.to, "PPP")}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProfilePage;