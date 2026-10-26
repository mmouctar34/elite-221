import { useState, type ReactNode } from 'react'
import { ChartLine, House, Mic, User } from 'lucide-react'
import { t } from '../i18n'
import { BarreNavigation, Carte, Pastille, type OngletNavigation } from '../ui/composants'

type Onglet = 'accueil' | 'entrainer' | 'progres' | 'profil'

const onglets: ReadonlyArray<OngletNavigation<Onglet>> = [
  { cle: 'accueil', libelle: t('nav.accueil'), icone: House },
  { cle: 'entrainer', libelle: t('nav.entrainer'), icone: Mic },
  { cle: 'progres', libelle: t('nav.progres'), icone: ChartLine },
  { cle: 'profil', libelle: t('nav.profil'), icone: User },
]

// Écran principal avec la navigation du bas. Les onglets autres qu'Accueil
// sont des emplacements vides, construits dans les sprints suivants.
export function EcranPrincipal({ bandeaux }: { bandeaux?: ReactNode }) {
  const [actif, setActif] = useState<Onglet>('accueil')
  const libelleActif = onglets.find((o) => o.cle === actif)?.libelle ?? ''

  return (
    <>
      <main className="ecran">
        <header className="entete">
          <span className="marque">{t('app.nom')}</span>
        </header>
        {bandeaux}
        {actif === 'accueil' ? (
          <Carte>
            <h1>{t('accueil.titre')}</h1>
            <p className="texte-secondaire">{t('accueil.promesse')}</p>
            <Pastille icone={Mic}>{t('accueil.bientot')}</Pastille>
          </Carte>
        ) : (
          <Carte>
            <h1>{t('ecran.bientot.titre', { ecran: libelleActif })}</h1>
            <p className="texte-secondaire">{t('ecran.bientot.texte')}</p>
          </Carte>
        )}
      </main>
      <BarreNavigation onglets={onglets} actif={actif} onChoisir={setActif} libelle={t('nav.libelle')} />
    </>
  )
}
