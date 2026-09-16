const fs = require('fs');

const files = [
    'capitulo1.html',
    'capitulo2.html',
    'capitulo3.html',
    'capitulo5.html',
    'capitulo6.html',
    'capitulo7.html',
    'capitulo9.html',
    'capitulo10.html'
];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const navMatch = content.match(/<div class="[^"]*(?:navigation|bottom-chapter-nav)[^"]*">([\s\S]*?)<\/div>/i);
    console.log(`=== ${f} ===`);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'None');
    if (navMatch) {
        // Strip tags for clean summary
        const clean = navMatch[1].replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/\s+/g, ' ').trim();
        console.log('Nav:', clean);
    } else {
        console.log('Nav: NOT FOUND');
    }
});
