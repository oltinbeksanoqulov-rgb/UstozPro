import React from 'react';
import { 
  Code2, 
  Briefcase, 
  User, 
  Palette, 
  Music2, 
  Dumbbell, 
  ArrowRight,
  Mic,
  Bot,
  Scissors,
  Sparkles,
  Hammer,
  ChefHat,
  Guitar,
  Wrench
} from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface CategorySectionProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  onViewAll: () => void;
  lang?: Language;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
  lang = 'uz',
}) => {
  const t = translations[lang].categories;

  const categories = [
    {
      id: 'programming',
      name: t.names.programming,
      count: `120+ ${t.coursesCount}`,
      iconType: 'code',
      bgColor: 'bg-[#1d4ed8]', // Blue
    },
    {
      id: 'english',
      name: t.names.english,
      count: `95+ ${t.coursesCount}`,
      iconType: 'flag',
      bgColor: 'bg-[#b91c1c]', // Red
    },
    {
      id: 'math',
      name: t.names.math,
      count: `80+ ${t.coursesCount}`,
      iconType: 'math',
      bgColor: 'bg-[#047857]', // Emerald
    },
    {
      id: 'business',
      name: t.names.business,
      count: `60+ ${t.coursesCount}`,
      iconType: 'briefcase',
      bgColor: 'bg-[#d97706]', // Amber
    },
    {
      id: 'growth',
      name: t.names.growth,
      count: `70+ ${t.coursesCount}`,
      iconType: 'user',
      bgColor: 'bg-[#6d28d9]', // Purple
    },
    {
      id: 'illustration',
      name: t.names.illustration,
      count: `55+ ${t.coursesCount}`,
      iconType: 'palette',
      bgColor: 'bg-[#ec4899]', // Pink / Art
    },
    {
      id: 'public_speaking',
      name: t.names.public_speaking,
      count: `48+ ${t.coursesCount}`,
      iconType: 'mic',
      bgColor: 'bg-[#ea580c]', // Orange / Speech
    },
    {
      id: 'robotics',
      name: t.names.robotics,
      count: `62+ ${t.coursesCount}`,
      iconType: 'bot',
      bgColor: 'bg-[#0891b2]', // Cyan / Tech
    },
    {
      id: 'sewing',
      name: t.names.sewing,
      count: `38+ ${t.coursesCount}`,
      iconType: 'scissors',
      bgColor: 'bg-[#7c3aed]', // Violet / Sewing
    },
    {
      id: 'pottery',
      name: t.names.pottery,
      count: `30+ ${t.coursesCount}`,
      iconType: 'pottery',
      bgColor: 'bg-[#b45309]', // Amber / Clay
    },
    {
      id: 'woodworking',
      name: t.names.woodworking,
      count: `28+ ${t.coursesCount}`,
      iconType: 'hammer',
      bgColor: 'bg-[#854d0e]', // Brown / Woodcraft
    },
    {
      id: 'cooking',
      name: t.names.cooking,
      count: `52+ ${t.coursesCount}`,
      iconType: 'chef',
      bgColor: 'bg-[#dc2626]', // Red / Culinary
    },
    {
      id: 'instruments',
      name: t.names.instruments,
      count: `44+ ${t.coursesCount}`,
      iconType: 'guitar',
      bgColor: 'bg-[#4f46e5]', // Indigo / Music
    },
    {
      id: 'mechanics',
      name: t.names.mechanics,
      count: `36+ ${t.coursesCount}`,
      iconType: 'wrench',
      bgColor: 'bg-[#475569]', // Slate / Mechanics
    },
    {
      id: 'art',
      name: t.names.art,
      count: `45+ ${t.coursesCount}`,
      iconType: 'art',
      bgColor: 'bg-[#db2777]', // Rose
    },
    {
      id: 'music',
      name: t.names.music,
      count: `40+ ${t.coursesCount}`,
      iconType: 'music',
      bgColor: 'bg-[#0284c7]', // Sky Blue
    },
    {
      id: 'sport',
      name: t.names.sport,
      count: `35+ ${t.coursesCount}`,
      iconType: 'dumbbell',
      bgColor: 'bg-[#059669]', // Teal
    },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code2 className="w-5 h-5 text-white stroke-[2.5]" />;
      case 'flag':
        return (
          <div className="w-5 h-5 flex items-center justify-center text-white font-bold text-xs select-none">
            🇬🇧
          </div>
        );
      case 'math':
        return (
          <div className="text-white font-mono font-bold text-xs leading-none select-none text-center">
            + -<br />× ÷
          </div>
        );
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-white" />;
      case 'user':
        return <User className="w-5 h-5 text-white" />;
      case 'palette':
      case 'art':
        return <Palette className="w-5 h-5 text-white" />;
      case 'mic':
        return <Mic className="w-5 h-5 text-white" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-white" />;
      case 'scissors':
        return <Scissors className="w-5 h-5 text-white" />;
      case 'pottery':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'hammer':
        return <Hammer className="w-5 h-5 text-white" />;
      case 'chef':
        return <ChefHat className="w-5 h-5 text-white" />;
      case 'guitar':
        return <Guitar className="w-5 h-5 text-white" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-white" />;
      case 'music':
        return <Music2 className="w-5 h-5 text-white" />;
      case 'dumbbell':
        return <Dumbbell className="w-5 h-5 text-white" />;
      default:
        return <Code2 className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="categories-section" className="w-full py-10 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 select-none transition-colors duration-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-1 bg-[#00875a] rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#00875a] dark:text-emerald-400 hover:text-emerald-800 transition self-start sm:self-auto"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories in responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`cursor-pointer rounded-2xl p-3 sm:p-3.5 transition-all duration-150 border flex items-center space-x-2.5 text-left select-none ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-[#f8faf9] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs'
                }`}
              >
                {/* Square icon with specific category color */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${cat.bgColor} flex items-center justify-center flex-shrink-0 shadow-xs`}
                >
                  {renderIcon(cat.iconType)}
                </div>

                {/* Name & Count */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[11px] sm:text-xs text-slate-900 dark:text-white leading-tight break-words line-clamp-1" title={cat.name}>
                    {cat.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block mt-0.5">
                    {cat.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
