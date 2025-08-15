export interface Review {
  id: string | number;
  guestName: string;
  guestAvatar: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
}

export interface RoomReview {
  id: string;
  roomName: string;
  roomImage: string;
  averageRating: number;
  totalReviews: number;
  recentReviews: Review[];
}
