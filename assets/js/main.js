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
        activeFilter: '0',
        portfolioItems: [
            { imgSrc: 'assets/img/portfolio/compressorsepah.webp', title: 'Compressorsepah', description: 'Site for selling compressors and industrial tools', link: 'https://compressorsepah.ir', filter: 'WordPress', category: 'WordPress' },
            { imgSrc: 'assets/img/portfolio/azadpc.webp', title: 'AzadPc', description: 'Site for shop pc and laptop gaming', link: 'https://azadpc.com', filter: 'WordPress', category: 'WordPress' },
        ],

        async init() {
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
            } catch (e) { console.error("Github fetch failed", e); }

            try {
                const repoRes = await fetch('https://api.github.com/users/alirezaevil81/repos');
                let repos = await repoRes.json();
                repos.splice(0, 2); 
                
                repos.forEach((repo) => {
                    switch (repo.id) {
                        case 825470024: // bilmakh
                            this.portfolioItems.push({ imgSrc: 'assets/img/portfolio/bilmakh.webp', title: repo.name, description: repo.description, link: repo.html_url, filter: repo.language, category: repo.language });
                            break;
                        case 756756391: // freepik-geter
                            this.portfolioItems.push({ imgSrc: 'assets/img/portfolio/freepik-geter.webp', title: repo.name, description: repo.description, link: repo.html_url, filter: repo.language, category: repo.language });
                            break;
                        case 1047266466: // weblog-plus
                            this.portfolioItems.push({ imgSrc: 'assets/img/portfolio/weblog-plus.webp', title: repo.name, description: repo.description, link: repo.html_url, filter: repo.language, category: repo.language });
                            break;
                        default:
                                const placeholders = this.imageAssets?.placeholderImgs || ['https://github.blog/wp-content/uploads/2025/03/github_logo_invertocat_dark_3.png?w=1024'];
                                const randomImg = placeholders[Math.floor(Math.random() * placeholders.length)];
                            this.portfolioItems.push({ imgSrc: randomImg, title: repo.name, description: repo.description, link: repo.html_url, filter: repo.language, category: repo.language });
                    }
                });
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
            if (this.activeFilter === '0') return this.portfolioItems;
            return this.portfolioItems.filter(item => item.filter === this.activeFilter);
        }
    }));
});