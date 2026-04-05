const fs = require('fs');
const path = require('path');

const pages = [
  {
    file: 'fleet-wagonr.html',
    title: 'Suzuki Wagon R',
    subheading: 'Economy Hatchback',
    image: './images/fleet-classic.jpg',
    model: './models/wagonr.glb',
    intro: 'Our lightest and most economical ride, ideal for solo travelers and chilled city drives.',
    overview: 'The Wagon R is compact, efficient, and tuned for Sri Lanka city conditions. Its compact dimensions make traffic and parking easy without sacrificing reliability.',
    usage: 'Best for short-distance transfers, airport pickups, and short day trips where cost efficiency is a priority.',
    capacity: '3 Guests',
    luggage: '2 Bags',
    fuel: 'Petrol (up to 18 km/l)',
    comfort: 'Basic comfort, efficient design',
    features: '<li>Easy city parking</li><li>Low cost per km</li><li>Responsive engine for urban roads</li><li>Simple and clean cabin</li>',
    use_case_intro: 'Recommended for value-first guests who still want clean, air-conditioned, hassle-free travel with a trusted driver.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport dropoff</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Quick airport transfer without premium charge.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>City tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Easy maneuvering through Colombo streets.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Short errands</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Best for 1-2 hour trips with light luggage.</p></div>'
  },
  {
    file: 'fleet-shuttle.html',
    title: 'Honda Shuttle',
    subheading: 'Practical Wagon',
    image: './images/fleet-van.jpg',
    model: './models/shuttle.glb',
    intro: 'A versatile family-friendly wagon with extra passenger comfort and storage space.',
    overview: 'Honda Shuttle blends hatchback agility with hatchback cargo room, making it an excellent choice for travellers carrying bags and souvenirs.',
    usage: 'Perfect for 2-4 travellers and short to medium distance transfers with extra luggage needs.',
    capacity: '4 Guests',
    luggage: '3 Bags',
    fuel: 'Petrol',
    comfort: 'Comfortable seating, smooth ride',
    features: '<li>Spacious rear cabin</li><li>Stable highway performance</li><li>Good for urban & suburban runs</li><li>Low-fuss operation</li>',
    use_case_intro: 'Ideal for couples or small groups who want a bit more personal space than a micro car, while staying budget-friendly.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport & hotel shuttle</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Comfortable ride with luggage space.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Day tours</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Good for short cultural circuits.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Family transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Fits 3 adults + 1 child with bags.</p></div>'
  },
  {
    file: 'fleet-kdh-flat.html',
    title: 'Toyota KDH (Flat Roof)',
    subheading: 'Standard Minivan',
    image: './images/fleet-kdh-flat.jpg',
    model: './models/kdh-flat.glb',
    intro: 'The go-to family van with reliable comfort, easy access, and a clean interior feel.',
    overview: 'KDH Flat is the standard minivan choice for groups up to 6. It keeps the center of gravity lower and provides easy boarding at any stop.',
    usage: 'Ideal for family outings, circuit tours, and hotel-to-site transfers for 5-6 guests.',
    capacity: '6 Guests',
    luggage: '5 Bags',
    fuel: 'Diesel',
    comfort: 'Standard minivan comfort',
    features: '<li>Large rear cargo area</li><li>Side door entry</li><li>Stable, safe handling</li><li>A/C made for group travel</li>',
    use_case_intro: 'Designed for families and multi-day tours where every passenger requires ample legroom and moderate storage.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Family tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Great for kids and grandparents.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport group transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Load multiple suitcases easily.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Multi-stop route</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Perfect for the Hill Country circuit.</p></div>'
  },
  {
    file: 'fleet-kdh-high.html',
    title: 'Toyota KDH (High Roof)',
    subheading: 'Premium Minivan',
    image: './images/fleet-kdh-high.jpg',
    model: './models/kdh-high.glb',
    intro: 'Premium tall-roof minivan with top-level space and comfort for longer journeys.',
    overview: 'KDH High Roof offers additional headroom and more luggage capacity, making it ideal for premium tour experience and bigger groups.',
    usage: 'Best for long-distance circuits, wildlife trips, and groups requiring maximal cabin height and luggage capacity.',
    capacity: '9 Guests',
    luggage: '8 Bags',
    fuel: 'Diesel',
    comfort: 'Premium minivan comfort',
    features: '<li>Heightened cabin for movement</li><li>Extended legroom</li><li>Flat roof racks optional</li><li>Great for larger groups</li>',
    use_case_intro: 'The top family and group choice when travelers need expansive interior space and a relaxed, airy cabin on extended road trips.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Group circuit</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">8+ guests across sites comfortably.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Safari + hills</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Enough space for coolers and gear.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Extended tours</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">High roof reduces fatigue on long days.</p></div>'
  },
  {
    file: 'fleet-prius.html',
    title: 'Toyota Prius',
    subheading: 'Eco Hybrid',
    image: './images/fleet-prius.jpg',
    model: './models/prius.glb',
    intro: 'A quiet hybrid option for environmentally conscious travelers with great city efficiency.',
    overview: 'Prius uses hybrid technology to maximize fuel economy and minimize emissions, while keeping a smooth and silent drive for your transfer requirements.',
    usage: 'Perfect for solo or couple transfers, corporate airport pickups, and eco-friendly daily rentals.',
    capacity: '3 Guests',
    luggage: '3 Bags',
    fuel: 'Hybrid Petrol/Electric',
    comfort: 'Moderate hybrid comfort',
    features: '<li>Best-in-class fuel economy</li><li>Low emissions</li><li>Quiet cabin experience</li><li>Smart start without idle noise</li>',
    use_case_intro: 'For travelers who prioritize sustainability but still demand a clean, responsive vehicle for urban and intercity rides.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Eco airport run</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Reduce fuel footprint on business travel.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>City adventures</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Ideal for Colombo and Galle day trips.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Green tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Recommended for conscious groups.</p></div>'
  },
  {
    file: 'fleet-axio.html',
    title: 'Toyota Axio',
    subheading: 'City Sedan',
    image: './images/fleet-sedan.jpg',
    model: './models/axio.glb',
    intro: 'A reliable sedan that provides quiet comfort and a refined ride for private transfers.',
    overview: 'Axio is the go-to sedan for professional airport transfers, corporate travelers, and efficient medium-range travel with a clean profile.',
    usage: 'Suitable for couples and small families who need comfortable seats and good boot space at a reasonable price.',
    capacity: '3 Guests',
    luggage: '3 Bags',
    fuel: 'Petrol',
    comfort: 'Refined sedan comfort',
    features: '<li>Well-balanced ride quality</li><li>Corporate-friendly style</li><li>Stable handling</li><li>Temperature-controlled cabin</li>',
    use_case_intro: 'Best for arrivals/departures, corporate clients, and guests who want a low-key but polished travel experience.',
    use_case_items: '<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Executive airport ride</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Professional and comfortable.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Short tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Smooth with reasonable fuel economy.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Hotel transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Easy loading for mid-size luggage.</p></div>'
  }
];

const template = fs.readFileSync(path.join(__dirname, 'fleet-details.html'), 'utf8'); // not needed; we'll re-use function below if wanted

function makeHtml(item) {
  const mediaMarkup = item.model ? `
            <div class="image-shell rounded-[28px] p-[1px]">
                <div class="viewer-stage min-h-[280px] md:min-h-[420px]">
                    <model-viewer class="vehicle-model" src="${item.model}" alt="${item.title} 3D model" auto-rotate camera-controls environment-image="neutral" exposure="1.5" shadow-intensity="1.5" interaction-prompt="auto" style="width:100%; height:500px;"></model-viewer>
                    <div class="viewer-hint">Drag to rotate 360°</div>
                </div>
            </div>` : `
            <div class="image-shell rounded-[28px] p-[1px]">
                <div class="viewer-stage min-h-[280px] md:min-h-[420px] flex items-center justify-center">
                    <div class="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">3D model unavailable</div>
                </div>
            </div>`;

  const html = `<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>${item.title} - SerenDrive</title>

    <script>
        // Set Dark Mode as the absolute default
        if (localStorage.theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    </script>

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ffffff", "on-primary": "#1a1c1c",
                        "surface-variant": "#353534", "outline": "#919191",
                        "surface-container-high": "#2a2a2a", "surface": "#131313",
                        "primary-container": "#d4d4d4", "surface-container-low": "#1c1b1b",
                        "background": "#131313", "on-surface-variant": "#c6c6c6",
                        "surface-container-lowest": "#0e0e0e", "surface-container": "#201f1f",
                    },
                    fontFamily: {
                        "headline": ["Manrope"], "body": ["Inter"], "label": ["Inter"]
                    }
                },
            },
        }
    </script>

    <style>
        :root { --symbol-opacity: 0.15; }
        .dark { --symbol-opacity: 0.10; }
        body { overflow-x: hidden; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        @media (pointer: fine) { body, a, button, input, select, textarea { cursor: none !important; }}

        .liquid-glass { background: rgba(255,255,255,0.85); backdrop-filter: blur(24px) saturate(120%); -webkit-backdrop-filter: blur(24px) saturate(120%); border:1px solid rgba(255,255,255,0.4); box-shadow:0 8px 32px rgba(0,0,0,0.1); transition: all .5s ease-in-out; }
        .dark .liquid-glass { background: rgba(20,20,20,0.55); border:1px solid rgba(255,255,255,0.1); box-shadow:0 8px 32px rgba(0,0,0,.6); }
        .text-stroke { -webkit-text-stroke:1px rgba(0,0,0,.2); color:transparent; }
        .dark .text-stroke { -webkit-text-stroke:1px rgba(255,255,255,.2); }
        #cursor-canvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10000;mix-blend-mode:difference}
        #sparkles { position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:9998; }
        .floating-symbol { position:absolute; color:inherit; pointer-events:none; animation: floatSymbol linear infinite; }
        @keyframes floatSymbol { 0% { transform: translateY(110vh) rotate(0deg); opacity:0; } 10% { opacity:var(--symbol-opacity); } 90% { opacity:var(--symbol-opacity); } 100% { transform: translateY(-20vh) rotate(359deg); opacity:0; } }
        .image-shell { background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.04) 100%); border:1px solid rgba(255,255,255,.18); box-shadow:0 16px 40px rgba(15,23,42,.12); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
        .dark .image-shell { background: linear-gradient(135deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.02) 100%); border:1px solid rgba(255,255,255,.08); box-shadow:0 18px 45px rgba(0,0,0,.28); }
        .stat-pill { display:inline-flex; align-items:center; gap:.45rem; padding:.55rem .85rem; border-radius:999px; background:rgba(255,255,255,.8); border:1px solid rgba(0,0,0,.08); font-size:.78rem; letter-spacing:.02em; }
        .dark .stat-pill { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); }
        .detail-card { background: rgba(255,255,255,.9); backdrop-filter: blur(10px); border:1px solid rgba(24,24,27,.08); box-shadow:0 10px 30px rgba(0,0,0,.04); }
        .dark .detail-card { background: rgba(24,24,27,.85); border:1px solid rgba(255,255,255,.07); box-shadow:0 10px 30px rgba(0,0,0,.22); }
        .feature-list li { position:relative; padding-left:1.1rem; }
        .feature-list li::before { content:'•'; position:absolute; left:0; opacity:.7; }
        .viewer-stage { position:relative; min-height:500px; border-radius:1.5rem; overflow:hidden; background: radial-gradient(circle at top, rgba(34,211,238,.12), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(241,245,249,.32) 100%); }
        .dark .viewer-stage { background: radial-gradient(circle at top, rgba(34,211,238,.12), transparent 55%), linear-gradient(180deg, rgba(15,23,42,.88) 0%, rgba(9,9,11,.75) 100%); }
        .vehicle-model { width:100%; height:500px; min-height:500px; --poster-color: transparent; background:transparent; display:block; filter: drop-shadow(0 8px 18px rgba(34, 211, 238, 0.24)); }
        .dark .vehicle-model { filter: drop-shadow(0 10px 20px rgba(103, 232, 249, 0.22)); }
        .viewer-hint { position:absolute; left:50%; bottom:14px; transform:translateX(-50%); padding:.45rem .8rem; border-radius:999px; background:rgba(15,23,42,.58); backdrop-filter:blur(10px); color:#fff; font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; border:1px solid rgba(255,255,255,.08); }
        .dark .viewer-hint { background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.08); }
    </style>
</head>
<body class="bg-zinc-50 dark:bg-surface text-zinc-900 dark:text-white transition-colors duration-500">
    <canvas id="cursor-canvas"></canvas>
    <canvas id="sparkles"></canvas>

    <nav class="fixed top-0 left-0 right-0 z-50 liquid-glass">
        <div class="max-w-[1440px] mx-auto px-6 md:px-16 py-4">
            <div class="flex items-center justify-between">
                <a href="index.html" class="group"><img src="./images/serendrive-logo.png" alt="SerenDrive Logo" class="h-8 md:h-10 w-auto invert dark:invert-0 transition-all duration-1000"></a>
                <div class="flex items-center gap-8">
                    <a href="index.html#fleet" class="text-sm uppercase tracking-widest text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">← Back to Fleet</a>
                    <button id="theme-toggle" class="flex items-center justify-center p-2 rounded-full border border-zinc-300 dark:border-white/20 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors">
                        <span class="material-symbols-outlined text-zinc-800 dark:hidden text-[18px]">dark_mode</span>
                        <span class="material-symbols-outlined hidden dark:block text-white text-[18px]">light_mode</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <section class="pt-28 md:pt-36 pb-14 md:pb-20 px-6 md:px-16 bg-gradient-to-b from-zinc-100 via-white to-white dark:from-surface dark:via-surface-container dark:to-surface-container-lowest">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 mb-4 block">${item.subheading}</span>
                <h1 class="font-headline text-4xl md:text-6xl font-extrabold tracking-tight mb-5">${item.title}</h1>
                <p class="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">${item.intro}</p>
                <div class="flex flex-wrap gap-3 mb-8">
                    <span class="stat-pill"><span class="material-symbols-outlined text-[18px]">group</span>${item.capacity}</span>
                    <span class="stat-pill"><span class="material-symbols-outlined text-[18px]">luggage</span>${item.luggage}</span>
                    <span class="stat-pill"><span class="material-symbols-outlined text-[18px]">local_gas_station</span>${item.fuel}</span>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="#details" class="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold uppercase tracking-widest text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors rounded-sm text-center">View Details</a>
                    <a href="index.html#inquire" class="inline-block px-8 py-4 border border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white font-semibold uppercase tracking-widest text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors rounded-sm text-center">Book This Vehicle</a>
                </div>
            </div>
            ${mediaMarkup}
        </div>
    </section>

    <section id="details" class="pb-20 md:pb-28 px-6 md:px-16 bg-white dark:bg-surface-container-lowest">
        <div class="max-w-6xl mx-auto space-y-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <div class="detail-card p-7 md:p-8 rounded-2xl">
                    <h2 class="font-headline text-3xl md:text-4xl font-bold mb-5">${item.title} Overview</h2>
                    <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">${item.overview}</p>
                    <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">${item.usage}</p>
                    <div class="mt-6 rounded-xl bg-zinc-50 dark:bg-white/5 p-5">
                        <h3 class="font-headline text-xl font-bold mb-3">Why guests choose it</h3>
                        <ul class="feature-list space-y-2 text-sm text-zinc-600 dark:text-zinc-400">${item.features}</ul>
                    </div>
                </div>
                <div class="detail-card p-7 md:p-8 rounded-2xl">
                    <h3 class="font-headline text-2xl font-bold mb-4">Ride Details</h3>
                    <ul class="space-y-3 text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                        <li><strong>Category:</strong> ${item.subheading}</li>
                        <li><strong>Seating:</strong> ${item.capacity}</li>
                        <li><strong>Luggage:</strong> ${item.luggage}</li>
                        <li><strong>Fuel Type:</strong> ${item.fuel}</li>
                        <li><strong>Comfort Level:</strong> ${item.comfort}</li>
                        <li><strong>Driver:</strong> Professional chauffeur included</li>
                        <li><strong>Ideal for:</strong> Private transfers, airport runs, and relaxed day travel</li>
                    </ul>
                </div>
            </div>

            <div class="detail-card p-7 md:p-8 rounded-2xl">
                <h3 class="font-headline text-3xl font-bold mb-4">Suggested Use Cases</h3>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">${item.use_case_intro}</p>
                <div class="grid md:grid-cols-3 gap-4">${item.use_case_items}</div>
            </div>

            <div class="mt-10 text-center">
                <a href="index.html#inquire" class="inline-block px-12 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold uppercase tracking-widest text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors rounded-sm">Inquire for Bookings</a>
            </div>
        </div>
    </section>

    <footer class="py-12 px-6 md:px-16 bg-zinc-900 dark:bg-black text-white text-center">
        <div class="max-w-6xl mx-auto">
            <p class="text-zinc-400">&copy; 2026 SerenDrive. All rights reserved.</p>
        </div>
    </footer>

    <script>
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            if (cursor) cursor.style.border = isDark ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(0,0,0,0.4)';
        });

        const symbolsContainer = document.createElement('div');
        symbolsContainer.className = 'fixed inset-0 pointer-events-none overflow-hidden z-[2]';
        document.body.appendChild(symbolsContainer);

        const icons = ['flight_takeoff', 'directions_car', 'luggage', 'explore', 'sailing', 'landscape', 'photo_camera', 'map'];
        const symbolCount = 20;
        for (let i = 0; i < symbolCount; i++) {
            const span = document.createElement('span');
            span.className = 'material-symbols-outlined floating-symbol text-zinc-900 dark:text-white transition-colors duration-500';
            span.innerText = icons[Math.floor(Math.random() * icons.length)];
            const size = Math.random() * 60 + 30;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 30 + 30;
            const animDelay = Math.random() * -60;
            span.style.fontSize = size + 'px';
            span.style.left = left + 'vw';
            span.style.animationDuration = animDuration + 's';
            span.style.animationDelay = animDelay + 's';
            symbolsContainer.appendChild(span);
        }

        const cursor = document.querySelector('.custom-cursor');
        const canvas = document.getElementById('sparkles');
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, isDark) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2.5 + 1.5;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1.5;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.02;
                if (isDark) {
                    const darkColors = ['#cbd5e1', '#93c5fd', '#bae6fd', '#e2e8f0'];
                    this.color = darkColors[Math.floor(Math.random() * darkColors.length)];
                } else {
                    const lightColors = ['#000000', '#1c1917', '#334155'];
                    this.color = lightColors[Math.floor(Math.random() * lightColors.length)];
                }
            }
            update() { this.x += this.speedX; this.y += this.speedY; this.life -= this.decay; }
            draw() { ctx.globalAlpha = Math.max(0, this.life); ctx.fillStyle = this.color; ctx.shadowBlur = 8; ctx.shadowColor = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }

        function animateSparks() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((p, i) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(i, 1); }); requestAnimationFrame(animateSparks); }
        animateSparks();

        document.querySelectorAll('model-viewer').forEach((viewer) => {
            viewer.addEventListener('error', () => {
                viewer.style.display = 'none';
            });
        });

        (function(){var cc=document.getElementById('cursor-canvas');if(!cc||!matchMedia('(pointer:fine)').matches)return;var ctx2=cc.getContext('2d'),cw,ch,cdpr,cmx=-100,cmy=-100,chov=false,chT=0,ctrail=[],cN=15;function cresize(){cdpr=devicePixelRatio||1;cw=innerWidth;ch=innerHeight;cc.width=cw*cdpr;cc.height=ch*cdpr;cc.style.width=cw+'px';cc.style.height=ch+'px';ctx2.setTransform(cdpr,0,0,cdpr,0,0)}cresize();addEventListener('resize',cresize);addEventListener('mousemove',function(e){cmx=e.clientX;cmy=e.clientY;const isDark=htmlElement.classList.contains('dark');for(var i=0;i<2;i++){particles.push(new Particle(e.clientX,e.clientY,isDark))}});addEventListener('mouseout',function(e){if(!e.relatedTarget){cmx=-100;cmy=-100;ctrail.length=0}});document.querySelectorAll('button,a,[role="button"],input,select,textarea,.group').forEach(function(el){el.addEventListener('mouseenter',function(){chov=true});el.addEventListener('mouseleave',function(){chov=false})});function cframe(){ctx2.clearRect(0,0,cw,ch);if(cmx<0){requestAnimationFrame(cframe);return}ctrail.unshift({x:cmx,y:cmy});if(ctrail.length>cN)ctrail.pop();chT+=((chov?1:0)-chT)*0.18;if(ctrail.length>2){ctx2.save();ctx2.lineCap='round';for(var i=1;i<ctrail.length;i++){var t=1-i/ctrail.length;var a=t*t*0.3;ctx2.beginPath();ctx2.moveTo(ctrail[i-1].x,ctrail[i-1].y);ctx2.lineTo(ctrail[i].x,ctrail[i].y);ctx2.strokeStyle='rgba(255,255,255,'+a+')';ctx2.lineWidth=2.5*t;ctx2.stroke()}ctx2.restore()}if(chT>0.01){var r=22*chT;ctx2.beginPath();ctx2.arc(cmx,cmy,r,0,6.283);ctx2.strokeStyle='rgba(255,255,255,'+(0.5*chT)+')';ctx2.lineWidth=1;ctx2.stroke()}ctx2.beginPath();ctx2.arc(cmx,cmy,3.5-chT*1.5,0,6.283);ctx2.fillStyle='#fff';ctx2.fill();ctx2.beginPath();ctx2.arc(cmx,cmy,5,0,6.283);ctx2.strokeStyle='rgba(255,255,255,'+(0.15+chT*0.3)+')';ctx2.lineWidth=0.5;ctx2.stroke();requestAnimationFrame(cframe)}cframe()})();
    </script>
</body>
</html>`;
  return html;
}

pages.forEach((item) => {
  const out = makeHtml(item);
  fs.writeFileSync(path.join(__dirname, item.file), out, 'utf8');
  console.log('wrote', item.file);
});
console.log('done');
