export interface RoomReview {
  id: string;
  roomId?: string;
  userId?: string;
  roomName: string;
  roomImage: string;
  averageRating: number;
  totalReviews: number;
  recentReviews: Review[];
  rating?: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  room?: {
    id: string;
    name: string;
  };
}

export interface Review {
  id: string | number;
  userId?: string;
  hotelId?: string;
  guestName: string;
  guestAvatar: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  hotel?: {
    id: string;
    name: string;
  };
}
