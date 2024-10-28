class Memoria {
    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.cards = document.querySelectorAll('.card');
        this.matchedCards = 0; // Contador para las cartas emparejadas
        this.totalPairs = this.cards.length / 2; // Total de pares de cartas
        this.nuevaPartidaBtn = document.getElementById('nueva-partida-btn');
        this.nuevaPartidaContainer = document.getElementById('nueva-partida-container');
        
        this.shuffleCards();
        this.addEventListeners();
        this.nuevaPartidaBtn.addEventListener('click', this.resetGame.bind(this));
    }

    // Método para barajar las tarjetas
    shuffleCards() {
        this.cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * this.cards.length);
            card.style.order = randomPos;
        });
    }

    // Método para añadir eventos de clic a las tarjetas
    addEventListeners() {
        this.cards.forEach(card => card.addEventListener('click', this.flipCard.bind(this)));
    }

    // Método para voltear la tarjeta
    flipCard(event) {
        const card = event.target.closest('.card');
        if (this.lockBoard || card === this.firstCard || card.classList.contains('flip')) return;
        card.classList.add('flip');

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
        } else {
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    // Método para comprobar si las cartas son iguales
    checkForMatch() {
        let isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;
        isMatch ? this.disableCards() : this.unflipCards();
    }

    // Método para deshabilitar las tarjetas si son iguales
    disableCards() {
        this.firstCard.removeEventListener('click', this.flipCard);
        this.secondCard.removeEventListener('click', this.flipCard);
        this.matchedCards++; // Incrementa el contador de cartas emparejadas
        this.resetBoard();
        if (this.matchedCards === this.totalPairs) {
            this.showEndGame();
        }
    }

    // Método para voltear las tarjetas si no son iguales
    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard();
        }, 1000);
    }

    // Método para resetear el tablero
    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }

    // Mostrar el botón de "Nueva Partida" cuando el juego termina
    showEndGame() {
        setTimeout(() => {
            this.nuevaPartidaContainer.style.display = 'block';
        }, 500);
    }

    // Método para reiniciar el juego
    resetGame() {
        // Oculta el botón de nueva partida
        this.nuevaPartidaContainer.style.display = 'none';
        
        // Reinicia las variables
        this.matchedCards = 0;
        this.cards.forEach(card => {
            card.classList.remove('flip');
        });

        // Vuelve a barajar las cartas
        this.shuffleCards();
    }
}

// Inicialización del juego cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    new Memoria();
});
