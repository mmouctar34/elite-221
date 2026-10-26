import type { CSSProperties, ReactNode } from 'react'
import { CalendarDays, ChartNoAxesColumn, ChevronLeft, House, Mic, User, Users, type LucideIcon } from 'lucide-react'
import { Lien, useChemin } from '../navigation'
import { T } from './textes'

// Épaisseur de trait des icônes de la maquette.
export const TRAIT = 2.2

export function Icone({ icone: I, taille = 20, trait = TRAIT, plein = false }: { icone: LucideIcon; taille?: number; trait?: number; plein?: boolean }) {
  return <I aria-hidden="true" size={taille} strokeWidth={trait} {...(plein ? { fill: 'currentColor' } : {})} />
}

// Cercle décoratif des grandes cartes colorées (formes dessinées en code, pas d'image).
export function Cercle({ style }: { style: CSSProperties }) {
  return <div className="cercle" aria-hidden="true" style={style} />
}

type Onglet = { vers: string; libelle: string; icone: LucideIcon; actifSi: (chemin: string) => boolean }

const ongletsApprenant: Onglet[] = [
  { vers: '/', libelle: T.nav.accueil, icone: House, actifSi: (c) => c === '/' },
  {
    vers: '/entrainer',
    libelle: T.nav.entrainer,
    icone: Mic,
    actifSi: (c) => c.startsWith('/entrainer') || c.startsWith('/module') || c.startsWith('/arene'),
  },
  { vers: '/progres', libelle: T.nav.progres, icone: ChartNoAxesColumn, actifSi: (c) => c.startsWith('/progres') },
  { vers: '/profil', libelle: T.nav.profil, icone: User, actifSi: (c) => c.startsWith('/profil') },
]

const ongletsCoach: Onglet[] = [
  { vers: '/coach', libelle: T.navCoach.apprenants, icone: Users, actifSi: (c) => c === '/coach' },
  { vers: '/coach', libelle: T.navCoach.agenda, icone: CalendarDays, actifSi: () => false },
  { vers: '/coach', libelle: T.navCoach.statistiques, icone: ChartNoAxesColumn, actifSi: () => false },
  { vers: '/profil', libelle: T.navCoach.profil, icone: User, actifSi: () => false },
]

export function BarreBas({ coach = false }: { coach?: boolean }) {
  const chemin = useChemin()
  const onglets = coach ? ongletsCoach : ongletsApprenant
  return (
    <nav className="barre-bas" aria-label={coach ? T.navCoach.libelle : T.nav.libelle}>
      {onglets.map((o) => (
        <Lien key={o.libelle} vers={o.vers} className="barre-bas__lien" aria-current={o.actifSi(chemin) ? 'page' : undefined}>
          <span className="barre-bas__icone">
            <Icone icone={o.icone} />
          </span>
          {o.libelle}
        </Lien>
      ))}
    </nav>
  )
}

export function EnteteRetour({ vers, libelle, titre, clair = false }: { vers: string; libelle: string; titre: string; clair?: boolean }) {
  return (
    <header className="entete-retour">
      <Lien vers={vers} aria-label={libelle} className={clair ? 'bouton-rond bouton-rond--fond' : 'bouton-rond'}>
        <Icone icone={ChevronLeft} taille={22} trait={2.6} />
      </Lien>
      <h1>{titre}</h1>
    </header>
  )
}

export function Barre({ valeur, className = '', couleur }: { valeur: number; className?: string; couleur?: string }) {
  return (
    <div className={`barre ${className}`}>
      <div className="barre__remplie" style={{ width: `${Math.max(0, Math.min(100, valeur))}%`, ...(couleur ? { background: couleur } : {}) }} />
    </div>
  )
}

export function Appli({ children, variante }: { children: ReactNode; variante?: 'nuit' | 'blanc' }) {
  return <div className={`appli${variante ? ` appli--${variante}` : ''}`}>{children}</div>
}
