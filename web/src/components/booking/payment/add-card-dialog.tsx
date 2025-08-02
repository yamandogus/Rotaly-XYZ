import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddCardDialogProps {
  children: React.ReactNode;
}

const AddCardDialog = ({ children }: AddCardDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form verilerini işle
    console.log("Kart kaydedildi");
    // Dialog'u kapat
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-card">
        <DialogHeader>
          <DialogTitle>Kart Ekle</DialogTitle>
          <DialogDescription>
            Kart bilgilerinizi giriniz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="card-name">Kart Üzerindeki İsim</Label>
              <Input
                id="card-name"
                name="cardName"
                placeholder="Kart üzerindeki isim"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="card-number">Kart Numarası</Label>
              <Input
                id="card-number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="grid gap-3 flex-1">
                <Label htmlFor="expiry-date">
                  Son Kullanma Tarihi
                </Label>
                <Input
                  id="expiry-date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="grid gap-3 flex-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">İptal</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#2F6FED] text-white hover:bg-[#2F6FED]/90 transition-all duration-300"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;