const registerPortfolioApp = () => {
    if (typeof Alpine === 'undefined' || !Alpine.data) return;
    // ثبت کامپوننت اصلی رزومه
    Alpine.data('portfolioApp', () => ({
        isMobileMenuOpen: false,
        showScrollTop: false,
        scrollProgress: 0,
        activeSection: 'hero',
        user: {
            login: 'alirezaevil81',
            name: 'علی رضا هرجی',
            avatar_url: 'https://avatars.githubusercontent.com/u/60322583?v=4',
            bio: 'Dynamic PHP & Python Developer with a strong focus on architecting efficient backend solutions, building scalable RESTful APIs, optimizing high-traffic databases, and collaborating effectively in modern Agile teams.',
            location: 'Nowshahr, Mazandaran',
            blog: 'https://exxondev.ir',
            html_url: 'https://github.com/alirezaevil81',
            hireable: true,
            created_at: '2021-04-10T00:00:00Z',
            public_repos: 14,
            followers: 12,
            following: 18
        },

        // Language State (fa | en)
        lang: localStorage.getItem('app_lang') || 'fa',

        setLang(newLang) {
            if (this.lang === newLang) return;
            this.isMobileMenuOpen = false;
            this.lang = newLang;
            localStorage.setItem('app_lang', newLang);
            this.applyLang();
        },

        toggleLang() {
            this.setLang(this.lang === 'fa' ? 'en' : 'fa');
        },

        applyLang() {
            document.documentElement.lang = this.lang;
            document.documentElement.dir = this.lang === 'fa' ? 'rtl' : 'ltr';
            document.title = this.lang === 'fa' 
                ? 'رزومه علی رضا هرجی | Alireza Haraji Resume' 
                : 'Alireza Haraji | Resume & Portfolio';
            
            this.typedStrings = this.lang === 'fa' ? this.typedStringsFa : this.typedStringsEn;
            this.stringIndex = 0;
            this.typedText = '';
            this.isDeleting = false;
            if (this.typeTimeout) {
                clearTimeout(this.typeTimeout);
                this.type();
            }
        },

        t(key) {
            if (!key) return '';
            const keys = key.split('.');
            let current = this.translations[this.lang] || this.translations['fa'];
            for (const k of keys) {
                if (current && current[k] !== undefined) {
                    current = current[k];
                } else {
                    let fallback = this.translations['en'];
                    for (const fk of keys) {
                        if (fallback && fallback[fk] !== undefined) {
                            fallback = fallback[fk];
                        } else {
                            return key;
                        }
                    }
                    return fallback;
                }
            }
            return current;
        },

        getLocalized(obj) {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            return obj[this.lang] || obj['fa'] || obj['en'] || '';
        },

        translations: {
            fa: {
                nav: {
                    home: 'خانه',
                    about: 'درباره من',
                    skills: 'مهارت‌ها و استک',
                    resume: 'سوابق و تجربیات',
                    portfolio: 'نمونه‌کارها',
                    ready: 'آماده همکاری',
                    role: 'توسعه‌دهنده بک‌اند و نرم‌افزار',
                    github: 'پروفایل گیت‌هاب',
                    email: 'ارسال ایمیل',
                    website: 'وب‌سایت شخصی',
                    quickNav: 'دسترسی سریع'
                },
                hero: {
                    badge: 'آماده برای پروژه‌ها و همکاری‌های جدید',
                    prefix: 'من',
                    name: 'علی رضا هرجی',
                    suffix: '',
                    subtitle: 'متخصص در طراحی و پیاده‌سازی معماری‌های پایدار بک‌اند، توسعه REST APIهای پرسرعت، بهینه‌سازی دیتابیس و برنامه‌نویسی وب‌اپلیکیشن‌های مدرن.',
                    ctaPortfolio: 'مشاهده نمونه‌کارها',
                    ctaAbout: 'درباره من',
                    scroll: 'اسکرول به پایین'
                },
                about: {
                    badge: 'بیوگرافی و هویت حرفه‌ای',
                    title: 'درباره من',
                    subtitle: 'توسعه‌دهنده پرانگیزه بک‌اند متعهد به مهندسی سرویس‌های پایدار، نرم‌افزارهای مقیاس‌پذیر و کدهای تمیز و قابل نگهداری.',
                    bio: 'توسعه‌دهنده پویا و خلاق PHP و Python با تمرکز عمیق بر معماری راه‌حل‌های کارآمد سمت سرور، ساخت REST APIهای مقیاس‌پذیر، بهینه‌سازی دیتابیس‌های پرترافیک و همکاری موثر در تیم‌های چابک (Agile).',
                    headline: 'متخصص بک‌اند · توسعه‌دهنده پایتون و PHP · معمار API',
                    available: 'آماده همکاری',
                    busy: 'مشغول در پروژه',
                    emailMe: 'ارسال ایمیل',
                    backgroundTitle: 'پیشینه و تجارب حرفه‌ای',
                    location: 'محل سکونت',
                    locationVal: 'ایران، مازندران، نوشهر',
                    seniority: 'سطح تخصص',
                    seniorityVal: 'توسعه‌دهنده سطح میانی بک‌اند',
                    ageExp: 'سن و سابقه',
                    ageExpVal: 'ساله · بیش از ۵ سال تجربه',
                    website: 'وب‌سایت',
                    email: 'ایمیل',
                    workStatus: 'وضعیت کاری',
                    workStatusAvailable: 'آماده همکاری / دورکاری',
                    workStatusBusy: 'مشغول در پروژه فعلی',
                    githubMetrics: 'شاخص‌های زنده گیت‌هاب',
                    liveSync: 'همگام‌سازی زنده',
                    followers: 'دنبال‌کنندگان',
                    following: 'دنبال‌شوندگان',
                    publicRepos: 'مخازن عمومی',
                    publicGists: 'گیست‌های عمومی'
                },
                skills: {
                    badge: 'توانمندی‌ها و استک فنی',
                    title: 'تسلط و مهارت‌های فنی',
                    subtitle: 'نگاهی جامع به فناوری‌های بنیادین، الگوهای معماری، فریم‌ورک‌ها و متدولوژی‌های مهندسی نرم‌افزار.',
                    coreLanguages: 'زبان‌های اصلی و تخصص‌های کلیدی',
                    masteryAssessment: 'ارزیابی تسلط',
                    expert: 'تسلط عالی',
                    advanced: 'تسلط پیشرفته',
                    proficient: 'ماهر',
                    ecosystem: 'اکوسیستم، فریم‌ورک‌ها و ابزارها',
                    categorizedStack: 'استک دسته‌بندی‌شده',
                    mindsetTitle: 'طرز فکر مهندسی و رویه‌های حرفه‌ای',
                    mindsetSubtitle: 'اصول معماری، استانداردهای امنیتی، راهکارهای کارایی بالا و فرهنگ کار تیمی که جریان کار روزانه من را هدایت می‌کنند.',
                    standard: 'استاندارد',
                    guarantee1Title: 'رویکرد تست‌محور',
                    guarantee1Sub: 'پایدار و منعطف',
                    guarantee2Title: 'مستندسازی تمیز',
                    guarantee2Sub: 'خوانا و قابل نگهداری',
                    guarantee3Title: 'تمرکز بر امنیت',
                    guarantee3Sub: 'دفاع چندلایه',
                    guarantee4Title: 'کارایی حداکثری',
                    guarantee4Sub: 'تاخیر بهینه‌شده'
                },
                resume: {
                    badge: 'کارنامه حرفه‌ای',
                    title: 'سوابق و تجربیات کاری',
                    subtitle: 'مروری جامع بر مسیر رشد فنی، تجربیات کاری حرفه‌ای و سوابق تحصیلی.',
                    stat1: 'سال سابقه کار',
                    stat2: 'حوزه تخصصی اصلی',
                    stat3: 'یادگیری مستمر',
                    stat4: 'همکاری چابک تیمی',
                    summaryTitle: 'خلاصه حرفه‌ای',
                    summarySub: 'دید کلی و نقاط قوت محوری',
                    summaryText: 'توسعه‌دهنده پویای بک‌اند مسلط بر پایتون و PHP با سابقه مشخص در توسعه وب‌سرویس‌های کارآمد، اصلاح و بازسازی ساختار کدهای قدیمی و راهنمایی تیم‌ها در رعایت بهترین الگوهای کدنویسی. متخصص در مدیریت دیتابیس، ساخت APIهای مقیاس‌پذیر و بهینه‌سازی پیوسته عملکرد سرور.',
                    badge1: 'معماری بک‌اند',
                    badge2: 'مهندسی API',
                    badge3: 'راهبری تیم',
                    badge4: 'مدیریت پایگاه‌داده',
                    educationTitle: 'تحصیلات و آموزش',
                    experienceTitle: 'سوابق شغلی',
                    present: 'اکنون',
                    skillsLabel: 'مهارت‌ها:'
                },
                portfolio: {
                    title: 'نمونه‌کارها و پروژه‌ها',
                    subtitle: 'ویترینی از پروژه‌های اخیر، تلفیقی از کدهای تمیز و طراحی کارآمد.',
                    filterLabel: 'فیلتر بر اساس دسته‌بندی',
                    all: 'همه پروژه‌ها',
                    allProjects: 'همه پروژه‌ها',
                    visitWebsite: 'مشاهده وب‌سایت',
                    viewProject: 'مشاهده پروژه',
                    liveWebsite: 'وب‌سایت زنده',
                    loadingImg: 'در حال بارگذاری تصویر...',
                    explore: 'مشاهده',
                    emptyState: 'هیچ پروژه‌ای در این دسته‌بندی یافت نشد.',
                    noProjects: 'هیچ پروژه‌ای در این دسته‌بندی یافت نشد.',
                    showAll: 'نمایش همه پروژه‌ها'
                },
                footer: {
                    badge: 'آماده برای فرصت‌های جدید',
                    ctaTitle: 'پروژه یا چالشی در حوزه مهندسی نرم‌افزار دارید؟',
                    ctaSub: 'بیایید برای ساخت معماری‌های پایدار بک‌اند، APIهای پرسرعت یا پلتفرم‌های سفارشی وب همکاری کنیم.',
                    readyTitle: 'پروژه یا چالشی در حوزه مهندسی نرم‌افزار دارید؟',
                    readySubtitle: 'بیایید برای ساخت معماری‌های پایدار بک‌اند، APIهای پرسرعت یا پلتفرم‌های سفارشی وب همکاری کنیم.',
                    getInTouch: 'ارتباط با من',
                    githubProfile: 'پروفایل گیت‌هاب',
                    role: 'توسعه‌دهنده بک‌اند و نرم‌افزار',
                    bio: 'متمرکز بر توسعه سیستم‌های مقیاس‌پذیر بک‌اند با PHP و Python، میکروسرویس‌های تمیز، بهینه‌سازی دیتابیس و راه‌حل‌های پایدار وب.',
                    navTitle: 'دسترسی سریع',
                    quickNav: 'دسترسی سریع',
                    techTitle: 'استک فنی محوری',
                    coreStack: 'استک فنی محوری',
                    rights: 'تمامی حقوق محفوظ است.',
                    allRights: 'تمامی حقوق محفوظ است.',
                    craftedWith: 'طراحی و توسعه با',
                    using: 'با Tailwind مدرن و Alpine.js'
                }
            },
            en: {
                nav: {
                    home: 'Home',
                    about: 'About Me',
                    skills: 'Skills & Stack',
                    resume: 'Experience',
                    portfolio: 'Portfolio',
                    ready: 'Available for work',
                    role: 'Backend & Software Dev',
                    github: 'GitHub Profile',
                    email: 'Send Email',
                    website: 'Personal Website',
                    quickNav: 'Quick Navigation'
                },
                hero: {
                    badge: 'Available for New Projects & Collaborations',
                    prefix: "Hi, I'm a",
                    name: 'Alireza Haraji',
                    suffix: '',
                    subtitle: 'Specializing in robust backend architectures, high-performance APIs, database optimization, and modern web application development.',
                    ctaPortfolio: 'Explore My Work',
                    ctaAbout: 'About Me',
                    scroll: 'Scroll Down'
                },
                about: {
                    badge: 'Biography & Persona',
                    title: 'About Me',
                    subtitle: 'Passionate Backend Engineer dedicated to architecting reliable services, scalable web apps, and clean maintainable code.',
                    bio: 'Dynamic PHP & Python Developer with a strong focus on architecting efficient backend solutions, building scalable RESTful APIs, optimizing high-traffic databases, and collaborating effectively in modern Agile teams.',
                    headline: 'Backend Specialist · Python & PHP Developer · API Architect',
                    available: 'Available',
                    busy: 'Currently Engaged',
                    emailMe: 'Email Me',
                    backgroundTitle: 'Professional Background',
                    location: 'Location',
                    locationVal: 'Nowshahr, Mazandaran',
                    seniority: 'Seniority',
                    seniorityVal: 'Mid-Level Backend Dev',
                    ageExp: 'Age & Experience',
                    ageExpVal: 'Yrs Old · 5+ Yrs Exp',
                    website: 'Website',
                    email: 'Email',
                    workStatus: 'Work Status',
                    workStatusAvailable: 'Available / Remote',
                    workStatusBusy: 'Currently Engaged',
                    githubMetrics: 'GitHub Real-Time Metrics',
                    liveSync: 'Live Sync',
                    followers: 'Followers',
                    following: 'Following',
                    publicRepos: 'Public Repos',
                    publicGists: 'Public Gists'
                },
                skills: {
                    badge: 'Capabilities & Tech Stack',
                    title: 'Technical Proficiency',
                    subtitle: 'A comprehensive overview of core technologies, architectural paradigms, frameworks, and engineering methodologies.',
                    coreLanguages: 'Core Languages & Primary Specializations',
                    masteryAssessment: 'Mastery Assessment',
                    expert: 'Expert Proficiency',
                    advanced: 'Advanced Proficiency',
                    proficient: 'Proficient',
                    ecosystem: 'Ecosystem, Frameworks & Tooling',
                    categorizedStack: 'Categorized Stack',
                    mindsetTitle: 'Engineering Mindset & Professional Practices',
                    mindsetSubtitle: 'The architectural principles, security standards, performance guidelines, and collaboration culture that guide my daily development workflow.',
                    standard: 'Standard',
                    guarantee1Title: 'Test-Driven Mindset',
                    guarantee1Sub: 'Reliable & Resilient',
                    guarantee2Title: 'Clean Documentation',
                    guarantee2Sub: 'Readable & Maintainable',
                    guarantee3Title: 'Security Focused',
                    guarantee3Sub: 'Defense in Depth',
                    guarantee4Title: 'High Performance',
                    guarantee4Sub: 'Optimized Latency'
                },
                resume: {
                    badge: 'Curriculum Vitae',
                    title: 'My Resume & Experience',
                    subtitle: 'A comprehensive overview of my technical journey, professional development experience, and academic background.',
                    stat1: 'Years Experience',
                    stat2: 'Core Tech Stacks',
                    stat3: 'Dedicated Learner',
                    stat4: 'Team Collaboration',
                    summaryTitle: 'Professional Summary',
                    summarySub: 'Overview & Core Strengths',
                    summaryText: 'Dynamic Python and PHP backend developer with a solid track record in building efficient web services, refactoring architectures, and mentoring teams in coding best practices. Expert in database management, scalable API development, and continuous performance optimization.',
                    badge1: 'Backend Architecture',
                    badge2: 'API Engineering',
                    badge3: 'Team Mentorship',
                    badge4: 'Database Management',
                    educationTitle: 'Education & Training',
                    experienceTitle: 'Work Experience',
                    present: 'Present',
                    skillsLabel: 'Skills:'
                },
                portfolio: {
                    title: 'Featured Works',
                    subtitle: 'A showcase of my recent projects, blending clean code with functional design.',
                    filterLabel: 'Filter by Category',
                    all: 'All Projects',
                    allProjects: 'All Projects',
                    visitWebsite: 'Visit Website',
                    viewProject: 'View Project',
                    liveWebsite: 'Live Website',
                    loadingImg: 'Loading image...',
                    explore: 'Explore',
                    emptyState: 'No projects found in this category.',
                    noProjects: 'No projects found in this category.',
                    showAll: 'Show All Projects'
                },
                footer: {
                    badge: 'Ready for New Opportunities',
                    ctaTitle: 'Have a project or engineering challenge?',
                    ctaSub: "Let's collaborate to build resilient backend architectures, high-performance APIs, or custom web platforms.",
                    readyTitle: 'Have a project or engineering challenge?',
                    readySubtitle: "Let's collaborate to build resilient backend architectures, high-performance APIs, or custom web platforms.",
                    getInTouch: 'Get in Touch',
                    githubProfile: 'GitHub Profile',
                    role: 'Backend & Software Engineer',
                    bio: 'Focused on crafting scalable PHP & Python backend systems, clean microservices, database optimizations, and robust web solutions.',
                    navTitle: 'Quick Navigation',
                    quickNav: 'Quick Navigation',
                    techTitle: 'Core Tech Stack',
                    coreStack: 'Core Tech Stack',
                    rights: 'All rights reserved.',
                    allRights: 'All rights reserved.',
                    craftedWith: 'Crafted with',
                    using: 'using Modern Tailwind & Alpine.js'
                }
            }
        },

        // Theme Management State (light | dark | system)
        theme: localStorage.getItem('theme') || 'system',

        setTheme(mode) {
            this.theme = mode;
            localStorage.setItem('theme', mode);
            this.applyTheme();
            this.updateHeroBg();
            this.updatePortfolioImages();
        },

        getIsDark() {
            if (this.theme === 'dark') return true;
            if (this.theme === 'light') return false;
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        },

        getThemeImages(type) {
            const isDark = this.getIsDark();
            const modeKey = isDark ? 'dark' : 'light';
            if (this.imageAssets && this.imageAssets[modeKey] && Array.isArray(this.imageAssets[modeKey][type]) && this.imageAssets[modeKey][type].length > 0) {
                return this.imageAssets[modeKey][type];
            }
            if (this.imageAssets && Array.isArray(this.imageAssets[type]) && this.imageAssets[type].length > 0) {
                return this.imageAssets[type];
            }
            return [];
        },

        updateHeroBg() {
            const bgList = this.getThemeImages('backgrounds');
            if (bgList.length > 0) {
                this.heroBg = bgList[Math.floor(Math.random() * bgList.length)];
            }
        },

        updatePortfolioImages() {
            const placeholders = this.getThemeImages('placeholderImgs');
            if (!placeholders || placeholders.length === 0) return;

            let nonCustomCounter = 0;
            this.portfolioItems.forEach(item => {
                if (!item.isCustomImg) {
                    if (item.placeholderIndex === undefined) {
                        item.placeholderIndex = nonCustomCounter;
                    }
                    nonCustomCounter++;
                    const newSrc = placeholders[item.placeholderIndex % placeholders.length];
                    if (item.imgSrc !== newSrc) {
                        item.imgLoaded = false;
                        item.imgSrc = newSrc;
                    }
                }
            });
        },

        applyTheme() {
            let isDark = this.getIsDark();
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        // GitHub Preloader State
        isLoading: true,
        loadingProgress: 15,
        loadingStepIndex: 0,
        loadingLogs: [
            { text: 'git init --quiet && git remote add origin https://github.com/alirezaevil81.git', done: true },
            { text: 'fetching remote repositories & live profile metadata...', done: false },
            { text: 'resolving technical matrix & component trees...', done: false },
            { text: 'production build synchronized successfully [branch: main] ✓', done: false }
        ],
        
        // Typewriter Logic
        typedText: '',
        typedStringsEn: ['PHP Developer', 'Python Developer', 'Laravel Developer', 'WordPress Developer', 'Backend Specialist', 'API & Web Architect'],
        typedStringsFa: ['برنامه‌نویس PHP هستم', 'برنامه‌نویس پایتون هستم', 'برنامه‌نویس لاراول هستم', 'برنامه‌نویس وردپرس هستم', 'توسعه‌دهنده بک‌اند هستم', 'معمار وب و API هستم'],
        typedStrings: ['برنامه‌نویس PHP هستم', 'برنامه‌نویس پایتون هستم', 'برنامه‌نویس لاراول هستم', 'برنامه‌نویس وردپرس هستم', 'توسعه‌دهنده بک‌اند هستم', 'معمار وب و API هستم'],
        stringIndex: 0,
        isDeleting: false,
        typeTimeout: null,

        // UI States for animations
        showHeroContent: false,
        showAboutContent: false,
        showStats: [false, false, false, false], // Followers, Following, Repos, Gists

        // Skill Data
        skills: [
            { 
                name: 'PHP / Laravel', 
                level: '85%', 
                numericLevel: 85,
                icon: 'fa-brands fa-php', 
                iconBg: 'bg-indigo-50 text-indigo-600', 
                barGradient: 'from-indigo-500 to-indigo-700',
                badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
                tagline: {
                    fa: 'معماری بک‌اند، REST API و Eloquent ORM',
                    en: 'Backend Architecture, REST APIs & Eloquent ORM'
                }
            },
            { 
                name: 'Python / Django', 
                level: '75%', 
                numericLevel: 75,
                icon: 'fa-brands fa-python', 
                iconBg: 'bg-blue-50 text-blue-600', 
                barGradient: 'from-blue-600 to-yellow-500',
                badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
                tagline: {
                    fa: 'الگوریتم‌ها، پردازش داده و سیستم‌های میان‌افزاری',
                    en: 'Algorithms, Data Processing & Middleware Systems'
                }
            },
            { 
                name: 'WordPress / CMS', 
                level: '90%', 
                numericLevel: 90,
                icon: 'fa-brands fa-wordpress', 
                iconBg: 'bg-sky-50 text-sky-600', 
                barGradient: 'from-sky-500 to-blue-700',
                badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
                tagline: {
                    fa: 'توسعه افزونه‌های اختصاصی، ووکامرس و هدلس',
                    en: 'Custom Plugin Development, WooCommerce & Headless'
                }
            },
            { 
                name: 'MySQL & Databases', 
                level: '85%', 
                numericLevel: 85,
                icon: 'fa-solid fa-database', 
                iconBg: 'bg-emerald-50 text-emerald-600', 
                barGradient: 'from-emerald-500 to-teal-700',
                badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                tagline: {
                    fa: 'طراحی اسکیما، بهینه‌سازی کوئری و یکپارچگی داده‌ها',
                    en: 'Schema Design, Query Optimization & Data Integrity'
                }
            },
            { 
                name: 'JavaScript & Web APIs', 
                level: '70%', 
                numericLevel: 70,
                icon: 'fa-brands fa-square-js', 
                iconBg: 'bg-amber-50 text-amber-500', 
                barGradient: 'from-amber-400 to-yellow-600',
                badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
                tagline: {
                    fa: 'اکمااسکریپت مدرن، تعامل با DOM و Alpine.js',
                    en: 'Modern ES6+, DOM Manipulation & Alpine.js'
                }
            },
            { 
                name: 'HTML5 & Modern CSS / Tailwind', 
                level: '95%', 
                numericLevel: 95,
                icon: 'fa-brands fa-html5', 
                iconBg: 'bg-orange-50 text-orange-600', 
                barGradient: 'from-orange-500 to-red-600',
                badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
                tagline: {
                    fa: 'ساختار معنایی، Tailwind CSS و رابط کاربری واکنش‌گرا',
                    en: 'Semantic Architecture, Tailwind CSS & Responsive UI'
                }
            }
        ],
        skillCategories: [
            { 
                title: { fa: 'بک‌اند و دیتابیس‌ها', en: 'Backend & Databases' }, 
                icon: 'fa-solid fa-server',
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Node.js', 'RESTful APIs', 'Database Indexing'] 
            },
            { 
                title: { fa: 'فریم‌ورک‌ها و CMS', en: 'Frameworks & CMS' }, 
                icon: 'fa-solid fa-layer-group',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                skills: ['Laravel', 'Django', 'FastAPI', 'Flask', 'WordPress', 'WooCommerce', 'Blade', 'Symfony'] 
            },
            { 
                title: { fa: 'معماری و مهندسی نرم‌افزار', en: 'Core Architecture' }, 
                icon: 'fa-solid fa-cubes-stacked',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                skills: ['OOP (Object-Oriented)', 'Design Patterns', 'Socket Programming', 'Multithreading', 'Microservices', 'API Security'] 
            },
            { 
                title: { fa: 'دوآپس و ابزارهای توسعه', en: 'DevOps & Engineering' }, 
                icon: 'fa-solid fa-terminal',
                color: 'text-amber-600 bg-amber-50 border-amber-200',
                skills: ['Git / GitHub', 'Docker', 'Linux / Bash', 'CI/CD Pipelines', 'Agile / Scrum', 'Unit Testing', 'Postman', 'SEO'] 
            }
        ],
        softSkills: [
            { 
                category: { fa: 'مهندسی کد', en: 'Code Craftsmanship' },
                title: { fa: 'معماری تمیز و اصول SOLID', en: 'Clean Architecture & SOLID' }, 
                description: {
                    fa: 'ساختاردهی کدهای مقیاس‌پذیر با تفکیک وظایف، اصول DRY و الگوهای طراحی خوانا و قابل نگهداری.',
                    en: 'Structuring scalable codebases with strict separation of concerns, DRY principles, and maintainable design patterns.'
                },
                icon: 'fa-solid fa-code',
                color: 'text-blue-600 bg-blue-50 border-blue-200/80',
                accentBar: 'bg-blue-600',
                tag: { fa: 'نگهداری_پذیری', en: 'Maintainability' }
            },
            { 
                category: { fa: 'کیفیت سیستم', en: 'System Quality' },
                title: { fa: 'کارایی و بهینه‌سازی کش', en: 'Performance & Caching' }, 
                description: {
                    fa: 'بهینه‌سازی اجرای کوئری‌های پرترافیک، ایندکس‌گذاری دیتابیس، کاهش تاخیر و استراتژی‌های کشینگ حافظه.',
                    en: 'Optimizing high-throughput query execution, database indexing, latency reduction, and memory caching strategies.'
                },
                icon: 'fa-solid fa-gauge-high',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200/80',
                accentBar: 'bg-indigo-600',
                tag: { fa: 'توان_پردازشی_بالا', en: 'High Throughput' }
            },
            { 
                category: { fa: 'امنیت در اولویت', en: 'Security First' },
                title: { fa: 'کدنویسی امن و استانداردهای OWASP', en: 'Secure Coding & OWASP' }, 
                description: {
                    fa: 'اعتبارسنجی دقیق ورودی‌ها، احراز هویت توکن‌محور، محدودسازی نرخ درخواست و طراحی تدافعی API.',
                    en: 'Implementing rigorous input sanitization, token-based authentication, rate limiting, and defensive API design.'
                },
                icon: 'fa-solid fa-shield-halved',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
                accentBar: 'bg-emerald-600',
                tag: { fa: 'امنیت_محور', en: 'Security by Design' }
            },
            { 
                category: { fa: 'فرهنگ چابک', en: 'Agile Culture' },
                title: { fa: 'متدولوژی چابک و منتورینگ تیم', en: 'Agile & Team Mentorship' }, 
                description: {
                    fa: 'مشارکت فعال در اسپرینت‌ها، مدیریت بک‌لاگ، بازبینی سازنده کدها و همراهی و راهنمایی توسعه‌دهندگان.',
                    en: 'Active participation in sprint workflows, backlog grooming, constructive peer reviews, and onboarding junior developers.'
                },
                icon: 'fa-solid fa-users-gear',
                color: 'text-amber-600 bg-amber-50 border-amber-200/80',
                accentBar: 'bg-amber-600',
                tag: { fa: 'همکاری_تیمی', en: 'Collaboration' }
            },
            { 
                category: { fa: 'پایداری عملیاتی', en: 'Operational Reliability' },
                title: { fa: 'عیب‌یابی و قابلیت مشاهده‌پذیری', en: 'Troubleshooting & Observability' }, 
                description: {
                    fa: 'تحلیل سریع ریشه خطاها، ردیابی خطاهای پروداکشن، لاگ‌گذاری ساختاریافته و دیباگ پیشگیرانه در سیستم‌های زنده.',
                    en: 'Rapid root-cause analysis, production error tracking, structured logging, and preventive debugging in live services.'
                },
                icon: 'fa-solid fa-screwdriver-wrench',
                color: 'text-rose-600 bg-rose-50 border-rose-200/80',
                accentBar: 'bg-rose-600',
                tag: { fa: 'پایداری_حداکثری', en: 'Zero Downtime' }
            },
            { 
                category: { fa: 'حل مسئله', en: 'Problem Solving' },
                title: { fa: 'حل مسئله و تفکر الگوریتمی', en: 'Algorithmic Problem-Solving' }, 
                description: {
                    fa: 'تجزیه منطق پیچیده کسب‌وکار به الگوریتم‌های کارآمد، قابل تست و بهینه جهت پردازش و تبدیل داده‌ها.',
                    en: 'Breaking down complex business logic into efficient, testable, and optimized algorithms for data transformation.'
                },
                icon: 'fa-solid fa-brain',
                color: 'text-sky-600 bg-sky-50 border-sky-200/80',
                accentBar: 'bg-sky-600',
                tag: { fa: 'تفکر_تحلیلی', en: 'Analytical' }
            }
        ],

        // Education & Experience Data
        education: [
            {
                period: { fa: '۱۴۰۰ — اکنون', en: '2021 — Present' },
                location: { fa: 'ایران، مازندران، نوشهر', en: 'Nowshahr, Mazandaran' },
                title: { fa: 'مهندسی نرم‌افزار خودآموخته', en: 'Self-Taught Software Engineering' },
                description: {
                    fa: 'مطالعه عمیق مبانی علوم کامپیوتر، ساختمان داده‌ها، الگوریتم‌ها، پارادایم‌های مدرن پایتون و PHP، اصول کد تمیز و امنیت وب.',
                    en: 'Intensive study in computer science fundamentals, data structures, algorithms, modern Python and PHP paradigms, clean code principles, and web security.'
                }
            }
        ],

        experiences: [
            {
                role: { fa: 'توسعه‌دهنده پایتون', en: 'Python Developer' },
                tag: 'PYTHON',
                tagClass: 'bg-[#1E3A5F] text-[#FFD43B] border border-[#FFD43B]/40',
                badgeClass: 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200/70 dark:border-blue-700/60',
                dotClass: 'bg-blue-600',
                period: { fa: '۱۴۰۱ — اکنون', en: '2022 — Present' },
                subtitle: { fa: 'مهندسی بک‌اند و سرویس‌های میان‌افزاری', en: 'Backend Engineering & Middleware' },
                bullets: [
                    {
                        label: { fa: 'الگوریتم‌ها و پردازش داده:', en: 'Algorithm & Data Processing:' },
                        text: {
                            fa: 'طراحی و پیاده‌سازی الگوریتم‌های با راندمان بالا برای پردازش مجموعه‌داده‌های پیچیده.',
                            en: 'Designed and implemented high-efficiency algorithms for processing complex datasets.'
                        }
                    },
                    {
                        label: { fa: 'مربی‌گری تیم:', en: 'Team Mentorship:' },
                        text: {
                            fa: 'راهنمایی و منتورینگ توسعه‌دهندگان در زمینه معماری تمیز پایتون، استانداردهای PEP8 و آزمون‌نویسی.',
                            en: 'Mentored junior developers on Python clean architecture, PEP8 standards, and testing practices.'
                        }
                    },
                    {
                        label: { fa: 'اسپرینت‌های چابک:', en: 'Agile Sprints:' },
                        text: {
                            fa: 'مشارکت فعال با تیم‌های چندرشته‌ای در برنامه‌ریزی اسپرینت، تخمین استوری‌ها و مدیریت بک‌لاگ.',
                            en: 'Collaborated actively with cross-functional teams in sprint planning, story estimation, and backlog grooming.'
                        }
                    },
                    {
                        label: { fa: 'سرویس‌های میان‌افزار و پایداری:', en: 'Middleware & Stability:' },
                        text: {
                            fa: 'پایش، عیب‌یابی و حفظ پایداری عملیاتی مداوم سرویس‌های میان‌افزاری سمت سرور.',
                            en: 'Monitored, diagnosed, and maintained continuous operational readiness of middleware services.'
                        }
                    }
                ],
                skills: ['Python', 'Data Processing', 'Middleware', 'Agile / Scrum']
            },
            {
                role: { fa: 'توسعه‌دهنده PHP و وب‌مستر', en: 'PHP Developer & Webmaster' },
                tag: 'PHP',
                tagClass: 'bg-[#6366F1] text-white',
                badgeClass: 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-700/60',
                dotClass: 'bg-indigo-600',
                period: { fa: '۱۳۹۸ — اکنون', en: '2019 — Present' },
                subtitle: { fa: 'وب‌اپلیکیشن‌ها و راهکارهای تجارت الکترونیک', en: 'Web Applications & E-Commerce Solutions' },
                bullets: [
                    {
                        label: { fa: 'ارتقای فریم‌ورک:', en: 'Framework Enhancement:' },
                        text: {
                            fa: 'ارتقای قابلیت‌های هسته فریم‌ورک اختصاصی و افزایش چشمگیر بهره‌وری وب‌اپلیکیشن‌ها.',
                            en: 'Delivered core improvements to proprietary framework, significantly boosting web application efficiency.'
                        }
                    },
                    {
                        label: { fa: 'فروشگاه‌های مقیاس‌پذیر:', en: 'Scalable E-Commerce:' },
                        text: {
                            fa: 'توسعه و سفارشی‌سازی سامانه‌های مقیاس‌پذیر فروشگاهی با افزایش نرخ تبدیل و توان پردازش سفارشات.',
                            en: 'Developed and customized scalable e-commerce systems that elevated conversions and store throughput.'
                        }
                    },
                    {
                        label: { fa: 'سرویس‌های بک‌اند و API:', en: 'Backend Components & APIs:' },
                        text: {
                            fa: 'ساخت سرویس‌های سمت سرور جهت ارتباط واسط کاربری با APIهای جانبی و منطق بیزنس.',
                            en: 'Built back-end services connecting web interfaces to external APIs and server-side logic.'
                        }
                    },
                    {
                        label: { fa: 'پلاگین‌های اختصاصی وردپرس:', en: 'WordPress Custom Plugins:' },
                        text: {
                            fa: 'توسعه افزونه‌ها و ادغام‌های اختصاصی وردپرس جهت ایجاد قابلیت‌های سفارشی و ارتقای عملکرد.',
                            en: 'Developed specialized custom WordPress plugins and integrations for enhanced functionality.'
                        }
                    },
                    {
                        label: { fa: 'ریفکتورینگ کدهای قدیمی:', en: 'Legacy Refactoring:' },
                        text: {
                            fa: 'بهینه‌سازی کدهای قدیمی برای خوانایی بیشتر، افزایش سرعت کوئری‌های دیتابیس و ارتقای امنیت.',
                            en: 'Optimized legacy codebases for enhanced readability, database query performance, and security.'
                        }
                    },
                    {
                        label: { fa: 'عیب‌یابی در پروداکشن:', en: 'Production Troubleshooting:' },
                        text: {
                            fa: 'تشخیص و رفع فوری اختلالات فنی حساس در محیط‌های عملیاتی زنده.',
                            en: 'Rapidly diagnosed and resolved mission-critical technical issues in live environments.'
                        }
                    }
                ],
                skills: ['PHP', 'WordPress Plugins', 'REST APIs', 'MySQL', 'Performance Tuning']
            }
        ],

        // Image Assets Logic
        heroBg: '', // Selected background for hero section
        imageAssets: null, // Stores fetched image links from JSON

        // Portfolio Logic
        activeFilter: 'all',
        isCategoryDropdownOpen: false,
        portfolioItems: [
            { 
                imgSrc: 'assets/img/portfolio/compressorsepah.webp', 
                title: 'Compressorsepah', 
                description: {
                    fa: 'فروشگاه آنلاین انواع کمپرسور و ابزارآلات صنعتی با طراحی واکنش‌گرا و عملکرد بهینه‌شده',
                    en: 'Site for selling compressors and industrial tools with optimized performance'
                }, 
                link: 'https://compressorsepah.ir', 
                category: 'WordPress', 
                websiteUrl: 'https://compressorsepah.ir', 
                iframeLoaded: false, 
                imgLoaded: false, 
                isCustomImg: true 
            },
            { 
                imgSrc: 'assets/img/portfolio/azadpc.webp', 
                title: 'AzadPc', 
                description: {
                    fa: 'فروشگاه تخصصی قطعات کامپیوتر، لپ‌تاپ و سیستم‌های گیمینگ حرفه‌ای',
                    en: 'Site for shop pc and laptop gaming'
                }, 
                link: 'https://azadpc.com', 
                category: 'WordPress', 
                websiteUrl: 'https://azadpc.com', 
                iframeLoaded: false, 
                imgLoaded: false, 
                isCustomImg: true 
            },
        ],

        handleIframeLoad(item, event) {
            if (!item) return;
            item.iframeLoaded = true;
        },

        // Brand colors for specific tech stacks and categories
        categoryColors: {
            'php': {
                activeBtn: 'bg-[#6366F1] text-white shadow-md shadow-[#6366F1]/30',
                badge: 'bg-[#6366F1] text-white border-white/30',
                text: 'text-[#6366F1]',
                dot: 'bg-[#6366F1]',
                btnHover: 'hover:text-[#6366F1]'
            },
            'python': {
                activeBtn: 'bg-[#1E3A5F] text-[#FFD43B] shadow-md shadow-[#1E3A5F]/40 border border-[#FFD43B]/40',
                badge: 'bg-[#1E3A5F] text-[#FFD43B] border-[#FFD43B]/60 font-black',
                text: 'text-[#1E3A5F]',
                dot: 'bg-[#FFD43B]',
                btnHover: 'hover:text-[#1E3A5F]'
            },
            'wordpress': {
                activeBtn: 'bg-[#0073AA] text-white shadow-md shadow-[#0073AA]/30',
                badge: 'bg-[#0073AA] text-white border-white/30',
                text: 'text-[#0073AA]',
                dot: 'bg-[#0073AA]',
                btnHover: 'hover:text-[#0073AA]'
            },
            'blade': {
                activeBtn: 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/30',
                badge: 'bg-[#E11D48] text-white border-white/30',
                text: 'text-[#E11D48]',
                dot: 'bg-[#E11D48]',
                btnHover: 'hover:text-[#E11D48]'
            },
            'html': {
                activeBtn: 'bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/30',
                badge: 'bg-[#EA580C] text-white border-white/30',
                text: 'text-[#EA580C]',
                dot: 'bg-[#EA580C]',
                btnHover: 'hover:text-[#EA580C]'
            },
            'javascript': {
                activeBtn: 'bg-[#D97706] text-white shadow-md shadow-[#D97706]/30',
                badge: 'bg-[#D97706] text-white border-white/30',
                text: 'text-[#D97706]',
                dot: 'bg-[#D97706]',
                btnHover: 'hover:text-[#D97706]'
            },
            'typescript': {
                activeBtn: 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30',
                badge: 'bg-[#2563EB] text-white border-white/30',
                text: 'text-[#2563EB]',
                dot: 'bg-[#2563EB]',
                btnHover: 'hover:text-[#2563EB]'
            },
            'css': {
                activeBtn: 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30',
                badge: 'bg-[#0284C7] text-white border-white/30',
                text: 'text-[#0284C7]',
                dot: 'bg-[#0284C7]',
                btnHover: 'hover:text-[#0284C7]'
            },
            'vue': {
                activeBtn: 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/30',
                badge: 'bg-[#10B981] text-white border-white/30',
                text: 'text-[#10B981]',
                dot: 'bg-[#10B981]',
                btnHover: 'hover:text-[#10B981]'
            },
            'react': {
                activeBtn: 'bg-[#087EA4] text-white shadow-md shadow-[#087EA4]/30',
                badge: 'bg-[#087EA4] text-white border-white/30',
                text: 'text-[#087EA4]',
                dot: 'bg-[#087EA4]',
                btnHover: 'hover:text-[#087EA4]'
            },
            'laravel': {
                activeBtn: 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/30',
                badge: 'bg-[#E11D48] text-white border-white/30',
                text: 'text-[#E11D48]',
                dot: 'bg-[#E11D48]',
                btnHover: 'hover:text-[#E11D48]'
            },
            'open source': {
                activeBtn: 'bg-[#059669] text-white shadow-md shadow-[#059669]/30',
                badge: 'bg-[#059669] text-white border-white/30',
                text: 'text-[#059669]',
                dot: 'bg-[#059669]',
                btnHover: 'hover:text-[#059669]'
            },
            'default': {
                activeBtn: 'bg-blue-600 text-white shadow-md shadow-blue-600/30',
                badge: 'bg-slate-900/90 text-white border-white/20',
                text: 'text-blue-600',
                dot: 'bg-blue-600',
                btnHover: 'hover:text-blue-600'
            }
        },

        getCategoryStyle(categoryName) {
            if (!categoryName) return this.categoryColors['default'];
            const key = String(categoryName).toLowerCase().trim();
            return this.categoryColors[key] || this.categoryColors['default'];
        },

        get categories() {
            const set = new Set();
            this.portfolioItems.forEach(item => {
                if (item.category) set.add(item.category);
            });
            return Array.from(set).sort();
        },

        getCategoryCount(cat) {
            if (cat === 'all') return this.portfolioItems.length;
            return this.portfolioItems.filter(item => item.category === cat).length;
        },

        async init() {
            // Apply initial language & direction
            this.applyLang();

            // Apply initial theme & watch system color scheme preference
            this.applyTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme === 'system') {
                    this.applyTheme();
                    this.updateHeroBg();
                    this.updatePortfolioImages();
                }
            });

            // Set initial circular avatar favicon from profile picture
            this.updateCircularFavicon(this.user?.avatar_url || 'https://avatars.githubusercontent.com/u/60322583?v=4');

            // Promise waiting for full page asset/DOM loading (window load event)
            const windowPageLoadPromise = new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', () => resolve(), { once: true });
                }
            });

            // Helper to preload critical image
            const preloadImage = (url) => {
                if (!url) return Promise.resolve();
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = url;
                });
            };

            // Initial Handshake step
            this.loadingProgress = 25;
            if (this.loadingLogs[0]) this.loadingLogs[0].done = true;

            // Step 1: Fetch Image Assets & GitHub User Data in parallel
            try {
                const [imageRes, userRes] = await Promise.allSettled([
                    fetch('assets/data/images.json').then(res => res.ok ? res.json() : null),
                    fetch('https://api.github.com/users/alirezaevil81').then(res => res.ok ? res.json() : null)
                ]);

                if (imageRes.status === 'fulfilled' && imageRes.value) {
                    this.imageAssets = imageRes.value;
                    this.updateHeroBg();
                    this.updatePortfolioImages();
                }

                if (userRes.status === 'fulfilled' && userRes.value && userRes.value.login) {
                    this.user = Object.assign({}, this.user, userRes.value);
                    if (this.user?.avatar_url) {
                        this.updateCircularFavicon(this.user.avatar_url);
                    }
                }
            } catch (e) {
                console.error("Initial data fetch error:", e);
            }

            this.loadingProgress = 55;
            if (this.loadingLogs[1]) this.loadingLogs[1].done = true;

            // Step 2: Fetch Repositories
            try {
                const repoRes = await fetch('https://api.github.com/users/alirezaevil81/repos?per_page=100&sort=updated');
                if (repoRes.ok) {
                    const repos = await repoRes.json();
                    if (Array.isArray(repos)) {
                        let nonCustomCount = 0;
                        repos.forEach((repo) => {
                            if (repo.name.toLowerCase() === 'alirezaevil81') return;

                            let category = repo.language || 'Open Source';
                            let imgSrc = '';
                            let isCustomImg = false;

                            const repoNameLower = repo.name.toLowerCase();
                            if (repo.id === 825470024 || repoNameLower.includes('bilmakh')) {
                                imgSrc = 'assets/img/portfolio/bilmakh.webp';
                                isCustomImg = true;
                            } else if (repo.id === 756756391 || repoNameLower.includes('freepik')) {
                                imgSrc = 'assets/img/portfolio/freepik-geter.webp';
                                isCustomImg = true;
                            } else if (repo.id === 1047266466 || repoNameLower.includes('weblog')) {
                                imgSrc = 'assets/img/portfolio/weblog-plus.webp';
                                isCustomImg = true;
                            } else {
                                isCustomImg = false;
                                const placeholders = this.getThemeImages('placeholderImgs');
                                const fallbackList = placeholders.length > 0 ? placeholders : ['https://github.blog/wp-content/uploads/2025/03/github_logo_invertocat_dark_3.png?w=1024'];
                                imgSrc = fallbackList[nonCustomCount % fallbackList.length];
                            }

                            let websiteUrl = null;
                            if (repo.homepage && typeof repo.homepage === 'string' && repo.homepage.trim() !== '') {
                                let hp = repo.homepage.trim();
                                if (!hp.startsWith('http://') && !hp.startsWith('https://')) {
                                    hp = 'https://' + hp;
                                }
                                websiteUrl = hp;
                            } else if (repo.description) {
                                const match = repo.description.match(/https?:\/\/[^\s]+/i);
                                if (match) {
                                    websiteUrl = match[0];
                                }
                            }

                            const exists = this.portfolioItems.some(item => item.title.toLowerCase() === repo.name.toLowerCase());
                            if (!exists) {
                                const newItem = {
                                    imgSrc: imgSrc,
                                    isCustomImg: isCustomImg,
                                    placeholderIndex: isCustomImg ? undefined : nonCustomCount,
                                    websiteUrl: websiteUrl,
                                    title: repo.name,
                                    description: repo.description || 'Open-source repository on GitHub',
                                    link: websiteUrl || repo.html_url,
                                    repoUrl: repo.html_url,
                                    category: category,
                                    stars: repo.stargazers_count,
                                    forks: repo.forks_count,
                                    iframeLoaded: false,
                                    imgLoaded: false
                                };
                                if (!isCustomImg) nonCustomCount++;
                                this.portfolioItems.push(newItem);
                            }
                        });
                        this.updatePortfolioImages();
                    }
                }
            } catch (e) {
                console.error("Repos fetch error:", e);
            }

            this.loadingProgress = 80;
            if (this.loadingLogs[2]) this.loadingLogs[2].done = true;

            // Step 3: Ensure complete window load and critical hero background/avatar preload
            await Promise.allSettled([
                windowPageLoadPromise,
                this.heroBg ? preloadImage(this.heroBg) : Promise.resolve(),
                this.user?.avatar_url ? preloadImage(this.user.avatar_url) : Promise.resolve()
            ]);

            // Step 4: Page load is 100% complete
            this.loadingProgress = 100;
            if (this.loadingLogs[3]) this.loadingLogs[3].done = true;

            setTimeout(() => {
                this.isLoading = false;

                // Start Typewriter & Sequential Animations
                this.type();
                setTimeout(() => this.showHeroContent = true, 100);
                setTimeout(() => this.showAboutContent = true, 300);
                setTimeout(() => this.showStats[0] = true, 500);
                setTimeout(() => this.showStats[1] = true, 700);
                setTimeout(() => this.showStats[2] = true, 900);
                setTimeout(() => this.showStats[3] = true, 1100);

                // Handle Hash Scroll on load
                if (window.location.hash) {
                    const section = document.querySelector(window.location.hash);
                    if (section) setTimeout(() => { window.scrollTo({ top: section.offsetTop, behavior: 'smooth' }); }, 150);
                }
            }, 350);

            // Safety fallback in case external third-party APIs get blocked/timeout
            setTimeout(() => {
                if (this.isLoading) {
                    this.loadingProgress = 100;
                    if (this.loadingLogs[3]) this.loadingLogs[3].done = true;
                    this.isLoading = false;
                    this.type();
                    this.showHeroContent = true;
                    this.showAboutContent = true;
                    this.showStats = [true, true, true, true];
                }
            }, 8000);
        },

        handleScroll() {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            this.showScrollTop = scrollY > 120;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                this.scrollProgress = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
            } else {
                this.scrollProgress = 0;
            }

            // Active section scroll spy
            const sections = ['portfolio', 'resume', 'skill', 'about', 'hero'];
            const scrollPosition = scrollY + 240;
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPosition) {
                    this.activeSection = id;
                    break;
                }
            }
        },

        handleResize() {
            if (window.innerWidth >= 1024) this.isMobileMenuOpen = false;
        },

        type() {
            if (!this.typedStrings || this.typedStrings.length === 0) return;
            if (this.stringIndex >= this.typedStrings.length) this.stringIndex = 0;
            let current = this.typedStrings[this.stringIndex];
            this.typedText = this.isDeleting 
                ? current.substring(0, this.typedText.length - 1) 
                : current.substring(0, this.typedText.length + 1);

            let speed = this.isDeleting ? 50 : 100;

            if (!this.isDeleting && this.typedText === current) {
                speed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.typedText === '') {
                this.isDeleting = false;
                this.stringIndex = (this.stringIndex + 1) % this.typedStrings.length;
                speed = 500;
            }
            if (this.typeTimeout) clearTimeout(this.typeTimeout);
            this.typeTimeout = setTimeout(() => this.type(), speed);
        },

        get age() {
            return Math.floor((new Date() - new Date('2003-01-14')) / 31557600000);
        },

        get filteredItems() {
            if (this.activeFilter === 'all' || this.activeFilter === '0') return this.portfolioItems;
            return this.portfolioItems.filter(item => item.category === this.activeFilter);
        },

        updateCircularFavicon(avatarUrl) {
            if (!avatarUrl) return;
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                try {
                    const size = 192; // High-resolution crisp icon
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.clearRect(0, 0, size, size);

                    const center = size / 2;
                    const radius = size / 2; // Full edge-to-edge

                    // Clip into perfect circle taking 100% of favicon area
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(center, center, radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();

                    // Draw image filling entire canvas
                    ctx.drawImage(img, 0, 0, size, size);
                    ctx.restore();

                    // Subtle anti-aliased border ring for visibility on all tab themes
                    ctx.beginPath();
                    ctx.arc(center, center, radius - 1.5, 0, Math.PI * 2, true);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(37, 99, 235, 0.9)';
                    ctx.stroke();

                    const faviconDataUrl = canvas.toDataURL('image/png');
                    const iconLinks = document.querySelectorAll("link[rel*='icon']");
                    iconLinks.forEach(link => {
                        link.href = faviconDataUrl;
                    });
                } catch (e) {
                    console.warn("Canvas favicon generation fallback:", e);
                    const iconLinks = document.querySelectorAll("link[rel*='icon']");
                    iconLinks.forEach(link => {
                        link.href = avatarUrl;
                    });
                }
            };
            img.onerror = () => {
                const iconLinks = document.querySelectorAll("link[rel*='icon']");
                iconLinks.forEach(link => {
                    link.href = avatarUrl;
                });
            };
            img.src = avatarUrl;
        }
    }));
};

if (window.Alpine) {
    registerPortfolioApp();
} else {
    document.addEventListener('alpine:init', registerPortfolioApp);
}