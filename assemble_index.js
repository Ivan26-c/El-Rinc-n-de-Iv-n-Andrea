const fs = require('fs');

const currentHtml = fs.readFileSync('C:/Users/utalp/.gemini/antigravity-ide/scratch/nuestra-historia/index.html', 'utf8');
const timelineSection = fs.readFileSync('C:/Users/utalp/.gemini/antigravity-ide/scratch/nuestra-historia/timeline_section.html', 'utf8');

// Find end of </section> for about-us-section
const aboutEndIdx = currentHtml.indexOf('</section>');
// It has section 1 (portada / heroes) and section 2 (about-us)
// Let's find id="tiempo"
const tiempoIdx = currentHtml.indexOf('id="tiempo"');
const endTiempoSectionIdx = currentHtml.indexOf('</section>', tiempoIdx) + '</section>'.length;

const topHalf = currentHtml.slice(0, endTiempoSectionIdx);

const floatingMusicDock = "";

const footerHtml = `
        <!-- =========================================================
             FOOTER ELEGANTE
             ========================================================= -->
        <footer class="romantic-footer">
            <div class="footer-container">
                <p class="footer-quote">"De entre todos los universos posibles, coincidir contigo es mi mayor fortuna."</p>
                <div class="footer-brand">
                    <span>Hecho con todo mi corazón por Iván para Andrea</span>
                    <span class="footer-heart">♥</span>
                </div>
            </div>
        </footer>
`;

const assembledHtml = topHalf + '\n\n' + floatingMusicDock + '\n\n' + timelineSection + '\n\n' + footerHtml + '\n\n    <script src="script.js"></script>\n</body>\n\n</html>\n';

fs.writeFileSync('C:/Users/utalp/.gemini/antigravity-ide/scratch/nuestra-historia/index.html', assembledHtml);
console.log('Successfully re-assembled index.html! Length:', assembledHtml.length);
