import React, { useState, useEffect } from 'react';
import {
  Package,
  Layers,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Database,
  ExternalLink,
  Shield,
  RefreshCw,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import { Course, Order, OrderStatus, AdminStats, Category } from '../types';
import { Language, translations } from '../i18n/translations';
import {
  getOrdersApi,
  updateOrderStatusApi,
  getCoursesApi,
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
  getStatsApi,
} from '../services/api';

interface AdminPanelProps {
  onClose: () => void;
  lang: Language;
  onRefreshData?: () => void;
}

export function AdminPanel({ onClose, lang, onRefreshData }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'courses' | 'categories' | 'stats'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [courseSearch, setCourseSearch] = useState('');

  // Selected order for detailed modal view
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Modal for adding / editing course
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // Categories list
  const [categories, setCategories] = useState([
    { id: 'programming', name: 'Dasturlash va IT', icon: 'Code2', color: 'bg-emerald-600', count: 32 },
    { id: 'english', name: 'Xorijiy tillar (IELTS / CEFR)', icon: 'Languages', color: 'bg-blue-600', count: 28 },
    { id: 'design', name: 'Grafik dizayn va 3D', icon: 'Palette', color: 'bg-purple-600', count: 19 },
    { id: 'business', name: 'Biznes va Marketing', icon: 'TrendingUp', color: 'bg-amber-600', count: 24 },
    { id: 'math', name: 'Aniq fanlar va Matematika', icon: 'Calculator', color: 'bg-teal-600', count: 15 },
    { id: 'cooking', name: 'Pazandalik va Taomlar', icon: 'UtensilsCrossed', color: 'bg-orange-600', count: 16 },
    { id: 'mechanics', name: 'Mexanika va Avtoservis', icon: 'Wrench', color: 'bg-slate-700', count: 10 },
  ]);
  const [newCatName, setNewCatName] = useState('');

  const t = translations[lang];

  // Load Admin Data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedOrders, fetchedCourses, fetchedStats] = await Promise.all([
        getOrdersApi(),
        getCoursesApi(),
        getStatsApi(),
      ]);
      setOrders(fetchedOrders);
      setCourses(fetchedCourses);
      setStats(fetchedStats);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update order status handler
  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatusApi(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Delete course handler
  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Haqiqatan ham bu kursni o‘chirmoqchimisiz?')) {
      await deleteCourseApi(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      if (onRefreshData) onRefreshData();
    }
  };

  // Save course (create or update)
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title || !editingCourse.price) return;

    if (editingCourse.id && courses.some((c) => c.id === editingCourse.id)) {
      // Update
      await updateCourseApi(editingCourse.id, editingCourse);
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? ({ ...c, ...editingCourse } as Course) : c))
      );
    } else {
      // Create new
      const created = await createCourseApi({
        ...editingCourse,
        thumbnail:
          editingCourse.thumbnail ||
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        instructorAvatar:
          editingCourse.instructorAvatar ||
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      });
      setCourses((prev) => [created, ...prev]);
    }

    setIsCourseModalOpen(false);
    setEditingCourse(null);
    if (onRefreshData) onRefreshData();
  };

  // Add new category handler
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      icon: 'Folder',
      color: 'bg-emerald-600',
      count: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCatName('');
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch) {
      const q = orderSearch.toLowerCase();
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchId) return false;
    }
    return true;
  });

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    if (courseSearch) {
      const q = courseSearch.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex flex-col items-center p-2 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-7xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden my-auto min-h-[85vh]">
        
        {/* Top Navbar */}
        <header className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black tracking-tight">UstozPro Admin Panel</h2>
                <span className="text-[10px] bg-emerald-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white">
                  v2.0 Fullstack
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mahsulotlar, kategoriyalar, buyurtmalar va PostgreSQL integratsiyasi
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <button
              onClick={loadData}
              title="Yangilash"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Yangilash</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 rounded-xl transition text-xs font-bold"
            >
              Paneldan chiqish ✕
            </button>
          </div>
        </header>

        {/* Quick KPI Stat Cards */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Jami tushum</span>
              <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {(stats?.totalRevenue || 0).toLocaleString()} {t.courses.currency}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Buyurtmalar</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {orders.length} ta
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Kutilayotgan</span>
              <h3 className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {orders.filter((o) => o.status === 'kutilmoqda').length} ta
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Mahsulotlar/Kurslar</span>
              <h3 className="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
                {courses.length} ta
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-3 border-b-2 font-bold text-xs sm:text-sm flex items-center space-x-2 transition ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3.5 px-3 border-b-2 font-bold text-xs sm:text-sm flex items-center space-x-2 transition ${
              activeTab === 'courses'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Mahsulotlar / Kurslar ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 px-3 border-b-2 font-bold text-xs sm:text-sm flex items-center space-x-2 transition ${
              activeTab === 'categories'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kategoriyalar ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3.5 px-3 border-b-2 font-bold text-xs sm:text-sm flex items-center space-x-2 transition ${
              activeTab === 'stats'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>PostgreSQL & API Holati</span>
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="p-6 flex-1 flex flex-col space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Mijoz ismi, telefon yoki ID bo'yicha qidirish..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-hidden"
                >
                  <option value="all">Barcha statuslar</option>
                  <option value="kutilmoqda">🟡 Kutilmoqda</option>
                  <option value="tasdiqlangan">🟢 Tasdiqlangan</option>
                  <option value="yetkazildi">🔵 Yetkazilgan</option>
                  <option value="bekor_qilindi">🔴 Bekor qilingan</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase text-[10px] font-black border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Buyurtma ID</th>
                    <th className="py-3 px-4">Mijoz</th>
                    <th className="py-3 px-4">Telefon</th>
                    <th className="py-3 px-4">Mahsulotlar</th>
                    <th className="py-3 px-4">Summa</th>
                    <th className="py-3 px-4">To'lov</th>
                    <th className="py-3 px-4">Holati</th>
                    <th className="py-3 px-4 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        Hech qanday buyurtma topilmadi
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const statusColor =
                        order.status === 'tasdiqlangan'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300'
                          : order.status === 'yetkazildi'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-300'
                          : order.status === 'bekor_qilindi'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-300'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300';

                      return (
                        <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                            #{order.id}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                            {order.customerName}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                            {order.customerPhone}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            <span className="font-bold text-slate-900 dark:text-white">{order.items.length} ta:</span>{' '}
                            {order.items.map((i) => i.title).join(', ').substring(0, 30)}...
                          </td>
                          <td className="py-3 px-4 font-black text-emerald-600 dark:text-emerald-400">
                            {order.totalAmount.toLocaleString()} {t.courses.currency}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold uppercase text-[10px]">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-hidden ${statusColor}`}
                            >
                              <option value="kutilmoqda">🟡 Kutilmoqda</option>
                              <option value="tasdiqlangan">🟢 Tasdiqlangan</option>
                              <option value="yetkazildi">🔵 Yetkazildi</option>
                              <option value="bekor_qilindi">🔴 Bekor qilindi</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setViewingOrder(order)}
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                              title="Batafsil ko'rish"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Courses / Products Management */}
        {activeTab === 'courses' && (
          <div className="p-6 flex-1 flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  placeholder="Kurs yoki o'qituvchi nomi bo'yicha qidirish..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => {
                  setEditingCourse({
                    title: '',
                    category: 'programming',
                    categoryName: 'Dasturlash',
                    instructor: 'Yangi O\'qituvchi',
                    instructorRole: 'Katta Mentor',
                    price: 150000,
                    originalPrice: 250000,
                    level: 'Barcha darajalar',
                    duration: '20 soat',
                    lessonsCount: 24,
                    description: '',
                    highlights: ['Amaliy topshiriqlar', 'Sertifikat'],
                  });
                  setIsCourseModalOpen(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi mahsulot qo'shish</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase text-[10px] font-black border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Rasm & Nomi</th>
                    <th className="py-3 px-4">Kategoriya</th>
                    <th className="py-3 px-4">O'qituvchi</th>
                    <th className="py-3 px-4">Narxi</th>
                    <th className="py-3 px-4">Reyting</th>
                    <th className="py-3 px-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3 min-w-0">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{c.title}</h4>
                            <span className="text-[11px] text-slate-400">{c.duration} • {c.lessonsCount} dars</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {c.categoryName}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                        {c.instructor}
                      </td>
                      <td className="py-3 px-4 font-black text-emerald-600 dark:text-emerald-400">
                        {c.price.toLocaleString()} {t.courses.currency}
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-500">
                        ★ {c.rating} ({c.reviewsCount})
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => {
                              setEditingCourse(c);
                              setIsCourseModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="Tahrirlash"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(c.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="p-6 flex-1 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl">
              <h4 className="font-black text-sm text-slate-900 dark:text-white mb-2">
                Yangi kategoriya qo'shish
              </h4>
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Kategoriya nomi (masalan: Sun'iy intellekt)"
                  className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Qo'shish
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h4>
                      <p className="text-xs text-slate-400">ID: {cat.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCategories((prev) => prev.filter((c) => c.id !== cat.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Database & API Stats */}
        {activeTab === 'stats' && (
          <div className="p-6 flex-1 space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-4">
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    PostgreSQL & Express REST API Arxitekturasi
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    Baza holati: <strong>{stats?.dbMode || 'Aktiv'}</strong> • Server porti: 5000
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">API Endpoints:</h4>
                  <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    <li>GET /api/courses - Kurslar ro'yxati</li>
                    <li>POST /api/courses - Yangi kurs yaratish</li>
                    <li>PUT /api/courses/:id - Kursni tahrirlash</li>
                    <li>DELETE /api/courses/:id - Kursni o'chirish</li>
                    <li>GET /api/orders - Barcha buyurtmalar</li>
                    <li>POST /api/orders - Savatdan buyurtma berish</li>
                    <li>PATCH /api/orders/:id/status - Statusni o'zgartirish</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">PostgreSQL Jadvallari:</h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• <code className="font-bold">categories</code> - toifalar va kurslar soni</li>
                    <li>• <code className="font-bold">courses</code> - narx, o'qituvchi, reyting</li>
                    <li>• <code className="font-bold">orders</code> - buyurtmachi, summa, to'lov turi</li>
                    <li>• <code className="font-bold">order_items</code> - buyurtma ichidagi mahsulotlar</li>
                    <li>• <code className="font-bold">users</code> - o'quvchilar va admin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Buyurtma tafsilotlari #{viewingOrder.id}
              </h3>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Mijoz ismi:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{viewingOrder.customerPhone}</span>
              </div>
              {viewingOrder.customerEmail && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{viewingOrder.customerEmail}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">To'lov turi:</span>
                <span className="font-bold uppercase text-emerald-600">{viewingOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Holati:</span>
                <span className="font-bold">{viewingOrder.status}</span>
              </div>
              {viewingOrder.notes && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 block mb-1">Mijoz izohi:</span>
                  <p className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-slate-700 dark:text-slate-300">
                    {viewingOrder.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Mahsulotlar:</span>
              {viewingOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{item.title}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {item.price.toLocaleString()} so'm
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 dark:border-slate-800 font-black text-sm">
              <span>Jami summa:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base">
                {viewingOrder.totalAmount.toLocaleString()} {t.courses.currency}
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingOrder(null)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Add / Edit Modal */}
      {isCourseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xl w-full border border-slate-200 dark:border-slate-800 space-y-4 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {editingCourse.id ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kurs nomi *
                </label>
                <input
                  type="text"
                  required
                  value={editingCourse.title || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  placeholder="Masalan: Fullstack Web Development"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Narxi (so'm) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingCourse.price || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                    placeholder="180000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Eski narxi (ixtiyoriy)
                  </label>
                  <input
                    type="number"
                    value={editingCourse.originalPrice || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, originalPrice: Number(e.target.value) })}
                    placeholder="280000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={editingCourse.category || 'programming'}
                    onChange={(e) => {
                      const catId = e.target.value;
                      const catName = categories.find((c) => c.id === catId)?.name || 'Boshqa';
                      setEditingCourse({
                        ...editingCourse,
                        category: catId as any,
                        categoryName: catName,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    O'qituvchi ismi
                  </label>
                  <input
                    type="text"
                    value={editingCourse.instructor || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                    placeholder="Anvar Qodirov"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rasm havolasi (URL)
                </label>
                <input
                  type="text"
                  value={editingCourse.thumbnail || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kurs haqida qisqacha tavsif
                </label>
                <textarea
                  rows={3}
                  value={editingCourse.description || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  placeholder="Kursda nimalar o'rgatilishi haqida ma'lumot..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
