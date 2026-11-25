const resolveAssetBase = () => {
    try {
        if (window.location.protocol === 'file:') {
            return /^\/.*\/(fa|en)(\/|$)/i.test(window.location.pathname) ? '../' : '';
        }
        return '/';
    } catch (e) {
        return '/';
    }
};

const ASSET_BASE = resolveAssetBase();

const resolveInitialLang = () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const queryLang = params.get('lang');
        if (queryLang === 'fa' || queryLang === 'en') return queryLang;
    } catch (e) {}

    try {
        const path = window.location.pathname.toLowerCase();
        if (path === '/fa' || path.startsWith('/fa/')) return 'fa';
        if (path === '/en' || path.startsWith('/en/')) return 'en';
    } catch (e) {}

    try {
        const saved = localStorage.getItem('app_lang');
        if (saved === 'fa' || saved === 'en') return saved;
    } catch (e) {}

    try {
        const browserLangs = (navigator.languages && navigator.languages.length > 0)
            ? navigator.languages
            : [navigator.language || navigator.userLanguage || 'en'];
        for (const l of browserLangs) {
            if (typeof l === 'string' && l.toLowerCase().startsWith('fa')) {
                return 'fa';
            }
        }
    } catch (e) {}

    return 'en';
};

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
            name: 'Alireza Haraji',
            avatar_url: 'https://avatars.githubusercontent.com/u/60322583?v=4',
            bio: 'PHP & laravel Developer.',
            location: 'Iran , Mazandaran',
            blog: 'www.exxondev.ir',
            email: null,
            html_url: 'https://github.com/alirezaevil81',
            hireable: true,
            created_at: '2020-01-26T16:48:18Z',
            public_repos: 20,
            public_gists: 0,
            followers: 45,
            following: 5
        },

        get isHireable() {
            return Boolean(this.user && this.user.hireable === true);
        },

        get displayName() {
            return this.lang === 'fa' ? 'علیرضا هرجی' : (this.user?.name || 'Alireza Haraji');
        },

        get userEmail() {
            return (this.user && this.user.email) ? this.user.email : 'alirezask385@gmail.com';
        },

        get userLocation() {
            if (this.lang === 'fa') {
                if (this.user?.location) {
                    return this.user.location
                        .replace(/Iran/gi, 'ایران')
                        .replace(/Mazandaran/gi, 'مازندران')
                        .replace(/\s*,\s*/g, '، ');
                }
                return 'ایران، مازندران';
            }
            return this.user?.location || 'Iran, Mazandaran';
        },

        get userBlogUrl() {
            const b = this.user?.blog || 'www.exxondev.ir';
            return (b.startsWith('http://') || b.startsWith('https://')) ? b : 'https://' + b;
        },

        get userBlogTitle() {
            return this.user?.blog || 'www.exxondev.ir';
        },

        get userBio() {
            if (this.user?.bio) {
                if (this.lang === 'fa') {
                    return this.user.bio.replace(/Developer/gi, 'توسعه‌دهنده');
                }
                return this.user.bio;
            }
            return this.t('about.headline');
        },

        socialAccounts: [
            {
                provider: 'telegram',
                url: 'https://t.me/alirezaharaji',
                title: 'Telegram',
                icon: 'fa-brands fa-telegram',
                hoverClass: 'hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white'
            },
            {
                provider: 'linkedin',
                url: 'https://www.linkedin.com/in/alirezaharaji/',
                title: 'LinkedIn',
                icon: 'fa-brands fa-linkedin',
                hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white'
            },
            {
                provider: 'instagram',
                url: 'https://instagram.com/alireza.haraji',
                title: 'Instagram',
                icon: 'fa-brands fa-instagram',
                hoverClass: 'hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white'
            }
        ],

        getSocialAccountMeta(provider, url) {
            const lowerUrl = (url || '').toLowerCase();
            const lowerProv = (provider || '').toLowerCase();

            if (lowerProv === 'telegram' || lowerUrl.includes('t.me') || lowerUrl.includes('telegram.me')) {
                return {
                    title: 'Telegram',
                    icon: 'fa-brands fa-telegram',
                    hoverClass: 'hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white'
                };
            }
            if (lowerProv === 'linkedin' || lowerUrl.includes('linkedin.com')) {
                return {
                    title: 'LinkedIn',
                    icon: 'fa-brands fa-linkedin',
                    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white'
                };
            }
            if (lowerProv === 'instagram' || lowerUrl.includes('instagram.com')) {
                return {
                    title: 'Instagram',
                    icon: 'fa-brands fa-instagram',
                    hoverClass: 'hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white'
                };
            }
            if (lowerProv === 'twitter' || lowerProv === 'x' || lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
                return {
                    title: 'X (Twitter)',
                    icon: 'fa-brands fa-x-twitter',
                    hoverClass: 'hover:bg-black hover:border-black hover:text-white'
                };
            }
            if (lowerProv === 'youtube' || lowerUrl.includes('youtube.com')) {
                return {
                    title: 'YouTube',
                    icon: 'fa-brands fa-youtube',
                    hoverClass: 'hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white'
                };
            }
            if (lowerProv === 'reddit' || lowerUrl.includes('reddit.com')) {
                return {
                    title: 'Reddit',
                    icon: 'fa-brands fa-reddit-alien',
                    hoverClass: 'hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white'
                };
            }
            if (lowerProv === 'facebook' || lowerUrl.includes('facebook.com')) {
                return {
                    title: 'Facebook',
                    icon: 'fa-brands fa-facebook-f',
                    hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white'
                };
            }
            return {
                title: provider || 'Social Link',
                icon: 'fa-solid fa-link',
                hoverClass: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white'
            };
        },

        // Language State (fa | en) - Resolved from ?lang= -> /fa|/en -> saved preference -> browser language
        lang: resolveInitialLang(),

        setLang(newLang, updateUrl = true) {
            if (newLang !== 'fa' && newLang !== 'en') return;
            this.isMobileMenuOpen = false;
            this.lang = newLang;
            try {
                localStorage.setItem('app_lang', newLang);
            } catch (e) {}
            if (updateUrl) {
                this.syncUrlLang(newLang);
            }
            this.applyLang();
        },

        toggleLang() {
            this.setLang(this.lang === 'fa' ? 'en' : 'fa', true);
        },

        syncUrlLang(targetLang) {
            try {
                if (!window.history || !window.history.replaceState) return;
                const url = new URL(window.location.href);
                url.searchParams.set('lang', targetLang);
                window.history.replaceState(null, '', url.pathname + url.search + url.hash);
            } catch (e) {}
        },

        applyLang() {
            const isFa = this.lang === 'fa';
            document.documentElement.lang = this.lang;
            document.documentElement.dir = isFa ? 'rtl' : 'ltr';

            const langBtnText = document.getElementById('lang-btn-text');
            if (langBtnText) {
                langBtnText.textContent = isFa ? 'FA' : 'EN';
            }

            const titleText = isFa
                ? 'علیرضا هرجی | برنامه‌نویس و توسعه‌دهنده بک‌اند و وب (Alireza Haraji)'
                : 'Alireza Haraji | Backend & Web Programmer (PHP, Laravel, Python)';
            const descText = isFa
                ? 'وب‌سایت و رزومه رسمی علیرضا هرجی، برنامه‌نویس و توسعه‌دهنده بک‌اند (PHP، لاراول، پایتون، وردپرس) و معمار API. مشاهده نمونه‌کارهای زنده، سوابق و راه‌های ارتباطی.'
                : 'Official portfolio and resume of Alireza Haraji (علیرضا هرجی), Backend & Web Programmer specializing in PHP, Laravel, Python, WordPress, REST APIs, and scalable web architecture.';

            document.title = titleText;

            const setMeta = (selector, attr, val) => {
                const el = document.querySelector(selector);
                if (el) el.setAttribute(attr, val);
            };
            setMeta('meta[name="description"]', 'content', descText);
            setMeta('meta[property="og:title"]', 'content', titleText);
            setMeta('meta[property="og:description"]', 'content', descText);
            setMeta('meta[property="og:locale"]', 'content', isFa ? 'fa_IR' : 'en_US');
            setMeta('meta[name="twitter:title"]', 'content', titleText);
            setMeta('meta[name="twitter:description"]', 'content', descText);

            try {
                const path = window.location.pathname.toLowerCase();
                let canonicalUrl = isFa ? 'https://www.exxondev.ir/fa/' : 'https://www.exxondev.ir/en/';
                if (path === '/' || path === '/index.html') {
                    const params = new URLSearchParams(window.location.search);
                    const qLang = params.get('lang');
                    if (qLang === 'fa' || qLang === 'en') {
                        canonicalUrl = `https://www.exxondev.ir/?lang=${qLang}`;
                    }
                }
                setMeta('link[rel="canonical"]', 'href', canonicalUrl);
                setMeta('meta[property="og:url"]', 'content', canonicalUrl);
            } catch (e) {}

            this.typedStrings = isFa ? this.typedStringsFa : this.typedStringsEn;
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
                    faq: 'سوالات متداول',
                    ready: 'آماده همکاری',
                    role: 'برنامه‌نویس و توسعه‌دهنده بک‌اند',
                    github: 'پروفایل گیت‌هاب',
                    email: 'ارسال ایمیل',
                    website: 'وب‌سایت شخصی',
                    quickNav: 'دسترسی سریع'
                },
                hero: {
                    badge: 'آماده برای پروژه‌ها و همکاری‌های جدید',
                    badgeAvailable: 'آماده برای پروژه‌ها و همکاری‌های جدید (Hireable)',
                    badgeBusy: 'در حال حاضر مشغول در پروژه',
                    prefix: 'من',
                    name: 'علیرضا هرجی',
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
                    available: 'آماده همکاری (Hireable)',
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
                    workStatusAvailable: 'آماده همکاری و استخدام (Hireable)',
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
                    loadingPreview: 'در حال آماده‌سازی پیش‌نمایش...',
                    explore: 'مشاهده',
                    emptyState: 'هیچ پروژه‌ای در این دسته‌بندی یافت نشد.',
                    noProjects: 'هیچ پروژه‌ای در این دسته‌بندی یافت نشد.',
                    showAll: 'نمایش همه پروژه‌ها',
                    quickPreview: 'پیش‌نمایش وب‌سایت',
                    preview: 'پیش‌نمایش',
                    previewTitle: 'پیش‌نمایش پروژه و وب‌سایت',
                    openNewTab: 'مشاهده زنده در تب جدید',
                    copyLink: 'کپی آدرس سایت',
                    copied: 'کپی شد!',
                    deviceDesktop: 'دسکتاپ',
                    deviceTablet: 'تبلت',
                    deviceMobile: 'موبایل',
                    snapshotView: 'اسکرین‌شات باکیفیت',
                    liveFrameView: 'تست فریم تعاملی (iFrame)',
                    iframeNotice: 'به دلیل پروتکل‌های امنیتی وب‌سایت مقصد (مانند X-Frame-Options)، ممکن است برخی سایت‌ها درون فریم باز نشوند. برای دسترسی کامل و روان، روی «مشاهده زنده در تب جدید» کلیک کنید.',
                    closeModal: 'بستن پیش‌نمایش',
                    techDetails: 'دسته‌بندی و پلتفرم:',
                    openRepo: 'مشاهده سورس در گیت‌هاب'
                },
                faq: {
                    badge: 'پرسش‌های متداول',
                    title: 'سوالات رایج درباره خدمات و همکاری',
                    subtitle: 'پاسخ‌های کوتاه و دقیق درباره تخصص‌های برنامه‌نویسی، معماری بک‌اند و نحوه شروع همکاری با علیرضا هرجی.'
                },
                footer: {
                    badge: 'آماده برای فرصت‌های جدید',
                    ctaTitle: 'پروژه یا چالشی در حوزه مهندسی نرم‌افزار دارید؟',
                    ctaSub: 'بیایید برای ساخت معماری‌های پایدار بک‌اند، APIهای پرسرعت یا پلتفرم‌های سفارشی وب همکاری کنیم.',
                    readyTitle: 'پروژه یا چالشی در حوزه مهندسی نرم‌افزار دارید؟',
                    readySubtitle: 'بیایید برای ساخت معماری‌های پایدار بک‌اند، APIهای پرسرعت یا پلتفرم‌های سفارشی وب همکاری کنیم.',
                    getInTouch: 'ارتباط با من',
                    githubProfile: 'پروفایل گیت‌هاب',
                    role: 'برنامه‌نویس و توسعه‌دهنده بک‌اند',
                    bio: 'متمرکز بر توسعه سیستم‌های مقیاس‌پذیر بک‌اند با PHP و Python، میکروسرویس‌های تمیز، بهینه‌سازی دیتابیس و راه‌حل‌های پایدار وب.',
                    navTitle: 'دسترسی سریع',
                    quickNav: 'دسترسی سریع',
                    techTitle: 'استک فنی محوری',
                    coreStack: 'استک فنی محوری',
                    rights: 'تمامی حقوق محفوظ است.',
                    allRights: 'تمامی حقوق محفوظ است.',
                    craftedBy: 'طراحی و توسعه اختصاصی توسط علیرضا هرجی'
                }
            },
            en: {
                nav: {
                    home: 'Home',
                    about: 'About Me',
                    skills: 'Skills & Stack',
                    resume: 'Experience',
                    portfolio: 'Portfolio',
                    faq: 'FAQ',
                    ready: 'Available for work',
                    role: 'Backend & Web Programmer',
                    github: 'GitHub Profile',
                    email: 'Send Email',
                    website: 'Personal Website',
                    quickNav: 'Quick Navigation'
                },
                hero: {
                    badge: 'Available for New Projects & Collaborations',
                    badgeAvailable: 'Available for New Projects & Hire',
                    badgeBusy: 'Currently Engaged in Projects',
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
                    available: 'Available for Hire',
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
                    workStatusAvailable: 'Available for Hire / Remote',
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
                    loadingPreview: 'Preparing live preview...',
                    explore: 'Explore',
                    emptyState: 'No projects found in this category.',
                    noProjects: 'No projects found in this category.',
                    showAll: 'Show All Projects',
                    quickPreview: 'Website Preview',
                    preview: 'Preview',
                    previewTitle: 'Project & Website Preview',
                    openNewTab: 'Open Live in New Tab',
                    copyLink: 'Copy Link',
                    copied: 'Copied!',
                    deviceDesktop: 'Desktop',
                    deviceTablet: 'Tablet',
                    deviceMobile: 'Mobile',
                    snapshotView: 'High-Res Snapshot',
                    liveFrameView: 'Live Frame Test (iFrame)',
                    iframeNotice: 'Due to browser and website security headers (e.g. X-Frame-Options), some live sites restrict iframe embedding. For the full live experience, click "Open Live in New Tab".',
                    closeModal: 'Close Preview',
                    techDetails: 'Details & Category:',
                    openRepo: 'View Source on GitHub'
                },
                faq: {
                    badge: 'Frequently Asked Questions',
                    title: 'Common Questions & Collaboration',
                    subtitle: 'Concise answers about Alireza Haraji’s programming stack, backend architecture services, and workflow.'
                },
                footer: {
                    badge: 'Ready for New Opportunities',
                    ctaTitle: 'Have a project or engineering challenge?',
                    ctaSub: "Let's collaborate to build resilient backend architectures, high-performance APIs, or custom web platforms.",
                    readyTitle: 'Have a project or engineering challenge?',
                    readySubtitle: "Let's collaborate to build resilient backend architectures, high-performance APIs, or custom web platforms.",
                    getInTouch: 'Get in Touch',
                    githubProfile: 'GitHub Profile',
                    role: 'Backend & Web Programmer',
                    bio: 'Focused on crafting scalable PHP & Python backend systems, clean microservices, database optimizations, and robust web solutions.',
                    navTitle: 'Quick Navigation',
                    quickNav: 'Quick Navigation',
                    techTitle: 'Core Tech Stack',
                    coreStack: 'Core Tech Stack',
                    rights: 'All rights reserved.',
                    allRights: 'All rights reserved.',
                    craftedBy: 'Crafted exclusively by Alireza Haraji'
                }
            }
        },

        // Theme Management State (light | dark | system)
        theme: (() => {
            try {
                const t = localStorage.getItem('theme');
                return ['light', 'dark', 'system'].includes(t) ? t : 'system';
            } catch (e) {
                return 'system';
            }
        })(),
        openThemeMenu: false,

        setTheme(mode) {
            const validMode = ['light', 'dark', 'system'].includes(mode) ? mode : 'system';
            this.theme = validMode;
            try {
                localStorage.setItem('theme', validMode);
            } catch (e) {}
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
            if (!['light', 'dark', 'system'].includes(this.theme)) {
                this.theme = 'system';
            }
            document.documentElement.dataset.themePref = this.theme;
            const isDark = this.getIsDark();
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
        typedStrings: ['PHP Developer', 'Python Developer', 'Laravel Developer', 'WordPress Developer', 'Backend Specialist', 'API & Web Architect'],
        stringIndex: 0,
        isDeleting: false,
        typeTimeout: null,

        // UI States for animations
        showHeroContent: false,
        showAboutContent: true,
        skillsVisible: false,
        showStats: [true, true, true, true], // Followers, Following, Repos, Gists
        activeFaq: 0,
        faqs: [
            {
                q: {
                    fa: 'علیرضا هرجی کیست و چه تخصصی در برنامه‌نویسی دارد؟',
                    en: 'Who is Alireza Haraji and what is his programming specialization?'
                },
                a: {
                    fa: 'علیرضا هرجی برنامه‌نویس و توسعه‌دهنده بک‌اند با بیش از ۵ سال تجربه در مهندسی وب است. تمرکز اصلی او بر توسعه سیستم‌های مقیاس‌پذیر با PHP، لاراول (Laravel)، پایتون (Python)، طراحی REST API، بهینه‌سازی دیتابیس‌های MySQL/Redis و ساخت پلاگین‌های اختصاصی وردپرس است.',
                    en: 'Alireza Haraji is a backend and web programmer with over 5 years of hands-on engineering experience. His core stack includes PHP, Laravel, Python, RESTful API architecture, MySQL/Redis performance optimization, and custom WordPress plugin development.'
                }
            },
            {
                q: {
                    fa: 'در بخش نمونه‌کارها چه نوع پروژه‌هایی قابل مشاهده است؟',
                    en: 'What kinds of projects are showcased in the portfolio?'
                },
                a: {
                    fa: 'مجموعه پروژه‌ها شامل سامانه‌های وب زنده (مانند داشبورد لحظه‌ای قیمت طلا و ارز Market-IR، اپلیکیشن رستا، سامانه هواشناسی Weather-Pro، ابزار اتوماسیون پایتون Instagrapi CLI Bot و فروشگاه‌های آنلاین AzadPc و Compressorsepah) به همراه مخازن متن‌باز گیت‌هاب است.',
                    en: 'Featured works span live web applications—including Market-IR (real-time currency & gold dashboard), Rasta, Weather-Pro, Instagrapi CLI Bot, and e-commerce platforms AzadPc & Compressorsepah—alongside open-source GitHub repositories.'
                }
            },
            {
                q: {
                    fa: 'آیا علیرضا هرجی برای پروژه‌های برنامه‌نویسی و همکاری آماده است؟',
                    en: 'Is Alireza Haraji available for programming projects and hiring?'
                },
                a: {
                    fa: 'بله، در حال حاضر امکان همکاری در پروژه‌های طراحی وب، توسعه بک‌اند، پیاده‌سازی API، بهینه‌سازی سرعت و سئوی فنی و همچنین موقعیت‌های شغلی تمام‌وقت یا ریموت وجود دارد.',
                    en: 'Yes. He is available for backend engineering, custom web application development, API integration, technical SEO optimization, and remote or full-time engineering roles.'
                }
            },
            {
                q: {
                    fa: 'چگونه می‌توانم با علیرضا هرجی ارتباط برقرار کنم؟',
                    en: 'How can I contact Alireza Haraji?'
                },
                a: {
                    fa: 'سریع‌ترین راه‌های ارتباطی ایمیل مستقیم به نشانی alirezask385@gmail.com، پیام در تلگرام (@alirezaharaji)، شبکه لینکدین یا بررسی مخازن در گیت‌هاب (@alirezaevil81) است.',
                    en: 'You can reach out directly via email at alirezask385@gmail.com, Telegram (@alirezaharaji), LinkedIn, or GitHub (@alirezaevil81).'
                }
            }
        ],

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
                imgSrc: '',
                title: 'market-ir',
                description: {
                    fa: 'داشبورد واکنش‌گرا و لحظه‌ای برای رصد قیمت طلا، سکه، ارز و صندوق‌های سرمایه‌گذاری با پیش‌نمایش زنده وب',
                    en: 'Responsive real-time dashboard tracking gold, coin, currency, and ETF market prices'
                },
                link: 'https://www.exxondev.ir/market-ir/',
                repoUrl: 'https://github.com/alirezaevil81/market-ir',
                category: 'JavaScript',
                websiteUrl: 'https://www.exxondev.ir/market-ir/',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: false
            },
            {
                imgSrc: '',
                title: 'Rasta',
                description: {
                    fa: 'اپلیکیشن وب رستا (Rasta) برای پیگیری ترک عادت‌ها، مدیریت روزشمار پاکی و ایجاد عادت‌های مثبت',
                    en: 'Clean minimalist web application for habit tracking, daily streaks, and recovery milestones'
                },
                link: 'https://www.exxondev.ir/Rasta/',
                repoUrl: 'https://github.com/alirezaevil81/Rasta',
                category: 'HTML',
                websiteUrl: 'https://www.exxondev.ir/Rasta/',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: false
            },
            {
                imgSrc: '',
                title: 'weather-pro',
                description: {
                    fa: 'سامانه مدرن پیش‌بینی آب‌وهوا، شاخص کیفیت هوا (AQI) و نقشه‌های هواشناسی با رابط تعاملی',
                    en: 'Modern weather forecast platform with real-time metrics, AQI index, and interactive UI'
                },
                link: 'https://www.exxondev.ir/weather-pro/',
                repoUrl: 'https://github.com/alirezaevil81/weather-pro',
                category: 'JavaScript',
                websiteUrl: 'https://www.exxondev.ir/weather-pro/',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: false
            },
            {
                imgSrc: '',
                title: 'instagrapi-cli-bot',
                description: {
                    fa: 'ربات خط فرمان و ابزار اتوماسیون اینستاگرام با پایتون همراه با مستندات تعاملی تحت وب',
                    en: 'Python-powered Instagram CLI automation bot with interactive web documentation'
                },
                link: 'https://www.exxondev.ir/instagrapi-cli-bot/',
                repoUrl: 'https://github.com/alirezaevil81/instagrapi-cli-bot',
                category: 'Python',
                websiteUrl: 'https://www.exxondev.ir/instagrapi-cli-bot/',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: false
            },
            { 
                imgSrc: ASSET_BASE + 'assets/img/portfolio/azadpc.webp', 
                title: 'AzadPc', 
                description: {
                    fa: 'فروشگاه تخصصی قطعات کامپیوتر، لپ‌تاپ و سیستم‌های گیمینگ حرفه‌ای',
                    en: 'Specialized e-commerce platform for gaming PCs, laptops, and hardware components'
                }, 
                link: 'https://azadpc.com', 
                category: 'WordPress', 
                websiteUrl: 'https://azadpc.com', 
                canEmbedLive: false,
                imgLoaded: false, 
                imgError: false,
                iframeLoaded: false,
                isCustomImg: true 
            },
            { 
                imgSrc: ASSET_BASE + 'assets/img/portfolio/compressorsepah.webp', 
                title: 'Compressorsepah', 
                description: {
                    fa: 'فروشگاه آنلاین انواع کمپرسور و ابزارآلات صنعتی با طراحی واکنش‌گرا و عملکرد بهینه‌شده',
                    en: 'Industrial compressors and machinery e-commerce platform with optimized performance'
                }, 
                link: 'https://compressorsepah.ir', 
                category: 'WordPress', 
                websiteUrl: 'https://compressorsepah.ir', 
                canEmbedLive: false,
                imgLoaded: false, 
                imgError: false,
                iframeLoaded: false,
                isCustomImg: true 
            },
            {
                imgSrc: ASSET_BASE + 'assets/img/portfolio/bilmakh.webp',
                title: 'Bilmakh',
                description: {
                    fa: 'سامانه و وب‌اپلیکیشن سرگرمی و بازی تعاملی آنلاین توسعه‌داده شده با PHP',
                    en: 'Interactive entertainment web application developed with PHP and clean UI'
                },
                link: 'https://github.com/alirezaevil81/bilmakh',
                repoUrl: 'https://github.com/alirezaevil81/bilmakh',
                category: 'PHP',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: true
            },
            {
                imgSrc: ASSET_BASE + 'assets/img/portfolio/freepik-geter.webp',
                title: 'Freepik-Geter',
                description: {
                    fa: 'ابزار خودکار دریافت و دانلود تصاویر، وکتورها و فایل‌های گرافیکی با کیفیت بالا',
                    en: 'Automated tool for fetching and downloading high-res photos and vectors'
                },
                link: 'https://github.com/alirezaevil81/freepik-geter',
                repoUrl: 'https://github.com/alirezaevil81/freepik-geter',
                category: 'PHP',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: true
            },
            {
                imgSrc: ASSET_BASE + 'assets/img/portfolio/weblog-plus.webp',
                title: 'Weblog-Plus',
                description: {
                    fa: 'سیستم وبلاگ‌نویسی و مدیریت محتوای پیشرفته بر پایه معماری ماژولار PHP و امن',
                    en: 'Advanced modular blogging and content management system built with PHP'
                },
                link: 'https://github.com/alirezaevil81/weblog-plus',
                repoUrl: 'https://github.com/alirezaevil81/weblog-plus',
                category: 'PHP',
                canEmbedLive: false,
                imgLoaded: false,
                imgError: false,
                iframeLoaded: false,
                isCustomImg: true
            }
        ],

        async probeLivePreview(item) {
            if (!item || !item.websiteUrl) return;
            const target = item.websiteUrl;
            if (!/^https:\/\//i.test(target)) return;

            let controller = null;
            let timer = null;
            try {
                controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
                if (controller) {
                    timer = setTimeout(() => controller.abort(), 5000);
                }
                await fetch(target, {
                    mode: 'no-cors',
                    cache: 'no-store',
                    signal: controller ? controller.signal : undefined
                });
                item.canEmbedLive = true;
            } catch (e) {
                item.canEmbedLive = false;
            } finally {
                if (timer) clearTimeout(timer);
            }
        },

        getDomain(url) {
            if (!url) return '';
            try {
                const u = new URL(url.startsWith('http') ? url : 'https://' + url);
                return u.hostname.replace(/^www\./, '');
            } catch (e) {
                return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
            }
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

        initScrollReveal() {
            const revealAllFallback = () => {
                document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('is-visible'));
                this.skillsVisible = true;
            };

            if (typeof IntersectionObserver === 'undefined') {
                revealAllFallback();
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        if (entry.target.id === 'skill') {
                            this.skillsVisible = true;
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px'
            });

            const observeTargets = () => {
                document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
                const skillSection = document.getElementById('skill');
                if (skillSection) observer.observe(skillSection);
            };

            this.$nextTick(() => {
                observeTargets();
            });
            setTimeout(() => {
                observeTargets();
                // Ensure skills bar animates cleanly if user scrolled quickly
                this.skillsVisible = true;
            }, 900);
            // Safety fallback so nothing remains invisible
            setTimeout(revealAllFallback, 3500);
        },

        async init() {
            // Apply initial language & direction
            this.applyLang();

            // Apply initial theme & watch system color scheme preference
            this.applyTheme();
            if (window.matchMedia) {
                const mq = window.matchMedia('(prefers-color-scheme: dark)');
                const onSchemeChange = () => {
                    if (this.theme === 'system') {
                        this.applyTheme();
                        this.updateHeroBg();
                        this.updatePortfolioImages();
                    }
                };
                if (typeof mq.addEventListener === 'function') {
                    mq.addEventListener('change', onSchemeChange);
                } else if (typeof mq.addListener === 'function') {
                    mq.addListener(onSchemeChange);
                }
            }

            // Set initial rounded avatar favicon from profile picture
            this.updateCircularFavicon(this.user?.avatar_url || 'https://avatars.githubusercontent.com/u/60322583?v=4');

            // Probe live websites immediately for pre-populated portfolio items
            this.portfolioItems.forEach(item => {
                if (item.websiteUrl) {
                    this.probeLivePreview(item);
                }
            });

            // Initial Handshake step
            this.loadingProgress = 35;
            if (this.loadingLogs[0]) this.loadingLogs[0].done = true;

            // Keep preloader snappy while remote GitHub data finishes hydrating
            const finishPreloader = () => {
                if (!this.isLoading) return;
                this.loadingProgress = 100;
                if (this.loadingLogs[2]) this.loadingLogs[2].done = true;
                if (this.loadingLogs[3]) this.loadingLogs[3].done = true;
                this.isLoading = false;
                this.showHeroContent = true;
                this.showAboutContent = true;
                this.showStats = [true, true, true, true];
                this.type();
                this.initScrollReveal();

                if (window.location.hash) {
                    const section = document.querySelector(window.location.hash);
                    if (section) setTimeout(() => { window.scrollTo({ top: section.offsetTop, behavior: 'smooth' }); }, 150);
                }
            };

            // Cap initial preloader lock at ~700ms max so first paint is never blocked by slow APIs
            const fastPreloaderTimer = setTimeout(finishPreloader, 700);

            // Step 1: Fetch Image Assets, GitHub User Data & Social Accounts in parallel
            try {
                const [imageRes, userRes, socialRes] = await Promise.allSettled([
                    fetch(ASSET_BASE + 'assets/data/images.json').then(res => res.ok ? res.json() : null),
                    fetch('https://api.github.com/users/alirezaevil81').then(res => res.ok ? res.json() : null),
                    fetch('https://api.github.com/users/alirezaevil81/social_accounts').then(res => res.ok ? res.json() : null)
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

                if (socialRes.status === 'fulfilled' && Array.isArray(socialRes.value) && socialRes.value.length > 0) {
                    this.socialAccounts = socialRes.value.map(item => {
                        const meta = this.getSocialAccountMeta(item.provider, item.url);
                        return {
                            provider: item.provider,
                            url: item.url,
                            title: meta.title,
                            icon: meta.icon,
                            hoverClass: meta.hoverClass
                        };
                    });
                }
            } catch (e) {
                console.error("Initial data fetch error:", e);
            }

            this.loadingProgress = 75;
            if (this.loadingLogs[1]) this.loadingLogs[1].done = true;

            // Step 2: Fetch Repositories
            try {
                const repoRes = await fetch('https://api.github.com/users/alirezaevil81/repos?per_page=100&sort=updated');
                if (repoRes.ok) {
                    const repos = await repoRes.json();
                    if (Array.isArray(repos)) {
                        let nonCustomCount = 0;
                        repos.forEach((repo) => {
                            if (repo.name.toLowerCase() === 'alirezaevil81' || repo.name.toLowerCase() === 'alirezaevil81.github.io') return;

                            let category = repo.language || 'Open Source';
                            let imgSrc = '';
                            let isCustomImg = false;

                            const repoNameLower = repo.name.toLowerCase();
                            if (repo.id === 825470024 || repoNameLower.includes('bilmakh')) {
                                imgSrc = ASSET_BASE + 'assets/img/portfolio/bilmakh.webp';
                                isCustomImg = true;
                            } else if (repo.id === 756756391 || repoNameLower.includes('freepik')) {
                                imgSrc = ASSET_BASE + 'assets/img/portfolio/freepik-geter.webp';
                                isCustomImg = true;
                            } else if (repo.id === 1047266466 || repoNameLower.includes('weblog')) {
                                imgSrc = ASSET_BASE + 'assets/img/portfolio/weblog-plus.webp';
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
                                hp = hp.replace(/^http:\/\//i, 'https://');
                                hp = hp.replace(/https?:\/\/alirezaevil81\.github\.io\/?/i, 'https://www.exxondev.ir/');
                                hp = hp.replace(/https?:\/\/exxondev\.ir\/?/i, 'https://www.exxondev.ir/');
                                websiteUrl = hp;
                            } else if (repo.description) {
                                const match = repo.description.match(/https?:\/\/[^\s]+/i);
                                if (match) {
                                    websiteUrl = match[0]
                                        .replace(/^http:\/\//i, 'https://')
                                        .replace(/https?:\/\/alirezaevil81\.github\.io\/?/i, 'https://www.exxondev.ir/');
                                }
                            }

                            const existingItem = this.portfolioItems.find(item => item.title.toLowerCase() === repo.name.toLowerCase());
                            if (existingItem) {
                                existingItem.stars = repo.stargazers_count;
                                existingItem.forks = repo.forks_count;
                                if (repo.html_url) existingItem.repoUrl = repo.html_url;
                                if (websiteUrl && !existingItem.websiteUrl) {
                                    existingItem.websiteUrl = websiteUrl;
                                    this.probeLivePreview(existingItem);
                                }
                            } else {
                                const newItem = {
                                    imgSrc: imgSrc,
                                    isCustomImg: isCustomImg,
                                    placeholderIndex: isCustomImg ? undefined : nonCustomCount,
                                    websiteUrl: websiteUrl,
                                    canEmbedLive: false,
                                    title: repo.name,
                                    description: repo.description || 'Open-source repository on GitHub',
                                    link: websiteUrl || repo.html_url,
                                    repoUrl: repo.html_url,
                                    category: category,
                                    stars: repo.stargazers_count,
                                    forks: repo.forks_count,
                                    imgLoaded: false,
                                    imgError: false,
                                    iframeLoaded: false
                                };
                                if (!isCustomImg) nonCustomCount++;
                                this.portfolioItems.push(newItem);
                                if (newItem.websiteUrl) {
                                    this.probeLivePreview(newItem);
                                }
                            }
                        });
                        this.updatePortfolioImages();
                    }
                }
            } catch (e) {
                console.error("Repos fetch error:", e);
            }

            clearTimeout(fastPreloaderTimer);
            this.loadingProgress = 100;
            setTimeout(finishPreloader, 180);
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
            const sections = ['faq', 'portfolio', 'resume', 'skill', 'about', 'hero'];
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

        updateRoundedFavicon(avatarUrl) {
            if (!avatarUrl) return;
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                try {
                    const size = 192; // Full crisp resolution, not downscaled
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.clearRect(0, 0, size, size);

                    // Rounded corner radius: standard sleek app-icon curvature (~20%), edge-to-edge with 0 padding
                    const cornerRadius = Math.round(size * 0.20); // ~38px

                    const drawRoundedRect = (context, x, y, width, height, r) => {
                        if (typeof context.roundRect === 'function') {
                            context.beginPath();
                            context.roundRect(x, y, width, height, r);
                            context.closePath();
                        } else {
                            context.beginPath();
                            context.moveTo(x + r, y);
                            context.lineTo(x + width - r, y);
                            context.quadraticCurveTo(x + width, y, x + width, y + r);
                            context.lineTo(x + width, y + height - r);
                            context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
                            context.lineTo(x + r, y + height);
                            context.quadraticCurveTo(x, y + height, x, y + height - r);
                            context.lineTo(x, y + r);
                            context.quadraticCurveTo(x, y, x + r, y);
                            context.closePath();
                        }
                    };

                    // 1. Clip full-size rounded rectangle with ZERO padding (starts at 0,0 and fills size x size)
                    ctx.save();
                    drawRoundedRect(ctx, 0, 0, size, size, cornerRadius);
                    ctx.clip();

                    // 2. Draw image filling 100% of the canvas with zero padding
                    ctx.drawImage(img, 0, 0, size, size);
                    ctx.restore();

                    // 3. Subtle anti-aliased perimeter ring for crisp visibility against dark or light browser tabs
                    drawRoundedRect(ctx, 0.75, 0.75, size - 1.5, size - 1.5, cornerRadius);
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = 'rgba(37, 99, 235, 0.75)';
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
        },

        updateCircularFavicon(avatarUrl) {
            return this.updateRoundedFavicon(avatarUrl);
        }
    }));
};

if (window.Alpine) {
    registerPortfolioApp();
} else {
    document.addEventListener('alpine:init', registerPortfolioApp);
}