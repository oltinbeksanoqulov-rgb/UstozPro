import React, { useState } from 'react';
import { X, Wallet, ArrowDownRight, ArrowUpRight, Plus, ShieldCheck, Check } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onTopUp: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  onTopUp,
}) => {
  if (!isOpen) return null;

  const [topUpAmount, setTopUpAmount] = useState('100000');
  const [selectedGateway, setSelectedGateway] = useState<'click' | 'payme' | 'uzum'>('click');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const presets = [50000, 100000, 200000, 500000];

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(topUpAmount);
    if (!val || val <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      onTopUp(val);
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">UstozPro Hamyoni</h3>
              <p className="text-xs text-slate-400">Xavfsiz to'lov va hisob-kitob</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Display */}
        <div className="p-6 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white space-y-2">
          <span className="text-xs text-emerald-200 font-semibold uppercase tracking-wider block">
            Joriy balansingiz:
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-black">
              {balance.toLocaleString()}
            </span>
            <span className="text-base font-semibold text-emerald-200">so'm</span>
          </div>
          <p className="text-[11px] text-emerald-100 flex items-center gap-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Barcha to'lovlar Escrow kafolati bilan himoyalangan
          </p>
        </div>

        {/* Top Up Form */}
        <div className="p-6 space-y-4 text-left">
          {showSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center space-y-1">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-sm">Hamyon muvaffaqiyatli to'ldirildi!</p>
            </div>
          ) : (
            <form onSubmit={handleTopUpSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  To'ldirish summasi (so'm)
                </label>
                <input
                  type="number"
                  min={10000}
                  step={10000}
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-4 gap-2">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTopUpAmount(val.toString())}
                    className="p-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition border border-slate-200"
                  >
                    +{(val / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>

              {/* Payment Gateway */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  To'lov tizimi
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('click')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      selectedGateway === 'click'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Click</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('payme')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      selectedGateway === 'payme'
                        ? 'border-teal-600 bg-teal-50 text-teal-700 ring-2 ring-teal-500/20'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Payme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('uzum')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      selectedGateway === 'uzum'
                        ? 'border-violet-600 bg-violet-50 text-violet-700 ring-2 ring-violet-500/20'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Uzum</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{isProcessing ? "To'ldirilmoqda..." : "Balansni to'ldirish"}</span>
              </button>
            </form>
          )}

          {/* Mini Transaction history */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Oxirgi amaliyotlar:
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-slate-700">
                <div className="flex items-center gap-1.5">
                  <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Xush kelibsiz bonusi</span>
                </div>
                <span className="font-bold text-emerald-700">+450 000 so'm</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
