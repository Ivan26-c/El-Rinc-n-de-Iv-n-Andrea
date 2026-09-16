const fs = require('fs');

const spreads = [
  // Spread 1: Portada & Tabla de Contenidos
  {
    id: 1,
    title: "Portada & Presentación",
    shortBadge: "PORTADA",
    left: {
      body: `
                <div class="book-cover-inner">
                    <div class="book-crest-ornament">
                        <svg viewBox="0 0 60 60" class="ornament-svg">
                            <path d="M30 5 C35 18 45 25 55 30 C45 35 35 42 30 55 C25 42 15 35 5 30 C15 25 25 18 30 5 Z" fill="none" stroke="#d4af37" stroke-width="1.8"/>
                            <circle cx="30" cy="30" r="4" fill="#d4af37"/>
                        </svg>
                    </div>
                    <span class="cover-pretitle">✦ MEMORIAS DE NUESTRO AMOR ✦</span>
                    <h1 class="cover-main-title">Antes de Encontrarnos</h1>
                    <div class="cover-divider-line"></div>
                    <p class="cover-quote">
                        «La historia de cómo una chica que iba a ser “una conocida más” terminó siendo alguien que ya no imagino fuera de mi vida.»
                    </p>
                    <div class="cover-author-tag">
                        <span class="author-label">ESCRITO POR</span>
                        <span class="author-signature">Iván</span>
                        <span class="author-sub">Para la niña de mis ojos · 26 / 02 / 2026</span>
                    </div>
                </div>
            `,
      pageNum: "— I —"
    },
    right: {
      body: `
                <div class="book-toc-container">
                    <h3 class="toc-title">Índice del Libro</h3>
                    <ul class="toc-list">
                        <li onclick="goToSpread(2)">
                            <span class="toc-item-title">Prólogo: Todo empezó por culpa de Sierpito</span>
                            <span class="toc-item-page">Pág. 3</span>
                        </li>
                        <li onclick="goToSpread(3)">
                            <span class="toc-item-title">Capítulo I: Una conversación que se salió de control</span>
                            <span class="toc-item-page">Pág. 5</span>
                        </li>
                        <li onclick="goToSpread(4)">
                            <span class="toc-item-title">Capítulo II: Minecraft, noches largas y otras formas de enamorarse</span>
                            <span class="toc-item-page">Pág. 7</span>
                        </li>
                        <li onclick="goToSpread(5)">
                            <span class="toc-item-title">Capítulo III: Andrea, la chica que me manda fotos sin que se las pida</span>
                            <span class="toc-item-page">Pág. 9</span>
                        </li>
                        <li onclick="goToSpread(6)">
                            <span class="toc-item-title">Capítulo IV: La Andrea que conozco</span>
                            <span class="toc-item-page">Pág. 11</span>
                        </li>
                        <li onclick="goToSpread(7)">
                            <span class="toc-item-title">Capítulo V: Nosotros tampoco somos perfectos</span>
                            <span class="toc-item-page">Pág. 13</span>
                        </li>
                        <li onclick="goToSpread(8)">
                            <span class="toc-item-title">Capítulo VI: Las pequeñas cosas</span>
                            <span class="toc-item-page">Pág. 15</span>
                        </li>
                        <li onclick="goToSpread(9)">
                            <span class="toc-item-title">Capítulo VII: Antes de conocerte en persona</span>
                            <span class="toc-item-page">Pág. 17</span>
                        </li>
                        <li onclick="goToSpread(10)">
                            <span class="toc-item-title">Epílogo: Esto no es el final</span>
                            <span class="toc-item-page">Pág. 19</span>
                        </li>
                    </ul>
                    <div class="toc-quick-start">
                        <button class="btn-toc-start" onclick="goToSpread(2)">
                            <span>Abrir Prólogo</span>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>
            `,
      pageNum: "— II —"
    }
  },

  // Spread 2: Prólogo
  {
    id: 2,
    title: "Prólogo: Bueno… todo empezó por culpa de Sierpito",
    shortBadge: "PRÓLOGO",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">PRÓLOGO</span>
                    <h2 class="ch-title">Bueno… todo empezó por culpa de Sierpito</h2>
                </div>
                <p><span class="initial-letter">H</span>ay historias de amor que empiezan de una manera bonita.</p>
                <p>Dos personas se miran. Se gustan. Se acercan. Y comienza todo.</p>
                <p class="accent-quote-para"><strong>La nuestra no.</strong></p>
                <p>La nuestra empezó porque Sierpe me preguntó si quería conocer a una chica. Y yo dije que sí.</p>
                <p>No porque estuviera buscando al amor de mi vida ni porque tuviera esa sensación de <em>“hoy voy a conocer a la persona que cambiará mi vida”</em>.</p>
                <p>No. Simplemente estaba soltero, no tenía nada que perder y pensé:</p>
                <div class="book-dialogue-box">
                    “Bueno, a ver que onda xd”
                </div>
                <p>Incluso pensé que quizás ibas a ser una rara más de internet. Porque, siendo sinceros, conocer gente por internet es un poco una lotería.</p>
                <p>Y entonces apareciste tú.</p>
                <p class="highlight-name-lead"><strong>Andrea.</strong></p>
            `,
      pageNum: "— 3 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">L</span>a chica que supuestamente solamente iba a conocer. La chica con la que iba a hablar un rato. La chica que, en teoría, iba a ser una persona más que conocí por internet.</p>
                <p class="italic-lead">Qué poco sabía yo.</p>
                <p>Porque el <strong>26 de febrero de 2026 a las 22:54</strong>, sin tener ni idea de lo que estaba empezando, comenzó una de las historias más bonitas que me han pasado.</p>
                <p>Y lo gracioso es que ni siquiera empezó de una manera especialmente romántica. Simplemente empezamos a hablar.</p>
                <p>Y después seguimos hablando. Y luego otra vez. Y otra.</p>
                <div class="book-quote-banner">
                    «Hasta que llegó un punto en el que hablar contigo dejó de ser algo que simplemente hacía. Se convirtió en algo que quería hacer.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 4 —"
    }
  },

  // Spread 3: Capítulo I
  {
    id: 3,
    title: "Capítulo I: Una conversación que se salió de control",
    shortBadge: "CAPÍTULO I",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO I</span>
                    <h2 class="ch-title">Una conversación que se salió de control</h2>
                </div>
                <p><span class="initial-letter">A</span>l principio no nos conocíamos prácticamente nada. Éramos dos personas hablando de cualquier tontería que apareciera.</p>
                <p>Pero poco a poco fui descubriendo cómo eras. Y mientras más te conocía, más ganas tenía de seguir haciéndolo.</p>
                <p>Creo que una de las primeras cosas que me llamó la atención fue lo fácil que era hablar contigo. No tenía que pensar demasiado qué decir. No tenía que estar fingiendo ser alguien que no soy. Simplemente hablábamos.</p>
                <p>Y así fueron pasando los días. Hasta que empezamos a hablar prácticamente todos los días. Y eso es algo que parece pequeño hasta que te das cuenta de lo que significa.</p>
                <p>Porque cuando alguien empieza a formar parte de tu rutina, empieza a aparecer en tu cabeza incluso cuando no está hablando contigo.</p>
                <p>Te pasa algo durante el día y quieres contárselo. Ves algo y piensas que le gustaría. Te ocurre alguna tontería y sabes exactamente a quién se la quieres contar.</p>
            `,
      pageNum: "— 5 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">E</span>so empezó a pasarme contigo. Y también empezaste a preocuparte por mí.</p>
                <p>Hubo momentos en los que yo no estaba bien y tú lo notabas. Al principio no podía contarte muchas cosas. Apenas nos estábamos conociendo y no era fácil abrirme completamente. Pero con el tiempo entendí algo: <em>tú realmente querías saber cómo estaba</em>. No por curiosidad, sino porque te importaba. Y eso hizo que poco a poco empezara a confiar más en ti.</p>
                <p>Hasta que un día me mandaste un audio. Y dijiste algo tan simple como:</p>
                <div class="book-dialogue-box voice-audio-box">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#800e26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    “Te quiero.”
                </div>
                <p>Y yo me quedé como: <em>¿Qué?</em> Lo escuché. Y lo volví a escuchar. Y probablemente lo escuché más veces de las que debería admitir. Porque me parecía increíble.</p>
                <p>No sé si tú entendiste en ese momento lo mucho que significó para mí. Pero yo sí lo recuerdo. Y creo que fue una de esas pequeñas cosas que hicieron que empezara a mirarte de una manera diferente.</p>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 6 —"
    }
  },

  // Spread 4: Capítulo II
  {
    id: 4,
    title: "Capítulo II: Minecraft, noches largas y otras formas de enamorarse",
    shortBadge: "CAPÍTULO II",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO II</span>
                    <h2 class="ch-title">Minecraft, noches largas y otras formas de enamorarse</h2>
                </div>
                <p><span class="initial-letter">C</span>reo que contigo me fui enamorando sin darme cuenta. No hubo un momento exacto en el que mi cerebro dijera: <em>“Listo, ya está. Estoy enamorado de Andrea.”</em></p>
                <p>Simplemente pasó.</p>
                <p>Empezamos a hablar cada vez más. A quedarnos despiertos. A jugar Minecraft.</p>
                <p>Y Minecraft terminó convirtiéndose en uno de nuestros pequeños lugares. Podíamos entrar al juego con una idea completamente normal y terminar haciendo cualquier estupidez.</p>
                <p>Pero realmente el juego era lo de menos. <strong>Lo importante era que estábamos juntos.</strong></p>
                <p>Porque contigo hasta hacer algo completamente cotidiano podía convertirse en un buen momento.</p>
                <p>Y creo que ahí fue cuando empecé a darme cuenta de que me gustaba demasiado estar contigo.</p>
            `,
      pageNum: "— 7 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">M</span>e gustaba escucharte. Me gustaba hablar contigo. Me gustaba cuando nos quedábamos hasta tarde. Me gustaba cuando simplemente estábamos ahí sin necesidad de hacer nada demasiado especial.</p>
                <p>Y mientras más tiempo pasaba contigo, más me gustabas.</p>
                <p>Hasta que llegó ese momento en el que los dos dejamos de fingir que esto era simplemente una amistad. Empezamos a decirnos cosas más bonitas. Más cariñosas.</p>
                <p>Y finalmente llegó ese momento en el que te dije: <em>“Te quiero.”</em> Y tú me lo devolviste.</p>
                <p>Y después fui yo el primero en decir:</p>
                <div class="book-quote-banner heart-accent">
                    «Te amo.»
                </div>
                <p>Y mira dónde estamos ahora. Todavía me parece gracioso pensar que todo comenzó con:</p>
                <div class="book-dialogue-box">
                    "¿Quieres conocer a una chica?"
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 8 —"
    }
  },

  // Spread 5: Capítulo III
  {
    id: 5,
    title: "Capítulo III: Andrea, la chica que me manda fotos sin que se las pida",
    shortBadge: "CAPÍTULO III",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO III</span>
                    <h2 class="ch-title">Andrea, la chica que me manda fotos sin que se las pida</h2>
                </div>
                <p><span class="initial-letter">H</span>ay muchas cosas que me gustan de ti. Tu voz. Tu forma de hablar. Tu risa. Tus ojos. Tu cara. Tu manera de ser.</p>
                <p>Pero hay algo que me hace mucha gracia: <strong>que de repente me mandes una foto o un video tuyo sin que yo te haya pedido absolutamente nada.</strong></p>
                <p>Y yo estoy tranquilamente haciendo cualquier cosa y de pronto:</p>
                <div class="book-chat-preview">
                    <span class="chat-sender">Andrea:</span> [foto]
                </div>
                <p class="dialogue-line-group">
                    Y yo:<br>
                    ah.<br>
                    Bueno.<br>
                    Mi novia—<br>
                    Bueno, todavía no.<br>
                    <strong>Mi futura esposa. Mucho mejor.</strong>
                </p>
                <p>Y es que sí, todavía no tenemos oficialmente ese título. Pero yo ya tengo bastante claro lo que quiero.</p>
            `,
      pageNum: "— 9 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">Q</span>uiero que algún día podamos mirar atrás y pensar en lo gracioso que era que antes ni siquiera nos hubiéramos conocido en persona. Porque sí, todavía no nos hemos visto cara a cara. Pero eso no significa que no te conozca.</p>
                <p>Te conozco por tu voz. Por tus mensajes. Por tus audios. Por tus fotos. Por tus videos. Por las cosas que me cuentas.</p>
                <p>Por cómo reaccionas cuando estás feliz. Por cómo te pones cuando estás molesta. Por las veces que te preocupas. Por las veces que piensas demasiado. Por las veces que dices algo completamente inesperado.</p>
                <div class="book-quote-banner">
                    «Y también por esa costumbre tuya de decirme “rata”. No sé en qué momento me convertí oficialmente en una rata, pero bueno. Supongo que ya es parte de mi identidad.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 10 —"
    }
  },

  // Spread 6: Capítulo IV
  {
    id: 6,
    title: "Capítulo IV: La Andrea que conozco",
    shortBadge: "CAPÍTULO IV",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO IV</span>
                    <h2 class="ch-title">La Andrea que conozco</h2>
                </div>
                <p><span class="initial-letter">S</span>i tuviera que describirte, diría que eres una persona muy dulce. Muchísimo. Y creo que una de las cosas que más me gusta de ti es que eres tú.</p>
                <p>Y yo también puedo ser completamente yo contigo. No tengo que estar pensando todo el tiempo qué decir. No tengo que ocultarte cosas.</p>
                <p>Puedo contarte lo que me pasa. Puedo hablarte de mi día. Puedo decirte cuando algo me gusta. Cuando algo me molesta. Cuando estoy triste. Cuando estoy feliz. Y tú haces lo mismo conmigo.</p>
                <p>Eso hizo que nuestra relación se sintiera cada vez más real. Porque aunque exista una pantalla entre nosotros, hay cosas que no se sienten lejanas.</p>
                <p>Cuando me dices que me amas, no se siente como si estuvieras lejos. Cuando me cuentas algo que te pasó, siento que estás compartiéndolo conmigo de verdad.</p>
            `,
      pageNum: "— 11 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">Y</span> cuando me mandas una foto de la nada, bueno... Ahí definitivamente siento que estás cerca.</p>
                <p>También me gusta escucharte. Muchísimo. Tu voz tiene algo que me encanta. Podría quedarme escuchándote hablar de cualquier cosa, incluso cuando probablemente tú piensas que estás diciendo la cosa más aburrida del mundo.</p>
                <p>Y tu risa... Tu risa es demasiado tierna. Me contagia.</p>
                <div class="book-dialogue-box">
                    «Y sí, hasta cuando tienes hipo me pareces adorable. No sé cómo lo haces. Es injusto.»
                </div>
                <div class="book-quote-banner heart-accent">
                    «Eres tú en cada detalle, y eso es lo que te hace tan única y especial para mí.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 12 —"
    }
  },

  // Spread 7: Capítulo V
  {
    id: 7,
    title: "Capítulo V: Nosotros tampoco somos perfectos",
    shortBadge: "CAPÍTULO V",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO V</span>
                    <h2 class="ch-title">Nosotros tampoco somos perfectos</h2>
                </div>
                <p><span class="initial-letter">A</span>hora viene la parte en la que tengo que admitir que tampoco somos una pareja perfecta. Bueno... primero habría que decidir si podemos llamarnos pareja oficialmente. Pero dejemos ese detalle.</p>
                <p>La cuestión es que ninguno de los dos es perfecto. Tú tienes tus cosas. Yo tengo las mías. Y hemos tenido momentos difíciles.</p>
                <p>Yo también he cometido errores. Especialmente cuando tú necesitabas cariño y yo no supe dártelo como debía. Y me arrepiento mucho de eso. Porque sé que hubo momentos en los que simplemente necesitabas sentir que yo estaba ahí, y yo no siempre lo hice bien.</p>
                <p>Pero también creo que de eso se trata todo esto: de aprender. No quiero que nuestro objetivo sea convertirnos en dos personas perfectas. Quiero que seamos dos personas que puedan decir:</p>
                <div class="book-dialogue-box">
                    “Esto lo hicimos mal. Vamos a hacerlo mejor.”
                </div>
                <p>Y seguir.</p>
            `,
      pageNum: "— 13 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">S</span>é que tú a veces piensas demasiado. Sé que puedes quedarte atrapada en cosas del pasado. Sé que a veces te preocupas demasiado por lo que podría pasar en el futuro. Y sé que algunas veces hasta puedes llegar a pensar que lo nuestro no va a funcionar.</p>
                <p>Y cuando pasa eso, intento tranquilizarte. No porque tenga una bola de cristal y pueda saber exactamente qué va a pasar. No puedo. Nadie puede.</p>
                <p>Pero tampoco quiero que tengamos miedo de algo que todavía ni siquiera ha sucedido. Porque todavía nos faltan demasiadas cosas: todavía ni siquiera hemos tenido nuestro primer abrazo, no hemos salido juntos, no sabemos cómo será estar uno frente al otro.</p>
                <p>Entonces... ¿cómo vamos a decidir que algo no funcionará si todavía ni siquiera hemos vivido todo lo que nos queda?</p>
                <div class="book-quote-banner">
                    «Yo prefiero intentarlo. Prefiero equivocarme contigo y aprender. Prefiero construir algo poco a poco. Porque no quiero solamente la parte bonita de ti: quiero conocerte completa. Y quiero que tú también conozcas al Iván completo.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 14 —"
    }
  },

  // Spread 8: Capítulo VI
  {
    id: 8,
    title: "Capítulo VI: Las pequeñas cosas",
    shortBadge: "CAPÍTULO VI",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO VI</span>
                    <h2 class="ch-title">Las pequeñas cosas</h2>
                </div>
                <p><span class="initial-letter">U</span>na de las cosas que más me gustan de nosotros es que nuestra historia está llena de pequeñas cosas.</p>
                <ul class="book-romantic-bullets">
                    <li>Minecraft.</li>
                    <li>Las llamadas y las videollamadas.</li>
                    <li>Las fotos que me mandas de la nada y los videos.</li>
                    <li>Las conversaciones que empiezan hablando de una cosa y terminan quién sabe dónde.</li>
                    <li>Las noches en las que seguimos hablando más de lo que deberíamos.</li>
                    <li>Las veces que simplemente estamos juntos.</li>
                    <li>Incluso nuestras tonterías.</li>
                </ul>
                <p>Todo eso termina formando algo mucho más grande.</p>
            `,
      pageNum: "— 15 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">T</span>ambién están esos pequeños detalles que haces por mí. Y creo que por eso me gustan tanto. Porque cuando haces algo para mí, no importa si es algo enorme o algo pequeño: lo que me gusta es saber que pensaste en mí.</p>
                <p>Como aquella carta que me hiciste por mi cumpleaños. Todavía recuerdo todo lo que pusiste: las fotos, las canciones, las cosas que escribiste, las cartas de Sierpito y Sedate. Todo.</p>
                <p>Y hubo una parte que me gustó especialmente: cuando me dijiste que creías que podía cumplir mis metas, que te gustaba cómo me esforzaba y que me deseabas cosas bonitas.</p>
                <p>Y sí... también me deseaste dinero.</p>
                <div class="book-dialogue-box">
                    «Así que espero poder convertirme en tu futuro esposo millonario. Promesa pendiente.»
                </div>
                <div class="book-quote-banner">
                    «Futuro esposo millonario, pero sobre todo, el que siempre te va a cuidar, valorar y amar como te lo mereces.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 16 —"
    }
  },

  // Spread 9: Capítulo VII - CORREGIDO: Página izquierda completa, sin huecos blancos ni emojis
  {
    id: 9,
    title: "Capítulo VII: Antes de conocerte en persona",
    shortBadge: "CAPÍTULO VII",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">CAPÍTULO VII</span>
                    <h2 class="ch-title">Antes de conocerte en persona</h2>
                </div>
                <p><span class="initial-letter">A</span> veces pienso en lo raro que es nuestra historia. Nos conocemos muchísimo, pero todavía no nos hemos encontrado físicamente.</p>
                <p>Es una sensación extraña. Porque sé cómo suena tu voz. Sé cómo te ríes. Sé cómo hablas. Sé muchas cosas de ti. Pero todavía no sé qué se siente abrazarte.</p>
                <p><strong>Y tengo muchas ganas de descubrirlo.</strong></p>
                <p>Quiero saber cómo será verte frente a mí. Quiero poder abrazarte sin que exista una pantalla. Quiero poder darte un beso. Quiero poder molestarte estando a tu lado. Quiero poder salir contigo. Quiero que hagamos recuerdos que no dependan de una conexión a internet.</p>
                <p>Y probablemente ese día voy a estar nervioso. Muchísimo. Porque después de tantos meses hablando contigo, por fin voy a tenerte delante.</p>
            `,
      pageNum: "— 17 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">Y</span> quizá en ese momento no sepamos qué decir. Quizá simplemente nos quedemos mirándonos. O quizá nos riamos porque los dos estamos demasiado nerviosos.</p>
                <p>Pero sea como sea, quiero vivir ese momento. Porque creo que va a ser uno de esos días que voy a recordar durante muchísimo tiempo.</p>
                <div class="book-quote-banner heart-accent">
                    «Pero sea como sea, quiero vivir ese momento. Porque creo que va a ser uno de esos días que voy a recordar durante muchísimo tiempo.»
                </div>
                <div class="book-decorative-vignette">
                    <svg viewBox="0 0 100 20" class="vignette-svg">
                        <path d="M10 10 Q30 2 50 10 T90 10" fill="none" stroke="#c4974f" stroke-width="1.2"/>
                        <circle cx="50" cy="10" r="3" fill="#800e26"/>
                        <circle cx="35" cy="10" r="1.8" fill="#c4974f"/>
                        <circle cx="65" cy="10" r="1.8" fill="#c4974f"/>
                    </svg>
                </div>
            `,
      pageNum: "— 18 —"
    }
  },

  // Spread 10: Epílogo - CORREGIDO: Distribución equilibrada, CERO texto cortado, sin emojis
  {
    id: 10,
    title: "Epílogo: Esto no es el final",
    shortBadge: "EPÍLOGO",
    left: {
      body: `
                <div class="chapter-opening-header">
                    <span class="ch-badge">EPÍLOGO</span>
                    <h2 class="ch-title">Esto no es el final</h2>
                </div>
                <p class="epilogue-dedication-to"><strong>Andrea:</strong></p>
                <p><span class="initial-letter">N</span>o sé si este libro consiguió explicar todo lo que siento por ti. Probablemente no. Porque hay cosas que son demasiado difíciles de poner en palabras.</p>
                <p>Pero quería dejarte algo que pudieras leer y recordar. Recordar cómo empezó todo. Recordar que al principio solamente eras una chica que Sierpe me presentó. Que yo acepté conocer por pura curiosidad. Que no esperaba demasiado.</p>
                <p>Y que, sin darme cuenta, terminé encontrando a alguien que ahora significa muchísimo para mí.</p>
                <p>Te convertiste en una parte de mis días. En alguien a quien quiero contarle mis cosas. En alguien con quien quiero jugar. En alguien cuya voz me gusta escuchar. En alguien cuyas fotos me alegran el día, incluso cuando aparecen de la nada. En alguien que me preocupa. En alguien a quien quiero cuidar. En alguien con quien quiero construir algo.</p>
                <p>Y sí: también en alguien que me llama rata. Supongo que no podía ser todo perfecto.</p>
            `,
      pageNum: "— 19 —"
    },
    right: {
      body: `
                <p><span class="initial-letter">P</span>ero si tuviera que volver al 26 de febrero de 2026 y pudiera hablar con el Iván de ese momento, le diría: <em>“Acepta. Conoce a esa chica. No tienes idea de lo que viene.”</em> Porque si hubiera sabido que aquella conversación iba a terminar llevándome hasta ti, probablemente habría prestado mucha más atención desde el primer segundo. Pero quizá está bien que no lo supiera, porque pude descubrirte poco a poco.</p>
                <p>Y todavía me queda muchísimo por descubrir. Todavía tenemos que conocernos en persona. Abrazarnos. Hacer miles de recuerdos. Discutir por tonterías. Reírnos. Jugar muchísimo. Seguir escuchándote. Que sigas mandándome fotos sin avisar. Que sigas llamándome rata. Y yo todavía tengo que seguir diciéndote cuánto te amo.</p>
                <p>Así que no: esta no es la historia completa. Es solamente la primera parte. Porque nuestra historia no terminó cuando nos conocimos: en realidad, ahí fue cuando comenzó.</p>
                <div class="book-final-conversation">
                    <p>“Qué locos éramos.”</p>
                    <p>Y quizá tú me mires y me digas: <em>“Sigues siendo una rata.”</em></p>
                    <p class="final-rat-promise">Y yo probablemente te responda: <strong>“Sí, pero soy tu rata.”</strong></p>
                    <p class="final-worth-it">Y entonces sabremos que todo valió la pena.</p>
                </div>
                <div class="dedication-box">
                    <div class="dedication-phrase">Por siempre y para siempre tuyo,</div>
                    <div class="dedication-name">Iván</div>
                    <div class="dedication-date">Te amo, Andrea · Y todavía nos queda muchísimo por vivir</div>
                </div>
            `,
      pageNum: "— 20 —"
    }
  }
];

fs.writeFileSync('spreads_data.json', JSON.stringify(spreads, null, 2), 'utf8');
console.log('spreads_data.json updated successfully!');
