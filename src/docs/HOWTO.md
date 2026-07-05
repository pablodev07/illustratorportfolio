## 📄 `README-INTERNAL.md` (interno, carpeta `/docs`)

```markdown
# Documentación interna — pablovester.com

## Stack

| Capa | Tecnología |
|------|-----------|
| CMS | WordPress (Hello Elementor + plugins) |
| API | WPGraphQL + WPGraphQL for ACF |
| Frontend | React 18 + Vite |
| GraphQL Client | Apollo Client (cache-first) |
| Estilos | SASS (.scss), mobile-first |
| i18n | i18next + react-i18next |
| Lightbox | Photoswipe (react-photoswipe-gallery) |
| Flipbook | react-pageflip (desktop), Photoswipe (mobile) |
| Formularios | Endpoint REST API custom + Akismet + Honeypot frontend + Contact Form 7 |
| Cotización | GraphQL field custom → dolarapi.com (cache 1h) |

---

## Organización de estilos (`src/styles/`)

| Archivo | Contenido |
|---------|-----------|
| `main.scss` | Entry point, imports, utilidades |
| `_tokens.scss` | Variables: colores, tipografías, espaciados, breakpoints |
| `_typography.scss` | @font-face (GT Maru, Zen Maru Gothic), estilos base |
| `_reset.scss` | CSS reset + estilos de contenido embebido de Wordpress y Elementor (.post-single) |
| `_buttons.scss` | Sistema de botones (.btn, variantes, tamaños) |
| `_layout.scss` | Header, Footer, Navegación, menú mobile (hamburguesa) |
| `_forms.scss` | Inputs, labels, validación, estados error/success |
| `_accordion.scss` | Acordeones del FAQ (`<details>`/`<summary>` nativo) |
| `_photoswipe.scss` | Personalización del lightbox |
| `pages/_home.scss` | Hero, Blog, Newsletter, Agenda, Home Gallery |
| `pages/_gallery.scss` | Galería con filtros y grid |
| `pages/_commissions.scss` | Pricing cards, formulario de contacto |
| `pages/_comics.scss` | Landing Comics, masonry (Águilas), flipbook (Fanzine) |
| `pages/_404.scss` | Página 404 con posts sugeridos |

**Convención**: Mobile-first. Estilos base para mobile, `@media (min-width: $breakpoint-lg)` para desktop.

---

## Traducciones

- Archivos: `src/locales/es/translation.json` y `en/translation.json`
- Librería: i18next con detector por path
- URLs: `/` (ES), `/en/` (EN)
- Los slugs NO se traducen (son identificadores técnicos)
- Textos fijos de UI → archivos JSON
- Contenido de WordPress → solo en español (futuro: CPT con campos ACF bilingües)

---

## Componentes principales

| Componente | Ruta | Función |
|-----------|------|---------|
| `HomePage` | `/` | Hero, blog, galería, newsletter, agenda, contacto |
| `GalleryPage` | `/dibujos` | Galería con filtros por categoría MLA, cada filtro puede ser hipervinculado (ej: /dibujos#pokemon) |
| `CommissionsPage` | `/comisiones` | Precios en USD/ARS, formulario |
| `ContactPage` | `/contacto` | Texto + formulario reutilizado |
| `FAQPage` | `/commission-tos-faq` | Acordeones desde WordPress |
| `ComicsPage` | `/comics` | Landing con cards |
| `ComicProjectPage` | `/comics/:slug` | Post individual de proyecto de comic. Masonry grid - Flipbook (desktop) / Galería (mobile) - Ambas. Estas opciones son enviadas desde Wordpress. |
| `PostPage` | `/blog/:slug` | Post individual desde WordPress |
| `BlogPage` | `/blog` | Todos los posts |
| `NotFoundPage` | `*` | 404 con posts sugeridos |

### Componentes reutilizables

| Componente | Ubicación | Función |
|-----------|----------|---------|
| `GalleryGrid` | `ui/GalleryGrid` | Grid de imágenes + Photoswipe |
| `ContactForm` | `sections/ContactForm` | Formulario con validaciones |
| `LoadingText` | `ui/LoadingText` | Texto de carga neobrutalista |
| `Skeleton` | `ui/Skeleton` | Placeholder animado |
| `ProgressBar` | `ui/ProgressBar` | Barra de progreso |
| `AsteriskBadge` | `ui/AsteriskBadge` | Miscelánea decorativa |
| `Icon` | `ui/Icon` | Iconos SVG inline |
| `LanguageSwitcher` | `ui/LanguageSwitcher` | Selector ES/EN |
| `Layout` | `layout/Layout` | Header + Footer + Main |
| `Image` | `ui/Image` | Componente imagen atómico


---

## Sistema de traducción de imágenes

### Campos en WordPress

| Campo | Fuente | Idioma |
|-------|--------|--------|
| `alt` | WordPress nativo | Español |
| `caption` | WordPress nativo | Español |
| `title` | WordPress nativo | Español |
| `alt_en` | ACF (Image Translations) | Inglés |
| `caption_en` | ACF (Image Translations) | Inglés |
| `title_en` | ACF (Image Translations) | Inglés |

**ACF Field Group:** `Image Translations`
- Location Rule: Post Type = Attachment
- Show in GraphQL: ✅
- GraphQL Field Name: `imageTranslations`

### Exposición en GraphQL

El plugin `pablovester-custom.php` registra el tipo `ImageTranslations` con campos `altEn`, `captionEn`, `titleEn` en `MediaItem`. También registra campos calculados `altLocalized`, `captionLocalized`, `titleLocalized` que resuelven según `HTTP_ACCEPT_LANGUAGE` (en desuso — React maneja la lógica).

### Lógica en React

- **`src/utils/localizeImage.js`**: Función centralizada que recibe una imagen y un booleano `isEnglish`, devuelve `altLocalized`, `captionLocalized`, `titleLocalized`.
  - Si es inglés y hay traducción en ACF → usa la traducción.
  - Si es inglés y NO hay traducción → devuelve string vacío (no muestra fallback en español).
  - Si es español → usa los campos nativos de WordPress.
  - Sanitiza HTML con `.replace(/<[^>]*>/g, '')`.

- **Hooks** (`useGallery`, `useComicImages`, `useHomeGallery`): Aplican `localizeImage` a cada imagen antes de devolver los datos.

- **`Image.jsx`**: Componente atómico que recibe `altLocalized`, `captionLocalized`, `titleLocalized` y renderiza `<img>` con los valores localizados.

- **`GalleryGrid.jsx`**: Usa `<Image>` para el thumbnail y pasa `caption={img.captionLocalized || undefined}` a `<Item>` de Photoswipe.
  - Sin `alt` en `<Item>` para evitar que Photoswipe use `alt` como fallback de caption.
  - `withCaption={showCaptions}` habilita/deshabilita la barra de caption.
  - El `alt` accesible se mantiene en `<Image>`.

### Flujo completo

```
WordPress (caption + ACF caption_en)
  → GraphQL (imageTranslations)
    → Hook (localizeImage)
      → Image.jsx (alt, title)
      → GalleryGrid (caption en Photoswipe)
```

### Comportamiento esperado

| Escenario | ¿Muestra caption? |
|-----------|-------------------|
| ES + tiene caption en WP | ✅ Caption español |
| ES + no tiene caption | ❌ Nada |
| EN + tiene caption_en en ACF | ✅ Caption inglés |
| EN + no tiene caption_en | ❌ Nada (no muestra español) |
```

---

## Custom Post Types

### Event (`event`)
- Campos ACF: `event_date`, `event_time`, `location`, `external_link`
- Se muestra en la Home (AgendaSection)
- Filtra eventos pasados automáticamente

### Home Gallery (`home_gallery`)
- Usa featured image de cada entrada
- Se muestra en la Home (HomeGallerySection)
- Orden: por fecha de publicación (arrastrable con plugin Simple Custom Post Order)

### Categorías MLA (Media Library Assistant)
- `gallery`: imágenes que aparecen en /dibujos y Home Gallery
- `comicsaguilas`: imágenes del proyecto Águilas
- `fanzinebook`: páginas del fanzine (tapa + páginas numeradas)
- Otras: `pokemon`, `commissions`, `hobby`, `products` usadas en /drawings

### Comic Projects (`comic_project`)
- Creado con ACF Post Types
- Campos: `title_es`, `title_en`, `description_es`, `description_en`, `cover_image`, `slug`, `cta_es`, `cta_en`
- Se muestran en `/comics` (ComicsPage)
- Orden: por fecha de publicación (ASC). Editar dicha fecha en Wordpress si quiero cambiar el orden en cómo se muestra en React.
- Público: ❌ (no accesible vía URL directa)

---

## functions.php — Endpoints y campos personalizados

### REST API
- `POST /wp-json/pablovester/v1/contact` — Formulario de contacto (Akismet + Honeypot)

### GraphQL Fields
- `MediaItem.attachmentCategories` — Categorías de MLA expuestas en GraphQL
- `MediaItem.attachmentTags` — Tags de MLA
- `RootQuery.cotizacionDolar` — Cotización MEP desde dolarapi.com (cache 1h)

### Custom Post Types
- `event` (Events)
- `home_gallery` (Home Gallery)

### Otros
- ACF Options Page: Home Gallery Settings (en desuso, reemplazado por CPT)
- CORS headers para REST API

---

## Guía diaria

### Agregar imágenes a la galería
1. Subir a Medios
2. Asignar categoría MLA `gallery` (y opcional: `pokemon`, `commissions`, etc.)
3. Si es Home Gallery: crear entrada en Home Gallery con featured image

### Agregar un evento
1. Events → Add New
2. Completar título, fecha, horario, ubicación, link
3. Se muestra automáticamente en la Home

### Actualizar precios de comisiones
- Los precios USD están en `src/utils/pricing.js`
- Los precios ARS se calculan automáticamente con la cotización del día
- No hace falta tocar nada

### Actualizar cotización del dólar
- Automática: el endpoint consulta dolarapi.com cada 1 hora
- Si la API falla, usa el último valor guardado

### Traducir textos de la UI
1. Editar `src/locales/es/translation.json` o `en/translation.json`
2. Las claves son compartidas entre ambos idiomas
3. Buildear y desplegar

---

## Plan a futuro

- **Next.js**: Migrar para mejorar SEO (SSR/SSG)
- **Traducciones de captions**: CPT con campos ACF `title_en` y `description_en` para imágenes
- **Animaciones**: Filtros de galería, feedback de formulario

---

## Redirecciones

Las redirecciones de `pablovester.com` se manejan en el `.htaccess` de la raíz, **fuera** del bloque `<IfModule mod_rewrite.c>`. Ejemplo:

\`\`\`apache
Redirect 301 /url-vieja /url-nueva
\`\`\`

Las redirecciones de `cms.pablovester.com` las maneja RankMath.
```