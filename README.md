# Buen Rollito Chimney Cake

Web de Buen Rollito, una tienda de chimney cakes en León. Presenta el producto y a sus creadores, la carta, opiniones, ubicación y acceso al pedido en Uber Eats.

## Ejecutar en local

Se puede abrir `index.html` directamente. Para usar un servidor local:

```bash
npm run serve
```

Abre `http://localhost:8000`. El servidor usa Python; también se puede utilizar cualquier servidor estático.

## Desarrollo y pruebas

Requisitos: Node.js 22 o posterior y npm. La web publicada es estática y no necesita Node en el servidor.

```bash
npm ci
npm run build
npm test
```

`npm run build` actualiza la carta incluida en el HTML a partir del catálogo de `js/experiencia.js` y genera `dist/` con los archivos públicos necesarios. Hay que ejecutarlo y guardar `index.html` después de cambiar el catálogo. Las pruebas comprueban los productos, recursos locales, metadatos y sintaxis del JavaScript. GitHub Actions ejecuta estas comprobaciones en `develop` y `main`.

Para regenerar las imágenes WebP desde los originales PNG/JPG:

```bash
npm run optimize:images
```

La portada dispone de tamaños adaptados y prioridad de carga; las miniaturas usan imágenes más pequeñas y carga diferida. El mapa se carga de forma diferida. El carrusel de opiniones se detiene cuando no está visible o está pausado y respeta la preferencia de movimiento reducido.

## Estructura

- `index.html`: página y carta renderizada para buscadores.
- `css/experiencia.css`: diseño adaptable.
- `js/experiencia.js`: filtros, selección de productos y animaciones.
- `js/vendor/`: GSAP y ScrollTrigger; su licencia figura en la cabecera de los archivos.
- `productos/optimizados/` y `assets/optimizados/`: imágenes servidas por la web.
- `productos/` y `assets/`: imágenes originales y recursos del proyecto.
- `scripts/`: generación de imágenes y de carta.
- `tests/`: comprobaciones automáticas.
- `documentacion/`: contexto, auditoría y decisiones del proyecto.

## Contenido y publicación

Los precios son orientativos y proceden de las capturas de Uber Eats. Las tres opiniones mostradas son fragmentos públicos estáticos consultados el 13 de noviembre de 2026; no se sincronizan automáticamente. Las imágenes de producto y del obrador incluyen recreaciones generadas. El botón de pedido abre Uber Eats, pero la selección no se transfiere al carrito.

Antes de publicar el sitio, el negocio debe confirmar precios, carta, horarios, alérgenos, datos de contacto y permisos de uso de imágenes y reseñas. Configurar dominio y HTTPS, revisar las políticas y privacidad de los servicios externos (Google Maps y Google Fonts), y comprobar indexación y rendimiento con datos de producción. Las ramas son `develop` para trabajo y pruebas, y `main` para la versión revisada.

Las imágenes del obrador se generan desde el PNG original a 768, 1000 y 1536 píxeles; el navegador elige el tamaño apropiado. La sección de los creadores utiliza el logotipo como imagen provisional.

## Despliegue en Vercel

Importa el repositorio con la raíz del proyecto en la carpeta raíz. `vercel.json` configura el proyecto estático, Node 22, `npm run build` y `dist` como carpeta de salida. La instalación de producción omite dependencias de desarrollo y scripts; `sharp` solo es necesario en desarrollo para regenerar las imágenes, que ya están incluidas en el repositorio. Si el panel tiene configuraciones manuales incompatibles (directorio raíz o comandos), revísalas. Cada cambio en `main` puede iniciar un despliegue automático si la integración Git está activada.

Después de asignar un dominio definitivo, configura la URL canónica y el sitemap con ese dominio y verifica la indexación en Google Search Console. No uses como canónica una URL provisional.

La bienvenida muestra el cartel «Abierto» y mensajes aleatorios. La barra acompaña la animación de entrada; se puede entrar sin esperar, se omite con movimiento reducido y tiene un límite de seguridad. El vídeo anterior se conserva en `assets/video/` como recurso de trabajo, pero no forma parte del despliegue.
