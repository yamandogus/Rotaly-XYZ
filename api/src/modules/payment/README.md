# Payment Module - Kredi Kartı Modülü

Bu modül kullanıcıların kredi kartı bilgilerini güvenli şekilde yönetmelerini sağlar.

## Özellikler

### 🔐 Güvenlik
- Kredi kartı numaralarının tokenizasyonu
- Sadece son 4 hane ve marka bilgisi saklanır
- Kullanıcı sahiplik doğrulaması
- JWT tabanlı kimlik doğrulama

### ✅ Validasyon
- Luhn algoritması ile kart numarası doğrulama
- Son kullanma tarihi kontrolü
- Marka tespiti (Visa, Mastercard, American Express, vs.)
- Duplicate kart kontrolü

### 📊 Yönetim
- Kredi kartı listeleme (sayfalama ile)
- Güncelleme (sadece isim ve son kullanma tarihi)
- Silme (aktif rezervasyonlar kontrol edilir)
- İstatistikler

## API Endpoints

### Kullanıcı Endpoints

#### Kredi Kartlarını Listele
```
GET /api/payments/cards
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- sortBy: "createdAt" | "brand" | "expiresAt" (default: "createdAt")
- sortOrder: "asc" | "desc" (default: "desc")
```

#### Yeni Kredi Kartı Ekle
```
POST /api/payments/cards
Body:
{
  "cardNumber": "4111111111111111",
  "cardHolderName": "John Doe",
  "expiryDate": "12/25",
  "cvv": "123"
}
```

#### Kredi Kartı Detayı
```
GET /api/payments/cards/:id
```

#### Kredi Kartı Güncelle
```
PUT /api/payments/cards/:id
Body:
{
  "cardHolderName": "Jane Doe", // opsiyonel
  "expiryDate": "01/26" // opsiyonel
}
```

#### Kredi Kartı Sil
```
DELETE /api/payments/cards/:id
```

#### Varsayılan Kredi Kartı
```
GET /api/payments/cards/default
```

#### Kart Sahipliği Doğrula
```
GET /api/payments/cards/:id/verify
```

#### Kredi Kartı İstatistikleri
```
GET /api/payments/cards/stats
```

### Admin Endpoints

#### Süresi Dolmuş Kartlar
```
GET /api/payments/admin/expired-cards?userId=optional
```

## Desteklenen Kart Markaları

- ✅ Visa (4xxx)
- ✅ Mastercard (5xxx)
- ✅ American Express (34xx, 37xx)
- ✅ Discover (6011, 65xx)
- ✅ Diners Club (30xx, 36xx, 38xx)
- ✅ Troy (9792xxxx) - Türkiye'ye özel

## Environment Variables

```env
# Kart tokenizasyonu için encryption key
CARD_ENCRYPTION_KEY=your-super-secret-encryption-key
```

## Güvenlik Notları

⚠️ **ÖNEMLİ**: Bu modül demonstrasi amaçlıdır. Production ortamında:

1. **PCI DSS Compliance**: Gerçek kredi kartı bilgileri için PCI DSS standartlarına uygun altyapı kullanın
2. **External Payment Processor**: Stripe, Square, veya benzer servisleri entegre edin
3. **Encryption**: Daha güçlü encryption algoritmaları kullanın
4. **Audit Logging**: Tüm işlemleri loglayın
5. **Rate Limiting**: Kart ekleme/silme işlemlerine özel limitler ekleyin

## Test Kredi Kartı Numaraları

Geliştirme ortamında test için kullanabileceğiniz kart numaraları:

```
Visa: 4111111111111111
Visa: 4000056655665556
Mastercard: 5555555555554444
Mastercard: 5200828282828210
American Express: 378282246310005
American Express: 371449635398431
```

## Hata Kodları

- `400`: Geçersiz kart bilgisi
- `401`: Kimlik doğrulama gerekli
- `403`: Yetkisiz erişim
- `404`: Kart bulunamadı
- `409`: Kart zaten kayıtlı veya aktif rezervasyonlar var
- `500`: Sunucu hatası

## Database Schema

```sql
-- PaymentCard tablosu zaten Prisma schema'da mevcut
model PaymentCard {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  token     String // Tokenleştirilmiş kart bilgisi
  brand     String // Kart markası (Visa, Mastercard vb.)
  last4     String // Kartın son 4 hanesi
  expiresAt DateTime // Son kullanma tarihi
  createdAt DateTime @default(now()) @map("created_at")

  user        User          @relation(fields: [userId], references: [id])
  reservation Reservation[]

  @@map("payment_cards")
}
```
