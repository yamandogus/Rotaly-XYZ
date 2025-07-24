import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="font-bold text-lg">Rotaly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              En iyi otel rezervasyon deneyimi için doğru adrestesiniz. 
              Konforlu konaklama seçenekleri ve uygun fiyatlar.
            </p>
            <div className="flex space-x-2">
              <Link
                href="#"
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Hızlı Linkler</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/hotels"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Oteller
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Hakkımızda
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                İletişim
              </Link>
              <Link
                href="/help"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Yardım
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Destek</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                SSS
              </Link>
              <Link
                href="/cancel"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                İptal Politikası
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">İletişim</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@rotaly.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Rotaly. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Şartlar
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Gizlilik
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Çerezler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 