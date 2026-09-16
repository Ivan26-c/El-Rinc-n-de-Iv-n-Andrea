const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDir = 'C:\\Users\\utalp\\.gemini\\antigravity-ide\\brain\\705802cd-2d4f-426b-9fdf-611583329ef5';

function capture(name, url, w = 1400, h = 950) {
    const outFile = path.join(targetDir, name);
    const cmd = `"${chrome}" --headless --window-size=${w},${h} --screenshot="${outFile}" "${url}"`;
    try {
        execSync(cmd);
        console.log(`Captured ${name}`);
    } catch (e) {
        console.error(`Error:`, e.message);
    }
}

capture('clue_modal_professional.png', 'http://localhost:8080/capitulo1.html?spread=10', 1400, 1000);



