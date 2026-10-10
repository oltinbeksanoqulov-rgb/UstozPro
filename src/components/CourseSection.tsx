import React from 'react';
import { Course } from '../types';
import { Star, Bookmark, ArrowRight, ShoppingBag } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface CourseSectionProps {
  courses: Course[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onEnroll: (course: Course) => void;
  onAddToCart?: (course: Course) => void;
  onViewAll: () => void;
  lang?: Language;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  courses,
  savedIds,
  onToggleSave,
  onEnroll,
  onAddToCart,
  onViewAll,
  lang = 'uz',
}) => {
  const t = translations[lang].courses;
  const displayedCourses = courses;

  return (
    <section id="courses-section" className="w-full py-10 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 select-none transition-colors duration-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header matching mockup */}
        <div className="flex items-center justify-between text-left">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-1 bg-[#00875a] rounded-full inline-block" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#00875a] dark:text-emerald-400 hover:text-emerald-800 transition"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Responsive Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {displayedCourses.map((course) => {
            const isSaved = savedIds.includes(course.id);
            const courseTitle = t.courseTitles[course.id] || course.title;
            const categoryBadge = t.categoryBadges[course.category] || course.categoryName;

            // Badges matching mockup colors:
            const badgeColor = 
              course.category === 'programming'
                ? 'bg-[#064e3b]'
                : course.category === 'english'
                ? 'bg-[#1e40af]'
                : course.category === 'math'
                ? 'bg-[#047857]'
                : course.category === 'business'
                ? 'bg-[#b45309]'
                : course.category === 'illustration'
                ? 'bg-[#be185d]'
                : course.category === 'public_speaking'
                ? 'bg-[#c2410c]'
                : course.category === 'robotics'
                ? 'bg-[#0e7490]'
                : course.category === 'sewing'
                ? 'bg-[#6d28d9]'
                : course.category === 'pottery'
                ? 'bg-[#78350f]'
                : course.category === 'woodworking'
                ? 'bg-[#854d0e]'
                : course.category === 'cooking'
                ? 'bg-[#b91c1c]'
                : course.category === 'instruments'
                ? 'bg-[#4338ca]'
                : course.category === 'mechanics'
                ? 'bg-[#334155]'
                : 'bg-[#0f766e]';

            return (
              <div
                key={course.id}
                onClick={() => onEnroll(course)}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer group text-left"
              >
                {/* Course Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={courseTitle}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Category Pill Tag (matching mockup) */}
                  <span
                    className={`absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${badgeColor}`}
                  >
                    {categoryBadge}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(course.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition backdrop-blur-md ${
                      isSaved
                        ? 'bg-amber-500 text-white shadow'
                        : 'bg-black/30 text-white hover:bg-black/50'
                    }`}
                    title={isSaved ? t.removeTooltip : t.saveTooltip}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Course Title */}
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#00875a] dark:group-hover:text-emerald-400 transition line-clamp-1 leading-snug">
                      {courseTitle}
                    </h3>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-2">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] truncate">
                        {course.instructor}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Rating on left, Price on right */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 mr-0.5 flex-shrink-0" />
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">{course.rating}</span>
                      <span className="text-slate-400 text-[10px]">
                        ({course.reviewsCount >= 1000 ? `${(course.reviewsCount/1000).toFixed(1)}k` : course.reviewsCount} {t.reviews})
                      </span>
                    </div>

                    {/* Price and Add to Cart action */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-[#00875a] dark:text-emerald-400 whitespace-nowrap">
                        {course.price.toLocaleString()} {t.currency}
                      </span>
                      {onAddToCart && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(course);
                          }}
                          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-700 dark:text-emerald-400 transition shadow-2xs"
                          title="Savatga qo'shish"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
