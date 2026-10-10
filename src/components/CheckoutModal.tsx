import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  CreditCard,
  Wallet,
  Phone,
  User,
  Mail,
  FileText,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, PaymentMethod } from '../types';
import { Language, translations } from '../i18n/translations';
import { createOrderApi } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  userBalance: number;
  onOrderSuccess: (order: Order) => void;
  lang: Language;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  userBalance,
  onOrderSuccess,
  lang,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('Jasur Aliyev');
  const [customerPhone, setCustomerPhone] = useState('+998 90 123-45-67');
  const [customerEmail, setCustomerEmail] = useState('jasur.developer@gmail.com');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('click');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const t = translations[lang];
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Iltimos, ism va telefon raqamingizni kiriting!');
      return;
    }

    if (paymentMethod === 'wallet' && userBalance < totalAmount) {
      alert('Hisobingizda mablag‘ yetarli emas! Iltimos, hamyonni to‘ldiring yoki boshqa to‘lov usulini tanlang.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload: Partial<Order> = {
        customerName,
        customerPhone,
        customerEmail,
        items,
        totalAmount,
        paymentMethod,
        notes,
      };

      const newOrder = await createOrderApi(orderPayload);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#f59e0b', '#3b82f6'],
      });

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Buyurtma berishda xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                {completedOrder
                  ? (lang === 'uz' ? 'Buyurtma tasdiqlandi!' : 'Order Confirmed!')
                  : (lang === 'uz' ? 'Buyurtmani rasmiylashtirish' : 'Checkout & Payment')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedOrder
                  ? (lang === 'uz' ? `Buyurtma ID: #${completedOrder.id}` : `Order ID: #${completedOrder.id}`)
                  : (lang === 'uz' ? 'Ma\'lumotlaringizni to‘ldiring va to‘lovni amalga oshiring' : 'Fill details to complete order')}
              </p>
            </div>
          </div>

          <button
            onClick={completedOrder ? handleDone : onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {lang === 'uz' ? 'Buyurtmangiz muvaffaqiyatli qabul qilindi! 🎉' : 'Order Placed Successfully! 🎉'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {lang === 'uz'
                  ? `Hurmatli ${completedOrder.customerName}, buyurtmangiz tizimda qayd etildi va Administrator boshqaruv paneliga yuborildi.`
                  : `Dear ${completedOrder.customerName}, your order has been registered and sent to Admin.`}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Buyurtma raqami:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">#{completedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-bold text-slate-900 dark:text-white">{completedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">To‘lov turi:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Mahsulotlar soni:</span>
                <span className="font-bold text-slate-900 dark:text-white">{completedOrder.items.length} ta</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black text-slate-900 dark:text-white">
                <span>Jami to‘langan:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {completedOrder.totalAmount.toLocaleString()} {t.courses.currency}
                </span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
            >
              {lang === 'uz' ? 'Tushundim, davom etish' : 'Close and continue'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Ordered Items Mini List */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {lang === 'uz' ? 'Savatdagi mahsulotlar' : 'Items in order'} ({items.length})
              </span>
              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center space-x-2 min-w-0">
                      <img src={item.thumbnail} alt={item.title} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.title}</span>
                      <span className="text-slate-400">×{item.quantity}</span>
                    </div>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2">
                      {(item.price * item.quantity).toLocaleString()} {t.courses.currency}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline font-black text-sm">
                <span className="text-slate-700 dark:text-slate-300">Jami to‘lov summasi:</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-base">
                  {totalAmount.toLocaleString()} {t.courses.currency}
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ismingiz va Familiyangiz *</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jasur Aliyev"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Telefon raqamingiz *</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+998 90 123-45-67"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email manzilingiz (ixtiyoriy)</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="misol@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Izoh yoki qo‘shimcha talablar</span>
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Masalan: Telegram orqali bog‘laning"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                To‘lov usulini tanlang:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Click */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('click')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'click'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-black">CLICK</span>
                </button>

                {/* Payme */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('payme')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'payme'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-teal-500" />
                  <span className="text-xs font-black">PAYME</span>
                </button>

                {/* UstozPro Wallet */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'wallet'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-black">Hamyon</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {userBalance.toLocaleString()} so'm
                  </span>
                </button>

                {/* Cash / Card on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'cash'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black">Naqd / Karta</span>
                </button>

              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Bekor qilish
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition transform active:scale-98"
              >
                <span>
                  {isSubmitting
                    ? 'Rasmiylashtirilmoqda...'
                    : `Buyurtmani tasdiqlash (${totalAmount.toLocaleString()} ${t.courses.currency})`}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SSL shifrlangan 100% xavfsiz hisob-kitob tizimi</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
