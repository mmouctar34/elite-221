// Chemin de la page à l'intérieur de l'application, sans l'adresse de base.
// Exemple : sur GitHub Pages, « /elite-221/design » devient « /design ».
export function cheminDansApplication(chemin: string, base: string): string {
  const baseSansBarre = base.endsWith('/') ? base.slice(0, -1) : base
  if (baseSansBarre && chemin.startsWith(baseSansBarre)) {
    const reste = chemin.slice(baseSansBarre.length)
    return reste.startsWith('/') ? reste : `/${reste}`
  }
  return chemin
}
