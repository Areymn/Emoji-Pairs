'use strict';

function initgame() {
    
    const cartasContainer = document.getElementById('tablaEmojis');
    const cartas = document.querySelectorAll(".cartas");
    let cards = ["👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡", "👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡"];
    let ArrayCards = [];
    let intentos = 0;
    const intentosElemento = document.getElementById('intentos');
    let cardsFlipped = 0;
    let canFlip = true;

    // Esto asegura que las cartas estén mezcladas de manera aleatoria.
   function mezclarEmojis() {
        emojis.sort(() => Math.random() - 0.5);

        emojis.forEach((emoji) => {
            let carta = document.createElement('li');
            carta.textContent = emoji;
            carta.classList.add('carta');

            carta.addEventListener('click', function () {
                if (canFlip && !carta.classList.contains('girada') && ArrayCards.length < 2) {
                    carta.classList.add('girada');
                    ArrayCards.push(carta);
                    checkMatch();
                    intentos++;
                    intentosElemento.textContent = `Intentos: ${intentos}`;
                }
            });

            cartasContainer.appendChild(carta);
        });
    }

    // Función para que giren las cartas
    cartas.forEach(function (carta) {
        carta.addEventListener('click', function () {
            if (canFlip) {
                carta.classList.toggle('girada');
                canFlip = true;
            }
        });
    });

    // Agregar lógica cartas
    let primeraCarta, segundaCarta;  // Variables para almacenar las dos cartas volteadas

    cartas.forEach(function (carta) {
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
    });

    // Función verificar si las cartas coinciden
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

        if (cardsFlipped === cards.length) {
            console.log("¡Has ganado!");
        }
    }

    // Función para resetear el juego
    function reset() {
        cartas.forEach(function (carta) {
            carta.classList.remove('girada');
        });
        fallos = 0;
        aciertos = 0;
        canFlip = true;
        cardsFlipped = 0;
        ArrayCards = [];
        cards = mezclarEmojis(); // Mezclar las cartas de nuevo
    }

    const botonVolverJugar = document.getElementById('botonVolverJugar');
    botonVolverJugar.addEventListener('click', function () {
        reset();
    });

    mezclarEmojis(); // Llamada inicial para mezclar las cartas al cargar la página
}

initgame();
