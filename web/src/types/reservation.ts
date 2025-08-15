export interface Reservation {
  id: string;
  nightCount: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  hotelAddress: string;
  userPhone: string;
  specialRequest?: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  userId: string;
  roomId: string;
  paymentCardId?: string | null;
  isVerified: boolean;
  // Room bilgileri
  roomName?: string;
  roomType?: string;
  roomNumber?: number;
  floor?: number;
  maxAdults?: number;
  maxChildren?: number;
  capacity?: number;
  bedCount?: number;
}
