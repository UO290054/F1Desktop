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

        # Obtener las coordenadas del punto inicial
        inicio = root.find('.//uniovi:coordenadasInicio', namespaces)
        longitud_inicio = inicio.find('uniovi:longitud', namespaces).text if inicio.find('uniovi:longitud', namespaces) is not None else '0'
        latitud_inicio = inicio.find('uniovi:latitud', namespaces).text if inicio.find('uniovi:latitud', namespaces) is not None else '0'
        altitud_inicio = inicio.find('uniovi:altitud', namespaces).text if inicio.find('uniovi:altitud', namespaces) is not None else '0'

        # Escribir el marcador de la meta
        kml_file.write('    <Placemark>\n')
        kml_file.write('        <name>Meta</name>\n')  # Nombre del marcador como "Meta"
        kml_file.write('        <Style>\n')
        kml_file.write('            <IconStyle>\n')
        kml_file.write('                <color>ff0000ff</color>\n')  # Azul
        kml_file.write('                <scale>1.2</scale>\n')
        kml_file.write('                <Icon>\n')
        kml_file.write('                    <href>http://maps.google.com/mapfiles/kml/paddle/1.png</href>\n')  # Icono
        kml_file.write('                </Icon>\n')
        kml_file.write('            </IconStyle>\n')
        kml_file.write('        </Style>\n')
        kml_file.write('        <Point>\n')
        kml_file.write('            <coordinates>{},{},{}</coordinates>\n'.format(longitud_inicio, latitud_inicio, altitud_inicio))
        kml_file.write('        </Point>\n')
        kml_file.write('    </Placemark>\n')

        # Generar la LineString con color rojo
        kml_file.write('    <Placemark>\n')
        kml_file.write('        <name>Ruta del Circuito</name>\n')
        kml_file.write('        <Style>\n')
        kml_file.write('            <LineStyle>\n')
        kml_file.write('                <color>ff0000ff</color>\n')  # Rojo (en formato KML: AABBGGRR)
        kml_file.write('                <width>3</width>\n')  # Grosor de la línea
        kml_file.write('            </LineStyle>\n')
        kml_file.write('        </Style>\n')
        kml_file.write('        <LineString>\n')
        kml_file.write('            <coordinates>\n')

        # Añadir la coordenada inicial al principio
        kml_file.write(f'                {longitud_inicio},{latitud_inicio},{altitud_inicio}\n')

        # Procesar todos los tramos y añadir las coordenadas
        for tramo in root.findall('.//uniovi:tramosCircuito/uniovi:tramo', namespaces):
            longitud = tramo.find('uniovi:longitud', namespaces).text if tramo.find('uniovi:longitud', namespaces) is not None else '0'
            latitud = tramo.find('uniovi:latitud', namespaces).text if tramo.find('uniovi:latitud', namespaces) is not None else '0'
            altitud = tramo.find('uniovi:altitud', namespaces).text if tramo.find('uniovi:altitud', namespaces) is not None else '0'
            kml_file.write(f'                {longitud},{latitud},{altitud}\n')

        # Añadir la coordenada inicial al final para cerrar el circuito
        kml_file.write(f'                {longitud_inicio},{latitud_inicio},{altitud_inicio}\n')

        # Cerrar LineString
        kml_file.write('            </coordinates>\n')
        kml_file.write('        </LineString>\n')
        kml_file.write('    </Placemark>\n')

        # Cerrar el KML
        kml_file.write('</Document>\n')
        kml_file.write('</kml>\n')

if __name__ == "__main__":
    input_xml = 'circuitoEsquema.xml'  # Archivo XML de entrada
    output_kml = 'circuito.kml'        # Archivo KML de salida
    generate_kml(input_xml, output_kml)
    print(f"KML generado: {output_kml}")
