// Couleurs du design « Souffle » (brief, section 6). Aucun orange, aucun rouge.
// Les mêmes valeurs sont déclarées en variables CSS dans styles.css.
export const couleurs = {
  nuit: '#1E1B4B',
  indigo: '#4F46E5',
  turquoise: '#2DD4BF',
  brume: '#E4E0FF',
  fond: '#F3F1FF',
  blanc: '#FFFFFF',
  texteSecondaire: '#4B4A6B',
} as const

export type NomCouleur = keyof typeof couleurs

// Associations texte / fond réellement utilisées par les composants.
// « normal » : texte courant, contraste 4,5 minimum (niveau AA des règles WCAG).
// « grand » : texte de 24 px ou de 19 px gras et plus, et éléments graphiques : 3 minimum.
export const associations: ReadonlyArray<{
  texte: NomCouleur
  fond: NomCouleur
  usage: string
  taille: 'normal' | 'grand'
}> = [
  { texte: 'nuit', fond: 'fond', usage: 'texte principal sur le fond lavande', taille: 'normal' },
  { texte: 'nuit', fond: 'blanc', usage: 'texte principal dans une carte', taille: 'normal' },
  { texte: 'texteSecondaire', fond: 'blanc', usage: 'texte secondaire dans une carte', taille: 'normal' },
  { texte: 'texteSecondaire', fond: 'fond', usage: 'texte secondaire sur le fond lavande', taille: 'normal' },
  { texte: 'nuit', fond: 'turquoise', usage: 'bouton principal', taille: 'normal' },
  { texte: 'blanc', fond: 'indigo', usage: 'bandeau et bouton de marque', taille: 'normal' },
  { texte: 'indigo', fond: 'blanc', usage: 'bouton secondaire et liens', taille: 'normal' },
  { texte: 'nuit', fond: 'brume', usage: 'pastille et onglet actif', taille: 'normal' },
  { texte: 'blanc', fond: 'nuit', usage: 'fond sombre', taille: 'normal' },
  { texte: 'indigo', fond: 'fond', usage: 'contour de focus sur le fond lavande', taille: 'grand' },
]
