"use strict";

const emojis = ["👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡", "👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡"];
const intentosElemento = document.querySelector('#intentos');
let firstEmojiLi = null;
let secondEmojiLi = null;
let intentos = 0;
let clicks = 0;
let cardsFlipped = 0;
let canFlip = true;

function checkMatch() {
    if (firstEmojiLi.innerHTML === secondEmojiLi.innerHTML) {
        cardsFlipped += 2;
    } else {
        setTimeout(() => {
            firstEmojiLi.classList.remove('girada');
            secondEmojiLi.classList.remove('girada');
            canFlip = true;
        }, 8800);
    }

    firstEmojiLi = null;
    secondEmojiLi = null;

    if (cardsFlipped === emojis.length) {
        console.log("¡Has ganado!");
    }
}

const comprobarCoincidencia = async (secs) => {
    setTimeout(() => {
        const firstEmoji = firstEmojiLi.querySelector('.emojis').textContent;
        const secondEmoji = secondEmojiLi.querySelector('.emojis').textContent;

        if (firstEmoji !== secondEmoji) {
            firstEmojiLi.classList.remove('girada')
            secondEmojiLi.classList.remove('girada')
        }
        canFlip = true;
    }, secs * 1500)
}

function initgame() {
    emojis.sort(() => Math.random() - 0.5);
    const cartasContainer = document.querySelector('#tablaEmojis');
    cartasContainer.innerHTML = '';

    for (const emoji of emojis) {
        const cartaLi = document.createElement('li');
        cartaLi.textContent = emoji;
        cartaLi.classList.add('carta');
        cartaLi.innerHTML = `
            <div class="caraTrasera">
                <span class="iconos">
                    <img src="./images/signo-de-interrogacion.png" alt="Simbolo de interrogación">
                </span>
            </div> 
            <div class="caraDelantera">
                <span class="emojis">${emoji}</span>
            </div>
        `;

        cartaLi.addEventListener('click', async () => {
            if (!cartaLi.classList.contains('girada') && cardsFlipped <= 16 && canFlip) {
                cartaLi.classList.add('girada');
                clicks++;

                if (clicks % 2 === 0) {
                    intentos++;
                    intentosElemento.textContent = `Intentos: ${intentos}`;
                    secondEmojiLi = cartaLi;
                    canFlip = false;
                    await comprobarCoincidencia(0.5);
                } else {
                    firstEmojiLi = cartaLi;
                }
            }
        });

        cartasContainer.append(cartaLi);
    }
}

//  Recargar página en el logo
const recargar = document.querySelector('#botonVolverJugar')

function botonVolverJugar() {
     window.location.reload()
 }

 recargar.addEventListener('click', botonVolverJugar);

initgame();
