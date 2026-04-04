const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

// New CSS
const newCSS = `.cursor-dot { position:fixed; pointer-events:none; z-index:10000; width:7px; height:7px; border-radius:50%; background:#fff; box-shadow:0 0 8px 2px rgba(255,255,255,0.35), 0 0 20px 4px rgba(255,255,255,0.12); transition:opacity .25s ease,transform .25s ease; mix-blend-mode:difference; }
        .cursor-dot.hovering { opacity:0; transform:scale(0); }
        .cursor-ring { position:fixed; pointer-events:none; z-index:9999; width:36px; height:36px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.45); transition:width .35s cubic-bezier(.25,.8,.25,1),height .35s cubic-bezier(.25,.8,.25,1),border-color .3s ease,background .3s ease,backdrop-filter .3s ease; mix-blend-mode:difference; }
        .cursor-ring.hovering { width:56px; height:56px; border-color:rgba(255,255,255,0.25); background:rgba(255,255,255,0.06); backdrop-filter:blur(2px); }`;

// New HTML
const newHTML = `<div class="cursor-dot"></div>
    <div class="cursor-ring"></div>`;

// New JS for cursor (minified)
const newJS = `const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');let ringX=0,ringY=0,mouseX=0,mouseY=0;if(dot&&ring){(function animateRing(){ringX+=(mouseX-ringX)*0.15;ringY+=(mouseY-ringY)*0.15;ring.style.transform='translate('+(ringX-18)+'px,'+(ringY-18)+'px)';requestAnimationFrame(animateRing)})();document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;dot.style.transform='translate('+(e.clientX-3.5)+'px,'+(e.clientY-3.5)+'px)'});document.querySelectorAll('button, a, .group, input, select, textarea').forEach(el=>{el.addEventListener('mouseenter',()=>{dot.classList.add('hovering');ring.classList.add('hovering')});el.addEventListener('mouseleave',()=>{dot.classList.remove('hovering');ring.classList.remove('hovering')})})}`;

// Theme toggle replacement
const newToggleCode = `if(dot)dot.style.boxShadow=d?'0 0 8px 2px rgba(255,255,255,0.35), 0 0 20px 4px rgba(255,255,255,0.12)':'0 0 8px 2px rgba(0,0,0,0.2), 0 0 20px 4px rgba(0,0,0,0.06)';if(ring)ring.style.borderColor=d?'rgba(255,255,255,0.45)':'rgba(0,0,0,0.18)'`;
const newToggleCodeExpanded = `if(dot) dot.style.boxShadow = isDark
                ? '0 0 8px 2px rgba(255,255,255,0.35), 0 0 20px 4px rgba(255,255,255,0.12)'
                : '0 0 8px 2px rgba(0,0,0,0.2), 0 0 20px 4px rgba(0,0,0,0.06)';
            if(ring) ring.style.borderColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)';`;

let updated = 0;

for (const file of files) {
    const fp = path.join(dir, file);
    let t = fs.readFileSync(fp, 'utf8');
    const orig = t;

    if (!t.includes('custom-cursor') && !t.includes('cursor-dot')) {
        continue;
    }

    // ── 1. Replace CSS ──
    // Expanded format
    t = t.replace(
        /\.custom-cursor\s*\{[^}]*position\s*:\s*fixed[^}]*\}[\s\S]*?\.dark\s+\.custom-cursor\.hovering\s*\{[^}]*\}/,
        newCSS
    );
    // Minified format
    t = t.replace(
        /\.custom-cursor\s*\{[^}]*width\s*:\s*20px[^}]*\}\s*\.dark\s+\.custom-cursor\s*\{[^}]*\}\s*\.custom-cursor\.hovering\s*\{[^}]*\}\s*\.dark\s+\.custom-cursor\.hovering\s*\{[^}]*\}/,
        newCSS
    );

    // ── 2. Remove #sparkles CSS ──
    t = t.replace(/#sparkles\s*\{[^}]*\}\s*/g, '');

    // ── 3. Replace HTML ──
    // SVG cursor format
    t = t.replace(
        /<div class="custom-cursor[^"]*">[\s\S]*?<\/div>/,
        newHTML
    );
    // Remove sparkles canvas
    t = t.replace(/<canvas id="sparkles"><\/canvas>\s*/g, '');

    // ── 4. Replace JS ──
    // Full cursor + particle block (minified)
    t = t.replace(
        /const cursor=document\.querySelector\('\.custom-cursor'\)[\s\S]*?(?:animateSparks\(\);|animateRing\(\);)\s*/,
        ''
    );
    // The hover block (minified)
    t = t.replace(
        /if\s*\(cursor\)\s*\{[\s\S]*?classList\.remove\('hovering'\)\s*\}\s*\)\s*\}\s*\}/,
        newJS
    );
    // Expanded cursor block
    t = t.replace(
        /const cursor = document\.querySelector\('\.custom-cursor'\);[\s\S]*?classList\.remove\('hovering'\);\s*\}\);\s*\}\);\s*\}/,
        newJS
    );

    // ── 5. Theme toggle ──
    // Minified: if(cursor)cursor.style.color=...
    t = t.replace(
        /if\s*\(cursor\)\s*cursor\.style\.color\s*=\s*d\s*\?\s*'rgba\(255,255,255,[\d.]+\)'\s*:\s*'rgba\(0,0,0,[\d.]+\)'/g,
        newToggleCode
    );
    // Expanded: if (cursor) cursor.style.color = isDark...
    t = t.replace(
        /if\s*\(cursor\)\s*cursor\.style\.color\s*=\s*isDark\s*\?\s*'rgba\(255,255,255,[\d.]+\)'\s*:\s*'rgba\(0,0,0,[\d.]+\)'\s*;/g,
        newToggleCodeExpanded
    );

    if (t !== orig) {
        fs.writeFileSync(fp, t, 'utf8');
        console.log('UPDATED: ' + file);
        updated++;
    } else {
        console.log('NO CHANGE: ' + file);
    }
}

console.log('\\nTotal updated: ' + updated);
