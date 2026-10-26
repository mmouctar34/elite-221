import { cheminDansApplication } from './chemin'
import { EcranPrincipal } from './pages/EcranPrincipal'
import { PageDesign } from './pages/PageDesign'
import { BandeauHorsLigne, BandeauInstallation } from './pwa/Bandeaux'

export function App({ visites }: { visites: number }) {
  // Page interne du système de design, à l'adresse /design (sous l'adresse de base).
  if (cheminDansApplication(window.location.pathname, import.meta.env.BASE_URL) === '/design') {
    return <PageDesign />
  }
  return (
    <EcranPrincipal
      bandeaux={
        <>
          <BandeauHorsLigne />
          <BandeauInstallation visites={visites} />
        </>
      }
    />
  )
}
