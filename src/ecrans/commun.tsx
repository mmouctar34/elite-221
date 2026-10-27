import type { CSSProperties, ReactNode } from 'react'
import { ArrowLeft, CalendarDays, ChartNoAxesColumn, ChevronLeft, House, LogOut, Mic, User, Users, type LucideIcon } from 'lucide-react'
import { Lien, naviguer, useChemin } from '../navigation'
import { seDeconnecter } from '../session'
import { T } from './textes'

// Épaisseur de trait des icônes de la maquette.
export const TRAIT = 2.2

export function Icone({ icone: I, taille = 20, trait = TRAIT, plein = false }: { icone: LucideIcon; taille?: number; trait?: number; plein?: boolean }) {
  return <I aria-hidden="true" size={taille} strokeWidth={trait} {...(plein ? { fill: 'currentColor' } : {})} />
}

// Cercle décoratif des grandes cartes colorées (formes dessinées en code, pas d'image).
export function Cercle({ style, className }: { style: CSSProperties; className?: string }) {
  return <div className={className ? `cercle ${className}` : 'cercle'} aria-hidden="true" style={style} />
}

// Chemin à l'intérieur de l'application : « /app/progres » devient « /progres ».
export function cheminApp(chemin: string): string {
  return chemin.replace(/^\/app(?=\/|$)/, '') || '/'
}

type Onglet = { vers: string; libelle: string; icone: LucideIcon; actifSi: (chemin: string) => boolean }

const ongletsApprenant: Onglet[] = [
  { vers: '/app', libelle: T.nav.accueil, icone: House, actifSi: (c) => c === '/' },
  {
    vers: '/app/entrainer',
    libelle: T.nav.entrainer,
    icone: Mic,
    actifSi: (c) => c.startsWith('/entrainer') || c.startsWith('/module') || c.startsWith('/lecon') || c.startsWith('/arene'),
  },
  { vers: '/app/progres', libelle: T.nav.progres, icone: ChartNoAxesColumn, actifSi: (c) => c.startsWith('/progres') || c.startsWith('/analyse') },
  { vers: '/app/profil', libelle: T.nav.profil, icone: User, actifSi: (c) => c.startsWith('/profil') },
]

const ongletsCoach: Onglet[] = [
  { vers: '/app/coach', libelle: T.navCoach.apprenants, icone: Users, actifSi: (c) => c === '/coach' },
  { vers: '/app/coach', libelle: T.navCoach.agenda, icone: CalendarDays, actifSi: () => false },
  { vers: '/app/coach', libelle: T.navCoach.statistiques, icone: ChartNoAxesColumn, actifSi: () => false },
  { vers: '/app/profil', libelle: T.navCoach.profil, icone: User, actifSi: () => false },
]

// Barre du bas : sur téléphone seulement (masquée sur ordinateur par la feuille de style).
export function BarreBas({ coach = false }: { coach?: boolean }) {
  const chemin = cheminApp(useChemin())
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

// Menu latéral : sur ordinateur seulement.
export function BarreLaterale() {
  const chemin = cheminApp(useChemin())
  return (
    <aside className="barre-laterale">
      <Lien vers="/" className="barre-laterale__marque" aria-label={T.laterale.marque}>
        <span className="marque-ronde__pastille" aria-hidden="true">
          S
        </span>
        <span className="barre-laterale__nom">
          SPLEAD
          <span className="barre-laterale__devise">{T.laterale.devise}</span>
        </span>
      </Lien>
      <nav aria-label={T.laterale.libelle} className="barre-laterale__nav">
        {ongletsApprenant.map((o) => (
          <Lien key={o.libelle} vers={o.vers} className="barre-laterale__lien" aria-current={o.actifSi(chemin) ? 'page' : undefined}>
            <Icone icone={o.icone} />
            {o.libelle}
          </Lien>
        ))}
        <span className="barre-laterale__separateur" aria-hidden="true" />
        <Lien vers="/app/coach" className="barre-laterale__lien" aria-current={chemin === '/coach' ? 'page' : undefined}>
          <Icone icone={Users} />
          {T.laterale.espaceCoach}
        </Lien>
      </nav>
      <div className="barre-laterale__retour">
        <button type="button" className="barre-laterale__lien barre-laterale__deconnexion" onClick={() => { seDeconnecter(); naviguer('/') }}>
          <Icone icone={LogOut} />
          {T.connexion.deconnexion}
        </button>
        <Lien vers="/" className="barre-laterale__lien">
          <Icone icone={ArrowLeft} />
          {T.laterale.retourSite}
        </Lien>
      </div>
    </aside>
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

// Cadre de l'application : menu latéral sur ordinateur, colonne téléphone sur mobile.
// « immersif » : la séance s'affiche seule, sans menu, pour rester concentré.
// « ecran » : classe propre à un écran (ex. « accueil »), pour ses animations et sa mise en page.
export function Appli({
  children,
  variante,
  immersif = false,
  ecran,
}: {
  children: ReactNode
  variante?: 'nuit' | 'blanc'
  immersif?: boolean
  ecran?: string
}) {
  return (
    <div className={`coque${immersif ? ' coque--immersive' : ''}${variante ? ` coque--${variante}` : ''}`}>
      {immersif ? null : <BarreLaterale />}
      <div className={`appli${variante ? ` appli--${variante}` : ''}${ecran ? ` ${ecran}` : ''}`}>{children}</div>
    </div>
  )
}
