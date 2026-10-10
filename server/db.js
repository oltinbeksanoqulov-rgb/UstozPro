import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection config
const connectionString = process.env.DATABASE_URL;
let pool = null;
let isPostgresConnected = false;

// Local JSON fallback store file
const storageFilePath = path.join(__dirname, 'local_db.json');

// Default initial data
const initialData = {
  categories: [
    { id: 'programming', name: 'Dasturlash va IT', slug: 'programming', icon: 'Code2', color: 'bg-emerald-600', coursesCount: 32 },
    { id: 'english', name: 'Xorijiy tillar (IELTS / CEFR)', slug: 'english', icon: 'Languages', color: 'bg-blue-600', coursesCount: 28 },
    { id: 'design', name: 'Grafik dizayn va 3D', slug: 'design', icon: 'Palette', color: 'bg-purple-600', coursesCount: 19 },
    { id: 'business', name: 'Biznes va Marketing', slug: 'business', icon: 'TrendingUp', color: 'bg-amber-600', coursesCount: 24 },
    { id: 'math', name: 'Aniq fanlar va Matematika', slug: 'math', icon: 'Calculator', color: 'bg-teal-600', coursesCount: 15 },
    { id: 'crafts', name: 'Hunarmandchilik', slug: 'crafts', icon: 'Hammer', color: 'bg-amber-700', coursesCount: 12 },
    { id: 'cooking', name: 'Pazandalik va Taomlar', slug: 'cooking', icon: 'UtensilsCrossed', color: 'bg-orange-600', coursesCount: 16 },
    { id: 'mechanics', name: 'Mexanika va Avtoservis', slug: 'mechanics', icon: 'Wrench', color: 'bg-slate-700', coursesCount: 10 },
  ],
  courses: [
    {
      id: 'course-1',
      title: 'Fullstack JavaScript: Node.js, Express & React',
      category: 'programming',
      categoryName: 'Dasturlash',
      categoryColor: 'bg-emerald-600',
      instructor: 'Sardorbek Islomov',
      instructorRole: 'Lead Frontend Developer',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 4.95,
      reviewsCount: 840,
      price: 199000,
      originalPrice: 350000,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      level: 'Barcha darajalar',
      duration: '45 soat',
      lessonsCount: 54,
      enrolledCount: 3200,
      description: 'Noldan to professional darajagacha zamonaviy veb-ilovalarni yaratish, REST API, ma\'lumotlar bazasi va frontend integratsiyasi.',
      highlights: ['Real loyihalar ustida ishlash', 'Git & GitHub amaliyoti', 'Vite & Next.js asoslari', 'PostgreSQL bilan ishlash']
    },
    {
      id: 'course-2',
      title: 'IELTS 7.5+ ga tayyorlov: Writing & Speaking Masterclass',
      category: 'english',
      categoryName: 'Ingliz tili',
      categoryColor: 'bg-blue-600',
      instructor: 'Nodira Qodirova',
      instructorRole: 'IELTS 8.5 Instruktor',
      instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      reviewsCount: 1200,
      price: 160000,
      originalPrice: 290000,
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
      level: 'O\'rta',
      duration: '32 soat',
      lessonsCount: 40,
      enrolledCount: 4100,
      description: 'Writing Task 1 va 2 bo\'yicha 7+ andozalar, jonli intervyular va Speaking bo\'yicha erkin so\'zlashuv metodikasi.',
      highlights: ['20 ta mock imtihon tahlili', 'Eksklyuziv so\'z boyligi lug\'ati', 'Ustozdan shaxsiy fidbek']
    },
    {
      id: 'course-15',
      title: 'Avtomexanika va dvigatellar diagnostikasi',
      category: 'mechanics',
      categoryName: 'Mexanika',
      categoryColor: 'bg-slate-700',
      instructor: 'Akmaljon Vohidov',
      instructorRole: 'Bosh avtomexanik & Diagnostika ustasi',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      reviewsCount: 460,
      price: 220000,
      originalPrice: 380000,
      thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
      level: 'Barcha darajalar',
      duration: '36 soat',
      lessonsCount: 42,
      enrolledCount: 1670,
      description: 'Ichki yonuv dvigatellari, kompyuter diagnostikasi (OBD-2), yonilg\'i va tormoz tizimi nosozliklarini aniqlash hamda ta\'mirlash.',
      highlights: ['Kompyuter diagnostikasi sirlari', 'Dvigatel qismlarini yig\'ish-buzish', 'Elektrotizim va datchiklar testi']
    }
  ],
  orders: [
    {
      id: 'ORD-1001',
      customerName: 'Alisher Usmonov',
      customerPhone: '+998 90 555-12-34',
      customerEmail: 'alisher@example.com',
      totalAmount: 199000,
      paymentMethod: 'click',
      status: 'tasdiqlangan',
      notes: 'Iltimos dars materiallarini telegramga yuboring',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      items: [
        {
          id: 'item-1',
          courseId: 'course-1',
          title: 'Fullstack JavaScript: Node.js, Express & React',
          price: 199000,
          quantity: 1,
          thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
        }
      ]
    },
    {
      id: 'ORD-1002',
      customerName: 'Malika Karimova',
      customerPhone: '+998 93 444-88-99',
      customerEmail: 'malika.k@gmail.com',
      totalAmount: 380000,
      paymentMethod: 'payme',
      status: 'kutilmoqda',
      notes: 'Karta orqali to\'lov qilindi',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      items: [
        {
          id: 'item-2',
          courseId: 'course-2',
          title: 'IELTS 7.5+ ga tayyorlov',
          price: 160000,
          quantity: 1,
          thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'
        },
        {
          id: 'item-3',
          courseId: 'course-15',
          title: 'Avtomexanika va dvigatellar diagnostikasi',
          price: 220000,
          quantity: 1,
          thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
        }
      ]
    }
  ]
};

// Initialize JSON database fallback file if not present
function getLocalData() {
  try {
    if (!fs.existsSync(storageFilePath)) {
      fs.writeFileSync(storageFilePath, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const content = fs.readFileSync(storageFilePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading local db file:', err.message);
    return initialData;
  }
}

function saveLocalData(data) {
  try {
    fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local db file:', err.message);
  }
}

// Attempt PostgreSQL connection
export async function initDatabase() {
  if (connectionString) {
    try {
      pool = new Pool({
        connectionString,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });
      const client = await pool.connect();
      console.log('✅ PostgreSQL bazasiga muvaffaqiyatli ulandi!');
      isPostgresConnected = true;

      // Run schema if available
      try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        if (fs.existsSync(schemaPath)) {
          const sql = fs.readFileSync(schemaPath, 'utf8');
          await client.query(sql);
          console.log('✅ PostgreSQL jadvallari va sxemasi tekshirildi/yaratildi.');
        }
      } catch (schemaErr) {
        console.warn('⚠️ Sxemani ishga tushirishda ogohlantirish:', schemaErr.message);
      } finally {
        client.release();
      }
      return { success: true, mode: 'PostgreSQL' };
    } catch (err) {
      console.warn('⚠️ PostgreSQL ulanishida xatolik yuz berdi:', err.message);
      console.log('ℹ️ Server avtomatik tarzda mahalliylashtirilgan JSON xotiraga o\'tdi.');
      isPostgresConnected = false;
      return { success: false, mode: 'JSON_Storage' };
    }
  } else {
    console.log('ℹ️ DATABASE_URL berilmagan. Ma\'lumotlar lokal xotirada saqlanadi.');
    return { success: true, mode: 'JSON_Storage' };
  }
}

// ============================================
// DATA ACCESS METHODS (Courses, Orders, Categories)
// ============================================

export async function getCourses(filters = {}) {
  const data = getLocalData();
  let courses = data.courses || [];
  if (filters.category) {
    courses = courses.filter(c => c.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    courses = courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      (c.instructor && c.instructor.toLowerCase().includes(q)) ||
      (c.categoryName && c.categoryName.toLowerCase().includes(q))
    );
  }
  return courses;
}

export async function getCourseById(id) {
  const data = getLocalData();
  return (data.courses || []).find(c => c.id === id);
}

export async function createCourse(courseData) {
  const data = getLocalData();
  const newCourse = {
    id: courseData.id || `course-${Date.now()}`,
    title: courseData.title,
    category: courseData.category || 'programming',
    categoryName: courseData.categoryName || 'Boshqa',
    categoryColor: courseData.categoryColor || 'bg-emerald-600',
    instructor: courseData.instructor || 'UstozPro Mentor',
    instructorRole: courseData.instructorRole || 'Mutaxassis',
    instructorAvatar: courseData.instructorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: Number(courseData.rating) || 5.0,
    reviewsCount: Number(courseData.reviewsCount) || 1,
    price: Number(courseData.price) || 100000,
    originalPrice: courseData.originalPrice ? Number(courseData.originalPrice) : undefined,
    thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    level: courseData.level || 'Barcha darajalar',
    duration: courseData.duration || '20 soat',
    lessonsCount: Number(courseData.lessonsCount) || 24,
    enrolledCount: Number(courseData.enrolledCount) || 10,
    description: courseData.description || '',
    highlights: Array.isArray(courseData.highlights) ? courseData.highlights : ['Amaliy mashg\'ulotlar', 'Sertifikat'],
    createdAt: new Date().toISOString()
  };

  data.courses = [newCourse, ...(data.courses || [])];
  saveLocalData(data);
  return newCourse;
}

export async function updateCourse(id, courseData) {
  const data = getLocalData();
  const index = (data.courses || []).findIndex(c => c.id === id);
  if (index === -1) return null;

  data.courses[index] = {
    ...data.courses[index],
    ...courseData,
    id // preserve id
  };
  saveLocalData(data);
  return data.courses[index];
}

export async function deleteCourse(id) {
  const data = getLocalData();
  const initialLength = (data.courses || []).length;
  data.courses = (data.courses || []).filter(c => c.id !== id);
  saveLocalData(data);
  return data.courses.length < initialLength;
}

// CATEGORIES
export async function getCategories() {
  const data = getLocalData();
  return data.categories || [];
}

export async function createCategory(catData) {
  const data = getLocalData();
  const newCat = {
    id: catData.id || `cat-${Date.now()}`,
    name: catData.name,
    slug: catData.slug || catData.name.toLowerCase().replace(/\s+/g, '-'),
    icon: catData.icon || 'Folder',
    color: catData.color || 'bg-emerald-600',
    coursesCount: 0
  };
  data.categories = [...(data.categories || []), newCat];
  saveLocalData(data);
  return newCat;
}

export async function deleteCategory(id) {
  const data = getLocalData();
  data.categories = (data.categories || []).filter(c => c.id !== id);
  saveLocalData(data);
  return true;
}

// ORDERS
export async function getOrders() {
  const data = getLocalData();
  return data.orders || [];
}

export async function createOrder(orderData) {
  const data = getLocalData();
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: orderData.customerName || 'Mijoz',
    customerPhone: orderData.customerPhone || '',
    customerEmail: orderData.customerEmail || '',
    totalAmount: Number(orderData.totalAmount) || 0,
    paymentMethod: orderData.paymentMethod || 'click',
    status: 'kutilmoqda', // 'kutilmoqda' | 'tasdiqlangan' | 'yetkazildi' | 'bekor_qilindi'
    notes: orderData.notes || '',
    items: orderData.items || [],
    createdAt: new Date().toISOString()
  };

  data.orders = [newOrder, ...(data.orders || [])];
  saveLocalData(data);
  return newOrder;
}

export async function updateOrderStatus(id, newStatus) {
  const data = getLocalData();
  const order = (data.orders || []).find(o => o.id === id);
  if (!order) return null;

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  saveLocalData(data);
  return order;
}

// STATS
export async function getStats() {
  const data = getLocalData();
  const orders = data.orders || [];
  const courses = data.courses || [];
  const categories = data.categories || [];

  const totalRevenue = orders
    .filter(o => o.status === 'tasdiqlangan' || o.status === 'yetkazildi')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const pendingOrders = orders.filter(o => o.status === 'kutilmoqda').length;
  const completedOrders = orders.filter(o => o.status === 'yetkazildi' || o.status === 'tasdiqlangan').length;

  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingOrders,
    completedOrders,
    totalCourses: courses.length,
    totalCategories: categories.length,
    dbMode: isPostgresConnected ? 'PostgreSQL' : 'Active Local Store'
  };
}
