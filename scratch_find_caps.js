const fs = require('fs');

const files = [
    'index.html',
    'capitulo1.html',
    'capitulo2.html',
    'capitulo3.html',
    'capitulo5.html',
    'capitulo6.html',
    'capitulo7.html',
    'capitulo9.html',
    'capitulo10.html',
    'script.js',
    'progress-tracker.js'
];

files.forEach(f => {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, idx) => {
        if (/cap[ií]tulo/i.test(l)) {
            console.log(`${f}:${idx + 1}: ${l.trim().slice(0, 100)}`);
        }
    });
});
