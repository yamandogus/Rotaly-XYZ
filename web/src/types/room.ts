export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  bedCount: number;
  isAvailable: boolean;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  bookings: any[]; // rezervasyon tipine göre düzenle
  featureStatus: any[]; // özellik tipine göre düzenle
 images: string[];
}