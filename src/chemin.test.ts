import { cheminDansApplication } from './chemin'

describe('cheminDansApplication', () => {
  it('ne change rien quand l’application est à la racine', () => {
    expect(cheminDansApplication('/design', '/')).toBe('/design')
    expect(cheminDansApplication('/', '/')).toBe('/')
  })

  it('retire le sous-dossier de GitHub Pages', () => {
    expect(cheminDansApplication('/elite-221/design', '/elite-221/')).toBe('/design')
    expect(cheminDansApplication('/elite-221/', '/elite-221/')).toBe('/')
    expect(cheminDansApplication('/elite-221', '/elite-221/')).toBe('/')
  })
})
