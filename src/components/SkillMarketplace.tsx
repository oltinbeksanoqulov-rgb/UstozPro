import React, { useState } from 'react';
import { SkillGig } from '../types';
import { 
  ShoppingBag, 
  PlusCircle, 
  Star, 
  Clock, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

interface SkillMarketplaceProps {
  gigs: SkillGig[];
  onOrderGig: (gig: SkillGig) => void;
  onOpenSellModal: () => void;
}

export const SkillMarketplace: React.FC<SkillMarketplaceProps> = ({
  gigs,
  onOrderGig,
  onOpenSellModal,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredGigs = gigs.filter((gig) => {
    if (selectedCat !== 'all' && gig.category !== selectedCat) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        gig.title.toLowerCase().includes(q) ||
        gig.sellerName.toLowerCase().includes(q) ||
        gig.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Sell Skill CTA */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-emerald-400/20 border border-emerald-300/30 px-3 py-1 rounded-full text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Mahorat Savdosi Ekotizimi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Mahorat Bozori — Bilimingiz Bilan Pul Ishlang!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dasturlash, til o'rganish, konsultatsiya, dizayn yoki imtihonga tayyorgarlik bo'yicha tayyor xizmatlarni xarid qiling yoki o'z mahoratingizni bir necha daqiqada sotuvga qo'ying.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenSellModal}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-6 py-4 rounded-2xl text-sm sm:text-base transition duration-150 flex items-center space-x-2.5 shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-5 h-5 text-slate-950" />
              <span>O'z mahoratingizni soting (+ E'lon berish)</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'programming', label: 'Dasturlash' },
              { id: 'english', label: 'Ingliz tili' },
              { id: 'growth', label: 'Karyera & CV' },
              { id: 'illustration', label: 'Rasm va illustratsiya' },
              { id: 'public_speaking', label: 'Notiqlik va muloqot' },
              { id: 'robotics', label: 'Robototexnika' },
              { id: 'sewing', label: 'Tikuvchilik' },
              { id: 'pottery', label: 'Kulolchilik' },
              { id: 'woodworking', label: 'Yog\'och o\'ymakorligi' },
              { id: 'cooking', label: 'Ovqat pishirish' },
              { id: 'instruments', label: 'Musiqa asboblari' },
              { id: 'mechanics', label: 'Mexanika' },
              { id: 'design', label: 'Dizayn' },
              { id: 'ai', label: 'AI & Botlar' },
              { id: 'business', label: 'Biznes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCat === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Xizmat yoki ko'nikma qidirish..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Thumbnail & Delivery time badge */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={gig.thumbnail}
                  alt={gig.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {gig.categoryName}
                </span>

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Clock className="w-3 h-3 text-emerald-600" /> {gig.deliveryTime}
                </span>

                <div className="absolute bottom-2.5 left-3 text-[11px] text-white/90 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{gig.ordersCompleted} ta bajarilgan buyurtma</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Seller Info */}
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={gig.sellerAvatar}
                      alt={gig.sellerName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {gig.sellerName}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {gig.sellerRole}
                      </p>
                    </div>
                  </div>

                  {/* Gig Title */}
                  <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-700 transition line-clamp-2 leading-snug">
                    {gig.title}
                  </h3>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-1">
                    {gig.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-[11px] text-slate-600 space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating, Price & CTA */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span className="font-bold text-slate-800">{gig.rating}</span>
                      <span className="text-slate-400 text-[11px]">({gig.reviewsCount})</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block leading-tight">Xizmat narxi</span>
                      <span className="text-base font-black text-emerald-700">
                        {gig.price.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOrderGig(gig)}
                    className="w-full bg-slate-900 hover:bg-emerald-600 active:scale-98 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-2 group-hover:bg-emerald-600 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mahoratni sotib olish</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
