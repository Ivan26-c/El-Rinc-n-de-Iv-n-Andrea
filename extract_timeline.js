const fs = require('fs');
const content = fs.readFileSync('C:/Users/utalp/.gemini/antigravity-ide/brain/66fd5caf-3383-4f42-bf03-f0a07989b7c7/scratch/step168_targetContent.html', 'utf8');
const searchStr = '<section class="chapters-timeline-section"';
const idx = content.indexOf(searchStr);
if (idx !== -1) {
    const timeline = content.slice(idx);
    fs.writeFileSync('C:/Users/utalp/.gemini/antigravity-ide/scratch/nuestra-historia/timeline_section.html', timeline);
    console.log('Successfully saved timeline_section.html, length:', timeline.length);
} else {
    console.log('Not found');
}
