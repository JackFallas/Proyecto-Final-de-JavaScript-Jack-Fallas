const PALABRAS = ['teclado', 'pantalla', 'raton', 'programa', 'consola', 'variable', 'arreglo', 'ciclo', 'funcion', 'codigo', 'internet', 'servidor', 'navegador', 'escritorio', 'archivo', 'carpeta', 'usuario', 'seguridad', 'algoritmo', 'desafio'];
const MAX_INTENTOS = 7;

let palabraSeleccionada = '';
let estadoPalabra = [];
let intentosFallidos = 0;
let letrasUsadas = [];
let juegoTerminado = false;

const displayPalabra = document.getElementById('palabra-oculta');
const displayIntentos = document.getElementById('intentos-restantes');
const displayMensaje = document.getElementById('mensaje-estado');
const contenedorBotones = document.getElementById('contenedor-botones');
const botonReiniciar = document.getElementById('boton-reiniciar');

const canvas = document.getElementById('ahorcadoCanvas');
const ctx = canvas.getContext('2d');

function iniciarJuego() {
    intentosFallidos = 0;
    letrasUsadas = [];
    juegoTerminado = false;
    botonReiniciar.style.display = 'none';
    displayMensaje.textContent = '';

    const indiceAleatorio = Math.floor(Math.random() * PALABRAS.length);
    palabraSeleccionada = PALABRAS[indiceAleatorio];

    estadoPalabra = [];
    let k = 0;
    while (k < palabraSeleccionada.length) {
        estadoPalabra.push('_');
        k++;
    }

    actualizarDisplay();
    generarBotones();
    dibujarBase();
}

function dibujarBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    ctx.moveTo(30, 298);
    ctx.lineTo(270, 298);

    ctx.moveTo(70, 298);
    ctx.lineTo(70, 30);

    ctx.lineTo(200, 30);

    ctx.moveTo(200, 30);
    ctx.lineTo(200, 70);
    ctx.stroke();
}

function dibujarAhorcado(intento) {
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = 4;
    
    if (intento === 1) { 
        ctx.beginPath();
        ctx.arc(200, 90, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    else if (intento === 2) { 
        ctx.beginPath();
        ctx.moveTo(200, 110);
        ctx.lineTo(200, 190);
        ctx.stroke();
    }
    else if (intento === 3) { 
        ctx.beginPath();
        ctx.moveTo(200, 190);
        ctx.lineTo(220, 240);
        ctx.stroke();
    }
    else if (intento === 4) { 
        ctx.beginPath();
        ctx.moveTo(200, 190);
        ctx.lineTo(180, 240);
        ctx.stroke();
    }
    else if (intento === 5) { 
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(240, 150);
        ctx.stroke();
    }
    else if (intento === 6) { 
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(160, 150);
        ctx.stroke();
    }
    else if (intento === 7) { 
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(160, 150);
        ctx.stroke();
    }
}

function actualizarDisplay() {
    displayPalabra.textContent = estadoPalabra.join(' ');
    displayIntentos.textContent = 'Intentos restantes: ' + (MAX_INTENTOS - intentosFallidos);
}

function generarBotones() {
    contenedorBotones.innerHTML = '';
    const alfabeto = 'abcdefghijklmnñopqrstuvwxyz';

    let j = 0;
    for (j = 0; j < alfabeto.length; j++) {
        const letra = alfabeto[j];
        const boton = document.createElement('button');
        
        boton.textContent = letra.toUpperCase();
        boton.setAttribute('onclick', `manejarAdivinanza('${letra}')`);
        
        contenedorBotones.appendChild(boton);
    }
}

function manejarAdivinanza(letra) {
    if (juegoTerminado) return;

    let yaUsada = false;
    let k = 0;
    for (k = 0; k < letrasUsadas.length; k++) {
        if (letrasUsadas[k] === letra) {
            yaUsada = true;
            break;
        }
    }

    if (yaUsada) {
        displayMensaje.textContent = 'Ya usaste la letra ' + letra.toUpperCase();
        return;
    }

    let botones = contenedorBotones.children;
    for (k = 0; k < botones.length; k++) {
        if (botones[k].textContent.toLowerCase() === letra) {
            botones[k].disabled = true;
            break;
        }
    }
    letrasUsadas.push(letra);
    displayMensaje.textContent = '';

    let acierto = false;
    
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            estadoPalabra[i] = letra;
            acierto = true;
        }
    }

    if (acierto) {
        if (estadoPalabra.join('') === palabraSeleccionada) {
            finalizarJuego(true);
        }
    } else {
        intentosFallidos++;
        dibujarAhorcado(intentosFallidos);
        
        if (intentosFallidos >= MAX_INTENTOS) {
            finalizarJuego(false);
        }
    }

    actualizarDisplay();
}

function finalizarJuego(gano) {
    juegoTerminado = true;
    botonReiniciar.style.display = 'block';

    let botones = contenedorBotones.children;
    for (let k = 0; k < botones.length; k++) {
        botones[k].disabled = true;
    }

    if (gano) {
        const intentosUsados = intentosFallidos + 1;
        displayMensaje.textContent = `GANASTE! Adivinaste la palabra en ${intentosUsados} intentos.`;
    } else {
        displayPalabra.textContent = palabraSeleccionada.split('').join(' ');
        displayMensaje.textContent = `AHORCADO! La palabra era: ${palabraSeleccionada.toUpperCase()}`;
    }
}

iniciarJuego();