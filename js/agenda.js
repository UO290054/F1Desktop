class AgendaF1 {
    constructor() {
        this.apiUrl = 'http://ergast.com/api/f1/2024.json'; // URL de la API original de Ergast
    }

    // Método para obtener los eventos de la agenda
    obtenerEventos() {
        $.ajax({
            url: this.apiUrl,
            method: 'GET',
            success: (response) => {
                console.log(response); // Ver la respuesta en la consola para depuración
                const carreras = response.MRData.RaceTable.Races;
                this.mostrarEventos(carreras);
            },
            error: (error) => {
                console.error("Error en la llamada a la API de eventos de Fórmula 1", error);
            }
        });
    }

    // Método para mostrar los eventos en el HTML
mostrarEventos(carreras) {
    const agenda = $('#agenda'); // Sección de eventos
    agenda.empty(); // Limpia únicamente los eventos

    carreras.forEach(carrera => {
        const fecha = carrera.date;
        const hora = carrera.time || 'Hora no disponible';
        const nombreCarrera = carrera.raceName;
        const circuito = carrera.Circuit.circuitName;
        const localizacion = carrera.Circuit.Location;
        const lugar = `${localizacion.locality}, ${localizacion.country}`;
        const latitud = localizacion.lat;
        const longitud = localizacion.long;

        const contenido = `
            <article>
                <h3>${nombreCarrera}</h3>
                <p><strong>Circuito:</strong> ${circuito}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Hora:</strong> ${hora}</p>
                <p><strong>Ubicación:</strong> ${lugar}</p>
                <p><strong>Coordenadas:</strong> ${latitud}, ${longitud}</p>
            </article>
        `;
       agenda.append(contenido);
    });
}


}
