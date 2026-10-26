import { useSyncExternalStore } from 'react'

// Suit la connexion du téléphone (US-003) à l'aide des événements « online » et « offline ».
function sAbonner(abonne: () => void) {
  window.addEventListener('online', abonne)
  window.addEventListener('offline', abonne)
  return () => {
    window.removeEventListener('online', abonne)
    window.removeEventListener('offline', abonne)
  }
}

export function useEnLigne(): boolean {
  return useSyncExternalStore(
    sAbonner,
    () => navigator.onLine,
    () => true,
  )
}
