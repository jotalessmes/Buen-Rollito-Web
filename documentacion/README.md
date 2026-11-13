# Prototipo Buen Rollito

Abrir `index.html` en el navegador. Sitio estático, sin instalación ni servidor obligatorio. La carta se mantiene en `js/app.js`; los precios son los observados en las capturas de Uber Eats y deben confirmarse antes de publicar.

## Fases
1. Investigación: carta y marca de las capturas, dirección, creadores y enlaces públicos.
2. Diseño: fotografías como protagonistas, colores de la marca, carta horizontal y narrativa local. Referencias: https://www.e-t.studio/works/adami (Awwwards Site of the Day: color y producto protagonista) y https://www.metropoliscreative.com/projects/myers-chang/ (carta mantenible y enlace a reparto). Se interpretan los recursos sin copiar diseños.
3. Implementación: HTML semántico, CSS responsive y JavaScript sin dependencias; navegación, filtros, carrusel de opiniones y acceso a Uber Eats.
4. Antes de publicar: confirmar carta, precios, horarios, alérgenos, identidad visual, datos legales y autorización de uso de imágenes generadas; conectar dominio, Search Console y ficha de Google. La página no procesa pedidos ni pagos: abre Uber Eats.

## Contenido y límites
- Ubicación: avenida Padre Isla 7, León. Instagram: @buenrollito.leon. Emprendedores: Iván Aller y Raúl López, según https://www.heraldodeleon.es/leon/joya-reposteria-hungara-ha-llegado-leon-dispuesta-quedarse/20260510090359088517.amp.html
- Reseñas: resúmenes atribuidos a https://www.espainfo.com/leon-capital/postres, no citas literales; sustituir por reseñas verificadas y autorizadas si se dispone de ellas.
- Las imágenes de productos son generadas; sus fondos blancos se integran visualmente mediante CSS y no tienen transparencia real. Revisar envases, marca y aspecto antes de publicar.
- El horario no se fija porque las fuentes públicas difieren. No se ha configurado analítica ni publicación.

## Mantenimiento y buenas prácticas
Usar estructura semántica, texto alternativo, foco visible y navegación de teclado; respetar `prefers-reduced-motion`. Añadir productos al array de `js/app.js` con imagen, categoría y precio comprobados. Mantener imágenes ligeras, cargar las que quedan fuera de pantalla de forma diferida y revisar móvil, tablet y escritorio. Antes de SEO público añadir dominio canónico, sitemap, datos estructurados y datos de contacto verificados. Evitar publicar datos de clientes o alérgenos no contrastados.
