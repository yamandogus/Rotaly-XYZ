"use client";

import { FC, useState, useEffect } from "react";
import { Room } from "@/types/room";

interface EditRoomDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  selectedRoom: Room;
}

const EditRoomDialog: FC<EditRoomDialogProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedRoom,
}) => {
  const [roomData, setRoomData] = useState<Room>(selectedRoom);

  useEffect(() => {
    setRoomData(selectedRoom);
  }, [selectedRoom]);

  const handleSave = () => {
    console.log("Oda güncellendi:", roomData);
    setIsEditDialogOpen(false);
  };

  if (!isEditDialogOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Oda Düzenle</h2>
        <input
          type="text"
          value={roomData.name}
          className="input input-bordered w-full mb-2"
          onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
        />
        <input
          type="number"
          value={roomData.price}
          className="input input-bordered w-full mb-2"
          onChange={(e) =>
            setRoomData({ ...roomData, price: Number(e.target.value) })
          }
        />
        <input
          type="number"
          value={roomData.capacity}
          className="input input-bordered w-full mb-2"
          onChange={(e) =>
            setRoomData({ ...roomData, capacity: Number(e.target.value) })
          }
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditDialogOpen(false)}
          >
            İptal
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoomDialog;
