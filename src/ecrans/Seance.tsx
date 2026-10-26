import { useEffect, useState } from 'react'
import { Mic, X } from 'lucide-react'
import { Lien } from '../navigation'
import { Appli, Icone } from './commun'
import { T } from './textes'

const DUREE = 60
// Hauteurs des barres de l'onde, reprises de la maquette.
const ONDE = [12, 24, 36, 20, 8, 28, 40, 20, 32, 16, 12, 12, 12, 12]

export function formaterDuree(secondes: number): string {
  const m = Math.floor(secondes / 60)
  const s = secondes % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

type Etat = 'pret' | 'enregistrement' | 'pause'

export function Seance() {
  const [etat, setEtat] = useState<Etat>('pret')
  const [ecoule, setEcoule] = useState(0)
  // La séance s'arrête toute seule à 60 secondes : la fin se déduit du temps écoulé.
  const fini = ecoule >= DUREE
  const actif = etat === 'enregistrement' && !fini

  useEffect(() => {
    if (!actif) return
    const minuteur = window.setInterval(() => {
      setEcoule((e) => Math.min(e + 1, DUREE))
    }, 1000)
    return () => window.clearInterval(minuteur)
  }, [actif])

  const barresRemplies = Math.round((ecoule / DUREE) * ONDE.length)

  function basculer() {
    if (fini) return
    setEtat(actif ? 'pause' : 'enregistrement')
  }

  return (
    <Appli variante="nuit">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
        <Lien vers="/" aria-label={T.seance.quitter} className="bouton-rond bouton-rond--nuit">
          <Icone icone={X} trait={2.6} />
        </Lien>
        <span style={{ padding: '8px 14px', borderRadius: 18, background: 'var(--nuit-2)', fontSize: 14, fontWeight: 700 }}>{T.seance.scenario}</span>
        <span style={{ width: 44 }} aria-hidden="true" />
      </header>

      <main style={{ flex: 1, padding: '12px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <section className="seance__sujet">
          <span className="surtitre" style={{ color: 'var(--turquoise)' }}>
            {T.seance.sujet}
          </span>
          <h1 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 800, color: 'inherit' }}>{T.seance.sujetTexte}</h1>
          <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--texte-sur-nuit)' }}>{T.seance.conseil}</span>
        </section>

        <button
          type="button"
          className={`micro-seance${actif ? ' micro-seance--actif' : ''}`}
          aria-pressed={actif}
          aria-label={actif ? T.seance.pause : T.seance.demarrer}
          onClick={basculer}
        >
          <span className="micro-seance__anneau micro-seance__anneau--1" style={{ inset: 0, background: 'var(--nuit-3)' }} />
          <span className="micro-seance__anneau" style={{ inset: 28, background: 'var(--nuit-4)' }} />
          <span className="micro-seance__anneau" style={{ inset: 56, background: 'var(--turquoise)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icone icone={Mic} taille={52} />
          </span>
        </button>

        <svg width="260" height="44" viewBox="0 0 260 44" role="img" aria-label={T.seance.onde} style={{ display: 'block' }}>
          {ONDE.map((h, i) => (
            <rect key={i} x={4 + i * 18} y={(44 - h) / 2} width="8" height={h} rx="4" fill={i < barresRemplies ? 'var(--turquoise)' : '#4A4590'} />
          ))}
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} aria-live="off">
          <span className="chrono" role="timer" aria-label={`${ecoule} secondes écoulées sur 60`}>
            {formaterDuree(ecoule)}
          </span>
          <span style={{ fontSize: 14, color: 'var(--texte-sur-nuit)' }}>{T.seance.sur}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--texte-sur-nuit)', textAlign: 'center' }}>{T.seance.demo}</p>
      </main>

      <footer style={{ display: 'flex', gap: 12, padding: '12px 24px 32px' }}>
        <button type="button" className="bouton-action bouton-action--nuit" style={{ flex: 1 }} onClick={basculer} disabled={etat === 'pret' || fini}>
          {etat === 'pause' ? T.seance.reprendre : T.seance.pause}
        </button>
        <Lien vers="/analyse" className="bouton-action" style={{ flex: 2 }}>
          {T.seance.terminer}
        </Lien>
      </footer>
    </Appli>
  )
}
