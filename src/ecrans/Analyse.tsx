import { Check } from 'lucide-react'
import { Lien } from '../navigation'
import { analyseExemple } from '../donnees/exemple'
import { Appli, Barre, EnteteRetour, Icone } from './commun'
import { T } from './textes'

export function Analyse() {
  const a = analyseExemple
  return (
    <Appli>
      <EnteteRetour vers="/" libelle={T.analyse.retour} titre={T.analyse.titre} />

      <main className="appli__contenu">
        <section className="carte-heros carte-heros--26" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="surtitre" style={{ color: 'var(--turquoise-clair)' }}>
            {T.analyse.resume}
          </span>
          <p style={{ fontSize: 19, lineHeight: 1.3, fontWeight: 700 }}>{a.resume}</p>
        </section>

        <section className="carte-s carte-s--16" style={{ gap: 14 }}>
          {a.axes.map((axe) => (
            <div key={axe.nom} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700 }}>
                <span>{axe.nom}</span>
                <span style={{ color: 'var(--texte-secondaire)', fontWeight: 600 }}>{axe.niveau}</span>
              </div>
              <div role="meter" aria-label={axe.nom} aria-valuemin={0} aria-valuemax={100} aria-valuenow={axe.valeur} aria-valuetext={axe.niveau}>
                <Barre valeur={axe.valeur} className="barre--10" />
              </div>
            </div>
          ))}
        </section>

        <section className="carte-s carte-s--16">
          <h2 className="texte-15-700" style={{ margin: 0 }}>
            {T.analyse.tics}
          </h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
            {a.tics.map((tic) => (
              <li key={tic.mot} className="pastille-tic">
                « {tic.mot} » × {tic.nombre}
              </li>
            ))}
          </ul>
        </section>

        <section className="carte-s carte-s--16">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className="puce-ronde" style={{ background: 'var(--accent)', color: 'var(--blanc)' }} aria-hidden="true">
              <Icone icone={Check} taille={14} trait={3.4} />
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.4 }}>
              <strong>{T.analyse.pointFort}</strong> {a.pointFort}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className="puce-ronde" style={{ background: 'var(--turquoise)', color: 'var(--nuit)' }} aria-hidden="true">
              !
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.4 }}>
              <strong>{T.analyse.aTravailler}</strong> {a.priorite}
            </p>
          </div>
        </section>
      </main>

      <footer className="pied-fixe">
        <Lien vers="/seance" className="bouton-action bouton-action--blanc" style={{ flex: 1, height: 54, borderRadius: 27, fontSize: 16 }}>
          {T.analyse.reessayer}
        </Lien>
        <Lien vers="/progres" className="bouton-action" style={{ flex: 1, height: 54, borderRadius: 27, fontSize: 16 }}>
          {T.analyse.enregistrer}
        </Lien>
      </footer>
    </Appli>
  )
}
