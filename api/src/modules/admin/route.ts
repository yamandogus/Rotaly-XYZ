Dashboard (Admin)
GET /dashboard - Dashboard ana sayfa
GET /dashboard/admin - Admin dashboard
GET /dashboard/admin/admins - Admin yönetimi
GET /dashboard/admin/company - Şirket yönetimi
GET /dashboard/admin/customers - Müşteri yönetimi
GET /dashboard/admin/hotels - Otel yönetimi
GET /dashboard/admin/profile - Admin profili
Dashboard (Hotel)
GET /dashboard/hotel - Otel dashboard
GET /dashboard/hotel/company - Şirket bilgileri
GET /dashboard/hotel/hotel-info - Otel bilgileri
GET /dashboard/hotel/profile - Otel profili
GET /dashboard/hotel/reservations - Rezervasyonlar




Backend (API) Endpoint'leri:
Admin Modülü:
GET /admin/dashboard: Admin dashboard verilerini getirir (örneğin, toplam kullanıcı sayısı, toplam otel sayısı, son rezervasyonlar).
GET /admin/users: Tüm kullanıcıları listeler.
GET /admin/users/:id: Belirli bir kullanıcıyı getirir.
PUT /admin/users/:id: Bir kullanıcıyı günceller (örneğin, rolünü değiştirme).
DELETE /admin/users/:id: Bir kullanıcıyı siler.
GET /admin/hotels: Tüm otelleri listeler.
GET /admin/hotels/:id: Belirli bir oteli getirir.
PUT /admin/hotels/:id: Bir oteli günceller.
DELETE /admin/hotels/:id: Bir oteli siler.
Otel Sahibi (Owner) Modülü:
GET /owner/dashboard: Otel sahibi dashboard verilerini getirir (örneğin, toplam rezervasyon sayısı, aylık gelir, bekleyen rezervasyonlar).
GET /owner/hotels/:id: Otel bilgilerini getirir (sadece kendi oteli).
PUT /owner/hotels/:id: Otel bilgilerini günceller (sadece kendi oteli).
POST /owner/hotels/:id/rooms: Yeni bir oda oluşturur (sadece kendi oteli).
PUT /owner/hotels/:id/rooms/:roomId: Bir odayı günceller (sadece kendi oteli).
DELETE /owner/hotels/:id/rooms/:roomId: Bir odayı siler (sadece kendi oteli).
GET /owner/reservations: Tüm rezervasyonları listeler (sadece kendi oteli).
GET /owner/reservations/:id: Belirli bir rezervasyonu getirir (sadece kendi oteli).
POST /owner/reservations/:id/approve: Bir rezervasyonu onaylar (sadece kendi oteli).
POST /owner/reservations/:id/reject: Bir rezervasyonu reddeder (sadece kendi oteli).
GET /owner/reports/revenue: Gelir raporunu getirir (sadece kendi oteli).
GET /owner/reports/reservations: Rezervasyon raporunu getirir (sadece kendi oteli).