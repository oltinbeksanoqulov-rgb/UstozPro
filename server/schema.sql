-- ========================================================
-- USTOZPRO / E-COMMERCE POSTGRESQL DATABASE SCHEMA
-- ========================================================

-- 1. KATEGORIYALAR JADVALI (Categories)
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  name_ru VARCHAR(128),
  name_en VARCHAR(128),
  slug VARCHAR(64) UNIQUE NOT NULL,
  icon VARCHAR(64) DEFAULT 'Folder',
  color VARCHAR(64) DEFAULT 'bg-emerald-600',
  courses_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. MAHSULOTLAR VA KURSLAR JADVALI (Courses / Products)
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
  category_name VARCHAR(128) NOT NULL,
  category_color VARCHAR(64) DEFAULT 'bg-emerald-600',
  instructor VARCHAR(128) NOT NULL,
  instructor_role VARCHAR(128),
  instructor_avatar TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  price NUMERIC(12, 2) NOT NULL,
  original_price NUMERIC(12, 2),
  thumbnail TEXT NOT NULL,
  level VARCHAR(64) DEFAULT 'Barcha darajalar',
  duration VARCHAR(64) DEFAULT '10 soat',
  lessons_count INT DEFAULT 12,
  enrolled_count INT DEFAULT 0,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. BUYURTMALAR JADVALI (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY,
  customer_name VARCHAR(128) NOT NULL,
  customer_phone VARCHAR(64) NOT NULL,
  customer_email VARCHAR(128),
  total_amount NUMERIC(12, 2) NOT NULL,
  payment_method VARCHAR(32) NOT NULL DEFAULT 'click',
  status VARCHAR(32) NOT NULL DEFAULT 'kutilmoqda', -- 'kutilmoqda', 'tasdiqlangan', 'yetkazildi', 'bekor_qilindi'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BUYURTMA ICHIDAGI MAHSULOTLAR (Order Items)
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
  course_id VARCHAR(64),
  title VARCHAR(255) NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  quantity INT DEFAULT 1,
  thumbnail TEXT
);

-- 5. ADMIN VA FOYDALANUVCHILAR (Users)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(32) DEFAULT 'student', -- 'student', 'mentor', 'admin'
  balance NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ASOSIY TEST MA'LUMOTLARI (Initial Seed)
INSERT INTO categories (id, name, name_ru, name_en, slug, icon, color, courses_count) VALUES
  ('programming', 'Dasturlash va IT', 'Программирование', 'Programming', 'programming', 'Code2', 'bg-emerald-600', 32),
  ('english', 'Xorijiy tillar (IELTS / CEFR)', 'Иностранные языки', 'Foreign Languages', 'english', 'Languages', 'bg-blue-600', 28),
  ('design', 'Grafik dizayn va 3D', 'Дизайн и 3D', 'Design & 3D', 'design', 'Palette', 'bg-purple-600', 19),
  ('business', 'Biznes va Marketing', 'Бизнес и маркетинг', 'Business & Marketing', 'business', 'TrendingUp', 'bg-amber-600', 24),
  ('math', 'Aniq fanlar va Matematika', 'Точные науки', 'Exact Sciences', 'math', 'Calculator', 'bg-teal-600', 15),
  ('crafts', 'Hunarmandchilik', 'Ремесло', 'Handicraft', 'crafts', 'Hammer', 'bg-amber-700', 12),
  ('cooking', 'Pazandalik va Taomlar', 'Кулинария', 'Cooking', 'cooking', 'UtensilsCrossed', 'bg-orange-600', 16),
  ('mechanics', 'Mexanika va Avtoservis', 'Автомеханика', 'Mechanics', 'mechanics', 'Wrench', 'bg-slate-700', 10)
ON CONFLICT (id) DO NOTHING;
