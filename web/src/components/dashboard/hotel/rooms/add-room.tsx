"use client";

import { FC, useState } from "react";
import { Room } from "@/types/room";

interface AddRoomDialogProps {
  isAddRoomDialogOpen: boolean;
  setIsAddRoomDialogOpen: (value: boolean) => void;
}

const AddRoomDialog: FC<AddRoomDialogProps> = ({
  isAddRoomDialogOpen,
  setIsAddRoomDialogOpen,
}) => {
  const [newRoom, setNewRoom] = useState<Partial<Room>>({});

  const handleSave = () => {
    console.log("Oda eklendi:", newRoom);
    setIsAddRoomDialogOpen(false);
  };

  if (!isAddRoomDialogOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Oda Ekle</h2>
        <input
          type="text"
          placeholder="Oda Adı"
          className="input input-bordered w-full mb-2"
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
        />
        <textarea
          placeholder="Oda Açıklaması"
          className="input input-bordered w-full mb-2"
          onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
          rows={3}
        />
        <select
          className="input input-bordered w-full mb-2"
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        >
          <option value="">Oda Türü Seçin</option>
          <option value="STANDARD">Standart</option>
          <option value="DELUXE">Deluxe</option>
          <option value="SUITE">Süit</option>
          <option value="PRESIDENTIAL">Başkanlık</option>
        </select>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="number"
            placeholder="Maksimum Yetişkin"
            className="input input-bordered w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, maxAdults: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Maksimum Çocuk"
            className="input input-bordered w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, maxChildren: Number(e.target.value) })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="number"
            placeholder="Kat"
            className="input input-bordered w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, floor: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Oda Numarası"
            className="input input-bordered w-full"
            onChange={(e) =>
              setNewRoom({ ...newRoom, roomNumber: Number(e.target.value) })
            }
          />
        </div>
        <input
          type="number"
          placeholder="Fiyat"
          className="input input-bordered w-full mb-2"
          onChange={(e) =>
            setNewRoom({ ...newRoom, price: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Toplam Kapasite"
          className="input input-bordered w-full mb-2"
          onChange={(e) =>
            setNewRoom({ ...newRoom, capacity: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Yatak Sayısı"
          className="input input-bordered w-full mb-2"
          onChange={(e) =>
            setNewRoom({ ...newRoom, bedCount: Number(e.target.value) })
          }
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setIsAddRoomDialogOpen(false)}
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

export default AddRoomDialog;
