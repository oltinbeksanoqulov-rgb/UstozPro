import React from 'react';
import { Users, Shield, Clock, Star } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface TrustFeaturesProps {
  lang?: Language;
}

export const TrustFeatures: React.FC<TrustFeaturesProps> = ({ lang = 'uz' }) => {
  const t = translations[lang].trustFeatures;

  const features = [
    {
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: Users,
      circleBg: 'bg-[#dcfce7] dark:bg-emerald-950/60',
      iconColor: 'text-[#00875a] dark:text-emerald-400',
    },
    {
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: Shield,
      circleBg: 'bg-[#ccfbf1] dark:bg-teal-950/60',
      iconColor: 'text-[#0f766e] dark:text-teal-400',
    },
    {
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: Clock,
      circleBg: 'bg-[#ccfbf1] dark:bg-teal-950/60',
      iconColor: 'text-[#0f766e] dark:text-teal-400',
    },
    {
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: Star,
      circleBg: 'bg-[#ccfbf1] dark:bg-teal-950/60',
      iconColor: 'text-[#0f766e] dark:text-teal-400',
    },
  ];

  return (
    <div className="w-full bg-[#f8faf9] dark:bg-slate-950 py-7 sm:py-9 border-b border-slate-200/90 dark:border-slate-800/80 select-none transition-colors duration-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition flex items-center space-x-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.circleBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
