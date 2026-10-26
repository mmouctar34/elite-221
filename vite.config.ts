import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Couleurs reprises du design « Souffle » (voir src/ui/tokens.ts).
const INDIGO = '#4F46E5'
const FOND = '#F3F1FF'

// Adresse de base : « / » en local, « /elite-221/ » sur GitHub Pages
// (fournie par la publication automatique, voir .github/workflows/publication-pages.yml).
const environnement = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env
const BASE = environnement?.SPLEAD_BASE ?? '/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      // « prompt » : une nouvelle version attend l'accord de l'apprenant,
      // pour ne jamais recharger la page pendant un enregistrement (US-004).
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'logo.svg'],
      manifest: {
        name: 'SPLEAD',
        short_name: 'SPLEAD',
        description: "Une séance par jour pour mieux parler en public, avec un retour immédiat et un vrai coach.",
        lang: 'fr',
        dir: 'ltr',
        // Relatives au manifeste : fonctionnent à la racine comme dans /elite-221/.
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: FOND,
        theme_color: INDIGO,
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Tout ce qui sert à afficher l'application est gardé sur le téléphone (US-003).
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: `${BASE}index.html`,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
