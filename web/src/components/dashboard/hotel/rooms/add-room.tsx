"use client";

import { FC, useState } from "react";
import { Room } from "@/types/room";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddRoomDialogProps {
  isAddRoomDialogOpen: boolean;
  setIsAddRoomDialogOpen: (value: boolean) => void;
}

const AddRoomDialog: FC<AddRoomDialogProps> = ({
  isAddRoomDialogOpen,
  setIsAddRoomDialogOpen,
}) => {
  const [newRoom, setNewRoom] = useState<Partial<Room & { image?: File }>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewRoom({ ...newRoom, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Oda eklendi:", newRoom);
    setIsAddRoomDialogOpen(false);
    setNewRoom({});
    setPreviewImage(null);
  };

  const handleCancel = () => {
    setIsAddRoomDialogOpen(false);
    setNewRoom({});
    setPreviewImage(null);
  };

  return (
    <DialogContent  className="sm:max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Oda Ekle</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Oda Adı</Label>
          <Input
            id="name"
            placeholder="Oda Adı"
            value={newRoom.name || ""}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Oda Açıklaması</Label>
          <Textarea
            id="description"
            placeholder="Oda Açıklaması"
            value={newRoom.description || ""}
            onChange={(e) =>
              setNewRoom({ ...newRoom, description: e.target.value })
            }
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="type">Oda Türü</Label>
          <Select
            value={newRoom.type || ""}
            onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Oda Türü Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STANDARD">Standart</SelectItem>
              <SelectItem value="DELUXE">Deluxe</SelectItem>
              <SelectItem value="SUITE">Süit</SelectItem>
              <SelectItem value="PRESIDENTIAL">Başkanlık</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="maxAdults">Maksimum Yetişkin</Label>
            <Input
              id="maxAdults"
              type="number"
              placeholder="Maksimum Yetişkin"
              value={newRoom.maxAdults || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, maxAdults: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="maxChildren">Maksimum Çocuk</Label>
            <Input
              id="maxChildren"
              type="number"
              placeholder="Maksimum Çocuk"
              value={newRoom.maxChildren || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, maxChildren: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="floor">Kat</Label>
            <Input
              id="floor"
              type="number"
              placeholder="Kat"
              value={newRoom.floor || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, floor: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roomNumber">Oda Numarası</Label>
            <Input
              id="roomNumber"
              type="number"
              placeholder="Oda Numarası"
              value={newRoom.roomNumber || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, roomNumber: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Fiyat</Label>
          <Input
            id="price"
            type="number"
            placeholder="Fiyat"
            value={newRoom.price || ""}
            onChange={(e) =>
              setNewRoom({ ...newRoom, price: Number(e.target.value) })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="capacity">Toplam Kapasite</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Toplam Kapasite"
              value={newRoom.capacity || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, capacity: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bedCount">Yatak Sayısı</Label>
            <Input
              id="bedCount"
              type="number"
              placeholder="Yatak Sayısı"
              value={newRoom.bedCount || ""}
              onChange={(e) =>
                setNewRoom({ ...newRoom, bedCount: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Oda görseli alanı */}
        <div className="grid gap-2">
          <Label htmlFor="roomImage">Oda Görseli</Label>
          <Input
            id="roomImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Oda Önizleme"
              className="mt-2 h-32 w-full object-cover rounded"
            />
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleCancel}>
          İptal
        </Button>
        <Button onClick={handleSave}>Kaydet</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddRoomDialog;
