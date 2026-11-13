# Buen Rollito Chimney Cake

Web de Buen Rollito, una tienda de chimney cakes en León. Presenta el producto y a sus creadores, la carta, opiniones, ubicación y acceso al pedido en Uber Eats.

## Ejecutar en local

Para probar la misma salida estática que publica Vercel:

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

`npm run build` actualiza la carta incluida en el HTML a partir del catálogo de `js/experiencia.js` y genera `dist/` con los archivos públicos necesarios. También empaqueta Speed Insights en `dist/js/speed-insights.bundle.js`. Hay que ejecutarlo y guardar `index.html` después de cambiar el catálogo. Las pruebas comprueban los productos, recursos locales, metadatos y sintaxis del JavaScript. GitHub Actions ejecuta estas comprobaciones en `develop` y `main`.

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

Importa el repositorio con la raíz del proyecto en la carpeta raíz. `vercel.json` configura el proyecto estático, Node 22, `npm run build` y `dist` como carpeta de salida. La instalación de producción omite dependencias de desarrollo y scripts; `sharp` solo es necesario para regenerar imágenes, que ya están incluidas. `esbuild` empaqueta Speed Insights durante la compilación y el paquete no se envía al navegador como dependencia. Si el panel tiene configuraciones manuales incompatibles (directorio raíz o comandos), revísalas. Cada cambio en `main` puede iniciar un despliegue automático si la integración Git está activada.

Speed Insights se integra con `@vercel/speed-insights`: `js/speed-insights.js` llama a `injectSpeedInsights()` y `scripts/build-site.cjs` lo empaqueta para la web estática. Hay que habilitar **Speed Insights** en el panel del proyecto de Vercel; al publicar una compilación posterior, Vercel servirá la ruta de captura. Los datos de rendimiento aparecerán cuando haya visitas reales y el panel las haya procesado. Esta integración mide Core Web Vitals; no es un contador de visitas ni analítica de conversiones.

### Dominio, SEO e indexación en Google

La compilación genera `canonical`, Open Graph, Twitter Cards, datos estructurados `Bakery`, `robots.txt` y `sitemap.xml`. Usa `SITE_URL` si está definida; en Vercel utiliza `VERCEL_PROJECT_PRODUCTION_URL` y, si no está disponible, `VERCEL_URL`. En producción permite el rastreo y en local/previews aplica `noindex,nofollow` y bloquea el rastreo para evitar que Google indexe versiones temporales. La página es una landing de una sola URL; sus secciones con anclas no se añaden como páginas separadas al sitemap.

Para que el dominio personalizado quede como URL canónica en Vercel:

1. Añade el dominio en **Project → Settings → Domains** y sigue allí las instrucciones DNS. Elige una variante principal (`https://tudominio.es`) y redirige las variantes alternativas (`www` o dominio raíz) a ella.
2. En **Project → Settings → Environment Variables**, activa **Automatically expose System Environment Variables**. Comprueba que el build de producción recibe `VERCEL_PROJECT_PRODUCTION_URL`. Alternativa: crea `SITE_URL=https://tudominio.es` para el entorno **Production**. No incluyas ruta final.
3. Lanza un nuevo deployment de producción después de asignar el dominio. Comprueba que `https://tudominio.es/` responde, y que `https://tudominio.es/robots.txt` y `https://tudominio.es/sitemap.xml` mencionan el dominio definitivo. Revisa el canonical del HTML publicado.
4. El dominio no sustituye las tareas de Google: hay que verificar e indexar el sitio con Search Console y completar la ficha de Empresa.

### Google Search Console

1. Abre [Google Search Console](https://search.google.com/search-console/) y añade una propiedad **Dominio** con `tudominio.es`, sin `https://` ni rutas.
2. Copia el registro TXT que proporciona Google y añádelo en la zona DNS que realmente gestiona el dominio (Vercel DNS solo si delegas allí los nameservers; si no, usa el proveedor DNS actual). Mantén el TXT para conservar la verificación y pulsa **Verificar**.
3. En Search Console → **Sitemaps**, envía `https://tudominio.es/sitemap.xml`.
4. Usa **Inspección de URL** con `https://tudominio.es/`, comprueba la URL canónica seleccionada y pulsa **Solicitar indexación** si procede. Google decide cuándo y si indexar; la solicitud no garantiza inclusión inmediata.
5. Revisa después las páginas indexadas, problemas de experiencia móvil y Core Web Vitals. Speed Insights mide rendimiento de visitas, no sustituye Search Console ni mide por sí solo pedidos o conversiones.

### Perfil de Empresa de Google (Google Business Profile)

1. Busca primero “Buen Rollito Chimney Cake” en [Google Maps](https://www.google.com/maps) y reclama o solicita acceso a la ficha existente. No crees una segunda ficha si ya existe.
2. Completa el proceso de verificación que Google ofrezca al propietario. En **Editar perfil → Información de contacto → Sitio web**, añade la URL canónica completa con HTTPS. En pedidos, conserva o configura el enlace directo de Uber Eats si esa opción está disponible en la ficha.
3. Comprueba nombre real del negocio, categoría principal, dirección `Av. del Padre Isla, 7, 24002 León`, pin del mapa, teléfono, horarios y días festivos. Mantén nombre, dirección y teléfono iguales en la web, la ficha y otros directorios. Los horarios y el teléfono todavía deben confirmarlos los responsables; no se han inventado ni se muestran como datos estructurados.
4. Añade fotos auténticas y autorizadas del local, fachada, productos y equipo; responde a las reseñas desde la ficha. No ofrezcas incentivos por reseñas ni publiques valoraciones falsas.
5. Una vez verificada, revisa en la ficha que el botón **Sitio web** abre el dominio final, que el enlace de pedido funciona y que el pin lleva a la entrada correcta.

La web usa datos estructurados `Bakery` para describir negocio, dirección, coordenadas y URL. No incluye estrellas agregadas: las reseñas propias de una empresa no deben marcarse para intentar obtener estrellas enriquecidas en Google. El mapa incrustado puede facilitar la orientación, pero por sí solo no asegura mejores posiciones. El perfil verificado, los datos correctos y contenido local útil son las tareas clave.

Más contexto y verificaciones: [documentacion/SEO-DOMINIO-GOOGLE.md](documentacion/SEO-DOMINIO-GOOGLE.md).

La bienvenida muestra el cartel «Abierto» y mensajes aleatorios. La barra acompaña la animación de entrada; se puede entrar sin esperar, se omite con movimiento reducido y tiene un límite de seguridad. El vídeo anterior se conserva en `assets/video/` como recurso de trabajo, pero no forma parte del despliegue.

En móviles, la historia presenta el texto arriba y mantiene la ilustración debajo durante el desplazamiento por los dos capítulos. En escritorio se conserva la composición en dos columnas.
