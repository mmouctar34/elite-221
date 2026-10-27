import { useSyncExternalStore } from 'react'

// Session de DÉMONSTRATION : aucune base de données, aucune vérification.
// On garde seulement le prénom et l'adresse e-mail sur l'appareil, jamais le mot de passe.
// La vraie connexion sécurisée (Supabase) remplacera ce fichier à l'étape « comptes ».

export type Session = { prenom: string; email: string }

const CLE = 'splead.session'
const abonnes = new Set<() => void>()
let enMemoire: Session | null = null
let cache: { brut: string | null; valeur: Session | null } = { brut: null, valeur: null }

function lireBrut(): string | null {
  try {
    return window.localStorage.getItem(CLE)
  } catch {
    // Stockage bloqué (navigation privée) : la session ne vit que le temps de la page.
    return enMemoire ? JSON.stringify(enMemoire) : null
  }
}

export function lireSession(): Session | null {
  const brut = lireBrut()
  if (brut === cache.brut) return cache.valeur
  let valeur: Session | null = null
  if (brut) {
    try {
      const objet = JSON.parse(brut) as Partial<Session>
      if (typeof objet.prenom === 'string' && typeof objet.email === 'string') valeur = { prenom: objet.prenom, email: objet.email }
    } catch {
      valeur = null
    }
  }
  cache = { brut, valeur }
  return valeur
}

function prevenir() {
  for (const abonne of abonnes) abonne()
}

export function seConnecter(session: Session) {
  const propre: Session = { prenom: session.prenom.trim(), email: session.email.trim() }
  enMemoire = propre
  try {
    window.localStorage.setItem(CLE, JSON.stringify(propre))
  } catch {
    // Stockage bloqué : on garde la session en mémoire.
  }
  prevenir()
}

export function seDeconnecter() {
  enMemoire = null
  try {
    window.localStorage.removeItem(CLE)
  } catch {
    // Rien à faire.
  }
  prevenir()
}

// Prénom à partir de l'adresse e-mail quand l'apprenant se connecte sans le donner :
// « aidara.diop@exemple.sn » donne « Aidara ».
export function prenomDepuisEmail(email: string): string {
  const debut = email.split('@')[0]?.split(/[._-]/)[0] ?? ''
  return debut ? debut.charAt(0).toUpperCase() + debut.slice(1).toLowerCase() : ''
}

function sAbonner(abonne: () => void) {
  abonnes.add(abonne)
  window.addEventListener('storage', abonne)
  return () => {
    abonnes.delete(abonne)
    window.removeEventListener('storage', abonne)
  }
}

export function useSession(): Session | null {
  return useSyncExternalStore(sAbonner, lireSession, () => null)
}
