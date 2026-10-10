import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Sparkles,
  Video,
  FileCheck
} from 'lucide-react';
import { Mentor, Course, SkillGig, LiveSession, UserBooking } from '../types';
import { Language, translations } from '../i18n/translations';

interface BookingModalProps {
  item: Mentor | Course | SkillGig | LiveSession | null;
  itemType: 'mentor' | 'course' | 'gig' | 'live';
  userBalance: number;
  onClose: () => void;
  onSuccess: (booking: UserBooking, newBalance: number) => void;
  lang?: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  itemType,
  userBalance,
  onClose,
  onSuccess,
  lang = 'uz',
}) => {
  if (!item) return null;

  const isMentor = itemType === 'mentor';
  const mentor = isMentor ? (item as Mentor) : null;
  const course = itemType === 'course' ? (item as Course) : null;
  const gig = itemType === 'gig' ? (item as SkillGig) : null;
  const liveSession = itemType === 'live' ? (item as LiveSession) : null;

  // Selected booking parameters
  const [selectedDate, setSelectedDate] = useState('2026-10-12');
  const [selectedSlot, setSelectedSlot] = useState(mentor?.slots?.[0] || '19:00 - 20:00');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'click' | 'payme' | 'uzum'>('balance');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<UserBooking | null>(null);

  const price = mentor
    ? mentor.hourlyRate
    : course
    ? course.price
    : gig
    ? gig.price
    : liveSession
    ? liveSession.price
    : 0;

  const title = mentor
    ? `${mentor.name} (${lang === 'en' ? '1-on-1 Mentorship' : lang === 'ru' ? '1-на-1 Занятие' : '1-on-1 dars'})`
    : course
    ? (translations[lang]?.courses?.courseTitles[course.id] || course.title)
    : gig
    ? gig.title
    : liveSession
    ? liveSession.title
    : '';

  const providerName = mentor
    ? mentor.name
    : course
    ? course.instructor
    : gig
    ? gig.sellerName
    : liveSession
    ? liveSession.instructor
    : 'UstozPro';

  const handlePay = () => {
    if (paymentMethod === 'balance' && userBalance < price) {
      alert("Hamyoningizda yetarli mablag' yo'q! Iltimos, Click yoki Payme orqali to'lang yoki balansni to'ldiring.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const newBooking: UserBooking = {
        id: `book-${Date.now()}`,
        type: isMentor ? 'mentor_session' : itemType === 'course' ? 'course' : itemType === 'gig' ? 'gig' : 'live_class',
        title,
        providerName,
        date: selectedDate,
        time: selectedSlot,
        amount: price,
        status: 'tasdiqlangan',
        meetLink: 'https://meet.ustozpro.uz/room-' + Math.floor(1000 + Math.random() * 9000),
      };

      const updatedBalance = paymentMethod === 'balance' ? userBalance - price : userBalance;
      setCreatedBooking(newBooking);
      setIsSuccess(true);
      setIsProcessing(false);
      onSuccess(newBooking, updatedBalance);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {isMentor ? "Ustozni Bron Qilish (1-on-1)" : "Xaridni Tasdiqlash"}
              </h3>
              <p className="text-xs text-slate-400">Escrow xavfsiz to'lov himoyasi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-sm">
          {isSuccess && createdBooking ? (
            /* Success confirmation screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900">
                  To'lov muvaffaqiyatli amalga oshirildi!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Sizning buyurtmangiz tasdiqlandi. Dars ma'lumotlari shaxsiy kabinetingizga saqlandi.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Xizmat / Dars:</span>
                  <span className="font-bold text-slate-800">{createdBooking.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ustoz / Mutaxassis:</span>
                  <span className="font-bold text-slate-800">{createdBooking.providerName}</span>
                </div>
                {isMentor && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Belgilangan vaqt:</span>
                    <span className="font-bold text-emerald-700">{createdBooking.date} | {createdBooking.time}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">To'langan summa:</span>
                  <span className="font-black text-slate-900">{createdBooking.amount.toLocaleString()} so'm</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Uchrashuv xonasi:</span>
                  <a
                    href={createdBooking.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Jonli xonaga o'tish</span>
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-sm transition"
              >
                Yopish va Kabinetga o'tish
              </button>
            </div>
          ) : (
            /* Checkout form */
            <>
              {/* Product summary card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black flex-shrink-0">
                  {isMentor ? '👨‍🏫' : itemType === 'course' ? '📚' : itemType === 'gig' ? '💼' : '🔴'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{title}</h4>
                  <p className="text-xs text-slate-500">{providerName}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-700">
                    {price.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              {/* If booking mentor, choose date & slot */}
              {isMentor && mentor && (
                <div className="space-y-3">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    Dars sanasi va vaqtini tanlang:
                  </h5>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Sana
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Bo'sh vaqt oralig'i
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 font-medium bg-white"
                      >
                        {mentor.slots.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Ustozga savol yoki darsda muhokama qilmoqchi bo'lgan mavzu (ixtiyoriy):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Masalan: Rezyume tahlili va intervyu savollari..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  To'lov usulini tanlang:
                </h5>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Balance option */}
                  <div
                    onClick={() => setPaymentMethod('balance')}
                    className={`cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-2.5 ${
                      paymentMethod === 'balance'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">Hamyon balansi</span>
                      <span className="text-[10px] text-slate-500">{userBalance.toLocaleString()} so'm</span>
                    </div>
                  </div>

                  {/* Click */}
                  <div
                    onClick={() => setPaymentMethod('click')}
                    className={`cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-2.5 ${
                      paymentMethod === 'click'
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      C
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">Click</span>
                      <span className="text-[10px] text-slate-500">Karta orqali</span>
                    </div>
                  </div>

                  {/* Payme */}
                  <div
                    onClick={() => setPaymentMethod('payme')}
                    className={`cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-2.5 ${
                      paymentMethod === 'payme'
                        ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded bg-teal-500 text-white flex items-center justify-center font-bold text-[10px]">
                      P
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">Payme</span>
                      <span className="text-[10px] text-slate-500">Tezkor to'lov</span>
                    </div>
                  </div>

                  {/* Uzum Bank */}
                  <div
                    onClick={() => setPaymentMethod('uzum')}
                    className={`cursor-pointer p-3 rounded-2xl border transition flex items-center space-x-2.5 ${
                      paymentMethod === 'uzum'
                        ? 'border-violet-600 bg-violet-50/80 ring-2 ring-violet-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-5 h-5 rounded bg-violet-700 text-white flex items-center justify-center font-bold text-[10px]">
                      U
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">Uzum Bank</span>
                      <span className="text-[10px] text-slate-500">Muddatli / Karta</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Note */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-2xl flex items-center space-x-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>UstozPro Escrow Kafolati:</strong> Dars o'tilmagan taqdirda, mablag'ingiz 100% qaytariladi.
                </span>
              </div>

              {/* Pay CTA */}
              <div className="pt-2">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "To'lov amalga oshirilmoqda..."
                      : `${price.toLocaleString()} so'm to'lash va tasdiqlash`}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
