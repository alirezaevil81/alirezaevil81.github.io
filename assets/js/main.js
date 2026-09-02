document.addEventListener('alpine:init', () => {
    // ثبت کامپوننت اصلی رزومه
    Alpine.data('portfolioApp', () => ({
        isMobileMenuOpen: false,
        showScrollTop: false,
        user: null,
        
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
            { name: 'HTML', level: '100%', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
            { name: 'CSS', level: '90%', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
            { name: 'JavaScript', level: '65%', icon: 'fa-brands fa-square-js', color: 'text-yellow-400' },
            { name: 'PHP / Laravel', level: '80%', icon: 'fa-brands fa-php', color: 'text-indigo-600' },
            { name: 'WordPress / CMS', level: '90%', icon: 'fa-brands fa-wordpress', color: 'text-blue-400' },
            { name: 'Python / Django', level: '70%', icon: 'fa-brands fa-python', color: 'text-blue-600' }
        ],
        skillCategories: [
            { title: 'Backend & Databases', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Node.js', 'RESTful API'] },
            { title: 'Frameworks', skills: ['Laravel', 'Symfony', 'Django', 'Flask', 'FastAPI'] },
            { title: 'Core Concepts', skills: ['OOP', 'Socket Programming', 'Multithreading', 'Design Patterns', 'Microservices'] },
            { title: 'Tools & DevOps', skills: ['Git / GitHub', 'Docker', 'Agile/Scrum', 'CI/CD', 'SEO Optimization', 'Unit Testing'] }
        ],
        softSkills: [
            'Team Collaboration', 'Problem-Solving', 'Time Management', 'Self-Motivation', 
            'Performance Optimization', 'Secure Coding', 'Webmastering', 'Responsive Design', 
            'Data Migration', 'Agile Methodologies'
        ],

        // Image Assets Logic
        heroBg: '', // Selected background for hero section
        imageAssets: null, // Stores fetched image links from JSON

        // Portfolio Logic
        activeFilter: 'all',
        isCategoryDropdownOpen: false,
        portfolioItems: [
            { imgSrc: 'assets/img/portfolio/compressorsepah.webp', title: 'Compressorsepah', description: 'Site for selling compressors and industrial tools', link: 'https://compressorsepah.ir', category: 'WordPress', websiteUrl: 'https://compressorsepah.ir' },
            { imgSrc: 'assets/img/portfolio/azadpc.webp', title: 'AzadPc', description: 'Site for shop pc and laptop gaming', link: 'https://azadpc.com', category: 'WordPress', websiteUrl: 'https://azadpc.com' },
        ],

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
            // Set initial circular avatar favicon
            this.updateCircularFavicon('https://github.com/alirezaevil81.png');

            // 1. Fetch Image Assets first (needed for placeholders)
            try {
                const imageRes = await fetch('/assets/data/images.json');
                this.imageAssets = await imageRes.json();
                this.heroBg = this.imageAssets.backgrounds[Math.floor(Math.random() * this.imageAssets.backgrounds.length)];
            } catch (e) { console.error("Image assets fetch failed", e); }

            // 2. Fetch GitHub User Data
            try {
                const response = await fetch('https://api.github.com/users/alirezaevil81');
                this.user = await response.json();
                if (this.user?.avatar_url) {
                    this.updateCircularFavicon(this.user.avatar_url);
                }
            } catch (e) { console.error("Github fetch failed", e); }

            try {
                const repoRes = await fetch('https://api.github.com/users/alirezaevil81/repos?per_page=100&sort=updated');
                let repos = await repoRes.json();
                
                if (Array.isArray(repos)) {
                    repos.forEach((repo) => {
                        // Skip profile repo if it is just a README or the current host itself unless desired
                        if (repo.name.toLowerCase() === 'alirezaevil81') return;

                        let category = repo.language || 'Open Source';
                        let imgSrc = '';

                        const repoNameLower = repo.name.toLowerCase();
                        if (repo.id === 825470024 || repoNameLower.includes('bilmakh')) {
                            imgSrc = 'assets/img/portfolio/bilmakh.webp';
                        } else if (repo.id === 756756391 || repoNameLower.includes('freepik')) {
                            imgSrc = 'assets/img/portfolio/freepik-geter.webp';
                        } else if (repo.id === 1047266466 || repoNameLower.includes('weblog')) {
                            imgSrc = 'assets/img/portfolio/weblog-plus.webp';
                        } else {
                            const placeholders = this.imageAssets?.placeholderImgs || ['https://github.blog/wp-content/uploads/2025/03/github_logo_invertocat_dark_3.png?w=1024'];
                            imgSrc = placeholders[Math.floor(Math.random() * placeholders.length)];
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

                        // Check if project is already present
                        const exists = this.portfolioItems.some(item => item.title.toLowerCase() === repo.name.toLowerCase());
                        if (!exists) {
                            this.portfolioItems.push({
                                imgSrc: imgSrc,
                                websiteUrl: websiteUrl,
                                title: repo.name,
                                description: repo.description || 'Open-source repository on GitHub',
                                link: websiteUrl || repo.html_url,
                                repoUrl: repo.html_url,
                                category: category,
                                stars: repo.stargazers_count,
                                forks: repo.forks_count
                            });
                        }
                    });
                }
            } catch (e) { console.error("Repos fetch failed", e); }

            // 3. Start Typewriter
            this.type();

            // 4. Trigger UI Sequential Animations
            setTimeout(() => this.showHeroContent = true, 300);
            setTimeout(() => this.showAboutContent = true, 500);
            setTimeout(() => this.showStats[0] = true, 700);
            setTimeout(() => this.showStats[1] = true, 900);
            setTimeout(() => this.showStats[2] = true, 1100);
            setTimeout(() => this.showStats[3] = true, 1300);

            // 5. Handle Hash Scroll on load
            if (window.location.hash) {
                const section = document.querySelector(window.location.hash);
                if (section) setTimeout(() => { window.scrollTo({ top: section.offsetTop, behavior: 'smooth' }); }, 100);
            }
        },

        handleScroll() {
            this.showScrollTop = window.scrollY > 100;
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