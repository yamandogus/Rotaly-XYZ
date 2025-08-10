"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-center">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {t("title")}
        </h1>
      </div>

      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6016.451935958043!2d28.980267249633762!3d41.064053019894764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71cc5d69f1f%3A0x51e922b9e59b5a9b!2zaXN0YW5idWwgcm90YXJ5IGt1bMO8YsO8IGRlcm5lxJ9p!5e0!3m2!1str!2str!4v1754138151565!5m2!1str!2str"
          className="w-full h-[70vh] opacity-80"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>

        <div className="max-w-7xl mx-auto p-8 rounded-b-lg shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex-1 max-w-sm text-left">
              <h3 className="font-bold text-base mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                {t("addressTitle")}
              </h3>

              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Bertance Bulvarı, Sevin Apartman No:64 D:11 <br />
                Balmumcu Beşiktaş / İstanbul
              </p>
            </div>

            <div className="flex-none flex flex-col items-center">
              <h2 className="text-xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 uppercase tracking-wide transition-colors duration-300">
                ROTALY
              </h2>
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={24}
                height={24}
                className="h-24 w-auto object-contain"
              />
            </div>

            <div className="flex-1 max-w-sm text-right">
              <h3 className="font-bold text-base mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                {t("contactTitle")}
              </h3>

              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300">
                +90 (212) 217 5995 (pbx) <br />
                +90 (212) 259 1890 <br />
                info@burostatik.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-10 top-[14vh] z-20 max-w-xs w-full">
        <div className="bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {t("contactForm")}
          </h2>
          <form className="space-y-3">
            <div>
              <Label
                htmlFor="name"
                className="text-sm text-gray-900 dark:text-gray-300"
              >
                {t("nameLabel")}
              </Label>
              <Input
                id="name"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-sm text-gray-900 dark:text-gray-300"
              >
                {t("emailLabel")}
              </Label>
              <Input
                id="email"
                type="email"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="text-sm text-gray-900 dark:text-gray-300"
              >
                {t("phoneLabel")}
              </Label>
              <Input
                id="phone"
                type="tel"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                className="text-sm text-gray-900 dark:text-gray-300"
              >
                {t("messageLabel")}
              </Label>
              <Textarea
                id="message"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="text-right">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
              >
                {t("submit")}
              </Button>
            </div>
          </form>
          <div className="mt-6 flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300">
            <div className="flex space-x-2">
              <a href="#">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
            <p>{t("followUs")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
