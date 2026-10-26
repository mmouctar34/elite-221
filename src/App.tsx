import { useChemin } from './navigation'
import { PageDesign } from './pages/PageDesign'
import { BandeauHorsLigne, BandeauInstallation } from './pwa/Bandeaux'
import { Accueil } from './ecrans/Accueil'
import { Entrainer } from './ecrans/Entrainer'
import { EcranModule } from './ecrans/Module'
import { EcranLecon } from './ecrans/Lecon'
import { Seance } from './ecrans/Seance'
import { Analyse } from './ecrans/Analyse'
import { Progres } from './ecrans/Progres'
import { Arene } from './ecrans/Arene'
import { MonCoach } from './ecrans/MonCoach'
import { EspaceCoach } from './ecrans/EspaceCoach'

// Un écran par adresse. Une adresse inconnue ramène à l'accueil.
export function App({ visites }: { visites: number }) {
  const chemin = useChemin().replace(/\/+$/, '') || '/'

  const module = /^\/module\/(\d+)$/.exec(chemin)
  if (module) return <EcranModule id={Number(module[1])} />

  const lecon = /^\/lecon\/(\d+)\/(\d+)$/.exec(chemin)
  if (lecon) return <EcranLecon idModule={Number(lecon[1])} numero={Number(lecon[2])} />

  switch (chemin) {
    case '/entrainer':
      return <Entrainer />
    case '/seance':
      return <Seance />
    case '/analyse':
      return <Analyse />
    case '/progres':
      return <Progres />
    case '/arene':
      return <Arene />
    case '/profil':
      return <MonCoach />
    case '/coach':
      return <EspaceCoach />
    case '/design':
      // Page interne du système de design.
      return <PageDesign />
    default:
      return (
        <Accueil
          bandeaux={
            <>
              <BandeauHorsLigne />
              <BandeauInstallation visites={visites} />
            </>
          }
        />
      )
  }
}
