import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  BookOpen, 
  Compass, 
  FileText,
  Clock,
  Award
} from 'lucide-react';
import { MENTORS, COURSES } from '../data/mockData';
import { Mentor, Course } from '../types';

interface AiMentorAssistantProps {
  onSelectMentor: (mentor: Mentor) => void;
  onSelectCourse: (course: Course) => void;
}

export const AiMentorAssistant: React.FC<AiMentorAssistantProps> = ({
  onSelectMentor,
  onSelectCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'matcher' | 'chat' | 'syllabus'>('matcher');
  
  // Matcher state
  const [goalText, setGoalText] = useState('');
  const [budgetVal, setBudgetVal] = useState('200000');
  const [timeCommitment, setTimeCommitment] = useState('5-10 soat');
  const [matcherResult, setMatcherResult] = useState<{
    roadmap: string[];
    recommendedMentor: Mentor;
    recommendedCourse: Course;
    summary: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Salom! Men UstozPro AI sun'iy intellekt ta'lim yordamchisiman. Sizga qaysi fan, til yoki kasb bo'yicha yordam beray? Shuningdek, sizga mos ustoz va o'quv rejasini tuzib berishim mumkin.",
      time: '12:00',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Syllabus generator state
  const [syllabusTopic, setSyllabusTopic] = useState('');
  const [generatedSyllabus, setGeneratedSyllabus] = useState<string | null>(null);

  const handleRunMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      // Intelligently select based on prompt
      const lower = goalText.toLowerCase();
      let mentor = MENTORS[0]; // Frontend
      let course = COURSES[0];
      let roadmap = [
        "1-bosqich: Asosiy fundamental bilimlar va vositalar bilan tanishish (2 hafta)",
        "2-bosqich: Ustoz bilan 1-on-1 amaliy loyiha ustida ishlash (4 hafta)",
        "3-bosqich: Test sinovlari, rezyume audit va yakuniy sertifikat (2 hafta)",
      ];

      if (lower.includes('ingliz') || lower.includes('ielts') || lower.includes('english')) {
        mentor = MENTORS[1];
        course = COURSES[1];
        roadmap = [
          "1-bosqich: Grammatika va faol so'z boyligini kengaytirish (B1 -> B2)",
          "2-bosqich: IELTS Speaking Part 1, 2, 3 bo'yicha jonli mock suhbatlar",
          "3-bosqich: Writing Task 1 & 2 shablonlari va yakuniy imtihon simulyatsiyasi",
        ];
      } else if (lower.includes('matematika') || lower.includes('dtm') || lower.includes('maktab')) {
        mentor = MENTORS[2];
        course = COURSES[2];
        roadmap = [
          "1-bosqich: Algebra formulalari va murakkab tenglamalarni tez yechish usullari",
          "2-bosqich: Geometriya teoremalari va fazoviy shakllar",
          "3-bosqich: Milliy sertifikat va DTM test variantlarini yechish",
        ];
      } else if (lower.includes('ai') || lower.includes('sun\'iy') || lower.includes('chatgpt') || lower.includes('python')) {
        mentor = MENTORS[3];
        course = COURSES[5];
        roadmap = [
          "1-bosqich: Python sintaksisi va Prompt Engineering chuqur texnikalari",
          "2-bosqich: OpenAI / Claude API integratsiyasi va Telegram bot yaratish",
          "3-bosqich: RAG va maxsus AI agentlar arxitekturasi",
        ];
      }

      setMatcherResult({
        roadmap,
        recommendedMentor: mentor,
        recommendedCourse: course,
        summary: `Sizning "${goalText}" maqsadingiz bo'yicha AI tahlil qilindi. Sizga haftalik ${timeCommitment} dars rejasi va mos ustoz tanlandi.`,
      });
      setIsGenerating(false);
    }, 900);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Ajoyib savol! Ushbu mavzuni to'liq o'rganish uchun platformamizdagi tajribali ustozlar bilan 1-on-1 konsultatsiya olishingiz yoki kurslarimizdan foydalanishingiz mumkin.";
      const q = userText.toLowerCase();

      if (q.includes('react') || q.includes('hook') || q.includes('useeffect')) {
        reply = "React da `useState` komponentning ichki holatini (state) saqlash uchun ishlatiladi. `useEffect` esa nojo'ya ta'sirlarni (API dan ma'lumot olish, event listener qo'shish, DOM bilan ishlash) boshqarish uchun qo'llaniladi. Batafsil ustozimiz Azizbek Rahmonov bilan 1-on-1 darsda o'rganishingiz mumkin!";
      } else if (q.includes('ielts') || q.includes('speaking')) {
        reply = "IELTS Speaking da 7.5+ olish uchun 4 asosiy mezon bor: 1) Fluency (ravonlik), 2) Lexical Resource (idioma va sinonimlar), 3) Grammatical Accuracy, 4) Pronunciation. Dilshodbek Karimov bilan 40 daqiqalik mock imtihon olsangiz, barcha kamchiliklaringiz aniqlanadi.";
      } else if (q.includes('mahorat') || q.includes('pul') || q.includes('daromad')) {
        reply = "UstozPro da har qanday mutaxassis o'z mahoratini sota oladi! 'Mahorat sotish' tugmasini bosing, xizmatingiz narxini va muddatini kiriting. O'quvchilar sizning xizmatingizni sotib olishganda pulingiz shaxsiy hamyoningizga tushadi.";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 700);
  };

  const handleGenerateSyllabus = () => {
    if (!syllabusTopic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedSyllabus(`### 📋 AI Dars Rejasi: ${syllabusTopic}
      
**1-Hafta: Kirish va fundamental tushunchalar**
- Mavzu 1.1: Asosiy printsiplar va tushunchalar bilan tanishuv
- Amaliy mashq: Birinchi kichik topshiriqni mustaqil bajarish
- Test savoli: 5 ta asosiy atamani tushuntirib berish

**2-Hafta: Chuqur amaliyot va vositalar**
- Mavzu 2.1: Asosiy instrumentlar va real amaliy keyslar
- Dars vazifasi: Mini-loyiha ishlab chiqish
- Ustoz feedbacki: Xatolar ustida ishlash

**3-Hafta: Murakkab vazifalar va optimizatsiya**
- Mavzu 3.1: Professional darajadagi yondashuvlar
- Yakuniy keys: Portfolioga qo'shiladigan loyiha

**4-Hafta: Yakuniy imtihon & Baholash**
- Individual taqdimot va sertifikat topshirish`);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-violet-500/20 border border-violet-400/30 px-3.5 py-1 rounded-full text-violet-200 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>UstozPro AI Ta'lim Dvigateli</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              AI Ustoz & Ta'lim Navigatori
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Maqsadingizni yozing — sun'iy intellekt siz uchun shaxsiy ta'lim yo'l xaritasini (roadmap) tuzadi, eng mos ustozni topib beradi va 24/7 savollaringizga javob beradi.
            </p>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center space-x-3 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matcher'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Ustoz Matcher & Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>24/7 AI Repititor Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ustozlar uchun: AI Dars Rejasi</span>
          </button>
        </div>

        {/* TAB 1: SMART MATCHER */}
        {activeTab === 'matcher' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form (Left) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Maqsadingizni belgilang
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sun'iy intellekt sizning maqsadingiz, vaqtingiz va byudjetingiz asosida eng samarali yo'lni hisoblab chiqadi.
                </p>
              </div>

              <form onSubmit={handleRunMatcher} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nima o'rganmoqchisiz yoki qanday natijaga erishmoqchisiz?
                  </label>
                  <textarea
                    rows={3}
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    placeholder="Masalan: 3 oyda ingliz tilida erkin gaplashmoqchiman / Frontend dasturchi bo'lib ishga kirmoqchiman..."
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Haftalik vaqtingiz
                    </label>
                    <select
                      value={timeCommitment}
                      onChange={(e) => setTimeCommitment(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-600 bg-white"
                    >
                      <option value="3-5 soat">3 - 5 soat</option>
                      <option value="5-10 soat">5 - 10 soat</option>
                      <option value="15+ soat">15+ soat (Intensiv)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Oylik byudjet
                    </label>
                    <select
                      value={budgetVal}
                      onChange={(e) => setBudgetVal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-violet-600 bg-white"
                    >
                      <option value="150000">150 000 so'mgacha</option>
                      <option value="300000">300 000 so'mgacha</option>
                      <option value="500000">500 000+ so'm</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGenerating ? "AI hisoblamoqda..." : "AI Tahlilni Boshlash"}</span>
                </button>
              </form>

              {/* Sample quick prompts */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block mb-2">
                  Misol tariqasida tanlab ko'ring:
                </span>
                <div className="space-y-1.5">
                  {[
                    "Frontend React dasturchi bo'lmoqchiman",
                    "IELTS 7.5 Speaking imtihoniga tayyorlanish",
                    "Matematikadan Milliy sertifikat olish",
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGoalText(sample)}
                      className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-800 text-xs font-medium transition border border-slate-100"
                    >
                      ✨ {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Presentation (Right) */}
            <div className="lg:col-span-7 space-y-6">
              {matcherResult ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-violet-200 shadow-card space-y-6 animate-fadeIn">
                  
                  {/* Result Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base">
                          AI Shaxsiy Ta'lim Rejasi
                        </h4>
                        <span className="text-xs font-semibold text-emerald-600">
                          Moslik darajasi: 98.4%
                        </span>
                      </div>
                    </div>

                    <span className="bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1 rounded-full border border-violet-200">
                      UstozPro AI Verified
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-violet-50/50 p-4 rounded-2xl border border-violet-100">
                    {matcherResult.summary}
                  </p>

                  {/* 3-Step Roadmap */}
                  <div className="space-y-3">
                    <h5 className="font-black text-xs uppercase tracking-wider text-slate-400">
                      Tavsiya etilgan Yo'l Xaritasi (Roadmap)
                    </h5>
                    <div className="space-y-2">
                      {matcherResult.roadmap.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium"
                        >
                          <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                            {sIdx + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Mentor Card */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
                      👨‍🏫 Sizga eng mos Ustoz:
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={matcherResult.recommendedMentor.avatar}
                          alt={matcherResult.recommendedMentor.name}
                          className="w-12 h-12 rounded-xl object-cover border border-emerald-300"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {matcherResult.recommendedMentor.name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {matcherResult.recommendedMentor.title}
                          </p>
                          <span className="text-xs font-bold text-emerald-700">
                            ⭐ {matcherResult.recommendedMentor.rating} ({matcherResult.recommendedMentor.reviewsCount} ta baho)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectMentor(matcherResult.recommendedMentor)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                      >
                        Ustozni bron qilish
                      </button>
                    </div>
                  </div>

                  {/* Recommended Course Card */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide block">
                      📚 Tavsiya etilgan Video Kurs:
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={matcherResult.recommendedCourse.thumbnail}
                          alt={matcherResult.recommendedCourse.title}
                          className="w-14 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {matcherResult.recommendedCourse.title}
                          </h4>
                          <span className="text-xs font-bold text-blue-700">
                            {matcherResult.recommendedCourse.price.toLocaleString()} so'm
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectCourse(matcherResult.recommendedCourse)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                      >
                        Kursga yozilish
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">
                      AI Tahlil Natijalari Shu Yerda Ko'rinadi
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      Chap tarafdagi shaklni to'ldiring va sun'iy intellekt sizga mos ustoz hamda yo'l xaritasini soniyalarda tuzib beradi.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: AI REPITITOR CHAT */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">UstozPro AI Repititor</h3>
                  <span className="text-emerald-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online • 24/7 javob beradi
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">LLM Turbo 2.0</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-violet-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[10px] block text-right mt-1.5 ${msg.sender === 'user' ? 'text-violet-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-200 bg-slate-50 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Savolingizni yozing (masalan: React da useState qanday ishlaydi?)..."
                className="flex-1 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-600"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl transition shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: AI SYLLABUS GENERATOR (For Mentors) */}
        {activeTab === 'syllabus' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Ustozlar uchun: 1 Bosishda AI Dars Rejasi Yaratish
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kurs yoki dars mavzuingizni kiriting — sun'iy intellekt professional 4 haftalik o'quv dasturi, amaliy topshiriqlar va test savollarini tuzib beradi.
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={syllabusTopic}
                onChange={(e) => setSyllabusTopic(e.target.value)}
                placeholder="Dars mavzusi: masalan, 'Python Django bilan REST API yaratish'..."
                className="flex-1 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-violet-600"
              />
              <button
                onClick={handleGenerateSyllabus}
                disabled={isGenerating}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Reja tuzish</span>
              </button>
            </div>

            {generatedSyllabus && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2 whitespace-pre-line font-mono">
                {generatedSyllabus}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
