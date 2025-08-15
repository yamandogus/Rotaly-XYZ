import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "@/types/reservation";

interface PaymentCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isDefault: boolean;
}

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  image: string;
  description?: string;
  amenities?: string[];
}

interface BookingForm {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedRoomId?: string;
  selectedHotelId?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BookingState {
  reservations: Reservation[];
  currentReservation: Reservation | null;
  paymentCards: PaymentCard[];
  selectedRoom: Room | null;
  bookingForm: BookingForm;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

const initialState: BookingState = {
  reservations: [],
  currentReservation: null,
  paymentCards: [],
  selectedRoom: null,
  bookingForm: {
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    deleteReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(r => r.id !== action.payload);
    },
    setCurrentReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.currentReservation = action.payload;
    },
    setPaymentCards: (state, action: PayloadAction<PaymentCard[]>) => {
      state.paymentCards = action.payload;
    },
    addPaymentCard: (state, action: PayloadAction<PaymentCard>) => {
      state.paymentCards.push(action.payload);
    },
    removePaymentCard: (state, action: PayloadAction<string>) => {
      state.paymentCards = state.paymentCards.filter(card => card.id !== action.payload);
    },
    setDefaultPaymentCard: (state, action: PayloadAction<string>) => {
      state.paymentCards.forEach(card => {
        card.isDefault = card.id === action.payload;
      });
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload;
    },
    updateBookingForm: (state, action: PayloadAction<Partial<BookingForm>>) => {
      state.bookingForm = { ...state.bookingForm, ...action.payload };
    },
    resetBookingForm: (state) => {
      state.bookingForm = initialState.bookingForm;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    resetBookingState: () => {
      return initialState;
    },
  },
});

export const {
  setReservations,
  addReservation,
  updateReservation,
  deleteReservation,
  setCurrentReservation,
  setPaymentCards,
  addPaymentCard,
  removePaymentCard,
  setDefaultPaymentCard,
  setSelectedRoom,
  updateBookingForm,
  resetBookingForm,
  setLoading,
  setError,
  setPagination,
  setPage,
  resetBookingState,
} = bookingSlice.actions;

export default bookingSlice.reducer;
