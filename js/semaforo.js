class Semaforo {
    constructor() {
        this.luces = [
            document.getElementById('luz-1'),
            document.getElementById('luz-2'),
            document.getElementById('luz-3'),
            document.getElementById('luz-4')
        ];
        this.iniciarJuegoBtn = document.getElementById('iniciar-juego');
        this.reaccionarBtn = document.getElementById('reaccionar-juego');
        this.resultado = document.getElementById('resultado');
        this.startTime = 0;
        this.isGameStarted = false;

        this.iniciarJuegoBtn.addEventListener('click', this.iniciarJuego.bind(this));
        this.reaccionarBtn.addEventListener('click', this.medicionTiempo.bind(this));
    }

    iniciarJuego() {
        this.resetGame();
        this.resultado.textContent = 'Las luces se encenderán...';
        this.iniciarJuegoBtn.disabled = true;
        this.reaccionarBtn.disabled = true;

        // Encender las luces progresivamente en rojo
        let delay = 1000;
        this.luces.forEach((luz, index) => {
            setTimeout(() => {
                luz.style.backgroundColor = 'red';
            }, delay * (index + 1));
        });

        // Cambiar todas las luces a verde después de un tiempo aleatorio
        const tiempoAleatorio = Math.floor(Math.random() * 3000) + 3000; // entre 3 y 6 segundos
        setTimeout(() => {
            this.luces.forEach(luz => luz.style.backgroundColor = 'green');
            this.startTime = new Date().getTime(); // Guardamos el tiempo cuando las luces se ponen en verde
            this.isGameStarted = true;
            this.reaccionarBtn.disabled = false; // Habilitar el botón para reaccionar
            this.resultado.textContent = '¡Las luces están en verde! Presiona "Reaccionar"';
        }, delay * this.luces.length + tiempoAleatorio);
    }

    medicionTiempo() {
        if (!this.isGameStarted) return;

        const endTime = new Date().getTime();
        const tiempoReaccion = (endTime - this.startTime) / 1000;
        this.resultado.textContent = `Tu tiempo de reacción es: ${tiempoReaccion} segundos`;

        this.isGameStarted = false;
        this.iniciarJuegoBtn.disabled = false; // Permitir empezar una nueva partida
        this.reaccionarBtn.disabled = true; // Desactivar el botón de reacción
    }

    resetGame() {
        this.luces.forEach(luz => luz.style.backgroundColor = 'gray');
        this.resultado.textContent = '';
        this.isGameStarted = false;
        this.startTime = 0;
        this.reaccionarBtn.disabled = true; // Desactivar el botón hasta que el juego comience
    }
}

// Inicializar el semáforo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    new Semaforo();
});
