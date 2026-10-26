import fr from './fr.json'

// Tous les textes de l'interface passent par t() : jamais de texte écrit en dur
// dans les écrans, pour pouvoir ajouter le wolof plus tard (ENF-09).
export type CleTexte = keyof typeof fr

const textes: Record<CleTexte, string> = fr

export function t(cle: CleTexte, valeurs?: Record<string, string | number>): string {
  const texte = textes[cle]
  if (!valeurs) return texte
  return texte.replace(/\{(\w+)\}/g, (morceau, nom: string) => {
    const valeur = valeurs[nom]
    return valeur === undefined ? morceau : String(valeur)
  })
}
