document.addEventListener('alpine:init', () => {
    // ثبت کامپوننت اصلی رزومه
    Alpine.data('portfolioApp', () => ({
        isMobileMenuOpen: false,
        showScrollTop: false,
        scrollProgress: 0,
        activeSection: 'hero',
        user: null,

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
        typedStrings: ['PHP Developer', 'JavaScript Developer', 'WordPress Developer', 'Laravel Developer', 'Python Developer'],
        stringIndex: 0,
        isDeleting: false,

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
                tagline: 'Backend Architecture, REST APIs & Eloquent ORM'
            },
            { 
                name: 'Python / Django', 
                level: '75%', 
                numericLevel: 75,
                icon: 'fa-brands fa-python', 
                iconBg: 'bg-blue-50 text-blue-600', 
                barGradient: 'from-blue-600 to-yellow-500',
                badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
                tagline: 'Algorithms, Data Processing & Middleware Systems'
            },
            { 
                name: 'WordPress / CMS', 
                level: '90%', 
                numericLevel: 90,
                icon: 'fa-brands fa-wordpress', 
                iconBg: 'bg-sky-50 text-sky-600', 
                barGradient: 'from-sky-500 to-blue-700',
                badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
                tagline: 'Custom Plugin Development, WooCommerce & Headless'
            },
            { 
                name: 'MySQL & Databases', 
                level: '85%', 
                numericLevel: 85,
                icon: 'fa-solid fa-database', 
                iconBg: 'bg-emerald-50 text-emerald-600', 
                barGradient: 'from-emerald-500 to-teal-700',
                badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                tagline: 'Schema Design, Query Optimization & Data Integrity'
            },
            { 
                name: 'JavaScript & Web APIs', 
                level: '70%', 
                numericLevel: 70,
                icon: 'fa-brands fa-square-js', 
                iconBg: 'bg-amber-50 text-amber-500', 
                barGradient: 'from-amber-400 to-yellow-600',
                badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
                tagline: 'Modern ES6+, DOM Manipulation & Alpine.js'
            },
            { 
                name: 'HTML5 & Modern CSS / Tailwind', 
                level: '95%', 
                numericLevel: 95,
                icon: 'fa-brands fa-html5', 
                iconBg: 'bg-orange-50 text-orange-600', 
                barGradient: 'from-orange-500 to-red-600',
                badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
                tagline: 'Semantic Architecture, Tailwind CSS & Responsive UI'
            }
        ],
        skillCategories: [
            { 
                title: 'Backend & Databases', 
                icon: 'fa-solid fa-server',
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Node.js', 'RESTful APIs', 'Database Indexing'] 
            },
            { 
                title: 'Frameworks & CMS', 
                icon: 'fa-solid fa-layer-group',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                skills: ['Laravel', 'Django', 'FastAPI', 'Flask', 'WordPress', 'WooCommerce', 'Blade', 'Symfony'] 
            },
            { 
                title: 'Core Architecture', 
                icon: 'fa-solid fa-cubes-stacked',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                skills: ['OOP (Object-Oriented)', 'Design Patterns', 'Socket Programming', 'Multithreading', 'Microservices', 'API Security'] 
            },
            { 
                title: 'DevOps & Engineering', 
                icon: 'fa-solid fa-terminal',
                color: 'text-amber-600 bg-amber-50 border-amber-200',
                skills: ['Git / GitHub', 'Docker', 'Linux / Bash', 'CI/CD Pipelines', 'Agile / Scrum', 'Unit Testing', 'Postman', 'SEO'] 
            }
        ],
        softSkills: [
            { 
                category: 'Code Craftsmanship',
                title: 'Clean Architecture & SOLID', 
                description: 'Structuring scalable codebases with strict separation of concerns, DRY principles, and maintainable design patterns.',
                icon: 'fa-solid fa-code',
                color: 'text-blue-600 bg-blue-50 border-blue-200/80',
                accentBar: 'bg-blue-600',
                tag: 'Maintainability'
            },
            { 
                category: 'System Quality',
                title: 'Performance & Caching', 
                description: 'Optimizing high-throughput query execution, database indexing, latency reduction, and memory caching strategies.',
                icon: 'fa-solid fa-gauge-high',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200/80',
                accentBar: 'bg-indigo-600',
                tag: 'High Throughput'
            },
            { 
                category: 'Security First',
                title: 'Secure Coding & OWASP', 
                description: 'Implementing rigorous input sanitization, token-based authentication, rate limiting, and defensive API design.',
                icon: 'fa-solid fa-shield-halved',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
                accentBar: 'bg-emerald-600',
                tag: 'Security by Design'
            },
            { 
                category: 'Agile Culture',
                title: 'Agile & Team Mentorship', 
                description: 'Active participation in sprint workflows, backlog grooming, constructive peer reviews, and onboarding junior developers.',
                icon: 'fa-solid fa-users-gear',
                color: 'text-amber-600 bg-amber-50 border-amber-200/80',
                accentBar: 'bg-amber-600',
                tag: 'Collaboration'
            },
            { 
                category: 'Operational Reliability',
                title: 'Troubleshooting & Observability', 
                description: 'Rapid root-cause analysis, production error tracking, structured logging, and preventive debugging in live services.',
                icon: 'fa-solid fa-screwdriver-wrench',
                color: 'text-rose-600 bg-rose-50 border-rose-200/80',
                accentBar: 'bg-rose-600',
                tag: 'Zero Downtime'
            },
            { 
                category: 'Problem Solving',
                title: 'Algorithmic Problem-Solving', 
                description: 'Breaking down complex business logic into efficient, testable, and optimized algorithms for data transformation.',
                icon: 'fa-solid fa-brain',
                color: 'text-sky-600 bg-sky-50 border-sky-200/80',
                accentBar: 'bg-sky-600',
                tag: 'Analytical'
            }
        ],

        // Image Assets Logic
        heroBg: '', // Selected background for hero section
        imageAssets: null, // Stores fetched image links from JSON

        // Portfolio Logic
        activeFilter: 'all',
        isCategoryDropdownOpen: false,
        portfolioItems: [
            { imgSrc: 'assets/img/portfolio/compressorsepah.webp', title: 'Compressorsepah', description: 'Site for selling compressors and industrial tools', link: 'https://compressorsepah.ir', category: 'WordPress', websiteUrl: 'https://compressorsepah.ir', iframeLoaded: false, imgLoaded: false, isCustomImg: true },
            { imgSrc: 'assets/img/portfolio/azadpc.webp', title: 'AzadPc', description: 'Site for shop pc and laptop gaming', link: 'https://azadpc.com', category: 'WordPress', websiteUrl: 'https://azadpc.com', iframeLoaded: false, imgLoaded: false, isCustomImg: true },
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
            // Apply initial theme & watch system color scheme preference
            this.applyTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme === 'system') {
                    this.applyTheme();
                    this.updateHeroBg();
                    this.updatePortfolioImages();
                }
            });

            // Set initial circular avatar favicon
            this.updateCircularFavicon('https://github.com/alirezaevil81.png');

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
                    fetch('/assets/data/images.json').then(res => res.json()),
                    fetch('https://api.github.com/users/alirezaevil81').then(res => res.json())
                ]);

                if (imageRes.status === 'fulfilled' && imageRes.value) {
                    this.imageAssets = imageRes.value;
                    this.updateHeroBg();
                    this.updatePortfolioImages();
                }

                if (userRes.status === 'fulfilled' && userRes.value) {
                    this.user = userRes.value;
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
            setTimeout(() => this.type(), speed);
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
                }
            };
            img.src = avatarUrl;
        }
    }));
});