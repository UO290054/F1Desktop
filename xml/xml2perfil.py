import xml.etree.ElementTree as ET

def generate_svg(input_xml, output_svg):
    # Leer el archivo XML
    tree = ET.parse(input_xml)
    root = tree.getroot()

    # Definir el namespace (http://www.uniovi.es)
    namespaces = {'uniovi': 'http://www.uniovi.es'}

    # Inicializar los puntos para la polilínea
    points = []

    # Procesar los tramos del circuito (extrayendo distancia y altitud)
    for tramo in root.findall('.//uniovi:tramosCircuito/uniovi:tramo', namespaces):
        distancia = tramo.attrib.get('distancia', '0')
        altitud = tramo.find('uniovi:altitud', namespaces).text if tramo.find('uniovi:altitud', namespaces) is not None else '0'
        
        # Convertir a formato numérico
        distancia = float(distancia)
        altitud = float(altitud)
        
        # Agregar los puntos (distancia en X, altitud en Y)
        points.append((distancia, altitud))

    # Escalado para ajustar los puntos al tamaño del SVG
    max_distancia = max([p[0] for p in points])
    max_altitud = max([p[1] for p in points])

    # Crear el archivo SVG
    with open(output_svg, 'w') as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="500">\n')
        svg_file.write('<polyline points="')

        # Dibujar los puntos escalados en el SVG
        for distancia, altitud in points:
            x = (distancia / max_distancia) * 900 + 50  # Escalar a ancho 900px, margen 50px
            y = 450 - (altitud / max_altitud) * 400      # Escalar a altura 400px, margen superior 50px
            svg_file.write(f'{x},{y} ')

        svg_file.write('" style="fill:none;stroke:black;stroke-width:2" />\n')
        svg_file.write('</svg>\n')

if __name__ == "__main__":
    input_xml = 'circuitoEsquema.xml'  # Nombre del archivo XML de entrada
    output_svg = 'altimetria.svg'      # Nombre del archivo SVG de salida
    generate_svg(input_xml, output_svg)
    print(f"SVG generado: {output_svg}")
