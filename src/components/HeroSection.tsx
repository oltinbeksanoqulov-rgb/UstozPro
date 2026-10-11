import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X
} from 'lucide-react';
import { MENTORS, COURSES } from '../data/mockData';
import { Mentor, Course, SkillGig } from '../types';
import { Language, translations } from '../i18n/translations';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory?: (catId: string) => void;
  onExploreMentors?: () => void;
  onStartAiConsultant?: () => void;
  onSelectMentor: (mentor: Mentor) => void;
  onSelectCourse: (course: Course) => void;
  onSelectGig?: (gig: SkillGig) => void;
  lang?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectMentor,
  onSelectCourse,
  onStartAiConsultant,
  lang = 'uz',
}) => {
  const t = translations[lang].hero;
  const [inputValue, setInputValue] = useState(searchQuery || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const q = (inputValue || '').toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  const matchesText = (text?: string) => {
    if (!text) return false;
    const t = text.toLowerCase();
    if (t.includes(q)) return true;
    return tokens.some((tok) => tok.length > 2 && t.includes(tok));
  };

  const matchingMentors = q
    ? MENTORS.filter(
        (m) =>
          matchesText(m.name) ||
          matchesText(m.title) ||
          matchesText(m.bio) ||
          matchesText(m.category) ||
          m.skills.some((s) => matchesText(s))
      )
    : [];

  const matchingCourses = q
    ? COURSES.filter(
        (c) =>
          matchesText(c.title) ||
          matchesText(c.instructor) ||
          matchesText(c.categoryName) ||
          matchesText(c.description)
      )
    : [];

  const handleExecuteSearch = (term?: string) => {
    const finalVal = term !== undefined ? term : inputValue;
    setSearchQuery(finalVal);
    setIsDropdownOpen(false);

    setTimeout(() => {
      const el = document.getElementById('courses-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch();
  };

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full relative select-none overflow-hidden bg-[#102719]"
      style={{ backgroundColor: '#102719' }}
    >
      {/* ============================================================== */}
      {/* 4K ULTRA-HD VECTOR ATMOSPHERIC BACKGROUND IN PURE #102719      */}
      {/* ============================================================== */}
      
      {/* 1. Pure #102719 Room Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#102719',
        }}
      />



      {/* Bookshelf subtle silhouette in background */}
      <div className="absolute top-0 right-0 w-[55%] h-[65%] opacity-[0.09] pointer-events-none hidden md:block">
        <svg viewBox="0 0 500 300" className="w-full h-full" fill="currentColor">
          <rect x="20" y="25" width="8" height="250" />
          <rect x="150" y="25" width="8" height="250" />
          <rect x="280" y="25" width="8" height="250" />
          <rect x="410" y="25" width="8" height="250" />
          <rect x="20" y="95" width="400" height="7" />
          <rect x="20" y="175" width="400" height="7" />
          <rect x="20" y="255" width="400" height="7" />
          <rect x="35" y="42" width="18" height="53" />
          <rect x="56" y="47" width="16" height="48" />
          <rect x="75" y="37" width="22" height="58" />
          <rect x="100" y="45" width="15" height="50" />
          <rect x="165" y="122" width="20" height="53" />
          <rect x="188" y="127" width="16" height="48" />
          <rect x="207" y="117" width="24" height="58" />
          <rect x="295" y="202" width="18" height="53" />
          <rect x="316" y="207" width="22" height="48" />
          <rect x="341" y="197" width="20" height="58" />
        </svg>
      </div>

      {/* Tropical Broad Leaf silhouette framing top-right edge */}
      <div className="absolute top-0 right-0 w-44 sm:w-56 h-64 opacity-35 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
          <path d="M200 10 C150 40 120 100 130 160 C135 190 160 220 200 240" stroke="#10b981" strokeWidth="2.5" />
          <path d="M160 50 C110 55 80 85 90 120 C100 150 140 140 165 115" fill="#047857" opacity="0.65" />
          <path d="M180 110 C130 130 115 165 130 195 C145 225 175 205 190 175" fill="#059669" opacity="0.55" />
          <path d="M190 25 C160 20 140 35 145 60 C150 85 175 75 190 55" fill="#10b981" opacity="0.75" />
        </svg>
      </div>

      {/* TOP-RIGHT PILL BADGE: UstozPro AI Live Ekotizimi */}
      <button 
        type="button"
        onClick={onStartAiConsultant}
        className="absolute top-4 sm:top-5 right-4 sm:right-6 md:right-8 z-30 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 text-[11px] font-semibold text-emerald-300 shadow-xl cursor-pointer transition transform hover:scale-105 active:scale-95"
        title="AI Ustoz & Navigatorga o'tish"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="tracking-wide">{t.aiEcosystem}</span>
      </button>



      {/* ============================================================== */}
      {/* MAIN 4K VECTOR HERO CONTENT CONTAINER (100% RESPONSIVE)         */}
      {/* ============================================================== */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* ========================================================== */}
          {/* LEFT COLUMN: CRISP 4K TEXT & INTERACTIVE SEARCH PILL       */}
          {/* ========================================================== */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            {/* Badge: — Bilim — eng katta boylik! */}
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-white drop-shadow-sm">
              <span className="w-7 h-[3px] bg-[#34d399] rounded-full inline-block shadow-sm" />
              <span className="tracking-wide">{t.badge}</span>
            </div>

            {/* Main Headline: Ustoz Bozori — mahorat savdosi! */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.12]">
              {t.title1} <br />
              <span className="text-[#4ade80] drop-shadow-[0_2px_12px_rgba(74,222,128,0.3)]">
                {t.title2}
              </span>
            </h1>

            {/* Slogan Subtitle */}
            <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed font-normal">
              {t.subtitle}
            </p>

            {/* Search Pill Form */}
            <div className="relative pt-2 max-w-xl">
              <form onSubmit={handleFormSubmit} className="relative w-full">
                <div className="relative flex items-center bg-white rounded-full p-1.5 sm:p-2 shadow-2xl border border-white/20 focus-within:ring-4 focus-within:ring-emerald-500/30 transition-all">
                  
                  <div className="pl-3.5 pr-2.5 text-slate-400 flex items-center flex-shrink-0">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleExecuteSearch();
                      } else if (e.key === 'Escape') {
                        setIsDropdownOpen(false);
                      }
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs sm:text-sm md:text-base font-semibold focus:outline-none pr-2"
                  />

                  {inputValue && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1 mr-1 text-slate-400 hover:text-slate-700 transition rounded-full flex-shrink-0"
                      title="Tozalash"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="bg-[#00875a] hover:bg-[#00704a] active:scale-95 text-white font-bold px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition duration-150 flex items-center justify-center shadow-md flex-shrink-0"
                  >
                    <span>{t.searchButton}</span>
                  </button>
                </div>
              </form>

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-30 animate-fadeIn max-h-[60vh] overflow-y-auto p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3 text-xs font-bold text-slate-500">
                    <span>{q ? `${matchingMentors.length + matchingCourses.length} ${t.results}` : t.quickSuggestions}</span>
                    <button onClick={() => setIsDropdownOpen(false)} className="hover:text-slate-900">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!q ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">{t.popularFields}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.suggestedTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setInputValue(tag);
                              handleExecuteSearch(tag);
                            }}
                            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold text-slate-700"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matchingMentors.slice(0, 2).map((m) => (
                        <div
                          key={m.id}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onSelectMentor(m);
                          }}
                          className="p-2 rounded-xl hover:bg-emerald-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-emerald-200"
                        >
                          <div className="flex items-center space-x-2.5">
                            <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{m.name}</h4>
                              <p className="text-[10px] text-slate-400">{m.title}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-700">{m.hourlyRate.toLocaleString()} {translations[lang].courses.currency}</span>
                        </div>
                      ))}

                      {matchingCourses.slice(0, 2).map((c) => {
                        const trTitle = translations[lang].courses.courseTitles[c.id] || c.title;
                        return (
                          <div
                            key={c.id}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              onSelectCourse(c);
                            }}
                            className="p-2 rounded-xl hover:bg-blue-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-center space-x-2.5">
                              <img src={c.thumbnail} alt={trTitle} className="w-9 h-7 rounded object-cover" />
                              <div>
                                <h4 className="font-bold text-xs text-slate-900">{trTitle}</h4>
                                <p className="text-[10px] text-slate-400">{c.instructor}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-700">{c.price.toLocaleString()} {translations[lang].courses.currency}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: 4K VECTOR REALISTIC DESK COMPOSITION          */}
          {/* Potted Plant, 5-Book Stack, Laptop, Mug, Notebook, Pen     */}
          {/* ========================================================== */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] pt-4 sm:pt-0">
            
            {/* CONTAINER FOR DESK COMPOSITION WITH BALANCED SPACING */}
            <div className="relative w-full max-w-[650px] flex items-end justify-center">

              {/* Soft floor shadow under desk composition */}
              <div className="absolute bottom-2 sm:bottom-4 left-4 right-4 h-6 bg-black/40 blur-lg rounded-full pointer-events-none" />

              {/* 1. SMALL POTTED PLANT IN WHITE CERAMIC POT (Far Left) */}
              <div className="absolute left-0 sm:left-2 bottom-6 sm:bottom-10 z-10 select-none hidden sm:block drop-shadow-xl">
                <div className="relative w-20 sm:w-24 h-28 sm:h-32 flex flex-col items-center justify-end">
                  {/* Plant Leaves */}
                  <div className="relative w-full h-20 -mb-2">
                    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
                      <path d="M50 75 Q48 40 42 15" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M42 15 C30 10 28 28 42 25 C46 24 45 18 42 15 Z" fill="#22c55e" />
                      <path d="M50 55 C35 48 28 35 45 40 Z" fill="#16a34a" />
                      <path d="M48 60 C60 48 72 40 55 45 Z" fill="#15803d" />
                      <path d="M46 38 C58 25 70 30 52 35 Z" fill="#22c55e" />
                      <path d="M44 46 C30 38 25 50 42 50 Z" fill="#4ade80" />
                    </svg>
                  </div>
                  {/* White Ceramic Ribbed Pot */}
                  <div 
                    className="w-14 sm:w-16 h-12 sm:h-14 rounded-b-xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.35), inset 0 2px 3px rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.7)'
                    }}
                  >
                    <div className="w-full h-2 bg-[#2e180d] rounded-t-sm" />
                    <div className="w-full h-full flex justify-around opacity-20 px-1 pt-1">
                      <div className="w-[1px] h-full bg-slate-400" />
                      <div className="w-[1px] h-full bg-slate-400" />
                      <div className="w-[1px] h-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. STACK OF 5 3D COLORED HARDCOVER BOOKS */}
              <div className="absolute left-12 sm:left-20 bottom-4 sm:bottom-8 z-20 flex flex-col items-center w-36 sm:w-44 select-none drop-shadow-2xl">
                
                {/* Book 1: Navy Blue - Dasturlash / Programming */}
                <div 
                  className="w-full h-7 sm:h-8 rounded-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-between px-3 shadow-md relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #1e40af 0%, #1e3a8a 70%, #172554 100%)',
                    boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #0f172a'
                  }}
                >
                  <span className="tracking-wide truncate">{t.bookProgramming}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300/70" />
                </div>

                {/* Book 2: Royal Blue - Ingliz tili / English */}
                <div 
                  className="w-[102%] h-7 sm:h-8 rounded-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-between px-3 shadow-md relative overflow-hidden -mt-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 70%, #075985 100%)',
                    boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #0c4a6e'
                  }}
                >
                  <span className="tracking-wide truncate">{t.bookEnglish}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300/70" />
                </div>

                {/* Book 3: Emerald Green - Matematika / Mathematics */}
                <div 
                  className="w-[104%] h-7 sm:h-8 rounded-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-between px-3 shadow-md relative overflow-hidden -mt-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #059669 0%, #047857 70%, #065f46 100%)',
                    boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #064e3b'
                  }}
                >
                  <span className="tracking-wide truncate">{t.bookMath}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/70" />
                </div>

                {/* Book 4: Warm Amber / Orange - Biznes / Business */}
                <div 
                  className="w-[103%] h-7 sm:h-8 rounded-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-between px-3 shadow-md relative overflow-hidden -mt-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #d97706 0%, #b45309 70%, #92400e 100%)',
                    boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #78350f'
                  }}
                >
                  <span className="tracking-wide truncate">{t.bookBusiness}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300/70" />
                </div>

                {/* Book 5: Purple - Shaxsiy rivojlanish / Personal Growth */}
                <div className="w-[106%] relative flex items-center -mt-0.5">
                  <div 
                    className="w-3.5 h-7 sm:h-8 rounded-l-xs flex-shrink-0"
                    style={{
                      background: 'linear-gradient(90deg, #fef3c7 0%, #fde68a 100%)',
                      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div 
                    className="flex-1 h-8 sm:h-9 rounded-r-md text-white font-bold text-[10px] sm:text-xs flex items-center justify-between px-2.5 shadow-xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, #7c3aed 0%, #6d28d9 70%, #5b21b6 100%)',
                      boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), 0 4px 8px rgba(0,0,0,0.4)',
                      borderLeft: '4px solid #4c1d95'
                    }}
                  >
                    <span className="tracking-wide truncate">{t.bookGrowth}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-300/70" />
                  </div>
                </div>
              </div>

              {/* 3. REALISTIC 4K VECTOR LAPTOP MOCKUP */}
              <div className="relative z-10 w-[260px] sm:w-[330px] md:w-[380px] ml-28 sm:ml-40 mb-4 sm:mb-8 select-none drop-shadow-2xl">
                
                {/* Laptop Display Lid */}
                <div 
                  className="w-full aspect-[16/10] rounded-t-2xl p-2 sm:p-2.5 relative overflow-hidden border border-slate-700"
                  style={{
                    background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                    boxShadow: '0 -4px 15px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.2)'
                  }}
                >
                  {/* Top Bezel Notch / Webcam Dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto mb-1" />

                  {/* SCREEN PANEL */}
                  <div 
                    className="w-full h-[calc(100%-10px)] rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-2.5 sm:p-3 text-center"
                    style={{
                      background: 'radial-gradient(circle at 50% 35%, #08241a 0%, #04140f 70%, #020a07 100%)',
                      boxShadow: 'inset 0 0 25px rgba(0,0,0,0.85)'
                    }}
                  >
                    {/* Screen Gloss Glare */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-15"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)'
                      }}
                    />

                    {/* Mortarboard Logo on Screen */}
                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 mb-0.5">
                      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md" fill="none">
                        <path d="M24 7L4 17L24 27L44 17L24 7Z" fill="#00A86B" />
                        <path d="M12 21.2V32C12 36 17.4 39 24 39C30.6 39 36 36 36 32V21.2L24 27.2L12 21.2Z" fill="#00875A" />
                        <path d="M7 18.5V30C7 31.5 5 31.5 5 30V17.5L7 18.5Z" fill="#F59E0B" />
                        <circle cx="6" cy="31" r="2" fill="#D97706" />
                      </svg>
                    </div>

                    {/* Logo Title & Subtitle on Screen */}
                    <h3 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight leading-tight">
                      UstozPro
                    </h3>
                    <p className="text-[10px] sm:text-xs text-emerald-300 font-medium leading-none">
                      {t.laptopSub}
                    </p>

                    {/* Handwritten Script Slogan on Laptop */}
                    <div className="mt-2 sm:mt-2.5 flex flex-col items-center">
                      <p className="font-['Caveat'] text-xs sm:text-base md:text-lg text-[#6ee7b7] tracking-wider leading-none">
                        {t.laptopSlogan1}
                      </p>
                      <p className="font-['Caveat'] text-xs sm:text-base md:text-lg text-[#6ee7b7] tracking-wider leading-none">
                        {t.laptopSlogan2}
                      </p>
                      {/* Playful Hand-drawn Smile Underline in green */}
                      <svg viewBox="0 0 80 12" className="w-16 sm:w-20 h-2 mt-0.5" fill="none">
                        <path d="M5 4 Q40 12 75 4" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Laptop Base Keyboard Deck */}
                <div 
                  className="w-[108%] -ml-[4%] h-3.5 sm:h-4.5 rounded-b-xl relative"
                  style={{
                    background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #334155 100%)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.65)'
                  }}
                >
                  <div className="w-12 h-1 rounded-b bg-slate-800 mx-auto" />
                </div>

                {/* Soft reflection on wooden desk */}
                <div 
                  className="w-full h-5 -mt-0.5 opacity-20 pointer-events-none rounded-b-xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
                  }}
                />
              </div>

              {/* 4. CERAMIC COFFEE MUG (4K Vector) */}
              <div className="absolute right-2 sm:right-6 bottom-6 sm:bottom-10 z-20 select-none drop-shadow-xl">
                <div className="relative w-14 h-16 sm:w-18 sm:h-20">
                  {/* Mug Body */}
                  <div 
                    className="w-12 sm:w-14 h-14 sm:h-18 rounded-b-2xl rounded-t-sm relative overflow-hidden flex flex-col items-center justify-center p-1"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%)',
                      boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.8)'
                    }}
                  >
                    <div className="w-full h-1 bg-[#3a1d0d] rounded-full absolute top-0.5 opacity-60" />

                    <div className="scale-75 text-center mt-1">
                      <svg viewBox="0 0 48 48" className="w-5 h-5 mx-auto" fill="none">
                        <path d="M24 7L4 17L24 27L44 17L24 7Z" fill="#00875A" />
                        <path d="M12 21.2V32C12 36 17.4 39 24 39C30.6 39 36 36 36 32V21.2L24 27.2L12 21.2Z" fill="#006644" />
                        <circle cx="6" cy="31" r="2" fill="#D97706" />
                      </svg>
                      <span className="text-[7px] font-bold text-slate-800 block -mt-0.5 leading-tight">
                        UstozPro
                      </span>
                    </div>
                  </div>

                  {/* Mug Handle */}
                  <div 
                    className="absolute right-0 top-3 w-4 h-9 sm:w-5 sm:h-11 rounded-r-xl border-[3px] border-l-0 border-white -mr-2"
                    style={{
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}
                  />
                </div>
              </div>

              {/* 5. OPEN SPIRAL NOTEBOOK & PEN WITH HANDWRITTEN QUOTE */}
              <div className="absolute right-4 sm:right-10 -bottom-3 sm:-bottom-2 z-30 select-none">
                <div 
                  className="w-36 sm:w-44 bg-[#fefcf8] rounded-md p-2 sm:p-2.5 shadow-xl border border-amber-900/20 transform -rotate-2 relative"
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.35)'
                  }}
                >
                  <div className="flex justify-between px-2 -mt-4 mb-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="w-1.5 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-xs" />
                    ))}
                  </div>

                  <div className="space-y-0.5 text-center">
                    <p className="font-['Caveat'] text-xs sm:text-sm text-slate-800 font-bold leading-tight">
                      {t.notebookLine1}
                    </p>
                    <p className="font-['Caveat'] text-xs sm:text-sm text-slate-800 font-bold leading-tight">
                      {t.notebookLine2}
                    </p>
                    <p className="font-['Caveat'] text-xs sm:text-sm text-slate-800 font-bold leading-tight">
                      {t.notebookLine3}
                    </p>
                  </div>

                  <div 
                    className="absolute -right-3 top-2 w-1.5 h-16 sm:h-20 bg-slate-900 rounded-full transform rotate-12 shadow-md border-t-2 border-amber-400"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
