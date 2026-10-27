import { useLayoutEffect, type RefObject } from 'react'

// Blocs de la page d'accueil qui apparaissent en douceur quand on fait défiler la page.
const CIBLES = [
  '.v-section h2:not(.v-bandeau-nuit h2, .v-appel h2)',
  '.v-sous-titre',
  '.v-grille > *',
  '.v-bandeau-nuit',
  '.v-paragraphe',
  '.v-valeurs > *',
  '.v-question',
  '.v-appel',
].join(', ')

// Décalage maximal entre deux voisins (en rangs de 90 ms), pour ne jamais faire attendre.
const RANG_MAX = 4

// Rien n'est caché si le navigateur ne sait pas observer le défilement, ni pour les
// personnes qui ont demandé à réduire les animations : le contenu reste toujours lisible.
export function useApparitionAuDefilement(racine: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const element = racine.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const cibles = Array.from(element.querySelectorAll<HTMLElement>(CIBLES))
    const terminer = (cible: HTMLElement) => cible.classList.remove('v-apparait', 'est-visible')

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue
          const cible = entree.target as HTMLElement
          observateur.unobserve(cible)
          cible.classList.add('est-visible')
          // Une fois arrivé, le bloc redevient normal (le survol des cartes reste réactif).
          const fin = (evenement: TransitionEvent) => {
            if (evenement.target !== cible || evenement.propertyName !== 'opacity') return
            cible.removeEventListener('transitionend', fin)
            terminer(cible)
          }
          cible.addEventListener('transitionend', fin)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    for (const cible of cibles) {
      const rang = cible.parentElement ? Array.prototype.indexOf.call(cible.parentElement.children, cible) : 0
      cible.style.setProperty('--rang', String(Math.min(rang, RANG_MAX)))
      cible.classList.add('v-apparait')
      observateur.observe(cible)
    }

    return () => {
      observateur.disconnect()
      cibles.forEach(terminer)
    }
  }, [racine])
}
