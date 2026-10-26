import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { compterVisite, lireVisites } from './visites'
import { ecouterInstallation, type EvenementInstallation } from './installation'
import { BandeauHorsLigne, BandeauInstallation } from './Bandeaux'

function stockageMemoire(): Storage {
  const donnees = new Map<string, string>()
  return {
    get length() {
      return donnees.size
    },
    clear: () => donnees.clear(),
    getItem: (cle) => donnees.get(cle) ?? null,
    key: (i) => [...donnees.keys()][i] ?? null,
    removeItem: (cle) => void donnees.delete(cle),
    setItem: (cle, valeur) => void donnees.set(cle, valeur),
  }
}

describe('compterVisite (US-001)', () => {
  it('compte une seule visite par session', () => {
    const stockages = { local: stockageMemoire(), session: stockageMemoire() }
    expect(compterVisite(stockages)).toBe(1)
    expect(compterVisite(stockages)).toBe(1)
    expect(lireVisites(stockages)).toBe(1)
  })

  it('compte la deuxième visite dans une nouvelle session', () => {
    const local = stockageMemoire()
    compterVisite({ local, session: stockageMemoire() })
    expect(compterVisite({ local, session: stockageMemoire() })).toBe(2)
  })

  it('ne plante pas si le stockage est bloqué', () => {
    expect(compterVisite(null)).toBe(1)
  })
})

function evenementInstallation(issue: 'accepted' | 'dismissed' = 'accepted') {
  const evenement = new Event('beforeinstallprompt', { cancelable: true }) as EvenementInstallation
  const prompt = vi.fn(() => Promise.resolve())
  Object.assign(evenement, { prompt, userChoice: Promise.resolve({ outcome: issue }) })
  return { evenement, prompt }
}

describe('BandeauInstallation (US-001)', () => {
  let arreter: () => void
  beforeEach(() => {
    arreter = ecouterInstallation(window)
  })
  afterEach(() => arreter())

  it("ne s'affiche pas à la première visite", () => {
    render(<BandeauInstallation visites={1} />)
    act(() => {
      window.dispatchEvent(evenementInstallation().evenement)
    })
    expect(screen.queryByRole('button', { name: 'Installer SPLEAD' })).not.toBeInTheDocument()
  })

  it("ne s'affiche pas tant que le navigateur ne propose pas l'installation", () => {
    render(<BandeauInstallation visites={2} />)
    expect(screen.queryByRole('button', { name: 'Installer SPLEAD' })).not.toBeInTheDocument()
  })

  it("propose d'installer à la deuxième visite, sans fenêtre imposée", async () => {
    render(<BandeauInstallation visites={2} />)
    const { evenement, prompt } = evenementInstallation('accepted')
    act(() => {
      window.dispatchEvent(evenement)
    })
    // La fenêtre automatique du navigateur est bloquée : c'est SPLEAD qui propose.
    expect(evenement.defaultPrevented).toBe(true)
    const bouton = screen.getByRole('button', { name: 'Installer SPLEAD' })
    expect(prompt).not.toHaveBeenCalled()
    await userEvent.click(bouton)
    expect(prompt).toHaveBeenCalledOnce()
    expect(screen.queryByRole('button', { name: 'Installer SPLEAD' })).not.toBeInTheDocument()
  })

  it('peut être fermé avec « Plus tard »', async () => {
    render(<BandeauInstallation visites={3} />)
    act(() => {
      window.dispatchEvent(evenementInstallation().evenement)
    })
    await userEvent.click(screen.getByRole('button', { name: 'Plus tard' }))
    expect(screen.queryByRole('button', { name: 'Installer SPLEAD' })).not.toBeInTheDocument()
  })
})

describe('BandeauHorsLigne (US-003)', () => {
  function definirConnexion(enLigne: boolean) {
    Object.defineProperty(window.navigator, 'onLine', { configurable: true, get: () => enLigne })
    window.dispatchEvent(new Event(enLigne ? 'online' : 'offline'))
  }

  afterEach(() => {
    act(() => definirConnexion(true))
  })

  it('apparaît quand la connexion coupe et disparaît quand elle revient', () => {
    render(<BandeauHorsLigne />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    act(() => definirConnexion(false))
    expect(screen.getByRole('status')).toHaveTextContent('Hors-ligne')
    act(() => definirConnexion(true))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
