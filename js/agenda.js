class AgendaF1 {
    constructor() {
        this.apiUrl = 'https://api.example.com/formula1/events'; // URL de la API o fuente de datos
    }

    // Método para obtener los eventos de la agenda
    obtenerEventos() {
        $.ajax({
            url: this.apiUrl,
            method: 'GET',
            success: (response) => {
                console.log(response); // Ver la respuesta en la consola para depuración
                this.mostrarEventos(response);
            },
            error: (error) => {
                console.error("Error en la llamada a la API de eventos de Fórmula 1", error);
            }
        });
    }

    // Método para mostrar los eventos en el HTML
    mostrarEventos(data) {
        $('#agenda').empty(); // Limpia el contenido previo en el contenedor de la agenda

        data.events.forEach(evento => {
            const fecha = evento.date;
            const nombre = evento.name;
            const lugar = evento.location;

            const contenido = `
                <article>
                    <h3>${nombre}</h3>
                    <p>Fecha: ${fecha}</p>
                    <p>Ubicación: ${lugar}</p>
                </article>
            `;
            $('#agenda').append(contenido);
        });
    }
}
const eventosSimulados = {
    events: [
        { date: '2024-03-10', name: 'Gran Premio de Bahréin', location: 'Sakhir' },
        { date: '2024-03-24', name: 'Gran Premio de Arabia Saudita', location: 'Yeda' },
        { date: '2024-04-07', name: 'Gran Premio de Australia', location: 'Melbourne' },
    ]
};

// Reemplaza el método obtenerEventos para usar los datos simulados
AgendaF1.prototype.obtenerEventos = function() {
    this.mostrarEventos(eventosSimulados);
};
