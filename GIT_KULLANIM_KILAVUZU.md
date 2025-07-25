## 📂 Branch Yapısı

- **Geliştirici Branch’leri**: Herkes kendi adıyla bir branch oluşturur ve yalnızca o branch’te çalışır.

- **development**: Ortak geliştirme alanı. Herkes buraya kod göndermeden önce kendi branch'inde çalışır.

- **main**: Sadece en son ve hatasız kodların bulunduğu ana branch.

### Başlangıç Adımları

**1. Projeyi bilgisayarına klonla:**

```bash
git clone https://github.com/yamandogus/Rotaly-XYZ.git
cd Rotaly-XYZ
```

**2. Kendi branch’ine geçiş yap:**

```bash
git checkout -b <ismin> origin/development
```

`Örnek: git checkout -b meliha origin/development`

**3. Branch’in yoksa oluştur:**

```bash
git checkout -b <ismin> origin/development
git push -u origin <ismin>
```

---

Çalışırken düzenli olarak

```bash
git pull origin development
```

komutunu kullanın.
