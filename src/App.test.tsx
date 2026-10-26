import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

describe('App', () => {
  it("affiche la marque et l'accueil", () => {
    render(<App />)
    expect(screen.getByText('SPLEAD')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Bienvenue sur SPLEAD' })).toBeInTheDocument()
  })

  it('propose les 4 onglets et change d’écran', async () => {
    render(<App />)
    for (const nom of ['Accueil', "S'entraîner", 'Progrès', 'Profil']) {
      expect(screen.getByRole('button', { name: nom })).toBeInTheDocument()
    }
    await userEvent.click(screen.getByRole('button', { name: 'Progrès' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Progrès arrive bientôt' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Progrès' })).toHaveAttribute('aria-current', 'page')
  })
})
