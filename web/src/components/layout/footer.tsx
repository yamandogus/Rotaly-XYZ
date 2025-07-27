import { Link } from '@/i18n/routing'
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')
  return (
    <footer className="bg-[#1E4EAE] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Kategoriler */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kategoriler</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/categories/hotel"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("hotel")}
              </Link>
              <Link
                href="/categories/villa"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("villa")}
              </Link>
              <Link
                href="/categories/apartment"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("apartment")}
              </Link>
              <Link
                href="/categories/bungalow"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("bungalow")}
              </Link>
              <Link
                href="/categories/pension"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("pension")}
              </Link>
              <Link
                href="/categories/camp"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("camp")}
              </Link>
            </nav>
          </div>

          {/* Destek */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Destek</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/support/faq"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("faq")}
              </Link>
              <Link
                href="/support/live-chat"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("live-chat")}
              </Link>
              <Link
                href="/support/cancellation"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("cancellation")}
              </Link>
            </nav>
          </div>

          {/* Bizi Keşfet */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bizi Keşfet</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("about")}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-blue-100 hover:text-white"
              >
                {t("terms")}
              </Link>
            </nav>
          </div>

          {/* Bizi Takip Et */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bizi Takip Et</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-md p-2 text-blue-100 hover:text-white hover:bg-blue-500"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-md p-2 text-blue-100 hover:text-white hover:bg-blue-500"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-md p-2 text-blue-100 hover:text-white hover:bg-blue-500"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-md p-2 text-blue-100 hover:text-white hover:bg-blue-500"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-500 pt-8">
          <div className="text-center">
            <p className="text-sm text-blue-100">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 