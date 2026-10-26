import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { formaterDuree } from './ecrans/Seance'
import { filtrerApprenants } from './ecrans/EspaceCoach'
import { pointsCourbe } from './ecrans/Progres'

function ouvrir(chemin: string) {
  window.history.pushState(null, '', chemin)
  return render(<App visites={1} />)
}

afterEach(() => {
  window.history.pushState(null, '', '/')
  vi.useRealTimers()
})

describe('écrans fidèles à la maquette', () => {
  it.each([
    ['/app', 'Aminata'],
    ['/app/entrainer', "S'entraîner"],
    ['/app/module/1', 'Prise de Parole en Public'],
    ['/app/lecon/1/2', 'Gestion du Stress et du Trac'],
    ['/app/seance', 'Convaincs un recruteur de te choisir, en 60 secondes.'],
    ['/app/analyse', 'Ton analyse'],
    ['/app/progres', 'Tes progrès'],
    ['/app/arene', 'Arène 60 secondes'],
    ['/app/profil', 'Mon coach'],
    ['/app/coach', 'Espace coach'],
  ])('%s affiche « %s »', (chemin, texte) => {
    ouvrir(chemin)
    expect(screen.getAllByText(texte).length).toBeGreaterThan(0)
  })

  it('une adresse inconnue ramène à l’accueil', () => {
    ouvrir('/app/nimporte-quoi')
    expect(screen.getByText('Convaincre en 60 secondes')).toBeInTheDocument()
  })

  it('la barre du bas indique l’onglet actif', () => {
    ouvrir('/app/progres')
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
    expect(within(nav).getByRole('link', { name: 'Progrès' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'Accueil' })).not.toHaveAttribute('aria-current')
  })

  it('un lien change d’écran sans recharger la page', async () => {
    ouvrir('/app')
    await userEvent.click(screen.getByRole('link', { name: /Commencer/ }))
    expect(window.location.pathname).toBe('/app/seance')
    expect(screen.getByText('Ton sujet')).toBeInTheDocument()
  })

  it('le bouton retour du navigateur revient à l’écran précédent', async () => {
    ouvrir('/app/entrainer')
    await userEvent.click(screen.getByRole('link', { name: /Arène 60 secondes/ }))
    expect(screen.getByText('Classement de la semaine')).toBeInTheDocument()
    act(() => {
      window.history.back()
    })
    await screen.findByText('Mes modules')
  })

  it('une leçon montre son principe clé et son cas pratique', () => {
    ouvrir('/app/lecon/1/2')
    expect(screen.getByText('Principe clé')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lancer le cas pratique' })).toBeInTheDocument()
  })

  it('les modules 2 et 3 sont marqués « Abonnement » (freemium)', () => {
    ouvrir('/app/entrainer')
    expect(screen.getAllByText('Abonnement')).toHaveLength(2)
  })
})

describe('page d’accueil publique (vitrine)', () => {
  it('présente SPLEAD et mène à l’application', () => {
    ouvrir('/')
    expect(screen.getByRole('heading', { level: 1, name: 'L’art de bien parler, une séance par jour.' })).toBeInTheDocument()
    const commencer = screen.getAllByRole('link', { name: /Commencer gratuitement/ })
    expect(commencer.length).toBeGreaterThan(0)
    for (const lien of commencer) expect(lien).toHaveAttribute('href', '/app')
  })

  it('a les sections programme, tarifs, à propos et questions', () => {
    ouvrir('/')
    for (const titre of ['Le programme', 'Commence gratuitement', 'À propos de SPLEAD', 'Questions fréquentes', 'Installe SPLEAD sur ton téléphone']) {
      expect(screen.getByRole('heading', { level: 2, name: titre })).toBeInTheDocument()
    }
    const nav = screen.getByRole('navigation', { name: 'Navigation du site' })
    expect(within(nav).getByRole('link', { name: 'À propos' })).toHaveAttribute('href', '#a-propos')
  })

  it('le menu se replie sur téléphone et s’ouvre au toucher', async () => {
    ouvrir('/')
    const bouton = screen.getByRole('button', { name: 'Menu' })
    expect(bouton).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(bouton)
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('l’application a un menu latéral pour ordinateur', () => {
    ouvrir('/app/progres')
    const menu = screen.getByRole('navigation', { name: 'Menu de l’application' })
    expect(within(menu).getByRole('link', { name: 'Progrès' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Retour au site' })).toHaveAttribute('href', '/')
  })
})

describe('séance', () => {
  it('formate le chrono', () => {
    expect(formaterDuree(0)).toBe('00:00')
    expect(formaterDuree(42)).toBe('00:42')
    expect(formaterDuree(60)).toBe('01:00')
  })

  it('le chrono avance, se met en pause et s’arrête à 60 secondes', async () => {
    vi.useFakeTimers()
    ouvrir('/app/seance')
    act(() => {
      screen.getByRole('button', { name: 'Commencer à parler' }).click()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByRole('timer')).toHaveTextContent('00:05')

    act(() => {
      screen.getByRole('button', { name: 'Pause', pressed: true }).click()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByRole('timer')).toHaveTextContent('00:05')

    act(() => {
      screen.getByRole('button', { name: 'Reprendre' }).click()
    })
    act(() => {
      vi.advanceTimersByTime(70000)
    })
    expect(screen.getByRole('timer')).toHaveTextContent('01:00')
  })
})

describe('espace coach', () => {
  it('filtre les apprenants', async () => {
    ouvrir('/app/coach')
    expect(screen.getAllByRole('listitem')).toHaveLength(filtrerApprenants('tous').length)
    await userEvent.click(screen.getByRole('button', { name: 'À relancer' }))
    expect(screen.getByRole('button', { name: 'À relancer' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('listitem')).toHaveLength(filtrerApprenants('relancer').length)
  })
})

describe('progrès', () => {
  it('place la courbe dans le cadre', () => {
    for (const [x, y] of pointsCourbe([12, 10, 3])) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(318)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(110)
    }
  })
})
