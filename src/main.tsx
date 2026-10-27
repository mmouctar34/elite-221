import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
// Police Plus Jakarta Sans, hébergée avec l'application : caractères latins, graisses 500 à 800.
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import './ui/styles.css'
import './ecrans/ecrans.css'
import './vitrine/vitrine.css'
import { App } from './App'
import { ecouterInstallation } from './pwa/installation'
import { compterVisite } from './pwa/visites'

// Avant l'affichage : Chrome peut proposer l'installation très tôt (US-001).
ecouterInstallation()
const visites = compterVisite()

// Service worker : garde l'application sur le téléphone pour l'ouvrir sans réseau (US-003).
// Une nouvelle version publiée s'installe et recharge la page automatiquement.
registerSW({ immediate: true })

// Demande au navigateur de ne pas effacer les données de SPLEAD quand l'espace manque
// (leçons téléchargées, séances en attente d'envoi). Important sur iPhone (ADR-001).
if (navigator.storage?.persist) {
  void navigator.storage.persisted().then((dejaPersistant) => (dejaPersistant ? true : navigator.storage.persist()))
}

const racine = document.getElementById('racine')
if (!racine) {
  throw new Error('Élément #racine introuvable dans index.html')
}

createRoot(racine).render(
  <StrictMode>
    <App visites={visites} />
  </StrictMode>,
)
