import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Hotel } from "@/types/hotel";
import React from "react";

interface EditHotelDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  t: (key: string) => string;
  selectedHotel: Hotel;
}

const EditHotelDialog = ({ isEditDialogOpen, setIsEditDialogOpen, t, selectedHotel }: EditHotelDialogProps) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("editHotel")}</DialogTitle>
        </DialogHeader>
        {selectedHotel && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t("editingHotel")}: <strong>{selectedHotel.name}</strong>
            </p>
            {/* Edit form buraya gelecek */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={() => {
                  // Edit işlemi
                  setIsEditDialogOpen(false);
                }}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;
