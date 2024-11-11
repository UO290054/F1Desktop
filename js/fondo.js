$(document).ready(function() {
    class Fondo {
        constructor(pais, capital, circuito) {
            this.pais = pais;
            this.capital = capital;
            this.circuito = circuito;
        }

        obtenerImagenDeFondo() {
            const apiKey = '88b7b6f97456aa58892259136c19aa48';
            const tags = `${this.pais},${this.capital},"${this.circuito}"`;
            const flickrAPI = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${encodeURIComponent(tags)}&tag_mode=any&format=json&nojsoncallback=1`;

            $.ajax({
                url: flickrAPI,
                method: 'GET',
                success: (response) => {
                    console.log(response);  // Ver la respuesta en la consola para depuración
                    const fotos = response.photos.photo; // Obtiene todas las fotos devueltas
                    let imagenGrandeEncontrada = false;

                    // Itera sobre las fotos para encontrar una con sufijo "_b"
                    for (const foto of fotos) {
                        const imageUrl = `https://live.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_b.jpg`;
                        
                        // Carga la imagen de forma invisible para verificar si existe
                        const img = new Image();
                        img.src = imageUrl;

                        img.onload = function() {
                            if (!imagenGrandeEncontrada) {
                                $('#imagenes').empty();
                                $('#imagenes').append(img);
                                imagenGrandeEncontrada = true; // Marcar que se ha encontrado una imagen grande
                            }
                        };

                        img.onerror = function() {
                            console.log(`La imagen ${imageUrl} no está disponible en tamaño grande.`);
                        };

                        if (imagenGrandeEncontrada) break; // Detener la búsqueda si ya se encontró
                    }
                },
                error: (error) => {
                    console.error("Error en la llamada a la API de Flickr", error);
                }
            });
        }
    }

    const fondo = new Fondo('Netherlands', 'Zandvoort', 'Circuit of Zandvoort');
    fondo.obtenerImagenDeFondo();
});
