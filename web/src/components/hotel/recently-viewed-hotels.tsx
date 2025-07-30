import HotelCard from "@/components/hotelCard";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

const recentlyViewedHotels = [
  {
    id: 1,
    name: "KiadDeluxeHotel",
    location: "Marakeş, Fas",
    rating: 4.8,
    price: "40.500 TL",
    image: "/images/opportunity8.jpg",
    nights: 7,
    cancelText: "Ücretsiz İptal",
    breakfastText: "Kahvaltı Dahil",
    parkingText: "Ücretsiz Otopark",
  },
  {
    id: 2,
    name: "KiadDeluxeHotel",
    location: "Marakeş, Fas",
    rating: 4.8,
    price: "40.500 TL",
    image: "/images/opportunity1.jpg",
    nights: 7,
    cancelText: "Ücretsiz İptal",
    breakfastText: "Kahvaltı Dahil",
    parkingText: "Ücretsiz Otopark",
  },
  {
    id: 3,
    name: "KiadDeluxeHotel",
    location: "Marakeş, Fas",
    rating: 4.8,
    price: "40.500 TL",
    image: "/images/opportunity7.jpg",
    nights: 7,
    cancelText: "Ücretsiz İptal",
    breakfastText: "Kahvaltı Dahil",
    parkingText: "Ücretsiz Otopark",
  },
  {
    id: 4,
    name: "KiadDeluxeHotel",
    location: "Marakeş, Fas",
    rating: 4.8,
    price: "40.500 TL",
    image: "/images/opportunity3.jpg",
    nights: 7,
    cancelText: "Ücretsiz İptal",
    breakfastText: "Kahvaltı Dahil",
    parkingText: "Ücretsiz Otopark",
  },
  
 
];

const RecentlyViewedHotels = () => (
  <div className="mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">En Son Baktıklarınız</h2>
      <Link href="/recently-viewed" className="text-blue-600 flex items-center gap-1">
        Tümünü Gör <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {recentlyViewedHotels.map((item) => (
        <HotelCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default RecentlyViewedHotels;