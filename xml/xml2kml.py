import xml.etree.ElementTree as ET

def generate_kml(input_xml, output_kml):
    # Leer el archivo XML, incluyendo el namespace
    tree = ET.parse(input_xml)
    root = tree.getroot()

    # Definir el namespace (http://www.uniovi.es)
    namespaces = {'uniovi': 'http://www.uniovi.es'}

    # Crear el archivo KML
    with open(output_kml, 'w') as kml_file:
        # Escribir el encabezado del KML
        kml_file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        kml_file.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        kml_file.write('<Document>\n')
        kml_file.write('<name>Circuito</name>\n')

        # Procesar el punto inicial (usando namespace en XPath)
        inicio = root.find('.//uniovi:coordenadasInicio', namespaces)
        if inicio is not None:
            longitud_inicio = inicio.find('uniovi:longitud', namespaces).text if inicio.find('uniovi:longitud', namespaces) is not None else '0'
            latitud_inicio = inicio.find('uniovi:latitud', namespaces).text if inicio.find('uniovi:latitud', namespaces) is not None else '0'
            altitud_inicio = inicio.find('uniovi:altitud', namespaces).text if inicio.find('uniovi:altitud', namespaces) is not None else '0'
            
            print(f"Coordenadas de inicio: longitud={longitud_inicio}, latitud={latitud_inicio}, altitud={altitud_inicio}")
            
            # Escribir el punto de inicio en el KML
            kml_file.write('    <Placemark>\n')
            kml_file.write('        <name>Punto de Inicio</name>\n')
            kml_file.write('        <Point>\n')
            kml_file.write('            <coordinates>{},{},{}</coordinates>\n'.format(longitud_inicio, latitud_inicio, altitud_inicio))
            kml_file.write('        </Point>\n')
            kml_file.write('    </Placemark>\n')

        # Procesar los tramos del circuito (usando namespace en XPath)
        for tramo in root.findall('.//uniovi:tramosCircuito/uniovi:tramo', namespaces):
            longitud = tramo.find('uniovi:longitud', namespaces).text if tramo.find('uniovi:longitud', namespaces) is not None else '0'
            latitud = tramo.find('uniovi:latitud', namespaces).text if tramo.find('uniovi:latitud', namespaces) is not None else '0'
            altitud = tramo.find('uniovi:altitud', namespaces).text if tramo.find('uniovi:altitud', namespaces) is not None else '0'
            distancia = tramo.attrib.get('distancia', '0')  # Obtener distancia si está disponible
            
            # Imprimir los valores para depuración
            print(f"Tramo distancia={distancia}, longitud={longitud}, latitud={latitud}, altitud={altitud}")
            
            # Escribir la coordenada del tramo en el KML
            kml_file.write('    <Placemark>\n')
            kml_file.write('        <name>Tramo: {} metros</name>\n'.format(distancia))
            kml_file.write('        <Point>\n')
            kml_file.write('            <coordinates>{},{},{}</coordinates>\n'.format(longitud, latitud, altitud))
            kml_file.write('        </Point>\n')
            kml_file.write('    </Placemark>\n')

        # Cerrar el KML
        kml_file.write('</Document>\n')
        kml_file.write('</kml>\n')

if __name__ == "__main__":
    input_xml = 'circuitoEsquema.xml'  # Nombre del archivo XML de entrada
    output_kml = 'circuito.kml'        # Nombre del archivo KML de salida
    generate_kml(input_xml, output_kml)
    print(f"KML generado: {output_kml}")
