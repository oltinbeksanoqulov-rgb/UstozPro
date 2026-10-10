import React from 'react';
import { Send } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import logoImg from '../assets/logo.png';

interface FooterProps {
  onSelectCategory?: (cat: string) => void;
  onNavigateTab?: (tab: string) => void;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang = 'uz' }) => {
  const t = translations[lang].footer;

  return (
    <footer id="footer-section" className="w-full bg-[#102719] text-white py-6 border-t border-emerald-900/60 select-none">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EXACT FOOTER STRIP MATCHING MOCKUP IMAGE */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* 1. Left: Modern Brand Logo + UstozPro (Mahorat savdosi) */}
          <div className="flex items-center space-x-2.5">
            <img 
              src={logoImg} 
              alt="UstozPro Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm flex-shrink-0" 
            />
            <div className="text-left leading-none">
              <span className="font-bold text-base text-white tracking-tight">
                UstozPro
              </span>
              <span className="text-xs text-emerald-200/70 ml-1.5 font-normal">
                {translations[lang].navbar.brandSubtitle}
              </span>
            </div>
          </div>

          {/* 2. Center: Slogan in Italic Script */}
          <div className="text-center">
            <p className="text-sm italic font-serif text-emerald-100 tracking-wide">
              "{t.quote}"
            </p>
          </div>

          {/* 3. Right: Social media round icons */}
          <div className="flex items-center space-x-3 text-white">
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-emerald-600 transition flex items-center justify-center text-white"
              title="Telegram"
            >
              <Send className="w-3.5 h-3.5" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-pink-600 transition flex items-center justify-center text-white"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-600 transition flex items-center justify-center text-white"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Web / Globe */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-emerald-600 transition flex items-center justify-center text-white"
              title="Tepaga qaytish"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
