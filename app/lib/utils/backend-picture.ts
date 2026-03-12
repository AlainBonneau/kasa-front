/**
 * Construit l'URL d'une image de propriété.
 *
 * @param {string | undefined} src - Chemin ou URL de l'image.
 * @returns {string} URL finale exploitable par le front.
 */
export function getImageUrl(src?: string): string {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const FALLBACK_IMAGE =
    "https://rightathomerealtyinc.com/image/PropertyPhoto/housedefault.png";
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${BACKEND_URL}${src}`;
}
