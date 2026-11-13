# Dominio, SEO local y Google

## Estado que queda preparado en el proyecto

- Canonical, Open Graph y Twitter Cards se completan en compilación con el dominio de producción.
- El JSON-LD `Bakery` incluye URL, nombre, descripción, dirección, coordenadas, mapa, logotipo e Instagram.
- No se incluyen teléfono ni horarios hasta que el negocio los confirme.
- No se publica `aggregateRating` para opiniones propias del negocio.
- `dist/sitemap.xml` incluye la portada; `dist/robots.txt` la anuncia en producción.
- Los builds de vista previa/local quedan marcados `noindex,nofollow` y no exponen el sitemap de producción.
- Search Console y la ficha de Empresa requieren acceso y verificación de Google por parte de quien administra el negocio.

## Variables de dominio

`SITE_URL` (preferida) permite fijar una URL completa como `https://buenrollito.es`. Si no existe, se toma `VERCEL_PROJECT_PRODUCTION_URL`, luego `VERCEL_URL`. Vercel debe exponer las variables de sistema durante la compilación para resolver el dominio asignado. Si se usa una URL de deployment `.vercel.app` al principio, un nuevo deployment tras configurar el dominio recalculará canonical, recursos sociales y sitemap.

## Lista de comprobación antes y después del dominio

- [ ] Configurar dominio y redirección de variantes a una única URL HTTPS en Vercel.
- [ ] Activar variables del sistema o fijar `SITE_URL` para Production.
- [ ] Confirmar canonical, `robots.txt`, `sitemap.xml` y URL de imagen social publicados en el dominio principal.
- [ ] Verificar propiedad de Dominio en Search Console mediante TXT y enviar `/sitemap.xml`.
- [ ] Inspeccionar la URL principal y solicitar indexación.
- [ ] Reclamar/verificar la ficha existente de Google Business Profile y añadir el sitio web definitivo.
- [ ] Añadir Uber Eats como enlace de pedido cuando el tipo de ficha lo permita.
- [ ] Confirmar categoría, horarios, teléfono y ubicación con el negocio; revisar coherencia de nombre/dirección/teléfono.
- [ ] Sustituir imágenes conceptuales por fotos reales autorizadas cuando estén disponibles.

## Límites

El sitemap y la solicitud de indexación son señales, no garantías de inclusión en Google. Tener mapa incrustado, schema o una ficha no asegura una posición concreta. La ficha puede pedir verificación adicional y solo su propietario puede completar cambios restringidos. El sitio todavía necesita que el negocio confirme los datos de contacto y horarios.
