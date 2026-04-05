import pathlib

def generate_page(data):
    return f"""<!DOCTYPE html>
<html class=\"scroll-smooth\" lang=\"en\">
<head>
    <meta charset=\"utf-8\"/>
    <meta content=\"width=device-width, initial-scale=1.0\" name=\"viewport\"/>
    <title>{data['title']} - SerenDrive</title>

    <script>
        // Set Dark Mode as the absolute default
        if (localStorage.theme === 'light') {{
            document.documentElement.classList.remove('dark');
        }} else {{
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }}
    </script>

    <script src=\"https://cdn.tailwindcss.com?plugins=forms,container-queries\"></script>
    <link href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap\" rel=\"stylesheet\"/>
    <link href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap\" rel=\"stylesheet\"/>

    <script id=\"tailwind-config\">
        tailwind.config = {{
            darkMode: "class",
            theme: {{
                extend: {{
                    colors: {{
                        "primary": "#ffffff", "on-primary": "#1a1c1c",
                        "surface-variant": "#353534", "outline": "#919191",
                        "surface-container-high": "#2a2a2a", "surface": "#131313",
                        "primary-container": "#d4d4d4", "surface-container-low": "#1c1b1b",
                        "background": "#131313", "on-surface-variant": "#c6c6c6",
                        "surface-container-lowest": "#0e0e0e", "surface-container": "#201f1f",
                    }},
                    fontFamily: {{
                        "headline": ["Manrope"], "body": ["Inter"], "label": ["Inter"]
                    }}
                }},
            }},
        }}
    </script>

    <style>
        :root {{ --symbol-opacity: 0.15; }}
        .dark {{ --symbol-opacity: 0.10; }}
        body {{ overflow-x: hidden; }}
        .material-symbols-outlined {{ font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }}
        @media (pointer: fine) {{ body, a, button, input, select, textarea {{ cursor: none !important; }} }}

        .liquid-glass {{ background: rgba(255,255,255,0.85); backdrop-filter: blur(24px) saturate(120%); -webkit-backdrop-filter: blur(24px) saturate(120%); border:1px solid rgba(255,255,255,0.4); box-shadow:0 8px 32px rgba(0,0,0,0.1); transition: all .5s ease-in-out; }}
        .dark .liquid-glass {{ background: rgba(20,20,20,0.55); border:1px solid rgba(255,255,255,0.1); box-shadow:0 8px 32px rgba(0,0,0,.6); }}

        .text-stroke {{ -webkit-text-stroke:1px rgba(0,0,0,.2); color:transparent; }}
        .dark .text-stroke {{ -webkit-text-stroke:1px rgba(255,255,255,.2); }}

        .custom-cursor {{ width:12px; height:12px; border:1px solid rgba(0,0,0,.4); border-radius:50%; position:fixed; pointer-events:none; z-index:9999; transition: transform .1s ease-out, width .3s, height .3s, border-color .3s, background-color .3s; }}
        .dark .custom-cursor {{ border:1px solid rgba(255,255,255,.4); }}

        #sparkles {{ position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:9998; }}

        .floating-symbol {{ position:absolute; color:inherit; pointer-events:none; animation: floatSymbol linear infinite; }}
        @keyframes floatSymbol {{ 0% {{ transform: translateY(110vh) rotate(0deg); opacity:0; }} 10% {{ opacity:var(--symbol-opacity); }} 90% {{ opacity:var(--symbol-opacity); }} 100% {{ transform: translateY(-20vh) rotate(359deg); opacity:0; }} }}
        .hero-gradient {{ background: linear-gradient(135deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.3) 100%); }}

        .day-card {{ background: rgba(255,255,255,.95); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,.2); }}
        .dark .day-card {{ background: rgba(20,20,20,.8); border:1px solid rgba(255,255,255,.1); }}

        .highlight-box {{ background: linear-gradient(135deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.05) 100%); border:1px solid rgba(255,255,255,.1); }}
        .dark .highlight-box {{ background: linear-gradient(135deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.05) 100%); border:1px solid rgba(255,255,255,.05); }}
    </style>
</head>
<body class="bg-zinc-50 dark:bg-surface text-zinc-900 dark:text-white transition-colors duration-500">
    <div class="custom-cursor"></div>
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

    <section class="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div class="absolute inset-0">
            <img src="{image}" alt="{title}" class="w-full h-full object-cover">
            <div class="hero-gradient absolute inset-0"></div>
        </div>
        <div class="relative z-10 text-center text-white px-6 md:px-16 max-w-4xl mx-auto">
            <span class="font-label text-sm uppercase tracking-[0.2em] text-white/80 mb-4 block">{subheading}</span>
            <h1 class="font-headline text-5xl md:text-7xl font-extrabold mb-6">{title}</h1>
            <p class="text-xl md:text-2xl font-light leading-relaxed mb-8">{intro}</p>
            <a href="#details" class="inline-block px-8 py-4 bg-white text-zinc-900 font-semibold uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors rounded-sm">View Specifications</a>
        </div>
    </section>

    <section id="details" class="py-20 md:py-32 px-6 md:px-16 bg-white dark:bg-surface-container-lowest">
        <div class="max-w-6xl mx-auto">
            <div class="grid md:grid-cols-2 gap-16 mb-12">
                <div>
                    <h2 class="font-headline text-4xl md:text-5xl font-bold mb-6">{title} Overview</h2>
                    <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{overview}</p>
                    <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">{usage}</p>
                    <div class="highlight-box p-6 rounded-sm">
                        <h3 class="font-headline text-xl font-bold mb-4">Key Features</h3>
                        <ul class="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {features}
                        </ul>
                    </div>
                </div>
                <div class="bg-zinc-100 dark:bg-surface p-6 rounded-sm">
                    <h3 class="font-headline text-2xl font-bold mb-4">Specifications</h3>
                    <ul class="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                        <li><strong>Category:</strong> {subheading}</li>
                        <li><strong>Seating:</strong> {capacity}</li>
                        <li><strong>Luggage:</strong> {luggage}</li>
                        <li><strong>Fuel Type:</strong> {fuel}</li>
                        <li><strong>Comfort Level:</strong> {comfort}</li>
                        <li><strong>Driver:</strong> Professional chauffeur included</li>
                    </ul>
                </div>
            </div>

            <div class="day-card p-8 rounded-sm">
                <h3 class="font-headline text-3xl font-bold mb-4">Suggested Use Case</h3>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{use_case_intro}</p>
                <div class="grid md:grid-cols-3 gap-4">
                    {use_case_items}
                </div>
            </div>

            <div class="mt-12 text-center">
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
        themeToggleBtn.addEventListener('click', () => {{
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            if (cursor) cursor.style.border = isDark ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(0,0,0,0.4)';
        }});

        const symbolsContainer = document.createElement('div');
        symbolsContainer.className = 'fixed inset-0 pointer-events-none overflow-hidden z-[2]';
        document.body.appendChild(symbolsContainer);

        const icons = ['flight_takeoff', 'directions_car', 'luggage', 'explore', 'sailing', 'landscape', 'photo_camera', 'map'];
        const symbolCount = 20;
        for (let i = 0; i < symbolCount; i++) {{
            const span = document.createElement('span');
            span.className = 'material-symbols-outlined floating-symbol text-zinc-900 dark:text-white transition-colors duration-500';
            span.innerText = icons[Math.floor(Math.random() * icons.length)];
            const size = Math.random() * 60 + 30;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 30 + 30;
            const animDelay = Math.random() * -60;
            span.style.fontSize = `${{size}}px`;
            span.style.left = `${{left}}vw`;
            span.style.animationDuration = `${{animDuration}}s`;
            span.style.animationDelay = `${{animDelay}}s`;
            symbolsContainer.appendChild(span);
        }}

        const cursor = document.querySelector('.custom-cursor');
        const canvas = document.getElementById('sparkles');
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {{ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }}
        window.addEventListener('resize', resizeCanvas); resizeCanvas();

        class Particle {{
            constructor(x, y, isDark) {{
                this.x = x; this.y = y; this.size = Math.random() * 2.5 + 1.5;
                this.speedX = Math.random() * 2 - 1; this.speedY = Math.random() * 2 - 1.5;
                this.life = 1; this.decay = Math.random() * 0.02 + 0.02;
                if (isDark) {{ const darkColors=['#cbd5e1','#93c5fd','#bae6fd','#e2e8f0']; this.color=darkColors[Math.floor(Math.random()*darkColors.length)]; }} else {{ const lightColors=['#000000','#1c1917','#334155']; this.color=lightColors[Math.floor(Math.random()*lightColors.length)]; }}
            }}
            update() {{ this.x += this.speedX; this.y += this.speedY; this.life -= this.decay; }}
            draw() {{ ctx.globalAlpha = Math.max(0,this.life); ctx.fillStyle=this.color; ctx.shadowBlur=8; ctx.shadowColor=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }}
        }}

        function animateSparks() {{ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach((p,i)=>{{ p.update(); p.draw(); if(p.life<=0) particles.splice(i,1); }}); requestAnimationFrame(animateSparks); }}
        animateSparks();

        if(cursor) {{
            document.addEventListener('mousemove', (e)=>{{ cursor.style.transform=`translate(${{e.clientX-6}}px, ${{e.clientY-6}}px)`; if(window.matchMedia("(pointer: fine)").matches) {{ const isDark=htmlElement.classList.contains('dark'); for(let i=0;i<2;i++) particles.push(new Particle(e.clientX,e.clientY,isDark)); }} }});
            const interactives=document.querySelectorAll('button,a,.group,input,select,textarea');
            interactives.forEach(el=>{{ el.addEventListener('mouseenter',()=>{{ const isDark=htmlElement.classList.contains('dark'); cursor.style.width='40px'; cursor.style.height='40px'; cursor.style.backgroundColor=isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'; cursor.style.border=isDark?'1px solid rgba(255,255,255,0.8)':'1px solid rgba(0,0,0,0.8)'; }}); el.addEventListener('mouseleave',()=>{{ const isDark=htmlElement.classList.contains('dark'); cursor.style.width='12px'; cursor.style.height='12px'; cursor.style.backgroundColor='transparent'; cursor.style.border=isDark?'1px solid rgba(255,255,255,0.4)':'1px solid rgba(0,0,0,0.4)'; }}); }});
        }}
    </script>
</body>
</html>"""

pages = [
    {
        'file':'fleet-wagonr.html', 'title':'Suzuki Wagon R', 'subheading':'Economy Hatchback', 'image':'./images/fleet-classic.jpg',
        'intro':'Our lightest and most economical ride, ideal for solo travelers and chilled city drives.',
        'overview':'The Wagon R is compact, efficient, and tuned for Sri Lanka city conditions. Its compact dimensions make traffic and parking easy without sacrificing reliability.',
        'usage':'Best for short-distance transfers, airport pickups, and short day trips where cost efficiency is a priority.',
        'capacity':'3 Guests', 'luggage':'2 Bags', 'fuel':'Petrol (up to 18 km/l)', 'comfort':'Basic comfort, efficient design',
        'features':'<li>Easy city parking</li><li>Low cost per km</li><li>Responsive engine for urban roads</li><li>Simple and clean cabin</li>',
        'use_case_intro':'Recommended for value-first guests who still want clean, air-conditioned, hassle-free travel with a trusted driver.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport dropoff</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Quick airport transfer without premium charge.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>City tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Easy maneuvering through Colombo streets.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Short errands</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Best for 1-2 hour trips with light luggage.</p></div>'
    },
    {
        'file':'fleet-shuttle.html', 'title':'Honda Shuttle', 'subheading':'Practical Wagon', 'image':'./images/fleet-van.jpg',
        'intro':'A versatile family-friendly wagon with extra passenger comfort and storage space.',
        'overview':'Honda Shuttle blends hatchback agility with hatchback cargo room, making it an excellent choice for travellers carrying bags and souvenirs.',
        'usage':'Perfect for 2-4 travellers and short to medium distance transfers with extra luggage needs.',
        'capacity':'4 Guests', 'luggage':'3 Bags', 'fuel':'Petrol', 'comfort':'Comfortable seating, smooth ride',
        'features':'<li>Spacious rear cabin</li><li>Stable highway performance</li><li>Good for urban & suburban runs</li><li>Low-fuss operation</li>',
        'use_case_intro':'Ideal for couples or small groups who want a bit more personal space than a micro car, while staying budget-friendly.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport & hotel shuttle</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Comfortable ride with luggage space.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Day tours</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Good for short cultural circuits.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Family transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Fits 3 adults + 1 child with bags.</p></div>'
    },
    {
        'file':'fleet-kdh-flat.html', 'title':'Toyota KDH (Flat Roof)', 'subheading':'Standard Minivan', 'image':'./images/fleet-kdh-flat.jpg',
        'intro':'The go-to family van with reliable comfort, easy access, and a clean interior feel.',
        'overview':'KDH Flat is the standard minivan choice for groups up to 6. It keeps the center of gravity lower and provides easy boarding at any stop.',
        'usage':'Ideal for family outings, circuit tours, and hotel-to-site transfers for 5-6 guests.',
        'capacity':'6 Guests', 'luggage':'5 Bags', 'fuel':'Diesel', 'comfort':'Standard minivan comfort',
        'features':'<li>Large rear cargo area</li><li>Side door entry</li><li>Stable, safe handling</li><li>A/C made for group travel</li>',
        'use_case_intro':'Designed for families and multi-day tours where every passenger requires ample legroom and moderate storage.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Family tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Great for kids and grandparents.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Airport group transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Load multiple suitcases easily.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Multi-stop route</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Perfect for the Hill Country circuit.</p></div>'
    },
    {
        'file':'fleet-kdh-high.html', 'title':'Toyota KDH (High Roof)', 'subheading':'Premium Minivan', 'image':'./images/fleet-kdh-high.jpg',
        'intro':'Premium tall-roof minivan with top-level space and comfort for longer journeys.',
        'overview':'KDH High Roof offers additional headroom and more luggage capacity, making it ideal for premium tour experience and bigger groups.',
        'usage':'Best for long-distance circuits, wildlife trips, and groups requiring maximal cabin height and luggage capacity.',
        'capacity':'9 Guests', 'luggage':'8 Bags', 'fuel':'Diesel', 'comfort':'Premium minivan comfort',
        'features':'<li>Heightened cabin for movement</li><li>Extended legroom</li><li>Flat roof racks optional</li><li>Great for larger groups</li>',
        'use_case_intro':'The top family and group choice when travelers need expansive interior space and a relaxed, airy cabin on extended road trips.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Group circuit</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">8+ guests across sites comfortably.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Safari + hills</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Enough space for coolers and gear.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Extended tours</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">High roof reduces fatigue on long days.</p></div>'
    },
    {
        'file':'fleet-prius.html', 'title':'Toyota Prius', 'subheading':'Eco Hybrid', 'image':'./images/fleet-classic.jpg',
        'intro':'A quiet hybrid option for environmentally conscious travelers with great city efficiency.',
        'overview':'Prius uses hybrid technology to maximize fuel economy and minimize emissions, while keeping a smooth and silent drive for your transfer requirements.',
        'usage':'Perfect for solo or couple transfers, corporate airport pickups, and eco-friendly daily rentals.',
        'capacity':'3 Guests', 'luggage':'3 Bags', 'fuel':'Hybrid Petrol/Electric', 'comfort':'Moderate hybrid comfort',
        'features':'<li>Best-in-class fuel economy</li><li>Low emissions</li><li>Quiet cabin experience</li><li>Smart start without idle noise</li>',
        'use_case_intro':'For travelers who prioritize sustainability but still demand a clean, responsive vehicle for urban and intercity rides.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Eco airport run</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Reduce fuel footprint on business travel.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>City adventures</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Ideal for Colombo and Galle day trips.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Green tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Recommended for conscious groups.</p></div>'
    },
    {
        'file':'fleet-axio.html', 'title':'Toyota Axio', 'subheading':'City Sedan', 'image':'./images/fleet-sedan.jpg',
        'intro':'A reliable sedan that provides quiet comfort and a refined ride for private transfers.',
        'overview':'Axio is the go-to sedan for professional airport transfers, corporate travelers, and efficient medium-range travel with a clean profile.',
        'usage':'Suitable for couples and small families who need comfortable seats and good boot space at a reasonable price.',
        'capacity':'3 Guests', 'luggage':'3 Bags', 'fuel':'Petrol', 'comfort':'Refined sedan comfort',
        'features':'<li>Well-balanced ride quality</li><li>Corporate-friendly style</li><li>Stable handling</li><li>Temperature-controlled cabin</li>',
        'use_case_intro':'Best for arrivals/departures, corporate clients, and guests who want a low-key but polished travel experience.',
        'use_case_items':'<div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Executive airport ride</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Professional and comfortable.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Short tour</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Smooth with reasonable fuel economy.</p></div><div class="p-4 border border-zinc-200 dark:border-white/10 rounded-sm"><strong>Hotel transfer</strong><p class="text-sm text-zinc-600 dark:text-zinc-400">Easy loading for mid-size luggage.</p></div>'
    }
]

for p in pages:
    path = pathlib.Path(p['file'])
    path.write_text(generate_page(p), encoding='utf-8')
    print('wrote', p['file'])

print('done')
