# Desarrollo y buenas prácticas

## Ejecutar
Abrir `index.html` directamente o servir la carpeta con `python -m http.server 8765` y abrir http://localhost:8765. No hace falta instalar dependencias para visualizar el prototipo; se han guardado localmente los archivos necesarios de GSAP.

## Estructura
- `index.html`: contenido, enlaces y estructura semántica.
- `css/experiencia.css`: diseño y reglas responsive, con preferencias de movimiento reducido.
- `js/experiencia.js`: catálogo, filtros, selección, reseñas y animación de scroll.
- `js/vendor/`: GSAP 3.15.1 y ScrollTrigger; la cabecera de cada archivo conserva la referencia a su licencia estándar: https://gsap.com/standard-license.
- `assets/secuencia/`: 16 fotogramas PNG con transparencia conservados del prototipo anterior; la historia actual usa el primer fotograma.
- `assets/galeria/`: imagen conceptual generada del obrador.
- `assets/marca/`: logo suministrado, favicon y versión transparente recreada.
- `productos/`: imágenes de la carta.

El diseño usa HTML, CSS y JavaScript estáticos y GSAP/ScrollTrigger para animaciones. La historia usa una imagen fija y cambia al logotipo al entrar en el capítulo de sus creadores. No utiliza un modelo 3D. Para cambiar un producto, editar el array `products` de `js/experiencia.js` y mantener el nombre de archivo correspondiente en `productos/`. Actualizar los precios solo con datos confirmados.

## Accesibilidad y rendimiento
Hay enlace para saltar a la carta, navegación de teclado, foco visible, botones con estado y alternativa a la carta si falla JavaScript. Se respeta `prefers-reduced-motion`; las imágenes secundarias se cargan de forma diferida. Las tipografías externas son opcionales y tienen fuentes de respaldo. Revisar contraste, lector de pantalla, dispositivos reales, ancho y peso de imágenes y velocidad antes de publicar. Si la animación o sus imágenes no cargan, queda visible el primer fotograma; GSAP no es necesario para navegar la página.

## SEO y lanzamiento
No se ha publicado la web ni configurado analítica o servicios externos. Antes de lanzar: URLs canónicas y sitemap con el dominio real, ficha de Google Business Profile, texto y datos locales verificados, metadatos sociales, datos estructurados validados, consentimiento y textos legales aplicables. La carta se genera con JavaScript: evaluar renderizado estático si se desea indexar cada producto como página independiente. Mantener el pedido visible y evitar animaciones que retrasen la interacción.

## Archivos anteriores
`css/styles.css` y `js/app.js` son el prototipo anterior y no se cargan desde `index.html`; se conservan como referencia.

## Diseño del carrusel
Las tarjetas de opiniones tienen esquinas redondeadas y sombras. La barra y las flechas visuales están ocultas; el desplazamiento puede pausarse o reanudarse mediante el control de texto y también se detiene al enfocar o situar el puntero sobre las opiniones.
