const fs = require('fs');

// We have the raw content blocks in order:
const rawBlocks = [
    // PRÓLOGO
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">PRÓLOGO</span><h2 class="ch-title">Bueno… todo empezó por culpa de Sierpito</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">H</span>ay historias de amor que empiezan de una manera bonita. Dos personas se miran. Se gustan. Se acercan. Y comienza todo. La nuestra no.</p>', weight: 3 },
    { type: 'p', html: '<p>La nuestra empezó porque Sierpe me preguntó si quería conocer a una chica. Y yo dije que sí.</p>', weight: 2 },
    { type: 'p', html: '<p>No porque estuviera buscando al amor de mi vida ni porque tuviera esa sensación de <em>“hoy voy a conocer a la persona que cambiará mi vida”</em>. No. Simplemente estaba soltero, no tenía nada que perder y pensé:</p>', weight: 3 },
    { type: 'dialogue', html: '<div class="book-dialogue-box">“Bueno, a ver que onda xd”</div>', weight: 2 },
    { type: 'p', html: '<p>Incluso pensé que quizás ibas a ser una rara más de internet. Porque, siendo sinceros, conocer gente por internet es un poco una lotería.</p>', weight: 2 },
    { type: 'p', html: '<p>Y entonces apareciste tú. <span class="highlight-name-lead"><strong>Andrea.</strong></span></p>', weight: 2 },
    { type: 'p', html: '<p>La chica que supuestamente solamente iba a conocer. La chica con la que iba a hablar un rato. La chica que, en teoría, iba a ser una persona más que conocí por internet. Qué poco sabía yo.</p>', weight: 3 },
    { type: 'p', html: '<p>Porque el <strong>26 de febrero de 2026 a las 22:54</strong>, sin tener ni idea de lo que estaba empezando, comenzó una de las historias más bonitas que me han pasado.</p>', weight: 3 },
    { type: 'p', html: '<p>Y lo gracioso es que ni siquiera empezó de una manera especialmente romántica. Simplemente empezamos a hablar. Y después seguimos hablando. Y luego otra vez. Y otra.</p>', weight: 3 },
    { type: 'banner', html: '<div class="book-quote-banner">«Hasta que llegó un punto en el que hablar contigo dejó de ser algo que simplemente hacía. Se convirtió en algo que quería hacer.»</div>', weight: 3 },

    // CAPÍTULO I
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO I</span><h2 class="ch-title">Una conversación que se salió de control</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">A</span>l principio no nos conocíamos prácticamente nada. Éramos dos personas hablando de cualquier tontería que apareciera. Pero poco a poco fui descubriendo cómo eras. Y mientras más te conocía, más ganas tenía de seguir haciéndolo.</p>', weight: 4 },
    { type: 'p', html: '<p>Creo que una de las primeras cosas que me llamó la atención fue lo fácil que era hablar contigo. No tenía que pensar demasiado qué decir. No tenía que estar fingiendo ser alguien que no soy. Simplemente hablábamos.</p>', weight: 3 },
    { type: 'p', html: '<p>Y así fueron pasando los días. Hasta que empezamos a hablar prácticamente todos los días. Y eso es algo que parece pequeño hasta que te das cuenta de lo que significa. Porque cuando alguien empieza a formar parte de tu rutina, empieza a aparecer en tu cabeza incluso cuando no está hablando contigo.</p>', weight: 4 },
    { type: 'p', html: '<p>Te pasa algo durante el día y quieres contárselo. Ves algo y piensas que le gustaría. Te ocurre alguna tontería y sabes exactamente a quién se la quieres contar. Eso empezó a pasarme contigo. Y también empezaste a preocuparte por mí.</p>', weight: 4 },
    { type: 'p', html: '<p>Hubo momentos en los que yo no estaba bien y tú lo notabas. Al principio no podía contarte muchas cosas. Apenas nos estábamos conociendo y no era fácil abrirme completamente. Pero con el tiempo entendí algo: <em>tú realmente querías saber cómo estaba</em>. No por curiosidad, sino porque te importaba. Y eso hizo que poco a poco empezara a confiar más en ti.</p>', weight: 5 },
    { type: 'p', html: '<p>Hasta que un día me mandaste un audio. Y dijiste algo tan simple como:</p>', weight: 1 },
    { type: 'dialogue', html: '<div class="book-dialogue-box voice-audio-box"><span class="audio-mic-icon">🎙️</span> “Te quiero.”</div>', weight: 2 },
    { type: 'p', html: '<p>Y yo me quedé como: <em>¿Qué?</em> Lo escuché. Y lo volví a escuchar. Y probablemente lo escuché más veces de las que debería admitir. Porque me parecía increíble.</p>', weight: 3 },
    { type: 'p', html: '<p>No sé si tú entendiste en ese momento lo mucho que significó para mí. Pero yo sí lo recuerdo. Y creo que fue una de esas pequeñas cosas que hicieron que empezara a mirarte de una manera diferente.</p>', weight: 3 },

    // CAPÍTULO II
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO II</span><h2 class="ch-title">Minecraft, noches largas y otras formas de enamorarse</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">C</span>reo que contigo me fui enamorando sin darme cuenta. No hubo un momento exacto en el que mi cerebro dijera: <em>“Listo, ya está. Estoy enamorado de Andrea.”</em> Simplemente pasó.</p>', weight: 3 },
    { type: 'p', html: '<p>Empezamos a hablar cada vez más. A quedarnos despiertos. A jugar Minecraft. Y Minecraft terminó convirtiéndose en uno de nuestros pequeños lugares. Podíamos entrar al juego con una idea completamente normal y terminar haciendo cualquier estupidez. Pero realmente el juego era lo de menos. <strong>Lo importante era que estábamos juntos.</strong></p>', weight: 5 },
    { type: 'p', html: '<p>Porque contigo hasta hacer algo completamente cotidiano podía convertirse en un buen momento. Y creo que ahí fue cuando empecé a darme cuenta de que me gustaba demasiado estar contigo. Me gustaba escucharte. Me gustaba hablar contigo. Me gustaba cuando nos quedábamos hasta tarde. Me gustaba cuando simplemente estábamos ahí sin necesidad de hacer nada demasiado especial.</p>', weight: 5 },
    { type: 'p', html: '<p>Y mientras más tiempo pasaba contigo, más me gustabas. Hasta que llegó ese momento en el que los dos dejamos de fingir que esto era simplemente una amistad. Empezamos a decirnos cosas más bonitas. Más cariñosas.</p>', weight: 4 },
    { type: 'p', html: '<p>Y finalmente llegó ese momento en el que te dije: <em>“Te quiero.”</em> Y tú me lo devolviste. Y después fui yo el primero en decir:</p>', weight: 2 },
    { type: 'banner', html: '<div class="book-quote-banner heart-accent">«Te amo.»</div>', weight: 2 },
    { type: 'p', html: '<p>Y mira dónde estamos ahora. Todavía me parece gracioso pensar que todo comenzó con:</p>', weight: 1 },
    { type: 'dialogue', html: '<div class="book-dialogue-box">"¿Quieres conocer a una chica?"</div>', weight: 2 },

    // CAPÍTULO III
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO III</span><h2 class="ch-title">Andrea, la chica que me manda fotos sin que se las pida</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">H</span>ay muchas cosas que me gustan de ti. Tu voz. Tu forma de hablar. Tu risa. Tus ojos. Tu cara. Tu manera de ser.</p>', weight: 2 },
    { type: 'p', html: '<p>Pero hay algo que me hace mucha gracia: <strong>que de repente me mandes una foto o un video tuyo sin que yo te haya pedido absolutamente nada.</strong></p>', weight: 2 },
    { type: 'p', html: '<p>Y yo estoy tranquilamente haciendo cualquier cosa y de pronto:</p>', weight: 1 },
    { type: 'chat', html: '<div class="book-chat-preview"><span class="chat-sender">Andrea:</span> [foto]</div>', weight: 2 },
    { type: 'p', html: '<p>Y yo: ah. Bueno. Mi novia— Bueno, todavía no. <strong>Mi futura esposa. Mucho mejor.</strong></p>', weight: 2 },
    { type: 'p', html: '<p>Y es que sí, todavía no tenemos oficialmente ese título. Pero yo ya tengo bastante claro lo que quiero. Quiero que algún día podamos mirar atrás y pensar en lo gracioso que era que antes ni siquiera nos hubiéramos conocido en persona. Porque sí, todavía no nos hemos visto cara a cara. Pero eso no significa que no te conozca.</p>', weight: 5 },
    { type: 'p', html: '<p>Te conozco por tu voz. Por tus mensajes. Por tus audios. Por tus fotos. Por tus videos. Por las cosas que me cuentas. Por cómo reaccionas cuando estás feliz. Por cómo te pones cuando estás molesta. Por las veces que te preocupas. Por las veces que piensas demasiado. Por las veces que dices algo completamente inesperado.</p>', weight: 5 },
    { type: 'banner', html: '<div class="book-quote-banner">«Y también por esa costumbre tuya de decirme “rata”. No sé en qué momento me convertí oficialmente en una rata, pero bueno. Supongo que ya es parte de mi identidad.»</div>', weight: 3 },

    // CAPÍTULO IV
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO IV</span><h2 class="ch-title">La Andrea que conozco</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">S</span>i tuviera que describirte, diría que eres una persona muy dulce. Muchísimo. Y creo que una de las cosas que más me gusta de ti es que eres tú.</p>', weight: 2 },
    { type: 'p', html: '<p>Y yo también puedo ser completamente yo contigo. No tengo que estar pensando todo el tiempo qué decir. No tengo que ocultarte cosas. Puedo contarte lo que me pasa. Puedo hablarte de mi día. Puedo decirte cuando algo me gusta. Cuando algo me molesta. Cuando estoy triste. Cuando estoy feliz. Y tú haces lo mismo conmigo.</p>', weight: 5 },
    { type: 'p', html: '<p>Eso hizo que nuestra relación se sintiera cada vez más real. Porque aunque exista una pantalla entre nosotros, hay cosas que no se sienten lejanas. Cuando me dices que me amas, no se siente como si estuvieras lejos. Cuando me cuentas algo que te pasó, siento que estás compartiéndolo conmigo de verdad.</p>', weight: 5 },
    { type: 'p', html: '<p>Y cuando me mandas una foto de la nada, bueno... Ahí definitivamente siento que estás cerca. También me gusta escucharte. Muchísimo. Tu voz tiene algo que me encanta. Podría quedarme escuchándote hablar de cualquier cosa, incluso cuando probablemente tú piensas que estás diciendo la cosa más aburrida del mundo.</p>', weight: 5 },
    { type: 'p', html: '<p>Y tu risa... Tu risa es demasiado tierna. Me contagia.</p>', weight: 1 },
    { type: 'dialogue', html: '<div class="book-dialogue-box">«Y sí, hasta cuando tienes hipo me pareces adorable. No sé cómo lo haces. Es injusto.»</div>', weight: 2 },

    // CAPÍTULO V
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO V</span><h2 class="ch-title">Nosotros tampoco somos perfectos</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">A</span>hora viene la parte en la que tengo que admitir que tampoco somos una pareja perfecta. Bueno... primero habría que decidir si podemos llamarnos pareja oficialmente. Pero dejemos ese detalle.</p>', weight: 3 },
    { type: 'p', html: '<p>La cuestión es que ninguno de los dos es perfecto. Tú tienes tus cosas. Yo tengo las mías. Y hemos tenido momentos difíciles. Yo también he cometido errores. Especialmente cuando tú necesitabas cariño y yo no supe dártelo como debía. Y me arrepiento mucho de eso. Porque sé que hubo momentos en los que simplemente necesitabas sentir que yo estaba ahí, y yo no siempre lo hice bien.</p>', weight: 6 },
    { type: 'p', html: '<p>Pero también creo que de eso se trata todo esto: de aprender. No quiero que nuestro objetivo sea convertirnos en dos personas perfectas. Quiero que seamos dos personas que puedan decir:</p>', weight: 3 },
    { type: 'dialogue', html: '<div class="book-dialogue-box">“Esto lo hicimos mal. Vamos a hacerlo mejor.”</div>', weight: 2 },
    { type: 'p', html: '<p>Y seguir.</p>', weight: 1 },
    { type: 'p', html: '<p>Sé que tú a veces piensas demasiado. Sé que puedes quedarte atrapada en cosas del pasado. Sé que a veces te preocupas demasiado por lo que podría pasar en el futuro. Y sé que algunas veces hasta puedes llegar a pensar que lo nuestro no va a funcionar.</p>', weight: 4 },
    { type: 'p', html: '<p>Y cuando pasa eso, intento tranquilizarte. No porque tenga una bola de cristal y pueda saber exactamente qué va a pasar. No puedo. Nadie puede. Pero tampoco quiero que tengamos miedo de algo que todavía ni siquiera ha sucedido.</p>', weight: 4 },
    { type: 'p', html: '<p>Porque todavía nos faltan demasiadas cosas: todavía ni siquiera hemos tenido nuestro primer abrazo, no hemos salido juntos, no sabemos cómo será estar uno frente al otro. Entonces... ¿cómo vamos a decidir que algo no funcionará si todavía ni siquiera hemos vivido todo lo que nos queda?</p>', weight: 5 },
    { type: 'banner', html: '<div class="book-quote-banner">«Yo prefiero intentarlo. Prefiero equivocarme contigo y aprender. Prefiero construir algo poco a poco. Porque no quiero solamente la parte bonita de ti: quiero conocerte completa. Y quiero que tú también conozcas al Iván completo.»</div>', weight: 4 },

    // CAPÍTULO VI
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO VI</span><h2 class="ch-title">Las pequeñas cosas</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">U</span>na de las cosas que más me gustan de nosotros es que nuestra historia está llena de pequeñas cosas.</p>', weight: 2 },
    { type: 'list', html: '<ul class="book-romantic-bullets"><li>Minecraft.</li><li>Las llamadas y las videollamadas.</li><li>Las fotos que me mandas de la nada y los videos.</li><li>Las conversaciones que empiezan hablando de una cosa y terminan quién sabe dónde.</li><li>Las noches en las que seguimos hablando más de lo que deberíamos.</li><li>Las veces que simplemente estamos juntos.</li><li>Incluso nuestras tonterías.</li></ul>', weight: 6 },
    { type: 'p', html: '<p>Todo eso termina formando algo mucho más grande. También están esos pequeños detalles que haces por mí. Y creo que por eso me gustan tanto. Porque cuando haces algo para mí, no importa si es algo enorme o algo pequeño: lo que me gusta es saber que pensaste en mí.</p>', weight: 4 },
    { type: 'p', html: '<p>Como aquella carta que me hiciste por mi cumpleaños. Todavía recuerdo todo lo que pusiste: las fotos, las canciones, las cosas que escribiste, las cartas de Sierpito y Sedate. Todo.</p>', weight: 3 },
    { type: 'p', html: '<p>Y hubo una parte que me gustó especialmente: cuando me dijiste que creías que podía cumplir mis metas, que te gustaba cómo me esforzaba y que me deseabas cosas bonitas. Y sí... también me deseaste dinero.</p>', weight: 4 },
    { type: 'dialogue', html: '<div class="book-dialogue-box">«Así que espero poder convertirme en tu futuro esposo millonario. Promesa pendiente.»</div>', weight: 2 },

    // CAPÍTULO VII
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">CAPÍTULO VII</span><h2 class="ch-title">Antes de conocerte en persona</h2></div>', weight: 4 },
    { type: 'p', html: '<p><span class="initial-letter">A</span> veces pienso en lo raro que es nuestra historia. Nos conocemos muchísimo, pero todavía no nos hemos encontrado físicamente. Es una sensación extraña. Porque sé cómo suena tu voz. Sé cómo te ríes. Sé cómo hablas. Sé muchas cosas de ti. Pero todavía no sé qué se siente abrazarte.</p>', weight: 5 },
    { type: 'p', html: '<p><strong>Y tengo muchas ganas de descubrirlo.</strong> Quiero saber cómo será verte frente a mí. Quiero poder abrazarte sin que exista una pantalla. Quiero poder darte un beso. Quiero poder molestarte estando a tu lado. Quiero poder salir contigo. Quiero que hagamos recuerdos que no dependan de una conexión a internet.</p>', weight: 5 },
    { type: 'p', html: '<p>Y probablemente ese día voy a estar nervioso. Muchísimo. Porque después de tantos meses hablando contigo, por fin voy a tenerte delante.</p>', weight: 3 },
    { type: 'p', html: '<p>Y quizá en ese momento no sepamos qué decir. Quizá simplemente nos quedemos mirándonos. O quizá nos riamos porque los dos estamos demasiado nerviosos.</p>', weight: 3 },
    { type: 'banner', html: '<div class="book-quote-banner heart-accent">«Pero sea como sea, quiero vivir ese momento. Porque creo que va a ser uno de esos días que voy a recordar durante muchísimo tiempo.»</div>', weight: 3 },

    // EPÍLOGO
    { type: 'header', html: '<div class="chapter-opening-header"><span class="ch-badge">EPÍLOGO</span><h2 class="ch-title">Esto no es el final</h2></div>', weight: 4 },
    { type: 'p', html: '<p><strong>Andrea:</strong></p>', weight: 1 },
    { type: 'p', html: '<p>No sé si este libro consiguió explicar todo lo que siento por ti. Probablemente no. Porque hay cosas que son demasiado difíciles de poner en palabras. Pero quería dejarte algo que pudieras leer y recordar. Recordar cómo empezó todo. Recordar que al principio solamente eras una chica que Sierpe me presentó. Que yo acepté conocer por pura curiosidad. Que no esperaba demasiado.</p>', weight: 6 },
    { type: 'p', html: '<p>Y que, sin darme cuenta, terminé encontrando a alguien que ahora significa muchísimo para mí. Te convertiste en una parte de mis días. En alguien a quien quiero contarle mis cosas. En alguien con quien quiero jugar. En alguien cuya voz me gusta escuchar. En alguien cuyas fotos me alegran el día, incluso cuando aparecen de la nada. En alguien que me preocupa. En alguien a quien quiero cuidar. En alguien con quien quiero construir algo.</p>', weight: 7 },
    { type: 'p', html: '<p>Y sí: también en alguien que me llama rata. Supongo que no podía ser todo perfecto.</p>', weight: 2 },
    { type: 'p', html: '<p>Pero si tuviera que volver al 26 de febrero de 2026 y pudiera hablar con el Iván de ese momento, le diría: <em>“Acepta. Conoce a esa chica. No tienes idea de lo que viene.”</em> Porque si hubiera sabido que aquella conversación iba a terminar llevándome hasta ti, probablemente habría prestado mucha más atención desde el primer segundo. Pero quizá está bien que no lo supiera, porque pude descubrirte poco a poco.</p>', weight: 6 },
    { type: 'p', html: '<p>Y todavía me queda muchísimo por descubrir. Todavía tenemos que conocernos en persona. Abrazarnos. Hacer miles de recuerdos. Discutir por tonterías. Reírnos. Jugar muchísimo. Seguir escuchándote. Que sigas mandándome fotos sin avisar. Que sigas llamándome rata. Y yo todavía tengo que seguir diciéndote cuánto te amo.</p>', weight: 6 },
    { type: 'p', html: '<p>Así que no: esta no es la historia completa. Es solamente la primera parte. Porque nuestra historia no terminó cuando nos conocimos: en realidad, ahí fue cuando comenzó.</p>', weight: 3 },
    { type: 'dialogue', html: '<div class="book-final-conversation"><p>“Qué locos éramos.”</p><p>Y quizá tú me mires y me digas: <em>“Sigues siendo una rata.”</em></p><p class="final-rat-promise">Y yo probablemente te responda: <strong>“Sí, pero soy tu rata.”</strong></p><p class="final-worth-it">Y entonces sabremos que todo valió la pena.</p></div>', weight: 4 },
    { type: 'dedication', html: '<div class="dedication-box"><div class="dedication-phrase">Por siempre y para siempre tuyo,</div><div class="dedication-name">Iván</div><div class="dedication-date">Te amo, Andrea · Y todavía nos queda muchísimo por vivir</div></div>', weight: 4 }
];

// Let's test packing them with a target page weight (e.g. 18-20 weight units per page)
const targetWeight = 19;
let pages = [];
let currentPage = [];
let currentWeight = 0;

rawBlocks.forEach((block, idx) => {
    // If adding this block would exceed targetWeight AND currentPage is not empty, start a new page!
    if (currentWeight + block.weight > targetWeight && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [block];
        currentWeight = block.weight;
    } else {
        currentPage.push(block);
        currentWeight += block.weight;
    }
});
if (currentPage.length > 0) {
    pages.push(currentPage);
}

console.log('Total continuous pages produced:', pages.length);
pages.forEach((p, i) => {
    const wordCount = p.map(b => b.html.replace(/<[^>]+>/g, ' ')).join(' ').split(/\\s+/).filter(Boolean).length;
    const blockTypes = p.map(b => b.type).join(', ');
    console.log(`Page ${i + 1}: ${wordCount} words | Blocks: ${blockTypes}`);
});
