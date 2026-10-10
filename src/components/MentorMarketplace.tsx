import React, { useState } from 'react';
import { Mentor, CategoryId } from '../types';
import { MENTORS } from '../data/mockData';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Languages, 
  CheckCircle, 
  Search, 
  Filter, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MentorMarketplaceProps {
  onBookMentor: (mentor: Mentor) => void;
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

export const MentorMarketplace: React.FC<MentorMarketplaceProps> = ({
  onBookMentor,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredMentors = MENTORS.filter((mentor) => {
    if (selectedCategory && mentor.category !== selectedCategory) return false;
    if (onlyOnline && !mentor.isOnline) return false;
    if (selectedSkill && !mentor.skills.includes(selectedSkill)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = mentor.name.toLowerCase().includes(q);
      const matchTitle = mentor.title.toLowerCase().includes(q);
      const matchSkill = mentor.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchTitle && !matchSkill) return false;
    }
    return true;
  });

  return (
    <section className="py-14 bg-slate-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1-ga-1 Individual Ta'lim & Konsultatsiya</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ustoz Sotib Olish — <br />
              Soha Yetakchilari Bilan Jonli Shug'ullaning!
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              O'zingizga ma'qul vaqtni tanlang, individual konsultatsiya yoki 1-on-1 dars oling. Escrow tizimi orqali to'lovingiz dars to'liq o'tgunga qadar xavfsiz saqlanadi.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ustoz ismi, ko'nikma (React, IELTS, DTM)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory || ''}
                onChange={(e) => onSelectCategory(e.target.value || null)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-700 bg-white"
              >
                <option value="">Barcha sohalar</option>
                <option value="programming">Dasturlash</option>
                <option value="english">Ingliz tili</option>
                <option value="math">Matematika</option>
                <option value="ai">Sun'iy intellekt</option>
                <option value="business">Biznes & Marketing</option>
                <option value="design">Dizayn & UI/UX</option>
                <option value="illustration">Rasm va illustratsiya</option>
                <option value="public_speaking">Notiqlik va muloqot</option>
                <option value="robotics">Robototexnika</option>
                <option value="sewing">Tikuvchilik</option>
                <option value="pottery">Kulolchilik</option>
                <option value="woodworking">Yog'och o'ymakorligi</option>
                <option value="cooking">Ovqat pishirish & Pazandalik</option>
                <option value="instruments">Musiqa asboblari chalish</option>
                <option value="mechanics">Mexanika & Avto</option>
              </select>
            </div>

            {/* Online Toggle */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end space-x-3">
              <label className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyOnline}
                  onChange={(e) => setOnlyOnline(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                />
                <span>Faqat online ustozlar</span>
              </label>

              {(selectedCategory || searchQuery || onlyOnline || selectedSkill) && (
                <button
                  onClick={() => {
                    onSelectCategory(null);
                    setSearchQuery('');
                    setOnlyOnline(false);
                    setSelectedSkill(null);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold underline"
                >
                  Tozalash
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mentors List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-5"
            >
              {/* Header with Avatar & Basic Info */}
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/20 shadow-sm"
                  />
                  {mentor.isOnline ? (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Online
                    </span>
                  ) : (
                    <span className="absolute -bottom-1 -right-1 bg-slate-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                      Oflayn
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <h3 className="text-lg font-black text-slate-900 truncate">
                      {mentor.name}
                    </h3>
                    {mentor.isVerified && (
                      <span title="Tasdiqlangan ekspert" className="text-emerald-600">
                        <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-slate-600 leading-snug mt-0.5">
                    {mentor.title}
                  </p>

                  <div className="flex items-center space-x-3 mt-2 text-xs">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      <span>{mentor.rating}</span>
                      <span className="text-slate-400 font-normal ml-1">
                        ({mentor.reviewsCount} ta sharh)
                      </span>
                    </div>

                    <span className="text-slate-300">•</span>

                    <span className="text-slate-500 font-medium">
                      🎓 {mentor.studentsCount}+ talaba
                    </span>

                    <span className="text-slate-300">•</span>

                    <span className="text-slate-500 font-medium">
                      ⏳ {mentor.experienceYears} yil tajriba
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Education */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{mentor.education}</span>
                </div>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5">
                {mentor.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-2.5 py-1 rounded-lg transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Available Slots Preview */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Mavjud kunlar: {mentor.availableDays.slice(0, 3).join(', ')}
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px]">
                    {mentor.slots.length} ta bo'sh vaqt
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentor.slots.slice(0, 3).map((slot, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {slot}
                    </span>
                  ))}
                  {mentor.slots.length > 3 && (
                    <span className="text-[10px] text-slate-400 py-0.5">
                      +{mentor.slots.length - 3} ta
                    </span>
                  )}
                </div>
              </div>

              {/* Footer: Price & Booking Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    1 soatlik dars narxi
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-black text-emerald-700">
                      {mentor.hourlyRate.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">so'm</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookMentor(mentor)}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center space-x-2 shadow-sm hover:shadow-brand"
                >
                  <span>Ustozni bron qilish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Ushbu parametrlar bo'yicha ustoz topilmadi</h3>
            <p className="text-xs text-slate-500 mt-1">Filtrlarni tozalab ko'ring yoki boshqa soha tanlang</p>
          </div>
        )}

      </div>
    </section>
  );
};
