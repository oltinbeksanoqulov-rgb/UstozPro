import React, { useState, useEffect, useRef } from 'react';
import { LiveSession } from '../types';
import { LIVE_SESSIONS } from '../data/mockData';
import { 
  Radio, 
  Users, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Hand, 
  Share2, 
  LogOut, 
  Send, 
  Sparkles, 
  Monitor, 
  PenTool, 
  ThumbsUp, 
  HelpCircle,
  Play
} from 'lucide-react';

interface LiveClassRoomProps {
  onJoinSession?: (session: LiveSession) => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  time: string;
  isMe?: boolean;
}

export const LiveClassRoom: React.FC<LiveClassRoomProps> = () => {
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);
  const [inClassroom, setInClassroom] = useState<boolean>(false);
  
  // Classroom controls state
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeView, setActiveView] = useState<'screen' | 'whiteboard'>('screen');
  
  // Live Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Jamshid Aliyev', text: 'Assalomu alaykum ustoz! Ovozingiz yaxshi eshitilmoqda 👍', time: '20:01' },
    { id: '2', sender: 'Azizbek Rahmonov (Ustoz)', text: 'Va alaykum assalom! Bugun React 19 dagi Server Actions va optimistik yangilanishlarni amalda ko\'ramiz.', time: '20:02' },
    { id: '3', sender: 'Malika Qosimova', text: 'Savol bersak bo\'ladimi dars oxirida?', time: '20:04' },
    { id: '4', sender: 'Azizbek Rahmonov (Ustoz)', text: 'Albatta, oxirgi 20 daqiqa jonli savol-javob bo\'ladi.', time: '20:04' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleJoin = (session: LiveSession) => {
    setActiveSession(session);
    setInClassroom(true);
  };

  const handleLeave = () => {
    setInClassroom(false);
    setActiveSession(null);
    setIsHandRaised(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Siz (Talaba)',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulate mentor reaction after 2 seconds
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: `${activeSession?.instructor || 'Ustoz'}`,
          text: 'Rahmat, ajoyib savol! Dars davomida bunga to\'xtalib o\'tamiz.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 2000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If inside interactive classroom */}
        {inClassroom && activeSession ? (
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[85vh]">
            
            {/* Classroom Top Bar */}
            <div className="bg-slate-900 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 bg-red-600/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>JONLI EFIR</span>
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                    {activeSession.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Ustoz: {activeSession.instructor} ({activeSession.instructorRole})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">{activeSession.viewersCount + 1} kishi</span>
                </div>

                <button
                  onClick={handleLeave}
                  className="bg-red-600/90 hover:bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Chiqish</span>
                </button>
              </div>
            </div>

            {/* Main Classroom Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              
              {/* Screen / Presentation Stage (Left / Center) */}
              <div className="lg:col-span-8 bg-slate-950 flex flex-col justify-between p-4 relative border-r border-slate-800/80">
                
                {/* View Switcher: Screen vs Whiteboard */}
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setActiveView('screen')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeView === 'screen'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Dars Ekrani</span>
                  </button>
                  <button
                    onClick={() => setActiveView('whiteboard')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeView === 'whiteboard'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Interaktiv Doska</span>
                  </button>
                </div>

                {/* Simulated Stream / Screen Content */}
                <div className="flex-1 flex items-center justify-center p-4">
                  {activeView === 'screen' ? (
                    <div className="w-full h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative flex flex-col shadow-inner">
                      {/* Code editor / slides simulation */}
                      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full bg-red-500/60 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/60 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/60 inline-block" />
                          <span className="font-mono text-slate-300 ml-2">UstozPro_LiveDemo.tsx</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-mono">1080p 60fps</span>
                      </div>

                      <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 space-y-2 overflow-y-auto leading-relaxed">
                        <p className="text-slate-500">// UstozPro Jonli Dars Mashg'uloti: React 19 + AI Integratsiyasi</p>
                        <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">createMentorSession</span>(userId: string) &#123;</p>
                        <p className="pl-6"><span className="text-purple-400">const</span> session = <span className="text-amber-400">await</span> aiService.matchBestTutor(userId);</p>
                        <p className="pl-6 text-emerald-400">console.log("Ustoz topildi:", session.mentorName);</p>
                        <p className="pl-6"><span className="text-purple-400">return</span> &#123; success: <span className="text-amber-400">true</span>, roomUrl: session.liveUrl &#125;;</p>
                        <p>&#125;</p>
                        <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-sans text-slate-300">
                          <span className="text-amber-400 font-bold block mb-1">💡 Ustoz Eslatmasi:</span>
                          Barcha o'quvchilar ushbu funksiyani o'z loyihalariga sinab ko'rishlari tavsiya etiladi. Savollaringizni o'ng tarafdagi chatga yozing!
                        </div>
                      </div>

                      {/* Floating Instructor Video Circle */}
                      <div className="absolute bottom-4 right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-2xl bg-black group">
                        <img
                          src={activeSession.instructorAvatar}
                          alt={activeSession.instructor}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                          {activeSession.instructor} (Jonli)
                        </div>
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                    </div>
                  ) : (
                    /* Whiteboard view */
                    <div className="w-full h-full bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center text-slate-300 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <PenTool className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Interaktiv Jonli Doska</h3>
                        <p className="text-xs text-slate-400 max-w-sm mt-1">
                          Ustoz chizmalar, formulalar va arxitektura diagrammalarini bu yerda real vaqtda chizib tushuntiradi.
                        </p>
                      </div>
                      <div className="border border-dashed border-slate-700 rounded-xl p-6 w-full max-w-md bg-slate-950/50 text-xs text-slate-400 font-mono">
                        [Diagramma: Talaba &rarr; AI Ustoz Matcher &rarr; 1-on-1 Jonli Xona &rarr; Escrow To'lov]
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Control Bar */}
                <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3 rounded-xl transition font-bold text-xs flex items-center gap-2 ${
                      isMicOn
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isMicOn ? "Mikrofonni o'chirish" : "Mikrofonni yoqish"}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isMicOn ? "Ovozingiz yoqilgan" : "Ovozsiz"}</span>
                  </button>

                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-xl transition font-bold text-xs flex items-center gap-2 ${
                      isVideoOn
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isVideoOn ? "Kamerani o'chirish" : "Kamerani yoqish"}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isVideoOn ? "Kamera yoqilgan" : "Kamera o'chiq"}</span>
                  </button>

                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`p-3 rounded-xl transition font-bold text-xs flex items-center gap-2 ${
                      isHandRaised
                        ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {isHandRaised ? "Qo'l ko'tarilgan ✋" : "Qo'l ko'tarish"}
                    </span>
                  </button>
                </div>

              </div>

              {/* Live Chat Column (Right) */}
              <div className="lg:col-span-4 bg-slate-900 flex flex-col justify-between overflow-hidden">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Jonli Muloqot & Savollar</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded">
                    Real-time
                  </span>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-2xl ${
                        msg.isMe
                          ? 'bg-emerald-950/80 border border-emerald-700/50 ml-6 text-white'
                          : msg.sender.includes('Ustoz')
                          ? 'bg-amber-950/60 border border-amber-600/40 text-amber-100 mr-4'
                          : 'bg-slate-800/80 border border-slate-700 text-slate-200 mr-6'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-[11px] ${
                          msg.isMe ? 'text-emerald-300' : msg.sender.includes('Ustoz') ? 'text-amber-300' : 'text-slate-300'
                        }`}>
                          {msg.sender}
                        </span>
                        <span className="text-[9px] text-slate-400">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input Form */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      placeholder="Savolingizni yozing..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition shadow-xs flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>

              </div>

            </div>

          </div>
        ) : (
          /* Live Sessions Hub View */
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 bg-red-600/30 border border-red-500/40 px-3.5 py-1 rounded-full text-red-200 text-xs font-bold">
                  <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span>UstozPro Live Stream & Vebinarlar</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Jonli Darslar & Interaktiv Sinfxonalar
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Real vaqt rejimida ustozlar bilan muloqot qiling, savollar bering, ekranni kuzating va amaliy topshiriqlarni birga bajaring.
                </p>
              </div>
            </div>

            {/* Sessions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LIVE_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Live status badge */}
                    <div className="flex items-center justify-between">
                      {session.isLive ? (
                        <span className="bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 border border-red-200">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                          HOZIR EFIRDA (Jonli)
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                          {session.startTime}
                        </span>
                      )}

                      <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        {session.registeredCount} / {session.maxSeats} joy
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug">
                      {session.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {session.description}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-3 pt-2">
                      <img
                        src={session.instructorAvatar}
                        alt={session.instructor}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {session.instructor}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {session.instructorRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Chipta narxi
                      </span>
                      <span className="text-base font-black text-emerald-700">
                        {session.isFree ? "Bepul (Ochiq dars)" : `${session.price.toLocaleString()} so'm`}
                      </span>
                    </div>

                    <button
                      onClick={() => handleJoin(session)}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-sm ${
                        session.isLive
                          ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{session.isLive ? "Efirga ulanish" : "Ro'yxatdan o'tish"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
