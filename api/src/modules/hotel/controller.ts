import {
  createHotel,
  getHotels,
  getHotelById,
  deleteHotel,
  updateHotel,
  createComment,
  getCommentsByHotelId,
  updateComment,
  deleteComment,
} from "./service";
import {
  CreateHotelSchema,
  UpdateHotelSchema,
  QueryHotelSchema,
  HotelResponseSchema,
  HotelDetailResponseSchema,
} from "../../dto/hotel";
import { Request, Response } from "express";
import { TokenPayload } from "../../types/express";

// Extend Express Request to include user from middleware
interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

// Yorum ekleme için basit schema
const CreateCommentSchema = {
  rating: (value: any) => {
    const num = Number(value);
    if (isNaN(num) || num < 1 || num > 5) {
      throw new Error("Rating 1-5 arasında olmalıdır");
    }
    return num;
  },
  text: (value: any) => value || undefined,
};

// Yorum güncelleme için basit schema
const UpdateCommentSchema = {
  rating: (value: any) => {
    if (value === undefined) return undefined;
    const num = Number(value);
    if (isNaN(num) || num < 1 || num > 5) {
      throw new Error("Rating 1-5 arasında olmalıdır");
    }
    return num;
  },
  text: (value: any) => value || undefined,
};

export async function createHotelHandler(req: Request, res: Response) {
  try {
    const sessionUser = req.user; // middleware ile eklenmiş olmalı

    // 🔐 Rol kontrolü
    if (
      !sessionUser ||
      !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")
    ) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    const parsed = CreateHotelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Geçersiz veri", errors: parsed.error.flatten() });
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
      return res
        .status(400)
        .json({
          message: "Geçersiz query parametreleri",
          errors: queryParsed.error.flatten(),
        });
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

export async function updateHotelHandler(req: Request, res: Response) {
  try {
    const sessionUser = req.user;
    const { id } = req.params;

    if (
      !sessionUser ||
      !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")
    ) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    const parsed = UpdateHotelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Geçersiz veri", errors: parsed.error.flatten() });
    }

    const hotel = await updateHotel(id, parsed.data);
    return res.status(200).json(hotel);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function deleteHotelHandler(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const sessionUser = req.user;
    const { id } = req.params;

    if (
      !sessionUser ||
      !["ADMIN", "HOTEL_OWNER"].includes(sessionUser.role || "")
    ) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    await deleteHotel(id);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// 🟢 Yorum ekleme handler'ı
export async function createCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user;
    const { hotelId } = req.params;

    // 🔐 Kullanıcı girişi kontrolü
    if (!sessionUser) {
      return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
    }

    // Rating ve text validasyonu
    let rating: number;
    let text: string | undefined;

    try {
      rating = CreateCommentSchema.rating(req.body.rating);
      text = CreateCommentSchema.text(req.body.text);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    const comment = await createComment({
      rating,
      text,
      hotelId,
      userId: sessionUser.userId,
    });

    return res.status(201).json(comment);
  } catch (error: any) {
    console.error("Create Comment Error:", error);
    
    if (error.message.includes("Rating") || error.message.includes("Otel bulunamadı") || error.message.includes("zaten yorum yapmışsınız")) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// 🔵 Belirli bir otelin yorumlarını getirme handler'ı
export async function getCommentsByHotelHandler(req: Request, res: Response) {
  try {
    const { hotelId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getCommentsByHotelId(hotelId, page, limit);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Get Comments Error:", error);
    
    if (error.message.includes("Otel bulunamadı")) {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// 🟡 Yorum güncelleme handler'ı
export async function updateCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user;
    const { commentId } = req.params;

    // 🔐 Kullanıcı girişi kontrolü
    if (!sessionUser) {
      return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
    }

    // Rating ve text validasyonu
    let rating: number | undefined;
    let text: string | undefined;

    try {
      rating = UpdateCommentSchema.rating(req.body.rating);
      text = UpdateCommentSchema.text(req.body.text);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

    const comment = await updateComment(commentId, sessionUser.userId, {
      rating,
      text,
    });

    return res.status(200).json(comment);
  } catch (error: any) {
    console.error("Update Comment Error:", error);
    
    if (error.message.includes("Rating") || error.message.includes("Yorum bulunamadı")) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// 🔴 Yorum silme handler'ı
export async function deleteCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const sessionUser = req.user;
    const { commentId } = req.params;

    // 🔐 Kullanıcı girişi kontrolü
    if (!sessionUser) {
      return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
    }

    const result = await deleteComment(commentId, sessionUser.userId);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Delete Comment Error:", error);
    
    if (error.message.includes("Yorum bulunamadı") || error.message.includes("silinemedi")) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
