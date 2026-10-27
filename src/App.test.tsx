import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { formaterDuree } from './ecrans/Seance'
import { filtrerApprenants } from './ecrans/EspaceCoach'
import { pointsCourbe } from './ecrans/Progres'
import { seConnecter, seDeconnecter } from './session'

// Par défaut, les tests de l'application ouvrent une session de démonstration (prénom Aïdara).
function ouvrir(chemin: string, { connecte = true }: { connecte?: boolean } = {}) {
  if (connecte) seConnecter({ prenom: 'Aïdara', email: 'aidara@exemple.sn' })
  else seDeconnecter()
  window.history.pushState(null, '', chemin)
  return render(<App visites={1} />)
}

afterEach(() => {
  window.history.pushState(null, '', '/')
  seDeconnecter()
  vi.useRealTimers()
})

describe('connexion de démonstration', () => {
  it('l’application demande de se connecter', () => {
    ouvrir('/app/progres', { connecte: false })
    expect(screen.getByRole('heading', { level: 1, name: 'Content de te revoir' })).toBeInTheDocument()
    expect(screen.getByRole('note')).toHaveTextContent('N’utilise pas un vrai mot de passe')
  })

  it('refuse un formulaire incomplet et explique pourquoi', async () => {
    ouvrir('/connexion', { connecte: false })
    await userEvent.click(screen.getByRole('button', { name: 'Se connecter' }))
    expect(screen.getByLabelText('Adresse e-mail')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Mot de passe')).toHaveAttribute('aria-invalid', 'true')
  })

  it('se connecte sans base de données et ouvre la page demandée', async () => {
    ouvrir('/app/progres', { connecte: false })
    await userEvent.type(screen.getByLabelText('Adresse e-mail'), 'aidara.diop@exemple.sn')
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'demo')
    await userEvent.click(screen.getByRole('button', { name: 'Se connecter' }))
    expect(window.location.pathname).toBe('/app/progres')
    expect(screen.getByRole('heading', { level: 1, name: 'Tes progrès' })).toBeInTheDocument()
    expect(window.localStorage.getItem('splead.session')).not.toContain('demo')
  })

  it('l’inscription utilise le prénom saisi', async () => {
    ouvrir('/inscription', { connecte: false })
    await userEvent.type(screen.getByLabelText('Ton prénom'), 'Aïdara')
    await userEvent.type(screen.getByLabelText('Adresse e-mail'), 'a@exemple.sn')
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'demo')
    await userEvent.click(screen.getByRole('button', { name: 'Créer mon compte' }))
    expect(window.location.pathname).toBe('/app')
    expect(screen.getByText('Aïdara')).toBeInTheDocument()
  })

  it('la déconnexion ramène au site', async () => {
    ouvrir('/app/profil')
    const [bouton] = screen.getAllByRole('button', { name: 'Se déconnecter' })
    if (!bouton) throw new Error('Bouton « Se déconnecter » introuvable')
    await userEvent.click(bouton)
    expect(window.location.pathname).toBe('/')
    expect(window.localStorage.getItem('splead.session')).toBeNull()
  })
})

describe('écrans fidèles à la maquette', () => {
  it.each([
    ['/app', 'Aïdara'],
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
    for (const lien of commencer) expect(lien).toHaveAttribute('href', '/inscription')
    // Sans observation du défilement (vieux navigateur), aucun bloc n'est caché.
    expect(document.querySelector('.v-apparait')).toBeNull()
  })

  it('les blocs apparaissent en douceur quand on fait défiler la page', () => {
    let rappel: IntersectionObserverCallback = () => undefined
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(fonction: IntersectionObserverCallback) {
          rappel = fonction
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
    ouvrir('/')
    const titre = screen.getByRole('heading', { level: 2, name: 'Le programme' })
    expect(titre).toHaveClass('v-apparait')
    expect(titre).not.toHaveClass('est-visible')
    act(() => rappel([{ isIntersecting: true, target: titre } as unknown as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(titre).toHaveClass('est-visible')
    vi.unstubAllGlobals()
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
