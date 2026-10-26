import { EcranPrincipal } from './pages/EcranPrincipal'
import { PageDesign } from './pages/PageDesign'

export function App() {
  // Page interne du système de design, à l'adresse /design.
  if (window.location.pathname === '/design') {
    return <PageDesign />
  }
  return <EcranPrincipal />
}
