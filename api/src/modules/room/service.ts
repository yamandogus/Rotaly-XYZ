import { RoomRepository } from "../../modules/room/repository"
import { CreateRoomDto } from "../../dto/room/create-room.dto";
import { UpdateRoomDto } from "../../dto/room/update-room.dto";
import { QueryRoomDto } from "../../dto/room/query-room.dto";

export class RoomService {
  static async createRoom(data: CreateRoomDto) {
    return await RoomRepository.createRoom(data);
  }

  static async updateRoom(roomId: string, data: UpdateRoomDto) {
    const existingRoom = await RoomRepository.getRoomById(roomId);
    if (!existingRoom) {
      throw new Error("Room not found");
    }
    return await RoomRepository.updateRoom(roomId, existingRoom.hotelId, data);
  }

  static async deleteRoom(roomId: string) {
    const existingRoom = await RoomRepository.getRoomById(roomId);
    if (!existingRoom) {
      throw new Error("Room not found");
    }
    return await RoomRepository.deleteRoom(roomId);
  }

  static async getRoomById(roomId: string) {
    const room = await RoomRepository.getRoomById(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    return room;
  }

  static async getRooms(query: QueryRoomDto) {
    return await RoomRepository.getRoomsByHotelId(query.hotelId || "");
  }

  static async getRoomsByHotel(hotelId: string) {
    return await RoomRepository.getRoomsByHotelId(hotelId);
  }
}
