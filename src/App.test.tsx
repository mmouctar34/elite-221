import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it("affiche le nom de l'application", () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'SPLEAD' })).toBeInTheDocument()
  })
})
