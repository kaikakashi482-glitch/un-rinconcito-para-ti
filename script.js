console.log("¡JavaScript está funcionando! 🌻");

const esMovil =
    window.matchMedia("(max-width: 768px)").matches;

const contenedorEstrellas =
    document.getElementById("estrellas");

const cantidadEstrellas =
    esMovil ? 80 : 150;

for (let i = 0; i < cantidadEstrellas; i++) {

    const estrella = document.createElement("div");

    estrella.classList.add("estrella");

    // Posición aleatoria
    estrella.style.left = Math.random() * 100 + "vw";
    estrella.style.top = Math.random() * 100 + "vh";

    // Tamaño aleatorio
    const tamaño = Math.random() * 3 + 1;

    estrella.style.width = tamaño + "px";
    estrella.style.height = tamaño + "px";

    // Velocidad diferente para cada estrella
    estrella.style.animationDuration =
        (Math.random() * 3 + 1) + "s";

    // Algunas estrellas ligeramente amarillas
    if (Math.random() > 0.75) {
        estrella.style.background = "#ffe45c";
        estrella.style.boxShadow =
            "0 0 8px #ffd700";
    }

    contenedorEstrellas.appendChild(estrella);
}

// =====================================
// GALAXIA ESPIRAL
// =====================================

const canvas = document.getElementById("galaxiaCanvas");
const ctx = canvas.getContext("2d");

let ancho;
let alto;
let centroX;
let centroY;

let particulas = [];

const esMovil =
    window.matchMedia("(max-width: 768px)").matches;

const cantidadParticulas =
    esMovil ? 900 : 1800;

const brazos = 4;


// Ajustar canvas al tamaño de pantalla
function ajustarCanvas() {

    const pixelRatio =
        Math.min(
             window.devicePixelRatio || 1,
             esMovil ? 1.25 : 1.75
        );
    ancho = window.innerWidth;
    alto = window.innerHeight;

    canvas.width = ancho * pixelRatio;
    canvas.height = alto * pixelRatio;

    canvas.style.width = ancho + "px";
    canvas.style.height = alto + "px";

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    centroX = ancho / 2;
    centroY = alto / 2;
}


// Crear las partículas
function crearGalaxia() {

    particulas = [];

    const radioMaximo =
        Math.min(ancho, alto) * 0.45;

    for (let i = 0; i < cantidadParticulas; i++) {

        const distancia =
            Math.pow(Math.random(), 1.8) * radioMaximo;

        const brazo =
            Math.floor(Math.random() * brazos);

        const anguloBrazo =
            (brazo / brazos) * Math.PI * 2;

        const giro =
            distancia * 0.035;

        const dispersion =
            (Math.random() - 0.5) *
            (0.20 + distancia / radioMaximo) * 0.35;

        const angulo =
            anguloBrazo +
            giro +
            dispersion;

        const tamaño =
            Math.random() * 1.7 + 0.4;

        const brillo =
            Math.random() * 0.7 + 0.25;

        const altura =
            (Math.random() - 0.5) *
            distancia *
            0.22;

        particulas.push({

            distancia: distancia,

            angulo: angulo,

            tamaño: tamaño,

            brillo: brillo,

            altura: altura,

            velocidad:
                0.00008 +
                Math.random() * 0.00015
        });
    }
}


// Dibujar galaxia
function dibujarGalaxia(tiempo) {

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );

    ctx.save();

    ctx.globalCompositeOperation = "lighter";

    for (const particula of particulas) {

        const rotacion =
            tiempo *
            particula.velocidad;

        const angulo =
            particula.angulo +
            rotacion;

        const x =
            centroX +
            Math.cos(angulo) *
            particula.distancia;

        const y =
            centroY +
            Math.sin(angulo) *
            particula.distancia *
            0.42 +
            particula.altura;

        const distanciaNormalizada =
            particula.distancia /
            (Math.min(ancho, alto) * 0.38);

        let rojo = 255;
        let verde;
        let azul;

        // Centro blanco/dorado
        if (distanciaNormalizada < 0.18) {

            verde = 245;
            azul = 180;

        }

        // Zona amarilla
        else if (distanciaNormalizada < 0.55) {

            verde = 215;
            azul = 70;

        }

        // Exterior dorado
        else {

            verde = 175;
            azul = 20;

        }

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(
                ${rojo},
                ${verde},
                ${azul},
                ${particula.brillo}
            )`;

if (esMovil) {

    ctx.shadowBlur = 0;

} else {

    ctx.shadowBlur =
        particula.tamaño * 2;

    ctx.shadowColor =
        "rgba(255, 210, 50, 0.55)";
}

        ctx.arc(
            x,
            y,
            particula.tamaño,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.restore();


    // Núcleo brillante
    const gradiente =
        ctx.createRadialGradient(
            centroX,
            centroY,
            0,
            centroX,
            centroY,
            100
        );

    gradiente.addColorStop(
        0,
        "rgba(255,255,220,0.95)"
    );

    gradiente.addColorStop(
        0.12,
        "rgba(255,230,100,0.65)"
    );

    gradiente.addColorStop(
        0.4,
        "rgba(255,190,0,0.15)"
    );

    gradiente.addColorStop(
        1,
        "rgba(255,180,0,0)"
    );

    ctx.fillStyle = gradiente;

    ctx.beginPath();

    ctx.arc(
        centroX,
        centroY,
        100,
        0,
        Math.PI * 2
    );

    ctx.fill();


    requestAnimationFrame(dibujarGalaxia);
}


// Si cambia el tamaño de la ventana
window.addEventListener(
    "resize",
    () => {

        ajustarCanvas();
        crearGalaxia();

    }
);


// Iniciar


// =====================================
// FLORES Y MENSAJES
// =====================================

const contenedorFlores = document.getElementById("flores");
const mensajeFlor = document.getElementById("mensajeFlor");

const efectoEspecial = document.getElementById("efectoEspecial");
const florSecreta = document.getElementById("florSecreta");
const fraseEspecial = document.getElementById("fraseEspecial");

let temporizadorMensaje;
let efectoEnCurso = false;


// Flores con mensaje
const floresEspeciales = [

    {
        x: 22,
        y: 30,
        tipo: "girasol",
        escala: 1.1,
        texto: "Te quelo mucho, bu 🌻"
    },

    {
        x: 32,
        y: 68,
        tipo: "margarita",
        escala: 0.9,
        texto: "Me gusta mucho poder compartir ratitos contigo."
    },

    {
        x: 46,
        y: 22,
        tipo: "girasol",
        escala: 1,
        texto: "Solo quería hacerte una cosita bonita jsjs."
    },

    {
        x: 62,
        y: 32,
        tipo: "margarita",
        escala: 0.85,
        texto: "Espero que nunca dudes de que tienes mi compañía, bu."
    },

    {
        x: 74,
        y: 54,
        tipo: "girasol",
        escala: 1.15,
        texto: "Me alegra mucho cuando apareces, aunque sea para decir una tontería jsjs."
    },

    {
        x: 64,
        y: 72,
        tipo: "margarita",
        escala: 0.95,
        texto: "No sé cuánto mide una galaxia, pero aparentemente alcanza para guardar bastantes “te quelo”, bu 🌌"
    },

    {
        x: 24,
        y: 52,
        tipo: "girasol",
        escala: 1,
        texto: "Esta galaxia es chiquita, pero el cariño va en serio 💛"
    },

    {
        x: 80,
        y: 24,
        tipo: "margarita",
        escala: 0.85,
        texto: "Gracias por todos esos pequeños ratitos que terminan alegrándome el día."
    }
    

];

function crearVisualFlor(tipo) {

    const visual = document.createElement("div");

    visual.classList.add(
        "flor-visual",
        tipo
    );


    const cantidadPetalos =
        tipo === "girasol" ? 14 : 12;


    for (
        let i = 0;
        i < cantidadPetalos;
        i++
    ) {

        const petalo =
            document.createElement("span");

        petalo.classList.add("petalo");


        const angulo =
            (360 / cantidadPetalos) * i;


        petalo.style.transform =
            `
            translate(-50%, -100%)
            rotate(${angulo}deg)
            translateY(-8px)
            `;


        visual.appendChild(petalo);
    }


    const centro =
        document.createElement("span");

    centro.classList.add("centro-flor");

    visual.appendChild(centro);


    return visual;
}

function crearCorazonParticulas() {

    if (!efectoEspecial) return;

    efectoEspecial.innerHTML = "";

    const total = 140;
    const escala = 10.5;

    for (let i = 0; i < total; i++) {

        const t = (i / total) * Math.PI * 2;

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            -(
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t)
            );

        const particula =
            document.createElement("span");

        particula.classList.add("particula-corazon");

        const tamaño =
            2 + Math.random() * 3.5;

        particula.style.width =
            tamaño + "px";

        particula.style.height =
            tamaño + "px";

        particula.style.setProperty(
            "--tx",
            `${x * escala}px`
        );

        particula.style.setProperty(
            "--ty",
            `${y * escala}px`
        );

        particula.style.animationDelay =
            `${Math.random() * 0.18}s`;

        efectoEspecial.appendChild(particula);
    }
}

function activarMomentoEspecial() {

    if (efectoEnCurso) return;

    efectoEnCurso = true;

    crearCorazonParticulas();

    mostrarMensaje(
        "Encontraste la flor secreta 🌻"
    );

    if (fraseEspecial) {

        fraseEspecial.textContent =
            "Si algún día necesitas un rinconcito tranquilo, sabes que mi puerta siempre estará abierta para ti 🤍";

        fraseEspecial.classList.add("mostrar");
    }

    setTimeout(() => {

        if (fraseEspecial) {
            fraseEspecial.classList.remove("mostrar");
        }

        if (efectoEspecial) {
            efectoEspecial.innerHTML = "";
        }

        efectoEnCurso = false;

    }, 3200);
}

// Crear flores
function crearFlores() {

    contenedorFlores.innerHTML = "";


    // FLORES CON MENSAJE

    floresEspeciales.forEach(
        (florData) => {

            const flor =
                document.createElement("button");


            flor.classList.add(
                "flor",
                "flor-interactiva"
            );


            flor.style.left =
                florData.x + "%";

            flor.style.top =
                florData.y + "%";


            flor.style.scale =
                florData.escala;


            const visual =
                crearVisualFlor(
                    florData.tipo
                );


            visual.style.animationDuration =
                (
                    4 +
                    Math.random() * 3
                ) + "s";


            visual.style.animationDelay =
                (
                    Math.random() * 2
                ) + "s";


            flor.appendChild(visual);


            flor.addEventListener(
                "click",
                (evento) => {

                    evento.stopPropagation();

                    mostrarMensaje(
                        florData.texto
                    );

                }
            );


            contenedorFlores
                .appendChild(flor);

        }
    );


    // FLORES DECORATIVAS

    const cantidadDecorativas =
    esMovil ? 6 : 10;

for (
    let i = 0;
    i < cantidadDecorativas;
    i++
) {

        const flor =
            document.createElement("div");


        flor.classList.add(
            "flor",
            "flor-decorativa"
        );


        flor.style.left =
            (8 + Math.random() * 84)
            + "%";

        flor.style.top =
            (10 + Math.random() * 78)
            + "%";


        const tipo =
            Math.random() > 0.45
                ? "girasol"
                : "margarita";


        const visual =
            crearVisualFlor(tipo);


        const tamaño =
            0.45 + Math.random() * 0.35;


        visual.style.transform =
            `scale(${tamaño})`;


        visual.style.animationDuration =
            (
                5 +
                Math.random() * 4
            ) + "s";


        flor.appendChild(visual);

        contenedorFlores
            .appendChild(flor);
    }
}


// Mostrar mensaje
function mostrarMensaje(texto) {

    mensajeFlor.textContent = texto;
    mensajeFlor.classList.add("mostrar");

    clearTimeout(temporizadorMensaje);

    temporizadorMensaje = setTimeout(() => {
        mensajeFlor.classList.remove("mostrar");
    }, 3200);
}


// Ocultar si se hace clic fuera
document.addEventListener("click", (e) => {
    if (!e.target.closest(".flor-interactiva")) {
        mensajeFlor.classList.remove("mostrar");
    }
});

// =====================================
// INICIAR TODO
// =====================================

function iniciarUniverso() {

    console.log("🌌 Iniciando galaxia...");

    ajustarCanvas();
    crearGalaxia();

    requestAnimationFrame(dibujarGalaxia);

    if (contenedorFlores && mensajeFlor) {

        console.log("🌻 Creando flores...");

        crearFlores();

    } else {

        console.error(
            "❌ No encontré #flores o #mensajeFlor"
        );
    }

        if (florSecreta) {

        florSecreta.innerHTML = "";

        const visualSecreto =
            crearVisualFlor("girasol");

        florSecreta.appendChild(
            visualSecreto
        );

        florSecreta.addEventListener(
            "click",
            activarMomentoEspecial
        );
    }
}

// =====================================
// MÚSICA - SPOTIFY
// =====================================

const botonMusica =
    document.getElementById("botonMusica");

const spotifyPlayer =
    document.getElementById("spotifyPlayer");

let spotifyVisible = false;


if (botonMusica && spotifyPlayer) {

    botonMusica.addEventListener(
        "click",
        () => {

            spotifyVisible = !spotifyVisible;


            if (spotifyVisible) {

                spotifyPlayer.classList.remove("oculto");

                botonMusica.textContent =
                    "♫ Serendipity";

            } else {

                spotifyPlayer.classList.add("oculto");

                botonMusica.textContent =
                    "▶ Escuchar Serendipity";
            }
        }
    );
}

const pistaInicial =
    document.getElementById("pistaInicial");

if (pistaInicial) {

    setTimeout(() => {

        pistaInicial.classList.add("ocultar");

    }, 5000);
}

iniciarUniverso();
