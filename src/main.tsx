import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Police Plus Jakarta Sans, hébergée avec l'application : caractères latins, graisses 500 à 800.
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import './ui/styles.css'
import { App } from './App'

const racine = document.getElementById('racine')
if (!racine) {
  throw new Error('Élément #racine introuvable dans index.html')
}

createRoot(racine).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
