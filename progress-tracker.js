/**
 * progress-tracker.js
 * Sincroniza automáticamente la progresión de capítulos
 * y el Sistema de Pistas Secretas del Candado (1509).
 */
(function () {
    try {
        // Desactivar y limpiar definitivamente la música de fondo
        localStorage.removeItem('romanticMusicPlaying');
        localStorage.removeItem('romanticMusicTime');
        const existingAudio = document.getElementById('romantic-audio');
        if (existingAudio) {
            try { existingAudio.pause(); } catch(e){}
            existingAudio.remove();
        }
        const existingDock = document.getElementById('floating-music-dock');
        if (existingDock) {
            existingDock.remove();
        }

        const path = window.location.pathname;
        const page = path.split('/').pop().toLowerCase();

        const PAGE_TO_CHAPTER = {
            'capitulo1.html': 1,
            'capitulo2.html': 2,
            'capitulo3.html': 3,
            'capitulo5.html': 4,
            'capitulo6.html': 5,
            'capitulo7.html': 6,
            'capitulo9.html': 7,
            'capitulo10.html': 8
        };

        const chId = PAGE_TO_CHAPTER[page];
        if (chId) {
            const STORAGE_COMPLETED = 'nuestra_historia_completed_caps';
            const STORAGE_MAX = 'nuestra_historia_max_unlocked_step';

            let completed = [];
            try {
                completed = JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '[]');
            } catch (e) {
                completed = [];
            }

            if (!completed.includes(chId)) {
                completed.push(chId);
                localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completed));
            }

            // Inicializar bloqueo/desbloqueo del botón de avanzar al siguiente capítulo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => initChapterNavLock(chId));
            } else {
                initChapterNavLock(chId);
            }
        }

        // Sincronizar inventario en index.html si existe
        syncIndexInventory();
    } catch (e) {
        console.error('Progress tracker sync error:', e);
    }

    function autoCheckCluesMaxStep(STORAGE_MAX) {
        let max = parseInt(localStorage.getItem(STORAGE_MAX) || '1', 10);
        if (isNaN(max)) max = 1;
        if (localStorage.getItem('clue_digit_1')) max = Math.max(max, 2);
        if (localStorage.getItem('clue_digit_2')) max = Math.max(max, 3);
        if (localStorage.getItem('clue_digit_3')) max = Math.max(max, 6);
        if (localStorage.getItem('clue_digit_4')) max = Math.max(max, 7);
        localStorage.setItem(STORAGE_MAX, max.toString());
        return max;
    }

    function initChapterNavLock(chId) {
        if (!chId || chId >= 8) return;
        const nextBtn = document.querySelector('.next-chapter');
        if (!nextBtn) return;

        // Inyectar estilos para el botón bloqueado si no existen
        if (!document.getElementById('nav-lock-custom-styles')) {
            const st = document.createElement('style');
            st.id = 'nav-lock-custom-styles';
            st.textContent = `
                .nav-btn-action.nav-btn-locked {
                    opacity: 0.65 !important;
                    cursor: not-allowed !important;
                    background: rgba(30, 15, 50, 0.5) !important;
                    border: 1.5px dashed rgba(255, 209, 102, 0.45) !important;
                    color: rgba(255, 255, 255, 0.7) !important;
                    box-shadow: none !important;
                    transform: none !important;
                }
                .nav-btn-action.nav-btn-revealed-glow {
                    animation: navUnlockGlow 1.2s ease-out;
                }
                @keyframes navUnlockGlow {
                    0% { transform: scale(0.96); box-shadow: 0 0 0 rgba(255, 209, 102, 0); }
                    50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(255, 209, 102, 0.85); }
                    100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 117, 143, 0.4); }
                }
            `;
            document.head.appendChild(st);
        }

        const nextCh = chId + 1;
        const STORAGE_MAX = 'nuestra_historia_max_unlocked_step';
        const currentMax = autoCheckCluesMaxStep(STORAGE_MAX);

        if (nextCh > currentMax) {
            // BLOQUEADO: cuando es la primera vez y no se ha desbloqueado
            const realHref = nextBtn.getAttribute('href');
            if (realHref && realHref !== 'javascript:void(0)') {
                nextBtn.setAttribute('data-real-href', realHref);
            }
            nextBtn.setAttribute('href', 'javascript:void(0)');
            nextBtn.setAttribute('data-locked', 'true');
            nextBtn.classList.add('nav-btn-locked');

            nextBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.3" style="margin-right: 6px; vertical-align: middle;">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Avanzar al siguiente capítulo (???)</span>
            `;

            nextBtn.onclick = function (e) {
                if (nextBtn.getAttribute('data-locked') === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                    showNavLockToast('✦ Capítulo Bloqueado ✦ Completa este capítulo para desbloquear el siguiente... ❤️');
                }
            };
        } else {
            // YA DESBLOQUEADO
            nextBtn.classList.remove('nav-btn-locked');
            nextBtn.removeAttribute('data-locked');
            nextBtn.innerHTML = `
                <span>Avanzar al siguiente capítulo</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; vertical-align: middle;">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            `;
        }
    }

    function showNavLockToast(msg) {
        const existing = document.getElementById('nav-lock-toast-bubble');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'nav-lock-toast-bubble';
        toast.style.cssText = `
            position: fixed;
            bottom: 85px;
            left: 50%;
            transform: translateX(-50%) translate3d(0, 10px, 0);
            background: rgba(18, 7, 32, 0.96);
            border: 1.5px solid rgba(255, 209, 102, 0.75);
            border-radius: 30px;
            padding: 12px 26px;
            color: #ffd166;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.8px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 209, 102, 0.2);
            z-index: 999999;
            text-align: center;
            opacity: 0;
            transition: all 0.25s ease-out;
            pointer-events: none;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translate3d(0, 0, 0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translate3d(0, 10px, 0)';
            setTimeout(() => toast.remove(), 250);
        }, 3200);
    }

    function syncIndexInventory() {
        const inv = document.getElementById('clue-inventory');
        if (!inv) return;

        const d1 = localStorage.getItem('clue_digit_1');
        const d2 = localStorage.getItem('clue_digit_2');
        const d3 = localStorage.getItem('clue_digit_3');
        const d4 = localStorage.getItem('clue_digit_4');

        if (d1 || d2 || d3 || d4) {
            inv.classList.remove('hidden');
        }

        const s1 = document.getElementById('slot-1');
        const s2 = document.getElementById('slot-2');
        const s3 = document.getElementById('slot-3');
        const s4 = document.getElementById('slot-4');

        if (s1 && d1) { s1.textContent = d1; s1.classList.add('found'); }
        if (s2 && d2) { s2.textContent = d2; s2.classList.add('found'); }
        if (s3 && d3) { s3.textContent = d3; s3.classList.add('found'); }
        if (s4 && d4) { s4.textContent = d4; s4.classList.add('found'); }
    }
})();

// =========================================================
// SISTEMA GLOBAL DE DESBLOQUEO DE CAPÍTULOS
// =========================================================
window.unlockNextChapter = function (targetChapterId) {
    try {
        const STORAGE_MAX = 'nuestra_historia_max_unlocked_step';
        let currentMax = parseInt(localStorage.getItem(STORAGE_MAX) || '1', 10);
        if (isNaN(currentMax)) currentMax = 1;
        const newMax = Math.max(currentMax, targetChapterId);
        localStorage.setItem(STORAGE_MAX, newMax.toString());

        const nextBtn = document.querySelector('.next-chapter');
        if (nextBtn && nextBtn.getAttribute('data-locked') === 'true') {
            const realHref = nextBtn.getAttribute('data-real-href');
            if (realHref) nextBtn.setAttribute('href', realHref);
            nextBtn.removeAttribute('data-locked');
            nextBtn.classList.remove('nav-btn-locked');
            nextBtn.classList.add('nav-btn-revealed-glow');

            nextBtn.innerHTML = `
                <span>Avanzar al siguiente capítulo</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; vertical-align: middle;">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            `;

            // Toast de felicitación por desbloqueo
            const existing = document.getElementById('nav-lock-toast-bubble');
            if (existing) existing.remove();
            const toast = document.createElement('div');
            toast.id = 'nav-lock-toast-bubble';
            toast.style.cssText = `
                position: fixed;
                bottom: 85px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #1f0a35, #11041d);
                border: 1.5px solid #06d6a0;
                border-radius: 30px;
                padding: 12px 26px;
                color: #06d6a0;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.8rem;
                font-weight: 700;
                letter-spacing: 0.8px;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(6, 214, 160, 0.25);
                z-index: 999999;
                text-align: center;
                pointer-events: none;
                animation: navToastFadeIn 0.25s ease-out;
            `;
            toast.textContent = '✦ ¡Siguiente Capítulo Desbloqueado! ✦ Ya puedes avanzar ✨';
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.25s ease';
                setTimeout(() => toast.remove(), 250);
            }, 3000);
        }
    } catch (e) {
        console.error('Error unlocking next chapter:', e);
    }
};

// =========================================================
// SISTEMA GLOBAL DE DESBLOQUEO DE PISTAS (DÍGITOS 1, 5, 0, 9)
// =========================================================
window.unlockClueDigit = function (slotNumber, digitChar, sourceTitle, message) {
    const key = `clue_digit_${slotNumber}`;
    const alreadyUnlocked = localStorage.getItem(key) === String(digitChar);

    // Guardar en localStorage
    localStorage.setItem(key, String(digitChar));

    // Desbloquear capítulo siguiente automáticamente
    if (typeof window.unlockNextChapter === 'function') {
        if (slotNumber === 1) window.unlockNextChapter(2);
        if (slotNumber === 2) window.unlockNextChapter(3);
        if (slotNumber === 3) window.unlockNextChapter(6);
        if (slotNumber === 4) window.unlockNextChapter(7);
    }

    // Compatibilidad con andreaFoundClues
    try {
        let list = JSON.parse(localStorage.getItem('andreaFoundClues') || '[]');
        const cKey = `clue-${slotNumber}`;
        if (!list.includes(cKey)) {
            list.push(cKey);
            localStorage.setItem('andreaFoundClues', JSON.stringify(list));
        }
    } catch (e) { }

    // Sonido celestial de campanas
    playClueChime();

    // Mostrar modal con la pista descubierta
    showClueToast(slotNumber, digitChar, sourceTitle, message);
};

window.getUnlockedClues = function () {
    return {
        1: localStorage.getItem('clue_digit_1'),
        2: localStorage.getItem('clue_digit_2'),
        3: localStorage.getItem('clue_digit_3'),
        4: localStorage.getItem('clue_digit_4')
    };
};

function playClueChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Notas celestiales: C6, E6, G6, B6
        const freqs = [1046.50, 1318.51, 1567.98, 1975.53];
        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.65);
        });
    } catch (e) { }
}

function showClueToast(slotNumber, digitChar, sourceTitle, message) {
    // Evitar modales duplicados en pantalla
    const existing = document.getElementById('clue-unlocked-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'clue-unlocked-modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(8, 4, 16, 0.92);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: clueFadeIn 0.22s ease-out forwards;
        font-family: 'Inter', sans-serif;
        will-change: opacity;
    `;

    overlay.innerHTML = `
        <style>
            @keyframes clueFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes cluePop { 
                0% { transform: scale(0.92) translate3d(0, 10px, 0); opacity: 0; } 
                100% { transform: scale(1) translate3d(0, 0, 0); opacity: 1; } 
            }
        </style>
        <div id="clue-modal-card-box" style="
            background: linear-gradient(145deg, #1c0b30, #11041d);
            border: 1.5px solid rgba(255, 209, 102, 0.7);
            border-radius: 24px;
            padding: 34px 28px;
            max-width: 440px;
            width: 100%;
            text-align: center;
            color: #ffffff;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 209, 102, 0.15);
            animation: cluePop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            position: relative;
            will-change: transform, opacity;
        ">
            <!-- Icono Vectorial Elegante SVG -->
            <div style="
                width: 54px; 
                height: 54px; 
                margin: 0 auto 14px auto; 
                background: rgba(255, 209, 102, 0.12); 
                border: 1.5px solid rgba(255, 209, 102, 0.45); 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: #ffd166;
            ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="7.5" cy="15.5" r="5.5"></circle>
                    <path d="m21 2-9.6 9.6"></path>
                    <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
                </svg>
            </div>

            <div style="
                font-family: 'Montserrat', sans-serif; 
                font-size: 0.72rem; 
                font-weight: 800; 
                letter-spacing: 2px; 
                color: #ffd166; 
                text-transform: uppercase; 
                margin-bottom: 6px;
            ">
                ${sourceTitle || 'CLAVE DESCUBIERTA'}
            </div>

            <h3 style="
                font-family: 'Playfair Display', serif; 
                font-size: 1.55rem; 
                color: #ffffff; 
                margin: 0 0 16px 0;
                font-weight: 700;
            ">
                Dígito #${slotNumber} Desbloqueado
            </h3>
            
            <div style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 88px;
                background: linear-gradient(145deg, #27103a, #130620);
                border: 2px solid #ffd166;
                border-radius: 18px;
                font-family: 'Montserrat', sans-serif;
                font-size: 3rem;
                font-weight: 900;
                color: #ffd166;
                margin: 0 auto 18px auto;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
            ">
                ${digitChar}
            </div>

            <p style="
                font-size: 0.92rem; 
                color: #e2d8f0; 
                line-height: 1.6; 
                margin: 0 0 24px 0;
            ">
                ${message}
            </p>

            <button id="clue-modal-close-btn" style="
                background: linear-gradient(135deg, #ffd166 0%, #ff758f 100%);
                color: #0b0314;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.85rem;
                font-weight: 800;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                border: none;
                padding: 13px 34px;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
                transition: transform 0.15s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            " onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='none'">
                <span>Guardar en mi Memoria</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#clue-modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => overlay.remove();
    }

    // Permitir cerrar haciendo clic en el fondo oscuro exterior
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // Permitir cerrar presionando Escape
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            window.removeEventListener('keydown', escHandler);
        }
    };
    window.addEventListener('keydown', escHandler);
}
