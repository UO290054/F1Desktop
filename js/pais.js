class Pais {
    constructor(nombre, capital, circuito, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.circuito = circuito;
        this.poblacion = poblacion;
        this.gobierno = '';
        this.coordenadasMeta = '';
        this.religionMayoritaria = '';
    }

    // Método para inicializar los atributos secundarios
    setAtributosExtras(gobierno, coordenadasMeta, religionMayoritaria) {
        this.gobierno = gobierno;
        this.coordenadasMeta = coordenadasMeta;
        this.religionMayoritaria = religionMayoritaria;
    }

    // Método para obtener información principal del país
    getInfoPrincipal() {
        return `País: ${this.nombre}, Capital: ${this.capital}`;
    }

    // Método para obtener la información secundaria del país en formato de lista HTML
    getInfoSecundaria() {
        return `
            <ul>
                <li>Circuito de F1: ${this.circuito}</li>
                <li>Población: ${this.poblacion}</li>
                <li>Forma de gobierno: ${this.gobierno}</li>
                <li>Religión mayoritaria: ${this.religionMayoritaria}</li>
            </ul>
        `;
    }

    // Método para escribir la información de las coordenadas de la meta en el documento HTML
    escribirCoordenadasMeta() {
        document.write(`Coordenadas de la línea de meta: ${this.coordenadasMeta}`);
    }
    // Método para obtener el pronóstico del tiempo de los próximos 5 días
    obtenerPronostico() {
        const apiKey = 'eaa902cbd6c796bb546d0e3d3d8afd3b';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(this.capital)}&lang=es&units=metric&mode=xml&appid=${apiKey}`;
        $.ajax({
            url: url,
            method: 'GET',
            success: (response) => {
                console.log(response); // Ver el XML en la consola
                this.mostrarPronostico(response);
            },
            error: (error) => {
                console.error("Error en la llamada a la API de OpenWeatherMap", error);
            }
        });
    }

    // Método para mostrar el pronóstico en el documento HTML
    mostrarPronostico(xml) {
        const dias = $(xml).find('time').slice(0, 5); // Toma solo los primeros 5 días
        $('#pronostico').empty();

        dias.each(function() {
            const fecha = $(this).attr('from').split('T')[0];
            const temperaturaMax = $(this).find('temperature').attr('max');
            const temperaturaMin = $(this).find('temperature').attr('min');
            const humedad = $(this).find('humidity').attr('value');
            const descripcion = $(this).find('symbol').attr('name');
            const icono = $(this).find('symbol').attr('var');

            const contenido = `
                <article>
                    <h3>${fecha}</h3>
                    <p>Temperatura Máx: ${temperaturaMax}°C</p>
                    <p>Temperatura Mín: ${temperaturaMin}°C</p>
                    <p>Humedad: ${humedad}%</p>
                    <p>Descripción: ${descripcion}</p>
                    <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                </article>
            `;
            $('#pronostico').append(contenido);
        });
    }
}


