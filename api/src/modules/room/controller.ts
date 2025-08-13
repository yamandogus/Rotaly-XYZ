import { Request, Response } from "express";
import { RoomService } from "./service";
import { CreateRoomSchema } from "../../dto/room/create-room.dto";
import { UpdateRoomSchema } from "../../dto/room/update-room.dto";

// Room oluşturma
export async function createRoomHandler(req: Request, res: Response) {
  try {
    const parsed = CreateRoomSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        message: "Geçersiz veri", 
        errors: parsed.error.flatten() 
      });
    }

    const room = await RoomService.createRoom(parsed.data);
    return res.status(201).json(room);
  } catch (error) {
    console.error("Create Room Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// Tek oda getir
export async function getRoomByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const room = await RoomService.getRoomById(id);

    if (!room) {
      return res.status(404).json({ message: "Oda bulunamadı" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error("Get Room Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// Belirli bir otelin tüm odalarını getir
export async function getRoomsByHotelHandler(req: Request, res: Response) {
  try {
    const { hotelId } = req.params;
    const rooms = await RoomService.getRoomsByHotel(hotelId);
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Rooms By Hotel Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// Oda güncelle
export async function updateRoomHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const parsed = UpdateRoomSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        message: "Geçersiz veri", 
        errors: parsed.error.flatten() 
      });
    }

    const updatedRoom = await RoomService.updateRoom(id, parsed.data);
    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Update Room Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}

// Oda sil
export async function deleteRoomHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await RoomService.deleteRoom(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Delete Room Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
