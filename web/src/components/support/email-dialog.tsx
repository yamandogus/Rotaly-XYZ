"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useTranslations } from "next-intl"

const EmailDialog = () => {
    const t = useTranslations("Support")
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger className="dark:text-blue-100 cursor-pointer">
          <p className="hover:underline hover:text-blue-500 transition-all duration-300">
            {t("email")}
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("emailTitle")}</DialogTitle>
            <DialogDescription>
              {t("email")}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EmailDialog