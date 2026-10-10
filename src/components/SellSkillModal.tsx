import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { SkillGig, CategoryId } from '../types';

interface SellSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGig: (newGig: SkillGig) => void;
}

export const SellSkillModal: React.FC<SellSkillModalProps> = ({
  isOpen,
  onClose,
  onAddGig,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('programming');
  const [price, setPrice] = useState('100000');
  const [deliveryTime, setDeliveryTime] = useState('1 kun');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('1-on-1 konsultatsiya, Amaliy yechim, 1 haftalik savol-javob');
  const [sellerName, setSellerName] = useState('Siz (Yangi Mutaxassis)');
  const [sellerRole, setSellerRole] = useState('Amaliyotchi Mutaxassis');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newGig: SkillGig = {
      id: `gig-${Date.now()}`,
      title: title.trim(),
      sellerName,
      sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      sellerRole,
      category,
      categoryName:
        category === 'programming'
          ? 'Dasturlash'
          : category === 'english'
          ? 'Ingliz tili'
          : category === 'ai'
          ? 'Sun\'iy intellekt'
          : category === 'design'
          ? 'Dizayn'
          : 'Biznes',
      price: parseInt(price) || 100000,
      rating: 5.0,
      reviewsCount: 1,
      deliveryTime,
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
      description: description.trim(),
      features: featuresText.split(',').map((s) => s.trim()).filter(Boolean),
      ordersCompleted: 0,
    };

    onAddGig(newGig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                Mahorat Sotish — Yangi Xizmat Joylashtirish
              </h3>
              <p className="text-xs text-emerald-200">
                O'z bilim va xizmatingiz orqali daromad oling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900/40 text-emerald-100 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-left text-xs sm:text-sm">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Mahoratingiz / Xizmat sarlavhasi *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Sayt kodini audit qilish va xatolarni to'g'rilab berish"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Yo'nalish (Kategoriya)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium bg-white"
              >
                <option value="programming">Dasturlash</option>
                <option value="english">Ingliz tili</option>
                <option value="math">Matematika</option>
                <option value="ai">Sun'iy intellekt</option>
                <option value="design">Dizayn</option>
                <option value="business">Biznes</option>
                <option value="growth">Karyera & CV</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Yetkazish / Dars muddati
              </label>
              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium bg-white"
              >
                <option value="Bugun">Bugun (Tezkor)</option>
                <option value="1 kun">1 kun ichida</option>
                <option value="2 kun">2 kun ichida</option>
                <option value="3 kun">3 kun ichida</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Xizmat narxi (so'm) *
              </label>
              <input
                type="number"
                required
                min={20000}
                step={10000}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Sizning mutaxassisligingiz
              </label>
              <input
                type="text"
                value={sellerRole}
                onChange={(e) => setSellerRole(e.target.value)}
                placeholder="Masalan: Frontend mutaxassis"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Batafsil tavsif *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mijozga nimani o'rgatasiz yoki qanday muammosini hal qilib berasiz?"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Xizmatga kiritilgan qulayliklar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Masalan: 45 daqiqa jonli dars, kod tekshirish, savol-javob"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center space-x-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Mahoratni e'lon qilish & sotishni boshlash</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
