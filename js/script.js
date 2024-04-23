"use strict";

const emojis = ["👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡", "👾", "👽", "👹", "💩", "💀", "🙈", "🤯", "🤡"];
const attemptsElement = document.querySelector('#attempts');
let firstEmojiLi = null;
let secondEmojiLi = null;
let attempts = 0;
let clicks = 0;
let cardsFlipped = 0;
let canFlip = true;

function checkMatch() {
    if (firstEmojiLi.innerHTML === secondEmojiLi.innerHTML) {
        cardsFlipped += 2;
    } else {
        setTimeout(() => {
            firstEmojiLi.classList.remove('flipped');
            secondEmojiLi.classList.remove('flipped');
            canFlip = true;
        }, 1000);
    }
    firstEmojiLi = null;
    secondEmojiLi = null;
}

const matchCheck = async (secs) => {
    setTimeout(() => {
        const firstEmoji = firstEmojiLi.querySelector('.emojis').textContent;
        const secondEmoji = secondEmojiLi.querySelector('.emojis').textContent;
        if (firstEmoji !== secondEmoji) {
            firstEmojiLi.classList.remove('flipped');
            secondEmojiLi.classList.remove('flipped');
        }
        canFlip = true;
    }, secs * 1500);
}

function initializeGame() {
    emojis.sort(() => Math.random() - 0.5);
    const cardsContainer = document.querySelector('#emojiTable');
    cardsContainer.innerHTML = '';
    for (const emoji of emojis) {
        const cardLi = document.createElement('li');
        cardLi.textContent = emoji;
        cardLi.classList.add('card');
        cardLi.innerHTML = `
            <div class="backFace">
                <span class="icons">
                </span>
            </div> 
            <div class="frontFace">
                <span class="emojis">${emoji}</span>
            </div>
        `;
        cardLi.addEventListener('click', async () => {
            if (!cardLi.classList.contains('flipped') && cardsFlipped <= 16 && canFlip) {
                cardLi.classList.add('flipped');
                clicks++;
                if (clicks % 2 === 0) {
                    attempts++;
                    attemptsElement.textContent = `Attempts: ${attempts}`;
                    secondEmojiLi = cardLi;
                    canFlip = false;
                    await matchCheck(0.5);
                } else {
                    firstEmojiLi = cardLi;
                } 
            }            
        });
        cardsContainer.append(cardLi);
    }

    // Flip all cards for 1 second at the beginning
    setTimeout(() => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('flipped');
            setTimeout(() => {
                card.classList.remove('flipped');
            }, 1000);
        });
    }, 1000);
}

const playAgainButton = document.querySelector('#playAgainButton');

function restartGame() {
    window.location.reload();
}

playAgainButton.addEventListener('click', restartGame);

initializeGame();