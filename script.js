document.addEventListener('DOMContentLoaded', () => {
    const contentData = {
        about: {
            category: "About Us",
            title: "我們把表演，做成可以參與的體驗",
            subtitle: "2025 年成立，整合表演製作、互動技術、教育設計與 IP 開發。",
            desc: "厭世貓宇宙專注「沉浸式互動教育、娛樂內容製作、原創與 IP 代理」。我們不只把一場節目演完，而是從受眾、場域、內容到互動機制一起設計，讓孩子、家庭、品牌與觀眾真正進入故事，留下能被記住、分享與延伸的體驗。",
            btn1: "認識厭世貓宇宙",
            link: "about.html"
        },
        services: {
            category: "Services",
            title: "從一場活動，到一套可以延伸的內容資產",
            subtitle: "依照你的場域、受眾與商業目標，選擇最適合的合作方式。",
            desc: `沉浸式互動教育：為親子、商場、教育與文化場域設計可參與、可學習、可體驗的內容。

娛樂內容製作：從主題發想、節目設計、演出統籌到現場執行，完成品牌與活動需要的舞台內容。

原創與 IP 代理：開發可延伸、可授權、可跨場域轉換的角色、故事與體驗內容。`,
            btn1: "看完整服務",
            link: "services.html"
        },
        works: {
            category: "Portfolio",
            title: "我們把故事，變成真的可以走進去的現場",
            subtitle: "從沉浸式親子體驗到舞台製作，每一個作品都從「觀眾會怎麼參與」開始設計。",
            desc: `《一步一步 Say Yes！尋星之旅》2026｜4–8 歲親子沉浸式互動教育體驗，從故事任務中練習勇氣、平衡、理解與希望。

《花火》｜音樂劇製作，5 場演出、累計約 1,600 人次，以完整製作流程整合內容、演出與現場執行。

《洗塵》｜舞台製作，2 場演出、累計約 800 人次，展現跨部門整合與製作執行能力。`,
            btn1: "看全部作品",
            link: "works.html"
        },
        events: {
            category: "Events & News",
            title: "來現場，走進我們正在發生的故事",
            subtitle: "最新活動、演出場次、售票資訊與厭世貓宇宙的製作近況。",
            desc: `【2026/08】《尋星之旅》完成台南場次
親子沉浸式互動體驗持續依現場回饋優化，強化報到任務、空間安全與實體彩排。

【2026/07】《尋星之旅》台北場啟動
以勇氣、平衡、理解與希望為核心，讓 4–8 歲孩子與家長一起走進故事完成任務。`,
            btn1: "了解最新消息",
            link: "events.html"
        },
        collaborate: {
            category: "Collaboration",
            title: "四個步驟，把想法變成可以落地的現場",
            subtitle: "你不用先懂劇場，我們會把需求一步一步翻成內容、流程與執行方案。",
            desc: `1. 理解需求：確認目標、受眾、場域、日期、預算與你最在意的成果。
2. 整合提案：提出內容方向、演出形式、製作規格、流程與初步預算。
3. 確認製作：簽約後進入腳本／節目、視覺、技術、排練與專案管理。
4. 現場交付：場勘、彩排、演出與現場執行，依方案完成影像或成果素材。`,
            btn1: "了解合作細節",
            link: "collaborate.html"
        },
        contact: {
            category: "Contact Us",
            title: "你有一個活動、故事或品牌想被真正記住嗎？",
            subtitle: "告訴我們受眾、場域與目標，我們會一起找到最適合的體驗形式。",
            desc: "不需要先把所有細節想完；有日期、場地、對象或一個想法，就可以開始。填寫表單或直接聯絡我們，我們會在 2 個工作天內回覆，免費為您提供初步諮詢與方案建議。",
            btn1: "聊聊你的專案",
            link: "contact.html"
        }
    };

    const cards = document.querySelectorAll('.card-trigger');
    const detailView = document.getElementById('detail-view');
    const detailImage = document.getElementById('detail-image');
    const closeBtn = document.getElementById('close-btn');
    const navbar = document.getElementById('navbar');

    const uiCategory = document.getElementById('detail-category');
    const uiTitle = document.getElementById('detail-title');
    const uiSubtitle = document.getElementById('detail-subtitle');
    const uiDesc = document.getElementById('detail-desc');
    const uiBtn1 = document.getElementById('detail-btn1');

    let activeImgRect = null;
    let originalImg = null;

    // ----- Pinned Scroll Animation Logic -----
    const track = document.getElementById('scroll-track');
    const pinnedItems = document.querySelectorAll('.pinned-item');
    const bgText = document.getElementById('bg-text');

    if (track && pinnedItems.length > 0) {
        const updateScroll = () => {
            const rect = track.getBoundingClientRect();
            const trackTop = rect.top;
            const trackHeight = rect.height - window.innerHeight;
            
            let progress = -trackTop / trackHeight;
            progress = Math.max(0, Math.min(1, progress));

            // Background text parallax
            if (bgText) {
                bgText.style.transform = `translateX(${(0.5 - progress) * 30}vw)`;
            }

            pinnedItems.forEach((item, index) => {
                const row = Math.floor(index / 2);
                const isRight = index % 2 === 1;

                // Base start for the row (0, 1, 2)
                const rowStart = row * 0.26; 
                // Left starts first, right starts slightly later (making it lower on screen)
                const start = rowStart + (isRight ? 0.06 : 0);
                const end = start + 0.38;
                
                let p = (progress - start) / (end - start);
                
                let y = 100 - (p * 150);
                
                let opacity = 0;
                // Fade in from 0 to 0.20, stay solid 0.20 to 0.52, smooth fade out as it slides away 0.52 to 0.82
                if (p > 0 && p < 0.82) {
                    if (p < 0.20) {
                        opacity = p / 0.20;
                    } else if (p > 0.52) {
                        opacity = (0.82 - p) / 0.30;
                    } else {
                        opacity = 1;
                    }
                }
                
                item.style.transform = `translateY(${y}vh)`;
                item.style.opacity = opacity;
                
                item.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
            });
        };

        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateScroll);
        });
        
        window.dispatchEvent(new Event('scroll'));
    }

    // ----- Intersection Observer for Banner Fade In -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // ----- FLIP Detail View Animation -----
    if(cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const blockId = this.getAttribute('data-id');
            if (contentData[blockId]) {
                uiCategory.innerText = contentData[blockId].category;
                uiTitle.innerText = contentData[blockId].title;
                uiSubtitle.innerText = contentData[blockId].subtitle;
                uiDesc.innerText = contentData[blockId].desc;
                uiBtn1.innerText = contentData[blockId].btn1;
                uiBtn1.href = contentData[blockId].link;
            }

            originalImg = this.querySelector('.trigger-img');
            activeImgRect = originalImg.getBoundingClientRect();

            detailImage.src = originalImg.src;
            detailImage.style.objectPosition = window.getComputedStyle(originalImg).objectPosition;
            detailImage.style.top = activeImgRect.top + 'px';
            detailImage.style.left = activeImgRect.left + 'px';
            detailImage.style.width = activeImgRect.width + 'px';
            detailImage.style.height = activeImgRect.height + 'px';

            originalImg.style.opacity = 0;
            detailView.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (navbar) navbar.style.opacity = '0';
            
            detailImage.offsetHeight; 

            if (window.innerWidth > 768) {
                detailImage.style.top = '0px';
                detailImage.style.left = '0px';
                detailImage.style.width = '50vw';
                detailImage.style.height = '100vh';
            } else {
                detailImage.style.top = '0px';
                detailImage.style.left = '0px';
                detailImage.style.width = '100vw';
                detailImage.style.height = '40vh';
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        detailView.classList.remove('active');
        document.body.style.overflow = '';
        if (navbar) navbar.style.opacity = '1';
        
        detailImage.style.top = activeImgRect.top + 'px';
        detailImage.style.left = activeImgRect.left + 'px';
        detailImage.style.width = activeImgRect.width + 'px';
        detailImage.style.height = activeImgRect.height + 'px';
        
        setTimeout(() => { 
            if (originalImg) originalImg.style.opacity = 1; 
        }, 700); 
    });
});
