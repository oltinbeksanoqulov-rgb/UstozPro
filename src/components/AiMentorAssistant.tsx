import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  FileText,
  Star,
  Users,
  BookOpen,
  AlertTriangle,
  RotateCcw,
  SearchX
} from 'lucide-react';
import { MENTORS, COURSES } from '../data/mockData';
import { Mentor, Course } from '../types';

interface AiMentorAssistantProps {
  onSelectMentor: (mentor: Mentor) => void;
  onSelectCourse: (course: Course) => void;
}

// Comprehensive Domain Knowledge Base
interface DomainConfig {
  id: string;
  badge: string;
  keywords: string[];
  mentorId: string;
  courseId: string;
  getRoadmap: (query: string, commitment: string) => string[];
  getSummary: (query: string, commitment: string, mentorName: string) => string;
}

const DOMAIN_CONFIGS: DomainConfig[] = [
  {
    id: 'cooking',
    badge: "Pazandachilik & Milliy Taomlar",
    keywords: [
      'osh', 'palov', 'pazanda', 'pazandachilik', 'ovqat', 'taom', 'oshpaz', 'oshxona',
      'somsa', 'manti', 'lagmon', 'lag\'mon', 'shashlik', 'kabob', 'qozon', 'qozon kabob',
      'pishirish', 'pishiriq', 'qandolat', 'chustiy', 'to\'y oshi', 'choyxona oshi', 'choyxona',
      'go\'sht', 'marinad', 'zirvak', 'guruch', 'salat', 'tort', 'retsept', 'dimlama',
      'mastava', 'sho\'rva', 'tandir'
    ],
    mentorId: 'mentor-13', // Chef Bahriddin Chustiy
    courseId: 'course-13', // Pazandalik va milliy taomlar: Oshpazlik sirlari
    getRoadmap: (query, commitment) => [
      "1-bosqich: Osh damlash poydevori — guruch tanlash (devzira, lazer), go'sht marinadlash va sabzi to'g'rash texnikasi (1-2 hafta)",
      "2-bosqich: Zirvak sirlari — yog' harorati, piyoz va go'shtni qovurish, olovni boshqarish hamda choyxona va to'y oshi amaliyoti (2-3 hafta)",
      "3-bosqich: Tandir somsa, qozon kabob, tansiq milliy taomlar va restorancha tortiq qilish san'ati (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" qidiruvingiz bo'yicha AI chuqur tahlil o'tkazdi. Pazandachilik va milliy taomlar bo'yicha O'zbekistonning mashhur bosh oshpazi ${mentorName} hamda haftalik ${commitment} amaliy dars rejasi tanlandi.`
  },
  {
    id: 'math',
    badge: "Matematika & Oliy Algebra",
    keywords: [
      'algebrik', 'algebra', 'kasr', 'kasrlar', 'algebrik kasrlar', 'matematika', 'matematik',
      'geometriya', 'geometrik', 'tenglama', 'tenglamalar', 'dtm', 'milliy sertifikat', 'olimpiada',
      'integral', 'integrallar', 'hosila', 'logarifm', 'trigonometriya', 'arifmetika', 'sonlar',
      'hisob', 'formula', 'formulalar', 'kombinatorika', 'ehtimollik', 'matem', 'maktab',
      'planimetriya', 'stereometriya', 'ildiz', 'ildizlar', 'ko\'paytirish', 'bo\'lish',
      'proporsiya', 'foiz', 'funksiya', 'limit'
    ],
    mentorId: 'mentor-3', // Shohruh To'xtayev
    courseId: 'course-3', // Matematika (7-11 sinf)
    getRoadmap: (query, commitment) => [
      "1-bosqich: Qisqa ko'paytirish formulalari, algebrik kasrlarni umumiy maxrajga keltirish va qisqartirish usullari (2 hafta)",
      "2-bosqich: Murakkab tenglamalar, kasr-ratsional ifodalar va geometriya masalalari tahlili (3 hafta)",
      "3-bosqich: Milliy sertifikat va DTM testlarining eng tezkor nostandart yechish usullari (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" so'rovingiz bo'yicha AI hisoblab chiqdi. Matematika, algebra va algebrik kasrlarni chuqur o'zlashtirish uchun olimpiada murabbiyi ${mentorName} va haftalik ${commitment} intensiv o'quv rejasi tanlandi.`
  },
  {
    id: 'programming',
    badge: "Dasturlash & Web Texnologiyalar",
    keywords: [
      'dasturlash', 'dasturchi', 'frontend', 'react', 'javascript', 'js', 'html', 'css',
      'typescript', 'ts', 'nextjs', 'web', 'veb', 'sayt', 'sayt yaratish', 'sayt ochish',
      'kod', 'kodlash', 'kod yozish', 'dastur', 'backend', 'fullstack', 'node', 'nodejs',
      'vue', 'angular', 'kompyuter', 'it', 'junior', 'vebsayt', 'tailwind', 'api'
    ],
    mentorId: 'mentor-1', // Azizbek Rahmonov
    courseId: 'course-1', // Web dasturlash
    getRoadmap: (query, commitment) => [
      "1-bosqich: HTML5 semantikasi, zamonaviy CSS3 (Flexbox/Grid) va JavaScript ES6+ chuqur sintaksisi (2 hafta)",
      "2-bosqich: React, TypeScript, State Management va 1-on-1 amaliy veb loyihalar (4 hafta)",
      "3-bosqich: REST API integratsiyasi, Clean Code, GitHub portfolio va texnik mock intervyular (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Zamonaviy dasturlash yo'nalishida Senior Frontend Muhandis ${mentorName} va haftalik ${commitment} dars rejasi belgilandi.`
  },
  {
    id: 'english',
    badge: "Ingliz Tili & IELTS",
    keywords: [
      'ingliz', 'inglizcha', 'english', 'ielts', 'toefl', 'cefr', 'speaking', 'writing',
      'reading', 'listening', 'grammatika', 'grammar', 'chet tili', 'vocabulary',
      'so\'zlashuv', 'mock', 'pronunciation', 'talaffuz', 'amerika', 'britaniya', 'ingliz tili'
    ],
    mentorId: 'mentor-2', // Dilshodbek Karimov
    courseId: 'course-2', // Ingliz tili
    getRoadmap: (query, commitment) => [
      "1-bosqich: Grammatika va faol so'z boyligini kengaytirish, talaffuzni to'g'rilash (B1 -> B2) (2 hafta)",
      "2-bosqich: IELTS Speaking Part 1, 2, 3 bo'yicha jonli 1-on-1 mock suhbatlar va ravonlik (3 hafta)",
      "3-bosqich: Writing Task 1 & 2 shablonlari va yakuniy 7.5+ imtihon simulyatsiyasi (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. IELTS 8.5 sohibi ${mentorName} bilan haftalik ${commitment} shaxsiy darslar rejasi tuzildi.`
  },
  {
    id: 'ai',
    badge: "Sun'iy Intellekt & Data Science",
    keywords: [
      'ai', 'sun\'iy', 'suniy', 'intellekt', 'chatgpt', 'openai', 'python', 'payson',
      'mashina o\'rganishi', 'machine learning', 'data science', 'deep learning', 'neyron',
      'prompt', 'prompt engineering', 'langchain', 'ai bot', 'sun\'iy aql', 'llm', 'claude', 'deepseek'
    ],
    mentorId: 'mentor-4', // Madina Alimova
    courseId: 'course-6', // Sun'iy intellekt
    getRoadmap: (query, commitment) => [
      "1-bosqich: Python sintaksisi, ma'lumotlar bilan ishlash va Prompt Engineering chuqur texnikalari (2 hafta)",
      "2-bosqich: OpenAI / Claude API integratsiyasi va maxsus aqlli Telegram botlar yaratish (3 hafta)",
      "3-bosqich: RAG (Retrieval-Augmented Generation) va mustaqil ishlovchi AI agentlar arxitekturasi (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Sun'iy intellekt va ML mutaxassisi ${mentorName} hamda haftalik ${commitment} amaliy dars dasturi tanlandi.`
  },
  {
    id: 'design',
    badge: "UI/UX Dizayn & Figma",
    keywords: [
      'dizayn', 'design', 'ui', 'ux', 'ui/ux', 'figma', 'interfeys', 'veb dizayn',
      'mobil dizayn', 'prototip', 'dizayner', 'wireframe', 'grafik dizayn', 'foydalanuvchi tajribasi'
    ],
    mentorId: 'mentor-5', // Javohir Rustamov
    courseId: 'course-7',
    getRoadmap: (query, commitment) => [
      "1-bosqich: Figma vositalari, avtolayout, komponentlar, tipografika va ranglar uyg'unligi (2 hafta)",
      "2-bosqich: UX research, foydalanuvchi yo'li (User Journey) va interaktiv ilova prototiplari (3 hafta)",
      "3-bosqich: Real startap ilovasi dizayni, Dizayn tizimi (Design System) va Behance portfolio (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. UI/UX Dizayn rahbari ${mentorName} va haftalik ${commitment} amaliy dars yo'nalishi belgilandi.`
  },
  {
    id: 'business',
    badge: "Biznes & E-Commerce",
    keywords: [
      'biznes', 'business', 'savdo', 'tadbirkor', 'tadbirkorlik', 'e-commerce', 'uzum',
      'uzum market', 'amazon', 'marketing', 'sotuv', 'do\'kon', 'onlayn do\'kon', 'pul',
      'daromad', 'investitsiya', 'moliya', 'startap', 'savdo qilish'
    ],
    mentorId: 'mentor-6', // Umidbek Jo'rayev
    courseId: 'course-4', // Onlayn biznes asoslari
    getRoadmap: (query, commitment) => [
      "1-bosqich: Bozor tahlili, talab yuqori tovarlarni topish va rentabellik hisob-kitobi (1-2 hafta)",
      "2-bosqich: Uzum Market va onlayn platformalarda do'kon ochish, SEO kartochkalar va logistika (2-3 hafta)",
      "3-bosqich: Sotuv voronkasi, reklama optimizatsiyasi va 100M+ oylik oborotga chiqish (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. E-Commerce eksperti ${mentorName} bilan haftalik ${commitment} biznesni yo'lga qo'yish rejasi tuzildi.`
  },
  {
    id: 'illustration',
    badge: "Rasm & Raqamli Illyustratsiya",
    keywords: [
      'rasm', 'chizish', 'illyustratsiya', 'illustratsiya', 'procreate', 'photoshop',
      'san\'at', 'rassom', 'komiks', 'personaj', 'raqamli rasm', 'akvarel', 'eskiz', '2d', 'qalamda'
    ],
    mentorId: 'mentor-7', // Dilnoza Rahimova
    courseId: 'course-7', // Rasm va illyustratsiya
    getRoadmap: (query, commitment) => [
      "1-bosqich: Procreate / Photoshop uskunalari, qalam bosimi, layoqat va asosiy shakllar (2 hafta)",
      "2-bosqich: Ranglar uyg'unligi, yorug'-soya, personajlar anatomiyasi va hissiyotlari (3 hafta)",
      "3-bosqich: To'liq sahna kompozitsiyasi, kitob illyustratsiyasi va shaxsiy artbook yaratish (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Professional illyustrator ${mentorName} bilan haftalik ${commitment} ijodiy dastur tayyorlandi.`
  },
  {
    id: 'public_speaking',
    badge: "Notiqlik & Erkin Muloqot",
    keywords: [
      'notiqlik', 'notiq', 'nutq', 'muloqot', 'so\'zlash', 'diksiya', 'sahnada', 'hayajon',
      'ovoz', 'boshlovchi', 'orator', 'taqdimot', 'debat', 'teleboshlovchi', 'gapirish'
    ],
    mentorId: 'mentor-8', // Jamshid Ismoilov
    courseId: 'course-8', // Notiqlik va muloqot
    getRoadmap: (query, commitment) => [
      "1-bosqich: Sahnadagi qo'rquv va hayajonni yengish, to'g'ri nafas olish va diksiya gimnastikasi (2 hafta)",
      "2-bosqich: Ovoz tembri, tana tili (gestlar, nigoh) va hikoyachilik (storytelling) qoidalari (3 hafta)",
      "3-bosqich: Jonli auditoriya bilan ishlash, kutilmagan savollarga javob berish va taqdimot mahorati (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Teleboshlovchi va notiqlik ustozi ${mentorName} bilan haftalik ${commitment} intensiv nutq kursi tanlandi.`
  },
  {
    id: 'robotics',
    badge: "Robototexnika & Arduino",
    keywords: [
      'robot', 'robototexnika', 'arduino', 'iot', 'sxemotexnika', 'elektronika',
      'sensor', 'datchik', 'mikrokontroller', 'esp32', 'lehimlash', 'aqlli tizim', 'texnika'
    ],
    mentorId: 'mentor-9', // Sardorbek Yunusov
    courseId: 'course-9', // Robototexnika va Arduino
    getRoadmap: (query, commitment) => [
      "1-bosqich: Sxemotexnika qonunlari, lehimlash texnikasi va Arduino mikrokontrolleri asoslari (2 hafta)",
      "2-bosqich: Datchiklar, servomotorlar va C++ da mexanizmlarni dasturlash (3 hafta)",
      "3-bosqich: Avtonom harakatlanuvchi aqlli robot va smart-home tizimini mustaqil yig'ish (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Robototexnika muhandisi ${mentorName} bilan haftalik ${commitment} amaliy dastur tanlandi.`
  },
  {
    id: 'sewing',
    badge: "Tikuvchilik & Liboslar Dizayni",
    keywords: [
      'tikuvchi', 'tikuvchilik', 'chevar', 'chevarlik', 'bichish', 'tikish', 'bichish-tikish',
      'libos', 'ko\'ylak', 'kiyim', 'mato', 'lekalo', 'andoza', 'modelyer', 'atelye', 'fason'
    ],
    mentorId: 'mentor-10', // Shahlo Mirzayeva
    courseId: 'course-10', // Tikuvchilik va liboslar dizayni
    getRoadmap: (query, commitment) => [
      "1-bosqich: Tana o'lchovlarini aniq olish, mato turlari va andoza (lekalo) tayyorlash (2 hafta)",
      "2-bosqich: Zamonaviy tikuv mashinalarida toza chok tushirish va andoza asosida bichish (3 hafta)",
      "3-bosqich: Benuqson o'tiradigan milliy va zamonaviy liboslar tikish hamda atelye ochish sirlari (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Modelyer-konstruktor ${mentorName} bilan haftalik ${commitment} bichish-tikish dasturi tanlandi.`
  },
  {
    id: 'pottery',
    badge: "Kulolchilik & Amaliy San'at",
    keywords: [
      'kulol', 'kulolchilik', 'loy', 'sopol', 'charx', 'ko\'za', 'rishton', 'tovoq',
      'sirlash', 'pech', 'naqqoshlik', 'suvenir', 'loy chalish', 'idish'
    ],
    mentorId: 'mentor-11', // Baxtiyor Saidov
    courseId: 'course-11', // Kulolchilik san'ati
    getRoadmap: (query, commitment) => [
      "1-bosqich: Rishton qizil loyini tayyorlash va charxda loyni markazlashtirish usullari (2 hafta)",
      "2-bosqich: Kosa, lagan va ko'zalarga qo'lda shakl berish hamda tekislash (3 hafta)",
      "3-bosqich: Ishqoriy sirlar bilan milliy naqsh chizish va 1000°C pechda pishirish sirlari (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Rishton xalq ustasi ${mentorName} bilan haftalik ${commitment} an'anaviy kulolchilik dasturi tanlandi.`
  },
  {
    id: 'woodworking',
    badge: "Yog'och O'ymakorligi & Duradgorlik",
    keywords: [
      'yog\'och', 'duradgor', 'duradgorlik', 'o\'ymakorlik', 'iskana', 'lavk', 'mebel',
      'qo\'qon', 'naqsh', 'xontaxta', 'yog\'ochga ishlov', 'yog\'och o\'ymakorligi'
    ],
    mentorId: 'mentor-12', // Odiljon Qosimov
    courseId: 'course-12', // Yog'och o'ymakorligi san'ati
    getRoadmap: (query, commitment) => [
      "1-bosqich: Yong'oq, chinor yog'ochlari bilan ishlash va iskanalarni charxlash (2 hafta)",
      "2-bosqich: Islimiy va handasiy milliy naqshlarni yog'ochga tushirish texnikasi (3 hafta)",
      "3-bosqich: Milliy kitob lavhi yoki quticha yasash, silliqlash va tabiiy lak berish (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Xalq hunarmandi usta ${mentorName} bilan haftalik ${commitment} o'ymakorlik dasturi belgilandi.`
  },
  {
    id: 'instruments',
    badge: "Musiqa & Cholg'u Asboblari",
    keywords: [
      'gitara', 'dutor', 'musiqa', 'cholg\'u', 'sozanda', 'akkord', 'nota', 'vokal',
      'qo\'shiq', 'rubob', 'pianino', 'fortepiano', 'ritm', 'kuy', 'musiqa asbobi', 'chalish'
    ],
    mentorId: 'mentor-14', // Mansurxon Madaminov
    courseId: 'course-14', // Gitara va dutor chalish
    getRoadmap: (query, commitment) => [
      "1-bosqich: Cholg'uni to'g'ri ushlash, sozlash, barmoqlar harakatchanligi va asosiy akkordlar (2 hafta)",
      "2-bosqich: Ritmik usullar (Boy, Perabor), tablatura o'qish va mashhur kuylarni o'rganish (3 hafta)",
      "3-bosqich: Sevimli qo'shiqlarni erkin kuylab chalish va sahnada ijro sirlari (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Professional sozanda ${mentorName} bilan haftalik ${commitment} musiqa darslari belgilandi.`
  },
  {
    id: 'mechanics',
    badge: "Avtomexanika & Dvigatellar",
    keywords: [
      'avto', 'mashina', 'moshina', 'avtomobil', 'mexanik', 'avtomexanik', 'dvigatel',
      'motor', 'diagnostika', 'tormoz', 'xodovoy', 'moy', 'obd', 'remont', 'ta\'mirlash',
      'karobka', 'avtoservis'
    ],
    mentorId: 'mentor-15', // Akmaljon Vohidov
    courseId: 'course-15', // Avtomexanika va dvigatellar diagnostikasi
    getRoadmap: (query, commitment) => [
      "1-bosqich: Dvigatel ichki tuzilishi, avtoservis asboblari va xavfsizlik qoidalari (2 hafta)",
      "2-bosqich: OBD-2 kompyuter diagnostikasi, datchiklar va elektronika xatolarini topish (3 hafta)",
      "3-bosqich: Dvigatelni sozlash, tormoz va xodovoy qismlarni mukammal ta'mirlash amaliyoti (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Bosh avtomexanik ${mentorName} bilan haftalik ${commitment} amaliy ta'mirlash dasturi belgilandi.`
  },
  {
    id: 'growth',
    badge: "Shaxsiy Rivojlanish & Karyera",
    keywords: [
      'motivatsiya', 'maqsad', 'shaxsiy rivojlanish', 'intizom', 'vaqt', 'time management',
      'odat', 'odatlar', 'kouch', 'psixologiya', 'rezyume', 'cv', 'karyera', 'o\'sish', 'prokrastinatsiya'
    ],
    mentorId: 'mentor-16', // Zokirjon Odilov
    courseId: 'course-5', // Motivatsiya va maqsadlar
    getRoadmap: (query, commitment) => [
      "1-bosqich: Vaqt auditi, intizomni yo'lga qo'yish va prokrastinatsiyani yengish psixologiyasi (1-2 hafta)",
      "2-bosqich: SMART maqsadlar, odatlar zanjiri va kunlik samaradorlik tizimi (2-3 hafta)",
      "3-bosqich: Karyera strategiyasi, rezyume (CV) audit va yuqori daromadga olib chiquvchi reja (2 hafta)",
    ],
    getSummary: (query, commitment, mentorName) =>
      `Sizning "${query}" maqsadingiz bo'yicha AI tahlil o'tkazdi. Xalqaro kouch ${mentorName} bilan haftalik ${commitment} shaxsiy rivojlanish rejasi tuzildi.`
  },
];

// Helper: Match AI Mentor & Course based on user input
const matchAiMentorAndCourse = (
  rawText: string,
  timeCommitment: string
) => {
  const clean = rawText.toLowerCase().replace(/['`’‘]/g, "'");
  const words = clean.split(/[\s,.;:!?\-+]+/).filter((w) => w.length > 1);

  // 1. Check against Domain Configs
  let bestDomain: DomainConfig | null = null;
  let highestDomainScore = 0;

  for (const domain of DOMAIN_CONFIGS) {
    let score = 0;
    for (const kw of domain.keywords) {
      const lowerKw = kw.toLowerCase();
      // Phrase or word match
      if (clean === lowerKw || clean.includes(lowerKw)) {
        if (lowerKw.length <= 3) {
          if (words.includes(lowerKw)) score += 20;
        } else {
          score += 20;
        }
      }
      // Word tokens
      for (const w of words) {
        if (w === lowerKw) {
          score += 25;
        } else if (w.length >= 4 && (lowerKw.startsWith(w) || w.startsWith(lowerKw))) {
          score += 15;
        }
      }
    }
    if (score > highestDomainScore) {
      highestDomainScore = score;
      bestDomain = domain;
    }
  }

  // 2. Score individual mentors across MENTORS
  const scoredMentors = MENTORS.map((m) => {
    let mScore = 0;
    if (bestDomain && m.id === bestDomain.mentorId) {
      mScore += 100;
    }
    const mName = m.name.toLowerCase();
    const mTitle = m.title.toLowerCase();
    const mCat = m.category.toLowerCase();

    for (const w of words) {
      if (w.length < 3) continue;
      if (mName.split(/\s+/).some((t) => t === w || (w.length >= 4 && t.startsWith(w)))) mScore += 25;
      if (mTitle.split(/\s+/).some((t) => t === w || (w.length >= 4 && t.startsWith(w)))) mScore += 20;
      if (mCat === w) mScore += 20;
      for (const sk of m.skills) {
        const skTokens = sk.toLowerCase().split(/[\s,]+/);
        if (skTokens.some((t) => t === w || (w.length >= 4 && (t.startsWith(w) || w.startsWith(t))))) {
          mScore += 20;
        }
      }
    }
    return { mentor: m, score: mScore };
  });

  scoredMentors.sort((a, b) => b.score - a.score);
  const topScore = scoredMentors[0]?.score || 0;

  // IF NO DOMAIN MATCHED AND NO MENTOR SCORED (unrelated query / gibberish)
  if (highestDomainScore === 0 && topScore === 0) {
    return {
      isError: true,
      errorQuery: rawText.trim(),
      recommendedMentor: null as unknown as Mentor,
      recommendedCourse: null as unknown as Course,
      alternativeMentors: [],
      roadmap: [],
      summary: "",
      domainBadge: "",
      compatibilityRate: "",
    };
  }

  const primaryMentor = scoredMentors[0]?.mentor || MENTORS[0];
  const alternativeMentors = scoredMentors
    .slice(1, 4)
    .filter((sm) => sm.score > 0 && sm.mentor.id !== primaryMentor.id)
    .map((sm) => sm.mentor);

  // 3. Find matching Course
  const primaryCourse = COURSES.find((c) => {
    if (bestDomain && c.id === bestDomain.courseId) return true;
    return c.instructor === primaryMentor.name || c.category === primaryMentor.category;
  }) || COURSES[0];

  // 4. Generate dynamic roadmap & summary
  let roadmap: string[];
  let summary: string;
  let domainBadge: string = "UstozPro AI Verified";

  if (bestDomain && highestDomainScore > 0) {
    roadmap = bestDomain.getRoadmap(rawText.trim(), timeCommitment);
    summary = bestDomain.getSummary(rawText.trim(), timeCommitment, primaryMentor.name);
    domainBadge = bestDomain.badge;
  } else {
    // Dynamic fallback incorporating user's goal
    roadmap = [
      `1-bosqich: "${rawText.trim()}" bo'yicha fundamental bilimlar va asosiy vositalar (2 hafta)`,
      `2-bosqich: ${primaryMentor.name} bilan 1-on-1 amaliy mashg'ulotlar va individual amaliy loyiha (3 hafta)`,
      `3-bosqich: Sinov testlari, ko'nikmalarni mustahkamlash va yakuniy natijaga erishish (2 hafta)`,
    ];
    summary = `Sizning "${rawText.trim()}" so'rovingiz tahlil qilindi. Sizning byudjetingiz va haftalik ${timeCommitment} vaqtingizga mos ustoz ${primaryMentor.name} tanlandi.`;
    domainBadge = primaryMentor.title;
  }

  // Realistic AI Match rate: 97.4% - 99.4%
  const compRate = (97.0 + ((primaryMentor.name.length * 7 + rawText.length * 3) % 25) / 10).toFixed(1) + "%";

  return {
    isError: false,
    errorQuery: '',
    recommendedMentor: primaryMentor,
    recommendedCourse: primaryCourse,
    alternativeMentors,
    roadmap,
    summary,
    domainBadge,
    compatibilityRate: compRate,
  };
};

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
    alternativeMentors?: Mentor[];
    domainBadge?: string;
    compatibilityRate?: string;
  } | null>(null);
  const [matcherError, setMatcherError] = useState<{
    query: string;
    message: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Salom! Men UstozPro AI sun'iy intellekt ta'lim yordamchisiman. Sizga qaysi fan, til yoki kasb bo'yicha yordam beray? Masalan: Osh pishirish sirlari, algebrik kasrlar, ingliz tili, dasturlash va boshqa barcha sohalarda eng mos ustoz va yo'l xaritasini tuzib beraman.",
      time: '12:00',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Syllabus generator state
  const [syllabusTopic, setSyllabusTopic] = useState('');
  const [generatedSyllabus, setGeneratedSyllabus] = useState<string | null>(null);

  const executeMatcher = (textToMatch: string) => {
    if (!textToMatch.trim()) return;
    setIsGenerating(true);
    setMatcherError(null);

    setTimeout(() => {
      const result = matchAiMentorAndCourse(textToMatch, timeCommitment);
      if (result.isError) {
        setMatcherResult(null);
        setMatcherError({
          query: textToMatch.trim(),
          message: `Kechirasiz, siz kiritgan "${textToMatch.trim()}" bo'yicha platformamizda mos ustoz yoki yo'nalish topilmadi.`,
        });
      } else {
        setMatcherError(null);
        setMatcherResult(result);
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleRunMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    executeMatcher(goalText);
  };

  const handleSelectSample = (sampleText: string) => {
    setGoalText(sampleText);
    executeMatcher(sampleText);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setChatInput('');

    setTimeout(() => {
      const q = userText.toLowerCase();
      let reply = "";

      if (q.includes('osh') || q.includes('palov') || q.includes('pazanda') || q.includes('ovqat') || q.includes('taom') || q.includes('somsa')) {
        reply = "Osh tayyorlashda eng muhimi — zirvakni to'g'ri qaynatish va guruchni me'yorida damlashdir. 1 kg guruchga 1 kg go'sht, 1 kg sifatli sabzi va 300-350 g yog' olinadi. Zirvak sust olovda 40-50 daqiqa qaynashi lozim. Palovning 10 dan ortiq turlari va restoran darajasida pishirishni mashhur shef Chef Bahriddin Chustiy bilan 1-on-1 amaliy darsda o'rganishingiz mumkin!";
      } else if (q.includes('algebrik') || q.includes('kasr') || q.includes('algebra') || q.includes('tenglama') || q.includes('matematika')) {
        reply = "Algebrik kasrlar — bu surat yoki maxrajida harfiy ifoda (o'zgaruvchi) qatnashgan kasrlardir. Masalan: (a² - b²) / (a - b) = a + b. Asosiy qoida: qisqa ko'paytirish formulalari yordamida ko'paytuvchilarga ajratib, umumiy qismlarni qisqartirishdir. Algebrik kasrlar, murakkab tenglamalar va DTM testlarini olimpiada ustozi Shohruh To'xtayev bilan 1-on-1 darsda o'rganishingiz mumkin!";
      } else if (q.includes('react') || q.includes('hook') || q.includes('useeffect') || q.includes('dasturlash') || q.includes('frontend')) {
        reply = "React da `useState` komponentning ichki holatini saqlash uchun, `useEffect` esa tashqi ta'sirlarni (API chaqiruvlari, DOM hodisalari) boshqarish uchun qo'llaniladi. Toza arxitektura va zamonaviy web dasturlashni Senior Frontend Muhandis Azizbek Rahmonov bilan 1-on-1 darsda o'rganishingiz mumkin!";
      } else if (q.includes('ielts') || q.includes('speaking') || q.includes('ingliz')) {
        reply = "IELTS Speaking da 7.5+ olish uchun 4 asosiy mezon bor: 1) Fluency (ravonlik), 2) Lexical Resource (idioma va sinonimlar), 3) Grammatical Accuracy, 4) Pronunciation. Cambridge sertifikatli instruktor Dilshodbek Karimov bilan 40 daqiqalik mock imtihon olsangiz, barcha kamchiliklaringiz aniqlanadi.";
      } else if (q.includes('avto') || q.includes('mashina') || q.includes('moshina') || q.includes('dvigatel') || q.includes('motor')) {
        reply = "Dvigatel diagnostikasi uchun OBD-2 skaner yordamida Check Engine xatolik kodi (DTC) aniqlanadi. Masalan, P0300 — silindrlarda o't oldirish uzilishi. Buni bartaraf qilish va mashinani to'g'ri ta'mirlashni bosh avtomexanik Akmaljon Vohidov bilan shaxsiy mashg'ulotda o'rganasiz.";
      } else if (q.includes('dizayn') || q.includes('figma') || q.includes('ui') || q.includes('ux')) {
        reply = "Figma da zamonaviy UI/UX dizayn yaratishda Auto-layout, Variants va Design Tokens asosiy vositalardir. Head of Design Javohir Rustamov bilan 1-on-1 konsultatsiya olib, xalqaro darajadagi portfolio yaratishingiz mumkin.";
      } else if (q.includes('tikuv') || q.includes('chevar') || q.includes('bichish') || q.includes('ko\'ylak')) {
        reply = "Kiyim tikishda andoza (lekalo)ni to'g'ri chiqarish va tana o'lchovlarini aniq olish libosning qaddi-qomatga benuqson o'tirishini ta'minlaydi. Modelyer Shahlo Mirzayeva bilan shaxsiy chevarlik mashg'ulotlarida barchasini o'rganasiz.";
      } else if (q.includes('musiqa') || q.includes('gitara') || q.includes('dutor')) {
        reply = "Gitarada kuylash uchun dastlab asosiy 3 ta akkordni (Am, Dm, E) va 4/4 ritmini barmoqlarga o'rgatish kifoya. Professional sozanda Mansurxon Madaminov bilan qisqa muddatda sevimli qo'shiqlaringizni chalishni boshlaysiz.";
      } else if (q.includes('biznes') || q.includes('uzum') || q.includes('savdo') || q.includes('daromad') || q.includes('pul')) {
        reply = "UstozPro da har qanday mutaxassis o'z mahoratini sota oladi! Shuningdek, Uzum Marketda do'kon ochish va savdoni oshirish bo'yicha E-Commerce eksperti Umidbek Jo'rayev bilan 1-on-1 konsultatsiya olishingiz mumkin.";
      } else {
        reply = `⚠️ Xatolik: Kechirasiz, siz yozgan "${userText}" bo'yicha platformamizda ma'lumot yoki mos ustoz topilmadi. UstozPro platformasida faqat o'quv fanlari va amaliy mahoratlar mavjud (masalan: Osh damlash, Algebrik kasrlar, Ingliz tili, Dasturlash, Avtomexanika, Musiqa va h.k.). Iltimos, shu yo'nalishlar bo'yicha savol bering!`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 700);
  };

  const handleGenerateSyllabus = () => {
    if (!syllabusTopic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const clean = syllabusTopic.toLowerCase();
      let module1 = "Kirish va fundamental tushunchalar";
      let module2 = "Amaliy vositalar va real keyslar";
      let module3 = "Murakkab amaliyot va optimizatsiya";
      let module4 = "Yakuniy loyiha va baholash";

      if (clean.includes('osh') || clean.includes('palov') || clean.includes('taom') || clean.includes('pazanda')) {
        module1 = "Masalliqlar tanlash (guruch, go'sht, yog') va oshxona sanitariyasi";
        module2 = "Zirvak tayyorlash, yog' harorati va to'y oshi damlash amaliyoti";
        module3 = "Tandir somsa, qozon kabob va milliy tansiq taomlar texnologiyasi";
        module4 = "Restoran darajasida taom tortiq qilish va shaxsiy menyu imtihoni";
      } else if (clean.includes('algebrik') || clean.includes('kasr') || clean.includes('matematika') || clean.includes('algebra')) {
        module1 = "Qisqa ko'paytirish formulalari va algebrik kasrlarni umumiy maxrajga keltirish";
        module2 = "Kasr-ratsional ifodalarni soddalashtirish va murakkab tenglamalar yechish";
        module3 = "DTM va Milliy sertifikat darajasidagi nostandart testlar tahlili";
        module4 = "Imtihon simulyatsiyasi: Vaqt bilan ishlash va natijalarni tekshirish";
      } else if (clean.includes('dasturlash') || clean.includes('react') || clean.includes('python')) {
        module1 = "Sintaksis, ma'lumot turlari va komponentli arxitektura asoslari";
        module2 = "State management, API integratsiyasi va amaliy loyiha qurish";
        module3 = "Optimizatsiya, toza kod printsiplari va Git repozitoriy boshqaruvi";
        module4 = "Portfolio loyihasini Deploy qilish va texnik audit";
      }

      setGeneratedSyllabus(`### 📋 AI Dars Rejasi: ${syllabusTopic}
      
**1-Hafta: ${module1}**
- Mavzu 1.1: Asosiy printsiplar va instrumentlar bilan tanishuv
- Amaliy mashq: Birinchi kichik topshiriqni mustaqil bajarish
- Test savoli: 5 ta asosiy qoidani tushuntirib berish

**2-Hafta: ${module2}**
- Mavzu 2.1: Chuqur amaliy keyslar ustida ishlash
- Dars vazifasi: Mini-loyiha ishlab chiqish
- Ustoz feedbacki: Xatolar ustida individual ishlash

**3-Hafta: ${module3}**
- Mavzu 3.1: Professional darajadagi yondashuvlar va maxsus sirlar
- Yakuniy keys: Portfolioga qo'shiladigan to'liq amaliy ish
- Tezkor test: Ko'nikmalarni mustahkamlash

**4-Hafta: ${module4}**
- Individual taqdimot va ustoz nazoratidan o'tish
- Yakuniy sertifikat topshirish`);
      setIsGenerating(false);
    }, 800);
  };

  const sampleChips = [
    { text: "Osh va milliy taomlar pishirish sirlari", tag: "Pazandachilik", icon: "🍲" },
    { text: "Algebrik kasrlar va matematik formulalar", tag: "Matematika", icon: "📐" },
    { text: "Frontend React dasturchi bo'lib ishga kirish", tag: "Dasturlash", icon: "💻" },
    { text: "IELTS 7.5 Speaking imtihoniga tayyorgarlik", tag: "Ingliz tili", icon: "🇬🇧" },
    { text: "Figma da zamonaviy UI/UX dizayn yaratish", tag: "Dizayn", icon: "🎨" },
    { text: "Avtomexanika va dvigatellar diagnostikasi", tag: "Mexanika", icon: "🚗" },
  ];

  return (
    <div className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10 text-left">
            <div className="inline-flex items-center space-x-2 bg-violet-500/20 border border-violet-400/30 px-3.5 py-1 rounded-full text-violet-200 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>UstozPro AI Ta'lim Dvigateli</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              AI Ustoz & Ta'lim Navigatori
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Qidirayotgan mavzungizni yozing (masalan: <b>osh</b> yoki <b>algebrik kasrlar</b>) — sun'iy intellekt sizga eng mos soha ustozini topadi, o'quv yo'l xaritasini (roadmap) tuzadi va 24/7 savollaringizga javob beradi.
            </p>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center space-x-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matcher'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Ustoz Matcher & Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>24/7 AI Repititor Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ustozlar uchun: AI Dars Rejasi</span>
          </button>
        </div>

        {/* TAB 1: SMART MATCHER */}
        {activeTab === 'matcher' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Input Form (Left) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Nima o'rganmoqchi yoki qidirmoqchisiz?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Istalgan mavzuni yozing — sun'iy intellekt ushbu mavzu bo'yicha eng tajribali ustozni va shaxsiy o'quv rejasini aniqlab beradi.
                </p>
              </div>

              <form onSubmit={handleRunMatcher} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Mavzu, fan yoki ko'nikmani kiriting:
                  </label>
                  <textarea
                    rows={3}
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    placeholder="Masalan: Osh damlash sirlari, Algebrik kasrlar, Ingliz tili, React dasturlash, Dvigatel ta'miri..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Haftalik vaqtingiz
                    </label>
                    <select
                      value={timeCommitment}
                      onChange={(e) => setTimeCommitment(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-violet-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="3-5 soat">3 - 5 soat</option>
                      <option value="5-10 soat">5 - 10 soat</option>
                      <option value="15+ soat">15+ soat (Intensiv)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Oylik byudjet
                    </label>
                    <select
                      value={budgetVal}
                      onChange={(e) => setBudgetVal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-violet-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                  <span>{isGenerating ? "AI ustoz qidirilmoqda..." : "AI Ustozni Topish"}</span>
                </button>
              </form>

              {/* Sample quick prompts */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                  Misol tariqasida tanlab ko'ring:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleChips.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sample.text)}
                      className="text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/40 text-slate-700 dark:text-slate-200 hover:text-violet-700 dark:hover:text-violet-300 text-xs font-medium transition border border-slate-100 dark:border-slate-700/60 flex items-center gap-2"
                    >
                      <span className="text-sm">{sample.icon}</span>
                      <span className="truncate">{sample.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Presentation (Right) */}
            <div className="lg:col-span-7 space-y-6">
              {matcherError ? (
                <div className="bg-rose-50/95 dark:bg-rose-950/40 rounded-3xl p-6 sm:p-8 border-2 border-rose-300 dark:border-rose-800/80 shadow-card space-y-6 animate-fadeIn text-left">
                  {/* Error Header */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-rose-200 dark:border-rose-900/60">
                    <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <AlertTriangle className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        <span>⚠️</span>
                        <span>Xatolik: Mos ustoz topilmadi</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-rose-950 dark:text-rose-100">
                        Bunday yo'nalish yoki ustoz mavjud emas!
                      </h4>
                    </div>
                  </div>

                  {/* Error Details */}
                  <div className="space-y-3 bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-rose-200 dark:border-rose-900/40">
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      Kechirasiz, siz kiritgan <span className="font-black text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/50 px-2 py-0.5 rounded-md">"{matcherError.query}"</span> so'rovi bo'yicha UstozPro platformasida hozircha mos ustoz, dars yoki mutaxassislik topilmadi.
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Iltimos, mavzuni aniqroq yozing (masalan: <b>osh damlash</b>, <b>algebrik kasrlar</b>, <b>ingliz tili</b>, <b>dasturlash</b>, <b>avtomexanika</b> va h.k.) yoki quyidagi taklif etilgan mavzulardan birini tanlang:
                    </p>
                  </div>

                  {/* Quick Valid Suggestions */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                      Mavjud sohalar (ustiga bosing):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {sampleChips.slice(0, 6).map((sample, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleSelectSample(sample.text)}
                          className="text-left p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950/50 text-slate-800 dark:text-slate-200 text-xs font-semibold transition border border-rose-200/80 dark:border-rose-900/30 flex items-center gap-2.5 cursor-pointer shadow-2xs hover:border-violet-300"
                        >
                          <span className="text-base">{sample.icon}</span>
                          <span className="truncate">{sample.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Try Again Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => { setMatcherError(null); setGoalText(''); }}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Qaytadan to'g'ri kiritish</span>
                    </button>
                  </div>
                </div>
              ) : matcherResult ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-violet-200 dark:border-violet-900/60 shadow-card space-y-6 animate-fadeIn">
                  
                  {/* Result Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-base">
                          AI Shaxsiy Ta'lim Rejasi
                        </h4>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Moslik darajasi: {matcherResult.compatibilityRate || '98.5%'}
                        </span>
                      </div>
                    </div>

                    <span className="bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800">
                      {matcherResult.domainBadge || 'UstozPro AI'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed bg-violet-50/50 dark:bg-violet-950/20 p-4 rounded-2xl border border-violet-100 dark:border-violet-900/50">
                    {matcherResult.summary}
                  </p>

                  {/* 3-Step Roadmap */}
                  <div className="space-y-3">
                    <h5 className="font-black text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Tavsiya etilgan Yo'l Xaritasi (Roadmap)
                    </h5>
                    <div className="space-y-2">
                      {matcherResult.roadmap.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium"
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
                  <div className="p-4.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide block">
                      👨‍🏫 Sizga eng mos Ustoz:
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={matcherResult.recommendedMentor.avatar}
                          alt={matcherResult.recommendedMentor.name}
                          className="w-13 h-13 rounded-2xl object-cover border border-emerald-300 dark:border-emerald-700"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {matcherResult.recommendedMentor.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {matcherResult.recommendedMentor.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              ⭐ {matcherResult.recommendedMentor.rating} ({matcherResult.recommendedMentor.reviewsCount} ta baho)
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              {matcherResult.recommendedMentor.hourlyRate.toLocaleString()} so'm/soat
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectMentor(matcherResult.recommendedMentor)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap self-start sm:self-auto"
                      >
                        Ustozni bron qilish
                      </button>
                    </div>
                  </div>

                  {/* Recommended Course Card */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
                    <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide block">
                      📚 Tavsiya etilgan Video Kurs:
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={matcherResult.recommendedCourse.thumbnail}
                          alt={matcherResult.recommendedCourse.title}
                          className="w-14 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {matcherResult.recommendedCourse.title}
                          </h4>
                          <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                            {matcherResult.recommendedCourse.price.toLocaleString()} so'm
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectCourse(matcherResult.recommendedCourse)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition whitespace-nowrap self-start sm:self-auto"
                      >
                        Kursga yozilish
                      </button>
                    </div>
                  </div>

                  {/* Alternative matching mentors if available */}
                  {matcherResult.alternativeMentors && matcherResult.alternativeMentors.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>Sohadagi boshqa tavsiya etilgan ustozlar:</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {matcherResult.alternativeMentors.map((altM) => (
                          <div
                            key={altM.id}
                            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <img
                                src={altM.avatar}
                                alt={altM.name}
                                className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                                  {altM.name}
                                </h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {altM.title}
                                </p>
                                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                                  {altM.hourlyRate.toLocaleString()} so'm
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => onSelectMentor(altM)}
                              className="ml-2 bg-slate-900 dark:bg-slate-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition whitespace-nowrap"
                            >
                              Tanlash
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      AI Tahlil Natijalari Shu Yerda Ko'rinadi
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                      Chap tarafdagi shaklga masalan <b>"osh"</b> yoki <b>"algebrik kasrlar"</b> deb yozing va AI sizga eng mos ustozni hamda rejasini bir zumda topib beradi.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: AI REPITITOR CHAT */}
        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden flex flex-col h-[600px]">
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
                    <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-lg leading-relaxed text-left ${
                      msg.sender === 'user'
                        ? 'bg-violet-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
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
            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Savolingizni yozing (masalan: Osh qanday damlanadi? / Algebrik kasrlar nima?)..."
                className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-violet-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl transition shadow-xs flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: AI SYLLABUS GENERATOR (For Mentors) */}
        {activeTab === 'syllabus' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card space-y-6 text-left">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Ustozlar uchun: 1 Bosishda AI Dars Rejasi Yaratish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kurs yoki dars mavzuingizni kiriting (masalan: "Osh va milliy taomlar" yoki "Algebrik kasrlar") — sun'iy intellekt 4 haftalik professional o'quv dasturini tuzib beradi.
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={syllabusTopic}
                onChange={(e) => setSyllabusTopic(e.target.value)}
                placeholder="Dars mavzusi: masalan, 'Osh damlash texnologiyasi' yoki 'Algebrik kasrlar'..."
                className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-violet-600 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white"
              />
              <button
                onClick={handleGenerateSyllabus}
                disabled={isGenerating}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-xs disabled:opacity-50 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Reja tuzish</span>
              </button>
            </div>

            {generatedSyllabus && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 space-y-2 whitespace-pre-line font-mono">
                {generatedSyllabus}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
