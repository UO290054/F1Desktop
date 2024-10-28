class Memoria {
    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.cards = document.querySelectorAll('.card');
        this.shuffleCards();
        this.addEventListeners();
    }

    // Método para barajar las tarjetas
    shuffleCards() {
        this.cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }

    // Método para añadir eventos de clic a las tarjetas
    addEventListeners() {
        this.cards.forEach(card => card.addEventListener('click', this.flipCard.bind(this)));
    }

    // Método para voltear la tarjeta
    flipCard(event) {
        const card = event.target.closest('.card'); // Ajuste para detectar la tarjeta correctamente
        if (this.lockBoard || card === this.firstCard) return;
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
        this.resetBoard();
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
}

// Inicialización del juego cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    new Memoria();
});
