"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Edit, Camera, BadgeCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { DatePicker } from "@/components/date-picker";

export default function ProfilePage() {
  const t = useTranslations("Profile");


  const [personalInfo, setPersonalInfo] = useState([
    { id: "firstName", label: t("firstName"), value: "Ahmet" },
    { id: "lastName", label: t("lastName"), value: "Yıldız" },
    { id: "dob", label: t("dob"), value: "1990-10-12" },
    { id: "email", label: t("email"), value: "info@binary-fusion.com" },
    { id: "phone", label: t("phone"), value: "+90 532 123 4567" },
    { id: "role", label: t("role"), value: "Kullanıcı" },
  ]);

  const [addressInfo, setAddressInfo] = useState([
    { id: "country", label: t("country"), value: "Türkiye" },
    { id: "city", label: t("city"), value: "Ankara" },
    { id: "postalCode", label: t("postalCode"), value: "ERT 1254" },
  ]);

  const [notifications, setNotifications] = useState([

    {
      id: 1,
      message: "Yeni rezervasyonunuz onaylandı.",
      date: "2025-08-01T10:00:00Z",
      read: false,
    },
    {
      id: 2,
      message: "Profil bilgileriniz başarıyla güncellendi.",
      date: "2025-07-30T15:30:00Z",
      read: true,
    },
    {
      id: 3,
      message: "Sistem bakımı nedeniyle 5 Ağustos'ta hizmet verilemeyecek.",
      date: "2025-07-28T08:15:00Z",
      read: false,
    },
  ]);




  const [editSection, setEditSection] = useState<"personal" | "address" | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempData, setTempData] = useState<typeof personalInfo>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const handleEditClick = (section: "personal" | "address") => {
    const data =
      section === "personal"
        ? personalInfo.filter((f) => f.id !== "role").map((item) => ({ ...item }))
        : addressInfo.map((item) => ({ ...item }));

    setEditSection(section);
    setTempData(data);
    setErrors({});
    setOpenDialog(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    tempData.forEach((field) => {
      const val = field.value.trim();

      if (!val) {
        newErrors[field.id] = t("fieldRequired");
      } else if (
        field.id === "email" &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(val)
      ) {
        newErrors[field.id] = t("invalidEmail");
      } else if (
        field.id === "phone" &&
        !/^\+90\s5\d{2}\s\d{3}\s\d{4}$/.test(val)
      ) {
        newErrors[field.id] = t("invalidPhone");
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};
    const { current, new: newPass, confirm } = passwords;

    if (!current) newErrors.current = t("fieldRequired");
    if (!newPass) newErrors.new = t("fieldRequired");
    if (!confirm) newErrors.confirm = t("fieldRequired");

    if (newPass && confirm && newPass !== confirm)
      newErrors.confirm = t("passwordsDoNotMatch");

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editSection === "personal") {
      const roleField = personalInfo.find((f) => f.id === "role")!;
      const updated = [...tempData, roleField];
      setPersonalInfo(updated);
    } else {
      setAddressInfo(tempData);
    }

    setOpenDialog(false);
  };

  const handlePasswordSave = () => {
    if (!validatePasswordChange()) return;

    console.log("Password changed:", passwords);

    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordErrors({});
    setOpenPasswordDialog(false);
  };

  const getFieldValue = (data: typeof personalInfo, id: string) =>
    data.find((f) => f.id === id)?.value || "";

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-80">
          <TabsList className="flex flex-col gap-3 self-start mt-8 ml-4 w-full bg-transparent p-6">
            {[
              { value: "profile", label: t("title"), icon: "👤" },
              { value: "reservations", label: t("reservations"), icon: "📅" },
              { value: "past", label: t("pastReservations"), icon: "🕓" },
              { value: "notifications", label: t("notifications"), icon: "🔔" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="w-full px-6 py-4 text-base font-medium text-left rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 space-y-10">
          <TabsContent value="profile" className="space-y-10">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{t("title")}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("subtitle")}</p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative group">
                <Avatar className="h-28 w-28 ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-400 transition">
                  <AvatarImage src="/images/userprofile.png" />
                  <AvatarFallback>AY</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 backdrop-blur rounded-full p-1 shadow"
                >
                  <Camera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-medium text-gray-800 dark:text-white flex items-center gap-2">
                  <span>
                    {getFieldValue(personalInfo, "firstName")}{" "}
                    {getFieldValue(personalInfo, "lastName")}
                  </span>
                  <BadgeCheck className="text-blue-500 w-5 h-5" />
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getFieldValue(personalInfo, "role")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getFieldValue(addressInfo, "city")},{" "}
                  {getFieldValue(addressInfo, "country")}
                </p>
              </div>
            </div>

            {[{ title: t("personalInfo"), data: personalInfo, key: "personal" }, { title: t("addressInfo"), data: addressInfo, key: "address" }].map(
              (section) => (
                <section
                  key={section.key}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6 space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-gray-300/40 dark:border-gray-600 pb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {section.title}
                    </h3>
                    <Button
                      onClick={() => handleEditClick(section.key as "personal" | "address")}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      {t("edit")}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                    {section.data.map((field) => (
                      <div key={field.id} className="space-y-1 pb-4">
                        <Label className="text-gray-500 dark:text-gray-400 text-sm">{field.label}</Label>
                        <p className="text-gray-800 dark:text-white font-medium">
                          {field.id === "dob"
                            ? format(new Date(field.value), "dd.MM.yyyy")
                            : field.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )
            )}

            {/* Şifre alanı */}
            <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-300/40 dark:border-gray-600 pb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t("passwordOperations")}
                </h3>
                <Button
                  onClick={() => setOpenPasswordDialog(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t("changePassword")}
                </Button>
              </div>
              <p className="text-ml text-gray-500 dark:text-gray-400">
                {t("passwordSettingsDescription")}
              </p>
            </section>
          </TabsContent>

          <TabsContent value="reservations">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("reservations")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t("reservationsDescription")}</p>
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("pastReservations")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t("pastReservationsDescription")}</p>
            </div>
          </TabsContent>


          <TabsContent value="notifications">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("notifications")}
              </h2>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">{t("noNotifications")}</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border ${
                        notif.read
                          ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          : "border-blue-400 bg-blue-50 dark:bg-blue-900"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <p
                          className={`text-sm ${
                            notif.read
                              ? "text-gray-800 dark:text-gray-200"
                              : "font-semibold text-blue-800 dark:text-blue-200"
                          }`}
                        >
                          {notif.message}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(notif.date), "dd.MM.yyyy HH:mm")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>

      {/* Bilgi düzenleme diyaloğu */}
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setTempData([]);
            setErrors({});
            setEditSection(null);
          }
          setOpenDialog(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("edit")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {tempData.map((field, idx) => (
              <div key={field.id} className="space-y-1">
                <Label htmlFor={field.id} className="text-gray-700 dark:text-gray-300">
                  {field.label}
                </Label>

                {field.id === "dob" ? (
                  <DatePicker />
                ) : (
                  <Input
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const updated = [...tempData];
                      updated[idx].value = e.target.value;
                      setTempData(updated);
                    }}
                    placeholder={field.id === "phone" ? "+90 532 123 4567" : undefined}
                    className={`dark:bg-gray-800 dark:text-white ${errors[field.id] ? "border-red-500" : ""}`}
                  />
                )}
                {errors[field.id] && (
                  <p className="text-sm text-red-500">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Şifre değiştirme diyaloğu */}
      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("changePassword")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {[
              { id: "current", label: t("currentPassword") },
              { id: "new", label: t("newPassword") },
              { id: "confirm", label: t("confirmNewPassword") },
            ].map((field) => (
              <div key={field.id} className="space-y-1">
                <Label htmlFor={field.id} className="text-gray-700 dark:text-gray-300">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type="password"
                  value={passwords[field.id as keyof typeof passwords]}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                  className={`dark:bg-gray-800 dark:text-white ${
                    passwordErrors[field.id] ? "border-red-500" : ""
                  }`}
                />
                {passwordErrors[field.id] && (
                  <p className="text-sm text-red-500">{passwordErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={handlePasswordSave}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
