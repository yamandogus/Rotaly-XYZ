# Rotaly API

Bu API, Rotaly otel rezervasyon sistemi için backend servisidir.

## Kurulum

```bash
npm install
```

## Veritabanı Kurulumu

```bash
# Prisma client'ı generate et
npx prisma generate

# Veritabanı migration'larını çalıştır
npx prisma migrate dev

# Seed verilerini ekle (4 temel kullanıcı)
npm run seed
```

## Seed Kullanıcıları

Seed işlemi sonrasında aşağıdaki 4 kullanıcı oluşturulur:

| Rol      | Email                | Şifre        |
|----------|----------------------|--------------|
| ADMIN    | admin@rotaly.com     | Admin123!    |
| OWNER    | owner@rotaly.com     | Owner123!    |
| SUPPORT  | support@rotaly.com   | Support123!  |
| CUSTOMER | customer@rotaly.com  | Customer123! |

## Geliştirme

```bash
# Geliştirme sunucusunu başlat
npm run dev
```

## Production

```bash
# Build
npm run build

# Başlat
npm start
```
