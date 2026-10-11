import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustFeatures } from './components/TrustFeatures';
import { CategorySection } from './components/CategorySection';
import { CourseSection } from './components/CourseSection';
import { MentorMarketplace } from './components/MentorMarketplace';
import { SkillMarketplace } from './components/SkillMarketplace';
import { LiveClassRoom } from './components/LiveClassRoom';
import { AiMentorAssistant } from './components/AiMentorAssistant';
import { DashboardView } from './components/DashboardView';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SellSkillModal } from './components/SellSkillModal';
import { WalletModal } from './components/WalletModal';
import { SearchFilterModal } from './components/SearchFilterModal';
import { RegistrationModal } from './components/RegistrationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';

import { COURSES, MENTORS, SKILL_GIGS } from './data/mockData';
import { Mentor, Course, SkillGig, LiveSession, UserState, CartItem, Order } from './types';
import { Language, translations } from './i18n/translations';
import { getCoursesApi } from './services/api';
import { Users, Search, ShoppingBag, X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Language & Theme State with LocalStorage persistence
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('ustoz_lang') as Language) || 'uz';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ustoz_theme') as 'light' | 'dark') || 'light';
  });

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ustoz_theme', theme);
  }, [theme]);

  // Sync language with LocalStorage
  useEffect(() => {
    localStorage.setItem('ustoz_lang', lang);
  }, [lang]);

  // Dynamic Courses state synced with Backend / localStorage
  const [courses, setCourses] = useState<Course[]>(COURSES);

  useEffect(() => {
    getCoursesApi().then((data) => {
      if (data && data.length > 0) {
        setCourses(data);
      }
    });
  }, []);

  // Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ustoz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ustoz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Gigs state (allows adding new skills)
  const [gigs, setGigs] = useState<SkillGig[]>(SKILL_GIGS);

  // User State with LocalStorage persistence
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem('ustoz_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: 'Jasur Aliyev',
      email: 'jasur.developer@gmail.com',
      phone: '+998 90 123-45-67',
      role: 'student',
      balance: 450000,
      savedItemIds: ['course-1', 'course-2'],
      bookings: [
        {
          id: 'book-1',
          type: 'mentor_session',
          title: 'Azizbek Rahmonov bilan Frontend Mentorlik',
          providerName: 'Azizbek Rahmonov',
          date: '10-Oktabr',
          time: '19:00 - 20:00',
          amount: 150000,
          status: 'tasdiqlangan',
          meetLink: 'https://meet.ustozpro.uz/room-azizbek-frontend',
        },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('ustoz_user', JSON.stringify(userState));
  }, [userState]);

  // Modal States
  const [bookingItem, setBookingItem] = useState<{
    item: Mentor | Course | SkillGig | LiveSession | null;
    type: 'mentor' | 'course' | 'gig' | 'live';
  }>({ item: null, type: 'mentor' });

  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (course: Course) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.courseId === course.id);
      if (existing) {
        return prev.map((item) =>
          item.courseId === course.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${course.id}`,
        courseId: course.id,
        title: course.title,
        price: course.price,
        originalPrice: course.originalPrice,
        thumbnail: course.thumbnail,
        categoryName: course.categoryName,
        instructor: course.instructor,
        quantity: 1,
      };
      return [newItem, ...prev];
    });
    showToast(`"${course.title.substring(0, 20)}..." savatga qo'shildi! 🛒`);
  };

  const handleUpdateCartQuantity = (courseId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(courseId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.courseId === courseId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (courseId: string) => {
    setCartItems((prev) => prev.filter((item) => item.courseId !== courseId));
    showToast("Mahsulot savatdan o'chirildi");
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast("Savat tozalandi");
  };

  const handleCheckoutSuccess = (order: Order) => {
    setCartItems([]);
    if (order.paymentMethod === 'wallet') {
      setUserState((prev) => ({
        ...prev,
        balance: Math.max(0, prev.balance - order.totalAmount),
      }));
    }
    showToast("Buyurtmangiz muvaffaqiyatli qabul qilindi! 🎉");
  };

  // Global Ctrl+K / Cmd+K search hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter courses by category and search query
  const q = searchQuery.toLowerCase().trim();
  const tr = translations[lang];
  const displayedCourses = courses.filter((c) => {
    if (selectedCategory && c.category !== selectedCategory) return false;
    if (q) {
      const translatedTitle = tr.courses.courseTitles[c.id] || c.title;
      const translatedCategory = tr.courses.categoryBadges[c.category] || c.categoryName;
      const matchTitle = c.title.toLowerCase().includes(q) || translatedTitle.toLowerCase().includes(q);
      const matchInstructor = c.instructor.toLowerCase().includes(q);
      const matchCategory = c.categoryName.toLowerCase().includes(q) || translatedCategory.toLowerCase().includes(q);
      if (!matchTitle && !matchInstructor && !matchCategory) return false;
    }
    return true;
  });

  const searchTokens = q.split(/\s+/).filter((t) => t.length > 1);
  const matchSearchText = (text?: string) => {
    if (!text) return false;
    const t = text.toLowerCase();
    if (t.includes(q)) return true;
    return searchTokens.some((tok) => tok.length > 2 && t.includes(tok));
  };

  const searchResultsMentors = q
    ? MENTORS.filter(
        (m) =>
          matchSearchText(m.name) ||
          matchSearchText(m.title) ||
          matchSearchText(m.bio) ||
          matchSearchText(m.category) ||
          m.skills.some((s) => matchSearchText(s))
      )
    : [];

  const searchResultsGigs = q
    ? gigs.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.sellerName.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      )
    : [];

  // Handlers
  const handleToggleSaveCourse = (id: string) => {
    setUserState((prev) => {
      const isSaved = prev.savedItemIds.includes(id);
      const newSaved = isSaved
        ? prev.savedItemIds.filter((item) => item !== id)
        : [...prev.savedItemIds, id];
      showToast(isSaved ? "Kurs saqlanganlardan o'chirildi" : "Kurs saqlab qo'yildi ⭐");
      return { ...prev, savedItemIds: newSaved };
    });
  };

  const handleBookingSuccess = (newBooking: any) => {
    setUserState((prev) => ({
      ...prev,
      balance: prev.balance - newBooking.amount,
      bookings: [newBooking, ...prev.bookings],
    }));
    showToast("Muvaffaqiyatli buyurtma qilindi va hisobdan yechildi! 🎉");
  };

  const handleTopUpBalance = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    showToast(`${amount.toLocaleString()} so'm muvaffaqiyatli to'ldirildi! 💳`);
  };

  const handleAddNewGig = (newGig: SkillGig) => {
    setGigs((prev) => [newGig, ...prev]);
    showToast("Mahoratingiz bozorda muvaffaqiyatli e'lon qilindi! 🚀");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-emerald-500/40 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header matching mockup with Language & Theme toggles next to Register */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        balance={userState.balance}
        onOpenWallet={() => setIsWalletModalOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenDashboard={() => setActiveTab('dashboard')}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        userRole={userState.role}
        setUserRole={(role) => setUserState((prev) => ({ ...prev, role }))}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {/* TAB 1: BOSH SAHIFA (HOME) */}
        {activeTab === 'home' && (
          <div className="w-full">
            {/* 1. 100% Width 4K Pure Vector Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                const el = document.getElementById('courses-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreMentors={() => setActiveTab('mentors')}
              onStartAiConsultant={() => setActiveTab('ai')}
              onSelectMentor={(mentor) => setBookingItem({ item: mentor, type: 'mentor' })}
              onSelectCourse={(course) => setBookingItem({ item: course, type: 'course' })}
              onSelectGig={(gig) => setBookingItem({ item: gig, type: 'gig' })}
              lang={lang}
            />

            {/* LIVE SEARCH RESULTS BANNER (When user searches) */}
            {searchQuery && (
              <div id="search-results-section" className="py-8 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800 animate-fadeIn">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                          "{searchQuery}" {translations[lang].searchResults.forQuery}
                        </h2>
                        <span className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
                          {translations[lang].searchResults.totalResults}: {searchResultsMentors.length + displayedCourses.length + searchResultsGigs.length}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-rose-700 dark:text-rose-400 bg-white dark:bg-slate-900 hover:bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-800 shadow-2xs transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{translations[lang].searchResults.clearFilter}</span>
                    </button>
                  </div>

                  {/* Matching Mentors Grid */}
                  {searchResultsMentors.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{translations[lang].searchResults.matchingMentors} ({searchResultsMentors.length})</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResultsMentors.map((m) => (
                          <div key={m.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                            <div className="flex items-center space-x-3 min-w-0">
                              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl object-cover" />
                              <div className="min-w-0">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{m.name}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{m.title}</p>
                                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">{m.hourlyRate.toLocaleString()} {translations[lang].searchResults.perHour}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setBookingItem({ item: m, type: 'mentor' })}
                              className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-700"
                            >
                              {translations[lang].searchResults.bookBtn}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Skill Gigs */}
                  {searchResultsGigs.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>{translations[lang].searchResults.matchingGigs} ({searchResultsGigs.length})</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResultsGigs.map((g) => (
                          <div key={g.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                            <div className="flex items-center space-x-3 min-w-0">
                              <img src={g.thumbnail} alt={g.title} className="w-12 h-12 rounded-xl object-cover" />
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">{g.title}</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{g.sellerName} • {g.deliveryTime}</p>
                                <span className="text-xs font-black text-amber-700 dark:text-amber-400">{g.price.toLocaleString()} {translations[lang].courses.currency}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setBookingItem({ item: g, type: 'gig' })}
                              className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-600"
                            >
                              {translations[lang].searchResults.buyBtn}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Trust Badges / 4-Feature layout from mockup */}
            <TrustFeatures lang={lang} />

            {/* 3. Mashhur Yo'nalishlar (Category grid matching mockup) */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              onViewAll={() => setActiveTab('courses')}
              lang={lang}
            />

            {/* 4. Tavsiya etilgan kurslar (Course cards matching mockup) */}
            <div id="courses-section">
              <CourseSection
                courses={displayedCourses}
                savedIds={userState.savedItemIds}
                onToggleSave={handleToggleSaveCourse}
                onEnroll={(course) => setBookingItem({ item: course, type: 'course' })}
                onAddToCart={handleAddToCart}
                onViewAll={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setActiveTab('courses');
                }}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* TAB 2: USTOZLAR (MENTOR MARKETPLACE) */}
        {activeTab === 'mentors' && (
          <MentorMarketplace
            onBookMentor={(mentor) => setBookingItem({ item: mentor, type: 'mentor' })}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {/* TAB 3: KURSLAR (COURSES) */}
        {activeTab === 'courses' && (
          <div className="py-10 max-w-7xl mx-auto px-4">
            <CourseSection
              courses={displayedCourses}
              savedIds={userState.savedItemIds}
              onToggleSave={handleToggleSaveCourse}
              onEnroll={(course) => setBookingItem({ item: course, type: 'course' })}
              onAddToCart={handleAddToCart}
              onViewAll={() => {}}
              lang={lang}
            />
          </div>
        )}

        {/* TAB 4: MAHORAT BOZORI (SKILL MARKETPLACE) */}
        {activeTab === 'gigs' && (
          <SkillMarketplace
            gigs={gigs}
            onOrderGig={(gig: SkillGig) => setBookingItem({ item: gig, type: 'gig' })}
            onOpenSellModal={() => setIsSellModalOpen(true)}
          />
        )}

        {/* TAB 5: LIVE DARSLAR (VIRTUAL CLASSROOM) */}
        {activeTab === 'live' && (
          <LiveClassRoom
            onJoinSession={(session: LiveSession) => setBookingItem({ item: session, type: 'live' })}
          />
        )}

        {/* TAB 6: AI USTOZ (AI MENTOR ASSISTANT) */}
        {activeTab === 'ai' && (
          <AiMentorAssistant
            onSelectMentor={(mentor) => setBookingItem({ item: mentor, type: 'mentor' })}
            onSelectCourse={(course) => setBookingItem({ item: course, type: 'course' })}
          />
        )}

        {/* TAB 7: DASHBOARD (SHAXSIY KABINET) */}
        {activeTab === 'dashboard' && (
          <DashboardView
            userState={userState}
            onOpenWallet={() => setIsWalletModalOpen(true)}
            onOpenLive={() => setActiveTab('live')}
          />
        )}
      </main>

      {/* Footer matching mockup */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('courses');
        }}
        onNavigateTab={(tab) => setActiveTab(tab)}
        lang={lang}
      />

      {/* MODAL 1: Booking & Payment Modal */}
      {bookingItem.item && (
        <BookingModal
          item={bookingItem.item}
          itemType={bookingItem.type}
          userBalance={userState.balance}
          onClose={() => setBookingItem({ item: null, type: 'mentor' })}
          onSuccess={handleBookingSuccess}
          lang={lang}
        />
      )}

      {/* MODAL 2: Sell Skill Modal */}
      <SellSkillModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddGig={handleAddNewGig}
      />

      {/* MODAL 3: Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        balance={userState.balance}
        onTopUp={handleTopUpBalance}
      />

      {/* MODAL 4: Global Search Modal */}
      <SearchFilterModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectMentor={(mentor) => setBookingItem({ item: mentor, type: 'mentor' })}
        onSelectCourse={(course) => setBookingItem({ item: course, type: 'course' })}
        onSelectGig={(gig) => setBookingItem({ item: gig, type: 'gig' })}
        lang={lang}
      />

      {/* MODAL 5: Registration Modal with Student & Backpack Opening Animation */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={(newUser) => {
          setUserState((prev) => ({
            ...prev,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          }));
          showToast(
            translations[lang].registerModal.successTitle +
              ' ' +
              translations[lang].registerModal.successDesc
          );
        }}
        t={translations[lang].registerModal}
        onSwitchToLogin={() => setActiveTab('dashboard')}
      />

      {/* MODAL 6: Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        lang={lang}
      />

      {/* MODAL 7: Checkout & Order Placement */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        userBalance={userState.balance}
        onOrderSuccess={handleCheckoutSuccess}
        lang={lang}
      />

      {/* MODAL 8: Fullstack Admin Panel */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
          lang={lang}
          onRefreshData={() => {
            getCoursesApi().then((data) => {
              if (data && data.length > 0) setCourses(data);
            });
          }}
        />
      )}

    </div>
  );
}

export default App;
