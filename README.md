# pablovester.com — Frontend React

Frontend headless para mi portfolio 

## Stack

- **React 18** + **Vite**
- **WordPress** como CMS headless (backend)
- **WPGraphQL** para consultas
- **Apollo Client** con caché
- **SASS** con sistema de diseño neobrutalista
- **i18next** para español / inglés

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

La carpeta `dist/` se despliega en el hosting.

## WordPress

El backend corre en `pablovester.com/wp-admin`. Este proyecto solo reemplaza el frontend. WordPress sigue gestionando posts, imágenes, eventos y configuraciones vía ACF y MLA.
```
