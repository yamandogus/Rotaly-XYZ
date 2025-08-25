# Rotaly-XYZ API Dokümantasyonu

## 📋 Proje Genel Bakış

Rotaly-XYZ, modern bir otel rezervasyon sistemidir. Bu API, TypeScript, Express.js, Prisma ORM ve PostgreSQL teknolojilerini kullanarak geliştirilmiş bir backend uygulamasıdır.

### 🏗️ Mimari Yapı

```
api/
├── main.ts                    # Ana uygulama giriş noktası
├── package.json              # Proje bağımlılıkları
├── tsconfig.json             # TypeScript konfigürasyonu
├── prisma/                   # Veritabanı şeması ve migration'lar
│   ├── schema.prisma         # Prisma veritabanı şeması
│   └── migrations/           # Veritabanı migration dosyaları
└── src/                      # Ana kaynak kodlar
    ├── config/               # Konfigürasyon dosyaları
    ├── dto/                  # Data Transfer Objects (Validation)
    ├── middleware/           # Express middleware'leri
    ├── modules/              # İş mantığı modülleri
    ├── services/             # Harici servisler
    ├── types/                # TypeScript tip tanımları
    └── utils/                # Yardımcı fonksiyonlar
```

## 🚀 Teknoloji Stack'i

### Backend Framework
- **Node.js** + **TypeScript** - Ana backend teknolojisi
- **Express.js** - Web framework
- **Socket.IO** - Gerçek zamanlı iletişim

### Veritabanı & ORM
- **PostgreSQL** - Ana veritabanı
- **Prisma ORM** - Veritabanı abstraction katmanı

### Güvenlik & Authentication
- **JWT (JSON Web Tokens)** - Kullanıcı kimlik doğrulaması
- **bcrypt** - Şifre hashleme
- **express-rate-limit** - Rate limiting
- **helmet** - Güvenlik middleware'i

### Validation & DTO
- **Zod** - Runtime type validation
- **express-validator** - Request validation

### Email & Communication
- **Nodemailer** - Email gönderimi
- **Handlebars** - Email template engine

### AI & External Services
- **OpenAI API** - Yapay zeka destekli müşteri hizmetleri
- **Cloudinary** - Görsel yönetimi

## 📊 Veritabanı Modeli

### 🏨 Temel Entities

#### User (Kullanıcılar)
- **Roller**: CUSTOMER, OWNER, ADMIN, SUPPORT, AI
- **Özellikler**: Email verification, OTP, profile management
- **İlişkiler**: Hotels, Reservations, Messages, Comments

#### Hotel (Oteller)
- **Tipler**: APARTMENT, HOTEL, VILLA, BUNGALOW, ROOM, RESORT, HOSTEL, CAMP
- **Özellikler**: Rating, discount system, features, images
- **İlişkiler**: Owner, Rooms, Comments, Reservations

#### Room (Odalar)
- **Tipler**: STANDARD, DELUXE, SUITE, PRESIDENTIAL, EXECUTIVE
- **Özellikler**: Pricing, capacity, features, availability
- **İlişkiler**: Hotel, Reservations, Images

#### Reservation (Rezervasyonlar)
- **Özellikler**: Date range, pricing, payment info, special requests
- **İlişkiler**: User, Room, Payment Cards

### 🔐 Güvenlik Modeli

#### Authentication & Authorization
- JWT tabanlı token sistemi
- Role-based access control (RBAC)
- Token revocation sistemi
- Email verification

#### Rate Limiting
- Global: 100 req/15min
- Auth: 20 req/15min
- Password Reset: 3 req/hour
- OTP: 5 req/15min

## 🏗️ Modül Yapısı

### 1. Auth Module (Kimlik Doğrulama)
```typescript
├── controller.ts    # Login, register, password reset
├── service.ts       # Business logic
├── route.ts         # API endpoints
└── index.ts         # Module exports
```

**Temel Endpoint'ler:**
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yapma
- `POST /api/auth/logout` - Çıkış yapma
- `POST /api/auth/reset-password` - Şifre sıfırlama
- `POST /api/auth/verify-email` - Email doğrulama

### 2. Hotel Module (Otel Yönetimi)
```typescript
├── controller.ts    # CRUD operations
├── service.ts       # Business logic & filtering
├── repository.ts    # Database operations
└── route.ts         # API endpoints
```

**Temel Özellikler:**
- Otel oluşturma ve düzenleme
- Gelişmiş filtreleme (konum, fiyat, özellikler)
- Görsel yönetimi
- Rating sistemi
- İndirim sistemi

### 3. Room Module (Oda Yönetimi)
```typescript
├── controller.ts    # Room CRUD operations
├── service.ts       # Availability checking
├── repository.ts    # Database operations
└── route.ts         # API endpoints
```

**Temel Özellikler:**
- Oda tanımlama ve yönetimi
- Müsaitlik kontrolü
- Özellik yönetimi (WiFi, klima, vb.)
- Fiyatlandırma sistemi

### 4. Reservation Module (Rezervasyon Yönetimi)
```typescript
├── controller.ts    # Booking operations
├── service.ts       # Business logic
├── repository.ts    # Database operations
└── route.ts         # API endpoints
```

**Temel Özellikler:**
- Rezervasyon oluşturma
- Tarih çakışması kontrolü
- Ödeme entegrasyonu
- Email bildirimleri

### 5. Owner Module (Otel Sahibi Yönetimi)
```typescript
├── controller.ts    # Owner-specific operations
├── service.ts       # Analytics & reporting
├── repository.ts    # Database operations
└── route.ts         # API endpoints
```

**Dashboard Özellikleri:**
- Gelir analizi
- Rezervasyon istatistikleri
- Doluluk oranları
- Popüler odalar
- Müşteri puanları

### 6. Support Module (Müşteri Hizmetleri)
```typescript
├── controller.ts    # Support ticket management
├── service.ts       # AI integration
├── repository.ts    # Database operations
└── route.ts         # API endpoints
```

**AI Destekli Özellikler:**
- Otomatik yanıt sistemi
- Kategori bazlı ticket yönetimi
- Support temsilcisi ataması
- Real-time messaging

### 7. Socket Module (Gerçek Zamanlı İletişim)
```typescript
├── controller.ts           # Socket management
├── handlers/              # Event handlers
│   ├── connection.handler.ts
│   ├── message.handler.ts
│   ├── notification.handler.ts
│   └── support.handler.ts
├── events/               # Event definitions
├── types/               # TypeScript interfaces
└── README.md           # Socket documentation
```

**Real-time Özellikler:**
- Kullanıcı durumu takibi
- Anlık mesajlaşma
- Bildirim sistemi
- Otel odası (group chat)
- Support chat

### 8. Admin Module (Yönetici Paneli)
```typescript
├── controller.ts    # Admin operations
├── service.ts       # System analytics
├── repository.ts    # Admin queries
└── route.ts         # Admin endpoints
```

**Yönetim Özellikleri:**
- Sistem geneli istatistikler
- Kullanıcı yönetimi
- Otel onaylama sistemi
- Support yönetimi

## 🔒 Middleware Sistemi

### 1. Authentication Middleware
```typescript
// JWT token doğrulama
authenticateToken()

// İsteğe bağlı authentication
optionalAuthenticateToken()
```

### 2. Authorization Middleware
```typescript
// Email doğrulaması
verifiedUser()

// Rol bazlı yetkilendirme
authorizeRoles(Role.ADMIN, Role.OWNER)

// Admin kontrolü
isAdmin()

// Otel sahibi kontrolü
isHotelOwner()
```

### 3. Rate Limiting
```typescript
// Global limiter
globalLimiter        // 100 req/15min

// Auth specific
authLimiter          // 20 req/15min
passwordResetLimiter // 3 req/hour
otpLimiter          // 5 req/15min
```

### 4. Validation Middleware
```typescript
// Zod schema validation
updateOwnerProfileSchema
createHotelSchema
createReservationSchema
```

## 📡 API Endpoint'leri

### Authentication Endpoints
```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/reset-password
POST   /api/auth/verify-email
GET    /api/auth/google
```

### Hotel Management
```http
GET    /api/hotels              # Liste oteller
POST   /api/hotels              # Yeni otel
GET    /api/hotels/:id          # Otel detayı
PUT    /api/hotels/:id          # Otel güncelle
DELETE /api/hotels/:id          # Otel sil
GET    /api/hotels/search       # Gelişmiş arama
```

### Room Management
```http
GET    /api/rooms              # Oda listesi
POST   /api/rooms              # Yeni oda
GET    /api/rooms/:id          # Oda detayı
PUT    /api/rooms/:id          # Oda güncelle
DELETE /api/rooms/:id          # Oda sil
GET    /api/rooms/availability # Müsaitlik kontrolü
```

### Reservation System
```http
GET    /api/reservations       # Rezervasyon listesi
POST   /api/reservations       # Yeni rezervasyon
GET    /api/reservations/:id   # Rezervasyon detayı
PUT    /api/reservations/:id   # Rezervasyon güncelle
DELETE /api/reservations/:id   # Rezervasyon iptal
```

### Owner Dashboard
```http
GET    /api/owner/profile      # Profil bilgileri
PUT    /api/owner/profile      # Profil güncelle
GET    /api/owner/dashboard    # Dashboard istatistikleri
GET    /api/owner/revenue      # Gelir analizi
GET    /api/owner/reservations/count    # Rezervasyon sayısı
GET    /api/owner/rating       # Ortalama puan
GET    /api/owner/room-stats   # Oda istatistikleri
GET    /api/owner/popular-rooms # Popüler odalar
```

### Support System
```http
GET    /api/support/list       # Destek talepleri
POST   /api/support/create     # Yeni destek talebi
POST   /api/support/close/:id  # Destek talebi kapat
GET    /api/support/ai-status  # AI servis durumu
POST   /api/support/ai-chat    # AI chat
```

### Admin Panel
```http
GET    /api/admin/dashboard/earnings      # Toplam kazanç
GET    /api/admin/dashboard/reservations  # Rezervasyon istatistikleri
GET    /api/admin/users                   # Kullanıcı yönetimi
GET    /api/admin/hotels                  # Otel yönetimi
```

## 🔧 Konfigürasyon

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rotaly"

# JWT Secrets
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

# Email Configuration
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"

# OpenAI Configuration
OPENAI_API_KEY="your_openai_key"
OPENAI_MODEL="gpt-3.5-turbo"
OPENAI_MAX_TOKENS="1000"
OPENAI_TEMPERATURE="0.7"

# Frontend
FRONTEND_URL="http://localhost:3000"

# Server
PORT="3001"
```

### Database Schema
```prisma
// Temel modeller
model User { ... }
model Hotel { ... }
model Room { ... }
model Reservation { ... }
model Support { ... }
model Message { ... }

// Enum'lar
enum Role { CUSTOMER, OWNER, ADMIN, SUPPORT, AI }
enum HotelType { APARTMENT, HOTEL, VILLA, BUNGALOW... }
enum RoomType { STANDARD, DELUXE, SUITE... }
enum SupportCategory { TECHNICAL, BILLING, RESERVATION... }
```

## 📝 DTO (Data Transfer Objects)

### Validation Schemas
Her modül için Zod tabanlı validation şemaları:

```typescript
// Auth DTOs
RegisterSchema
LoginSchema
ChangePasswordSchema

// Hotel DTOs
CreateHotelSchema
UpdateHotelSchema
QueryHotelSchema

// Reservation DTOs
CreateReservationSchema
UpdateReservationSchema

// Support DTOs
CreateSupportSchema
AIChatSchema
```

## 🚦 Hata Yönetimi

### AppError Sınıfı
```typescript
export class AppError extends Error {
  public statusCode: number;
  
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

### Global Error Handler
```typescript
// Merkezi hata yakalama
errorHandler middleware
- Production/Development mode
- Structured error responses
- Logging sistemi
```

## 🔄 Socket.IO Integration

### Real-time Features
```typescript
// Connection Management
- User authentication
- Online user tracking
- Room management

// Messaging System
- Direct messages
- Group chat (hotel rooms)
- Support chat
- Typing indicators

// Notifications
- Real-time notifications
- Hotel-specific broadcasts
- Admin announcements
```

### Socket Events
```typescript
SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "joinRoom",
  LEAVE_ROOM: "leaveRoom",
  SEND_MESSAGE: "sendMessage",
  TYPING_START: "typingStart",
  TYPING_STOP: "typingStop",
  // ... daha fazla
}
```

## 📈 Performance & Optimization

### Caching Strategy
- Prisma connection pooling
- Query optimization
- Rate limiting

### Security Measures
- JWT token rotation
- Password hashing (bcrypt)
- Input validation (Zod)
- SQL injection prevention (Prisma)
- CORS configuration
- Helmet security headers

## 🧪 Development Setup

### Prerequisites
```bash
- Node.js 18+
- PostgreSQL 14+
- TypeScript
- Prisma CLI
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd api

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Fill in your environment variables

# Database setup
npx prisma generate
npx prisma db push

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

### Scripts
```json
{
  "dev": "ts-node-dev --respawn --transpile-only ./main.ts",
  "build": "tsc",
  "start": "nodemon api/main.js",
  "seed": "ts-node src/seed.ts"
}
```



```



**Rotaly-XYZ API** - Modern, scalable, and secure hotel reservation system backend.


