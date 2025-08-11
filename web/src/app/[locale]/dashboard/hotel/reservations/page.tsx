"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Mail, CreditCard, Hotel, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl";

const reservations = {
  past: [
    {
      roomNumber: 101,
      capacity: 2,
      guestName: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@example.com",
      dates: "12.05.2025 - 15.05.2025",
      price: "4.500₺",
      avatar: "/guests/ahmet.jpg",
      status: "completed"
    },
     {
      roomNumber: 101,
      capacity: 2,
      guestName: "Mira Arslan",
      email: "mira.arslan@example.com",
      dates: "25.03.2025 - 28.03.2025",
      price: "3.500₺",
      avatar: "/guests/mira.jpg",
      status: "completed"
    },
    {
      roomNumber: 202,
      capacity: 3,
      guestName: "Elif Kaya",
      email: "elif.kaya@example.com",
      dates: "01.06.2025 - 05.06.2025",
      price: "6.750₺",
      avatar: "/guests/elif.jpg",
      status: "completed"
    },
    {
      roomNumber: 303,
      capacity: 2,
      guestName: "Mehmet Gül",
      email: "mehmet.gul@example.com",
      dates: "01.07.2025 - 03.07.2025",
      price: "3.200₺",
      avatar: "/guests/mehmet.jpg",
      status: "completed"
    },
    {
      roomNumber: 303,
      capacity: 2,
      guestName: "Ayşe Demir",
      email: "ayse.demir@example.com",
      dates: "10.07.2025 - 12.07.2025",
      price: "3.400₺",
      avatar: "/guests/ayse.jpg",
      status: "completed"
    },
    // Oda 105 için geçmiş rezervasyonlar
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Fatma Özkan",
      email: "fatma.ozkan@example.com",
      dates: "15.01.2025 - 18.01.2025",
      price: "3.800₺",
      avatar: "/guests/fatma.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Ali Yıldız",
      email: "ali.yildiz@example.com",
      dates: "22.01.2025 - 25.01.2025",
      price: "4.200₺",
      avatar: "/guests/ali.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Seda Korkmaz",
      email: "seda.korkmaz@example.com",
      dates: "05.02.2025 - 08.02.2025",
      price: "3.600₺",
      avatar: "/guests/seda.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Can Demir",
      email: "can.demir@example.com",
      dates: "12.02.2025 - 15.02.2025",
      price: "4.000₺",
      avatar: "/guests/can.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Ece Şahin",
      email: "ece.sahin@example.com",
      dates: "20.02.2025 - 23.02.2025",
      price: "3.900₺",
      avatar: "/guests/ece.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Berk Özkan",
      email: "berk.ozkan@example.com",
      dates: "01.03.2025 - 04.03.2025",
      price: "4.100₺",
      avatar: "/guests/berk.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Zara Yılmaz",
      email: "zara.yilmaz@example.com",
      dates: "10.03.2025 - 13.03.2025",
      price: "3.700₺",
      avatar: "/guests/zara.jpg",
      status: "completed"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Deniz Kaya",
      email: "deniz.kaya@example.com",
      dates: "18.03.2025 - 21.03.2025",
      price: "4.300₺",
      avatar: "/guests/deniz.jpg",
      status: "completed"
    },
   
 
  ],
  active: [
    {
      roomNumber: 101,
      capacity: 3,
      guestName: "Ayse Arslan",
      email: "aayse.arslan@example.com",
      dates: "25.03.2025 - 28.03.2025",
      price: "3.500₺",
      avatar: "/guests/mira.jpg",
      status: "active"
    },
    {
      roomNumber: 101,
      capacity: 2,
      guestName: "Mira Arslan",
      email: "mira.arslan@example.com",
      dates: "22.03.2025 - 24.03.2025",
      price: "3.500₺",
      avatar: "/guests/mira.jpg",
      status: "active"
    },
      {
      roomNumber: 101,
      capacity: 2,
      guestName: "Kaan Öztürk",
      email: "kaan.ozturk@example.com",
      dates: "02.04.2025 - 05.04.2025",
      price: "4.400₺",
      avatar: "/guests/kaan.jpg",
      status: "active"
    },
    {
      roomNumber: 101,
      capacity: 2,
      guestName: "Leyla Demir",
      email: "leyla.demir@example.com",
      dates: "16.04.2025 - 20.04.2025",
      price: "3.800₺",
      avatar: "/guests/leyla.jpg",
      status: "active"
    },
    
   {
      roomNumber: 105,
      capacity: 2,
      guestName: "Kaan Öztürk",
      email: "kaan.ozturk@example.com",
      dates: "02.04.2025 - 05.04.2025",
      price: "4.400₺",
      avatar: "/guests/kaan.jpg",
      status: "active"
    },
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Leyla Demir",
      email: "leyla.demir@example.com",
      dates: "10.04.2025 - 13.04.2025",
      price: "3.800₺",
      avatar: "/guests/leyla.jpg",
      status: "active"
    },

    {
      roomNumber: 303,
      capacity: 2,
      guestName: "Mert Can",
      email: "mert.can@example.com",
      dates: "10.08.2025 - 15.08.2025",
      price: "5.200₺",
      avatar: "/guests/mert.jpg",
      status: "active"
    },
    {
      roomNumber: 404,
      capacity: 1,
      guestName: "Zeynep Öztürk",
      email: "zeynep.ozturk@example.com",
      dates: "12.08.2025 - 14.08.2025",
      price: "2.300₺",
      avatar: "/guests/zeynep.jpg",
      status: "active"
    },
    {
      roomNumber: 505,
      capacity: 2,
      guestName: "Burak Aydın",
      email: "burak.aydin@example.com",
      dates: "15.08.2025 - 20.08.2025",
      price: "5.800₺",
      avatar: "/guests/burak.jpg",
      status: "active"
    },
    {
      roomNumber: 606,
      capacity: 3,
      guestName: "Selin Arslan",
      email: "selin.arslan@example.com",
      dates: "18.08.2025 - 22.08.2025",
      price: "7.200₺",
      avatar: "/guests/selin.jpg",
      status: "active"
    },
    // Oda 105 için aktif rezervasyon
    {
      roomNumber: 105,
      capacity: 2,
      guestName: "Aslı Yıldırım",
      email: "asli.yildirim@example.com",
      dates: "15.08.2025 - 18.08.2025",
      price: "4.500₺",
      avatar: "/guests/asli.jpg",
      status: "active"
    },
  ]
}





type Reservation = {
  guestName: string;
  avatar: string;
  email: string;
  roomNumber: number;
  dates: string;
  price: string;
  capacity: number;
  status: "active" | "past" | string;
};

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const t = useTranslations("Reservations");

  const getStatusColor = (status: string) =>
    status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  const getStatusText = (status: string) =>
    status === "active" ? t("active") : t("completed");

  return (
  <Card  className="bg-card border border-border rounded-2xl overflow-hidden transition-shadow duration-300
  shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)]
  dark:shadow-[0_0_10px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
  gap-0 pt-1 pb-2 cursor-pointer group flex flex-col
  w-full sm:w-72 md:w-80 lg:w-96 xl:w-[320px]
  h-35 sm:h-72 md:h-80 lg:h-96 xl:h-[200px]"
>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-5 gap-3" >
            <Avatar className="w-12 h-12">
              <AvatarImage src={reservation.avatar} alt={reservation.guestName} />
              <AvatarFallback>
                {reservation.guestName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{reservation.guestName}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Hotel className="w-4 h-4" />
                <span>{t("room")} {reservation.roomNumber}</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(reservation.status)}>
            {getStatusText(reservation.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{reservation.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-4 h-4  text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {reservation.capacity} {t("persons")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{reservation.dates}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {reservation.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RoomDateSelector({
  reservations,
  selectedDate,
  onDateSelect,
}: {
  reservations: Reservation[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
}) {
  const t = useTranslations("Reservations");

  const dates = Array.from(new Set(reservations.map((r) => r.dates)));
  if (dates.length === 0) return null;

  return (
    <div className="mb-1 flex flex-col items-center -mt-2 mr-40">
      <label className="mb-2 font-medium text-gray-900 dark:text-gray-100">
        {t("selectDate")}
      </label>
      <select
        className="border rounded px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
        value={selectedDate ?? ""}
        onChange={(e) => onDateSelect(e.target.value || null)}
      >
        <option value="">{t("allDates")}</option>
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}

function renderReservations(
  data: Reservation[],
  selectedRoom: number | null,
  searchQuery: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any // t parametresini ekleyin
) {


  let filteredData = selectedRoom
    ? data.filter((reservation) => reservation.roomNumber === selectedRoom)
    : data;

  if (searchQuery.trim()) {
    filteredData = filteredData.filter((r) =>
      `${r.guestName} ${r.email}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12">
        <Hotel className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          {selectedRoom
            ? t("noReservationsForRoom", { roomNumber: selectedRoom })
            : t("noReservations")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{t("noReservationsMessage")}</p>
      </div>
    );
  }

  const grouped: Record<number, Reservation[]> = filteredData.reduce(
    (acc, reservation) => {
      if (!acc[reservation.roomNumber]) acc[reservation.roomNumber] = [];
      acc[reservation.roomNumber].push(reservation);
      return acc;
    },
    {} as Record<number, Reservation[]>
  );

  return (
    <div className="space-y-8 w-full mt-10">
      {Object.entries(grouped).map(([roomNumber, entries]) => (
        <section key={roomNumber} className="w-full">
          <div className="flex items-center gap-3 mb-6 -mt-5 justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900">
              <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t("room")} {roomNumber}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{entries.length} {t("reservations")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-full">
            {entries.map((reservation, index) => (
              <div key={index} className="w-full max-w-sm">
                <ReservationCard reservation={reservation} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function ReservationTabs() {
  const t = useTranslations("Reservations"); // Ana bileşende çağırın

  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentReservations =
    activeTab === "active" ? reservations.active : reservations.past;

  const roomsInTab = [...new Set(currentReservations.map((r) => r.roomNumber))];

  const filteredByRoom = selectedRoom
    ? currentReservations.filter((r) => r.roomNumber === selectedRoom)
    : currentReservations;

  const filteredByDate = selectedDate
    ? filteredByRoom.filter((r) => r.dates === selectedDate)
    : filteredByRoom;

  return (
    <div className="max-w-7xl mx-auto p-6 w-full min-h-screen bg-white text-gray-900 dark:bg-card dark:text-gray-100">

      {/* === ÜST: Aktif / Geçmiş Sekmeleri === */}
      <Tabs
        value={activeTab}
        onValueChange={(tab) => {
          setActiveTab(tab as "active" | "past");
          setSelectedRoom(null);
          setSelectedDate(null);
          setSearchQuery("");
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2  w-full max-w-3xl mx-auto mb-10 gap-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="active" className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-800 dark:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            {t("activeReservations")}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-800 dark:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            {t("pastReservations")}
          </TabsTrigger>
        </TabsList>

        {/* === ALT: İçerik (Oda Tabs + Arama + Filtre + Liste) === */}
        <TabsContent value={activeTab}>
          <Tabs
            value={selectedRoom === null ? "all" : selectedRoom.toString()}
            onValueChange={(val) => {
              setSelectedRoom(val === "all" ? null : Number(val));
              setSelectedDate(null);
            }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 mt-8">
              {/* === Sol: Oda Sekmeleri === */}
            <TabsList className="flex flex-col gap-3 -mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md h-fit">

  {/* === Başlık: Oda Seçin === */}
  <div className="flex items-center gap-2 mb-2 px-1">
    <Hotel className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
      {t("selectRoom")}
    </h3>
  </div>

  {/* === Tüm Odalar Butonu === */}
  <TabsTrigger
    value="all"
    className="w-full px-4 py-2 rounded-lg text-sm text-left data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
  >
    {t("allRooms")}
  </TabsTrigger>

  {/* === Oda Listesi === */}
  {roomsInTab.map((room) => (
    <TabsTrigger
      key={room}
      value={room.toString()}
      className="w-full px-4 py-2 rounded-lg text-sm text-left data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {t("room")} {room}
    </TabsTrigger>
  ))}

</TabsList>



              {/* === Sağ: Arama + Tarih + Rezervasyonlar === */}
     <div className="flex flex-col gap-6 -mt-4 w-full">
  {/* Arama Çubuğu */}
<div className="relative w-full max-w-md ml-40 -mt-5">
    <Input
      type="text"
      placeholder={t("searchPlaceholder")}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 pr-4 h-11 text-base rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
    />
    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
  </div>

  {/* Tarih Seçici */}
  {selectedRoom !== null && (
    <RoomDateSelector
      reservations={filteredByRoom}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  )}

  {/* Rezervasyon Listesi */}
  <TabsContent value={selectedRoom === null ? "all" : selectedRoom.toString()} className="w-full">
    {renderReservations(filteredByDate, selectedRoom, searchQuery, t)} {/* t parametresini geçin */}
  </TabsContent>
</div>

            </div>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
