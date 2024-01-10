'use strict'

// Función para inciar el juego. Debe tener en su interior todo el código del juego.
function initgame() {       
    const emojis = ["👾", "👽", "👹", "💩", "💀", "🙈", "🤯","🤡"];
    const cartas = document.querySelectorAll(".cartas");
   // let cards = [...emojis, ...emojis];
    let ArrayCards = [];
    let ArrayEmojis = [];
    let fallos = 0;
    let aciertos = 0;
    let cardsFlipped = 0;
    let canFlip = true;
    
    //Esto asegura que las cartas estén mezcladas de manera aleatoria.
    /*function parejas (array){ 
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    cards = parejas(cards);
    console.log(cards);
    */
    
    function cartasAleatorias(emojis) {
        let nuevoEmojis = [...emojis,...emojis]; // Hacemos una copia del array original
        let longitud = nuevoEmojis.length;
       
        for (let i = 0; i < longitud; i++) {
          let posicionAleatoria = Math.floor(Math.random()*(nuevoEmojis.length - i));
          let elementoAleatorio = nuevoEmojis.splice(posicionAleatoria, 1[0]);
       
          nuevoEmojis.push(...elementoAleatorio);
        }
       
        return nuevoEmojis;
       }

      const emojisMezclados = cartasAleatorias(emojis);
      console.log(emojisMezclados);
       

    

    // Función para que giren las cartas
    cartas.forEach(function (carta) {
        carta.addEventListener('click', function() {
            if (canFlip) {
                carta.classList.toggle('girada');
                canFlip = true;
            }
        });
    });  


    function reset() {
        const cartas = document.querySelectorAll(".cartas");
        cartas.forEach(function (carta) {
            carta.classList.remove('girada');
        });
        fallos = 0;
        aciertos = 0;
        canFlip = true;
    }
    
    const botonVolverJugar = document.getElementById('botonVolverJugar'); 
    botonVolverJugar.addEventListener('click', function () {
        reset();
    });







}

initgame();