import type { ReactNode } from 'react'
import { BookText, Check, ChevronRight, Flame, Mic, Video } from 'lucide-react'
import { Lien } from '../navigation'
import { apprenant, coach, modules } from '../donnees/exemple'
import { Appli, BarreBas, Cercle, Icone } from './commun'
import { T } from './textes'
import { useSession } from '../session'

export function Accueil({ bandeaux }: { bandeaux?: ReactNode }) {
  const session = useSession()
  const totalLecons = modules.reduce((n, m) => n + m.lecons.length, 0)
  const { module: idModule, lecon: numLecon } = apprenant.leconEnCours
  const leconEnCours = modules.find((m) => m.id === idModule)?.lecons.find((l) => l.numero === numLecon)

  return (
    <Appli>
      <header className="entete-accueil">
        <div className="marque-ronde">
          <div className="marque-ronde__pastille" aria-hidden="true">
            S
          </div>
          <span className="marque-ronde__nom">SPLEAD</span>
        </div>
        <div className="serie" aria-label={`Série : ${T.commun.jours(apprenant.serieJours)}`}>
          <span style={{ color: 'var(--turquoise)', display: 'flex' }}>
            <Icone icone={Flame} taille={16} plein trait={0} />
          </span>
          {T.commun.jours(apprenant.serieJours)}
        </div>
      </header>

      <div className="salutation">
        <span className="salutation__bonjour">{T.accueil.bonjour}</span>
        <span className="salutation__prenom">{session?.prenom || apprenant.prenom}</span>
      </div>

      {bandeaux ? <div className="bandeaux">{bandeaux}</div> : null}

      <main className="appli__contenu" style={{ paddingTop: 8 }}>
        <section className="carte-heros accueil__heros">
          <Cercle style={{ right: -50, top: -50, width: 170, height: 170, background: 'var(--accent-clair)' }} />
          <Cercle style={{ right: 30, top: 60, width: 60, height: 60, background: 'var(--turquoise)' }} />
          <div className="carte-heros__contenu">
            <span className="pastille-action">{T.accueil.seanceDuJour}</span>
            <h2 style={{ margin: '22px 0 0', fontSize: 26, lineHeight: 1.12, fontWeight: 800, width: '80%', color: 'inherit' }}>
              {T.accueil.titreSeance}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--texte-sur-accent)' }}>{T.accueil.texteSeance}</p>
            <Lien vers="/app/seance" className="bouton-action" style={{ marginTop: 6 }}>
              <Icone icone={Mic} taille={22} trait={2.4} />
              {T.accueil.commencer}
            </Lien>
          </div>
        </section>

        <div className="accueil__colonne">
        <section className="carte-s">
          <h2 className="texte-15-700" style={{ margin: 0 }}>
            {T.accueil.semaine}
          </h2>
          <ol className="semaine" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {apprenant.semaine.map((etat, i) => (
              <li
                key={i}
                className={`semaine__jour${etat === 'aujourdhui' ? ' semaine__jour--aujourdhui' : ''}`}
                aria-label={`${T.accueil.joursLongs[i]} : ${T.accueil.etatJour[etat]}`}
              >
                <span className={`semaine__rond semaine__rond--${etat}`} aria-hidden="true">
                  {etat === 'faite' ? <Icone icone={Check} taille={14} trait={3.4} /> : null}
                </span>
                <span aria-hidden="true">{T.accueil.joursCourts[i]}</span>
              </li>
            ))}
          </ol>
        </section>

        <Lien vers={`/app/lecon/${idModule}/${numLecon}`} className="carte-ligne lien-carte">
          <div className="icone-carree">
            <Icone icone={BookText} taille={24} />
          </div>
          <div className="carte-ligne__texte">
            <span className="petit-gris">{T.accueil.taLecon(apprenant.leconsTerminees + 1, totalLecons)}</span>
            <span className="texte-16-700">{leconEnCours?.titre}</span>
          </div>
          <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
            <Icone icone={ChevronRight} trait={2.4} />
          </span>
        </Lien>

        <Lien vers="/app/profil" className="carte-ligne lien-carte">
          <div className="icone-carree icone-carree--nuit">
            <Icone icone={Video} taille={24} />
          </div>
          <div className="carte-ligne__texte">
            <span className="petit-gris">{T.accueil.prochainMeet}</span>
            <span className="texte-16-700">{coach.prochainMeet}</span>
          </div>
          <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
            <Icone icone={ChevronRight} trait={2.4} />
          </span>
        </Lien>
        </div>
      </main>

      <BarreBas />
    </Appli>
  )
}
