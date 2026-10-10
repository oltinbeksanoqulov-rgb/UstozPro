import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Bookmark, 
  Wallet, 
  Video, 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserState, Course, UserBooking } from '../types';
import { COURSES } from '../data/mockData';

interface DashboardViewProps {
  userState: UserState;
  onOpenWallet: () => void;
  onOpenLive: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userState,
  onOpenWallet,
  onOpenLive,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'courses' | 'earnings'>('schedule');
  const [currentRole, setCurrentRole] = useState<'student' | 'mentor' | 'admin'>(userState.role);

  return (
    <div className="py-12 bg-slate-100 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-slate-900">
                  {userState.name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Tasdiqlangan
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{userState.email} • {userState.phone}</p>
              
              {/* Role Toggle pill */}
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">Rejim:</span>
                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    onClick={() => setCurrentRole('student')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      currentRole === 'student'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    O'quvchi
                  </button>
                  <button
                    onClick={() => setCurrentRole('mentor')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      currentRole === 'mentor'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Ustoz / Sotuvchi
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Balance widget */}
          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {currentRole === 'student' ? 'Hamyon balansi' : 'Ishlab topilgan daromad'}
              </span>
              <span className="text-xl font-black text-slate-900">
                {userState.balance.toLocaleString()} so'm
              </span>
            </div>
            <button
              onClick={onOpenWallet}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              {currentRole === 'student' ? "To'ldirish" : "Yechib olish"}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Band qilingan darslar</span>
            <p className="text-2xl font-black text-slate-900">
              {userState.bookings.length} ta
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Faol kurslar</span>
            <p className="text-2xl font-black text-emerald-700">2 ta</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">O'rganish soatlari</span>
            <p className="text-2xl font-black text-blue-700">18.5 soat</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">AI yo'l xaritasi</span>
            <p className="text-2xl font-black text-purple-700">Faol (98%)</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Mening darslarim & Uchrashuvlar</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Olingan Video Kurslar</span>
          </button>
        </div>

        {/* Tab 1: Schedule & Bookings */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {userState.bookings.length > 0 ? (
              userState.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {booking.title}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Ustoz: {booking.providerName}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-600 mt-2 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          {booking.date}
                        </span>
                        {booking.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            {booking.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href={booking.meetLink || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Video className="w-4 h-4" />
                      <span>Xonaga kirish</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">Hozircha rejalashtirilgan darslar yo'q</h4>
                <p className="text-xs text-slate-500">
                  Ustozlar bo'limidan individual dars yoki konsultatsiya bron qiling.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSES.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start space-x-3.5">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500">{course.instructor}</p>
                    <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                      14 / {course.lessonsCount} dars ko'rilgan (42%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-[42%]" />
                </div>

                <button
                  onClick={onOpenLive}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Darsni davom ettirish</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
