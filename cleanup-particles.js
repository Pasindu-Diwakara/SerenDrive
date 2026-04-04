const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const newJS = `const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');let ringX=0,ringY=0,mouseX=0,mouseY=0;if(dot&&ring){(function animateRing(){ringX+=(mouseX-ringX)*0.15;ringY+=(mouseY-ringY)*0.15;ring.style.transform='translate('+(ringX-18)+'px,'+(ringY-18)+'px)';requestAnimationFrame(animateRing)})();document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;dot.style.transform='translate('+(e.clientX-3.5)+'px,'+(e.clientY-3.5)+'px)'});document.querySelectorAll('button, a, .group, input, select, textarea').forEach(el=>{el.addEventListener('mouseenter',()=>{dot.classList.add('hovering');ring.classList.add('hovering')});el.addEventListener('mouseleave',()=>{dot.classList.remove('hovering');ring.classList.remove('hovering')})})}`;

let fixed = 0;

for (const file of files) {
    const fp = path.join(dir, file);
    let t = fs.readFileSync(fp, 'utf8');
    const orig = t;

    // Remove old if(cursor){...} block (handles minified single-line format)
    // This matches the entire if(cursor){...mousemove...forEach...} block
    const oldBlock = /if\s*\(\s*cursor\s*\)\s*\{[\s\S]*?classList\.(add|remove)\('hovering'\)\s*\}\s*\)\s*\}\s*\)\s*\}/;
    if (oldBlock.test(t)) {
        // Check if new JS already exists
        if (!t.includes('animateRing')) {
            t = t.replace(oldBlock, newJS);
        } else {
            // Just remove the old block
            t = t.replace(oldBlock, '');
        }
    }

    // Remove any remaining old cursor/canvas/particle declarations
    // Old: const cursor=...; const canvas=...; let particles=[];
    t = t.replace(/const cursor\s*=\s*document\.querySelector\(\s*'\.custom-cursor'\s*\)[,;]\s*const canvas\s*=\s*document\.getElementById\(\s*'sparkles'\s*\)[,;]\s*const ctx\s*=\s*canvas\.getContext\(\s*'2d'\s*\)[,;]\s*let particles\s*=\s*\[\]\s*;?\s*/g, '');
    
    // Old: function resizeCanvas(){...} window.addEventListener('resize', resizeCanvas); resizeCanvas();
    t = t.replace(/function resizeCanvas\(\)\s*\{[^}]*\}\s*window\.addEventListener\(\s*'resize'\s*,\s*resizeCanvas\s*\)\s*;?\s*resizeCanvas\(\)\s*;?\s*/g, '');
    
    // Old: class Particle{...}
    t = t.replace(/class Particle\s*\{[\s\S]*?\}\s*\}\s*/g, '');
    
    // Old: function animateSparks(){...} animateSparks();
    t = t.replace(/function animateSparks\(\)\s*\{[^}]*\}\s*animateSparks\(\)\s*;?\s*/g, '');

    if (t !== orig) {
        fs.writeFileSync(fp, t, 'utf8');
        console.log('FIXED: ' + file);
        fixed++;
    }
}
console.log('Total fixed: ' + fixed);
