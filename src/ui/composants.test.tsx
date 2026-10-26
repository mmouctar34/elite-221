import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { House, User, X } from 'lucide-react'
import { BarreNavigation, Bouton, BoutonIcone, BoutonMicro, ChampTexte, EtatErreur } from './composants'

describe('Bouton', () => {
  it('est un vrai bouton, de type « button » par défaut', () => {
    render(<Bouton>Commencer</Bouton>)
    expect(screen.getByRole('button', { name: 'Commencer' })).toHaveAttribute('type', 'button')
  })
})

describe('BoutonIcone', () => {
  it('a un nom lisible par les lecteurs d’écran', () => {
    render(<BoutonIcone icone={X} libelle="Fermer" />)
    expect(screen.getByRole('button', { name: 'Fermer' })).toBeInTheDocument()
  })
})

describe('ChampTexte', () => {
  it('relie le libellé au champ', () => {
    render(<ChampTexte libelle="Ton prénom" />)
    expect(screen.getByLabelText('Ton prénom')).toBeInTheDocument()
  })

  it('annonce le message d’erreur et marque le champ invalide', () => {
    render(<ChampTexte libelle="Ton prénom" erreur="Écris au moins 2 lettres." />)
    const champ = screen.getByLabelText('Ton prénom')
    expect(champ).toHaveAttribute('aria-invalid', 'true')
    expect(champ).toHaveAccessibleDescription('Écris au moins 2 lettres.')
  })
})

describe('BoutonMicro', () => {
  it('change de nom et d’état quand l’enregistrement commence', () => {
    const { rerender } = render(
      <BoutonMicro enregistrement={false} libelleDemarrer="Commencer à parler" libelleArreter="Arrêter" onClick={() => {}} />,
    )
    expect(screen.getByRole('button', { name: 'Commencer à parler' })).toHaveAttribute('aria-pressed', 'false')
    rerender(<BoutonMicro enregistrement libelleDemarrer="Commencer à parler" libelleArreter="Arrêter" onClick={() => {}} />)
    expect(screen.getByRole('button', { name: 'Arrêter' })).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('BarreNavigation', () => {
  const onglets = [
    { cle: 'accueil', libelle: 'Accueil', icone: House },
    { cle: 'profil', libelle: 'Profil', icone: User },
  ] as const

  it('indique l’onglet actif et change d’onglet au toucher', async () => {
    const choisir = vi.fn()
    render(<BarreNavigation onglets={onglets} actif="accueil" onChoisir={choisir} libelle="Navigation principale" />)
    expect(screen.getByRole('navigation', { name: 'Navigation principale' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Accueil' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Profil' })).not.toHaveAttribute('aria-current')
    await userEvent.click(screen.getByRole('button', { name: 'Profil' }))
    expect(choisir).toHaveBeenCalledWith('profil')
  })
})

describe('EtatErreur', () => {
  it('est annoncé et propose de réessayer', async () => {
    const reessayer = vi.fn()
    render(<EtatErreur titre="Oups" message="Le réseau a coupé." libelleReessayer="Réessayer" onReessayer={reessayer} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Le réseau a coupé.')
    await userEvent.click(screen.getByRole('button', { name: 'Réessayer' }))
    expect(reessayer).toHaveBeenCalledOnce()
  })
})
