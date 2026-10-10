import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Briefcase, 
  RotateCcw,
  User, 
  Mail, 
  Lock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Translations } from '../i18n/translations';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; role: 'student' | 'mentor' }) => void;
  t: Translations['registerModal'];
  onSwitchToLogin: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  t,
  onSwitchToLogin,
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [role, setRole] = useState<'student' | 'mentor'>('student');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWalkAnim, setShowWalkAnim] = useState(false);

  if (!isOpen) return null;

  const handleReplayWalk = () => {
    setShowWalkAnim(true);
    setTimeout(() => {
      setShowWalkAnim(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !fullName.trim()) return;
    if (!contact.trim()) return;

    setIsSubmitting(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#f04d3e', '#3b82f6']
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        name: fullName.trim() || (contact.includes('@') ? contact.split('@')[0] : 'Foydalanuvchi'),
        email: contact.trim(),
        role,
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Keyframe Styles for Lifelike Human Lean & Backpack Mechanics */}
      <style>{`
        @keyframes cardEmergeSmooth {
          0% {
            transform: scale(0.92) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes walkInQuick {
          0% { transform: translateX(-120px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes idleLeanBreathing {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(0.4deg);
          }
        }

        @keyframes backpackPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(52, 211, 153, 0.8)); }
        }
      `}</style>

      {/* Deep Forest Emerald (#102719) Modal Container */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto text-left border border-emerald-500/30 transition-all"
        style={{
          backgroundColor: '#102719',
          backgroundImage: 'radial-gradient(circle at 50% 15%, #164329 0%, #102719 65%, #08160e 100%)',
          boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.9), 0 0 60px rgba(16, 39, 25, 0.7), inset 0 1px 0 rgba(52, 211, 153, 0.25)'
        }}
      >
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-b border-emerald-500/20 bg-black/25 backdrop-blur-xs relative z-30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              {mode === 'register' ? (t.modalHeader || 'UstozPro • Ro\'yxatdan o\'tish') : 'UstozPro • Tizimga kirish'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleReplayWalk}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-200 hover:text-white px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-500/30 transition"
              title={t.replayAnimation || 'Animatsiyani qaytarish'}
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline text-[11px]">{t.replayAnimation || 'Animatsiya'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/15 transition"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN STAGE: Character Leaning + Ryugzak + Interactive Form */}
        {/* ============================================================== */}
        <div className="relative w-full p-4 sm:p-7 flex items-center justify-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            
            {/* ========================================================== */}
            {/* LEFT COLUMN: MAN LEANING CASUALLY AGAINST THE FORM CARD    */}
            {/* ========================================================== */}
            <div 
              className="hidden sm:flex flex-col items-center justify-end relative flex-shrink-0"
              style={{
                animation: showWalkAnim 
                  ? 'walkInQuick 2.2s cubic-bezier(0.2, 0.9, 0.3, 1)' 
                  : 'idleLeanBreathing 4s ease-in-out infinite'
              }}
            >
              {/* Friendly Welcome Bubble */}
              <div className="mb-2 bg-emerald-900/90 text-emerald-100 font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-400/40 shadow-lg flex items-center space-x-1.5 animate-bounce">
                <span>👋</span>
                <span>{mode === 'register' ? (t.welcomeCharacter || 'Xush kelibsiz!') : 'Qaytganingizdan xursandmiz!'}</span>
              </div>

              {/* Character SVG in Leaning Pose with arms propped against card */}
              <div className="w-44 md:w-52 h-72 md:h-88 relative">
                <svg viewBox="0 0 170 290" className="w-full h-full drop-shadow-2xl" fill="none">
                  
                  {/* Shadow on Floor */}
                  <ellipse cx="85" cy="272" rx="55" ry="12" fill="rgba(0,0,0,0.4)" />

                  {/* OPEN RYUGZAK RESTING ON FLOOR (Magical glowing opening) */}
                  <g transform="translate(16, 238)" style={{ animation: 'backpackPulse 3s infinite ease-in-out' }}>
                    <rect x="0" y="0" width="40" height="28" rx="6" fill="#78350f" />
                    <rect x="2" y="2" width="36" height="24" rx="5" fill="#92400e" />
                    {/* Open top flap with glowing emerald interior */}
                    <path d="M0 0 L40 0 L36 -10 L4 -10 Z" fill="#a16207" />
                    <ellipse cx="20" cy="1" rx="15" ry="5" fill="#34d399" opacity="0.95" />
                    <ellipse cx="20" cy="1" rx="10" ry="3" fill="#fef08a" />
                    <rect x="17" y="10" width="6" height="5" rx="1" fill="#f59e0b" />
                    <path d="M4 24 C -6 26 -4 30 8 28" stroke="#5a2507" strokeWidth="2.5" fill="none" />
                  </g>

                  {/* LEGS CROSSED: Left Leg Straight, Right Leg Crossed in front */}
                  <path d="M80 160 L80 220 L78 262" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
                  <path d="M100 160 L86 210 L70 258" stroke="#0f172a" strokeWidth="18" strokeLinecap="round" />

                  {/* WHITE SNEAKERS */}
                  <path d="M64 262 L90 262 L88 272 L62 272 Z" fill="#ffffff" />
                  <rect x="62" y="269" width="27" height="3" fill="#cbd5e1" />
                  <path d="M58 258 L82 256 L80 266 L56 266 Z" fill="#ffffff" />
                  <rect x="56" y="264" width="25" height="3" fill="#cbd5e1" />

                  {/* TORSO & GREY BLAZER JACKET */}
                  <path d="M62 82 L116 82 L120 162 L58 162 Z" fill="#94a3b8" />
                  <path d="M76 82 L88 108 L100 82 Z" fill="#ffffff" />
                  <path d="M64 82 L80 128 L80 162 L58 162 Z" fill="#cbd5e1" />
                  <path d="M114 82 L98 128 L98 162 L120 162 Z" fill="#64748b" />

                  {/* ARMS LEANING AGAINST CARD EDGE */}
                  <path d="M114 88 L138 120 L115 132" stroke="#64748b" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M64 88 L54 122 L98 132" stroke="#94a3b8" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="115" cy="132" r="6.5" fill="#fed7aa" />
                  <circle cx="98" cy="132" r="6.5" fill="#fed7aa" />

                  {/* HEAD & HAIR */}
                  <path d="M82 70 L94 70 L92 82 L84 82 Z" fill="#fed7aa" />
                  <circle cx="88" cy="48" r="21" fill="#fed7aa" />
                  <path d="M70 40 C70 20 108 20 110 38 C110 46 106 48 102 48 C98 48 96 40 90 40 C84 40 78 44 70 40 Z" fill="#f59e0b" />
                  <path d="M78 30 C84 26 100 26 104 34" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />

                  {/* EYES & SMILE */}
                  <circle cx="82" cy="48" r="2.5" fill="#1e293b" />
                  <circle cx="96" cy="48" r="2.5" fill="#1e293b" />
                  <path d="M84 57 Q89 62 94 57" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* ========================================================== */}
            {/* RIGHT COLUMN: THE REGISTRATION FORM (ALWAYS INTERACTIVE)   */}
            {/* ========================================================== */}
            <div 
              className="flex-1 w-full max-w-lg z-20"
              style={{ animation: 'cardEmergeSmooth 0.4s ease-out' }}
            >
              <div className="bg-[#0b1f14]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-emerald-500/35 text-white">
                
                {/* Header Switcher: Ro'yxatdan o'tish vs Kirish */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/20">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {mode === 'register' ? (t.title || 'Ro‘yxatdan o‘tish') : 'Tizimga kirish'}
                    </h2>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      {mode === 'register' 
                        ? (t.subtitle || 'UstozPro platformasiga qo‘shiling!') 
                        : 'Shaxsiy kabinetingizga kiring'}
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-black/40 p-1 rounded-xl border border-emerald-500/30 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        mode === 'register'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-emerald-300 hover:text-white'
                      }`}
                    >
                      Ro‘yxatdan o‘tish
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        mode === 'login'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-emerald-300 hover:text-white'
                      }`}
                    >
                      Kirish
                    </button>
                  </div>
                </div>

                {/* Role Selector (only for register) */}
                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-2.5 rounded-2xl border text-left transition flex items-center space-x-2.5 ${
                        role === 'student'
                          ? 'border-emerald-400 bg-emerald-900/60 ring-2 ring-emerald-400/40'
                          : 'border-emerald-950/80 bg-black/30 hover:bg-black/40 text-emerald-200/70'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${role === 'student' ? 'bg-emerald-500 text-white' : 'bg-emerald-950 text-emerald-400'}`}>
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-white truncate">
                        {t.stepStudent || 'O‘quvchi'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('mentor')}
                      className={`p-2.5 rounded-2xl border text-left transition flex items-center space-x-2.5 ${
                        role === 'mentor'
                          ? 'border-emerald-400 bg-emerald-900/60 ring-2 ring-emerald-400/40'
                          : 'border-emerald-950/80 bg-black/30 hover:bg-black/40 text-emerald-200/70'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${role === 'mentor' ? 'bg-emerald-500 text-white' : 'bg-emerald-950 text-emerald-400'}`}>
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-white truncate">
                        {t.stepMentor || 'Ustoz'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Full Name (for register mode) */}
                  {mode === 'register' && (
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.fullNamePlaceholder || 'Ism va familiyangiz'}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-400 shadow-md transition"
                      />
                    </div>
                  )}

                  {/* Contact (Phone / Email) */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t.contactPlaceholder || '+998 90 123-45-67 yoki email'}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-400 shadow-md transition"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder || 'Parol (kamida 6 ta belgi)'}
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-400 shadow-md transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Terms (for register mode) */}
                  {mode === 'register' && (
                    <label className="flex items-start space-x-2 cursor-pointer pt-0.5">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400 bg-white/10 border-emerald-500/40"
                      />
                      <span className="text-[11px] text-emerald-200/80 leading-tight">
                        {t.agreeTerms || 'Foydalanish shartlari va xavfsizlik qoidalariga roziman'}
                      </span>
                    </label>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || (mode === 'register' && !agreed)}
                    className="w-full bg-[#f04d3e] hover:bg-[#de3d2f] active:scale-98 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin mr-2">⏳</span>
                    ) : (
                      <Sparkles className="w-4 h-4 mr-1 animate-pulse" />
                    )}
                    <span>
                      {mode === 'register' ? (t.submit || 'Ro‘yxatdan o‘tish') : 'Tizimga kirish'}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  {/* Fast One-Click Social Autocomplete */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFullName('Google Foydalanuvchi');
                        setContact('google.user@gmail.com');
                        setPassword('google_pass_123');
                      }}
                      className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-emerald-500/30 rounded-xl bg-black/30 hover:bg-black/50 text-xs font-semibold text-white transition cursor-pointer"
                    >
                      <span className="font-bold text-blue-400">G</span>
                      <span>Google orqali</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFullName('Telegram Foydalanuvchi');
                        setContact('+998 90 777-66-55');
                        setPassword('telegram_pass_123');
                      }}
                      className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-emerald-500/30 rounded-xl bg-black/30 hover:bg-black/50 text-xs font-semibold text-white transition cursor-pointer"
                    >
                      <span className="font-bold text-sky-400">✈️</span>
                      <span>Telegram orqali</span>
                    </button>
                  </div>

                  {/* Footer links */}
                  <div className="text-center pt-1 flex items-center justify-between text-xs text-emerald-200/70">
                    <div>
                      {mode === 'register' ? (
                        <>
                          <span>Allaqachon akkountingiz bormi? </span>
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="font-bold text-emerald-300 hover:text-white underline cursor-pointer"
                          >
                            Kirish
                          </button>
                        </>
                      ) : (
                        <>
                          <span>Yangi foydalanuvchimisiz? </span>
                          <button
                            type="button"
                            onClick={() => setMode('register')}
                            className="font-bold text-emerald-300 hover:text-white underline cursor-pointer"
                          >
                            Ro‘yxatdan o‘tish
                          </button>
                        </>
                      )}
                    </div>

                    <span className="text-[10px] font-bold text-emerald-300/80 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      UstozPro • Xavfsiz
                    </span>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
