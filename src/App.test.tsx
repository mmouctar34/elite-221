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
    ['/', 'Aminata'],
    ['/entrainer', "S'entraîner"],
    ['/module/1', 'Prise de Parole en Public'],
    ['/lecon/1/2', 'Gestion du Stress et du Trac'],
    ['/seance', 'Convaincs un recruteur de te choisir, en 60 secondes.'],
    ['/analyse', 'Ton analyse'],
    ['/progres', 'Tes progrès'],
    ['/arene', 'Arène 60 secondes'],
    ['/profil', 'Mon coach'],
    ['/coach', 'Espace coach'],
  ])('%s affiche « %s »', (chemin, texte) => {
    ouvrir(chemin)
    expect(screen.getAllByText(texte).length).toBeGreaterThan(0)
  })

  it('une adresse inconnue ramène à l’accueil', () => {
    ouvrir('/nimporte-quoi')
    expect(screen.getByText('Convaincre en 60 secondes')).toBeInTheDocument()
  })

  it('la barre du bas indique l’onglet actif', () => {
    ouvrir('/progres')
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
    expect(within(nav).getByRole('link', { name: 'Progrès' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'Accueil' })).not.toHaveAttribute('aria-current')
  })

  it('un lien change d’écran sans recharger la page', async () => {
    ouvrir('/')
    await userEvent.click(screen.getByRole('link', { name: /Commencer/ }))
    expect(window.location.pathname).toBe('/seance')
    expect(screen.getByText('Ton sujet')).toBeInTheDocument()
  })

  it('le bouton retour du navigateur revient à l’écran précédent', async () => {
    ouvrir('/entrainer')
    await userEvent.click(screen.getByRole('link', { name: /Arène 60 secondes/ }))
    expect(screen.getByText('Classement de la semaine')).toBeInTheDocument()
    act(() => {
      window.history.back()
    })
    await screen.findByText('Mes modules')
  })

  it('une leçon montre son principe clé et son cas pratique', () => {
    ouvrir('/lecon/1/2')
    expect(screen.getByText('Principe clé')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lancer le cas pratique' })).toBeInTheDocument()
  })

  it('les modules 2 et 3 sont marqués « Abonnement » (freemium)', () => {
    ouvrir('/entrainer')
    expect(screen.getAllByText('Abonnement')).toHaveLength(2)
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
    ouvrir('/seance')
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
    ouvrir('/coach')
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
