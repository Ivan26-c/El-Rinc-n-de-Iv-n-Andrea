const fs = require('fs');

const spreads = JSON.parse(fs.readFileSync('spreads_data.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capítulo I: Antes de Encontrarnos · Andrea & Iván</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&family=Dancing+Script:wght@600;700&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="styles.css">

    <style>
        /* =========================================================
           ESTILOS MAESTROS: LIBRO 3D REALISTA · ANTES DE ENCONTRARNOS
           ========================================================= */
        body {
            background-color: #0b0416 !important;
            min-height: 100vh;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            position: relative;
        }

        #hearts-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1;
        }

        /* Barra de Navegación */
        .chapter-navbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(15, 6, 28, 0.92);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border-bottom: 1px solid rgba(199, 125, 255, 0.25);
            padding: 12px 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
        }

        .nav-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--secondary-color, #c77dff);
            font-family: 'Montserrat', sans-serif;
            font-size: 0.76rem;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-decoration: none;
            text-transform: uppercase;
            padding: 8px 18px;
            border-radius: 20px;
            background: rgba(199, 125, 255, 0.1);
            border: 1px solid rgba(199, 125, 255, 0.3);
            transition: all 0.25s ease;
        }

        .nav-back-btn svg {
            width: 14px;
            height: 14px;
            transition: transform 0.2s ease;
        }

        .nav-back-btn:hover {
            background: rgba(199, 125, 255, 0.25);
            color: #ffffff;
            transform: translateX(-3px);
            box-shadow: 0 0 15px rgba(199, 125, 255, 0.4);
        }

        .nav-chapter-badge {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: var(--accent, #ffd166);
            text-transform: uppercase;
            background: rgba(255, 183, 3, 0.12);
            border: 1px solid rgba(255, 183, 3, 0.35);
            padding: 5px 14px;
            border-radius: 12px;
        }

        /* Contenedor Principal del Libro */
        .book-wrapper {
            position: relative;
            z-index: 10;
            max-width: 1240px;
            margin: 15px auto 100px auto;
            padding: 0 20px;
        }

        .book-header-section {
            text-align: center;
            margin-bottom: 12px;
        }

        .book-header-pre {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 3px;
            color: var(--accent, #ffd166);
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
            text-shadow: 0 0 10px rgba(255, 183, 3, 0.4);
        }

        .book-header-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
            margin: 0 0 4px 0;
            text-shadow: 0 4px 20px rgba(199, 125, 255, 0.4);
        }

        .book-header-sub {
            font-family: 'Inter', sans-serif;
            font-style: italic;
            font-size: 0.88rem;
            color: #e2d9f3;
            max-width: 680px;
            margin: 0 auto;
            line-height: 1.45;
            opacity: 0.9;
        }

        /* =========================================================
           BARRA DE CONTROLES DEL LIBRO
           ========================================================= */
        .book-nav-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin: 0 auto 18px auto;
            flex-wrap: wrap;
        }

        .book-nav-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(20, 8, 38, 0.92);
            border: 1px solid rgba(199, 125, 255, 0.35);
            color: #ffffff;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.76rem;
            font-weight: 600;
            letter-spacing: 1.2px;
            padding: 8px 18px;
            border-radius: 25px;
            cursor: pointer;
            backdrop-filter: blur(12px);
            transition: all 0.25s ease;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
        }

        .book-nav-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, rgba(255, 183, 3, 0.25), rgba(199, 125, 255, 0.35));
            border-color: var(--accent, #ffd166);
            color: #ffd166;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 183, 3, 0.3);
        }

        .book-nav-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .book-nav-btn .btn-svg {
            width: 15px;
            height: 15px;
        }

        .btn-toc-modal {
            background: rgba(255, 209, 102, 0.12);
            border-color: rgba(255, 209, 102, 0.4);
            color: #ffd166;
        }

        .btn-toc-modal:hover {
            background: rgba(255, 209, 102, 0.25);
            border-color: #ffd166;
            color: #ffffff;
        }

        .page-counter-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 183, 3, 0.1);
            border: 1px solid rgba(255, 183, 3, 0.35);
            padding: 7px 16px;
            border-radius: 25px;
            color: var(--accent, #ffd166);
            font-family: 'Montserrat', sans-serif;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .page-counter-pill .counter-dot {
            width: 5px;
            height: 5px;
            background: var(--accent, #ffd166);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--accent, #ffd166);
        }

        /* =========================================================
           ESCENA 3D DEL LIBRO REALISTA
           ========================================================= */
        .book-scene {
            perspective: 2500px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 35px auto;
            position: relative;
            user-select: none;
        }

        .book-container {
            width: 1060px;
            max-width: 96vw;
            height: 735px;
            position: relative;
            transform-style: preserve-3d;
            background: #1b0a2a;
            border-radius: 12px 18px 18px 12px;
            border: 8px solid #240e38;
            box-shadow:
                0 0 0 1px #461e68,
                3px 3px 0 #ede3cf,
                4px 4px 0 #dfd3bd,
                6px 6px 0 #ece1cc,
                7px 7px 0 #d9cca8,
                10px 10px 0 #e6dcc8,
                11px 11px 0 #cfc09c,
                0 30px 85px rgba(0, 0, 0, 0.95),
                0 0 45px rgba(199, 125, 255, 0.22);
        }

        /* Lomo central */
        .book-center-spine {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 24px;
            transform: translateX(-50%);
            background: linear-gradient(90deg,
                    rgba(45, 28, 12, 0.45) 0%,
                    rgba(255, 255, 255, 0.35) 50%,
                    rgba(45, 28, 12, 0.45) 100%);
            box-shadow: 0 0 18px rgba(45, 28, 12, 0.5);
            z-index: 40;
            pointer-events: none;
        }

        /* Cinta marcapáginas */
        .bookmark-ribbon {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 18px;
            height: 85px;
            background: linear-gradient(180deg, #ffd166 0%, #d90429 60%, #7209b7 100%);
            box-shadow: 0 8px 22px rgba(217, 4, 41, 0.65);
            z-index: 50;
            border-radius: 0 0 4px 4px;
            pointer-events: none;
        }

        .bookmark-ribbon::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            border-left: 9px solid #7209b7;
            border-right: 9px solid #7209b7;
            border-bottom: 10px solid transparent;
        }

        /* Páginas Base */
        .base-page {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50%;
            height: 100%;
            overflow: hidden;
            background: #faf7f0;
        }

        .base-page.left {
            left: 0;
            border-radius: 6px 0 0 6px;
            z-index: 5;
        }

        .base-page.right {
            right: 0;
            border-radius: 0 6px 6px 0;
            z-index: 5;
        }

        /* Contenido Interior de la Hoja de Papel (Sin encabezados repetitivos) */
        .page-sheet-content {
            width: 100%;
            height: 100%;
            background: #faf7f0;
            background-image:
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(245, 238, 224, 0.45) 100%),
                linear-gradient(135deg, #fefcf8 0%, #f7f1e3 50%, #f2eae0 100%);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            border: 1px solid #e5d8bf;
        }

        .is-left-page .page-sheet-content {
            padding: 22px 32px 10px 38px;
            border-radius: 6px 0 0 6px;
            box-shadow:
                inset -28px 0 35px rgba(80, 55, 25, 0.16),
                inset 0 0 0 1px rgba(160, 130, 90, 0.15);
            border-right: 1px solid rgba(60, 40, 20, 0.2);
        }

        .is-right-page .page-sheet-content {
            padding: 22px 38px 10px 32px;
            border-radius: 0 6px 6px 0;
            box-shadow:
                inset 28px 0 35px rgba(80, 55, 25, 0.16),
                inset 0 0 0 1px rgba(160, 130, 90, 0.15);
            border-left: 1px solid rgba(60, 40, 20, 0.2);
        }

        /* Cuerpo del Texto - Flujo editorial impecable sin barras de desplazamiento */
        .page-body {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-right: 0;
            padding-bottom: 2px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        .page-body::-webkit-scrollbar {
            display: none;
        }

        .page-body p {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 0.92rem;
            line-height: 1.52;
            color: #241a13;
            margin: 0 0 5px 0;
            text-align: justify;
            text-justify: inter-word;
            text-indent: 0 !important;
            letter-spacing: 0.05px;
        }

        /* Letra Inicial Inline - Sin separación excesiva */
        .initial-letter {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: #800e26;
            line-height: 1;
            display: inline-block;
            vertical-align: baseline;
            margin-right: 1px;
        }

        /* Encabezado del Capítulo - Solo aparece una vez al inicio del capítulo */
        .chapter-opening-header {
            margin-bottom: 10px;
            text-align: left;
            border-bottom: 1px dashed rgba(140, 107, 56, 0.25);
            padding-bottom: 5px;
        }

        .ch-badge {
            display: inline-block;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 2px;
            color: #800e26;
            text-transform: uppercase;
            margin-bottom: 3px;
        }

        .ch-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.24rem;
            font-weight: 700;
            color: #2d1804;
            margin: 0;
            line-height: 1.28;
        }

        /* Cajas de Diálogo y Citas */
        .book-dialogue-box {
            background: rgba(140, 107, 56, 0.08);
            border-left: 3px solid #c4974f;
            padding: 6px 12px;
            margin: 8px 0;
            font-family: 'Inter', sans-serif;
            font-style: italic;
            font-size: 0.88rem;
            color: #4a341b;
            border-radius: 0 8px 8px 0;
        }

        .book-dialogue-box.voice-audio-box {
            border-left-color: #800e26;
            background: rgba(128, 14, 38, 0.06);
            display: flex;
            align-items: center;
            gap: 8px;
            color: #800e26;
            font-weight: 600;
        }

        .book-quote-banner {
            background: linear-gradient(135deg, rgba(140, 107, 56, 0.12), rgba(128, 14, 38, 0.08));
            border: 1px dashed rgba(140, 107, 56, 0.35);
            border-radius: 8px;
            padding: 8px 12px;
            margin: 8px 0;
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 0.92rem;
            line-height: 1.5;
            color: #381f08;
            text-align: center;
        }

        .book-quote-banner.heart-accent {
            border-color: rgba(128, 14, 38, 0.4);
            color: #800e26;
            font-weight: 700;
            font-size: 1.25rem;
            letter-spacing: 2px;
        }

        .book-chat-preview {
            background: #ffffff;
            border: 1px solid #d4c5a9;
            border-radius: 8px;
            padding: 6px 12px;
            margin: 6px 0;
            display: inline-block;
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            color: #1e1e1e;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .book-chat-preview .chat-sender {
            font-weight: 700;
            color: #800e26;
            margin-right: 6px;
        }

        .book-romantic-bullets {
            list-style: none;
            padding-left: 0;
            margin: 6px 0 10px 0;
        }

        .book-romantic-bullets li {
            position: relative;
            padding-left: 18px;
            font-family: 'Playfair Display', serif;
            font-size: 0.9rem;
            color: #241a13;
            margin-bottom: 5px;
            line-height: 1.4;
        }

        .book-romantic-bullets li::before {
            content: '✦';
            position: absolute;
            left: 0;
            color: #c4974f;
            font-size: 0.72rem;
        }

        .highlight-name-lead {
            font-size: 1.28rem !important;
            color: #800e26 !important;
            letter-spacing: 1px;
            text-align: center !important;
            text-indent: 0 !important;
            margin: 8px 0 !important;
        }

        .final-rat-promise {
            font-size: 1.02rem !important;
            color: #800e26 !important;
            margin-top: 6px !important;
        }

        .book-final-conversation {
            background: rgba(140, 107, 56, 0.08);
            border-radius: 8px;
            padding: 8px 12px;
            margin: 6px 0 8px 0;
        }

        .book-final-conversation p {
            margin-bottom: 4px;
            text-indent: 0;
        }

        /* Tarjetas de Recuerdo / Anecdotas para páginas elegantes y llenas */
        .book-memory-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(247, 240, 227, 0.85));
            border: 1px dashed rgba(196, 151, 79, 0.5);
            border-radius: 10px;
            padding: 10px 16px;
            margin: 14px 0 6px 0;
            box-shadow: 0 3px 10px rgba(140, 107, 56, 0.08);
            position: relative;
        }

        .book-memory-card.countdown-style {
            border-color: rgba(128, 14, 38, 0.4);
            background: linear-gradient(135deg, rgba(255, 240, 243, 0.7), rgba(247, 240, 227, 0.85));
        }

        .memory-card-header {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 4px;
        }

        .memory-pin {
            font-size: 0.95rem;
        }

        .memory-tag {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #800e26;
            text-transform: uppercase;
        }

        .memory-card-quote {
            font-family: 'Playfair Display', serif !important;
            font-style: italic !important;
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            color: #4a341b !important;
            margin: 0 !important;
            text-align: center !important;
            text-indent: 0 !important;
        }

        .book-decorative-vignette {
            text-align: center;
            margin: 14px 0 6px 0;
        }

        .vignette-svg {
            width: 90px;
            height: 18px;
        }

        .dialogue-line-group {
            line-height: 1.6 !important;
            margin-bottom: 8px !important;
        }

        .epilogue-dedication-to {
            font-size: 1.05rem !important;
            color: #800e26 !important;
            margin-bottom: 6px !important;
            letter-spacing: 0.5px;
        }

        /* Pie de Página en Papel */
        .page-footer {
            padding-top: 4px;
            border-top: 1px solid rgba(140, 107, 56, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 4px;
            flex-shrink: 0;
            height: 24px;
        }

        .page-footer .page-num {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 0.85rem;
            color: #8c6b38;
            letter-spacing: 3px;
        }

        /* Portada Interior */
        .book-cover-inner {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 15px 10px;
        }

        .book-crest-ornament {
            width: 48px;
            height: 48px;
            margin-bottom: 10px;
        }

        .cover-pretitle {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 2.5px;
            color: #8c6b38;
            text-transform: uppercase;
            margin-bottom: 8px;
        }

        .cover-main-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.1rem;
            font-weight: 700;
            color: #2b1402;
            margin: 0 0 10px 0;
            line-height: 1.2;
        }

        .cover-divider-line {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c4974f, transparent);
            margin: 0 auto 14px auto;
        }

        .cover-quote {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 0.92rem;
            line-height: 1.55;
            color: #4f3b25;
            max-width: 380px;
            margin: 0 auto 16px auto;
            text-indent: 0 !important;
            text-align: center !important;
        }

        .cover-author-tag {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            margin-top: 8px;
        }

        .author-label {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: #8c6b38;
        }

        .author-signature {
            font-family: 'Dancing Script', cursive;
            font-size: 2.2rem;
            color: #800e26;
            line-height: 1;
        }

        .author-sub {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.64rem;
            font-weight: 600;
            letter-spacing: 1.5px;
            color: #7d6545;
            text-transform: uppercase;
            margin-top: 3px;
        }

        /* Índice / TOC */
        .book-toc-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .toc-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: #2b1402;
            text-align: center;
            margin: 0 0 10px 0;
            padding-bottom: 6px;
            border-bottom: 1px solid rgba(140, 107, 56, 0.25);
        }

        .toc-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
            overflow-y: auto;
            max-height: 480px;
            padding-right: 6px;
        }

        .toc-list li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            background: rgba(140, 107, 56, 0.05);
            border: 1px solid rgba(140, 107, 56, 0.15);
        }

        .toc-list li:hover {
            background: rgba(128, 14, 38, 0.08);
            border-color: #800e26;
            transform: translateX(3px);
        }

        .toc-item-title {
            font-family: 'Playfair Display', serif;
            font-size: 0.84rem;
            font-weight: 600;
            color: #2d1804;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 310px;
        }

        .toc-item-page {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.68rem;
            font-weight: 700;
            color: #800e26;
            letter-spacing: 1px;
            flex-shrink: 0;
        }

        .btn-toc-start {
            margin-top: 10px;
            width: 100%;
            background: linear-gradient(135deg, #800e26, #a33b54);
            color: #ffffff;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            padding: 9px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
        }

        .btn-toc-start:hover {
            background: #600a1c;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(128, 14, 38, 0.35);
        }

        /* Dedicatoria Final (Epílogo) */
        .dedication-box {
            margin-top: 4px;
            background: rgba(140, 107, 56, 0.08);
            border: 1px dashed rgba(140, 107, 56, 0.4);
            border-radius: 10px;
            padding: 4px 14px 4px 14px;
            text-align: right;
            box-shadow: inset 0 0 14px rgba(140, 107, 56, 0.07);
        }

        .dedication-phrase {
            font-family: 'Inter', sans-serif !important;
            font-style: italic;
            font-size: 0.72rem !important;
            color: #634a2e !important;
            margin: 0 0 1px 0 !important;
            text-indent: 0 !important;
            text-align: right !important;
        }

        .dedication-name {
            font-family: 'Dancing Script', cursive;
            font-size: 1.55rem;
            color: #800e26;
            margin: 0;
            line-height: 1;
        }

        .dedication-date {
            font-family: 'Montserrat', sans-serif !important;
            font-size: 0.60rem !important;
            font-weight: 700;
            letter-spacing: 0.8px;
            color: #a33b54 !important;
            text-transform: uppercase;
            margin: 1px 0 0 0 !important;
            text-indent: 0 !important;
            text-align: right !important;
        }

        /* Hoja Dinámica 3D de Paso de Página */
        .turning-leaf {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            transform-origin: left center;
            transform-style: preserve-3d;
            z-index: 30;
            pointer-events: none;
            display: none;
        }

        .turning-leaf.flipping-forward {
            display: block;
            animation: flipForwardAnim 0.75s cubic-bezier(0.35, 0.05, 0.2, 1) forwards;
        }

        .turning-leaf.flipping-backward {
            display: block;
            animation: flipBackwardAnim 0.75s cubic-bezier(0.35, 0.05, 0.2, 1) forwards;
        }

        @keyframes flipForwardAnim {
            0% { transform: rotateY(0deg); box-shadow: 0 10px 25px rgba(50, 30, 10, 0.25); }
            100% { transform: rotateY(-180deg); box-shadow: -10px 10px 25px rgba(50, 30, 10, 0.25); }
        }

        @keyframes flipBackwardAnim {
            0% { transform: rotateY(-180deg); box-shadow: -10px 10px 25px rgba(50, 30, 10, 0.25); }
            100% { transform: rotateY(0deg); box-shadow: 0 10px 25px rgba(50, 30, 10, 0.25); }
        }

        .turning-face {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            overflow: hidden;
        }

        .turning-face.front {
            border-radius: 0 6px 6px 0;
            z-index: 2;
        }

        .turning-face.back {
            transform: rotateY(180deg);
            border-radius: 6px 0 0 6px;
            z-index: 1;
        }

        /* Modal Cajón de Índice de Capítulos */
        .toc-drawer-modal {
            position: fixed;
            inset: 0;
            background: rgba(11, 4, 22, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .toc-drawer-modal.open {
            opacity: 1;
            pointer-events: auto;
        }

        .toc-modal-box {
            background: #18092a;
            border: 1px solid rgba(255, 209, 102, 0.4);
            border-radius: 20px;
            width: 90%;
            max-width: 580px;
            padding: 24px 28px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 209, 102, 0.15);
            position: relative;
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }

        .toc-drawer-modal.open .toc-modal-box {
            transform: scale(1);
        }

        .toc-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            border-bottom: 1px solid rgba(199, 125, 255, 0.25);
            padding-bottom: 10px;
        }

        .toc-modal-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.45rem;
            color: #ffd166;
            margin: 0;
        }

        .btn-close-modal {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .btn-close-modal:hover {
            background: rgba(255, 77, 109, 0.3);
            border-color: #ff4d6d;
        }

        .toc-modal-list {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 60vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .toc-modal-list li {
            padding: 10px 16px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(199, 125, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .toc-modal-list li:hover,
        .toc-modal-list li.current-active {
            background: linear-gradient(135deg, rgba(255, 183, 3, 0.2), rgba(199, 125, 255, 0.25));
            border-color: #ffd166;
            transform: translateX(4px);
        }

        .toc-modal-list li.current-active .modal-item-title {
            color: #ffd166;
            font-weight: 700;
        }

        .modal-item-title {
            font-family: 'Playfair Display', serif;
            font-size: 0.95rem;
            color: #ffffff;
        }

        .modal-item-badge {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.72rem;
            color: #ffd166;
            font-weight: 700;
        }

        /* Navegación Inferior */
        .book-bottom-navigation {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }

        .nav-btn-action {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 1px;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 22px;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(199, 125, 255, 0.3);
            transition: all 0.25s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .nav-btn-action svg {
            width: 15px;
            height: 15px;
            transition: transform 0.2s ease;
        }

        .nav-btn-action:hover {
            background: linear-gradient(135deg, rgba(199, 125, 255, 0.3), rgba(255, 183, 3, 0.3));
            border-color: var(--accent, #ffd166);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .nav-btn-action.next-chapter {
            background: linear-gradient(135deg, #9d4edd, #ff758f);
            border-color: transparent;
        }

        .nav-btn-action.next-chapter:hover {
            box-shadow: 0 0 20px rgba(255, 117, 143, 0.5);
            transform: translateY(-2px);
        }

        /* Reproductor Global Flotante */
        .floating-music-dock {
            position: fixed;
            bottom: 22px;
            right: 25px;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(20, 8, 38, 0.92);
            border: 1px solid rgba(255, 183, 3, 0.5);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 183, 3, 0.25);
            padding: 8px 18px;
            border-radius: 35px;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .floating-music-dock:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 183, 3, 0.4);
        }

        .dock-play-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent, #ffd166), #ff758f);
            border: none;
            color: #0b0416;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 0 12px rgba(255, 183, 3, 0.5);
            transition: transform 0.2s ease;
            flex-shrink: 0;
        }

        .dock-play-btn:hover {
            transform: scale(1.08);
        }

        .dock-play-btn svg {
            width: 17px;
            height: 17px;
        }

        .dock-track-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .dock-track-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            color: #ffffff;
        }

        .dock-track-artist {
            font-family: 'Inter', sans-serif;
            font-size: 0.65rem;
            color: #f1e7fe;
            opacity: 0.8;
        }

        .dock-equalizer {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 12px;
            margin-top: 2px;
        }

        .dock-equalizer span {
            width: 3px;
            background: var(--accent, #ffd166);
            border-radius: 2px;
            height: 3px;
            transition: height 0.2s ease;
        }

        .dock-equalizer.playing span:nth-child(1) {
            animation: eqBar 0.8s infinite ease-in-out;
        }

        .dock-equalizer.playing span:nth-child(2) {
            animation: eqBar 1.1s infinite ease-in-out 0.2s;
        }

        .dock-equalizer.playing span:nth-child(3) {
            animation: eqBar 0.7s infinite ease-in-out 0.4s;
        }

        .dock-equalizer.playing span:nth-child(4) {
            animation: eqBar 0.9s infinite ease-in-out 0.1s;
        }

        @keyframes eqBar {
            0%, 100% { height: 3px; }
            50% { height: 12px; }
        }

        .hidden {
            display: none !important;
        }

        /* Responsividad Móvil */
        @media screen and (max-width: 900px) {
            .book-container {
                height: auto;
                min-height: 640px;
                display: flex;
                flex-direction: column;
            }

            .base-page {
                position: relative;
                width: 100%;
                height: auto;
                min-height: 520px;
            }

            .base-page.left {
                border-radius: 6px 6px 0 0;
            }

            .base-page.right {
                border-radius: 0 0 6px 6px;
                border-top: 2px dashed rgba(140, 107, 56, 0.3);
            }

            .book-center-spine,
            .bookmark-ribbon {
                display: none;
            }

            .is-left-page .page-sheet-content,
            .is-right-page .page-sheet-content {
                padding: 24px 20px;
            }

            .book-bottom-navigation {
                flex-direction: column;
            }

            .nav-btn-action {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>

<body>

    <div class="stars"></div>
    <div class="twinkling"></div>
    <canvas id="hearts-canvas"></canvas>

    <!-- Barra de Navegación -->
    <nav class="chapter-navbar">
        <a href="index.html" class="nav-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Volver al Índice</span>
        </a>
        <span class="nav-chapter-badge">Capítulo I · Antes de Encontrarnos</span>
    </nav>

    <!-- Contenedor Principal del Libro -->
    <main class="book-wrapper">

        <!-- Cabecera del Capítulo -->
        <header class="book-header-section">
            <span class="book-header-pre">✦ NUESTRO LIBRO · CAPÍTULO I ✦</span>
            <h1 class="book-header-title">Antes de Encontrarnos</h1>
            <p class="book-header-sub">
                La historia de cómo una chica que iba a ser “una conocida más” terminó siendo alguien que ya no imagino fuera de mi vida.
            </p>
        </header>

        <!-- Barra de Navegación del Libro -->
        <div class="book-nav-bar">
            <button class="book-nav-btn prev-btn" id="btn-prev-page" onclick="prevSpread()" disabled
                title="Página anterior">
                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Anterior</span>
            </button>

            <button class="book-nav-btn btn-toc-modal" onclick="openTocModal()" title="Ver Índice de Capítulos">
                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
                <span>Índice de Capítulos</span>
            </button>

            <div class="page-counter-pill" id="page-counter-pill">
                <span class="counter-dot"></span>
                <span id="counter-text">Páginas 1 &amp; 2 de 20</span>
                <span class="counter-dot"></span>
            </div>

            <button class="book-nav-btn next-btn" id="btn-next-page" onclick="nextSpread()" title="Siguiente página">
                <span>Siguiente</span>
                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>

        <!-- ESCENA 3D DEL LIBRO REALISTA -->
        <div class="book-scene">
            <div class="book-container" id="interactive-book">

                <!-- Cinta marcapáginas de seda -->
                <div class="bookmark-ribbon"></div>

                <!-- Lomo central del libro -->
                <div class="book-center-spine"></div>

                <!-- BASE IZQUIERDA: PÁGINA ACTUAL IZQUIERDA -->
                <div class="base-page left is-left-page" id="base-left-page">
                    <div class="page-sheet-content">
                        <div class="page-body" id="left-page-body">
                            <!-- Contenido inyectado dinámicamente -->
                        </div>
                        <div class="page-footer">
                            <span class="page-num" id="left-page-num">— I —</span>
                        </div>
                    </div>
                </div>

                <!-- BASE DERECHA: PÁGINA ACTUAL DERECHA -->
                <div class="base-page right is-right-page" id="base-right-page">
                    <div class="page-sheet-content">
                        <div class="page-body" id="right-page-body">
                            <!-- Contenido inyectado dinámicamente -->
                        </div>
                        <div class="page-footer">
                            <span class="page-num" id="right-page-num">— II —</span>
                        </div>
                    </div>
                </div>

                <!-- HOJA DINÁMICA DE GIRO 3D -->
                <div class="turning-leaf" id="turning-leaf">
                    <div class="turning-face front is-right-page">
                        <div class="page-sheet-content" id="turning-front-content"></div>
                    </div>
                    <div class="turning-face back is-left-page">
                        <div class="page-sheet-content" id="turning-back-content"></div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Navegación Inferior -->
        <div class="book-bottom-navigation">
            <a href="index.html" class="nav-btn-action">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Volver a la Línea de Tiempo</span>
            </a>
            <a href="capitulo2.html" class="nav-btn-action next-chapter">
                <span>Avanzar al siguiente capítulo</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </a>
        </div>

    </main>

    <!-- Modal Cajón de Índice de Capítulos -->
    <div class="toc-drawer-modal" id="tocModal" onclick="closeTocModal(event)">
        <div class="toc-modal-box" onclick="event.stopPropagation()">
            <div class="toc-modal-header">
                <h3 class="toc-modal-title">Índice del Libro</h3>
                <button class="btn-close-modal" onclick="closeTocModal()" aria-label="Cerrar índice">✕</button>
            </div>
            <ul class="toc-modal-list" id="tocModalList">
                <!-- Inyectado dinámicamente -->
            </ul>
        </div>
    </div>

    <!-- Script de Datos y Control del Libro 3D -->
    <script>
        const SPREADS_DATA = ${JSON.stringify(spreads)};

        // Audio de pasar página
        const flipAudioPool = [
            new Audio('assets/page-flip.mp3'),
            new Audio('assets/page-flip.mp3'),
            new Audio('assets/page-flip.mp3')
        ];
        let poolIdx = 0;

        function playFlipSound() {
            try {
                const sound = flipAudioPool[poolIdx];
                poolIdx = (poolIdx + 1) % flipAudioPool.length;
                sound.currentTime = 0;
                sound.volume = 0.95;
                const p = sound.play();
                if (p) p.catch(() => {});
            } catch (e) { }
        }

        let currentSpreadIdx = 0; // 0 a 9 (10 spreads)
        let isAnimating = false;

        const leftPageBody = document.getElementById('left-page-body');
        const leftPageNum = document.getElementById('left-page-num');

        const rightPageBody = document.getElementById('right-page-body');
        const rightPageNum = document.getElementById('right-page-num');

        const btnPrev = document.getElementById('btn-prev-page');
        const btnNext = document.getElementById('btn-next-page');
        const counterText = document.getElementById('counter-text');

        const turningLeaf = document.getElementById('turning-leaf');
        const turningFront = document.getElementById('turning-front-content');
        const turningBack = document.getElementById('turning-back-content');

        function renderSpreadContent(idx) {
            const data = SPREADS_DATA[idx];
            if (!data) return;

            leftPageBody.innerHTML = data.left.body;
            leftPageNum.textContent = data.left.pageNum;

            rightPageBody.innerHTML = data.right.body;
            rightPageNum.textContent = data.right.pageNum;

            // Scroll al tope de cada página
            leftPageBody.scrollTop = 0;
            rightPageBody.scrollTop = 0;

            // Actualizar contador y botones
            const p1 = (idx * 2) + 1;
            const p2 = p1 + 1;
            counterText.textContent = \`\${data.shortBadge} · Págs \${p1} & \${p2} de 20\`;

            btnPrev.disabled = (idx === 0);
            btnNext.disabled = (idx === SPREADS_DATA.length - 1);

            updateTocActiveState();
            try {
                history.replaceState(null, '', '#spread=' + (idx + 1));
            } catch (e) {}

            // Desbloqueo del Primer Dígito (1) y Capítulo 2 al llegar a la hoja final del libro
            if (idx === SPREADS_DATA.length - 1) {
                if (typeof window.unlockClueDigit === 'function') {
                    window.unlockClueDigit(1, '1', 'Capítulo I: El Libro', '¡Llegaste a la última página de nuestra historia inicial! El primer dígito del candado final es el 1.');
                }
            }
        }

        function nextSpread() {
            if (isAnimating || currentSpreadIdx >= SPREADS_DATA.length - 1) return;
            isAnimating = true;
            playFlipSound();

            const nextIdx = currentSpreadIdx + 1;

            // Preparar hoja móvil con cara frontal (página actual dcha) y trasera (página siguiente izq)
            turningFront.innerHTML = document.querySelector('#base-right-page .page-sheet-content').innerHTML;
            
            const nextData = SPREADS_DATA[nextIdx];
            turningBack.innerHTML = \`
                <div class="page-body">\${nextData.left.body}</div>
                <div class="page-footer">
                    <span class="page-num">\${nextData.left.pageNum}</span>
                </div>
            \`;

            turningLeaf.className = 'turning-leaf flipping-forward';

            setTimeout(() => {
                currentSpreadIdx = nextIdx;
                renderSpreadContent(currentSpreadIdx);
            }, 380);

            setTimeout(() => {
                turningLeaf.className = 'turning-leaf';
                isAnimating = false;
            }, 760);
        }

        function prevSpread() {
            if (isAnimating || currentSpreadIdx <= 0) return;
            isAnimating = true;
            playFlipSound();

            const prevIdx = currentSpreadIdx - 1;

            // Preparar hoja móvil de retorno
            const prevData = SPREADS_DATA[prevIdx];
            turningFront.innerHTML = \`
                <div class="page-body">\${prevData.right.body}</div>
                <div class="page-footer">
                    <span class="page-num">\${prevData.right.pageNum}</span>
                </div>
            \`;

            turningBack.innerHTML = document.querySelector('#base-left-page .page-sheet-content').innerHTML;

            turningLeaf.className = 'turning-leaf flipping-backward';

            setTimeout(() => {
                currentSpreadIdx = prevIdx;
                renderSpreadContent(currentSpreadIdx);
            }, 380);

            setTimeout(() => {
                turningLeaf.className = 'turning-leaf';
                isAnimating = false;
            }, 760);
        }

        function goToSpread(spreadNum) {
            const targetIdx = spreadNum - 1;
            if (targetIdx < 0 || targetIdx >= SPREADS_DATA.length || targetIdx === currentSpreadIdx) {
                closeTocModal();
                return;
            }
            playFlipSound();
            currentSpreadIdx = targetIdx;
            renderSpreadContent(currentSpreadIdx);
            closeTocModal();
        }

        // Navegación con teclado
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSpread();
            if (e.key === 'ArrowLeft') prevSpread();
            if (e.key === 'Escape') closeTocModal();
        });

        // Modal de Índice
        const tocModal = document.getElementById('tocModal');
        const tocModalList = document.getElementById('tocModalList');

        function buildTocModal() {
            tocModalList.innerHTML = '';
            SPREADS_DATA.forEach((s, idx) => {
                const li = document.createElement('li');
                li.id = 'modal-toc-' + idx;
                const p1 = (idx * 2) + 1;
                li.innerHTML = \`
                    <span class="modal-item-title">\${s.title}</span>
                    <span class="modal-item-badge">Pág. \${p1}</span>
                \`;
                li.onclick = () => goToSpread(idx + 1);
                tocModalList.appendChild(li);
            });
        }

        function updateTocActiveState() {
            SPREADS_DATA.forEach((_, idx) => {
                const item = document.getElementById('modal-toc-' + idx);
                if (item) {
                    if (idx === currentSpreadIdx) {
                        item.classList.add('current-active');
                    } else {
                        item.classList.remove('current-active');
                    }
                }
            });
        }

        function openTocModal() {
            updateTocActiveState();
            tocModal.classList.add('open');
        }

        function closeTocModal() {
            tocModal.classList.remove('open');
        }

        // Soporte para abrir directamente un spread via query param o hash (ej: capitulo1.html?spread=5 o #spread=5)
        function checkUrlSpread() {
            const urlParams = new URLSearchParams(window.location.search);
            const querySpread = urlParams.get('spread');
            const hashMatch = window.location.hash.match(/spread=(\d+)/);
            const rawVal = querySpread || (hashMatch ? hashMatch[1] : null);
            if (rawVal) {
                const target = parseInt(rawVal, 10) - 1;
                if (target >= 0 && target < SPREADS_DATA.length) {
                    currentSpreadIdx = target;
                }
            }
        }
        checkUrlSpread();
        window.addEventListener('hashchange', () => {
            checkUrlSpread();
            renderSpreadContent(currentSpreadIdx);
        });

        // Inicialización
        buildTocModal();
        renderSpreadContent(currentSpreadIdx);

        // Clics en los bordes del libro para hojear intuitivamente
        const bookElem = document.getElementById('interactive-book');
        if (bookElem) {
            bookElem.addEventListener('click', (e) => {
                if (e.target.closest('.toc-list') || e.target.closest('button') || e.target.closest('.toc-drawer-modal')) return;
                const sel = window.getSelection().toString();
                if (sel && sel.length > 0) return;

                const rect = bookElem.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX > rect.width / 2) {
                    nextSpread();
                } else {
                    prevSpread();
                }
            });
        }

        // Canvas de Corazones Flotantes de Fondo
        const canvas = document.getElementById('hearts-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width, height;
            let hearts = [];

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            class Heart {
                constructor() { this.reset(); }
                reset() {
                    this.x = Math.random() * width;
                    this.y = height + Math.random() * 200;
                    this.size = Math.random() * 3 + 1.5;
                    this.speedY = Math.random() * 0.8 + 0.35;
                    this.speedX = (Math.random() - 0.5) * 0.4;
                    this.opacity = Math.random() * 0.45 + 0.15;
                    this.color = Math.random() > 0.5 ? '#ff758f' : '#c77dff';
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
                    const topCurveHeight = this.size * 0.3;
                    ctx.moveTo(this.x, this.y + topCurveHeight);
                    ctx.bezierCurveTo(this.x, this.y, this.x - this.size, this.y, this.x - this.size, this.y + topCurveHeight);
                    ctx.bezierCurveTo(this.x - this.size, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight), this.x, this.y + this.size * 1.5);
                    ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight), this.x + this.size, this.y + (this.size + topCurveHeight) / 2, this.x + this.size, this.y + topCurveHeight);
                    ctx.bezierCurveTo(this.x + this.size, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }

            for (let i = 0; i < 35; i++) hearts.push(new Heart());

            function animate() {
                ctx.clearRect(0, 0, width, height);
                for (let i = 0; i < hearts.length; i++) {
                    hearts[i].update();
                    hearts[i].draw();
                }
                requestAnimationFrame(animate);
            }
            animate();
        }
    </script>
    <script src="progress-tracker.js"></script>
</body>

</html>
`;

fs.writeFileSync('capitulo1.html', htmlContent, 'utf8');
console.log('capitulo1.html successfully regenerated without repetitive headers, with clean initial letters and no overflowing text!');
