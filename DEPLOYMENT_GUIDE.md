# 🚀 UstozPro: Saytni Internetga Joylash va To‘liq Ishlatish Qo‘llanmasi

Ushbu qo‘llanma **UstozPro** fullstack platformasini (React + Vite, Express.js REST API va PostgreSQL) internetga 100% bepul joylash hamda barcha funksiyalarini ishlatish bo‘yicha to‘liq yo‘riqnomadir.

---

## 🏗️ Arxitektura va Texnologiyalar

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
  - Mahsulotlarni/kurslarni ko‘rish va jonli qidirish
  - **Savat (Cart Drawer):** Mahsulotlarni qo‘shish, sonini boshqarish, o‘chirish, summani hisoblash
  - **Buyurtma berish (Checkout):** Mijoz ma'lumotlari, to‘lov usullari (Click, Payme, Balans, Naqd) va tasdiqlash
- **Admin Panel:**
  - Mahsulotlar/kurslar boshqaruvi (Yangi qo‘shish, tahrirlash, o‘chirish)
  - Kategoriyalar boshqaruvi (Yangi kategoriya qo‘shish, o‘chirish)
  - Buyurtmalar boshqaruvi (Barcha buyurtmalar, statuslarini o‘zgartirish: Kutilmoqda, Tasdiqlangan, Yetkazildi, Bekor qilindi)
  - Analitika & Statistika (Jami tushum, buyurtmalar soni)
- **Backend API:** Express.js REST API (`server/index.js`, port 5000)
- **Ma'lumotlar bazasi:** PostgreSQL (`server/schema.sql`, `server/db.js`)
  - *Avtomatik qulaylik:* Agar PostgreSQL ulanmagan bo‘lsa, tizim to‘xtab qolmasdan o‘zining `local_db.json` xotirasida ishlashni davom ettiradi.

---

## 1-QADAM: PostgreSQL Ma'lumotlar Bazasini Bepul Yaratish (Neon.tech yoki Supabase)

1. [https://neon.tech](https://neon.tech) yoki [https://supabase.com](https://supabase.com) saytiga kiring va ro‘yxatdan o‘ting (GitHub orqali 1 ta bosishda).
2. Yangi loyiha (Project) yarating: `ustozpro-db`.
3. Sizga tayyor ulanish havolasi (**Connection String**) beriladi. Masalan:
   ```env
   DATABASE_URL=postgres://neondb_owner:parol@ep-cold-lake-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Saytdagi **SQL Editor** bo‘limiga kiring va loyihangizdagi [`server/schema.sql`](file:///c:/Users/user/Desktop/UstozPro/server/schema.sql) fayli ichidagi kodni nusxalab (copy), SQL Editorga qo‘ying va **Run** tugmasini bosing.
   - Bu `categories`, `courses`, `orders`, `order_items`, `users` jadvallarini avtomatik hosil qiladi!

---

## 2-QADAM: Backend (Express.js API) ni Render.com ga Joylash

1. [https://render.com](https://render.com) ga kiring va GitHub orqali kiring.
2. **New +** -> **Web Service** ni tanlang.
3. Loyihangiz GitHub omborini (repository) ulang.
4. Quyidagi parametrlarni kiriting:
   - **Name:** `ustozpro-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
5. **Environment Variables** bo‘limida quyidagi o‘zgaruvchilarni qo‘shing:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: *(1-qadamda olingan Neon yoki Supabase havolasi)*
6. **Create Web Service** tugmasini bosing.
   - 2-3 daqiqada sizga bepul backend URL beriladi, masalan: `https://ustozpro-api.onrender.com`.

---

## 3-QADAM: Frontend (React + Vite) ni Vercel ga Joylash

1. [https://vercel.com](https://vercel.com) ga kiring va GitHub profilingiz orqali kiring.
2. **Add New...** -> **Project** tugmasini bosing.
3. UstozPro repozitoriyasini tanlang va **Import** qiling.
4. Framework avtomatik ravishda **Vite** deb tanlanadi.
5. Loyihadagi `vercel.json` faylida backend havolangizni ko‘rsatishingiz mumkin:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://ustozpro-api.onrender.com/api/$1"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
6. **Deploy** tugmasini bosing!
7. Saytingiz 1 daqiqa ichida internetda butun dunyoga ochiq bo‘ladi (masalan: `https://ustozpro.vercel.app`)!

---

## 4-QADAM: Mahalliy (Local) Kompyuterda Ishga Tushirish

Loyihani o‘zingizning kompyuteringizda to‘liq ishga tushirish uchun:

1. **Terminal 1 (Backend Express server):**
   ```bash
   npm run server
   ```
   *Natija: `🚀 UstozPro Express REST API server ishga tushdi: http://localhost:5000`*

2. **Terminal 2 (Frontend React Vite):**
   ```bash
   npm run dev
   ```
   *Natija: Brauzerda `http://localhost:5173` manzilida sayt ochiladi.*

---

## 🌟 Yangi Qo‘shilgan Barcha Funksiyalar va Foydalanish

1. **🛒 Savat (Shopping Cart):**
   - Istalgan kurs kartochkasidagi yashil **Savat** tugmasini bosing.
   - Yuqori burchakdagi (Navbar) savat belgisida mahsulotlar soni indikatori (badge) chiqadi.
   - Savat tugmasini bossangiz, o‘ng tomondan qulay oyna ochiladi: unda miqdorni o‘zgartirish, o‘chirish va umumiy summa hisoblanadi.

2. **📝 Buyurtma berish (Checkout):**
   - Savatdagi **Buyurtma berish** tugmasini bosing.
   - Ism, telefon, izoh va to‘lov usulini (Click, Payme, Balans yoki Naqd) tanlang.
   - **Tasdiqlash** bosilganda qutlov konfetti animatsiyasi va rasmiy buyurtma kvitansiyasi ko‘rsatiladi.

3. **🛡️ Admin Panel:**
   - Navbar-dagi **Admin** tugmasini bosing.
   - **Buyurtmalar (Orders):** Mijozlarning barcha buyurtmalari ro‘yxati, telefon raqamlari, buyurtma statusini (🟡 Kutilmoqda, 🟢 Tasdiqlangan, 🔵 Yetkazilgan, 🔴 Bekor qilingan) darhol o‘zgartirish.
   - **Mahsulotlar (Courses):** Yangi kurs yoki tovar qo‘shish, tahrirlash, o‘chirish.
   - **Kategoriyalar (Categories):** Yangi bo‘limlar ochish va boshqarish.
   - **Statistika & Baza:** Jami tushum va PostgreSQL ulanish holati ko‘rsatkichlari.
