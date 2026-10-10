import React from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { Language, translations } from '../i18n/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (courseId: string, quantity: number) => void;
  onRemoveItem: (courseId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  lang: Language;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  lang,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const t = translations[lang];
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginal = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const totalSavings = totalOriginal > totalAmount ? totalOriginal - totalAmount : 0;
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{lang === 'uz' ? 'Savat' : lang === 'ru' ? 'Корзина' : 'Cart'}</span>
                  <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {totalCount}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'uz'
                    ? 'Tanlangan kurs va xizmatlar'
                    : lang === 'ru'
                    ? 'Выбранные курсы и услуги'
                    : 'Selected courses & services'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  title="Savatni tozalash"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Items List or Empty state */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center shadow-inner">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-800 dark:text-slate-200 text-lg">
                    {lang === 'uz'
                      ? 'Savatingiz bo‘sh'
                      : lang === 'ru'
                      ? 'Ваша корзина пуста'
                      : 'Your cart is empty'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    {lang === 'uz'
                      ? 'O‘zingizga yoqqan kurs yoki mahoratni tanlang va savatga qo‘shing'
                      : lang === 'ru'
                      ? 'Выберите понравившийся курс и добавьте его в корзину'
                      : 'Explore courses and add your favorite skills to cart'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  {lang === 'uz' ? 'Kurslarni ko‘rish' : lang === 'ru' ? 'Смотреть курсы' : 'Explore Courses'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-200 dark:border-slate-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {item.categoryName}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.courseId)}
                          className="text-slate-400 hover:text-rose-500 transition p-0.5"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {item.instructor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div>
                        <div className="font-black text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                          {(item.price * item.quantity).toLocaleString()} {t.courses.currency}
                        </div>
                        {item.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through">
                            {(item.originalPrice * item.quantity).toLocaleString()} {t.courses.currency}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => onUpdateQuantity(item.courseId, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.courseId, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                {totalSavings > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>{lang === 'uz' ? 'Eski narxi' : 'Original price'}</span>
                    <span className="line-through">{totalOriginal.toLocaleString()} {t.courses.currency}</span>
                  </div>
                )}
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === 'uz' ? 'Tejovingiz' : 'You save'}
                    </span>
                    <span>-{totalSavings.toLocaleString()} {t.courses.currency}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    {lang === 'uz' ? 'Jami to‘lov' : lang === 'ru' ? 'Итого к оплате' : 'Total'}
                  </span>
                  <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                    {totalAmount.toLocaleString()} {t.courses.currency}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition transform active:scale-98"
              >
                <span>{lang === 'uz' ? 'Buyurtma berish' : lang === 'ru' ? 'Оформить заказ' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>
                  {lang === 'uz'
                    ? '100% xavfsiz to‘lov va kafolatlangan ta’lim'
                    : '100% Secure Payment Guarantee'}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
