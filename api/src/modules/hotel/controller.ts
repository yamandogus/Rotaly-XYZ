
import { createHotel, getHotels, getHotelById, deleteHotel, updateHotel } from "./service";
import { 
  CreateHotelSchema, 
  UpdateHotelSchema, 
  QueryHotelSchema,
  HotelResponseSchema,
  HotelDetailResponseSchema 
} from "../../dto/hotel";
import { Request, Response } from "express";
import { TokenPayload } from "../../types/express";

// Extend Express Request to include user from middleware
interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export async function createHotelHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user; // middleware ile eklenmiş olmalı

    // 🔐 Rol kontrolü
    if (!sessionUser || !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    const parsed = CreateHotelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Geçersiz veri", errors: parsed.error.flatten() });
    }

    const hotel = await createHotel({
      ...parsed.data,
      ownerId: sessionUser.userId,
    });

    return res.status(201).json(hotel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function getHotelsHandler(req: Request, res: Response) {
  try {
    // Query parametrelerini validate et
    const queryParsed = QueryHotelSchema.safeParse(req.query);
    if (!queryParsed.success) {
      return res.status(400).json({ message: "Geçersiz query parametreleri", errors: queryParsed.error.flatten() });
    }

    const hotels = await getHotels(queryParsed.data);
    return res.status(200).json(hotels);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function getHotelByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const hotel = await getHotelById(id);
    
    if (!hotel) {
      return res.status(404).json({ message: "Otel bulunamadı" });
    }
    
    return res.status(200).json(hotel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function updateHotelHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user;
    const { id } = req.params;

    if (!sessionUser || !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    const parsed = UpdateHotelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Geçersiz veri", errors: parsed.error.flatten() });
    }

    const hotel = await updateHotel(id, parsed.data);
    return res.status(200).json(hotel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function deleteHotelHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user;
    const { id } = req.params;

    if (!sessionUser || !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    await deleteHotel(id);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
