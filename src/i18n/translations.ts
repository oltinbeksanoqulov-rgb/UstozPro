export type Language = 'uz' | 'ru' | 'en';

export interface Translations {
  navbar: {
    brandTitle: string;
    brandSubtitle: string;
    home: string;
    mentors: string;
    courses: string;
    categories: string;
    about: string;
    contact: string;
    login: string;
    register: string;
    lightMode: string;
    darkMode: string;
    language: string;
    badgeSkills: string;
    badgeLive: string;
    badgeAi: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    searchPlaceholder: string;
    searchButton: string;
    aiEcosystem: string;
    popularFields: string;
    results: string;
    quickSuggestions: string;
    suggestedTags: string[];
    laptopSub: string;
    laptopSlogan1: string;
    laptopSlogan2: string;
    notebookLine1: string;
    notebookLine2: string;
    notebookLine3: string;
    bookProgramming: string;
    bookEnglish: string;
    bookMath: string;
    bookBusiness: string;
    bookGrowth: string;
  };
  trustFeatures: {
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  categories: {
    title: string;
    subtitle: string;
    viewAll: string;
    coursesCount: string;
    names: {
      programming: string;
      english: string;
      math: string;
      business: string;
      growth: string;
      art: string;
      music: string;
      sport: string;
      illustration: string;
      public_speaking: string;
      robotics: string;
      sewing: string;
      pottery: string;
      woodworking: string;
      cooking: string;
      instruments: string;
      mechanics: string;
    };
  };
  courses: {
    title: string;
    viewAll: string;
    reviews: string;
    currency: string;
    saveTooltip: string;
    removeTooltip: string;
    courseTitles: Record<string, string>;
    categoryBadges: Record<string, string>;
  };
  searchResults: {
    forQuery: string;
    totalResults: string;
    clearFilter: string;
    matchingMentors: string;
    matchingGigs: string;
    bookBtn: string;
    buyBtn: string;
    perHour: string;
  };
  footer: {
    quote: string;
    rights: string;
    quickLinks: string;
    support: string;
  };
  registerModal: {
    modalHeader: string;
    welcomeCharacter: string;
    title: string;
    subtitle: string;
    backpackPuff: string;
    stepStudent: string;
    stepStudentDesc: string;
    stepMentor: string;
    stepMentorDesc: string;
    fullName: string;
    fullNamePlaceholder: string;
    contactInfo: string;
    contactPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    agreeTerms: string;
    submit: string;
    orWith: string;
    haveAccount: string;
    login: string;
    skipAnimation: string;
    replayAnimation: string;
    successTitle: string;
    successDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    navbar: {
      brandTitle: 'UstozPro',
      brandSubtitle: '(Mahorat savdosi)',
      home: 'Bosh sahifa',
      mentors: 'Ustozlar',
      courses: 'Kurslar',
      categories: 'Kategoriyalar',
      about: 'Biz haqimizda',
      contact: 'Aloqa',
      login: 'Kirish',
      register: 'Ro\'yxatdan o\'tish',
      lightMode: 'Yorug\' rejim',
      darkMode: 'Qorong\'u rejim',
      language: 'Til',
      badgeSkills: 'Mahorat',
      badgeLive: 'Live',
      badgeAi: 'AI',
    },
    hero: {
      badge: 'Bilim — eng katta boylik!',
      title1: 'UstozPro —',
      title2: 'mahorat savdosi!',
      subtitle: 'Bu yerda o\'z bilim va tajribangizni ulashib, o\'zingiz ham, boshqalar ham rivojlanasiz.',
      searchPlaceholder: 'Ustoz, kurs yoki yo\'nalishni qidiring...',
      searchButton: 'Qidirish',
      aiEcosystem: 'UstozPro AI Live Ekotizimi',
      popularFields: 'Mashhur yo\'nalishlar:',
      results: 'ta natija topildi',
      quickSuggestions: 'Tezkor qidiruv takliflari',
      suggestedTags: ['Dasturlash', 'Ingliz tili', 'Matematika', 'Biznes', 'Shaxsiy rivojlanish'],
      laptopSub: '(Mahorat savdosi)',
      laptopSlogan1: 'Bilim ulash —',
      laptopSlogan2: 'kelajak qurish!',
      notebookLine1: 'Katta orzular',
      notebookLine2: 'kichik qadamlar',
      notebookLine3: 'bilan boshlanadi',
      bookProgramming: 'Dasturlash',
      bookEnglish: 'Ingliz tili',
      bookMath: 'Matematika',
      bookBusiness: 'Biznes',
      bookGrowth: 'Shaxsiy rivojlanish',
    },
    trustFeatures: {
      feature1Title: 'Tajribali ustozlar',
      feature1Desc: 'Soha mutaxassislari bilan bilimingizni oshiring.',
      feature2Title: 'Xavfsiz va ishonchli',
      feature2Desc: 'To\'lovlar va ma\'lumotlaringiz to\'liq himoyalangan.',
      feature3Title: 'Qulay format',
      feature3Desc: 'Onlayn va oflayn darslar istalgan vaqtda.',
      feature4Title: 'Keng tanlov',
      feature4Desc: 'Har bir yo\'nalishda ko\'plab ustozlar va kurslar.',
    },
    categories: {
      title: 'Mashhur yo\'nalishlar',
      subtitle: 'O\'zingizga mos yo\'nalishni tanlang va o\'rganishni boshlang!',
      viewAll: 'Barchasini ko\'rish',
      coursesCount: 'kurs',
      names: {
        programming: 'Dasturlash',
        english: 'Ingliz tili',
        math: 'Matematika',
        business: 'Biznes',
        growth: 'Shaxsiy rivojlanish',
        art: 'Ijod va san\'at',
        music: 'Musiqa',
        sport: 'Sport va salomatlik',
        illustration: 'Rasm va illustratsiya',
        public_speaking: 'Notiqlik va muloqot',
        robotics: 'Robototexnika',
        sewing: 'Tikuvchilik',
        pottery: 'Kulolchilik',
        woodworking: 'Yog\'och o\'ymakorligi',
        cooking: 'Ovqat pishirish & Pazandalik',
        instruments: 'Musiqa asboblari chalish',
        mechanics: 'Mexanika & Avto ta\'mirlash',
      },
    },
    courses: {
      title: 'Tavsiya etilgan kurslar',
      viewAll: 'Barchasini ko\'rish',
      reviews: 'ta baho',
      currency: 'so\'m',
      saveTooltip: 'Saqlab qo\'yish',
      removeTooltip: 'Saqlanganlardan o\'chirish',
      courseTitles: {
        'course-1': 'Web dasturlash (HTML, CSS, JS)',
        'course-2': 'Ingliz tili (0 dan boshlab)',
        'course-3': 'Matematika (7-11 sinf)',
        'course-4': 'Onlayn biznes asoslari',
        'course-5': 'Motivatsiya va maqsadlar',
        'course-6': 'Sun\'iy intellekt va ChatGPT API',
        'course-7': 'Rasm va illyustratsiya: Raqamli san\'at asoslari',
        'course-8': 'Notiqlik va muloqot: Erkin so\'zlash san\'ati',
        'course-9': 'Robototexnika va Arduino: Aqlli robotlar yasash',
        'course-10': 'Tikuvchilik va liboslar dizayni: Bichish va tikish',
        'course-11': 'Kulolchilik san\'ati: Loydan nafis buyumlar yasash',
        'course-12': 'Yog\'och o\'ymakorligi san\'ati: Milliy naqshlar',
        'course-13': 'Pazandalik va milliy taomlar: Oshpazlik sirlari',
        'course-14': 'Gitara va dutor chalish: Noldan professional ijroga',
        'course-15': 'Avtomexanika va dvigatellar diagnostikasi',
      },
      categoryBadges: {
        programming: 'Dasturlash',
        english: 'Ingliz tili',
        math: 'Matematika',
        business: 'Biznes',
        growth: 'Shaxsiy rivojlanish',
        art: 'Ijod va san\'at',
        music: 'Musiqa',
        sport: 'Sport',
        illustration: 'Rasm va illustratsiya',
        public_speaking: 'Notiqlik va muloqot',
        robotics: 'Robototexnika',
        sewing: 'Tikuvchilik',
        pottery: 'Kulolchilik',
        woodworking: 'Yog\'och o\'ymakorligi',
        cooking: 'Ovqat pishirish',
        instruments: 'Musiqa asboblari',
        mechanics: 'Mexanik',
      },
    },
    searchResults: {
      forQuery: 'bo\'yicha qidiruv natijalari',
      totalResults: 'Jami mos keluvchi natijalar',
      clearFilter: 'Filtrni tozalash',
      matchingMentors: 'Mos Ustozlar',
      matchingGigs: 'Mos Mahoratlar',
      bookBtn: 'Bron',
      buyBtn: 'Xarid',
      perHour: 's. / soat',
    },
    footer: {
      quote: 'Bilim ulash — eng yaxshi savdo!',
      rights: 'Barcha huquqlar himoyalangan.',
      quickLinks: 'Tezkor havolalar',
      support: 'Qo\'llab-quvvatlash',
    },
    registerModal: {
      modalHeader: 'UstozPro • Ro\'yxatdan o\'tish',
      welcomeCharacter: 'Xush kelibsiz!',
      title: 'UstozPro-ga xush kelibsiz!',
      subtitle: 'Ryukzagimizdan kelajagingiz uchun kerakli barcha bilim qurollarini chiqaramiz!',
      backpackPuff: 'Ryukzak ochilmoqda...',
      stepStudent: 'Talaba / O\'rganuvchi',
      stepStudentDesc: 'Yangi bilim va mahoratlarni kuchli ustozlardan o\'rganish',
      stepMentor: 'Ustoz / Ekspert',
      stepMentorDesc: 'O\'z bilimi va mahoratini sotish hamda talabalarga dars berish',
      fullName: 'Ism va familiya',
      fullNamePlaceholder: 'Masalan: Sardor Rustamov',
      contactInfo: 'Telefon yoki Email',
      contactPlaceholder: '+998 90 123-45-67 yoki nom@domain.com',
      password: 'Yangi parol',
      passwordPlaceholder: 'Kamida 6 ta belgi',
      agreeTerms: 'Foydalanish shartlari va xavfsizlik qoidalariga roziman',
      submit: 'Akkount yaratish (Bepul)',
      orWith: 'yoki quyidagilar orqali kiring',
      haveAccount: 'Allaqachon akkountingiz bormi?',
      login: 'Kirish',
      skipAnimation: 'O\'tkazib yuborish ⚡',
      replayAnimation: 'Animatsiyani qaytarish 🎒',
      successTitle: 'Tabriklaymiz!',
      successDesc: 'Siz UstozPro oilasiga muvaffaqiyatli qo\'shildingiz!',
    },
  },
  ru: {
    navbar: {
      brandTitle: 'UstozPro',
      brandSubtitle: '(Торговля мастерством)',
      home: 'Главная',
      mentors: 'Наставники',
      courses: 'Курсы',
      categories: 'Категории',
      about: 'О нас',
      contact: 'Контакты',
      login: 'Войти',
      register: 'Регистрация',
      lightMode: 'Светлая тема',
      darkMode: 'Тёмная тема',
      language: 'Язык',
      badgeSkills: 'Навыки',
      badgeLive: 'Live',
      badgeAi: 'AI',
    },
    hero: {
      badge: 'Знание — величайшее богатство!',
      title1: 'UstozPro —',
      title2: 'торговля мастерством!',
      subtitle: 'Делитесь своими знаниями и опытом, развивайтесь сами и помогайте развиваться другим.',
      searchPlaceholder: 'Ищите наставника, курс или направление...',
      searchButton: 'Поиск',
      aiEcosystem: 'UstozPro AI Live Экосистема',
      popularFields: 'Популярные направления:',
      results: 'найдено результатов',
      quickSuggestions: 'Быстрые подсказки',
      suggestedTags: ['Программирование', 'Английский', 'Математика', 'Бизнес', 'Саморазвитие'],
      laptopSub: '(Торговля мастерством)',
      laptopSlogan1: 'Делись знаниями —',
      laptopSlogan2: 'строй будущее!',
      notebookLine1: 'Большие мечты',
      notebookLine2: 'начинаются с',
      notebookLine3: 'маленьких шагов',
      bookProgramming: 'Программирование',
      bookEnglish: 'Английский язык',
      bookMath: 'Математика',
      bookBusiness: 'Бизнес',
      bookGrowth: 'Саморазвитие',
    },
    trustFeatures: {
      feature1Title: 'Опытные наставники',
      feature1Desc: 'Повышайте знания вместе с экспертами своей области.',
      feature2Title: 'Безопасно и надежно',
      feature2Desc: 'Платежи и ваши данные находятся под полной защитой.',
      feature3Title: 'Удобный формат',
      feature3Desc: 'Онлайн и офлайн занятия в любое удобное время.',
      feature4Title: 'Широкий выбор',
      feature4Desc: 'Большой каталог преподавателей и практических курсов.',
    },
    categories: {
      title: 'Популярные направления',
      subtitle: 'Выберите подходящее направление и начните увлекательное обучение!',
      viewAll: 'Смотреть все',
      coursesCount: 'курсов',
      names: {
        programming: 'Программирование',
        english: 'Английский язык',
        math: 'Математика',
        business: 'Бизнес',
        growth: 'Саморазвитие',
        art: 'Искусство',
        music: 'Музыка',
        sport: 'Спорт и здоровье',
        illustration: 'Рисование и иллюстрация',
        public_speaking: 'Ораторское мастерство и общение',
        robotics: 'Робототехника',
        sewing: 'Шитье и дизайн одежды',
        pottery: 'Гончарное дело',
        woodworking: 'Резьба по дереву',
        cooking: 'Кулинария и поварское дело',
        instruments: 'Музыкальные инструменты',
        mechanics: 'Механика и автодело',
      },
    },
    courses: {
      title: 'Рекомендуемые курсы',
      viewAll: 'Смотреть все',
      reviews: 'оценок',
      currency: 'сум',
      saveTooltip: 'Сохранить курс',
      removeTooltip: 'Удалить из сохраненных',
      courseTitles: {
        'course-1': 'Веб-разработка (HTML, CSS, JS)',
        'course-2': 'Английский язык (с нуля)',
        'course-3': 'Математика (7-11 классы)',
        'course-4': 'Основы онлайн-бизнеса',
        'course-5': 'Мотивация и цели',
        'course-6': 'Искусственный интеллект и ChatGPT API',
        'course-7': 'Рисование и иллюстрация: Цифровой арт',
        'course-8': 'Ораторское мастерство и публичные выступления',
        'course-9': 'Робототехника и Arduino: Умные роботы',
        'course-10': 'Шитье и дизайн одежды: Кройка и пошив',
        'course-11': 'Гончарное искусство: Керамика из глины',
        'course-12': 'Резьба по дереву: Традиционные орнаменты',
        'course-13': 'Кулинарное мастерство и национальная кухня',
        'course-14': 'Игра на гитаре и дутаре с нуля',
        'course-15': 'Автомеханика и диагностика двигателей',
      },
      categoryBadges: {
        programming: 'Программирование',
        english: 'Английский',
        math: 'Математика',
        business: 'Бизнес',
        growth: 'Саморазвитие',
        art: 'Искусство',
        music: 'Музыка',
        sport: 'Спорт',
        illustration: 'Иллюстрация',
        public_speaking: 'Ораторство',
        robotics: 'Робототехника',
        sewing: 'Шитье',
        pottery: 'Гончарство',
        woodworking: 'Резьба по дереву',
        cooking: 'Кулинария',
        instruments: 'Муз. инструменты',
        mechanics: 'Автомеханика',
      },
    },
    searchResults: {
      forQuery: 'Результаты поиска по запросу',
      totalResults: 'Всего подходящих результатов',
      clearFilter: 'Сбросить фильтр',
      matchingMentors: 'Подходящие наставники',
      matchingGigs: 'Подходящие навыки',
      bookBtn: 'Бронь',
      buyBtn: 'Купить',
      perHour: 'сум / час',
    },
    footer: {
      quote: 'Делиться знаниями — лучшая сделка!',
      rights: 'Все права защищены.',
      quickLinks: 'Быстрые ссылки',
      support: 'Служба поддержки',
    },
    registerModal: {
      modalHeader: 'UstozPro • Регистрация',
      welcomeCharacter: 'Добро пожаловать!',
      title: 'Добро пожаловать в UstozPro!',
      subtitle: 'Достаем из нашего рюкзака все необходимые инструменты для вашего успеха!',
      backpackPuff: 'Открываем рюкзак...',
      stepStudent: 'Студент / Ученик',
      stepStudentDesc: 'Осваивайте новые навыки у лучших наставников',
      stepMentor: 'Наставник / Эксперт',
      stepMentorDesc: 'Продавайте свои навыки и обучайте других',
      fullName: 'Имя и фамилия',
      fullNamePlaceholder: 'Например: Сардор Рустамов',
      contactInfo: 'Телефон или Email',
      contactPlaceholder: '+998 90 123-45-67 или email@domain.com',
      password: 'Новый пароль',
      passwordPlaceholder: 'Минимум 6 символов',
      agreeTerms: 'Согласен с правилами сервиса и безопасностью',
      submit: 'Создать аккаунт (Бесплатно)',
      orWith: 'или войдите через',
      haveAccount: 'Уже есть аккаунт?',
      login: 'Войти',
      skipAnimation: 'Пропустить ⚡',
      replayAnimation: 'Повторить анимацию 🎒',
      successTitle: 'Поздравляем!',
      successDesc: 'Вы успешно присоединились к сообществу UstozPro!',
    },
  },
  en: {
    navbar: {
      brandTitle: 'UstozPro',
      brandSubtitle: '(Skill Marketplace)',
      home: 'Home',
      mentors: 'Mentors',
      courses: 'Courses',
      categories: 'Categories',
      about: 'About Us',
      contact: 'Contact',
      login: 'Sign In',
      register: 'Register',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: 'Language',
      badgeSkills: 'Skills',
      badgeLive: 'Live',
      badgeAi: 'AI',
    },
    hero: {
      badge: 'Knowledge is the greatest wealth!',
      title1: 'UstozPro —',
      title2: 'skill marketplace!',
      subtitle: 'Share your knowledge and experience here, grow yourself and empower others.',
      searchPlaceholder: 'Search for mentor, course or field...',
      searchButton: 'Search',
      aiEcosystem: 'UstozPro AI Live Ecosystem',
      popularFields: 'Popular fields:',
      results: 'results found',
      quickSuggestions: 'Quick search suggestions',
      suggestedTags: ['Programming', 'English', 'Mathematics', 'Business', 'Personal Growth'],
      laptopSub: '(Skill Marketplace)',
      laptopSlogan1: 'Share knowledge —',
      laptopSlogan2: 'build the future!',
      notebookLine1: 'Big dreams',
      notebookLine2: 'begin with',
      notebookLine3: 'small steps',
      bookProgramming: 'Programming',
      bookEnglish: 'English',
      bookMath: 'Mathematics',
      bookBusiness: 'Business',
      bookGrowth: 'Personal Growth',
    },
    trustFeatures: {
      feature1Title: 'Experienced Mentors',
      feature1Desc: 'Level up your skills with certified industry experts.',
      feature2Title: 'Safe & Reliable',
      feature2Desc: 'Your payments and personal data are fully protected.',
      feature3Title: 'Flexible Format',
      feature3Desc: 'Online and offline classes at your convenient schedule.',
      feature4Title: 'Wide Selection',
      feature4Desc: 'A vast directory of top mentors and interactive courses.',
    },
    categories: {
      title: 'Popular Fields',
      subtitle: 'Pick the right path for you and start learning today!',
      viewAll: 'View All',
      coursesCount: 'courses',
      names: {
        programming: 'Programming',
        english: 'English',
        math: 'Mathematics',
        business: 'Business',
        growth: 'Personal Growth',
        art: 'Arts & Design',
        music: 'Music',
        sport: 'Fitness & Sports',
        illustration: 'Drawing & Illustration',
        public_speaking: 'Public Speaking & Speech',
        robotics: 'Robotics & STEM',
        sewing: 'Sewing & Tailoring',
        pottery: 'Pottery & Ceramics',
        woodworking: 'Wood Carving & Craft',
        cooking: 'Cooking & Culinary Arts',
        instruments: 'Musical Instruments',
        mechanics: 'Mechanics & Auto Repair',
      },
    },
    courses: {
      title: 'Recommended Courses',
      viewAll: 'View All',
      reviews: 'reviews',
      currency: 'UZS',
      saveTooltip: 'Save course',
      removeTooltip: 'Remove from saved',
      courseTitles: {
        'course-1': 'Web Development (HTML, CSS, JS)',
        'course-2': 'English Language (From Zero to Pro)',
        'course-3': 'Mathematics (Grades 7-11)',
        'course-4': 'Online Business Fundamentals',
        'course-5': 'Motivation & Goal Setting',
        'course-6': 'AI & ChatGPT API Masterclass',
        'course-7': 'Drawing & Illustration: Digital Art',
        'course-8': 'Public Speaking & Confident Speech',
        'course-9': 'Robotics & Arduino: Smart Bots',
        'course-10': 'Sewing & Fashion Design Masterclass',
        'course-11': 'Art of Pottery & Clay Ceramics',
        'course-12': 'Wood Carving & Traditional Craft',
        'course-13': 'Culinary Arts & Master Chef Recipes',
        'course-14': 'Guitar & Dutar Playing from Scratch',
        'course-15': 'Auto Mechanics & Engine Diagnostics',
      },
      categoryBadges: {
        programming: 'Programming',
        english: 'English',
        math: 'Mathematics',
        business: 'Business',
        growth: 'Personal Growth',
        art: 'Art',
        music: 'Music',
        sport: 'Sports',
        illustration: 'Illustration',
        public_speaking: 'Public Speaking',
        robotics: 'Robotics',
        sewing: 'Sewing',
        pottery: 'Pottery',
        woodworking: 'Wood Carving',
        cooking: 'Cooking',
        instruments: 'Music Instruments',
        mechanics: 'Mechanics',
      },
    },
    searchResults: {
      forQuery: 'Search results for',
      totalResults: 'Total matching results',
      clearFilter: 'Clear filter',
      matchingMentors: 'Matching Mentors',
      matchingGigs: 'Matching Skills',
      bookBtn: 'Book',
      buyBtn: 'Order',
      perHour: 'UZS / hour',
    },
    footer: {
      quote: 'Sharing knowledge is the finest trade!',
      rights: 'All rights reserved.',
      quickLinks: 'Quick Links',
      support: 'Help & Support',
    },
    registerModal: {
      modalHeader: 'UstozPro • Registration',
      welcomeCharacter: 'Welcome!',
      title: 'Welcome to UstozPro!',
      subtitle: 'Unpacking all the tools from our backpack for your bright future!',
      backpackPuff: 'Opening the backpack...',
      stepStudent: 'Student / Learner',
      stepStudentDesc: 'Learn in-demand skills from certified mentors',
      stepMentor: 'Mentor / Expert',
      stepMentorDesc: 'Monetize your expertise and mentor students',
      fullName: 'Full name',
      fullNamePlaceholder: 'e.g. Sardor Rustamov',
      contactInfo: 'Phone or Email',
      contactPlaceholder: '+998 90 123-45-67 or email@domain.com',
      password: 'New password',
      passwordPlaceholder: 'At least 6 characters',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
      submit: 'Create Account (Free)',
      orWith: 'or continue with',
      haveAccount: 'Already have an account?',
      login: 'Sign In',
      skipAnimation: 'Skip ⚡',
      replayAnimation: 'Replay animation 🎒',
      successTitle: 'Congratulations!',
      successDesc: 'You have successfully joined the UstozPro community!',
    },
  },
};
