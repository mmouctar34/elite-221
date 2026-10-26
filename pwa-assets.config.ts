import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Génère les icônes de la PWA à partir de public/logo.svg : npm run icones
const INDIGO = '#4F46E5'

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: INDIGO } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: INDIGO } },
  },
  images: ['public/logo.svg'],
})
