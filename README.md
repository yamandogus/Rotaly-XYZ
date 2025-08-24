<div align="center">
  <img src="web/public/images/logo3.PNG" alt="Rotaly Logo" width="200" height="200" />
  
  # 🏨 Rotaly - Hotel Reservation System
  
  **Türkiye'nin En Güvenilir Otel Rezervasyon Platformu**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.12.0-black?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  [![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-black?style=for-the-badge&logo=socket.io)](https://socket.io/)
  
</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🎯 Proje Hakkında

**Rotaly**, Türkiye'nin önde gelen otel rezervasyon platformlarından biridir. Modern web teknolojileri kullanılarak geliştirilmiş, kullanıcı dostu arayüzü ve güçlü backend altyapısı ile 1000+ otel seçeneği sunmaktadır.

### 🌟 Ana Özellikler

- **Çok Dilli Destek**: Türkçe ve İngilizce dil desteği
- **Gerçek Zamanlı İletişim**: Socket.IO ile canlı mesajlaşma
- **AI Destekli Destek**: OpenAI entegrasyonu ile akıllı müşteri desteği
- **Güvenli Ödeme**: Güvenli ödeme sistemi entegrasyonu
- **Responsive Tasarım**: Tüm cihazlarda mükemmel deneyim
- **Admin Paneli**: Kapsamlı yönetim arayüzü

---

## ✨ Özellikler

### 👥 Kullanıcı Özellikleri
- 🔐 Güvenli kimlik doğrulama (JWT + Google OAuth)
- 📧 E-posta doğrulama ve şifre sıfırlama
- 🏨 Otel arama ve filtreleme
- 📅 Tarih aralığı seçimi
- 💳 Güvenli ödeme işlemleri
- ⭐ Otel değerlendirme ve yorum sistemi
- ❤️ Favori oteller listesi
- 💬 Canlı destek sistemi
- 📱 Mobil uyumlu tasarım

### 🏢 Otel Sahibi Özellikleri
- 🏨 Otel ve oda yönetimi
- 📊 Rezervasyon istatistikleri
- 💰 Gelir takibi
- 📝 Oda özellikleri yönetimi
- 🖼️ Fotoğraf yükleme
- ⏰ Müsaitlik takvimi

### 👨‍💼 Admin Özellikleri
- 👥 Kullanıcı yönetimi
- 🏨 Otel onaylama sistemi
- 📊 Sistem istatistikleri
- 🛡️ Güvenlik yönetimi
- 📧 Toplu e-posta gönderimi
- 🔧 Sistem ayarları

---

## 🛠️ Teknoloji Stack

### Frontend (Web)
- **Framework**: Next.js 15.4.3
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit + Redux Persist
- **UI Components**: Radix UI + Shadcn/ui
- **Internationalization**: next-intl
- **Real-time**: Socket.IO Client
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React + Tabler Icons

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + Passport.js
- **Real-time**: Socket.IO
- **Email**: Nodemailer + Handlebars
- **File Upload**: Multer + Cloudinary
- **AI Integration**: OpenAI API
- **Validation**: Zod + Express Validator

### DevOps & Tools
- **Package Manager**: npm
- **TypeScript**: 5.9.2
- **Linting**: ESLint
- **Version Control**: Git
- **Environment**: dotenv

---

## 📁 Proje Yapısı

```
Rotaly-XYZ/
├── 📁 api/                    # Backend API
│   ├── 📁 src/
│   │   ├── 📁 config/         # Konfigürasyon dosyaları
│   │   ├── 📁 modules/        # Modüler yapı
│   │   │   ├── 📁 auth/       # Kimlik doğrulama
│   │   │   ├── 📁 hotel/      # Otel yönetimi
│   │   │   ├── 📁 reservation/# Rezervasyon sistemi
│   │   │   ├── 📁 user/       # Kullanıcı yönetimi
│   │   │   ├── 📁 admin/      # Admin paneli
│   │   │   ├── 📁 support/    # Destek sistemi
│   │   │   └── 📁 socket/     # Gerçek zamanlı iletişim
│   │   ├── 📁 middleware/     # Middleware'ler
│   │   ├── 📁 dto/           # Data Transfer Objects
│   │   └── 📁 utils/         # Yardımcı fonksiyonlar
│   ├── 📁 prisma/            # Veritabanı şeması
│   └── main.ts               # Ana sunucu dosyası
│
├── 📁 web/                   # Frontend Web Uygulaması
│   ├── 📁 src/
│   │   ├── 📁 app/           # Next.js App Router
│   │   │   └── 📁 [locale]/  # Çok dilli routing
│   │   ├── 📁 components/    # React bileşenleri
│   │   │   ├── 📁 ui/        # UI bileşenleri
│   │   │   ├── 📁 auth/      # Kimlik doğrulama
│   │   │   ├── 📁 hotel/     # Otel bileşenleri
│   │   │   └── 📁 dashboard/ # Dashboard bileşenleri
│   │   ├── 📁 store/         # Redux store
│   │   ├── 📁 services/      # API servisleri
│   │   ├── 📁 hooks/         # Custom hooks
│   │   └── 📁 types/         # TypeScript tipleri
│   ├── 📁 public/            # Statik dosyalar
│   │   ├── 📁 images/        # Görseller
│   │   └── 📁 icons/         # İkonlar
│   └── 📁 messages/          # Çeviri dosyaları
```

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- PostgreSQL 13+
- npm veya yarn

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/your-username/rotaly-xyz.git
cd rotaly-xyz
```

### 2. Backend Kurulumu
```bash
cd api

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# Veritabanını kurun
npx prisma generate
npx prisma db push

# Seed verilerini yükleyin (opsiyonel)
npm run seed

# Geliştirme sunucusunu başlatın
npm run dev
```

### 3. Frontend Kurulumu
```bash
cd web

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# Geliştirme sunucusunu başlatın
npm run dev
```

### 4. Environment Değişkenleri

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rotaly_db"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

#### Frontend (.env)
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 📖 Kullanım

### Geliştirme Modu
```bash
# Backend (Port 3001)
cd api && npm run dev

# Frontend (Port 3000)
cd web && npm run dev
```

### Production Build
```bash
# Backend
cd api && npm run build && npm start

# Frontend
cd web && npm run build && npm start
```

### Veritabanı İşlemleri
```bash
# Migration oluşturma
npx prisma migrate dev --name migration_name

# Veritabanını sıfırlama
npx prisma migrate reset

# Prisma Studio (veritabanı görüntüleyici)
npx prisma studio
```

---

## 🔌 API Dokümantasyonu

### Ana Endpoint'ler

#### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/google` - Google ile giriş
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/reset-password` - Yeni şifre belirleme

#### Otel İşlemleri
- `GET /api/hotels` - Otel listesi
- `GET /api/hotels/:id` - Otel detayı
- `POST /api/hotels` - Otel oluşturma (Owner)
- `PUT /api/hotels/:id` - Otel güncelleme (Owner)

#### Rezervasyon İşlemleri
- `POST /api/reservations` - Rezervasyon oluşturma
- `GET /api/reservations` - Rezervasyon listesi
- `PUT /api/reservations/:id` - Rezervasyon güncelleme
- `DELETE /api/reservations/:id` - Rezervasyon iptali

#### Kullanıcı İşlemleri
- `GET /api/users/profile` - Profil bilgileri
- `PUT /api/users/profile` - Profil güncelleme
- `GET /api/users/favorites` - Favori oteller

#### Destek Sistemi
- `POST /api/support` - Destek talebi oluşturma
- `GET /api/support` - Destek talepleri
- `POST /api/support/ai-chat` - AI destekli sohbet

### Socket.IO Events
- `connection` - Bağlantı kurma
- `join_room` - Odaya katılma
- `send_message` - Mesaj gönderme
- `typing` - Yazıyor durumu
- `disconnect` - Bağlantı kesme

---

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Geliştirme Kuralları
- TypeScript kullanın
- ESLint kurallarına uyun
- Test yazın (mümkünse)
- Commit mesajlarını İngilizce yazın
- Kod review sürecine katılın

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## 📞 İletişim

- **Website**: [rotaly.com](https://rotaly.com)
- **Email**: info@rotaly.com
- **GitHub**: [@rotaly-team](https://github.com/rotaly-team)

---

<div align="center">
  <p>Made with ❤️ by Rotaly Team</p>
  <p>© 2024 Rotaly. All rights reserved.</p>
</div>

