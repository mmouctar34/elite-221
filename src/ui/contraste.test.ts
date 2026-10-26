import { rapportContraste } from './contraste'
import { associations, couleurs } from './tokens'

describe('rapportContraste', () => {
  it('donne 21 pour du noir sur du blanc', () => {
    expect(rapportContraste('#000000', '#FFFFFF')).toBeCloseTo(21, 1)
  })

  it('donne 1 pour deux couleurs identiques', () => {
    expect(rapportContraste('#4F46E5', '#4F46E5')).toBeCloseTo(1, 5)
  })

  it('refuse une couleur mal écrite', () => {
    expect(() => rapportContraste('#12', '#FFFFFF')).toThrow('Couleur invalide')
  })
})

describe('contrastes du design Souffle (niveau AA)', () => {
  it.each(associations)('$texte sur $fond ($usage)', ({ texte, fond, taille }) => {
    const minimum = taille === 'normal' ? 4.5 : 3
    expect(rapportContraste(couleurs[texte], couleurs[fond])).toBeGreaterThanOrEqual(minimum)
  })
})

describe('palette', () => {
  it('ne contient ni orange ni rouge', () => {
    for (const hex of Object.values(couleurs)) {
      const r = parseInt(hex.slice(1, 3), 16)
      const v = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      // Une couleur chaude (rouge, orange) a nettement plus de rouge que de vert et de bleu.
      expect(r - Math.max(v, b)).toBeLessThan(40)
    }
  })
})
