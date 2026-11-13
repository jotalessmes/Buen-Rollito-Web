# Auditoría SEO — Buen Rollito Chimney Cake

Fecha: 13 de noviembre de 2026. Alcance: prototipo local de una sola página, disponible en index.html y servido temporalmente en 127.0.0.1. Negocio local de repostería con salida a Uber Eats.

## Resumen

**Puntuación global: no calculable de forma responsable.** La metodología de la herramienta incluye factores de indexación, servidor y Core Web Vitals que no se pueden medir para un archivo local sin visitantes reales ni dominio publicado. Dar una nota de 0 a 100 sugeriría una precisión que esta revisión no tiene.

**Prioridades:** publicar en un dominio HTTPS definitivo; presentar la carta principal en el HTML inicial; optimizar la imagen de portada; confirmar datos del negocio; revisar la navegación y legibilidad en móvil. Estas son acciones de preparación, no evidencia de una penalización.

## Qué se ha comprobado

- Lectura del HTML, CSS y JavaScript y del catálogo de recursos locales. La herramienta fetch_page.py obtuvo la página mediante un servidor temporal en localhost: HTTP 200. Una URL file:// no es accesible a Google por Internet.
- Página única: enlaces internos de navegación son anclas; no se han encontrado otras páginas públicas que rastrear. Un rastreo de hasta 500 páginas no aporta información adicional en este prototipo.
- Vista visual en escritorio y en viewport móvil de 390 × 844; interacción con el acceso a la carta. No se han guardado capturas como archivos.
- No se han comprobado tráfico orgánico, posiciones, Search Console, servidor de producción, métricas de usuarios reales, Rich Results Test ni análisis de Lighthouse.

## Hallazgos técnicos

### Alta — Publicación e indexación

El archivo local todavía no puede aparecer en Google. Una vez exista un dominio, publicar por HTTPS, comprobar que devuelve HTTP 200 y que no tiene restricciones de indexación; después validar el sitio y solicitar su rastreo en Search Console. La inexistencia de robots.txt, sitemap.xml y canonical en el prototipo no equivale a un bloqueo ni justifica inventar un dominio. Un sitemap es opcional para un sitio pequeño y no garantiza indexación.

### Alta — Carta dependiente de JavaScript

Los nombres, precios e imágenes de los 24 productos se insertan desde js/experiencia.js. En HTML inicial hay contenedores vacíos y un enlace alternativo a Uber Eats. Google puede ejecutar JavaScript, pero renderizar contenido añade una etapa y otros rastreadores o usuarios sin JavaScript pueden no verlo. Recomendación: entregar al menos productos principales, nombres y descripciones en HTML inicial o generar HTML estático; no es necesario crear 24 páginas de baja calidad.

Fuente: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

### Media — Datos estructurados

Existe un JSON-LD que se puede interpretar como Bakery y contiene nombre, dirección, coordenadas, mapa e Instagram. Coincide en lo esencial con la información visible. Al publicar, verificarlo con el test de resultados enriquecidos, añadir la URL real y completar imagen, contacto y horario solo cuando sean confirmados. No añadir una valoración agregada de reseñas de terceros sin comprobar la elegibilidad de Google. El mapa y el marcado no garantizan posiciones ni resultados enriquecidos.

Fuente: https://developers.google.com/search/docs/appearance/structured-data/local-business

### Media — Página, enlaces y metadatos

Hay lang=es, viewport, un único H1, title específico para marca y León y meta description propia. Conviene comprobar su aspecto en resultados una vez exista URL. Faltan Open Graph y una imagen social específica para previsualizaciones compartidas; estas etiquetas no son un factor directo demostrado de posicionamiento. Los H2 son creativos, pero pueden acompañarse de texto más explícito sobre chimney cakes, sabores y ubicación.

## Contenido y confianza

- La dirección está en texto visible y se incluye un mapa. El horario remite a Instagram; falta publicar un teléfono y horario confirmados por el negocio. No inventar alérgenos ni modalidades de entrega.
- Los creadores tienen nombres y una fuente externa enlazada. La fotografía de los fundadores está pendiente; el logotipo ocupa su lugar.
- Las imágenes de producto y la del obrador son generadas. La imagen del obrador se identifica como conceptual; para la publicación conviene sustituirlas o complementarlas con fotos reales autorizadas, especialmente cuando podrían crear expectativas sobre el producto.
- Las reseñas son tres fragmentos estáticos de Google, fechados al 13/11/2026; no representan todas las opiniones ni se actualizan automáticamente. Los enlaces de cada tarjeta abren la ficha general, no la reseña individual. Revisar atribución, condiciones de uso y vigencia antes de publicar.
- Añadir un texto conciso y útil sobre qué es el chimney cake, sabores reales, cómo pedir y recoger, y preguntas sobre alérgenos. Evitar objetivos arbitrarios de número de palabras o densidad de palabras clave.

## Rendimiento e imágenes

- Imagen transparente de portada: 1.342.136 bytes (aprox. 1,28 MiB), 1254 × 1254. Tiene preload y fetchpriority=high, pero carece de srcset/sizes: riesgo para conexiones móviles.
- Los 24 PNG de producto suman 7.754.223 bytes (aprox. 7,40 MiB) en disco. Las imágenes del catálogo se crean con loading=lazy, pero las miniaturas y el destacado reutilizan los mismos archivos. No se afirma que todos esos bytes se descarguen en cada visita.
- GSAP y ScrollTrigger locales suman 118.040 bytes sin compresión de transporte. CSS importa Google Fonts; el mapa usa iframe diferido.
- La pantalla de carga puede tapar la página hasta el evento load más 600 ms, con un límite de 2,2 s. Revisar su impacto real y permitir que el contenido aparezca antes. El bucle del carrusel sigue solicitando animation frames incluso cuando no desplaza; detenerlo fuera de pantalla o durante la pausa.
- Probar derivados WebP/AVIF y tamaños responsive, preservando transparencia y calidad. Medir antes y después: no se ha calculado un ahorro concreto.
- **LCP, INP y CLS: no medidos.** No es posible atribuir puntuaciones reales de usuarios a una página local. Los umbrales orientativos de Google son LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1, en el percentil 75 de datos reales.

Fuente: https://developers.google.com/search/docs/appearance/core-web-vitals

## Observación visual y accesibilidad

En móvil se ve la identidad y la imagen, y el botón de pedido permanece visible. Se observan textos secundarios muy pequeños y navegación superior horizontal parcialmente oculta sin indicación clara. La barra inferior de pedido ocupa parte de la pantalla y puede tapar contenido; comprobar con zoom, teclado y lector de pantalla. En la carta los filtros son desplazables y aparece una barra horizontal nativa. No se ha realizado una auditoría completa WCAG ni pruebas físicas en dispositivos.

## Visibilidad en buscadores de IA

La página ofrece nombre, localización y explicación general, pero aún no está publicada y carece de señales de disponibilidad de una URL pública. No hay datos suficientes para asignar una puntuación de citabilidad o prometer apariciones en sistemas de IA. Mejorar precisión de la información, contenido propio y datos de contacto; comprobar rastreadores tras publicar.

## Fuentes y límites

- Google, negocios locales: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google, JavaScript: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google, contenido diferido: https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading
- Google, Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

Este informe analiza el estado local observado; no garantiza posiciones ni indexación y no equivale a una auditoría de producción.
