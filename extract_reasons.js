const fs = require('fs');
const html = fs.readFileSync('capitulo2.html', 'utf8');
const regex = /<span class="reason-num">#(\d+)<\/span>\s*<h4 class="reason-title">(.*?)<\/h4>/g;
let match;
const reasons = [];
while ((match = regex.exec(html)) !== null) {
  const cleanText = match[2]
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]/gu, '')
    .trim();
  reasons.push({ num: parseInt(match[1]), text: cleanText });
}
console.log('Extracted', reasons.length, 'reasons without emojis');
fs.writeFileSync('reasons_clean.json', JSON.stringify(reasons, null, 2), 'utf8');
