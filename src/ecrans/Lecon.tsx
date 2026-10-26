import { ChevronLeft, Mic } from 'lucide-react'
import { Lien } from '../navigation'
import { modules } from '../donnees/exemple'
import { Appli, Barre, EnteteRetour, Icone } from './commun'
import { T } from './textes'

export function EcranLecon({ idModule, numero }: { idModule: number; numero: number }) {
  const module = modules.find((m) => m.id === idModule)
  const lecon = module?.lecons.find((l) => l.numero === numero)

  if (!module || !lecon || lecon.paragraphes.length === 0) {
    return (
      <Appli variante="blanc">
        <EnteteRetour vers={`/app/module/${idModule}`} libelle={T.lecon.retour} titre={T.lecon.introuvable} clair />
      </Appli>
    )
  }

  return (
    <Appli variante="blanc">
      <header className="entete-lecon">
        <Lien vers={`/app/module/${module.id}`} aria-label={T.lecon.retour} className="bouton-rond bouton-rond--fond">
          <Icone icone={ChevronLeft} taille={22} trait={2.6} />
        </Lien>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--texte-secondaire)', fontWeight: 600 }}>{T.lecon.position(module.id, lecon.numero)}</span>
          <Barre valeur={(lecon.numero / module.lecons.length) * 100} />
        </div>
      </header>

      <main className="lecon">
        <span className="etiquette">{lecon.etiquette}</span>
        <h1>{lecon.titre}</h1>
        {lecon.paragraphes.map((p) => (
          <p key={p} className="lecon__texte">
            {p}
          </p>
        ))}
        <ul className="lecon__points">
          {lecon.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="principe">
          <span className="principe__trait" aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {T.lecon.principe}
            </span>
            <span style={{ fontSize: 16, lineHeight: 1.4, fontWeight: 500 }}>{lecon.principe}</span>
          </div>
        </div>

        <section className="cas-pratique">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="puce-ronde" style={{ background: 'var(--turquoise)', color: 'var(--nuit)' }} aria-hidden="true">
              <Icone icone={Mic} taille={15} trait={2.6} />
            </span>
            <span className="surtitre" style={{ color: 'var(--turquoise-clair)' }}>
              {T.lecon.casPratique(lecon.duree)}
            </span>
          </div>
          <span style={{ fontSize: 17, lineHeight: 1.4, fontWeight: 700 }}>{lecon.casPratique}</span>
          <Lien vers="/app/seance" className="bouton-action bouton-action--52" style={{ marginTop: 4 }}>
            {T.lecon.lancer}
          </Lien>
        </section>
      </main>

      <footer className="pied-fixe pied-fixe--trait">
        <Lien vers={`/app/module/${module.id}`} className="bouton-action bouton-action--accent" style={{ flex: 1, height: 54, borderRadius: 27 }}>
          {T.lecon.terminer}
        </Lien>
      </footer>
    </Appli>
  )
}
