"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, UploadIcon, EditIcon, SaveIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface CompanyFormData {
  companyLogo: string;
  companyName: string;
  emailAddress: string;
  companyVatOrTaxId: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export default function CompanyPage() {
  const t = useTranslations();
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CompanyFormData>({
    defaultValues: {
      companyLogo: "/images/logo3.PNG",
      companyName: "Rotaly XYZ Otel Rezervasyon Sistemi",
      emailAddress: "info@rotalyxyz.com",
      companyVatOrTaxId: "1234567890",
      country: "turkey",
      address: "Atatürk Caddesi No: 123 Konyaaltı",
      city: "Antalya",
      state: "Antalya",
      postalCode: "07070",
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    console.log(data);
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo3.PNG" alt="Company Logo" width={64} height={64} />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {t("Company.title")}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t("Company.subtitle")}
              </p>
            </div>
            {saved && (
              <div className="ml-auto flex items-center gap-2 text-green-600">
                <CheckIcon className="w-4 h-4" />
                <span className="text-sm">{t("Company.changesSaved")}</span>
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Logo */}
              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("Company.companyLogo")} *
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50 overflow-hidden">
                          <Image
                            src={field.value || "/images/logo3.PNG"}
                            alt="Company Logo"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          disabled={!isEditing}
                        >
                          <UploadIcon className="w-4 h-4 mr-2" />
                          {t("Company.upload")}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("Company.companyName")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Company.companyName")}
                        {...field}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Email Address */}
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("Company.emailAddress")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("Company.emailAddress")}
                        {...field}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Company VAT or Tax ID */}
              <FormField
                control={form.control}
                name="companyVatOrTaxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("Company.companyVatOrTaxId")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Company.companyVatOrTaxId")}
                        {...field}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Billing Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("Company.billingAddress")}</h3>

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("Company.country")}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🇹🇷</span>
                              <SelectValue placeholder={t("Company.country")} />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="turkey">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🇹🇷</span>
                              {t("Company.turkey")}
                            </div>
                          </SelectItem>
                          <SelectItem value="unitedStates">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🇺🇸</span>
                              {t("Company.unitedStates")}
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("Company.address")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("Company.address")}
                          {...field}
                          disabled={!isEditing}
                          className="bg-background"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("Company.city")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("Company.city")}
                            {...field}
                            disabled={!isEditing}
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("Company.state")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("Company.state")}
                            {...field}
                            disabled={!isEditing}
                            className="bg-background"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Postal Code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("Company.postalCode")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("Company.postalCode")}
                          {...field}
                          disabled={!isEditing}
                          className="bg-background"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={handleEdit}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    <EditIcon className="w-4 h-4 mr-2" />
                    {t("Company.edit") || "Güncelle"}
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <SaveIcon className="w-4 h-4 mr-2" />
                      {t("Company.save") || "Kaydet"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <XIcon className="w-4 h-4 mr-2" />
                      {t("Company.cancel") || "İptal"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}