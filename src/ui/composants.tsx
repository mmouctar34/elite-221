import { useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { CircleAlert, LoaderCircle, Mic, type LucideIcon } from 'lucide-react'

// Épaisseur de trait commune à toutes les icônes (brief : environ 2,2).
export const TRAIT_ICONE = 2.2

type VarianteBouton = 'principal' | 'secondaire' | 'marque'

type BoutonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: VarianteBouton
  pleineLargeur?: boolean
  icone?: LucideIcon
}

export function Bouton({
  variante = 'principal',
  pleineLargeur = false,
  icone: Icone,
  className,
  children,
  type = 'button',
  ...reste
}: BoutonProps) {
  const classes = ['bouton', `bouton--${variante}`, pleineLargeur ? 'bouton--pleine-largeur' : '', className ?? '']
    .filter(Boolean)
    .join(' ')
  return (
    <button type={type} className={classes} {...reste}>
      {Icone ? <Icone aria-hidden="true" size={20} strokeWidth={TRAIT_ICONE} /> : null}
      {children}
    </button>
  )
}

type BoutonIconeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
  icone: LucideIcon
  // Obligatoire : un bouton sans texte doit avoir un nom lu par les lecteurs d'écran.
  libelle: string
}

export function BoutonIcone({ icone: Icone, libelle, className, type = 'button', ...reste }: BoutonIconeProps) {
  return (
    <button type={type} className={['bouton-icone', className ?? ''].filter(Boolean).join(' ')} aria-label={libelle} title={libelle} {...reste}>
      <Icone aria-hidden="true" size={22} strokeWidth={TRAIT_ICONE} />
    </button>
  )
}

export function Carte({ children, titre, className }: { children: ReactNode; titre?: string; className?: string }) {
  return (
    <section className={['carte', className ?? ''].filter(Boolean).join(' ')}>
      {titre ? <h2>{titre}</h2> : null}
      {children}
    </section>
  )
}

export function Pastille({ children, icone: Icone }: { children: ReactNode; icone?: LucideIcon }) {
  return (
    <span className="pastille">
      {Icone ? <Icone aria-hidden="true" size={16} strokeWidth={TRAIT_ICONE} /> : null}
      {children}
    </span>
  )
}

type ChampTexteProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  libelle: string
  aide?: string
  erreur?: string
}

export function ChampTexte({ libelle, aide, erreur, ...reste }: ChampTexteProps) {
  const id = useId()
  const idMessage = `${id}-message`
  const message = erreur ?? aide
  return (
    <div className="champ">
      <label className="champ__libelle" htmlFor={id}>
        {libelle}
      </label>
      <input
        id={id}
        className="champ__saisie"
        aria-invalid={erreur ? true : undefined}
        aria-describedby={message ? idMessage : undefined}
        {...reste}
      />
      {message ? (
        <p id={idMessage} className={erreur ? 'champ__message champ__message--erreur' : 'champ__message'}>
          {message}
        </p>
      ) : null}
    </div>
  )
}

export function BoutonMicro({
  enregistrement,
  libelleDemarrer,
  libelleArreter,
  onClick,
}: {
  enregistrement: boolean
  libelleDemarrer: string
  libelleArreter: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="micro"
      aria-pressed={enregistrement}
      aria-label={enregistrement ? libelleArreter : libelleDemarrer}
      onClick={onClick}
    >
      <Mic aria-hidden="true" size={44} strokeWidth={TRAIT_ICONE} />
    </button>
  )
}

export type OngletNavigation<Cle extends string> = { cle: Cle; libelle: string; icone: LucideIcon }

export function BarreNavigation<Cle extends string>({
  onglets,
  actif,
  onChoisir,
  libelle,
}: {
  onglets: ReadonlyArray<OngletNavigation<Cle>>
  actif: Cle
  onChoisir: (cle: Cle) => void
  libelle: string
}) {
  return (
    <nav className="barre-navigation" aria-label={libelle}>
      {onglets.map(({ cle, libelle: texte, icone: Icone }) => (
        <button
          key={cle}
          type="button"
          className="barre-navigation__onglet"
          aria-current={cle === actif ? 'page' : undefined}
          onClick={() => onChoisir(cle)}
        >
          <Icone aria-hidden="true" size={24} strokeWidth={TRAIT_ICONE} />
          <span>{texte}</span>
        </button>
      ))}
    </nav>
  )
}

export function Chargement({ texte }: { texte: string }) {
  return (
    <div className="chargement" role="status" aria-live="polite">
      <LoaderCircle className="chargement__icone" aria-hidden="true" size={28} strokeWidth={TRAIT_ICONE} />
      <span>{texte}</span>
    </div>
  )
}

export function EtatErreur({
  titre,
  message,
  libelleReessayer,
  onReessayer,
}: {
  titre: string
  message: string
  libelleReessayer?: string
  onReessayer?: () => void
}) {
  return (
    <section className="carte etat-erreur" role="alert">
      <CircleAlert className="etat-erreur__icone" aria-hidden="true" size={28} strokeWidth={TRAIT_ICONE} />
      <h2>{titre}</h2>
      <p>{message}</p>
      {onReessayer && libelleReessayer ? (
        <Bouton variante="secondaire" onClick={onReessayer}>
          {libelleReessayer}
        </Bouton>
      ) : null}
    </section>
  )
}
