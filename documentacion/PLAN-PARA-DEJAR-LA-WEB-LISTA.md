# Plan paso a paso para dejar la web lista

**Proyecto:** Buen Rollito Chimney Cake, León  
**Fecha de revisión:** 14 de noviembre de 2026  
**Estado:** se han aplicado correcciones locales de accesibilidad y del mensaje de carga; falta validación del negocio y publicación. No se han inventado datos legales, horarios ni alérgenos.

## Qué significa «lista»

La web actual es una página informativa y de carta. El pedido y el pago se terminan en Uber Eats o Glovo, no en un carrito propio de esta web. Por eso, el negocio debe asegurar que las plataformas muestran la información alimentaria y contractual que necesitan sus pedidos; esta página debe informar con claridad, enlazar correctamente y no activar integraciones opcionales antes de tiempo.

Esta guía organiza el trabajo y evita completar datos legales o de seguridad alimentaria por intuición. No es una certificación jurídica ni sustituye la validación del responsable del negocio o de un asesor especializado.

## Estado encontrado en el proyecto

- La web muestra dirección y teléfono, pero no encuentro páginas de aviso legal, privacidad o cookies enlazadas en el pie.
- `vercel.json` ya declara revalidación del HTML, caché moderada para recursos estáticos y cabeceras básicas; falta comprobar la respuesta real de Vercel.
- El mapa de Google se incrusta directamente en un `iframe` (aunque se carga de forma diferida); Google Fonts se solicita a Google desde el navegador.
- Speed Insights de Vercel se carga en las visitas de producción.
- Los enlaces de Instagram, Uber Eats y Glovo, el mapa de Google, Google Fonts y Vercel Speed Insights se conservan como integraciones previstas.
- `js/loading.js` elige un mensaje aleatorio en memoria; ya no usa `sessionStorage` ni `localStorage` para recordarlo.
- Se añadió etiqueta accesible al indicador de carga, foco visible, enlace para saltar al contenido, objetivos de interacción de al menos 44 px en controles principales y ajustes de contraste/colores forzados.
- La carta se mantiene en `js/experiencia.js` y se renderiza en el HTML al compilar. Ahí aparecen 24 productos y precios.
- Hay precios promocionales en las capturas de plataformas que no son necesariamente permanentes. El catálogo actual usa precios normales como 11,50 € para Pack 2 y 22,00 € para Pack 4.
- En la captura aportada aparece Cacaolat, pero no figura en el catálogo actual de 24 productos. Hay que confirmar si sigue disponible.
- La web no contiene ingredientes ni una matriz de alérgenos confirmada. Las descripciones públicas no bastan para certificar que un producto sea seguro para una alergia.
- El README avisa de que algunas imágenes del producto/obrador son recreaciones generadas y que hay que confirmar permisos de imágenes y reseñas.
- No veo correo de contacto ni horarios confirmados por los responsables.

## Orden recomendado de trabajo

### Paso 1 — Reunir los datos legales del negocio

**Lo facilita:** titular o responsable del establecimiento.  
**Dónde registrarlo:** completar esta tabla en una copia interna y validada de este documento, o en un formulario privado del negocio. No enviéis NIF ni documentación sensible en un repositorio público.

| Dato que falta | Qué hay que aportar | Para qué se usa |
|---|---|---|
| Titular legal | Nombre y apellidos si es autónomo, o razón social completa si es sociedad | Aviso legal y responsable de privacidad |
| NIF/CIF | Identificador fiscal del titular | Aviso legal y facturación/contacto cuando corresponda |
| Forma jurídica | Autónomo, SL u otra | Determinar qué datos registrales deben publicarse |
| Domicilio del titular | Domicilio profesional o domicilio social que corresponda | Aviso legal y contacto del responsable |
| Registro mercantil u otro registro | Registro, tomo/hoja/folio o datos que sean aplicables | Aviso legal, solo si corresponde a la forma jurídica |
| Correo de contacto | Buzón que se revise y pueda atender solicitudes | Contacto directo y solicitudes de privacidad |
| Teléfono público | Confirmar `+34 697 84 22 85` y quién lo atiende | Aviso legal, contacto y ficha local |
| Dirección del local | Confirmar `Av. del Padre Isla, 7, 24002 León` | Web, ficha local y atención presencial |
| Nombre comercial | Confirmar «Buen Rollito Chimney Cake» y grafía preferida | Web y consistencia de marca |
| Horarios | Días, franjas, festivos y horario de pedidos | Web, Uber Eats, Glovo y Google Business Profile |

La LSSI exige que la información identificativa y de contacto del prestador esté disponible de forma permanente, fácil, directa y gratuita. En el aviso legal se publicarán los datos que correspondan a la persona o empresa que explota la web; no se debe inventar una sociedad ni usar datos personales de los creadores si el titular legal es otro. [LSSI, art. 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

### Paso 2 — Confirmar carta, precios y disponibilidad

**Lo podemos preparar nosotros:** transcribir los productos, precios y descripciones visibles, detectar diferencias con el catálogo web y ordenar la tabla de revisión.  
**Lo confirma el negocio:** qué se vende ahora, cuáles son precios normales, qué promociones están activas y en cuál de las plataformas.

El catálogo actual de código (`js/experiencia.js`) incluye:

| Categoría | Productos y precio actual en la web |
|---|---|
| Chimney cakes | Azúcar y canela 4,90 €; cacao 5,60 €; coco 5,60 €; Lotus 6,20 €; pistacho 6,20 €; nuez 6,20 € |
| Packs | Pack 2 11,50 €; Pack 4 22,00 €; Pack 6 32,00 € |
| Combos | Roll + café 7,50 €; roll + chocolate caliente 8,00 € |
| Chocolate | Chocolate caliente (220 ml) 3,50 € |
| Cafés | Expreso, cortado, americano, capuccino y café con leche: 1,80 € cada uno |
| Bebidas | Agua 1,50 €; Coca-Cola, Fanta limón, Fanta naranja, Nestea y Aquarius: 1,80 € cada una |

**Diferencias que requieren decisión:**

1. Cacaolat estaba en la captura de carta facilitada anteriormente, pero no está en el catálogo actual. Confirmar si debe volver a la web y su precio actual.
2. Las capturas de Uber Eats muestran promociones temporales (por ejemplo, Pack 2 y Pack 4 con descuento en una sección promocional); el catálogo de código muestra sus precios no promocionales. Mantener un precio normal estable y añadir promociones solo si el negocio quiere mantenerlas y puede revisarlas a menudo.
3. Comprobar la carta en ambas plataformas con una dirección de entrega de León y confirmar productos agotados, variaciones y precios. La disponibilidad, promociones, tarifas y condiciones pueden variar según dirección, hora y cuenta.

En la consulta pública de Uber Eats realizada el 13-11-2026 pude confirmar la ficha, dirección y parte de la carta, incluidos precios de chimneys, packs y combos. Glovo muestra la ficha de Buen Rollito en su catálogo público, pero el detalle de menú no fue accesible de forma estable en esta consulta. Por tanto, no doy por verificada desde fuera la igualdad producto a producto en ambas plataformas: el negocio debe confirmar las fichas en sus paneles de comerciante. [Uber Eats: ficha y menú](https://www.ubereats.com/es-en/store/buen-rollito-chimney/FR-O0IdEUKGz2xKdPgEbtg) · [Glovo: tienda](https://glovoapp.com/es/es/leon/stores/buen-rollito-chimney-cake-leon)

**Registro interno recomendado:** mantener un único archivo privado de control con columnas `producto`, `precio web`, `precio Uber`, `precio Glovo`, `promoción y fechas`, `última comprobación`, `confirmado por`. Si los precios ordinarios coinciden en las plataformas, actualizar la web desde ese registro. No copiar las tarifas de entrega ni el precio personalizado que ve cada cliente.

### Paso 3 — Crear la matriz de ingredientes y alérgenos

**Esto no se puede completar con seguridad solo mirando Uber Eats/Glovo.** Las plataformas describen algunos toppings, pero no aportan la receta completa, fichas de proveedores, ingredientes de masas, sustituciones, contaminación cruzada ni utensilios compartidos. Una descripción como «pistacho» solo permite marcar una pista que debe verificarse; no permite asegurar que el resto de alérgenos esté ausente.

**Lo facilita y valida:** responsable de cocina/obrador, usando recetas vigentes, fichas técnicas y etiquetas de los proveedores.  
**Dónde registrarlo:** hoja interna de alérgenos con control de versión y fecha; guardar fichas técnicas de ingredientes. Tras validación, el negocio actualiza las fichas de Uber Eats y Glovo y nos da el texto aprobado para la web.

#### Datos a recopilar por ingrediente y producto

- Receta y cantidades/ingredientes de cada masa, cobertura, bebida, topping y combo.
- Etiqueta o ficha técnica vigente de cada producto comprado, con lista de ingredientes y alérgenos destacados.
- Sustituciones posibles por falta de stock y variaciones por tamaño o sabor.
- Procedimientos de manipulación, almacenamiento y utensilios/superficies compartidos.
- Riesgo real de contacto cruzado y medidas aplicadas. No usar «puede contener» como frase genérica: debe responder a una evaluación real.
- Confirmación de qué información acompaña al pedido y quién mantiene actualizados los datos en cada plataforma.

#### Pistas que sí pueden extraerse del texto público, sin publicarlas como matriz definitiva

| Producto o familia | Pista visible en la descripción | Qué falta para confirmarlo |
|---|---|---|
| Base de chimney cake | Es una masa; la web la describe como masa artesanal | Ingredientes exactos y fichas de harina, grasas, huevo, leche u otros componentes |
| Pistacho | La ficha de Uber Eats dice que lleva pistacho triturado | Confirmar ingrediente/proveedor, posible contacto cruzado y alérgenos de la masa |
| Nuez | La ficha de Uber Eats dice que lleva nuez troceada | Confirmar tipo específico de fruto de cáscara, proveedor y contacto cruzado |
| Lotus | Se describe como inspirado en galletas Lotus | Revisar producto y etiqueta exactos; no deducir la lista completa de alérgenos por la marca |
| Coco | La descripción cita coco rallado | Confirmar ingrediente y ficha; el coco no aparece como fruto de cáscara en la lista reglamentaria de frutos de cáscara, pero esto no demuestra ausencia de otros alérgenos ni descarta alergia individual |
| Cacao y azúcar/canela | La descripción cita cobertura de cacao o mezcla de azúcar y canela | Revisar ingredientes del topping y de la masa |
| Chocolate caliente | Uber Eats lo describe como receta propia | Receta, ingredientes de chocolate/base y leche, si se utiliza |
| Cortado, capuccino y café con leche | El nombre indica leche como preparación habitual | Confirmar leche concreta, alternativas, contaminación cruzada y opciones disponibles |
| Roll + café / roll + chocolate | El combo incluye un roll y bebida | Alérgenos de cada variante del roll y de la bebida elegida |
| Packs | Incluyen varios chimney cakes o sabores | La ficha debe contemplar todas las combinaciones elegibles del pack |
| Bebidas de marca | Se venden como bebidas envasadas | Consultar etiqueta vigente del envase servido y opciones/tamaño reales |

La lista legal de referencia comprende 14 grupos: cereales con gluten, crustáceos, huevos, pescado, cacahuetes, soja, leche, frutos de cáscara especificados, apio, mostaza, sésamo, sulfitos por encima del umbral legal, altramuces y moluscos. No debe ponerse «sin alérgenos» o «apto para» sin verificar receta y manipulación. [Reglamento (UE) 1169/2011, anexo II](https://eur-lex.europa.eu/legal-content/ES/ALL/?uri=CELEX%3A32011R1169)

La información de alérgenos debe estar disponible **antes de la compra a distancia** y acompañar por escrito al alimento en la entrega cuando corresponda, también para alimentos no envasados. Por eso el negocio debe comprobar la información en las fichas de las plataformas, además de la web. [AESAN: venta de alimentos por internet](https://www.aesan.gob.es/operadores-economicos/comercializacion-alimentos-internet) · [AESAN: venta a distancia](https://eletiquetadocuentamucho.aesan.gob.es/media/guia-informacion-alimentaria.pdf)

**Resultado de esta revisión:** puedo montar la tabla y precargar las pistas anteriores como `PENDIENTE DE VALIDAR`; no debo convertirlas en declaraciones definitivas en la web sin la documentación del obrador.

### Paso 4 — Inventariar y conservar los servicios externos

**Decisión recibida:** conservar todas las integraciones actuales. No se retirarán Google Maps, Google Fonts, Vercel Speed Insights ni los enlaces a Instagram, Uber Eats y Glovo.  
**Pendiente:** comprobar en el navegador el almacenamiento/red que activa cada integración y describirlo con precisión en la política. Si alguna integración no esencial usa cookies o tecnologías similares sujetas a consentimiento, debe cargarse conforme a la elección válida del visitante; conservar una integración no equivale a permitir que se active antes del consentimiento cuando este sea exigible.

| Servicio actual | Estado y siguiente acción |
|---|---|
| Google Fonts | Se conserva. Inventariar solicitudes y datos comunicados a Google; registrar el proveedor en la documentación de privacidad aplicable. |
| Google Maps | Se conserva el mapa incrustado. Medir cookies/almacenamiento antes y después de cargarlo y aplicar bloqueo previo si el análisis confirma que es necesario. |
| Mensajes aleatorios de carga | Se conservan y se eligen solo en memoria, sin persistencia en el dispositivo. |
| Vercel Speed Insights | Se conserva. Verificar configuración real del proyecto, documentación del proveedor y posibles transferencias; reflejarlo con exactitud en privacidad/cookies. |
| Instagram, Uber Eats y Glovo | Se conservan los enlaces de salida. El visitante continúa en esos servicios; comprobar destinos, titularidad de las fichas y textos comerciales. |

Si tras el análisis no quedan tecnologías no exentas de consentimiento, quizá no haga falta un banner de cookies; aun así debe existir una política de cookies transparente si la web utiliza esas tecnologías o informa de que no usa cookies no necesarias. Si quedan tecnologías que requieren consentimiento, el panel debe permitir aceptar, rechazar y configurar con opciones claras y sin carga previa de las categorías opcionales. La guía vigente de la AEPD explica la información, la retirada del consentimiento y las tecnologías similares a cookies. [AEPD: Guía sobre el uso de las cookies](https://www.aepd.es/guias/guia-cookies.pdf)

### Paso 5 — Redactar y validar las páginas legales

**Podemos redactar el primer borrador** cuando estén completos los pasos 1 y 4. El titular/asesor debe validar su contenido antes de publicar.  
**Dónde aparecerán:** enlaces permanentes en el pie de página, visibles desde todas las secciones; también disponibles desde el panel de cookies si existe.

1. **Aviso legal:** identificación del titular, domicilio, contacto directo, NIF y registro cuando proceda; titularidad y condiciones de uso del sitio.
2. **Política de privacidad:** responsable, finalidades, bases jurídicas, datos tratados, destinatarios/proveedores, transferencias internacionales si las hay, conservación, derechos, cómo reclamarlos y contacto. Explicar que el pago/pedido se realiza en las plataformas externas y no en el sitio, si así sigue funcionando.
3. **Política de cookies/tecnologías similares:** inventario real por finalidad, proveedor, caducidad y forma de gestionar/revocar preferencias. No copiar una plantilla que mencione servicios que no están instalados.
4. **Panel de consentimiento, si aplica:** aceptar, rechazar y configurar con el mismo nivel de claridad inicial; categorías opcionales apagadas por defecto; guardar la elección, permitir reabrir el panel y conservar evidencia mínima del consentimiento según la solución elegida.
5. **Información de alérgenos:** publicar solo la matriz validada y mantener el mismo dato en web y plataformas. Enlazarla cerca de la carta y del acceso al pedido.

No se necesita añadir condiciones de un checkout propio mientras la web no recoja pedidos ni pagos directamente. Si más adelante se incorpora carrito, reserva con pago, promociones con registro o newsletter, hay que volver a evaluar contratación, consumo, comunicaciones comerciales y privacidad antes de lanzar esa función.

### Paso 6 — Comprobar accesibilidad y contenido

**Hecho localmente:** revisé con teclado el salto al contenido y el selector de pedidos; el diálogo tiene nombre accesible, se abre y presenta enlaces a Uber Eats y Glovo. El árbol de accesibilidad expone encabezados, regiones, botones y textos alternativos. Se añadió anuncio semántico del progreso de carga, foco visible, controles principales de 44 px, contraste reforzado en etiquetas pequeñas y soporte de colores forzados.  
**Pendiente de verificación manual:** VoiceOver/TalkBack, ampliación/zoom, navegación completa de todas las secciones, preferencias de movimiento reducido y lectura del contenido del mapa integrado. La revisión automatizada y por teclado no constituye una certificación WCAG.  
**El negocio confirma:** fotos auténticas, historia de los creadores, horarios, ingredientes y autorización para publicar reseñas.

Acciones:

- Volver a probar que el selector Uber/Glovo se puede recorrer con teclado, cerrar con Escape y devuelve el foco al botón que lo abrió tras integrar los cambios.
- Revisar que los textos no dependan solo de color/iconos y que las imágenes decorativas tengan `alt` vacío y las informativas describan contenido real.
- Etiquetar las fotos generadas como ilustrativas si pueden confundirse con una fotografía real del producto; priorizar fotos autorizadas del producto vendido.
- Confirmar el origen y permiso de las reseñas, mantener su texto exacto y ofrecer acceso a la fuente; retirar las que no se puedan justificar.
- Comprobar que precios y descripciones no prometen ingredientes, atributos o disponibilidad que el negocio no pueda garantizar.

La referencia técnica usada es WCAG 2.2 AA como objetivo de calidad; esto no equivale a declarar conformidad. El artículo 14 del Real Decreto 193/2023 incluye webs de titularidad privada cuyo contenido se refiere a bienes/servicios a disposición del público y remite a los criterios del RD 1112/2018 y prioridad A/AA de UNE 139803. Su calendario fija 1-1-2029 para nuevos bienes/servicios privados y 1-1-2030 para ajustes razonables en los existentes. El titular debe confirmar cómo se clasifica este sitio y qué exigencias aplican; no asumir una exención. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [Real Decreto 193/2023, arts. 14 y disposición final sexta](https://www.boe.es/eli/es/rd/2023/03/21/193)

### Paso 7 — Mejorar caché y seguridad para Vercel

**Hecho localmente:** `vercel.json` ahora fuerza revalidación del HTML, da caché moderada de un día a imágenes, CSS y JavaScript, y añade cabeceras `nosniff`, referrer, anti-iframe y permisos de cámara/micrófono. No se marca como `immutable` porque los nombres actuales de recursos no llevan hash de contenido.  
**Pendiente:** comprobar las cabeceras efectivas en una preview/deployment de Vercel y validar que todos los recursos se sirven correctamente desde ese proyecto.  
**Dónde se configura:** `vercel.json`; después se verifica en **Vercel → Deployments** y contra el dominio final con una comprobación de cabeceras HTTP.

- Mantener HTML con revalidación frecuente para que precios, carta y políticas no queden pegados en el navegador durante semanas (configurado).
- Aplicar caché moderada a recursos estáticos sin nombre con hash, y caché larga solo si se adopta versionado/hash en futuras optimizaciones.
- Añadir y probar cabeceras de seguridad básicas (configuradas); la CSP queda pendiente del inventario real de orígenes porque restringirla antes puede romper mapa, fuentes o medición.
- Revisar HTTPS y redirección al dominio canónico en Vercel; habilitar HSTS solo cuando el dominio definitivo tenga HTTPS operativo y se haya probado.
- Una vez desplegado, comprobar `Cache-Control`, la caché CDN, sitemap, robots, canonical y ausencia de `noindex` en producción. Repetir tras cambios de dominio.

La documentación de Vercel diferencia caché del navegador y de CDN, y recomienda caché de un año con `immutable` solo para activos con contenido versionado/hash. La configuración presente del proyecto no declara cabeceras propias; las cabeceras efectivas se deben medir en el deployment. [Vercel: Cache-Control](https://vercel.com/docs/caching/cache-control-headers)

### Paso 8 — Publicar y comprobar la versión final

**Responsable:** quien administra Git y Vercel, con aprobación del negocio para contenido/precios/legal.

1. Recibir por escrito las confirmaciones de titularidad, carta, precios y alérgenos.
2. Revisar las páginas legales y cualquier panel de consentimiento en la rama de desarrollo.
3. Verificar el catálogo completo y que promociones no se hayan convertido accidentalmente en precios permanentes.
4. Publicar una vista previa de Vercel y comprobar móvil/escritorio, teclado, mapa, pedidos y enlaces legales.
5. Comprobar cookies y almacenamiento antes y después de aceptar/rechazar; confirmar que el mapa u otros servicios opcionales no se cargan antes si requieren consentimiento.
6. Publicar a producción una vez aprobados esos puntos.
7. Con el dominio final: verificar HTTPS, canonical, Search Console, sitemap y Google Business Profile. Confirmar que nombre, dirección, teléfono, web y horarios coinciden en todas partes.
8. Guardar fecha y responsable de la última revisión de políticas, alérgenos, precios, enlaces y fotos; repetir el control cuando cambie una receta, proveedor, plataforma o dominio.

## Qué puedo completar yo y qué requiere al negocio

| Trabajo | Hecho / puedo preparar | Requiere confirmación del negocio |
|---|---|---|
| Transcribir la carta y precios actuales del catálogo | Sí; están en `js/experiencia.js` | Confirmar vigencia, disponibilidad, diferencias Uber/Glovo y promociones |
| Comparar nombres/descripciones visibles en Uber Eats | Sí; la ficha pública muestra parte del menú y precios | Confirmar que es la carta vigente que quiere ofrecer el titular |
| Revisar ficha pública de Glovo | Parcial; la tienda aparece públicamente, pero el menú detallado no fue accesible de forma estable en esta revisión | Compartir captura/exportación actual del panel de comerciante o validar cada producto |
| Preparar tabla de alérgenos | Sí, como borrador `PENDIENTE DE VALIDAR`, con pistas de las descripciones | Recetas, fichas de proveedor, evaluación de contacto cruzado y aprobación escrita del responsable de seguridad alimentaria |
| Redactar aviso legal y políticas | Sí, una vez facilitados los datos del titular y proveedores reales | Datos fiscales, contacto, responsable, tratamientos reales y validación final del titular/asesor |
| Preparar el panel de cookies y bloquear integraciones | La decisión está tomada: conservar todas. Puedo preparar el mecanismo tras inventariar cada llamada/cookie real | Validar el inventario real y aprobar proveedor/consentimiento; no debe activarse bloqueo selectivo a ciegas |
| Corregir accesibilidad verificable en código | Hecho localmente: progreso anunciado, foco visible, salto al contenido, controles principales 44 px, contraste de etiquetas y forced-colors; teclado revisado en selector y salto | Pruebas manuales con VoiceOver/TalkBack, zoom y revisión completa por el negocio o especialista antes de afirmar conformidad |
| Quitar persistencia del mensaje de carga | Hecho: mensaje aleatorio en memoria, sin sessionStorage/localStorage | Ninguna, salvo que en el futuro se quiera guardar una preferencia (no recomendado para este caso) |
| Configurar caché/cabeceras y comprobar deployment | Hecho en `vercel.json` para caché y cabeceras básicas | Dominio/preview de Vercel para confirmar encabezados efectivos en hosting |
| Asegurar cumplimiento alimentario o certificar legalidad | No por inspección externa de la web | Requiere el responsable legal/alimentario y, cuando proceda, asesoría profesional |

## Datos que tiene que facilitar el negocio primero

Para arrancar en el orden correcto, basta con que el responsable complete esta lista:

- [ ] Titular legal, NIF, forma jurídica y datos registrales que apliquen.
- [ ] Domicilio legal, correo público de contacto y confirmación del teléfono/dirección del local.
- [ ] Horarios actuales y festivos.
- [ ] Confirmación del catálogo de productos y si Cacaolat debe estar incluido.
- [ ] Precios ordinarios actuales de la web/Uber/Glovo y promociones con fecha de caducidad.
- [ ] Recetas y fichas técnicas de todos los productos, toppings y bebidas; evaluación de contacto cruzado.
- [ ] Confirmación de qué fotos son reales, cuáles son generadas y permiso de uso de las fotos y reseñas.
- [x] Decisión de conservar Google Maps, Google Fonts, Vercel Speed Insights y enlaces a Instagram/Uber Eats/Glovo.
- [ ] Facilitar titular, NIF, domicilio legal, correo de privacidad, forma jurídica y tamaño de empresa para completar textos y evaluar obligaciones aplicables.
- [ ] Facilitar fichas técnicas/recetas y matriz firmada de alérgenos antes de publicar información alimentaria.
- [ ] Autorizar fotos, perfiles sociales y reseñas con prueba de procedencia/permiso.
- [ ] Validar horarios, catálogo, precios, promociones y discrepancias de plataformas.
- [ ] Dominio final y persona con acceso a Vercel, DNS y Google Business Profile.

## Referencias oficiales y fuentes de catálogo

- [LSSI, Ley 34/2002](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)
- [RGPD, Reglamento (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj/spa)
- [AEPD, Guía sobre el uso de las cookies (mayo de 2024)](https://www.aepd.es/guias/guia-cookies.pdf)
- [Reglamento (UE) 1169/2011, información alimentaria y alérgenos](https://eur-lex.europa.eu/legal-content/ES/ALL/?uri=CELEX%3A32011R1169)
- [AESAN, comercialización de alimentos por internet](https://www.aesan.gob.es/operadores-economicos/comercializacion-alimentos-internet)
- [AESAN, guía de información alimentaria en venta a distancia](https://eletiquetadocuentamucho.aesan.gob.es/media/guia-informacion-alimentaria.pdf)
- [Real Decreto 193/2023, accesibilidad](https://www.boe.es/buscar/act.php?id=BOE-A-2023-7417)
- [Vercel, políticas Cache-Control](https://vercel.com/docs/caching/cache-control-headers)
- [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Vercel, privacidad de Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy)
- [Uber Eats, Buen Rollito Chimney](https://www.ubereats.com/es-en/store/buen-rollito-chimney/FR-O0IdEUKGz2xKdPgEbtg)
- [Glovo, Buen Rollito Chimney Cake](https://glovoapp.com/es/es/leon/stores/buen-rollito-chimney-cake-leon)

