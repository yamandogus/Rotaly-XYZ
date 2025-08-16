"use client";

import { FC } from "react";
import { Room } from "@/types/room";

interface DeleteRoomDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  selectedRoom: Room;
  confirmDelete: () => void;
}

const DeleteRoomDialog: FC<DeleteRoomDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedRoom,
  confirmDelete,
}) => {
  if (!isDeleteDialogOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Oda Sil</h2>
        <p>
          <strong>{selectedRoom.name}</strong> (Oda {selectedRoom.roomNumber} - {selectedRoom.floor}. Kat) adlı oda silinsin mi? Bu işlem geri alınamaz.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Oda Türü: {selectedRoom.type} | Kapasite: {selectedRoom.capacity} | Fiyat: {selectedRoom.price}₺
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            İptal
          </button>
          <button className="btn btn-error" onClick={confirmDelete}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomDialog;
