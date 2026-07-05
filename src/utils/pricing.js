//Editar los precios de comisiones en USD en página de CMS

/**
 * Convierte precio USD a ARS
 * @param {number} usd - Precio en dólares
 * @param {number} cotizacion - Valor del dólar MEP
 * @returns {number} - Precio en pesos redondeado
 */
export function usdToArs(usd, cotizacion) {
  if (!cotizacion) return null;
  const ars = (usd / 1.6) * cotizacion;
  return Math.round(ars / 500) * 500;
}