const fs = require('fs');
const { execSync } = require('child_process');

console.log('Building capitulo1.html from spreads_data.json...');
execSync('node generate_capitulo1.js', { stdio: 'inherit' });
console.log('Build completed successfully!');
