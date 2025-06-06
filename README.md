# Alışveriş Uygulaması - Next.js + NestJS & Prisma

Modern web teknolojileri kullanarak geliştirilmiş tam kapsamlı bir alışveriş uygulaması.

## 📋 Proje Hakkında

Bu proje, Next.js'in en son App Directory yaklaşımını kullanarak modern bir alışveriş uygulaması geliştirmeyi amaçlar. Uygulama, ölçeklenebilir bir NestJS backend'i ile entegre edilmiş ve veri yönetimi için Prisma ORM kullanılmıştır.

## 🚀 Teknolojiler

### Frontend
- **Next.js** - App Directory yaklaşımı ile
- **React** - Kullanıcı arayüzü
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling

### Backend
- **NestJS** - Ölçeklenebilir backend framework
- **Prisma ORM** - Veritabanı yönetimi
- **PostgreSQL** - Veritabanı
- **JWT** - Kimlik doğrulama
- **WebSockets** - Gerçek zamanlı güncellemeler

### Ödeme & Entegrasyonlar
- **Stripe** - Ödeme işlemleri
- **Stripe Webhooks** - Gerçek zamanlı bildirimler

### Deployment
- **Vercel** - Frontend deployment
- **AWS** - Backend deployment
- **CI/CD Pipeline** - Otomatik dağıtım

## ✨ Özellikler

- 🛒 **Tam Kapsamlı Alışveriş Deneyimi** - Ürün listeleme, sepet yönetimi, ödeme
- 🔒 **Güvenli Kimlik Doğrulama** - JWT tabanlı authentication
- 💳 **Stripe Entegrasyonu** - Güvenli ödeme işlemleri
- 📱 **Responsive Tasarım** - Tüm cihazlarda uyumlu
- ⚡ **Server-Side Rendering** - Yüksek performans
- 🔄 **Gerçek Zamanlı Güncellemeler** - WebSocket desteği
- 🚀 **Production Ready** - AWS ve Vercel deployment

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL
- Stripe hesabı

### 1. Projeyi Klonlayın
```bash
git clone [repository-url]
cd shopping-app
```

### 2. Frontend Kurulumu
```bash
cd frontend
npm install
```

### 3. Backend Kurulumu
```bash
cd backend
npm install
```

### 4. Veritabanı Kurulumu
```bash
# Prisma migrations
npx prisma migrate dev
npx prisma generate
```

### 5. Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Backend (.env)
DATABASE_URL="postgresql://..."
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🚀 Uygulamayı Çalıştırma

### Development Mode
```bash
# Backend (Port 3001)
cd backend
npm run start:dev

# Frontend (Port 3000)
cd frontend
npm run dev
```

## 📁 Proje Yapısı

```

```

## 🔑 Ana Özellikler

### Kimlik Doğrulama
- Kullanıcı kayıt/giriş sistemi
- JWT token tabanlı güvenlik
- Korumalı route'lar

### Ürün Yönetimi
- Ürün listeleme ve detay sayfaları
- Kategori filtreleme
- Arama fonksiyonu

### Sepet & Ödeme
- Sepet yönetimi
- Stripe entegrasyonu
- Güvenli ödeme işlemleri

### Gerçek Zamanlı Özellikler
- WebSocket bağlantıları
- Anlık ürün güncellemeleri
- Sipariş durumu takibi

## 🚀 Production Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### AWS (Backend)
```bash
# Docker build
docker build -t shopping-app-backend .
# AWS deployment scripts
```

## 📚 Öğrenilen Konular

- Next.js App Directory yapısı
- Server-Side Rendering optimizasyonları
- NestJS modüler architektürü
- Prisma ORM kullanımı
- JWT authentication implementasyonu
- Stripe ödeme entegrasyonu
- WebSocket real-time kommunikasyonu
- AWS ve Vercel deployment süreçleri
- CI/CD pipeline kurulumu

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için:
- GitHub Issues bölümünü kullanabilirsiniz
- Email: [ahmet.altun60@gmail.com]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!