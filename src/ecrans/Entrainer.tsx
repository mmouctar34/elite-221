import { ChevronRight, Lock, Mic, Star, Trophy, User } from 'lucide-react'
import { Lien } from '../navigation'
import { apprenant, arene, modules } from '../donnees/exemple'
import { Appli, Barre, BarreBas, Cercle, Icone } from './commun'
import { T } from './textes'

const iconesModules = [Mic, Star, User]

export function Entrainer() {
  return (
    <Appli>
      <header className="titre-ecran">
        <h1>{T.entrainer.titre}</h1>
      </header>

      <main className="appli__contenu">
        <Lien vers="/arene" className="carte-heros carte-heros--26 carte-heros--nuit lien-carte" style={{ display: 'block' }}>
          <Cercle style={{ right: -34, top: -34, width: 130, height: 130, background: 'var(--nuit-2)' }} />
          <div
            aria-hidden="true"
            style={{ position: 'absolute', right: 22, top: 22, width: 52, height: 52, borderRadius: '50%', background: 'var(--turquoise)', color: 'var(--nuit)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Icone icone={Trophy} taille={26} />
          </div>
          <div className="carte-heros__contenu" style={{ gap: 6 }}>
            <span className="surtitre" style={{ color: 'var(--turquoise-clair)' }}>
              {T.entrainer.defi}
            </span>
            <span style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.1, width: '70%' }}>{T.entrainer.arene}</span>
            <span style={{ fontSize: 14, color: 'var(--texte-sur-nuit)' }}>{T.entrainer.participants(arene.participants)}</span>
            <span className="bouton-action" style={{ marginTop: 8, alignSelf: 'flex-start', height: 44, borderRadius: 22, padding: '0 20px', fontSize: 15 }}>
              {T.entrainer.entrer}
            </span>
          </div>
        </Lien>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 className="texte-15-800" style={{ margin: 0 }}>
            {T.entrainer.mesModules}
          </h2>

          {modules.map((m, i) => {
            const IconeModule = iconesModules[i] ?? Mic
            const ouvert = m.acces === 'gratuit' || apprenant.abonnement
            if (i === 0) {
              const faites = apprenant.leconsTerminees + 1
              return (
                <Lien key={m.id} vers={`/module/${m.id}`} className="carte-ligne carte-ligne--20 lien-carte">
                  <div className="icone-carree icone-carree--44 icone-carree--accent">
                    <Icone icone={IconeModule} taille={22} />
                  </div>
                  <div className="carte-ligne__texte" style={{ gap: 6 }}>
                    <span className="texte-16-700">{m.titre}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Barre valeur={(faites / m.lecons.length) * 100} />
                      <span className="tres-petit-gris">
                        {faites} / {m.lecons.length}
                      </span>
                    </div>
                  </div>
                  <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
                    <Icone icone={ChevronRight} trait={2.4} />
                  </span>
                </Lien>
              )
            }
            return (
              <Lien key={m.id} vers={`/module/${m.id}`} className="carte-ligne carte-ligne--20 lien-carte">
                <div className="icone-carree icone-carree--44">
                  <Icone icone={IconeModule} taille={22} />
                </div>
                <div className="carte-ligne__texte">
                  <span className="texte-16-700">{m.titre}</span>
                  <span className="petit-gris">{T.entrainer.debloqueApres(m.lecons.length, m.id - 1)}</span>
                  {!ouvert ? (
                    <span className="pastille-premium" style={{ marginTop: 4 }}>
                      {T.commun.abonnement}
                    </span>
                  ) : null}
                </div>
                <span style={{ color: 'var(--gris-cadenas)', display: 'flex' }} aria-label={T.entrainer.verrouille} role="img">
                  <Icone icone={Lock} />
                </span>
              </Lien>
            )
          })}
        </section>

        <Lien vers="/seance" className="carte-ligne carte-ligne--20 lien-carte">
          <div className="icone-carree icone-carree--44 icone-carree--turquoise">
            <Icone icone={Mic} taille={22} />
          </div>
          <div className="carte-ligne__texte">
            <span className="texte-16-700">{T.entrainer.seanceLibre}</span>
            <span className="petit-gris">{T.entrainer.scenarios}</span>
          </div>
          <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
            <Icone icone={ChevronRight} trait={2.4} />
          </span>
        </Lien>
      </main>

      <BarreBas />
    </Appli>
  )
}
