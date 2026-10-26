import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { cheminDansApplication } from './chemin'

// Navigation entre les écrans, sans bibliothèque : l'adresse change (bouton retour
// d'Android compris) et l'écran suit. Les liens restent de vrais liens <a href>.

const BASE = import.meta.env.BASE_URL

function sAbonner(abonne: () => void) {
  window.addEventListener('popstate', abonne)
  return () => window.removeEventListener('popstate', abonne)
}

function lireChemin() {
  return cheminDansApplication(window.location.pathname, BASE)
}

export function useChemin(): string {
  return useSyncExternalStore(sAbonner, lireChemin, () => '/')
}

export function adresse(vers: string): string {
  return `${BASE.replace(/\/$/, '')}${vers}`
}

export function naviguer(vers: string) {
  window.history.pushState(null, '', adresse(vers))
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

type LienProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { vers: string }

export function Lien({ vers, onClick, ...reste }: LienProps) {
  function surClic(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    // Ctrl/Cmd + clic ou clic du milieu : on laisse le navigateur ouvrir un onglet.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    naviguer(vers)
  }
  return <a href={adresse(vers)} onClick={surClic} {...reste} />
}
