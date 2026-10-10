import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles,
  Radio,
  ShoppingBag,
  Bot,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Check,
  Shield
} from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
  onOpenWallet: () => void;
  onOpenSellModal: () => void;
  onOpenSearch: () => void;
  onOpenDashboard: () => void;
  onOpenRegister: () => void;
  userRole: 'student' | 'mentor' | 'admin';
  setUserRole: (role: 'student' | 'mentor' | 'admin') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenDashboard,
  onOpenRegister,
  lang,
  setLang,
  theme,
  setTheme,
  cartCount = 0,
  onOpenCart,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = translations[lang].navbar;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const mainNavLinks = [
    { id: 'home', label: t.home },
    { id: 'mentors', label: t.mentors },
    { id: 'courses', label: t.courses },
    { id: 'categories', label: t.categories },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'categories') {
      setActiveTab('home');
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'about') {
      setActiveTab('home');
      setTimeout(() => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'contact') {
      setActiveTab('home');
      setTimeout(() => {
        document.getElementById('footer-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 shadow-2xs w-full select-none transition-colors duration-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. EXACT LOGO FROM MOCKUP IMAGE: Ustoz Bozori (Mahorat savdosi) */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
          >
            {/* New Brand Logo: 3D Graduation Cap with Play/Leaf Box */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
              <img 
                src={logoImg} 
                alt="UstozPro Logo" 
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
              />
            </div>

            <div className="flex flex-col text-left">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                {t.brandTitle}
              </h1>
              <span className="hidden sm:block text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 tracking-wide">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {/* 2. NAVIGATION MENU LINKS */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {mainNavLinks.map((link) => {
              const isActive = (link.id === 'home' && activeTab === 'home') || activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 transition-colors duration-150 ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Startap Feature Badges */}
            <button
              onClick={() => setActiveTab('gigs')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'gigs' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ShoppingBag className="w-3 h-3 text-amber-600" />
              <span>{t.badgeSkills}</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'live' ? 'bg-red-100 dark:bg-red-950/60 text-red-900 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Radio className="w-3 h-3 text-red-600" />
              <span>{t.badgeLive}</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'ai' ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-900 dark:text-violet-300' : 'bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bot className="w-3 h-3 text-violet-600" />
              <span>AI</span>
            </button>
          </nav>

          {/* 3. RIGHT CONTROLS: Cart | Admin | Search | Language Selector | Theme Toggle | Kirish | Ro'yxatdan o'tish */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {/* SAVAT (CART) BUTTON */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition flex items-center justify-center"
              title="Savat"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ADMIN PANEL BUTTON */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-xs font-black transition flex items-center space-x-1.5 shadow-2xs"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Admin</span>
            </button>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Vertical Divider */}
            <span className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 inline-block" />

            {/* LANGUAGE SELECTOR DROPDOWN (Uzbek, Russian, English) */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
                title={t.language}
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-left animate-fadeIn">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-slate-700 transition ${
                        lang === item.code 
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-slate-700/50 font-bold' 
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{item.flag}</span>
                        <span>{item.name}</span>
                      </div>
                      {lang === item.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LIGHT / DARK MODE TOGGLE (Placed next to Register) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-750 transition"
              title={theme === 'light' ? t.darkMode : t.lightMode}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700 hover:text-indigo-600 transition" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow transition" />
              )}
            </button>

            {/* Kirish Button */}
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold transition shadow-2xs"
            >
              {t.login}
            </button>

            {/* Ro'yxatdan o'tish Animated Button (Opens Backpack Animation Modal) */}
            <button
              onClick={onOpenRegister}
              className="group relative bg-[#00875a] hover:bg-[#00704a] active:scale-95 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center space-x-2 shadow-md hover:shadow-lg overflow-hidden"
            >
              {/* Backpack / Sparkle Animated Icon */}
              <span className="relative flex items-center justify-center">
                <span className="text-base group-hover:scale-125 transition-transform duration-200">🎒</span>
              </span>
              <span>{t.register}</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            </button>
          </div>

          {/* Mobile Right Controls: Cart + Lang + Theme + Register + Hamburger Menu */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Quick Cart on mobile */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              title="Savat"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Lang Switcher on mobile */}
            <button
              onClick={() => {
                const nextLang = lang === 'uz' ? 'ru' : lang === 'ru' ? 'en' : 'uz';
                setLang(nextLang);
              }}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              {currentLangObj.flag}
            </button>

            {/* Quick Theme Toggle on mobile */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Register icon button on mobile */}
            <button
              onClick={onOpenRegister}
              className="bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1"
            >
              <span>🎒</span>
              <span className="hidden sm:inline">{t.register}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-4 pb-6 space-y-4 shadow-xl text-left animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {mainNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setActiveTab('gigs'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-left font-bold"
            >
              🛍️ {t.badgeSkills}
            </button>
            <button
              onClick={() => { setActiveTab('live'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 text-left font-bold"
            >
              🔴 {t.badgeLive}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCart) onOpenCart();
              }}
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-left font-bold flex items-center justify-between"
            >
              <span>🛒 Savat</span>
              {cartCount > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 text-left font-bold flex items-center gap-1.5 border border-purple-200 dark:border-purple-800"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Language and Theme Options */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tilni tanlang:</span>
            <div className="flex space-x-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    lang === l.code ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onOpenDashboard();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200 text-center"
            >
              {t.login}
            </button>
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#00875a] text-white font-bold text-xs text-center flex items-center justify-center space-x-1"
            >
              <span>🎒</span>
              <span>{t.register}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
