import { EcranPrincipal } from './pages/EcranPrincipal'
import { PageDesign } from './pages/PageDesign'
import { BandeauHorsLigne, BandeauInstallation } from './pwa/Bandeaux'

export function App({ visites }: { visites: number }) {
  // Page interne du système de design, à l'adresse /design.
  if (window.location.pathname === '/design') {
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
