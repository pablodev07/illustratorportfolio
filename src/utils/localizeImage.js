/**
 * Retorna alt, caption y title localizados según el idioma.
 * @param {Object} img - Objeto de imagen de GraphQL
 * @param {boolean} isEnglish - Si el idioma actual es inglés
 */
function sanitize(str) {
  if (!str) return '';
  
  // Crear un elemento temporal para decodificar entidades HTML. Esto funciona en Vite, no funcionará en Next
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  const decoded = textarea.value;
  
  // Eliminar tags HTML restantes
  return decoded.replace(/<[^>]*>/g, '');
}

export function localizeImage(img, isEnglish) {
  return {
    ...img,
    altLocalized: isEnglish && img.imageTranslations?.altEn
      ? img.imageTranslations.altEn
      : img.altText || '',
    captionLocalized: isEnglish
      ? sanitize(img.imageTranslations?.captionEn || '')
      : sanitize(img.caption || ''),
    titleLocalized: isEnglish && img.imageTranslations?.titleEn
      ? img.imageTranslations.titleEn
      : img.title || '',
  };
}