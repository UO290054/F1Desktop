import xml.etree.ElementTree as ET

def generate_svg(input_xml, output_svg):
    # Leer el archivo XML
    tree = ET.parse(input_xml)
    root = tree.getroot()

    # Definir el namespace (http://www.uniovi.es)
    namespaces = {'uniovi': 'http://www.uniovi.es'}

    # Inicializar los puntos para la polilínea
    points = []
    distancia_acumulada = 0

    # Procesar los tramos del circuito (extrayendo distancia y altitud)
    for tramo in root.findall('.//uniovi:tramosCircuito/uniovi:tramo', namespaces):
        distancia = float(tramo.attrib.get('distancia', '0'))
        altitud = float(tramo.find('uniovi:altitud', namespaces).text or '0')
        
        # Acumular distancia total
        distancia_acumulada += distancia
        points.append((distancia_acumulada, altitud))

    # Escalado para ajustar los puntos al tamaño del SVG
    max_distancia = max(p[0] for p in points)
    max_altitud = max(p[1] for p in points)

    # Configuración del SVG
    width, height = 1000, 500
    margin = 50

    # Crear el archivo SVG
    with open(output_svg, 'w') as svg_file:
        svg_file.write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}">\n')
        svg_file.write('<rect width="100%" height="100%" fill="#F9F9F9" />\n')  # Fondo claro
        
        # Ejes
        svg_file.write('<line x1="50" y1="450" x2="950" y2="450" stroke="black" stroke-width="2"/>\n')  # Eje X
        svg_file.write('<line x1="50" y1="50" x2="50" y2="450" stroke="black" stroke-width="2"/>\n')   # Eje Y
        
        # Etiquetas de ejes
        svg_file.write('<text x="500" y="490" font-size="16" text-anchor="middle">Distancia (m)</text>\n')
        svg_file.write('<text x="20" y="250" font-size="16" text-anchor="middle" transform="rotate(-90, 20, 250)">Altitud (m)</text>\n')

        # Dibujar la polilínea del perfil de altimetría
        svg_file.write('<polyline points="')
        for distancia, altitud in points:
            # Escalar las coordenadas
            x = (distancia / max_distancia) * (width - 2 * margin) + margin
            y = height - margin - (altitud / max_altitud) * (height - 2 * margin)  # Invertir eje Y
            svg_file.write(f'{x},{y} ')
        svg_file.write('" style="fill:none;stroke:#FF5733;stroke-width:3" />\n')

        # Opcional: Etiquetar puntos con altitud
        for distancia, altitud in points:
            x = (distancia / max_distancia) * (width - 2 * margin) + margin
            y = height - margin - (altitud / max_altitud) * (height - 2 * margin)
            svg_file.write(f'<text x="{x}" y="{y - 10}" font-size="10" text-anchor="middle">{altitud:.1f}m</text>\n')

        svg_file.write('</svg>\n')

    

if __name__ == "__main__":
    input_xml = 'circuitoEsquema.xml'  # Nombre del archivo XML de entrada
    output_svg = 'altimetria.svg'      # Nombre del archivo SVG de salida
    generate_svg(input_xml, output_svg)
    print(f"SVG generado: {output_svg}")
