import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Briefcase, 
  RotateCcw,
  Zap,
  User, 
  Mail, 
  Lock, 
  ArrowRight
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

type AnimPhase = 'walking' | 'placing' | 'card_popping' | 'ready';

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  t,
  onSwitchToLogin,
}) => {
  const [phase, setPhase] = useState<AnimPhase>('walking');
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [role, setRole] = useState<'student' | 'mentor'>('student');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((tId) => clearTimeout(tId));
    timersRef.current = [];
  };

  const startAnimationSequence = () => {
    clearAllTimers();
    setPhase('walking');

    // Phase 1 -> Phase 2 (1.1s): Man walks in and places backpack on floor
    const t1 = setTimeout(() => {
      setPhase('placing');
    }, 1100);

    // Phase 2 -> Phase 3 (2.0s): Unzips backpack, magical burst & card pops out with confetti!
    const t2 = setTimeout(() => {
      setPhase('card_popping');
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#f04d3e', '#3b82f6', '#ec4899']
      });
    }, 2000);

    // Phase 3 -> Phase 4 (2.8s): Man leans casually against card, form is ready
    const t3 = setTimeout(() => {
      setPhase('ready');
    }, 2800);

    timersRef.current = [t1, t2, t3];
  };

  useEffect(() => {
    if (isOpen) {
      startAnimationSequence();
    } else {
      clearAllTimers();
    }

    return () => {
      clearAllTimers();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSkipAnimation = () => {
    clearAllTimers();
    setPhase('ready');
  };

  const handleReplayAnimation = () => {
    startAnimationSequence();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !fullName.trim()) return;
    if (!contact.trim()) return;

    setIsSubmitting(true);
    confetti({
      particleCount: 85,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#f04d3e', '#3b82f6']
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        name: fullName.trim() || (contact.includes('@') ? contact.split('@')[0] : 'UstozPro Foydalanuvchisi'),
        email: contact.trim(),
        role,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      
      {/* Dynamic Keyframes for Lifelike Human Movement and Backpack Mechanics */}
      <style>{`
        @keyframes walkTranslateIn {
          0% { transform: translateX(-140px); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(0px); opacity: 1; }
        }

        @keyframes walkTorsoBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }

        @keyframes walkLegLeft {
          0% { transform: rotate(26deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-22deg); }
          75% { transform: rotate(8deg); }
          100% { transform: rotate(26deg); }
        }

        @keyframes walkLegRight {
          0% { transform: rotate(-22deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(26deg); }
          75% { transform: rotate(2deg); }
          100% { transform: rotate(-22deg); }
        }

        @keyframes walkArmLeft {
          0% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
          100% { transform: rotate(-22deg); }
        }

        @keyframes walkArmRight {
          0% { transform: rotate(20deg); }
          50% { transform: rotate(-18deg); }
          100% { transform: rotate(20deg); }
        }

        @keyframes backpackSwayInHand {
          0% { transform: rotate(-8deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(-8deg); }
        }

        @keyframes walkShadowPulse {
          0%, 50%, 100% { transform: scaleX(1); opacity: 0.35; }
          25%, 75% { transform: scaleX(0.75); opacity: 0.22; }
        }

        @keyframes unzippingHands {
          0% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          100% { transform: translateX(-4px); }
        }

        @keyframes glowBurst {
          0% { opacity: 0.3; transform: scale(0.8) translateY(10px); }
          50% { opacity: 1; transform: scale(1.15) translateY(-5px); }
          100% { opacity: 0.8; transform: scale(1) translateY(0); }
        }

        @keyframes cardEmergeFromBackpack {
          0% {
            transform: scale(0.06) translateY(220px) translateX(-100px);
            opacity: 0;
            filter: blur(8px) brightness(2);
          }
          40% {
            opacity: 0.9;
            filter: blur(2px) brightness(1.3);
          }
          80% {
            transform: scale(1.03) translateY(-10px) translateX(0);
            opacity: 1;
            filter: blur(0) brightness(1);
          }
          100% {
            transform: scale(1) translateY(0) translateX(0);
            opacity: 1;
            filter: blur(0) brightness(1);
          }
        }

        @keyframes idleLeanBreathing {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3.5px) rotate(0.4deg);
          }
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* Deep Forest Emerald (#102719) Modal Container */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto text-left border border-emerald-500/25 transition-all"
        style={{
          backgroundColor: '#102719',
          backgroundImage: 'radial-gradient(circle at 50% 20%, #153c25 0%, #102719 65%, #08160e 100%)',
          boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.85), 0 0 50px rgba(16, 39, 25, 0.6), inset 0 1px 0 rgba(52, 211, 153, 0.2)'
        }}
      >
        {/* Subtle Ambient Light Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-emerald-500/20 bg-black/25 backdrop-blur-xs relative z-30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              {mode === 'register' 
                ? (t.modalHeader || 'UstozPro • Ro\'yxatdan o\'tish') 
                : 'UstozPro • Tizimga kirish'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {phase !== 'ready' ? (
              <button
                type="button"
                onClick={handleSkipAnimation}
                className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/80 px-3 py-1.5 rounded-xl border border-emerald-500/30 transition shadow-xs cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.skipAnimation || 'O\'tkazib yuborish'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReplayAnimation}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-100 hover:text-white px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-500/30 transition shadow-xs cursor-pointer"
                title={t.replayAnimation || 'Qayta ko\'rish'}
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline text-[11px] font-bold">{t.replayAnimation || 'Qayta ko\'rish'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/15 transition cursor-pointer"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN STAGE (Walking -> Crouching -> Card Pops Out -> Leaning) */}
        {/* ============================================================== */}
        <div className="relative w-full p-4 sm:p-8 min-h-[470px] sm:min-h-[530px] flex items-center justify-center">

          {/* ============================================================ */}
          {/* PHASES 1 & 2: CHARACTER WALKING IN & PLACING RYUGZAK ON FLOOR */}
          {/* ============================================================ */}
          {(phase === 'walking' || phase === 'placing') && (
            <div className="w-full flex flex-col items-center justify-center py-8 relative">
              
              {/* Floor Perspective Shadow */}
              <div className="absolute bottom-6 w-64 h-6 bg-black/40 rounded-full blur-md" />

              {/* ======================================================== */}
              {/* PHASE 1: WALKING FROM LEFT WITH ARTICULATED REALISTIC LIMBS */}
              {/* ======================================================== */}
              {phase === 'walking' && (
                <div 
                  className="flex flex-col items-center"
                  style={{
                    animation: 'walkTranslateIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards'
                  }}
                >
                  <div className="w-44 sm:w-52 h-64 sm:h-76 relative">
                    <svg viewBox="0 0 220 280" className="w-full h-full drop-shadow-2xl" fill="none">
                      
                      {/* Dynamic Ground Shadow */}
                      <ellipse 
                        cx="110" 
                        cy="255" 
                        rx="48" 
                        ry="10" 
                        fill="rgba(0,0,0,0.35)" 
                        style={{
                          transformOrigin: '110px 255px',
                          animation: 'walkShadowPulse 0.8s infinite ease-in-out'
                        }}
                      />

                      {/* LEFT LEG (Back Leg - in Walking Stride) */}
                      <g 
                        style={{
                          transformOrigin: '105px 150px',
                          animation: 'walkLegLeft 0.8s infinite ease-in-out'
                        }}
                      >
                        {/* Dark Charcoal Trousers (Back leg) */}
                        <path d="M102 150 L90 195 L80 240" stroke="#0f172a" strokeWidth="16" strokeLinecap="round" />
                        {/* White Sneaker */}
                        <path d="M68 240 L94 240 L92 249 L65 249 Z" fill="#ffffff" />
                        <rect x="65" y="246" width="28" height="3" fill="#cbd5e1" />
                      </g>

                      {/* RIGHT LEG (Front Leg - in Walking Stride) */}
                      <g 
                        style={{
                          transformOrigin: '115px 150px',
                          animation: 'walkLegRight 0.8s infinite ease-in-out'
                        }}
                      >
                        {/* Dark Charcoal Trousers (Front leg) */}
                        <path d="M115 150 L125 195 L140 238" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />
                        {/* White Sneaker */}
                        <path d="M130 238 L156 238 L154 247 L126 247 Z" fill="#ffffff" />
                        <rect x="126" y="244" width="29" height="3" fill="#cbd5e1" />
                      </g>

                      {/* UPPER BODY GROUP (Bobs up and down realistically with stride) */}
                      <g 
                        style={{
                          animation: 'walkTorsoBob 0.4s infinite ease-in-out'
                        }}
                      >
                        {/* LEFT ARM (Swinging naturally backward) */}
                        <g 
                          style={{
                            transformOrigin: '92px 85px',
                            animation: 'walkArmLeft 0.8s infinite ease-in-out'
                          }}
                        >
                          <path d="M92 85 L76 122 L68 150" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
                          <circle cx="68" cy="151" r="7" fill="#fed7aa" />
                        </g>

                        {/* TORSO & JACKET */}
                        <path d="M85 80 L135 80 L138 152 L82 152 Z" fill="#94a3b8" />
                        <path d="M96 80 L106 125 L110 152 L82 152 Z" fill="#cbd5e1" />
                        <path d="M125 80 L115 125 L110 152 L138 152 Z" fill="#64748b" />

                        {/* White Shirt Neckline */}
                        <path d="M104 76 L110 90 L118 76 Z" fill="#ffffff" />

                        {/* NECK & HEAD */}
                        <path d="M106 65 L118 65 L116 78 L108 78 Z" fill="#fed7aa" />
                        <circle cx="112" cy="46" r="20" fill="#fed7aa" />

                        {/* Blond Combed Hair with Dimension */}
                        <path d="M94 40 C94 22 130 22 132 38 C132 46 128 48 124 48 C120 48 118 40 112 40 C106 40 100 44 94 40 Z" fill="#f59e0b" />
                        <path d="M102 28 C108 24 122 24 126 32" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Eye, Eyebrow & Determined Confident Smile */}
                        <circle cx="124" cy="46" r="2.5" fill="#1e293b" />
                        <path d="M121 40 Q124 38 128 40" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M120 54 Q125 57 128 53" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

                        {/* RIGHT ARM & RYUGZAK (Swinging forward, holding backpack handle) */}
                        <g 
                          style={{
                            transformOrigin: '128px 85px',
                            animation: 'walkArmRight 0.8s infinite ease-in-out'
                          }}
                        >
                          <path d="M128 85 L138 122 L142 155" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
                          <circle cx="142" cy="156" r="7" fill="#fed7aa" />

                          {/* RYUGZAK (Backpack) hanging in hand with natural pendulum sway */}
                          <g 
                            style={{
                              transformOrigin: '142px 156px',
                              animation: 'backpackSwayInHand 0.8s infinite ease-in-out'
                            }}
                          >
                            <path d="M136 156 C136 148 148 148 148 156" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                            <rect x="126" y="156" width="36" height="34" rx="8" fill="#78350f" />
                            <rect x="128" y="158" width="32" height="30" rx="7" fill="#92400e" />
                            <rect x="131" y="168" width="26" height="16" rx="4" fill="#78350f" />
                            <line x1="134" y1="172" x2="154" y2="172" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,2" />
                            <circle cx="144" cy="172" r="2" fill="#fbbf24" />
                            <path d="M127 162 L124 184" stroke="#5a2507" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M161 162 L164 184" stroke="#5a2507" strokeWidth="2.5" strokeLinecap="round" />
                          </g>
                        </g>

                      </g>
                    </svg>
                  </div>

                  {/* Character Walking Label */}
                  <div className="mt-3 text-xs font-semibold text-emerald-200/80 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/20 animate-pulse flex items-center space-x-1.5">
                    <span>🎒</span>
                    <span>UstozPro kelmoqda...</span>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* PHASE 2: CROUCHING DOWN & UNZIPPING RYUGZAK IN THE CENTER */}
              {/* ======================================================== */}
              {phase === 'placing' && (
                <div className="flex flex-col items-center animate-fadeIn transition-all">
                  <div className="w-52 sm:w-60 h-60 sm:h-68 relative">
                    <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-2xl" fill="none">
                      
                      {/* Floor Contact Shadow */}
                      <ellipse cx="110" cy="190" rx="65" ry="14" fill="rgba(0,0,0,0.4)" />

                      {/* CROUCHED LEGS & SNEAKERS */}
                      <path d="M65 145 L48 172 L76 186" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M120 145 L138 172 L110 186" stroke="#0f172a" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="62" y="180" width="26" height="11" rx="4" fill="#ffffff" />
                      <rect x="105" y="180" width="26" height="11" rx="4" fill="#ffffff" />

                      {/* TORSO BENT OVER RYUGZAK */}
                      <path d="M68 95 L128 110 L118 152 L58 142 Z" fill="#94a3b8" />
                      <path d="M78 100 L122 113 L114 148 L70 142 Z" fill="#cbd5e1" />

                      {/* HEAD LOOKING DOWN AT RYUGZAK */}
                      <circle cx="132" cy="90" r="19" fill="#fed7aa" />
                      <path d="M120 78 C122 62 148 68 150 82 C150 92 140 92 132 89 Z" fill="#f59e0b" />
                      <circle cx="138" cy="94" r="2.5" fill="#1e293b" />

                      {/* ARMS REACHING DOWN UNZIPPING THE RYUGZAK */}
                      <g style={{ animation: 'unzippingHands 1.2s infinite ease-in-out' }}>
                        <path d="M100 110 L115 145 L112 165" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
                        <path d="M85 105 L100 145 L108 165" stroke="#64748b" strokeWidth="14" strokeLinecap="round" />
                        <circle cx="112" cy="165" r="6" fill="#fed7aa" />
                        <circle cx="106" cy="165" r="6" fill="#fed7aa" />
                      </g>

                      {/* RYUGZAK (Backpack) ON THE FLOOR WITH OPENING ZIPPER */}
                      <g transform="translate(95, 148)">
                        <rect x="0" y="0" width="50" height="38" rx="10" fill="#78350f" />
                        <rect x="3" y="3" width="44" height="32" rx="8" fill="#92400e" />
                        
                        <rect x="8" y="14" width="34" height="18" rx="5" fill="#78350f" />
                        <circle cx="25" cy="18" r="2" fill="#fbbf24" />

                        {/* Open Top Zipper Flap parted with magical glowing aura inside */}
                        <path d="M0 2 L50 2 L45 -12 L5 -12 Z" fill="#a16207" />
                        
                        {/* Glowing Emerald / Golden Core */}
                        <ellipse 
                          cx="25" 
                          cy="3" 
                          rx="18" 
                          ry="6" 
                          fill="#34d399" 
                          style={{
                            animation: 'glowBurst 1.2s infinite ease-in-out'
                          }}
                        />
                        <ellipse cx="25" cy="3" rx="12" ry="3" fill="#fef08a" />
                        <rect x="22" y="14" width="6" height="5" rx="1.5" fill="#f59e0b" />
                      </g>

                      {/* Floating magical sparkle rays shooting upwards */}
                      <circle cx="115" cy="142" r="3" fill="#fef08a" className="animate-ping" />
                      <circle cx="125" cy="138" r="2" fill="#34d399" className="animate-pulse" />
                      <circle cx="132" cy="145" r="2.5" fill="#6ee7b7" className="animate-bounce" />
                    </svg>
                  </div>

                  {/* Placing Hint */}
                  <div className="mt-2 text-xs font-bold text-amber-300 bg-emerald-950/70 px-4 py-1.5 rounded-full border border-amber-400/30 flex items-center space-x-2 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                    <span>{t.backpackPuff || 'Ryukzak ochilmoqda...'}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* PHASES 3 & 4: CARD RISES OUT OF RYUGZAK & MAN LEANS CASUALLY */}
          {/* ============================================================ */}
          {(phase === 'card_popping' || phase === 'ready') && (
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-700">
              
              {/* ======================================================== */}
              {/* LEFT COLUMN: MAN LEANING CASUALLY AGAINST THE FORM CARD */}
              {/* ======================================================== */}
              <div 
                className="flex flex-col items-center justify-end relative flex-shrink-0 animate-fadeIn"
                style={{
                  animation: phase === 'ready' ? 'idleLeanBreathing 4s ease-in-out infinite' : 'none'
                }}
              >
                {/* Friendly Speech Badge */}
                <div 
                  className="mb-2 bg-emerald-900/80 backdrop-blur-md text-emerald-100 font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-400/30 shadow-lg flex items-center space-x-1.5"
                  style={{ animation: 'floatBadge 3s ease-in-out infinite' }}
                >
                  <span>👋</span>
                  <span>{t.welcomeCharacter || 'Xush kelibsiz!'}</span>
                </div>

                {/* Character SVG in Leaning Pose with arms propped against card & legs crossed */}
                <div className="w-40 sm:w-48 md:w-56 h-72 sm:h-84 md:h-96 relative">
                  <svg viewBox="0 0 170 290" className="w-full h-full drop-shadow-2xl" fill="none">
                    
                    {/* Shadow on Floor */}
                    <ellipse cx="85" cy="272" rx="55" ry="12" fill="rgba(0,0,0,0.4)" />

                    {/* OPEN RYUGZAK RESTING ON FLOOR BESIDE HIS SHOE */}
                    <g transform="translate(16, 240)">
                      <rect x="0" y="0" width="38" height="26" rx="6" fill="#78350f" />
                      <rect x="2" y="2" width="34" height="22" rx="5" fill="#92400e" />
                      <path d="M0 0 L38 0 L34 -9 L4 -9 Z" fill="#a16207" />
                      <ellipse cx="19" cy="1" rx="14" ry="4" fill="#34d399" opacity="0.9" />
                      <ellipse cx="19" cy="1" rx="9" ry="2.5" fill="#fef08a" />
                      <rect x="16" y="9" width="6" height="4" rx="1" fill="#f59e0b" />
                      <path d="M4 22 C -6 24 -4 28 8 26" stroke="#5a2507" strokeWidth="2.5" fill="none" />
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

                    {/* ARMS PROPPED / LEANING AGAINST THE CARD EDGE */}
                    <path d="M114 88 L138 120 L115 132" stroke="#64748b" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M64 88 L54 122 L98 132" stroke="#94a3b8" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="115" cy="132" r="6.5" fill="#fed7aa" />
                    <circle cx="98" cy="132" r="6.5" fill="#fed7aa" />

                    {/* NECK & HEAD */}
                    <path d="M82 70 L94 70 L92 82 L84 82 Z" fill="#fed7aa" />
                    <circle cx="88" cy="48" r="21" fill="#fed7aa" />

                    {/* BLOND COMBED HAIR */}
                    <path d="M70 40 C70 20 108 20 110 38 C110 46 106 48 102 48 C98 48 96 40 90 40 C84 40 78 44 70 40 Z" fill="#f59e0b" />
                    <path d="M78 30 C84 26 100 26 104 34" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />

                    {/* EYES, EYEBROWS & FRIENDLY CONFIDENT SMILE */}
                    <circle cx="82" cy="48" r="2.5" fill="#1e293b" />
                    <circle cx="96" cy="48" r="2.5" fill="#1e293b" />
                    <path d="M79 42 Q82 40 86 42" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M93 42 Q96 40 100 42" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M84 57 Q89 62 94 57" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Leaning Contact Point Sparkle */}
                    <circle cx="140" cy="120" r="3" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>
              </div>

              {/* ======================================================== */}
              {/* RIGHT COLUMN: THE REGISTRATION FORM (Emerging out of Ryugzak) */}
              {/* ======================================================== */}
              <div 
                className="flex-1 w-full max-w-lg transition-all duration-700 ease-out z-20"
                style={{
                  animation: phase === 'card_popping' 
                    ? 'cardEmergeFromBackpack 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
                    : 'none'
                }}
              >
                {/* Form Card on #102719 Theme */}
                <div className="bg-[#0b1f14]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-emerald-500/35 text-white">
                  
                  {/* Mode Tabs: Ro'yxatdan o'tish vs Kirish */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/20">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {mode === 'register' ? (t.title || 'Ro‘yxatdan o‘tish') : 'Tizimga kirish'}
                      </h2>
                      <p className="text-xs text-emerald-200/80 mt-0.5">
                        {mode === 'register' 
                          ? (t.subtitle || 'UstozPro platformasiga xush kelibsiz!') 
                          : 'Shaxsiy kabinetingizga kiring'}
                      </p>
                    </div>

                    <div className="flex bg-black/40 p-1 rounded-xl border border-emerald-500/30 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setMode('register')}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
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
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          mode === 'login'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-emerald-300 hover:text-white'
                        }`}
                      >
                        Kirish
                      </button>
                    </div>
                  </div>

                  {/* Role Selector: Student vs Mentor (Only on register mode) */}
                  {mode === 'register' && (
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`p-2.5 rounded-2xl border text-left transition flex items-center space-x-2.5 cursor-pointer ${
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
                        className={`p-2.5 rounded-2xl border text-left transition flex items-center space-x-2.5 cursor-pointer ${
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

                  {/* Form with Crisp White Rounded Input Pills */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    
                    {/* Full Name Input Pill (only for register) */}
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

                    {/* Contact (Phone / Email) Input Pill */}
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

                    {/* Password Input Pill */}
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
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Agreement Checkbox (only on register) */}
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

                    {/* NEXT / Submit Button */}
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

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setFullName('Google Foydalanuvchi');
                          setContact('user@gmail.com');
                          setPassword('google123456');
                        }}
                        className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-emerald-500/30 rounded-xl bg-black/30 hover:bg-black/50 text-xs font-semibold text-white transition cursor-pointer"
                      >
                        <span className="font-bold text-blue-400">G</span>
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFullName('Telegram Foydalanuvchi');
                          setContact('+998 90 999-88-77');
                          setPassword('telegram123456');
                        }}
                        className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-emerald-500/30 rounded-xl bg-black/30 hover:bg-black/50 text-xs font-semibold text-white transition cursor-pointer"
                      >
                        <span className="font-bold text-sky-400">✈️</span>
                        <span>Telegram</span>
                      </button>
                    </div>

                    {/* Switch to login / register & Brand Badge */}
                    <div className="text-center pt-1 flex items-center justify-between text-xs text-emerald-200/70">
                      <div>
                        {mode === 'register' ? (
                          <>
                            <span>{t.haveAccount || 'Allaqachon akkountingiz bormi?'} </span>
                            <button
                              type="button"
                              onClick={() => setMode('login')}
                              className="font-bold text-emerald-300 hover:text-white hover:underline cursor-pointer"
                            >
                              {t.login || 'Kirish'}
                            </button>
                          </>
                        ) : (
                          <>
                            <span>Yangi foydalanuvchimisiz? </span>
                            <button
                              type="button"
                              onClick={() => setMode('register')}
                              className="font-bold text-emerald-300 hover:text-white hover:underline cursor-pointer"
                            >
                              Ro‘yxatdan o‘tish
                            </button>
                          </>
                        )}
                      </div>

                      <span className="text-[10px] font-bold text-emerald-300/80 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        Powered by UstozPro
                      </span>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
