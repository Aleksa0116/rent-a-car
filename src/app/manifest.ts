import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/* ─── Web App Manifest ───────────────────────────────────────────────────────
 *
 * Served at /manifest.webmanifest by Next.js's file convention.
 * Controls how the app appears when installed on iOS / Android home screens.
 *
 * ─────────────────────────────────────────────────────────────────────────── */

export default function manifest(): MetadataRoute.Manifest {
  return {
    /* Identity */
    name: siteConfig.name,
    short_name: "AleRak",
    description: siteConfig.description,

    /* Display behaviour — "standalone" hides the browser chrome entirely */
    display: "standalone",
    orientation: "portrait",

    /* Start URL — "/" to land on the homepage */
    start_url: "/",
    scope: "/",

    /* Theme / background colours must match the Navbar (#ffffff = clean white) */
    theme_color: "#ffffff",
    background_color: "#ffffff",

    /* Categorisation for app stores / search */
    categories: ["travel", "business", "lifestyle"],
    lang: "sr",
    dir: "ltr",

    /*
     * Icons
     * ─────
     * • /icon.svg  — scalable vector, works at any size (Android 8+, Chrome 80+)
     * • Both "any" and "maskable" purposes are declared so Android can apply
     *   its adaptive-icon mask (safe zone = centre 80 % of the canvas).
     *
     * For iOS, the apple-icon.tsx route handles home-screen artwork via the
     * <link rel="apple-touch-icon"> tag that Next.js injects automatically.
     */
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],

    /* Don't suggest native apps in install banners */
    prefer_related_applications: false,
  };
}
