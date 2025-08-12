import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react'

interface AddHotelDialogProps {
  isAddHotelDialogOpen: boolean;
  setIsAddHotelDialogOpen: (open: boolean) => void;
  t: (key: string) => string;
}

const AddHotelDialog = ({ isAddHotelDialogOpen, setIsAddHotelDialogOpen, t }: AddHotelDialogProps) => {
  return (
    <Dialog open={isAddHotelDialogOpen} onOpenChange={setIsAddHotelDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("addHotel")}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}

export default AddHotelDialog;