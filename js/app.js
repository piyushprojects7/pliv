/* ==========================================================================
   PLIV Portfolio — Interactive Scripts & Live Simulators
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initNavigation();
    initProjectFilters();
    initStatsTicker();
    initHabitQRSimulator();
    initPrintOptimiserSimulator();
    initContactForm();
    initModals();

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   1. Interactive Constellation Canvas
   -------------------------------------------------------------------------- */
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.8;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: null, y: null, maxDist: 120 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();
            p.draw();

            // Connect to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }

            // Connect to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / mouse.maxDist)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/* --------------------------------------------------------------------------
   3. Project Category Filter
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-fade-in');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. Stats Ticker Animation
   -------------------------------------------------------------------------- */
function initStatsTicker() {
    const statsSection = document.getElementById('hero');
    if (!statsSection) return;

    let animated = false;
    const counters = [
        { id: 'stat-projects', target: 15, suffix: '+' },
        { id: 'stat-pages', target: 50000, suffix: '+', format: true },
        { id: 'stat-habits', target: 12500, suffix: '+', format: true },
        { id: 'stat-uptime', target: 99.9, suffix: '%' }
    ];

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                counters.forEach((item) => {
                    const el = document.getElementById(item.id);
                    if (!el) return;

                    let start = 0;
                    const duration = 1800;
                    const stepTime = 25;
                    const steps = duration / stepTime;
                    const increment = item.target / steps;

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= item.target) {
                            start = item.target;
                            clearInterval(timer);
                        }

                        let displayVal;
                        if (item.id === 'stat-uptime') {
                            displayVal = start.toFixed(1);
                        } else if (item.format) {
                            displayVal = Math.floor(start).toLocaleString();
                        } else {
                            displayVal = Math.floor(start);
                        }

                        el.textContent = `${displayVal}${item.suffix}`;
                    }, stepTime);
                });
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. Interactive Habit QR Simulator
   -------------------------------------------------------------------------- */
function initHabitQRSimulator() {
    const habitInput = document.getElementById('habit-name-input');
    const habitColor = document.getElementById('habit-color');
    const habitFreq = document.getElementById('habit-frequency');
    const btnGenerate = document.getElementById('btn-generate-qr');
    const btnSimulateScan = document.getElementById('btn-simulate-scan');
    const qrContainer = document.getElementById('qr-output-box');
    const titlePreview = document.getElementById('habit-preview-title');
    const metaPreview = document.getElementById('habit-preview-meta');
    const scanFeedback = document.getElementById('scan-feedback');

    if (!btnGenerate || !qrContainer) return;

    function renderDynamicQR(text, color) {
        // Generate an aesthetic SVG QR representation procedurally
        const size = 180;
        const grid = 21; // standard Version 1 QR dimensions
        const cell = size / grid;

        // Seeded pseudo-random generator based on text
        let seed = 0;
        for (let i = 0; i < text.length; i++) {
            seed = (seed * 31 + text.charCodeAt(i)) & 0xffffffff;
        }

        function isFinderPattern(r, c) {
            // Top-left
            if (r < 7 && c < 7) return true;
            // Top-right
            if (r < 7 && c >= grid - 7) return true;
            // Bottom-left
            if (r >= grid - 7 && c < 7) return true;
            return false;
        }

        let rects = '';

        // Draw standard QR Finder Patterns
        function drawFinder(startX, startY) {
            let out = '';
            // Outer 7x7 box
            out += `<rect x="${startX * cell}" y="${startY * cell}" width="${7 * cell}" height="${7 * cell}" rx="${cell * 1.5}" fill="${color}" />`;
            // White inner 5x5
            out += `<rect x="${(startX + 1) * cell}" y="${(startY + 1) * cell}" width="${5 * cell}" height="${5 * cell}" rx="${cell}" fill="#ffffff" />`;
            // Solid center 3x3
            out += `<rect x="${(startX + 2) * cell}" y="${(startY + 2) * cell}" width="${3 * cell}" height="${3 * cell}" rx="${cell * 0.8}" fill="${color}" />`;
            return out;
        }

        rects += drawFinder(0, 0);
        rects += drawFinder(grid - 7, 0);
        rects += drawFinder(0, grid - 7);

        // Draw data modules
        for (let r = 0; r < grid; r++) {
            for (let c = 0; c < grid; c++) {
                if (isFinderPattern(r, c)) continue;
                // Timing patterns
                if (r === 6 || c === 6) {
                    if ((r + c) % 2 === 0) {
                        rects += `<rect x="${c * cell + 0.5}" y="${r * cell + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="${cell * 0.3}" fill="${color}" />`;
                    }
                    continue;
                }

                // Deterministic data cell
                seed = (seed * 1103515245 + 12345) & 0x7fffffff;
                if (seed % 100 > 48) {
                    rects += `<rect x="${c * cell + 0.5}" y="${r * cell + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="${cell * 0.3}" fill="${color}" />`;
                }
            }
        }

        // Center stylized icon badge
        const centerSize = cell * 3.5;
        const centerPos = (size - centerSize) / 2;
        const centerIcon = `
            <rect x="${centerPos}" y="${centerPos}" width="${centerSize}" height="${centerSize}" rx="4" fill="#ffffff" stroke="${color}" stroke-width="1.5"/>
            <text x="${size / 2}" y="${size / 2 + 3.5}" font-family="monospace" font-size="9" font-weight="bold" fill="${color}" text-anchor="middle">QR</text>
        `;

        qrContainer.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                ${rects}
                ${centerIcon}
            </svg>
        `;

        if (titlePreview) titlePreview.textContent = text || 'Daily Focus Habit';
        if (metaPreview && habitFreq) {
            const freqLabels = {
                daily: 'Frequency: Daily Check-in (21-Day Goal)',
                morning: 'Routine: Morning Kickoff (7:00 AM)',
                evening: 'Routine: Evening Wind-down (9:00 PM)',
                weekly: 'Frequency: Weekly Sprint (Sunday Review)'
            };
            metaPreview.textContent = freqLabels[habitFreq.value] || 'Streak Target: Active';
            metaPreview.style.color = color;
        }
    }

    btnGenerate.addEventListener('click', () => {
        const text = habitInput.value.trim() || 'Drink 2 Liters Water Daily';
        const color = habitColor.value || '#8b5cf6';
        renderDynamicQR(text, color);
    });

    btnSimulateScan.addEventListener('click', () => {
        if (!scanFeedback) return;
        scanFeedback.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
            scanFeedback.classList.add('hidden');
        }, 3500);
    });

    // Initial render
    renderDynamicQR('Drink 2 Liters Water Daily', '#8b5cf6');
}

/* --------------------------------------------------------------------------
   6. Interactive PrintOptimiser Simulator
   -------------------------------------------------------------------------- */
function initPrintOptimiserSimulator() {
    const tabHabit = document.getElementById('sim-tab-habit');
    const tabPrint = document.getElementById('sim-tab-print');
    const panelHabit = document.getElementById('sim-panel-habit');
    const panelPrint = document.getElementById('sim-panel-print');

    if (tabHabit && tabPrint && panelHabit && panelPrint) {
        tabHabit.addEventListener('click', () => {
            tabHabit.classList.add('active');
            tabPrint.classList.remove('active');
            panelHabit.classList.remove('hidden');
            panelPrint.classList.add('hidden');
        });

        tabPrint.addEventListener('click', () => {
            tabPrint.classList.add('active');
            tabHabit.classList.remove('active');
            panelPrint.classList.remove('hidden');
            panelHabit.classList.add('hidden');
            if (window.lucide) lucide.createIcons();
        });
    }

    const btnRun = document.getElementById('btn-run-print-optimiser');
    const sourceText = document.getElementById('print-source-text');
    const resultBox = document.getElementById('print-result-box');
    const savingsBadge = document.getElementById('savings-badge');

    const optStripAds = document.getElementById('opt-strip-ads');
    const optMultiCol = document.getElementById('opt-multicol');
    const optMargin = document.getElementById('opt-margin');
    const optInk = document.getElementById('opt-ink');

    if (!btnRun || !sourceText || !resultBox) return;

    btnRun.addEventListener('click', () => {
        const raw = sourceText.value;

        // Process text based on simulated optimizer flags
        let lines = raw.split('\n');
        let cleaned = [];

        for (let line of lines) {
            let trimmed = line.trim();
            if (!trimmed) continue;

            if (optStripAds && optStripAds.checked) {
                if (
                    trimmed.toLowerCase().includes('ad') ||
                    trimmed.toLowerCase().includes('banner') ||
                    trimmed.toLowerCase().includes('sponsored') ||
                    trimmed.toLowerCase().includes('sidebar') ||
                    trimmed.toLowerCase().includes('tracking')
                ) {
                    continue;
                }
            }
            cleaned.push(trimmed);
        }

        let heading = 'Cleaned Document View';
        let bodyParagraphs = [];

        cleaned.forEach((p) => {
            if (p.startsWith('===') || p.startsWith('#')) {
                heading = p.replace(/[=#]/g, '').trim();
            } else {
                bodyParagraphs.push(p);
            }
        });

        const isMultiCol = optMultiCol && optMultiCol.checked;
        const colClass = isMultiCol ? 'columns-2 gap-4' : 'columns-1';
        const inkStyle = optInk && optInk.checked ? 'color: #000; font-weight: 500;' : 'color: #1e293b;';

        resultBox.innerHTML = `
            <div style="${inkStyle}">
                <h4 class="font-bold text-sm border-b border-slate-300 pb-1 mb-2 text-black">${heading}</h4>
                <div class="${colClass} text-[11px] leading-relaxed">
                    ${bodyParagraphs.map((para) => `<p class="mb-2">${para}</p>`).join('')}
                </div>
            </div>
        `;

        if (savingsBadge) {
            const savings = isMultiCol ? '68% Paper & Ink Saved' : '45% Paper Saved';
            savingsBadge.innerHTML = `<i data-lucide="arrow-down" class="w-3.5 h-3.5"></i> ${savings}`;
            if (window.lucide) lucide.createIcons();
        }
    });
}

/* --------------------------------------------------------------------------
   7. Modals: Habit QR & Piyush PrintOptimiser Deep Dives
   -------------------------------------------------------------------------- */
const projectData = {
    'habit-qr': {
        title: 'Habit QR — Architecture & Technical Specifications',
        badge: 'Flagship Web App',
        badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
        tagline: 'Bridging physical actions with instantaneous digital accountability.',
        problem:
            'Most habit tracking apps suffer from severe churn within 14 days because users forget to open the app, navigate complex multi-nested menus, or lose momentum when forced to log in.',
        solution:
            'Habit QR places physical anchors in real environments. Stick a custom QR code on your yoga mat, bedside table, or water bottle. Scanning with any smartphone camera immediately executes the check-in script, calculates current streak analytics, and logs progress with zero friction.',
        specs: [
            { label: 'Frontend Stack', val: 'Vanilla JavaScript ES6+, Tailwind CSS, Canvas API' },
            { label: 'Hosting & Edge', val: 'Cloudflare Pages, Edge Network' },
            { label: 'Persistence', val: 'Local-first IndexedDB + Encrypted LocalStorage' },
            { label: 'Print Engine', val: 'Vector SVG Multi-QR printable sheet generator' },
            { label: 'Telemetry', val: 'Privacy-focused anonymous telemetry (zero cookies)' }
        ],
        features: [
            'Instant camera recognition via native QR scanner',
            'Dynamic printable badge generation with custom color palettes',
            'Streak calendar heatmap & consistency scoring algorithm',
            'Offline PWA capabilities with auto-reconnect syncing'
        ],
        liveUrl: 'https://piyushprojects.pages.dev',
        repoUrl: 'https://github.com/piyushprojects7/pliv'
    },
    'print-optimiser': {
        title: 'Piyush PrintOptimiser — Algorithmic Layout Specs',
        badge: 'Eco-Utility Engine',
        badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
        tagline: 'Eliminating paper waste, banner bloat, and toner depletion.',
        problem:
            'Modern web pages are flooded with responsive menus, advertisements, oversized hero banners, sticky headers, and tracking scripts. Standard browser printing results in 5 to 10 sheets of paper filled with meaningless white space and ink-draining colored boxes.',
        solution:
            'Piyush PrintOptimiser traverses the active DOM tree, isolates core narrative and tabular nodes, eliminates visual noise, injects custom @media print rules, and redistributes text into balanced multi-column flows to save up to 60-70% of physical paper.',
        specs: [
            { label: 'Core Engine', val: 'DOMParser, TreeWalker, CSS Page Margins API' },
            { label: 'Output Formats', val: 'Print Preview, Clean High-Contrast PDF, Ink-Saver Mode' },
            { label: 'Performance', val: '< 80ms parsing latency for 50-page documents' },
            { label: 'Security', val: '100% Client-Side execution (documents never leave your browser)' },
            { label: 'Compatibility', val: 'All modern Chromium, Firefox, and WebKit browsers' }
        ],
        features: [
            'Intelligent orphan page and trailing line prevention',
            'Grayscale ink-saver rendering with high-contrast text',
            'Dynamic 2-column or 3-column auto-flow restructuring',
            'Real-time sheet consumption and cost-saving metrics calculator'
        ],
        liveUrl: 'https://piyushprojects.pages.dev',
        repoUrl: 'https://github.com/piyushprojects7/pliv'
    }
};

function initModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    if (!modal || !modalClose) return;

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
}

window.openProjectModal = function (projectId) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    const data = projectData[projectId];
    if (!data) return;

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold px-3 py-1 rounded-full border ${data.badgeColor}">${data.badge}</span>
                <span class="text-xs text-slate-400 font-mono">Piyush Projects Ecosystem</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${data.title}</h3>
            <p class="text-brand-cyan text-sm font-medium">${data.tagline}</p>
        </div>

        <div class="space-y-3 pt-2">
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 class="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-1">The Problem We Solved</h4>
                <p class="text-slate-300 text-sm leading-relaxed">${data.problem}</p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 class="text-xs uppercase font-mono font-bold text-brand-purple tracking-wider mb-1">Our Engineered Solution</h4>
                <p class="text-slate-300 text-sm leading-relaxed">${data.solution}</p>
            </div>
        </div>

        <div class="space-y-2">
            <h4 class="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">Technical Specifications</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                ${data.specs
                    .map(
                        (s) => `
                    <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-center">
                        <span class="text-slate-500">${s.label}</span>
                        <span class="text-slate-200 font-semibold">${s.val}</span>
                    </div>
                `
                    )
                    .join('')}
            </div>
        </div>

        <div class="space-y-2">
            <h4 class="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">Core Capabilities</h4>
            <div class="space-y-1.5">
                ${data.features
                    .map(
                        (f) => `
                    <div class="flex items-center gap-2 text-xs text-slate-300">
                        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                        <span>${f}</span>
                    </div>
                `
                    )
                    .join('')}
            </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
            <a href="${data.repoUrl}" target="_blank" class="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-2">
                <i data-lucide="github" class="w-4 h-4"></i> View Code
            </a>
            <a href="${data.liveUrl}" target="_blank" class="btn-gradient px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/25">
                <i data-lucide="external-link" class="w-4 h-4"></i> Open in Piyush Projects Hub
            </a>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
};

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        feedback.textContent = `Thank you ${name}! Opening your email client to send this message to the PLIV team...`;
        feedback.classList.remove('hidden');

        // Form mailto trigger
        const mailtoLink = `mailto:piyushprojects@gmail.com?subject=${encodeURIComponent(
            `[PLIV Contact] ${subject} from ${name}`
        )}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`
        )}`;

        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1200);
    });
}
