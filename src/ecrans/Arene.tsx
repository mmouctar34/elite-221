import { Mic } from 'lucide-react'
import { Lien } from '../navigation'
import { arene, initiales } from '../donnees/exemple'
import { Appli, BarreBas, Cercle, EnteteRetour, Icone } from './commun'
import { T } from './textes'

const couleursRangs: Record<number, { fond: string; texte: string }> = {
  1: { fond: 'var(--nuit)', texte: 'var(--blanc)' },
  2: { fond: 'var(--accent)', texte: 'var(--blanc)' },
  3: { fond: 'var(--turquoise)', texte: 'var(--nuit)' },
}

export function Arene() {
  return (
    <Appli>
      <EnteteRetour vers="/entrainer" libelle={T.commun.retour} titre={T.arene.titre} />

      <main className="appli__contenu">
        <section className="carte-heros carte-heros--26" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Cercle style={{ right: -36, top: -36, width: 140, height: 140, background: 'var(--accent-clair)' }} />
          <span className="surtitre" style={{ position: 'relative', color: 'var(--turquoise-clair)' }}>
            {T.arene.defi(arene.numero, arene.finDans)}
          </span>
          <h2 style={{ position: 'relative', margin: 0, fontSize: 22, lineHeight: 1.2, fontWeight: 800, width: '85%', color: 'inherit' }}>{arene.sujet}</h2>
          <Lien vers="/seance" className="bouton-action bouton-action--52" style={{ position: 'relative', marginTop: 8, gap: 8 }}>
            <Icone icone={Mic} trait={2.4} />
            {T.arene.relever}
          </Lien>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{T.arene.classement}</h2>
            <span className="etiquette" style={{ fontSize: 12 }}>
              {T.arene.ligue(arene.ligue)}
            </span>
          </div>

          <ol className="classement">
            {arene.classement.map((j) => {
              const couleur = couleursRangs[j.rang]
              return (
                <li key={j.rang} className="classement__ligne">
                  <span className="rang" style={couleur ? { background: couleur.fond, color: couleur.texte } : undefined} aria-label={`Rang ${j.rang}`}>
                    {j.rang}
                  </span>
                  <span className="avatar" aria-hidden="true">
                    {initiales(j.nom)}
                  </span>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{j.nom}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, whiteSpace: 'nowrap' }}>{T.arene.points(j.points)}</span>
                </li>
              )
            })}
          </ol>

          <div className="carte-ligne carte-ligne--18" style={{ background: 'var(--nuit)', color: 'var(--blanc)' }}>
            <span
              style={{ minWidth: 32, height: 32, padding: '0 6px', boxSizing: 'border-box', borderRadius: 16, background: 'var(--turquoise)', color: 'var(--nuit)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flex: 'none' }}
              aria-label={`Ton rang : ${arene.monRang}`}
            >
              {arene.monRang}
            </span>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 800 }}>{T.arene.toi}</span>
            <span style={{ fontSize: 13, color: 'var(--texte-sur-nuit)' }}>{T.arene.remise}</span>
            <span style={{ fontSize: 15, fontWeight: 800, whiteSpace: 'nowrap' }}>{T.arene.points(arene.mesPoints)}</span>
          </div>
        </section>
      </main>

      <BarreBas />
    </Appli>
  )
}
