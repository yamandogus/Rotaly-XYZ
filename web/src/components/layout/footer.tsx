import { Link } from '@/i18n/routing'
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
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
                Otel
              </Link>
              <Link
                href="/categories/villa"
                className="text-sm text-blue-100 hover:text-white"
              >
                Villa
              </Link>
              <Link
                href="/categories/apartment"
                className="text-sm text-blue-100 hover:text-white"
              >
                Kiralık Daire
              </Link>
              <Link
                href="/categories/bungalow"
                className="text-sm text-blue-100 hover:text-white"
              >
                Bungalov
              </Link>
              <Link
                href="/categories/pension"
                className="text-sm text-blue-100 hover:text-white"
              >
                Pansiyon
              </Link>
              <Link
                href="/categories/camp"
                className="text-sm text-blue-100 hover:text-white"
              >
                Kamp
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
                Sıkça Sorulan Sorular
              </Link>
              <Link
                href="/support/live-chat"
                className="text-sm text-blue-100 hover:text-white"
              >
                Canlı Destek
              </Link>
              <Link
                href="/support/cancellation"
                className="text-sm text-blue-100 hover:text-white"
              >
                İptal ve Değişim
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
                Hakkımızda
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-blue-100 hover:text-white"
              >
                Gizlilik
              </Link>
              <Link
                href="/terms"
                className="text-sm text-blue-100 hover:text-white"
              >
                Şartlar ve Koşullar
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
              © All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 