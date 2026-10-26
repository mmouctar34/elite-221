// Calcul du contraste entre deux couleurs, selon la formule des règles WCAG 2.
// Un rapport de 1 signifie aucun contraste ; 21, le maximum (noir sur blanc).

function canal(valeur: number): number {
  const c = valeur / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string): number {
  const propre = hex.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(propre)) {
    throw new Error(`Couleur invalide : ${hex}`)
  }
  const r = parseInt(propre.slice(0, 2), 16)
  const v = parseInt(propre.slice(2, 4), 16)
  const b = parseInt(propre.slice(4, 6), 16)
  return 0.2126 * canal(r) + 0.7152 * canal(v) + 0.0722 * canal(b)
}

export function rapportContraste(couleurA: string, couleurB: string): number {
  const la = luminance(couleurA)
  const lb = luminance(couleurB)
  const claire = Math.max(la, lb)
  const sombre = Math.min(la, lb)
  return (claire + 0.05) / (sombre + 0.05)
}
