"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HotelNew } from "@/types/hotel";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface EditHotelDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  t: (key: string) => string;
  selectedHotel: HotelNew;
}

// isActive - Oteli aktif/pasif yapma (en önemli)
// name - Otel adı düzeltme
// city/country - Konum bilgisi düzeltme
// type - Otel tipini düzeltme

const EditHotelDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  t,
  selectedHotel,
}: EditHotelDialogProps) => {
  const hotelFormSchema = z.object({
    name: z.string().min(2, t("nameMin2")),
    location: z.string().min(2, t("locationMin2")),
    address: z.string().min(2, t("addressMin2")),
    isActive: z.boolean(),
    city: z.string().min(2, t("cityMin2")),
    country: z.string().min(2, t("countryMin2")),
    type: z.enum([
      "APARTMENT",
      "HOTEL",
      "VILLA",
      "BUNGALOW",
      "ROOM",
      "RESORT",
      "HOSTEL",
      "CAMP",
    ]).refine((val) => val !== undefined, {
      message: t("selectType"),
    }),
    ownerId: z.string().min(1, t("required")),
  });

  type HotelFormValues = z.infer<typeof hotelFormSchema>;

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      name: selectedHotel.name || "",
      location: selectedHotel.location || "",
      address: selectedHotel.address || "",
      isActive: selectedHotel.isActive ?? false,
      city: selectedHotel.city || "",
      country: selectedHotel.country || "",
      type: (selectedHotel.type as HotelFormValues['type']) || "HOTEL",
      ownerId: selectedHotel.ownerId || "",
    },
  });

  const onSubmit = (data: HotelFormValues) => {
    console.log(data);
    // TODO: API çağrısı yapılacak
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("editHotel")}</DialogTitle>
        </DialogHeader>
        {selectedHotel && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {t("editingHotel")}: <strong>{selectedHotel.name}</strong>
                </p>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        {t("name")}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t("name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        {t("location")}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t("location")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        {t("type")}
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Birini seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="APARTMENT">APARTMENT</SelectItem>
                            <SelectItem value="HOTEL">HOTEL</SelectItem>
                            <SelectItem value="VILLA">VILLA</SelectItem>
                            <SelectItem value="BUNGALOW">BUNGALOW</SelectItem>
                            <SelectItem value="ROOM">ROOM</SelectItem>
                            <SelectItem value="RESORT">RESORT</SelectItem>
                            <SelectItem value="HOSTEL">HOSTEL</SelectItem>
                            <SelectItem value="CAMP">CAMP</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-sm font-medium">
                        {t("isActive")}
                      </FormLabel>
                      <FormControl>
                                                 <RadioGroup 
                           onValueChange={(value) => field.onChange(value === "true")}
                           value={field.value ? "true" : "false"}
                         >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="true" id="active" />
                            <Label htmlFor="active">{t("active")}</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="false" id="inactive" />
                            <Label htmlFor="inactive">{t("inactive")}</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit">
                    {t("save")}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;
