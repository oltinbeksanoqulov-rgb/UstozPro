import { Course, Order, AdminStats, Category } from '../types';
import { COURSES } from '../data/mockData';

const API_BASE = '/api';

// Helper for safe fetch with JSON fallback
async function fetchWithFallback<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`[API] ${url} ga so'rov yuborishda ogohlantirish:`, (err as Error).message);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

// 1. COURSES / PRODUCTS API
export async function getCoursesApi(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // silently fallback
  }
  // Return local storage or default COURSES
  const cached = localStorage.getItem('ustoz_courses');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return COURSES;
}

export async function createCourseApi(course: Partial<Course>): Promise<Course> {
  try {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }
  // Local fallback
  const newCourse = {
    ...course,
    id: course.id || `course-${Date.now()}`,
    rating: course.rating || 5.0,
    reviewsCount: course.reviewsCount || 1,
    highlights: course.highlights || ['Amaliy mashg\'ulot', 'Sertifikat'],
  } as Course;

  return newCourse;
}

export async function updateCourseApi(id: string, updates: Partial<Course>): Promise<Course | null> {
  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }
  return null;
}

export async function deleteCourseApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) return true;
  } catch {
    // fallback
  }
  return true;
}

// 2. ORDERS API
export async function getOrdersApi(): Promise<Order[]> {
  const cachedOrders = localStorage.getItem('ustoz_orders');
  const localList: Order[] = cachedOrders ? JSON.parse(cachedOrders) : [];

  try {
    const res = await fetch(`${API_BASE}/orders`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        // Merge with localList if needed
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  return localList.length > 0 ? localList : [
    {
      id: 'ORD-1001',
      customerName: 'Alisher Usmonov',
      customerPhone: '+998 90 555-12-34',
      customerEmail: 'alisher@example.com',
      totalAmount: 199000,
      paymentMethod: 'click',
      status: 'tasdiqlangan',
      notes: 'Dars materiallarini telegramga yuboring',
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'item-1',
          courseId: 'course-1',
          title: 'Fullstack JavaScript: Node.js, Express & React',
          price: 199000,
          quantity: 1,
          thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
          categoryName: 'Dasturlash',
          instructor: 'Sardorbek Islomov'
        }
      ]
    }
  ];
}

export async function createOrderApi(orderData: Partial<Order>): Promise<Order> {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (res.ok) {
      const json = await res.json();
      // Also cache in localStorage
      const prev = JSON.parse(localStorage.getItem('ustoz_orders') || '[]');
      localStorage.setItem('ustoz_orders', JSON.stringify([json.data, ...prev]));
      return json.data;
    }
  } catch {
    // fallback
  }

  const newOrder: Order = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: orderData.customerName || 'Mijoz',
    customerPhone: orderData.customerPhone || '',
    customerEmail: orderData.customerEmail,
    items: orderData.items || [],
    totalAmount: orderData.totalAmount || 0,
    paymentMethod: orderData.paymentMethod || 'click',
    status: 'kutilmoqda',
    notes: orderData.notes,
    createdAt: new Date().toISOString()
  };

  const prev = JSON.parse(localStorage.getItem('ustoz_orders') || '[]');
  localStorage.setItem('ustoz_orders', JSON.stringify([newOrder, ...prev]));
  return newOrder;
}

export async function updateOrderStatusApi(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) return true;
  } catch {
    // fallback
  }

  const prev: Order[] = JSON.parse(localStorage.getItem('ustoz_orders') || '[]');
  const updated = prev.map(o => o.id === id ? { ...o, status: status as any } : o);
  localStorage.setItem('ustoz_orders', JSON.stringify(updated));
  return true;
}

// 3. STATS API
export async function getStatsApi(): Promise<AdminStats> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  const orders: Order[] = JSON.parse(localStorage.getItem('ustoz_orders') || '[]');
  const courses: Course[] = JSON.parse(localStorage.getItem('ustoz_courses') || '[]') || COURSES;

  const totalRevenue = orders
    .filter(o => o.status === 'tasdiqlangan' || o.status === 'yetkazildi')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'kutilmoqda').length,
    completedOrders: orders.filter(o => o.status === 'tasdiqlangan' || o.status === 'yetkazildi').length,
    totalCourses: courses.length || 15,
    totalCategories: 10,
    dbMode: 'Local / Hybrid'
  };
}
