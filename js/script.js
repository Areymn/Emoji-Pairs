'use strict';

// Array de emojis.
const emojis = ["👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡", "👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡"];

// Seleccionamos el div de intentos.
const intentosElemento = document.querySelector('#intentos');

// Primer y segundo emoji a comparar.
let firstEmojiLi;
let secondEmojiLi;

 // Intentos antes de ganar.
 let intentos = 0;

 // Contador de clicks.
 let clicks = 0;

 // Contador de carta que se han girado. Si el nmero de carta giradas es 16 hemos ganado.
 let cardsFlipped = 0;

/**
 * ############################
 * ## Comprobar Coincidencia ##
 * ############################
 */
function checkMatch() {
    if (primeraCarta.innerHTML === segundaCarta.innerHTML) {
        aciertos++;
        cardsFlipped += 2;
        ArrayCards = [];
    } else {
        fallos++;
        canFlip = false;
        setTimeout(() => {
            primeraCarta.classList.remove('girada');
            segundaCarta.classList.remove('girada');
            canFlip = true;
            ArrayCards = [];
        }, 1000);
    }

    if (cardsFlipped === emojis.length) {
        console.log("¡Has ganado!");
    }
}

/**
 * ############################
 * ## Comprobar coincidencia ##
 * ############################
 */
const comprobarCoincidencia = async (secs) => {
    setTimeout(() => {
         // Seleccionamos el primer emoji.
         const firstEmoji = firstEmojiLi.querySelectorAll('span')[1].textContent;
         const secondEmoji = secondEmojiLi.querySelectorAll('span')[1].textContent;

        // Si los dos emojis coinciden no hacemos nada, pero si no coinciden eliminamos la clase girada.
        if (firstEmoji !== secondEmoji) {
            firstEmojiLi.classList.remove('girada')
            secondEmojiLi.classList.remove('girada')
        }
    }, secs * 1000)
}

/**
 * ###################
 * ## Iniciar Juego ##
 * ###################
 */
 function initgame() {
    // Mezclamos los emojis.
    emojis.sort(() => Math.random() - 0.5);

    // Seleccionamos el ul donde colocaremos los li.
    const cartasContainer = document.querySelector('#tablaEmojis');

    // Vaciamos el contenido del contenedor anterior.
    cartasContainer.innerHTML = ''

    // Recorremos el array de amojis y creamos un li por cada emoji.
    for (const emoji of emojis) {
        // Creamos el li del emoji y agregamos el contenido.
        const cartaLi = document.createElement('li');
        cartaLi.textContent = emoji;
        cartaLi.classList.add('carta');

        // Añadimos el contenido al li.
        cartaLi.innerHTML = `
            <div class="caraTrasera">
                <span class="iconos">
                    <img src="./images/signo-de-interrogacion.png" alt="Simbolo de interrogación">
                </span>
            </div> 
            <div class="caraDelantera">
                <span class="emojis">${emoji}</span>
            </div>
        `
       
        // Agregamos el evento al emoji,
        cartaLi.addEventListener('click', async () => {
            // Si la clase da la carta n
            if (!cartaLi.classList.contains('girada') && cardsFlipped <= 16) {
                // Añadimos la clase girada.
                cartaLi.classList.add('girada');

                // Incrementamos el contador de clicks en 1.
                clicks++;

                // Si el contador de clicks es un numero par...
                if (clicks % 2 === 0) {
                    // Aumentamos el contador de intentos en 1.
                    intentos++;

                    // Actualizamos los intentos en el html.
                    intentosElemento.textContent = `Intentos: ${intentos}`;

                    // GUardamos el segundo emoji para compararlo con el primero.
                    secondEmojiLi = cartaLi;

                    // Esperamos un segundo para que se vea la segunda carta girada.
                    await comprobarCoincidencia(1.5)
                    
                } else {
                    // Guardamos el primer emoji para posteriormente compararlo con el segundo.
                    firstEmojiLi = cartaLi; 
                }  
            }
        });

        // Establecemos el li como hijo del ul.
        cartasContainer.append(cartaLi);
    }




    // Esto asegura que las carta estén mezcladas de manera aleatoria.
  

    // Función para que giren las carta
    /*carta.forEach(function (carta) {
        carta.addEventListener('click', function () {
            if (canFlip) {
                carta.classList.toggle('girada');
                canFlip = true;
            }
        });
    });

    // Agregar lógica carta
    let primeraCarta, segundaCarta;  // Variables para almacenar las dos carta volteadas

    carta.forEach(function (carta) {
        carta.addEventListener('click', function () {
            if (canFlip && !carta.classList.contains('girada') && ArrayCards.length < 2) {
                carta.classList.add('girada');

                if (ArrayCards.length === 0) {
                    primeraCarta = carta;
                } else {
                    segundaCarta = carta;
                    checkMatch();
                }

                ArrayCards.push(carta);
            }
        });
    });*/
}

initgame();
