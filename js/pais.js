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
}


