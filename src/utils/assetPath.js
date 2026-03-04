/**
 * Prefix a public-folder asset path with Vite's base URL.
 * Works in both local dev (base = "/") and GitHub Pages (base = "/windows-xp-portfolio/").
 *
 * Usage:  asset('/img/wallpaper.jpg')  →  "/windows-xp-portfolio/img/wallpaper.jpg"
 */
export const asset = (path) =>
    `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
