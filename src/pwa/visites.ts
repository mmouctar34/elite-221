// Compte les visites, pour ne proposer l'installation qu'à partir de la deuxième (US-001).
// Une visite = une ouverture de l'application (une session du navigateur).
// Seul un nombre est stocké sur le téléphone, aucune donnée personnelle.

export const CLE_VISITES = 'splead.visites'
export const CLE_VISITE_COMPTEE = 'splead.visite-comptee'

type Stockages = { local: Storage; session: Storage }

function stockagesParDefaut(): Stockages | null {
  try {
    return { local: window.localStorage, session: window.sessionStorage }
  } catch {
    // Navigation privée ou stockage bloqué : on fait comme si c'était la première visite.
    return null
  }
}

export function lireVisites(stockages: Stockages | null = stockagesParDefaut()): number {
  if (!stockages) return 1
  try {
    const valeur = Number.parseInt(stockages.local.getItem(CLE_VISITES) ?? '0', 10)
    return Number.isFinite(valeur) && valeur > 0 ? valeur : 0
  } catch {
    return 1
  }
}

// Ajoute 1 au compteur, une seule fois par session, et renvoie le nombre de visites.
export function compterVisite(stockages: Stockages | null = stockagesParDefaut()): number {
  if (!stockages) return 1
  try {
    if (stockages.session.getItem(CLE_VISITE_COMPTEE) === 'oui') {
      return lireVisites(stockages)
    }
    const total = lireVisites(stockages) + 1
    stockages.local.setItem(CLE_VISITES, String(total))
    stockages.session.setItem(CLE_VISITE_COMPTEE, 'oui')
    return total
  } catch {
    return 1
  }
}
