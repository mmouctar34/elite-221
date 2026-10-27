import { useChemin } from './navigation'
import { PageDesign } from './pages/PageDesign'
import { BandeauHorsLigne, BandeauInstallation } from './pwa/Bandeaux'
import { Vitrine } from './vitrine/Vitrine'
import { useSession } from './session'
import { Connexion } from './ecrans/Connexion'
import { cheminApp } from './ecrans/commun'
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

// « / » : la page d'accueil publique (vitrine). « /app/… » : l'application.
export function App({ visites }: { visites: number }) {
  const chemin = useChemin().replace(/\/+$/, '') || '/'
  const session = useSession()

  if (chemin === '/design') return <PageDesign />
  if (chemin === '/connexion') return <Connexion mode="connexion" />
  if (chemin === '/inscription') return <Connexion mode="inscription" />
  if (chemin !== '/app' && !chemin.startsWith('/app/')) return <Vitrine />

  // Application réservée aux personnes connectées (démonstration : sans vérification).
  if (!session) return <Connexion mode="connexion" suite={chemin} />

  const ecran = cheminApp(chemin)

  const module = /^\/module\/(\d+)$/.exec(ecran)
  if (module) return <EcranModule id={Number(module[1])} />

  const lecon = /^\/lecon\/(\d+)\/(\d+)$/.exec(ecran)
  if (lecon) return <EcranLecon idModule={Number(lecon[1])} numero={Number(lecon[2])} />

  switch (ecran) {
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
