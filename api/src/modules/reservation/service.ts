import { ReservationRepository } from "./repository";
import {
  CreateReservationSchema,
  CreateReservationDto,
  UpdateReservationSchema,
  UpdateReservationDto,
  ReservationListQuerySchema,
  ReservationListQueryDto,
} from "../../dto/reservation";

interface ExistingReservationScalars {
  id: string;
  userId: string;
  roomId: string;
  paymentCardId: string | null;
  nightCount: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  hotelAddress: string;
  userPhone: string;
  specialRequest: string | null;
  paymentMethod: string;
}

function diffNights(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(nights, 1); // en az 1 gece
}

export class ReservationService {
  static async create(raw: unknown) {
    const data = CreateReservationSchema.parse(raw);

    // Tarihleri Date'e çevir
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    // Çakışma kontrolü
    const overlap = await ReservationRepository.existsOverlap({
      roomId: data.roomId,
      startDate: start,
      endDate: end,
    });
    if (overlap) {
      throw new Error("Seçilen tarihlerde oda müsait değil.");
    }

    // Oda fiyatı
    const room = await ReservationRepository.getRoomWithPrice(data.roomId);
    if (!room) {
      throw new Error("Oda bulunamadı.");
    }

    const nightCount = data.nightCount ?? diffNights(start, end);
    const totalPrice = data.totalPrice ?? room.price * nightCount;

    const payload = {
      userId: data.userId,
      roomId: data.roomId,
      paymentCardId: data.paymentCardId ?? null,

      nightCount,
      checkIn: data.checkIn ?? "12:00",
      checkOut: data.checkOut ?? "14:00",
      guests: data.guests,
      startDate: start,
      endDate: end,
      totalPrice,

      hotelAddress: data.hotelAddress,
      userPhone: data.userPhone,
      specialRequest: data.specialRequest ?? null,
      paymentMethod: data.paymentMethod,
    };

    return ReservationRepository.create(payload);
  }

  static async getById(id: string) {
    return ReservationRepository.findById(id);
  }

  static async list(rawQuery: unknown) {
    const q: ReservationListQueryDto = ReservationListQuerySchema.parse(rawQuery);

    const filters = {
      userId: q.userId,
      roomId: q.roomId,
      startDateFrom: q.startDateFrom ? new Date(q.startDateFrom) : undefined,
      startDateTo: q.startDateTo ? new Date(q.startDateTo) : undefined,
      deleted: false,
    };

    return ReservationRepository.findMany(
      filters,
      q.page,
      q.limit,
      { sortBy: q.sortBy, sortOrder: q.sortOrder }
    );
  }

  static async update(id: string, raw: unknown) {
    const data: UpdateReservationDto = UpdateReservationSchema.parse(raw);

    // Mevcut rezervasyonu al
    const existing = await ReservationRepository.findById(id);
    if (!existing) throw new Error("Rezervasyon bulunamadı.");
    const base = existing as unknown as ExistingReservationScalars;

    // Tarihler/oda değiştiyse çakışma kontrolü
    const nextRoomId = data.roomId ?? base.roomId;
    const nextStart = data.startDate ? new Date(data.startDate) : base.startDate;
    const nextEnd = data.endDate ? new Date(data.endDate) : base.endDate;

    const overlap = await ReservationRepository.existsOverlap({
      roomId: nextRoomId,
      startDate: nextStart,
      endDate: nextEnd,
      excludeReservationId: id,
    });
    if (overlap) {
      throw new Error("Seçilen tarihlerde oda müsait değil.");
    }

    // Oda fiyatı / gece sayısı / toplam fiyat
    let nightCount = data.nightCount ?? base.nightCount;
    if (data.startDate || data.endDate) {
      nightCount = diffNights(nextStart, nextEnd);
    }

    let totalPrice =
      data.totalPrice ??
      base.totalPrice ??
      0;

    if (data.roomId || data.startDate || data.endDate || totalPrice === 0) {
      const room = await ReservationRepository.getRoomWithPrice(nextRoomId);
      if (!room) throw new Error("Oda bulunamadı.");
      totalPrice = room.price * nightCount;
    }

    const payload = {
      userId: data.userId ?? base.userId,
      roomId: nextRoomId,
      paymentCardId: data.paymentCardId ?? base.paymentCardId,

      nightCount,
      checkIn: data.checkIn ?? base.checkIn,
      checkOut: data.checkOut ?? base.checkOut,
      guests: data.guests ?? base.guests,
      startDate: nextStart,
      endDate: nextEnd,
      totalPrice,

      hotelAddress: data.hotelAddress ?? base.hotelAddress,
      userPhone: data.userPhone ?? base.userPhone,
      specialRequest: data.specialRequest ?? base.specialRequest,
      paymentMethod: data.paymentMethod ?? base.paymentMethod,
    };

    return ReservationRepository.update(id, payload);
    }

  static async softDelete(id: string) {
    return ReservationRepository.softDelete(id);
  }
}
