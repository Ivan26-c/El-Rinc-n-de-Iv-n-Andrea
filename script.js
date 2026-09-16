/**
 * NUESTRA HISTORIA DE AMOR - ANDREA & IVÁN
 * Motor JavaScript Unificado SPA (Sonidos Web Audio API, Minijuego RPG, Galería, Cartas y Secreto)
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 0. SÍNTESIS DE AUDIO REALISTA (WEB AUDIO API)
    // Sin dependencias de archivos externos para latencia 0 y confiabilidad 100%
    // =========================================================
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Sonido de volteo de carta / hoja de papel (Card Flip)
    function playFlipSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const bufferSize = ctx.sampleRate * 0.08; // 80ms de ráfaga
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1400, ctx.currentTime);
            filter.Q.setValueAtTime(2.5, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.07);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start();
        } catch (e) {
            console.log('Audio API error:', e);
        }
    }

    // Sonido de campanita celestial (Acierto en juego, sueño tachado, pista encontrada)
    function playChimeSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde C mayor brillante
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + idx * 0.06);
                osc.stop(ctx.currentTime + idx * 0.06 + 0.45);
            });
        } catch (e) { }
    }

    // Sonido simpático para respuestas incorrectas (Boop tierno)
    function playErrorSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.2);

            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) { }
    }

    // Fanfarria romántica de victoria y celebración
    function playFanfareSound() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const chord = [440, 554.37, 659.25, 880];
            chord.forEach(freq => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime);

                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                osc.stop(ctx.currentTime + 1.25);
            });
        } catch (e) { }
    }

    window.playFlipSound = playFlipSound;
    window.playChimeSound = playChimeSound;

    // =========================================================
    // 1. APERTURA RÁPIDA 1x1 DEL COLLAGE DE 7 PIEZAS (PORTADA)
    // =========================================================
    const introCurtain = document.getElementById('intro-curtain');
    const piece4 = document.getElementById('piece-4');
    const piece7 = document.getElementById('piece-7');
    const piece5 = document.getElementById('piece-5');
    const piece6 = document.getElementById('piece-6');
    const piece3 = document.getElementById('piece-3');
    const piece2 = document.getElementById('piece-2');
    const piece1 = document.getElementById('piece-1');

    const unlockTrigger = document.getElementById('unlock-trigger');
    const lockedContent = document.getElementById('locked-content');
    const romanticAudio = document.getElementById('romantic-audio');

    // Enforce starting at top of cover on reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    sessionStorage.removeItem('story_unlocked');
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
    }
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });

    // Controles en la barra flotante (dock)
    const dockPlayBtn = document.getElementById('dock-play-btn');
    const dockEqualizer = document.getElementById('dock-equalizer');
    const dockProgressBar = document.getElementById('dock-progress-bar');
    const dockProgressContainer = document.getElementById('dock-progress-container');

    // Controles en la cabecera original (si existen)
    const musicPlayBtn = document.getElementById('music-play-btn');
    const musicEqualizer = document.getElementById('music-equalizer');
    const musicProgressBar = document.getElementById('music-progress-bar');
    const musicProgressContainer = document.getElementById('music-progress-container');
    const musicStatusText = document.getElementById('music-status-text');

    // Elemento vinyl en la tarjeta de Spotify
    const spotifyVinylDisc = document.getElementById('spotify-vinyl-disc');

    function syncPlayState(isPlaying) {
        // 1. Botón flotante dock
        if (dockPlayBtn) {
            const playIcon = dockPlayBtn.querySelector('.dock-icon-play');
            const pauseIcon = dockPlayBtn.querySelector('.dock-icon-pause');
            if (isPlaying) {
                if (playIcon) playIcon.classList.add('hidden');
                if (pauseIcon) pauseIcon.classList.remove('hidden');
                if (dockEqualizer) dockEqualizer.classList.add('playing');
            } else {
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
                if (dockEqualizer) dockEqualizer.classList.remove('playing');
            }
        }

        // 2. Botón de cabecera original
        if (musicPlayBtn) {
            const playIcon = musicPlayBtn.querySelector('.play-icon');
            const pauseIcon = musicPlayBtn.querySelector('.pause-icon');
            if (isPlaying) {
                if (playIcon) playIcon.classList.add('hidden');
                if (pauseIcon) pauseIcon.classList.remove('hidden');
                if (musicEqualizer) musicEqualizer.classList.add('playing');
                if (musicStatusText) musicStatusText.textContent = 'Sonando para ti ♫';
            } else {
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
                if (musicEqualizer) musicEqualizer.classList.remove('playing');
                if (musicStatusText) musicStatusText.textContent = 'En pausa';
            }
        }

        // 3. Disco de Spotify rotatorio
        if (spotifyVinylDisc) {
            if (isPlaying) {
                spotifyVinylDisc.classList.add('spinning');
            } else {
                spotifyVinylDisc.classList.remove('spinning');
            }
        }
    }

    function toggleGlobalAudio() {
        if (!romanticAudio) return;
        getAudioContext();
        if (romanticAudio.paused) {
            romanticAudio.play().then(() => syncPlayState(true)).catch(e => console.log('Autoplay:', e));
        } else {
            romanticAudio.pause();
            syncPlayState(false);
        }
    }

    function unlockPage(instant = false) {
        if (!lockedContent) return;
        getAudioContext();
        lockedContent.classList.remove('hidden');

        if (unlockTrigger) {
            unlockTrigger.style.opacity = '0';
            unlockTrigger.style.pointerEvents = 'none';
            setTimeout(() => { if (unlockTrigger) unlockTrigger.style.display = 'none'; }, 300);
        }

        if (!instant) {
            lockedContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // SIEMPRE ejecutar la animación de apertura de 7 fotos al recargar o entrar a la página
    if (introCurtain) {
        introCurtain.style.display = 'block';
        introCurtain.classList.remove('hide');
        window.scrollTo(0, 0);

        const allPieces = [piece1, piece2, piece3, piece4, piece5, piece6, piece7];
        allPieces.forEach(p => { if (p) p.classList.remove('peel-off'); });

        if (piece4) {
            setTimeout(() => { if (piece4) piece4.classList.add('peel-off'); }, 250);
            setTimeout(() => { if (piece7) piece7.classList.add('peel-off'); }, 550);
            setTimeout(() => { if (piece5) piece5.classList.add('peel-off'); }, 850);
            setTimeout(() => { if (piece6) piece6.classList.add('peel-off'); }, 1150);
            setTimeout(() => { if (piece3) piece3.classList.add('peel-off'); }, 1450);
            setTimeout(() => { if (piece2) piece2.classList.add('peel-off'); }, 1750);
            setTimeout(() => { if (piece1) piece1.classList.add('peel-off'); }, 2050);

            setTimeout(() => {
                introCurtain.classList.add('hide');
                setTimeout(() => { introCurtain.style.display = 'none'; }, 600);
            }, 2600);

            introCurtain.addEventListener('click', () => {
                introCurtain.classList.add('hide');
                setTimeout(() => { introCurtain.style.display = 'none'; }, 300);
            });
        }
    }

    // Eventos de desbloqueo: clic en botón, scroll de rueda, o gesto táctil
    if (unlockTrigger) {
        unlockTrigger.addEventListener('click', () => unlockPage(false));
    }

    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 15 && lockedContent && lockedContent.classList.contains('hidden')) {
            unlockPage(false);
        }
    }, { passive: true });

    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) touchStartY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0] && (touchStartY - e.touches[0].clientY > 40)) {
            if (lockedContent && lockedContent.classList.contains('hidden')) {
                unlockPage(false);
            }
        }
    }, { passive: true });

    if (dockPlayBtn) dockPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleGlobalAudio(); });
    if (musicPlayBtn) musicPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleGlobalAudio(); });

    // Sincronización de barras de progreso
    if (romanticAudio) {
        romanticAudio.addEventListener('timeupdate', () => {
            if (romanticAudio.duration) {
                const pct = (romanticAudio.currentTime / romanticAudio.duration) * 100;
                if (dockProgressBar) dockProgressBar.style.width = pct + '%';
                if (musicProgressBar) musicProgressBar.style.width = pct + '%';
            }
        });

        romanticAudio.addEventListener('play', () => syncPlayState(true));
        romanticAudio.addEventListener('pause', () => syncPlayState(false));
    }

    function handleSeek(e, container) {
        if (!romanticAudio || !romanticAudio.duration) return;
        const rect = container.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        romanticAudio.currentTime = clickRatio * romanticAudio.duration;
    }

    if (dockProgressContainer) {
        dockProgressContainer.addEventListener('click', (e) => handleSeek(e, dockProgressContainer));
    }
    if (musicProgressContainer) {
        musicProgressContainer.addEventListener('click', (e) => handleSeek(e, musicProgressContainer));
    }

    // =========================================================
    // 3. FONDO DE CORAZONES FLOTANTES (CANVAS)
    // =========================================================
    const heartsCanvas = document.getElementById('hearts-canvas');
    if (heartsCanvas) {
        const ctx = heartsCanvas.getContext('2d');
        let width, height;
        let hearts = [];

        function resizeCanvas() {
            width = heartsCanvas.width = window.innerWidth;
            height = heartsCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class FloatingHeart {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 200;
                this.size = Math.random() * 3 + 1.5;
                this.speedY = Math.random() * 0.9 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.45 + 0.15;
                this.color = Math.random() > 0.5 ? '#c77dff' : '#e0aaff';
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                if (this.y < -30) this.reset();
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                const h = this.size * 0.3;
                ctx.moveTo(this.x, this.y + h);
                ctx.bezierCurveTo(this.x, this.y, this.x - this.size, this.y, this.x - this.size, this.y + h);
                ctx.bezierCurveTo(this.x - this.size, this.y + (this.size + h) / 2, this.x, this.y + (this.size + h), this.x, this.y + this.size * 1.5);
                ctx.bezierCurveTo(this.x, this.y + (this.size + h), this.x + this.size, this.y + (this.size + h) / 2, this.x + this.size, this.y + h);
                ctx.bezierCurveTo(this.x + this.size, this.y, this.x, this.y, this.x, this.y + h);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < 35; i++) hearts.push(new FloatingHeart());

        function animateHearts() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < hearts.length; i++) {
                hearts[i].update();
                hearts[i].draw();
            }
            requestAnimationFrame(animateHearts);
        }
        animateHearts();
    }

    // =========================================================
    // 4. RADAR: DESDE QUE NOS CONOCIMOS (26 Feb 2026, 22:54)
    // =========================================================
    const metDate = new Date(2026, 1, 26, 22, 54, 0);
    const radarDaysEl = document.getElementById('radar-days');
    const radarHoursEl = document.getElementById('radar-hours');
    const radarMinutesEl = document.getElementById('radar-minutes');
    const radarSecondsEl = document.getElementById('radar-seconds');

    function updateMetCounter() {
        const now = new Date();
        const diffMs = now - metDate;
        if (diffMs < 0) return;

        const totalSecs = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSecs / 86400);
        const hours = Math.floor((totalSecs % 86400) / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = totalSecs % 60;

        if (radarDaysEl) radarDaysEl.textContent = String(days).padStart(2, '0');
        if (radarHoursEl) radarHoursEl.textContent = String(hours).padStart(2, '0');
        if (radarMinutesEl) radarMinutesEl.textContent = String(minutes).padStart(2, '0');
        if (radarSecondsEl) radarSecondsEl.textContent = String(seconds).padStart(2, '0');
    }
    updateMetCounter();
    setInterval(updateMetCounter, 1000);

    // =========================================================
    // 5. CUADRO MISTERIOSO (???) Y CONTADOR OFICIAL DE NOVIOS
    // Estado inicial estricto "???", sin pistas de tiempo ni novios.
    // Solo se revela y empieza a contar tras decir ¡SÍ! en el capítulo secreto.
    // =========================================================
    const mysteryCard = document.getElementById('mystery-card');
    const mysteryCardTitle = document.getElementById('mystery-card-title');
    const mysteryCardSubtitle = document.getElementById('mystery-card-subtitle');
    const mysteryDisplayWrap = document.getElementById('mystery-display-wrap');
    const officialTimeGrid = document.getElementById('official-time-grid');
    const mysteryFooterQuote = document.getElementById('mystery-footer-quote');

    const noviosDaysEl = document.getElementById('novios-days');
    const noviosHoursEl = document.getElementById('novios-hours');
    const noviosMinutesEl = document.getElementById('novios-minutes');
    const noviosSecondsEl = document.getElementById('novios-seconds');

    let noviosTimerInterval = null;

    // Función para reiniciar a 0 y ocultar el contador al estado de misterio
    function resetOfficialNoviosToLocked() {
        if (noviosTimerInterval) {
            clearInterval(noviosTimerInterval);
            noviosTimerInterval = null;
        }
        if (mysteryCard) mysteryCard.classList.remove('unlocked-official');
        if (mysteryCardTitle) mysteryCardTitle.textContent = '???';
        if (mysteryCardSubtitle) mysteryCardSubtitle.textContent = '???';
        if (mysteryDisplayWrap) mysteryDisplayWrap.classList.remove('hidden');
        if (officialTimeGrid) officialTimeGrid.classList.add('hidden');
        if (mysteryFooterQuote) mysteryFooterQuote.textContent = '???';

        if (noviosDaysEl) noviosDaysEl.textContent = '00';
        if (noviosHoursEl) noviosHoursEl.textContent = '00';
        if (noviosMinutesEl) noviosMinutesEl.textContent = '00';
        if (noviosSecondsEl) noviosSecondsEl.textContent = '00';
    }

    function checkOfficialNoviosStatus() {
        if (window.location.search.includes('reset=true')) {
            localStorage.removeItem('noviosAcceptedDate');
            localStorage.removeItem('andrea_dijo_si');
            localStorage.removeItem('andrea_fecha_compromiso');
        }
        let savedNoviosDate = localStorage.getItem('noviosAcceptedDate');
        if (!savedNoviosDate && localStorage.getItem('andrea_dijo_si') === 'true') {
            savedNoviosDate = localStorage.getItem('andrea_fecha_compromiso') || new Date().toISOString();
            localStorage.setItem('noviosAcceptedDate', savedNoviosDate);
        }
        if (!savedNoviosDate) {
            resetOfficialNoviosToLocked();
            return; // Se mantiene en puro "???"
        }

        const acceptedDate = new Date(savedNoviosDate);

        // Desbloquear visualmente la tarjeta de forma hermosa
        if (mysteryCard) mysteryCard.classList.add('unlocked-official');
        if (mysteryCardTitle) mysteryCardTitle.textContent = 'OFICIALMENTE NOVIOS';
        if (mysteryCardSubtitle) mysteryCardSubtitle.textContent = `Desde el momento exacto en que dijiste SÍ`;
        if (mysteryDisplayWrap) mysteryDisplayWrap.classList.add('hidden');
        if (officialTimeGrid) officialTimeGrid.classList.remove('hidden');
        if (mysteryFooterQuote) mysteryFooterQuote.textContent = '"Y de aquí hasta la eternidad juntos, mi amor."';

        function updateNoviosCounter() {
            const now = new Date();
            const diffMs = now - acceptedDate;
            if (diffMs < 0) {
                if (noviosDaysEl) noviosDaysEl.textContent = '00';
                if (noviosHoursEl) noviosHoursEl.textContent = '00';
                if (noviosMinutesEl) noviosMinutesEl.textContent = '00';
                if (noviosSecondsEl) noviosSecondsEl.textContent = '00';
                return;
            }

            const totalSecs = Math.floor(diffMs / 1000);
            const days = Math.floor(totalSecs / 86400);
            const hours = Math.floor((totalSecs % 86400) / 3600);
            const minutes = Math.floor((totalSecs % 3600) / 60);
            const seconds = totalSecs % 60;

            if (noviosDaysEl) noviosDaysEl.textContent = String(days).padStart(2, '0');
            if (noviosHoursEl) noviosHoursEl.textContent = String(hours).padStart(2, '0');
            if (noviosMinutesEl) noviosMinutesEl.textContent = String(minutes).padStart(2, '0');
            if (noviosSecondsEl) noviosSecondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateNoviosCounter();
        if (noviosTimerInterval) clearInterval(noviosTimerInterval);
        noviosTimerInterval = setInterval(updateNoviosCounter, 1000);
    }
    checkOfficialNoviosStatus();
    window.addEventListener('storage', (e) => {
        if (!e || !e.key || e.key === 'noviosAcceptedDate' || e.key === 'andrea_dijo_si' || e.key === 'andrea_fecha_compromiso') {
            checkOfficialNoviosStatus();
        }
    });
    window.addEventListener('focus', checkOfficialNoviosStatus);
    window.addEventListener('pageshow', checkOfficialNoviosStatus);

    // =========================================================
    // 6. CAPÍTULO I: LA GRAN CARTA (3 HOJAS INTERACTIVAS)
    // =========================================================
    window.switchLetterPage = function (pageNum) {
        playFlipSound();

        // 1. Activar pestaña
        document.querySelectorAll('.letter-tab').forEach(tab => {
            const tabNum = parseInt(tab.getAttribute('data-page'), 10);
            if (tabNum === pageNum) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // 2. Cambiar hoja visible
        document.querySelectorAll('.letter-sheet-content').forEach(sheet => {
            sheet.classList.remove('active');
        });

        const targetSheet = document.getElementById(`letter-page-${pageNum}`);
        if (targetSheet) {
            targetSheet.classList.add('active');
            targetSheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    document.querySelectorAll('.letter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const p = parseInt(tab.getAttribute('data-page'), 10);
            if (p) window.switchLetterPage(p);
        });
    });

    // =========================================================
    // 7. CAPÍTULO II: RAZONES POR LAS QUE TE AMO (20 TARJETAS FLIP)
    // =========================================================
    const RAZONES_DATA = [
        { id: 1, icon: "✨", text: "Por tu risa tan contagiosa que tiene el poder de alegrarme hasta el día más gris." },
        { id: 2, icon: "🎙️", text: "Por el tono de tu voz al hablarme en llamada; me da una paz que no encuentro en nadie más." },
        { id: 3, icon: "🥰", text: "Por la ternura con la que te preocupas por mí y estás siempre pendiente de cómo me siento." },
        { id: 4, icon: "🎮", text: "Por todas las partidas jugando juntos y las anécdotas que solo tú y yo entendemos." },
        { id: 5, icon: "🌙", text: "Por esas noches en vela hablando de todo y de nada, donde el tiempo simplemente vuela." },
        { id: 6, icon: "🎨", text: "Por tus dibujos, tus detalles espontáneos y esa creatividad tan tuya que me enamora." },
        { id: 7, icon: "💬", text: "Por la confianza absoluta que puedo tener contigo; contigo puedo ser 100% yo." },
        { id: 8, icon: "❤️", text: "Por ese primer «te quiero» que me dijiste y que jamás voy a olvidar en mi vida." },
        { id: 9, icon: "☀️", text: "Porque eres el primer pensamiento lindo que tengo al abrir los ojos por la mañana." },
        { id: 10, icon: "🥺", text: "Por tu forma tan linda de hacer berrinche o ponérteme consentida; me derrites por completo." },
        { id: 11, icon: "🫂", text: "Porque a pesar de cualquier distancia, tu abrazo se siente real en mi corazón cada día." },
        { id: 12, icon: "🌟", text: "Por tu inteligencia, tu madurez y la persona tan maravillosa que eres por dentro y por fuera." },
        { id: 13, icon: "💌", text: "Por cada mensaje tuyo que me saca una sonrisa boba frente a la pantalla." },
        { id: 14, icon: "🎶", text: "Por compartir tu música favorita conmigo y hacer que cada canción me recuerde a ti." },
        { id: 15, icon: "🔐", text: "Por ser mi refugio seguro y mi lugar favorito en el mundo entero." },
        { id: 16, icon: "💫", text: "Porque me inspiras a ser una mejor versión de mí mismo todos los días." },
        { id: 17, icon: "👑", text: "Por tus ojitos hermosos y esa mirada que me desarma con solo una foto." },
        { id: 18, icon: "🌹", text: "Por tu sinceridad y por decirme siempre lo que sientes con el corazón." },
        { id: 19, icon: "✈️", text: "Por todos los sueños que estamos planeando y que muy pronto vamos a cumplir juntos." },
        { id: 20, icon: "💍", text: "Porque simplemente no existe nadie más en este mundo con quien quiera estar que no seas tú." }
    ];

    const reasonsGrid = document.getElementById('reasons-grid');
    if (reasonsGrid) {
        reasonsGrid.innerHTML = '';
        RAZONES_DATA.forEach(item => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.innerHTML = `
                <div class="reason-inner">
                    <div class="reason-front">
                        <span class="reason-card-num">RAZÓN #${String(item.id).padStart(2, '0')}</span>
                        <span class="reason-front-icon">${item.icon}</span>
                        <span class="reason-front-hint">Toca para descubrir</span>
                    </div>
                    <div class="reason-back">
                        <p class="reason-text">"${item.text}"</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                playFlipSound();
                card.classList.toggle('is-flipped');
            });
            reasonsGrid.appendChild(card);
        });
    }

    // =========================================================
    // 8. CAPÍTULO III: GALERÍA DE RECUERDOS (SUBIDA Y PERSISTENCIA)
    // =========================================================
    const btnOpenMemoryModal = document.getElementById('btn-open-memory-modal');
    const memoryModalOverlay = document.getElementById('memory-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const btnCancelMemory = document.getElementById('btn-cancel-memory');
    const addMemoryForm = document.getElementById('add-memory-form');
    const memoryFileInput = document.getElementById('memory-file-input');
    const dropPrompt = document.getElementById('drop-prompt');
    const memoryPreviewBox = document.getElementById('memory-preview-box');
    const memoryPreviewImg = document.getElementById('memory-preview-img');
    const previewFilename = document.getElementById('preview-filename');
    const customPolaroidsContainer = document.getElementById('custom-polaroids-container');
    const galleryCounterBadge = document.getElementById('gallery-counter-badge');

    let currentBase64Image = null;

    function updateGalleryCounter() {
        const defaultCount = 4;
        const customMemories = JSON.parse(localStorage.getItem('andreaCustomMemories') || '[]');
        const total = defaultCount + customMemories.length;
        if (galleryCounterBadge) {
            galleryCounterBadge.textContent = `${total} Recuerdos guardados`;
        }
    }

    function renderCustomMemories() {
        if (!customPolaroidsContainer) return;
        customPolaroidsContainer.innerHTML = '';
        const customMemories = JSON.parse(localStorage.getItem('andreaCustomMemories') || '[]');

        customMemories.forEach((mem, idx) => {
            const rot = (idx % 2 === 0) ? 'rotate-pos-2' : 'rotate-neg-2';
            const article = document.createElement('article');
            article.className = `polaroid-card ${rot}`;
            article.innerHTML = `
                <div class="polaroid-pin"></div>
                <div class="polaroid-photo-frame">
                    <img src="${mem.imageSrc}" alt="${mem.title}" loading="lazy">
                </div>
                <div class="polaroid-caption-area">
                    <span class="polaroid-date">${mem.date || 'Momento Especial'}</span>
                    <h4 class="polaroid-title">${mem.title}</h4>
                    <p class="polaroid-note">${mem.note}</p>
                </div>
            `;
            customPolaroidsContainer.appendChild(article);
        });
        updateGalleryCounter();
    }
    renderCustomMemories();

    if (btnOpenMemoryModal && memoryModalOverlay) {
        btnOpenMemoryModal.addEventListener('click', () => {
            memoryModalOverlay.classList.remove('hidden');
        });
    }

    function closeMemoryModal() {
        if (memoryModalOverlay) memoryModalOverlay.classList.add('hidden');
        if (addMemoryForm) addMemoryForm.reset();
        currentBase64Image = null;
        if (memoryPreviewBox) memoryPreviewBox.classList.add('hidden');
        if (dropPrompt) dropPrompt.classList.remove('hidden');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeMemoryModal);
    if (btnCancelMemory) btnCancelMemory.addEventListener('click', closeMemoryModal);

    if (memoryFileInput) {
        memoryFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                currentBase64Image = event.target.result;
                if (memoryPreviewImg) memoryPreviewImg.src = currentBase64Image;
                if (previewFilename) previewFilename.textContent = file.name;
                if (dropPrompt) dropPrompt.classList.add('hidden');
                if (memoryPreviewBox) memoryPreviewBox.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        });
    }

    if (addMemoryForm) {
        addMemoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentBase64Image) {
                alert('Por favor selecciona una foto para este recuerdo.');
                return;
            }

            const title = document.getElementById('memory-title-input').value.trim();
            const date = document.getElementById('memory-date-input').value.trim();
            const note = document.getElementById('memory-note-input').value.trim();

            const newMemory = {
                id: Date.now(),
                title,
                date,
                note,
                imageSrc: currentBase64Image
            };

            const existing = JSON.parse(localStorage.getItem('andreaCustomMemories') || '[]');
            existing.unshift(newMemory);
            localStorage.setItem('andreaCustomMemories', JSON.stringify(existing));

            playChimeSound();
            renderCustomMemories();
            closeMemoryModal();
        });
    }

    // =========================================================
    // 9. CAPÍTULO IV: CARTAS PARA CUANDO... (CON REPRODUCTOR DE VOZ)
    // =========================================================
    const CARTAS_DATA = {
        1: {
            title: "Carta para cuando estés triste",
            badge: "Carta 01 · Cuando estés triste",
            audioSrc: "assets/audios/carta-1.mp3",
            body: `
                <p>Amor,</p>
                <p>Si estás leyendo esto, probablemente hoy no estés teniendo uno de esos días bonitos. Y aunque me gustaría poder estar ahí contigo para abrazarte y hacerte olvidar todo por un rato, por ahora solo puedo dejarte estas palabras.</p>
                <p>No tienes que estar bien todo el tiempo, ¿sí? Puedes tener días malos, puedes sentirte cansada, puedes querer alejarte un poquito de todo. No voy a pensar menos de ti por eso.</p>
                <p>Solo quiero que recuerdes que no tienes que pasar por todo sola. Si quieres hablar, te escucho. Si quieres contarme qué pasó, te escucho. Y si no quieres decir nada y solo quieres que me quede contigo, también.</p>
                <p>Sé que a veces tu cabeza puede hacer que todo parezca mucho peor de lo que realmente es. Así que respira un poquito, toma agua, descansa y date un momento.</p>
                <p>Y si nada de eso funciona... siempre puedes venir conmigo. Aunque sea para quejarte de todo y que yo te haga compañía mientras te quejas.</p>
                <p>Te amo muchísimo, mi niña. Y espero que cuando termines de leer esto estés aunque sea un poquito mejor. ❤️</p>
            `
        },
        2: {
            title: "Carta para cuando estés sobrepensando",
            badge: "Carta 02 · Sobrepensando",
            audioSrc: "assets/audios/carta-2.mp3",
            body: `
                <p>Amor,</p>
                <p>Sé que probablemente estás pensando demasiado otra vez. Y no sé exactamente qué estará pasando por tu cabeza ahora mismo, pero sí sé que a veces te haces sufrir por cosas que todavía ni siquiera han pasado.</p>
                <p>Así que quería dejarte esto para que lo leas cuando estés así.</p>
                <p>No quiero que una idea que apareció en tu cabeza termine convirtiéndose en una verdad solo porque la pensaste muchas veces. A veces tu cabeza te juega malas pasadas y empieza a hacerte dudar de cosas que realmente están bien.</p>
                <p>Y si estás pensando en nosotros, quiero que recuerdes algo: no tienes que saber cómo va a terminar nuestra historia para poder disfrutarla ahora. Todavía tenemos muchísimo por vivir, conocer y descubrir juntos.</p>
                <p>Si algún día algo te preocupa, dímelo. No tienes que quedarte sola con tus pensamientos intentando encontrar respuestas a todo. Prefiero que me preguntes, que me cuentes lo que sientes y que lo hablemos juntos.</p>
                <p>Te amo muchísimo. ❤️</p>
            `
        },
        3: {
            title: "Carta para cuando me extrañes",
            badge: "Carta 03 · Cuando me extrañes",
            audioSrc: "assets/audios/carta-3.mp3",
            body: `
                <p>Amor,</p>
                <p>Si estás leyendo esto porque me extrañas, entonces estamos igual. Porque aunque no siempre te lo diga, también hay momentos en los que me gustaría tenerte aquí conmigo y no tener que conformarnos con una llamada, un mensaje o una pantalla.</p>
                <p>A veces me gustaría simplemente poder aparecer ahí, abrazarte y quedarme contigo un rato. Sin tener que decir nada, sin hacer nada especial. Solo estar contigo.</p>
                <p>Sé que todavía nos falta vivir muchas cosas juntos y que hay momentos en los que la distancia se siente bastante. Pero también me gusta pensar que cada vez que nos extrañamos es porque hay alguien al otro lado de la pantalla que realmente nos importa.</p>
                <p>Así que si hoy me extrañas mucho, acuérdate de todas esas veces que hemos hablado durante horas, de nuestras noches jugando, de nuestras llamadas y de todas esas pequeñas cosas que hemos ido construyendo sin darnos cuenta.</p>
                <p>Y cuando termines de leer esto, escríbeme.</p>
                <p>Probablemente yo también esté pensando en ti.</p>
                <p>Te amo, bebé. ❤️</p>
            `
        },
        4: {
            title: "Carta para cuando dudes de lo nuestro",
            badge: "Carta 04 · Dudes de lo nuestro",
            audioSrc: "assets/audios/carta-4.mp3",
            body: `
                <p>Amor,</p>
                <p>Si estás leyendo esto porque estás dudando de nosotros, quiero que por un momento dejes de pensar en todo lo que podría salir mal y recuerdes todo lo que ya pasó.</p>
                <p>Nosotros empezamos sin saber absolutamente nada de lo que iba a pasar. Éramos dos personas que un día empezaron a hablar y, sin darnos cuenta, terminamos convirtiéndonos en alguien importante para el otro.</p>
                <p>No sé exactamente qué nos espera más adelante. Y creo que nadie puede saberlo. Pero no quiero que tengamos miedo de una historia que todavía estamos escribiendo.</p>
                <p>Si algún día tienes miedo de que esto no funcione, no quiero que pienses que eso significa que tenemos que rendirnos. Las cosas no siempre van a ser fáciles y nosotros tampoco somos perfectos, pero eso no hace que lo que sentimos sea menos real.</p>
                <p>Yo sigo aquí porque quiero seguir conociéndote, seguir compartiendo cosas contigo, seguir teniendo nuestras llamadas, nuestras tonterías, nuestras noches jugando y todos esos pequeños momentos que terminan significando muchísimo.</p>
                <p>Así que si alguna vez dudas de nosotros, vuelve a leer esto.</p>
                <p>No tienes que saber cómo termina nuestra historia.</p>
                <p>Solo quédate conmigo mientras la seguimos escribiendo. ❤️</p>
            `
        },
        5: {
            title: "Carta para cuando necesites un abrazo",
            badge: "Carta 05 · Necesites un abrazo",
            audioSrc: "assets/audios/carta-5.mp3",
            body: `
                <p>Amor,</p>
                <p>Si estás leyendo esto porque necesitas un abrazo, quiero que cierres los ojos un ratito e imagines que estoy ahí contigo.</p>
                <p>Sé que no es lo mismo. Ojalá pudiera simplemente acercarme, abrazarte fuerte y quedarme así contigo hasta que te sintieras un poquito mejor.</p>
                <p>Pero mientras llega ese día, quiero que recuerdes que aunque estemos lejos, tienes a alguien que quiere estar contigo incluso en esos momentos en los que no sabes qué decir o simplemente necesitas sentirte acompañada.</p>
                <p>Así que imagina que ahora mismo te estoy abrazando y que no te voy a soltar todavía.</p>
                <p>Algún día ya no vamos a necesitar imaginar estos abrazos.</p>
                <p>Por ahora, quédate un ratito aquí conmigo.</p>
                <p>Te amo, mi amor. 🫂❤️</p>
            `
        },
        6: {
            title: "Carta para cuando necesites recordar cuánto te amo",
            badge: "Carta 06 · Cuánto te amo",
            audioSrc: "assets/audios/carta-6.mp3",
            body: `
                <p>Amor,</p>
                <p>Si algún día necesitas recordar cuánto te amo, quiero que leas esto.</p>
                <p>Te amo por tu forma de ser conmigo, por lo atenta que eres, por cómo te preocupas por mí incluso cuando yo no digo mucho. Te amo por tu voz, por tu risa y por esa forma tan tuya de hacer que hasta una conversación cualquiera termine siendo un momento que quiero recordar.</p>
                <p>Te amo por todos esos pequeños detalles que haces por mí. Por las cosas que me has escrito, por los dibujos, por las fotos, por las cosas que haces sin que yo te las pida.</p>
                <p>Te amo incluso por tus cosas raras. Por tus ocurrencias, por cuando dices alguna tontería, por tus momentos de locura y hasta por esos pequeños detalles que probablemente tú ni siquiera consideras importantes.</p>
                <p>Y también te amo por cómo me haces sentir.</p>
                <p>Contigo puedo ser yo sin estar pensando demasiado en qué decir o cómo actuar. Puedo contarte mis cosas, hablar de cualquier estupidez y simplemente disfrutar de tenerte conmigo.</p>
                <p>Así que si algún día dudas de cuánto te amo, vuelve a leer esto.</p>
                <p>Y si todavía no te queda claro...</p>
                <p>Entonces tendré que decírtelo otra vez cuando hablemos.</p>
                <p>Te amo, Andrea. Muchísimo. ❤️</p>
            `
        },
        7: {
            title: "Carta para cuando no puedas dormir",
            badge: "Carta 07 · No puedas dormir",
            audioSrc: "assets/audios/carta-7.mp3",
            body: `
                <p>Amor,</p>
                <p>Si estás leyendo esto porque no puedes dormir, probablemente ya estés acostada dando vueltas, pensando en cualquier cosa menos en dormir.</p>
                <p>Ojalá pudiera estar ahí contigo ahora mismo. Probablemente terminaríamos hablando de cualquier tontería hasta que uno de los dos se quede dormido, como tantas veces.</p>
                <p>Pero como no puedo estar ahí todavía, quiero que al menos tengas esto.</p>
                <p>Deja de pensar por un ratito en todo lo que tienes que hacer mañana, en lo que pasó hoy o en todas esas cosas que tu cabeza decide recordar justo cuando quieres dormir.</p>
                <p>Solo descansa.</p>
                <p>Cierra los ojos, ponte cómoda y piensa en algo bonito. En nosotros, en alguna de nuestras conversaciones, en alguna tontería que nos haya hecho reír o simplemente en el día en que podamos estar juntos sin que una pantalla esté en medio.</p>
                <p>Y si sigues sin poder dormir...</p>
                <p>imagina que estoy ahí diciéndote:</p>
                <p><em>"Ya duerme, amor. Mañana seguimos hablando."</em></p>
                <p>Buenas noches, bebé.</p>
                <p>Descansa mucho. ❤️</p>
            `
        }
    };

    const letterReaderModal = document.getElementById('letter-reader-modal');
    const letterModalClose = document.getElementById('letter-modal-close');
    const letterModalBadge = document.getElementById('letter-modal-badge');
    const letterModalTitle = document.getElementById('letter-modal-title');
    const letterModalBody = document.getElementById('letter-modal-body');
    const letterVoiceAudio = document.getElementById('letter-voice-audio');
    const btnVoiceToggle = document.getElementById('btn-voice-toggle');
    const voiceSoundWaves = document.getElementById('voice-sound-waves');
    const voiceProgressBar = document.getElementById('voice-progress-bar');
    const voiceProgressTrack = document.getElementById('voice-progress-track');
    const voiceTimeDisplay = document.getElementById('voice-time-display');

    window.openWhenLetter = function (id) {
        playFlipSound();
        const data = CARTAS_DATA[id];
        if (!data) return;

        if (letterModalBadge) letterModalBadge.textContent = data.badge;
        if (letterModalTitle) letterModalTitle.textContent = data.title;
        if (letterModalBody) letterModalBody.innerHTML = data.body;

        if (letterVoiceAudio) {
            letterVoiceAudio.pause();
            letterVoiceAudio.src = data.audioSrc;
            updateVoicePlayState(false);
        }

        if (letterReaderModal) letterReaderModal.classList.remove('hidden');
    };

    function updateVoicePlayState(isPlaying) {
        if (!btnVoiceToggle) return;
        const playIcon = btnVoiceToggle.querySelector('.icon-voice-play');
        const pauseIcon = btnVoiceToggle.querySelector('.icon-voice-pause');
        if (isPlaying) {
            if (playIcon) playIcon.classList.add('hidden');
            if (pauseIcon) pauseIcon.classList.remove('hidden');
            if (voiceSoundWaves) voiceSoundWaves.classList.add('playing');
        } else {
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
            if (voiceSoundWaves) voiceSoundWaves.classList.remove('playing');
        }
    }

    if (btnVoiceToggle && letterVoiceAudio) {
        btnVoiceToggle.addEventListener('click', () => {
            getAudioContext();
            if (letterVoiceAudio.paused) {
                // Si la música de fondo está sonando, bajamos su volumen temporalmente
                if (romanticAudio && !romanticAudio.paused) {
                    romanticAudio.volume = 0.2;
                }
                letterVoiceAudio.play().then(() => updateVoicePlayState(true)).catch(() => {
                    alert('Iván aún no ha subido el archivo de audio para esta carta, pero muy pronto podrás escuchar su voz aquí ❤️');
                    updateVoicePlayState(false);
                });
            } else {
                letterVoiceAudio.pause();
                updateVoicePlayState(false);
                if (romanticAudio) romanticAudio.volume = 0.75;
            }
        });
    }

    if (letterVoiceAudio) {
        letterVoiceAudio.addEventListener('timeupdate', () => {
            if (letterVoiceAudio.duration) {
                const pct = (letterVoiceAudio.currentTime / letterVoiceAudio.duration) * 100;
                if (voiceProgressBar) voiceProgressBar.style.width = pct + '%';

                const curM = Math.floor(letterVoiceAudio.currentTime / 60);
                const curS = Math.floor(letterVoiceAudio.currentTime % 60);
                const durM = Math.floor(letterVoiceAudio.duration / 60);
                const durS = Math.floor(letterVoiceAudio.duration % 60);
                if (voiceTimeDisplay) {
                    voiceTimeDisplay.textContent = `${curM}:${String(curS).padStart(2, '0')} / ${durM}:${String(durS).padStart(2, '0')}`;
                }
            }
        });

        letterVoiceAudio.addEventListener('ended', () => {
            updateVoicePlayState(false);
            if (romanticAudio) romanticAudio.volume = 0.75;
        });
    }

    if (voiceProgressTrack && letterVoiceAudio) {
        voiceProgressTrack.addEventListener('click', (e) => {
            if (!letterVoiceAudio.duration) return;
            const rect = voiceProgressTrack.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            letterVoiceAudio.currentTime = ratio * letterVoiceAudio.duration;
        });
    }

    function closeLetterModal() {
        if (letterReaderModal) letterReaderModal.classList.add('hidden');
        if (letterVoiceAudio) {
            letterVoiceAudio.pause();
            updateVoicePlayState(false);
        }
        if (romanticAudio) romanticAudio.volume = 0.75;
    }

    if (letterModalClose) letterModalClose.addEventListener('click', closeLetterModal);

    // =========================================================
    // 10. CAPÍTULO V: NUESTRA AVENTURA (MINIJUEGO RPG SENDERO)
    // El personaje de Iván avanza visualmente por un sendero con obstáculos.
    // Todas las preguntas están en un arreglo limpio editable.
    // =========================================================
    const AVENTURA_ETAPAS = [
        {
            id: 1,
            nombre: "El Bosque de las Primeras Charlas",
            etapaNum: 1,
            avatarPosPct: 20,
            obstaculoBadge: "Obstáculo 1: Ramas Espinosas Encantadas",
            icono: "🌲",
            narrativa: "Unas ramas mágicas con espinas han cerrado el sendero hacia Andrea. Para cortarlas y avanzar, Iván necesita tu ayuda con un recuerdo:",
            pregunta: "¿Quién fue la persona que nos presentó y gracias a quién comenzó todo esto?",
            opciones: [
                "Sierpe por insistirle a Iván",
                "Un algoritmo de TikTok",
                "Pura casualidad en una partida",
                "Ya nos conocíamos de antes"
            ],
            correctaIndex: 0,
            recompensa: "¡Las ramas florecen en rosas rojas y se abren dándote paso!"
        },
        {
            id: 2,
            nombre: "El Río de los Kilómetros",
            etapaNum: 2,
            avatarPosPct: 40,
            obstaculoBadge: "Obstáculo 2: El Río Caudaloso",
            icono: "🌊",
            narrativa: "Un caudaloso río sin puente bloquea el sendero. Para construir un puente de luz y cruzarlo, responde:",
            pregunta: "¿Qué fue lo primero que enamoró y fascinó por completo a Iván al hablar en llamada?",
            opciones: [
                "Tu hermosa voz y tu risa tan linda",
                "Un meme gracioso que compartieron",
                "Tu foto de perfil",
                "Que jugaras mejor que él"
            ],
            correctaIndex: 0,
            recompensa: "¡Un puente de cristal y estrellas une ambas orillas y cruzas sin dudar!"
        },
        {
            id: 3,
            nombre: "La Niebla de los Días Difíciles",
            etapaNum: 3,
            avatarPosPct: 60,
            obstaculoBadge: "Obstáculo 3: La Niebla Espesa",
            icono: "🌫️",
            narrativa: "Una nube espesa y gris intenta confundir el camino. Iván necesita la luz de tu cariño para disiparla:",
            pregunta: "En el primer mes, cuando Iván pasó por momentos difíciles, ¿qué fue lo que más valoró de ti?",
            opciones: [
                "La forma tan linda en que te preocupabas y estabas atenta a él",
                "Que jugaran sin parar",
                "Que no hablaran de temas serios",
                "Un sticker que le enviaste"
            ],
            correctaIndex: 0,
            recompensa: "¡Tu ternura ilumina el cielo y la niebla se disipa por completo con un rayo de sol!"
        },
        {
            id: 4,
            nombre: "El Guardián de las Dudas",
            etapaNum: 4,
            avatarPosPct: 80,
            obstaculoBadge: "Obstáculo 4: El Guardián Mágico",
            icono: "🐉",
            narrativa: "Una criatura mítica custodia la última puerta y te exige la contraseña más hermosa del universo:",
            pregunta: "¿Qué fue lo que Andrea le dijo a Iván que le subió los ánimos hasta el cielo?",
            opciones: [
                "El primer «te quiero»",
                "«Eres muy simpático»",
                "«Buenas noches, descansa»",
                "«Vamos a ganar esta partida»"
            ],
            correctaIndex: 0,
            recompensa: "¡El guardián sonríe, se inclina con respeto y abre la gran puerta dorada!"
        },
        {
            id: 5,
            nombre: "El Mirador del Destino",
            etapaNum: 5,
            avatarPosPct: 90,
            obstaculoBadge: "Destino Final: Los Brazos de Andrea",
            icono: "🏰",
            narrativa: "¡Iván ha llegado frente a Andrea en el mirador lleno de flores! Solo queda reafirmar una gran verdad:",
            pregunta: "¿Qué es lo que nada en este universo podrá cambiar entre nosotros dos?",
            opciones: [
                "Que lo que sentimos es infinitamente más grande que cualquier distancia",
                "Que solo somos amigos de juego",
                "Que el tiempo nos hará olvidar",
                "Que los kilómetros ganarán"
            ],
            correctaIndex: 0,
            recompensa: "¡LLEGASTE A LA META! Iván y Andrea se abrazan sin que nada los separe."
        }
    ];

    let currentAdventureStage = 0;
    let adventureHearts = 3;

    const hudStageName = document.getElementById('hud-stage-name');
    const hudProgressPercent = document.getElementById('hud-progress-percent');
    const hudBarFill = document.getElementById('hud-bar-fill');
    const trailPathFill = document.getElementById('trail-path-fill');
    const avatarIvan = document.getElementById('avatar-ivan');
    const consoleObstacleBadge = document.getElementById('console-obstacle-badge');
    const consoleNarrativeText = document.getElementById('console-narrative-text');
    const consoleQuestionText = document.getElementById('console-question-text');
    const consoleOptionsGrid = document.getElementById('console-options-grid');
    const consoleFeedbackToast = document.getElementById('console-feedback-toast');
    const gameConsolePanel = document.getElementById('game-console-panel');
    const gameVictoryScreen = document.getElementById('game-victory-screen');
    const btnRestartAdventure = document.getElementById('btn-restart-adventure');

    function updateHeartsHUD() {
        for (let i = 1; i <= 3; i++) {
            const h = document.getElementById(`heart-${i}`);
            if (h) {
                if (i <= adventureHearts) {
                    h.classList.remove('lost');
                    h.classList.add('active');
                } else {
                    h.classList.add('lost');
                    h.classList.remove('active');
                }
            }
        }
    }

    function renderAdventureStage(stageIdx) {
        if (stageIdx >= AVENTURA_ETAPAS.length) {
            // ¡Victoria alcanzada!
            if (gameConsolePanel) gameConsolePanel.classList.add('hidden');
            if (gameVictoryScreen) gameVictoryScreen.classList.remove('hidden');
            if (avatarIvan) avatarIvan.style.left = '88%';
            playFanfareSound();
            return;
        }

        const stage = AVENTURA_ETAPAS[stageIdx];

        // 1. Actualizar HUD
        const pct = Math.round((stageIdx / (AVENTURA_ETAPAS.length)) * 100);
        if (hudStageName) hudStageName.textContent = `Etapa ${stage.etapaNum} de 5: ${stage.nombre}`;
        if (hudProgressPercent) hudProgressPercent.textContent = `${pct}%`;
        if (hudBarFill) hudBarFill.style.width = `${Math.max(5, pct)}%`;
        if (trailPathFill) trailPathFill.style.width = `${stage.avatarPosPct}%`;

        // 2. Mover Avatar de Iván por el sendero
        if (avatarIvan) {
            avatarIvan.style.left = `${stage.avatarPosPct}%`;
        }

        // 3. Actualizar nodos del sendero
        for (let i = 1; i <= 5; i++) {
            const nodeEl = document.getElementById(`trail-node-${i}`);
            if (nodeEl) {
                if (i - 1 < stageIdx) {
                    nodeEl.classList.remove('current');
                    nodeEl.classList.add('cleared');
                } else if (i - 1 === stageIdx) {
                    nodeEl.classList.add('current');
                    nodeEl.classList.remove('cleared');
                } else {
                    nodeEl.classList.remove('current', 'cleared');
                }
            }
        }

        // 4. Actualizar consola de texto
        if (consoleObstacleBadge) consoleObstacleBadge.textContent = stage.obstaculoBadge;
        if (consoleNarrativeText) consoleNarrativeText.textContent = stage.narrativa;
        if (consoleQuestionText) consoleQuestionText.textContent = stage.pregunta;

        if (consoleFeedbackToast) {
            consoleFeedbackToast.classList.add('hidden');
            consoleFeedbackToast.className = 'console-feedback-toast hidden';
        }

        // 5. Renderizar botones de opción
        if (consoleOptionsGrid) {
            consoleOptionsGrid.innerHTML = '';
            stage.opciones.forEach((optText, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'game-option-btn';
                btn.innerHTML = `<span class="opt-bullet">✦</span> <span>${optText}</span>`;
                btn.addEventListener('click', () => handleOptionSelection(optIdx, btn, stage));
                consoleOptionsGrid.appendChild(btn);
            });
        }
    }

    function handleOptionSelection(chosenIdx, btnEl, stage) {
        if (chosenIdx === stage.correctaIndex) {
            // ¡Correcto!
            btnEl.classList.add('correct-glow');
            playChimeSound();

            if (consoleFeedbackToast) {
                consoleFeedbackToast.textContent = stage.recompensa;
                consoleFeedbackToast.className = 'console-feedback-toast success';
                consoleFeedbackToast.classList.remove('hidden');
            }

            // Deshabilitar botones mientras avanza
            const allBtns = consoleOptionsGrid.querySelectorAll('button');
            allBtns.forEach(b => b.disabled = true);

            setTimeout(() => {
                currentAdventureStage++;
                adventureHearts = 3; // Replenish
                updateHeartsHUD();
                renderAdventureStage(currentAdventureStage);
            }, 1300);

        } else {
            // Incorrecto (tierno)
            btnEl.classList.add('wrong-shake');
            playErrorSound();
            adventureHearts = Math.max(1, adventureHearts - 1);
            updateHeartsHUD();

            if (consoleFeedbackToast) {
                consoleFeedbackToast.textContent = '¡Ouch! Casi mi niña hermosa, pero Iván te ama tanto que podemos intentarlo otra vez. ¡Vuelve a elegir! ❤️';
                consoleFeedbackToast.className = 'console-feedback-toast error';
                consoleFeedbackToast.classList.remove('hidden');
            }

            setTimeout(() => {
                btnEl.classList.remove('wrong-shake');
            }, 500);
        }
    }

    if (btnRestartAdventure) {
        btnRestartAdventure.addEventListener('click', () => {
            currentAdventureStage = 0;
            adventureHearts = 3;
            updateHeartsHUD();
            if (gameVictoryScreen) gameVictoryScreen.classList.add('hidden');
            if (gameConsolePanel) gameConsolePanel.classList.remove('hidden');
            renderAdventureStage(0);
        });
    }

    updateHeartsHUD();
    renderAdventureStage(0);

    // =========================================================
    // 11. CAPÍTULO VII: BUCKET LIST / NUESTRO FUTURO JUNTOS
    // =========================================================
    const bucketItemsList = document.getElementById('bucket-items-list');
    const bucketCounterText = document.getElementById('bucket-counter-text');
    const bucketMeterFill = document.getElementById('bucket-meter-fill');
    const addDreamForm = document.getElementById('add-dream-form');
    const newDreamInput = document.getElementById('new-dream-input');
    const customDreamsContainer = document.getElementById('custom-dreams-container');

    function updateBucketStats() {
        const allCheckboxes = document.querySelectorAll('.dream-checkbox');
        const checkedCount = document.querySelectorAll('.dream-checkbox:checked').length;
        const total = allCheckboxes.length;
        const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

        if (bucketCounterText) {
            bucketCounterText.textContent = `${checkedCount} de ${total} sueños cumplidos (${pct}%)`;
        }
        if (bucketMeterFill) {
            bucketMeterFill.style.width = `${pct}%`;
        }

        // Guardar estado de checkboxes en localStorage
        const checkedIds = [];
        allCheckboxes.forEach((cb, idx) => {
            if (cb.checked) checkedIds.push(idx);
        });
        localStorage.setItem('andreaBucketChecked', JSON.stringify(checkedIds));
    }

    function initBucketList() {
        // Cargar sueños adicionales guardados
        const savedCustomDreams = JSON.parse(localStorage.getItem('andreaCustomDreams') || '[]');
        if (customDreamsContainer) {
            customDreamsContainer.innerHTML = '';
            savedCustomDreams.forEach((dreamText, idx) => {
                const div = document.createElement('div');
                div.className = 'bucket-item';
                div.innerHTML = `
                    <label class="bucket-check-label">
                        <input type="checkbox" class="dream-checkbox">
                        <span class="custom-checkbox-box">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <span class="dream-text">${dreamText}</span>
                    </label>
                `;
                customDreamsContainer.appendChild(div);
            });
        }

        // Restaurar estado de checks
        const savedChecked = JSON.parse(localStorage.getItem('andreaBucketChecked') || '[]');
        const allCheckboxes = document.querySelectorAll('.dream-checkbox');
        allCheckboxes.forEach((cb, idx) => {
            if (savedChecked.includes(idx)) {
                cb.checked = true;
            }
            cb.addEventListener('change', () => {
                if (cb.checked) playChimeSound();
                updateBucketStats();
            });
        });

        updateBucketStats();
    }
    initBucketList();

    if (addDreamForm && newDreamInput) {
        addDreamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = newDreamInput.value.trim();
            if (!text) return;

            const savedCustomDreams = JSON.parse(localStorage.getItem('andreaCustomDreams') || '[]');
            savedCustomDreams.push(text);
            localStorage.setItem('andreaCustomDreams', JSON.stringify(savedCustomDreams));

            playChimeSound();
            newDreamInput.value = '';
            initBucketList();
        });
    }

    // =========================================================
    // 12. SISTEMA DE PISTAS SECRETAS (4 PISTAS OCULTAS)
    // Desbloquea el botón del Capítulo Secreto en la barra flotante.
    // =========================================================
    const cluePillCount = document.getElementById('clue-pill-count');
    const btnSecretNav = document.getElementById('btn-secret-nav');
    const clueAlertModal = document.getElementById('clue-alert-modal');
    const clueAlertTitle = document.getElementById('clue-alert-title');
    const clueAlertText = document.getElementById('clue-alert-text');
    const btnAckClue = document.getElementById('btn-ack-clue');

    let foundClues = JSON.parse(localStorage.getItem('andreaFoundClues') || '[]');

    function updateCluesUI() {
        if (cluePillCount) {
            cluePillCount.textContent = `${foundClues.length}/4`;
        }

        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`dot-${i}`);
            if (dot) {
                if (foundClues.includes(`clue-${i}`)) {
                    dot.classList.add('found');
                } else {
                    dot.classList.remove('found');
                }
            }
        }

        if (btnSecretNav) {
            if (foundClues.length >= 4) {
                btnSecretNav.classList.remove('locked');
                btnSecretNav.classList.add('unlocked');
                btnSecretNav.title = "¡Capítulo Secreto Desbloqueado! Haz clic para abrirlo.";
            } else {
                btnSecretNav.classList.add('locked');
                btnSecretNav.classList.remove('unlocked');
                btnSecretNav.title = `Encuentra las 4 pistas ocultas en la página (${foundClues.length}/4 encontradas)`;
            }
        }
    }
    updateCluesUI();

    function triggerClueFound(clueNum, clueRiddle) {
        const clueKey = `clue-${clueNum}`;
        if (!foundClues.includes(clueKey)) {
            foundClues.push(clueKey);
            localStorage.setItem('andreaFoundClues', JSON.stringify(foundClues));
            playChimeSound();
        }

        if (clueAlertTitle) clueAlertTitle.textContent = `¡Pista #${clueNum} Encontrada!`;
        if (clueAlertText) clueAlertText.textContent = clueRiddle;
        if (clueAlertModal) clueAlertModal.classList.remove('hidden');

        updateCluesUI();

        if (foundClues.length >= 4) {
            setTimeout(() => {
                openSecretProposalModal();
            }, 1200);
        }
    }

    if (btnAckClue) {
        btnAckClue.addEventListener('click', () => {
            if (clueAlertModal) clueAlertModal.classList.add('hidden');
        });
    }

    // Pista 1: En la firma de la carta (Hoja 3)
    const secretClue1 = document.getElementById('secret-clue-1');
    if (secretClue1) {
        secretClue1.addEventListener('click', () => {
            triggerClueFound(1, '«En las palabras más sinceras del corazón siempre hay una chispa de verdad.» (1/4)');
        });
    }

    // Pista 2: En el botón sutil de la Polaroid 3 (Galería)
    const secretClue2 = document.getElementById('secret-clue-2');
    if (secretClue2) {
        secretClue2.addEventListener('click', () => {
            triggerClueFound(2, '«Nuestros recuerdos compartidos guardan la magia de lo que somos.» (2/4)');
        });
    }

    // Pista 3: En la pantalla de victoria del minijuego
    const secretClue3 = document.getElementById('secret-clue-3');
    if (secretClue3) {
        secretClue3.addEventListener('click', () => {
            triggerClueFound(3, '«No hay obstáculo ni distancia capaz de detener a dos almas que se eligen.» (3/4)');
        });
    }

    // Pista 4: En el pie de la lista de sueños (Bucket list)
    const secretClue4 = document.getElementById('secret-clue-4');
    if (secretClue4) {
        secretClue4.addEventListener('click', () => {
            triggerClueFound(4, '«El futuro nos espera con mil sueños por cumplir juntos... ¡El gran secreto ha sido revelado!» (4/4)');
        });
    }

    // =========================================================
    // 13. CAPÍTULO SECRETO: LA GRAN PROPUESTA ("¿QUIERES SER MI NOVIA?")
    // =========================================================
    const secretProposalModal = document.getElementById('secret-proposal-modal');
    const proposalCloseBtn = document.getElementById('proposal-close-btn');
    const btnProposalYes = document.getElementById('btn-proposal-yes');
    const btnProposalNo = document.getElementById('btn-proposal-no');
    const proposalButtonsRow = document.getElementById('proposal-buttons-row');
    const proposalCelebrationPanel = document.getElementById('proposal-celebration-panel');
    const celebrationTimestampText = document.getElementById('celebration-timestamp-text');
    const btnReturnHome = document.getElementById('btn-return-home');
    const confettiCanvas = document.getElementById('celebration-confetti-canvas');

    function openSecretProposalModal() {
        if (secretProposalModal) secretProposalModal.classList.remove('hidden');
        playFanfareSound();
    }

    if (btnSecretNav) {
        btnSecretNav.addEventListener('click', () => {
            if (foundClues.length >= 4) {
                openSecretProposalModal();
            } else {
                alert(`Capítulo Secreto Bloqueado: Has encontrado ${foundClues.length} de 4 pistas. Explora la carta, la galería, el minijuego y los sueños para hallarlas ✨`);
            }
        });
    }

    if (proposalCloseBtn) {
        proposalCloseBtn.addEventListener('click', () => {
            if (secretProposalModal) secretProposalModal.classList.add('hidden');
        });
    }

    // Botón evasivo "No" (se escapa con humor y amor)
    if (btnProposalNo) {
        const moveNoButton = () => {
            const randomX = (Math.random() - 0.5) * 160;
            const randomY = (Math.random() - 0.5) * 100;
            btnProposalNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
        };
        btnProposalNo.addEventListener('mouseenter', moveNoButton);
        btnProposalNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });
        btnProposalNo.addEventListener('click', () => {
            alert('¡Esa opción no está permitida por el destino! Solo se acepta un SÍ rotundo 😉❤️');
        });
    }

    // Animación de confeti de celebración en canvas
    let confettiAnimationId = null;
    function launchCelebrationConfetti() {
        if (!confettiCanvas) return;
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff4d6d', '#ff758f', '#c9184a', '#ffd166', '#9d4edd', '#ffffff', '#e0aaff'];

        for (let i = 0; i < 220; i++) {
            particles.push({
                x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 200,
                y: confettiCanvas.height / 2 + (Math.random() - 0.5) * 100,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 1.2) * 16,
                gravity: 0.28,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 12,
                opacity: 1,
                shape: Math.random() > 0.4 ? 'rect' : 'heart'
            });
        }

        function drawConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rotation += p.rotSpeed;
                p.vx *= 0.99;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                } else {
                    // Pequeño corazón de confeti
                    ctx.beginPath();
                    const s = p.size * 0.5;
                    ctx.moveTo(0, s * 0.3);
                    ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.3);
                    ctx.bezierCurveTo(-s, s * 0.7, 0, s, 0, s * 1.3);
                    ctx.bezierCurveTo(0, s, s, s * 0.7, s, s * 0.3);
                    ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
                    ctx.fill();
                }
                ctx.restore();
            });

            confettiAnimationId = requestAnimationFrame(drawConfetti);
        }
        drawConfetti();
    }

    // Al hacer clic en "¡SÍ, ACEPTO! ❤️"
    if (btnProposalYes) {
        btnProposalYes.addEventListener('click', () => {
            const acceptedTimestamp = new Date().toISOString();
            localStorage.setItem('noviosAcceptedDate', acceptedTimestamp);

            playFanfareSound();
            launchCelebrationConfetti();

            if (proposalButtonsRow) proposalButtonsRow.classList.add('hidden');
            if (proposalCelebrationPanel) proposalCelebrationPanel.classList.remove('hidden');

            const now = new Date();
            const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            if (celebrationTimestampText) {
                celebrationTimestampText.textContent = `Registrado oficialmente el ${dateStr} hrs.`;
            }

            // Desbloquear inmediatamente el cuadro misterioso ??? en la cabecera
            checkOfficialNoviosStatus();
        });
    }

    if (btnReturnHome) {
        btnReturnHome.addEventListener('click', () => {
            if (secretProposalModal) secretProposalModal.classList.add('hidden');
            const tiempoSection = document.getElementById('tiempo');
            if (tiempoSection) {
                tiempoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // =========================================================
    // 14. CONTROLADOR DE PROGRESIÓN DE CAPÍTULOS (LÍNEA DE TIEMPO)
    // Desbloqueo progresivo con "???", cero emojis y persistencia en localStorage
    // =========================================================
    const CHAPTERS_METADATA = [
        {
            id: 1,
            num: "I",
            url: "capitulo1.html",
            realBadge: "CAPÍTULO I · EL COMIENZO",
            realTitle: "Desde que te conocí",
            realDesc: "El instante en que todo cambió y cómo iluminaste mi vida desde el primer día.",
            realCaption: "«El inicio de lo mejor de mi vida»",
            realTag: "26 Feb 2026",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
        },
        {
            id: 2,
            num: "II",
            url: "capitulo2.html",
            realBadge: "CAPÍTULO II · CONFESIÓN",
            realTitle: "Razones por las que te amo",
            realDesc: "Muchísimas razones que me hacen enamorarme de ti un poquito más a cada instante.",
            realCaption: "«Una flor para la niña de mis ojos»",
            realTag: "Para Andrea",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
        },
        {
            id: 3,
            num: "III",
            url: "capitulo3.html",
            realBadge: "CAPÍTULO III · MEMORIAS",
            realTitle: "Nuestros Álbumes de Recuerdos",
            realDesc: "Fotografías, anécdotas y detalles que guardo como tesoros en el alma.",
            realCaption: "«Cada segundo a tu lado cuenta doble»",
            realTag: "Nuestras Charlas",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`
        },
        {
            id: 4,
            num: "IV",
            url: "capitulo5.html",
            realBadge: "CAPÍTULO IV · REFUGIO",
            realTitle: "Cartas Para Cuando...",
            realDesc: "Para cuando estés triste, no puedas dormir o simplemente necesites un abrazo a la distancia.",
            realCaption: "«Palabras selladas para cuando me extrañes»",
            realTag: "Cartas de Amor",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
        },
        {
            id: 5,
            num: "V",
            url: "capitulo6.html",
            realBadge: "CAPÍTULO V · EL DESAFÍO",
            realTitle: "El Desafío de Iván",
            realDesc: "Trivia arcade de pareja para poner a prueba cuánto nos conocemos y nuestra telepatía.",
            realCaption: "«Descubriendo qué tanto me conoces»",
            realTag: "El Desafío",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="8" cy="12" r="2"></circle><path d="M15 9v6M12 12h6"></path></svg>`
        },
        {
            id: 6,
            num: "VI",
            url: "capitulo7.html",
            realBadge: "CAPÍTULO VI · NUESTRA PLAYLIST",
            realTitle: "Nuestra Playlist",
            realDesc: "Una invitación íntima para construir nuestra banda sonora juntos en Spotify.",
            realCaption: "«My One And Only Love en nuestra sintonía»",
            realTag: "Nuestra Frecuencia",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>`
        },
        {
            id: 7,
            num: "VII",
            url: "capitulo9.html",
            realBadge: "CAPÍTULO VII · SUEÑOS",
            realTitle: "Nuestro Futuro Juntos",
            realDesc: "Tablero de visiones, metas por cumplir y los viajes que nos esperan.",
            realCaption: "«No hay kilómetros que venzan nuestro amor»",
            realTag: "Siempre Juntos",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 19 21 12 17 5 21 12 2"></polygon></svg>`
        },
        {
            id: 8,
            num: "VIII",
            url: "capitulo10.html",
            realBadge: "CAPÍTULO VIII · EL JURAMENTO",
            realTitle: "Un Mensaje Final & La Gran Pregunta",
            realDesc: "Una carta íntima custodiada por un candado secreto que guarda la pregunta más importante.",
            realCaption: "«Con todo mi amor, por siempre Iván»",
            realTag: "Para Ti, Andrea",
            iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
        }
    ];

    const STORAGE_MAX_UNLOCKED = 'nuestra_historia_max_unlocked_step';
    const STORAGE_COMPLETED_CAPS = 'nuestra_historia_completed_caps';

    function getCompletedChapters() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_COMPLETED_CAPS) || '[]');
        } catch (e) {
            return [];
        }
    }

    function getMaxUnlockedStep() {
        const saved = parseInt(localStorage.getItem(STORAGE_MAX_UNLOCKED), 10);
        return isNaN(saved) || saved < 1 ? 1 : saved;
    }

    function showTimelineLockToast(msg) {
        const toast = document.getElementById('timelineLockToast');
        const toastMsg = document.getElementById('timelineToastMsg');
        if (toast && toastMsg) {
            toastMsg.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3200);
        }
    }

    function renderTimelineProgression() {
        const maxStep = getMaxUnlockedStep();
        const completed = getCompletedChapters();

        // Actualizar HUD
        const countLabel = document.getElementById('timelineProgressCount');
        const fillBar = document.getElementById('timelineProgressBarFill');
        if (countLabel) {
            countLabel.textContent = `${maxStep} de 8 Capítulos Revelados`;
        }
        if (fillBar) {
            const pct = Math.round((maxStep / 8) * 100);
            fillBar.style.width = `${pct}%`;
        }

        CHAPTERS_METADATA.forEach(ch => {
            const card = document.getElementById(`timeline-card-${ch.id}`);
            const node = document.getElementById(`timeline-node-${ch.id}`);
            const polaroid = document.getElementById(`polaroid-${ch.id}`);

            if (!card || !node) return;

            const isUnlocked = ch.id <= maxStep;
            const isCompleted = completed.includes(ch.id);
            const isCurrentTarget = ch.id === maxStep && !isCompleted;

            const badgeEl = card.querySelector('.timeline-card-badge');
            const titleEl = card.querySelector('.timeline-card-title');
            const descEl = card.querySelector('.timeline-card-desc');
            const statusEl = card.querySelector('.timeline-status');
            const actionEl = card.querySelector('.timeline-action');

            const nodeIconEl = node.querySelector('.node-icon');
            const nodeNumEl = node.querySelector('.node-num');

            if (isUnlocked) {
                // Estado DESBLOQUEADO (REVELADO)
                card.classList.remove('is-locked');
                card.classList.add('is-unlocked');
                card.setAttribute('href', ch.url);
                card.onclick = null;

                if (badgeEl) badgeEl.textContent = ch.realBadge;
                if (titleEl) titleEl.textContent = ch.realTitle;
                if (descEl) descEl.textContent = ch.realDesc;

                if (isCompleted) {
                    card.classList.add('is-completed');
                    if (statusEl) statusEl.textContent = '✓ Leído';
                    if (actionEl) actionEl.textContent = 'Releer →';
                } else {
                    card.classList.remove('is-completed');
                    if (statusEl) statusEl.textContent = '✦ Disponible';
                    if (actionEl) actionEl.textContent = 'Leer Capítulo →';
                }

                // Nodo
                node.classList.remove('is-locked');
                if (isCurrentTarget) {
                    node.classList.add('is-active-target');
                } else {
                    node.classList.remove('is-active-target');
                }
                if (nodeIconEl) nodeIconEl.innerHTML = ch.iconSvg;
                if (nodeNumEl) nodeNumEl.textContent = ch.num;

                // Polaroid
                if (polaroid) {
                    polaroid.classList.remove('is-locked');
                    const captionEl = polaroid.querySelector('.polaroid-handwriting');
                    const tagEl = polaroid.querySelector('.polaroid-tag');
                    if (captionEl) captionEl.textContent = ch.realCaption;
                    if (tagEl) tagEl.textContent = ch.realTag;
                }

                // Al hacer clic, registrar que se comenzó a leer
                card.addEventListener('click', () => {
                    markChapterReadAndProgress(ch.id);
                });

            } else {
                // Estado BLOQUEADO (???)
                card.classList.add('is-locked');
                card.classList.remove('is-unlocked', 'is-completed');
                card.removeAttribute('href');

                if (badgeEl) badgeEl.textContent = `CAPÍTULO ${ch.num} · MISTERIO`;
                if (titleEl) titleEl.textContent = '???';
                if (descEl) descEl.textContent = 'Completa el capítulo anterior para revelar este recuerdo...';
                if (statusEl) statusEl.textContent = '✦ Bloqueado';
                if (actionEl) actionEl.textContent = 'Bloqueado';

                // Nodo bloqueado
                node.classList.add('is-locked');
                node.classList.remove('is-active-target');
                if (nodeIconEl) {
                    nodeIconEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
                }
                if (nodeNumEl) nodeNumEl.textContent = '?';

                // Polaroid bloqueada
                if (polaroid) {
                    polaroid.classList.add('is-locked');
                    const captionEl = polaroid.querySelector('.polaroid-handwriting');
                    const tagEl = polaroid.querySelector('.polaroid-tag');
                    if (captionEl) captionEl.textContent = '«Recuerdo bajo llave...»';
                    if (tagEl) tagEl.textContent = 'Por Descubrir';
                }

                // Clic en bloqueado -> animación de sacudida y toast
                card.onclick = (e) => {
                    e.preventDefault();
                    playErrorSound();
                    card.classList.remove('shake-locked');
                    void card.offsetWidth; // Reflow
                    card.classList.add('shake-locked');
                    showTimelineLockToast(`Debes leer el Capítulo ${CHAPTERS_METADATA[ch.id - 2] ? CHAPTERS_METADATA[ch.id - 2].num : ''} primero para revelar este misterio.`);
                };
            }
        });
    }

    function markChapterReadAndProgress(chapterId) {
        let completed = getCompletedChapters();
        if (!completed.includes(chapterId)) {
            completed.push(chapterId);
            localStorage.setItem(STORAGE_COMPLETED_CAPS, JSON.stringify(completed));
        }

        const currentMax = getMaxUnlockedStep();
        const nextStep = Math.max(currentMax, Math.min(8, chapterId + 1));
        localStorage.setItem(STORAGE_MAX_UNLOCKED, nextStep.toString());
    }

    // Controles de Administrador / Prueba de Iván
    const btnResetProg = document.getElementById('btnResetProgression');
    if (btnResetProg) {
        btnResetProg.addEventListener('click', () => {
            localStorage.setItem(STORAGE_MAX_UNLOCKED, '1');
            localStorage.setItem(STORAGE_COMPLETED_CAPS, JSON.stringify([]));
            localStorage.removeItem('noviosAcceptedDate');
            localStorage.removeItem('andrea_dijo_si');
            localStorage.removeItem('andrea_fecha_compromiso');
            if (typeof resetOfficialNoviosToLocked === 'function') {
                resetOfficialNoviosToLocked();
            }
            renderTimelineProgression();
            playChimeSound();
            showTimelineLockToast('Progreso reiniciado: Cap. 1 disponible y contador de novios a 0 oculto.');
        });
    }

    const btnRevealAll = document.getElementById('btnRevealAllChapters');
    if (btnRevealAll) {
        btnRevealAll.addEventListener('click', () => {
            localStorage.setItem(STORAGE_MAX_UNLOCKED, '8');
            localStorage.setItem(STORAGE_COMPLETED_CAPS, JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]));
            renderTimelineProgression();
            playChimeSound();
            showTimelineLockToast('¡Todos los 8 capítulos han sido revelados!');
        });
    }

    // Inicializar progresión de la línea de tiempo
    renderTimelineProgression();

});

