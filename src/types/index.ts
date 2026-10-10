export type CategoryId = 
  | 'programming'
  | 'english'
  | 'math'
  | 'business'
  | 'growth'
  | 'art'
  | 'music'
  | 'sport'
  | 'ai'
  | 'design'
  | 'illustration'
  | 'public_speaking'
  | 'robotics'
  | 'sewing'
  | 'pottery'
  | 'woodworking'
  | 'cooking'
  | 'instruments'
  | 'mechanics';

export interface Category {
  id: CategoryId;
  name: string;
  courseCount: number;
  icon: string;
  color: string;
  badgeBg: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  category: CategoryId;
  avatar: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number; // so'm
  experienceYears: number;
  studentsCount: number;
  bio: string;
  skills: string[];
  isVerified: boolean;
  isOnline: boolean;
  languages: string[];
  education: string;
  availableDays: string[];
  slots: string[];
}

export interface Course {
  id: string;
  title: string;
  category: CategoryId;
  categoryName: string;
  categoryColor: string;
  instructor: string;
  instructorAvatar: string;
  instructorRole?: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  level: 'Boshlang\'ich' | 'O\'rta' | 'Mukammal' | 'Barcha darajalar';
  duration: string;
  lessonsCount: number;
  enrolledCount: number;
  description: string;
  highlights: string[];
  isSaved?: boolean;
}

export interface SkillGig {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRole: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  rating: number;
  reviewsCount: number;
  deliveryTime: string; // masalan: "1 kun", "2 soat"
  thumbnail: string;
  description: string;
  features: string[];
  ordersCompleted: number;
}

export interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  instructorRole: string;
  category: CategoryId;
  categoryName: string;
  startTime: string;
  date: string;
  isLive: boolean;
  viewersCount: number;
  price: number;
  isFree?: boolean;
  maxSeats: number;
  registeredCount: number;
  description: string;
}

export interface UserBooking {
  id: string;
  type: 'mentor_session' | 'course' | 'gig' | 'live_class';
  title: string;
  providerName: string;
  date: string;
  time?: string;
  amount: number;
  status: 'tasdiqlangan' | 'kutilmoqda' | 'yakunlangan';
  meetLink?: string;
}

export interface UserState {
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'mentor' | 'admin';
  balance: number;
  savedItemIds: string[];
  bookings: UserBooking[];
}

export interface CartItem {
  id: string;
  courseId: string;
  title: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  categoryName: string;
  instructor: string;
  quantity: number;
}

export type OrderStatus = 'kutilmoqda' | 'tasdiqlangan' | 'yetkazildi' | 'bekor_qilindi';
export type PaymentMethod = 'click' | 'payme' | 'wallet' | 'cash';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalCourses: number;
  totalCategories: number;
  dbMode?: string;
}
