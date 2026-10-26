import { Flame, Lock, Mic } from 'lucide-react'
import { apprenant, badges, evolutionTics } from '../donnees/exemple'
import { Appli, BarreBas, Cercle, Icone } from './commun'
import { T } from './textes'

// Points de la courbe : x réparti sur la largeur, y proportionnel au nombre de tics.
export function pointsCourbe(valeurs: readonly number[], largeur = 318, hauteur = 110, marge = 8): Array<[number, number]> {
  const max = Math.max(...valeurs, 1)
  const pas = valeurs.length > 1 ? (largeur - 2 * marge) / (valeurs.length - 1) : 0
  return valeurs.map((v, i) => [Math.round(marge + i * pas), Math.round(hauteur - marge - (v / max) * (hauteur - 2 * marge - 4))])
}

const iconesBadges = { micro: Mic, flamme: Flame, cadenas: Lock }

export function Progres() {
  const points = pointsCourbe(evolutionTics)
  const chemin = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

  return (
    <Appli>
      <header className="titre-ecran">
        <h1>{T.progres.titre}</h1>
      </header>

      <main className="appli__contenu">
        <section className="carte-heros" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Cercle style={{ right: -40, top: -40, width: 150, height: 150, background: 'var(--accent-clair)' }} />
          <span style={{ position: 'relative', color: 'var(--turquoise)', display: 'flex' }}>
            <Icone icone={Flame} taille={34} plein trait={0} />
          </span>
          <span style={{ position: 'relative', fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{T.commun.jours(apprenant.serieJours)}</span>
          <span style={{ position: 'relative', fontSize: 15, color: 'var(--texte-sur-accent)' }}>{T.progres.deSuite}</span>
        </section>

        <section className="grille-3">
          <div className="chiffre">
            <span className="chiffre__valeur">{apprenant.seances}</span>
            <span className="petit-gris">{T.progres.seances}</span>
          </div>
          <div className="chiffre">
            <span className="chiffre__valeur">{apprenant.minutes}</span>
            <span className="petit-gris">{T.progres.minutes}</span>
          </div>
          <div className="chiffre">
            <span className="chiffre__valeur">{apprenant.ticsEnMoins}</span>
            <span className="petit-gris">{T.progres.ticsEnMoins}</span>
          </div>
        </section>

        <section className="carte-s carte-s--16" style={{ gap: 12 }}>
          <h2 className="texte-15-700" style={{ margin: 0 }}>
            {T.progres.evolution}
          </h2>
          <svg viewBox="0 0 318 110" role="img" aria-label={T.progres.courbe} style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d={chemin} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 7 : 6} fill={i === points.length - 1 ? 'var(--turquoise)' : 'var(--accent)'} />
            ))}
          </svg>
          <span className="petit-gris">{T.progres.noteCourbe}</span>
        </section>

        <section className="carte-s carte-s--16" style={{ gap: 12 }}>
          <h2 className="texte-15-700" style={{ margin: 0 }}>
            {T.progres.badges}
          </h2>
          <ul style={{ display: 'flex', gap: 14, margin: 0, padding: 0, listStyle: 'none' }}>
            {badges.map((b) => {
              const IconeBadge = iconesBadges[b.icone]
              const fond = !b.obtenu ? 'var(--brume)' : b.icone === 'micro' ? 'var(--turquoise)' : 'var(--accent)'
              const couleur = !b.obtenu ? 'var(--gris-cadenas)' : b.icone === 'micro' ? 'var(--nuit)' : 'var(--blanc)'
              return (
                <li key={b.nom} className="badge" style={b.obtenu ? undefined : { fontWeight: 600, color: 'var(--texte-secondaire)' }}>
                  <span className="badge__rond" style={{ background: fond, color: couleur }} aria-hidden="true">
                    <Icone icone={IconeBadge} taille={26} trait={2.4} plein={b.icone === 'flamme'} />
                  </span>
                  <span>
                    {b.nom}
                    {b.obtenu ? '' : <span className="visuellement-cache"> (pas encore obtenu)</span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <BarreBas />
    </Appli>
  )
}
