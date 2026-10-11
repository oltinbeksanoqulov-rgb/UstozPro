import React, { useState } from 'react';
import { Search, X, Users, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENTORS, COURSES, SKILL_GIGS } from '../data/mockData';
import { Mentor, Course, SkillGig } from '../types';
import { Language, translations } from '../i18n/translations';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMentor: (mentor: Mentor) => void;
  onSelectCourse: (course: Course) => void;
  onSelectGig: (gig: SkillGig) => void;
  lang?: Language;
}

export const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isOpen,
  onClose,
  onSelectMentor,
  onSelectCourse,
  onSelectGig,
  lang = 'uz',
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  const matchesText = (text: string) => {
    if (!text) return false;
    const t = text.toLowerCase();
    if (t.includes(q)) return true;
    return tokens.some((tok) => tok.length > 2 && t.includes(tok));
  };

  const matchedMentors = q
    ? MENTORS.filter(
        (m) =>
          matchesText(m.name) ||
          matchesText(m.title) ||
          matchesText(m.bio) ||
          matchesText(m.category) ||
          m.skills.some((s) => matchesText(s))
      )
    : [];

  const matchedCourses = q
    ? COURSES.filter(
        (c) =>
          matchesText(c.title) ||
          matchesText(c.instructor) ||
          matchesText(c.categoryName) ||
          matchesText(c.description) ||
          c.highlights.some((h) => matchesText(h))
      )
    : [];

  const matchedGigs = q
    ? SKILL_GIGS.filter(
        (g) =>
          matchesText(g.title) ||
          matchesText(g.sellerName) ||
          matchesText(g.description)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ustoz ismi, fan, kurs yoki mahorat qidiring (masalan: React, Ingliz tili, Matematika)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium focus:outline-none text-slate-800"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-left text-xs sm:text-sm">
          {!q ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p>Qidirmoqchi bo'lgan kalit so'zni kiriting...</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Dasturlash', 'IELTS', 'Matematika', 'Rasm', 'Notiqlik', 'Robototexnika', 'Tikuvchilik', 'Kulolchilik', 'O\'ymakorlik', 'Pazandalik', 'Gitara', 'Mexanik', 'AI'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="bg-slate-100 hover:bg-emerald-50 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mentors */}
              {matchedMentors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    👨‍🏫 Ustozlar ({matchedMentors.length})
                  </span>
                  {matchedMentors.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        onSelectMentor(m);
                        onClose();
                      }}
                      className="cursor-pointer p-3 rounded-2xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-200 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{m.name}</h4>
                          <p className="text-xs text-slate-500">{m.title}</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-700 text-xs">
                        {m.hourlyRate.toLocaleString()} s. / soat
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Courses */}
              {matchedCourses.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    📚 Kurslar ({matchedCourses.length})
                  </span>
                  {matchedCourses.map((c) => {
                    const cTitle = translations[lang]?.courses?.courseTitles[c.id] || c.title;
                    const cCurr = translations[lang]?.courses?.currency || "so'm";
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectCourse(c);
                          onClose();
                        }}
                        className="cursor-pointer p-3 rounded-2xl hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={c.thumbnail}
                            alt={cTitle}
                            className="w-12 h-8 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900">{cTitle}</h4>
                            <p className="text-xs text-slate-500">{c.instructor}</p>
                          </div>
                        </div>
                        <span className="font-bold text-blue-700 text-xs">
                          {c.price.toLocaleString()} {cCurr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Gigs */}
              {matchedGigs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    💼 Mahorat & Xizmatlar ({matchedGigs.length})
                  </span>
                  {matchedGigs.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        onSelectGig(g);
                        onClose();
                      }}
                      className="cursor-pointer p-3 rounded-2xl hover:bg-amber-50 transition border border-transparent hover:border-amber-200 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={g.sellerAvatar}
                          alt={g.sellerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{g.title}</h4>
                          <p className="text-xs text-slate-500">{g.sellerName}</p>
                        </div>
                      </div>
                      <span className="font-bold text-amber-700 text-xs">
                        {g.price.toLocaleString()} so'm
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {matchedMentors.length === 0 && matchedCourses.length === 0 && matchedGigs.length === 0 && (
                <p className="text-center py-6 text-slate-400">
                  Hech qanday natija topilmadi.
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
