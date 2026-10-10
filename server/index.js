import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  initDatabase,
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCategories,
  createCategory,
  deleteCategory,
  getOrders,
  createOrder,
  updateOrderStatus,
  getStats
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize database connection
let dbStatus = { mode: 'Initializing...' };
initDatabase().then(status => {
  dbStatus = status;
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'UstozPro Backend API',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// 1. COURSES / PRODUCTS API
// ============================================

// GET /api/courses - Ro'yxatni olish (filtrlar bilan)
app.get('/api/courses', async (req, res) => {
  try {
    const { category, search } = req.query;
    const courses = await getCourses({ category, search });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/courses/:id - Alohida kursni olish
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Kurs topilmadi' });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/courses - Yangi mahsulot/kurs qo'shish (Admin)
app.post('/api/courses', async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price) {
      return res.status(400).json({ success: false, message: 'Kurs nomi va narxi talab qilinadi' });
    }
    const newCourse = await createCourse(req.body);
    res.status(201).json({ success: true, message: 'Kurs muvaffaqiyatli yaratildi', data: newCourse });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/courses/:id - Kursni tahrirlash (Admin)
app.put('/api/courses/:id', async (req, res) => {
  try {
    const updated = await updateCourse(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Kurs topilmadi' });
    }
    res.json({ success: true, message: 'Kurs muvaffaqiyatli yangilandi', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/courses/:id - Kursni o'chirish (Admin)
app.delete('/api/courses/:id', async (req, res) => {
  try {
    const deleted = await deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Kurs topilmadi' });
    }
    res.json({ success: true, message: 'Kurs muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// 2. CATEGORIES API
// ============================================

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/categories - Yangi kategoriya qo'shish (Admin)
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Kategoriya nomi kiritilishi shart' });
    }
    const newCat = await createCategory(req.body);
    res.status(201).json({ success: true, message: 'Kategoriya qo\'shildi', data: newCat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/categories/:id - Kategoriyani o'chirish
app.delete('/api/categories/:id', async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ success: true, message: 'Kategoriya o\'chirildi' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// 3. ORDERS API (Mijozlar buyurtmasi & Admin boshqaruvi)
// ============================================

// GET /api/orders - Barcha buyurtmalarni olish (Admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders - Yangi buyurtma berish (Savatdan / Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerPhone, items, totalAmount } = req.body;
    if (!customerName || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Mijoz ismi, telefon raqami va savatdagi mahsulotlar kiritilishi shart'
      });
    }
    const order = await createOrder(req.body);
    res.status(201).json({
      success: true,
      message: 'Buyurtmangiz qabul qilindi! Tez orada operatorimiz bog\'lanadi.',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/orders/:id/status - Buyurtma statusini yangilash (Admin)
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Yangi status ko\'rsatilmadi' });
    }
    const updated = await updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    }
    res.json({ success: true, message: 'Buyurtma statusi yangilandi', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================
// 4. ADMIN STATS & AUTH
// ============================================

// GET /api/stats - Boshqaruv paneli statistikasi
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/admin-login - Admin kirish
app.post('/api/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'admin123';

  if (username === adminUser && password === adminPass) {
    res.json({
      success: true,
      token: 'jwt-mock-ustozpro-admin-token-777',
      admin: { name: 'Bosh Administrator', role: 'admin' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Login yoki parol noto\'g\'ri' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 UstozPro Express REST API server ishga tushdi: http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});
