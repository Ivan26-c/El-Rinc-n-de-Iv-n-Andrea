const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDir = 'C:\\Users\\utalp\\.gemini\\antigravity-ide\\brain\\705802cd-2d4f-426b-9fdf-611583329ef5';

[1, 2, 3, 5, 8, 9, 10].forEach(spread => {
    const outFile = path.join(targetDir, `spread_${spread}_clean.png`);
    const cmd = `"${chrome}" --headless --window-size=1536,860 --screenshot="${outFile}" "http://localhost:8080/capitulo1.html?spread=${spread}"`;
    try {
        execSync(cmd);
        console.log(`Captured spread ${spread} to ${outFile}`);
    } catch (e) {
        console.error(`Error capturing spread ${spread}:`, e.message);
    }
});
