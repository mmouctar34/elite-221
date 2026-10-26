import { useSyncExternalStore } from 'react'

// Événement envoyé par Chrome (Android, ordinateur) quand l'application peut être installée.
// Il n'existe pas dans les types standard, d'où cette déclaration.
export interface EvenementInstallation extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Etat = { evenement: EvenementInstallation | null; installee: boolean }

let etat: Etat = { evenement: null, installee: false }
const abonnes = new Set<() => void>()

function prevenir() {
  for (const abonne of abonnes) abonne()
}

function definir(nouvelEtat: Etat) {
  etat = nouvelEtat
  prevenir()
}

export function estOuverteCommeApplication(win: Window = window): boolean {
  const standalone = typeof win.matchMedia === 'function' && win.matchMedia('(display-mode: standalone)').matches
  // Safari sur iPhone utilise une propriété à lui.
  const iosStandalone = (win.navigator as Navigator & { standalone?: boolean }).standalone === true
  return standalone || iosStandalone
}

// À appeler une fois, au démarrage : l'événement peut arriver avant l'affichage des écrans.
export function ecouterInstallation(win: Window = window): () => void {
  definir({ evenement: null, installee: estOuverteCommeApplication(win) })

  const surProposition = (e: Event) => {
    // On empêche la fenêtre automatique de Chrome : c'est SPLEAD qui propose, au bon moment.
    e.preventDefault()
    definir({ ...etat, evenement: e as EvenementInstallation })
  }
  const surInstallee = () => definir({ evenement: null, installee: true })

  win.addEventListener('beforeinstallprompt', surProposition)
  win.addEventListener('appinstalled', surInstallee)
  return () => {
    win.removeEventListener('beforeinstallprompt', surProposition)
    win.removeEventListener('appinstalled', surInstallee)
  }
}

export async function lancerInstallation(): Promise<'accepted' | 'dismissed' | 'indisponible'> {
  const { evenement } = etat
  if (!evenement) return 'indisponible'
  await evenement.prompt()
  const { outcome } = await evenement.userChoice
  // Chrome ne permet d'utiliser un événement qu'une seule fois.
  definir({ evenement: null, installee: outcome === 'accepted' })
  return outcome
}

function sAbonner(abonne: () => void) {
  abonnes.add(abonne)
  return () => {
    abonnes.delete(abonne)
  }
}

export function useInstallation(): { peutInstaller: boolean; installee: boolean } {
  const courant = useSyncExternalStore(sAbonner, () => etat)
  return { peutInstaller: courant.evenement !== null && !courant.installee, installee: courant.installee }
}
