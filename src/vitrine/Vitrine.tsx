import { useState } from 'react'
import { BookText, ChartNoAxesColumn, Check, Download, Flame, Menu, Mic, Smartphone, Video, X } from 'lucide-react'
import { Lien } from '../navigation'
import { modules } from '../donnees/exemple'
import { Icone } from '../ecrans/commun'
import { lancerInstallation, useInstallation } from '../pwa/installation'
import { V } from './textes'

const iconesEtapes = [BookText, Mic, ChartNoAxesColumn, Video]

function Marque() {
  return (
    <a href="#haut" className="v-marque">
      <span className="marque-ronde__pastille" aria-hidden="true">
        S
      </span>
      <span className="v-marque__nom">
        SPLEAD
        <span className="v-marque__devise">{V.devise}</span>
      </span>
    </a>
  )
}

// Aperçu de l'application, dessiné en code (pas d'image) : reprend l'accueil de la maquette.
function ApercuApplication() {
  return (
    <div className="v-apercu" aria-hidden="true">
      <div className="v-apercu__ecran">
        <div className="v-apercu__entete">
          <span className="marque-ronde__pastille" style={{ width: 26, height: 26, fontSize: 13 }}>
            S
          </span>
          <span className="v-apercu__serie">
            <Icone icone={Flame} taille={12} plein trait={0} /> 3 jours
          </span>
        </div>
        <div className="v-apercu__carte">
          <span className="v-apercu__cercle" />
          <span className="v-apercu__pastille">{V.apercu.seance}</span>
          <span className="v-apercu__titre">{V.apercu.titre}</span>
          <span className="v-apercu__bouton">
            <Icone icone={Mic} taille={14} trait={2.4} /> {V.apercu.bouton}
          </span>
        </div>
        <div className="v-apercu__semaine">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className={i < 3 ? 'v-apercu__jour v-apercu__jour--fait' : i === 3 ? 'v-apercu__jour v-apercu__jour--aujourdhui' : 'v-apercu__jour'}>
              {i < 3 ? <Icone icone={Check} taille={10} trait={3.4} /> : null}
            </span>
          ))}
        </div>
        <div className="v-apercu__ligne" />
        <div className="v-apercu__ligne v-apercu__ligne--courte" />
      </div>
    </div>
  )
}

export function Vitrine() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const { peutInstaller } = useInstallation()

  return (
    <div className="vitrine" id="haut">
      <header className="v-entete">
        <div className="v-conteneur v-entete__ligne">
          <Marque />
          <nav aria-label={V.navLibelle} className={`v-nav${menuOuvert ? ' v-nav--ouverte' : ''}`} id="menu-site">
            {V.nav.map((n) => (
              <a key={n.ancre} href={`#${n.ancre}`} className="v-nav__lien" onClick={() => setMenuOuvert(false)}>
                {n.libelle}
              </a>
            ))}
            <Lien vers="/app" className="v-bouton v-bouton--clair v-nav__mobile">
              {V.seConnecter}
            </Lien>
          </nav>
          <div className="v-entete__actions">
            <Lien vers="/app" className="v-bouton v-bouton--clair v-ordinateur">
              {V.seConnecter}
            </Lien>
            <Lien vers="/app" className="v-bouton v-bouton--action">
              {V.commencer}
            </Lien>
            <button
              type="button"
              className="v-menu"
              aria-expanded={menuOuvert}
              aria-controls="menu-site"
              aria-label={menuOuvert ? V.fermerMenu : V.menu}
              onClick={() => setMenuOuvert((o) => !o)}
            >
              <Icone icone={menuOuvert ? X : Menu} taille={22} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="v-heros">
          <div className="v-conteneur v-heros__grille">
            <div className="v-heros__texte">
              <span className="v-badge">
                <span className="v-badge__point" aria-hidden="true" />
                {V.heros.badge}
              </span>
              <h1>{V.heros.titre}</h1>
              <p className="v-heros__intro">{V.heros.texte}</p>
              <div className="v-heros__actions">
                <Lien vers="/app" className="v-bouton v-bouton--action v-bouton--grand">
                  <Icone icone={Mic} trait={2.4} />
                  {V.commencer}
                </Lien>
                <a href="#programme" className="v-bouton v-bouton--clair v-bouton--grand">
                  {V.heros.decouvrir}
                </a>
                {peutInstaller ? (
                  <button type="button" className="v-bouton v-bouton--marque v-bouton--grand" onClick={() => void lancerInstallation()}>
                    <Icone icone={Download} />
                    {V.installer}
                  </button>
                ) : null}
              </div>
              <dl className="v-chiffres">
                {V.heros.chiffres.map((c) => (
                  <div key={c.libelle} className="v-chiffres__item">
                    <dt className="visuellement-cache">{c.libelle}</dt>
                    <dd className="v-chiffres__valeur">{c.valeur}</dd>
                    <dd className="v-chiffres__libelle" aria-hidden="true">
                      {c.libelle}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <ApercuApplication />
          </div>
        </section>

        <section className="v-section" id="fonctionnement" aria-labelledby="titre-fonctionnement">
          <div className="v-conteneur">
            <h2 id="titre-fonctionnement">{V.fonctionnement.titre}</h2>
            <p className="v-sous-titre">{V.fonctionnement.sousTitre}</p>
            <ol className="v-grille v-grille--4">
              {V.fonctionnement.etapes.map((e, i) => {
                const I = iconesEtapes[i] ?? Mic
                return (
                  <li key={e.titre} className="v-carte">
                    <span className="v-carte__icone">
                      <Icone icone={I} taille={24} />
                    </span>
                    <span className="v-carte__numero">{`0${i + 1}`}</span>
                    <h3>{e.titre}</h3>
                    <p>{e.texte}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="v-section v-section--blanche" id="programme" aria-labelledby="titre-programme">
          <div className="v-conteneur">
            <h2 id="titre-programme">{V.programme.titre}</h2>
            <p className="v-sous-titre">{V.programme.sousTitre}</p>
            <ul className="v-grille v-grille--3">
              {modules.map((m) => (
                <li key={m.id} className="v-carte v-carte--module">
                  <span className="v-carte__surtitre">Module {m.id}</span>
                  <h3>{m.titre}</h3>
                  <ul className="v-pastilles">
                    {m.themes.map((t) => (
                      <li key={t} className="etiquette">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ul className="v-lecons">
                    {m.lecons.map((l) => (
                      <li key={l.numero}>{l.titre}</li>
                    ))}
                  </ul>
                  <span className={m.acces === 'gratuit' ? 'v-acces v-acces--gratuit' : 'v-acces'}>
                    {V.programme.lecons(m.lecons.length)} · {m.acces === 'gratuit' ? V.programme.gratuit : V.programme.abonnement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v-section" aria-labelledby="titre-publics">
          <div className="v-conteneur">
            <h2 id="titre-publics">{V.publics.titre}</h2>
            <ul className="v-grille v-grille--3">
              {V.publics.liste.map((p) => (
                <li key={p.titre} className="v-carte">
                  <h3>{p.titre}</h3>
                  <p>{p.texte}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v-section" aria-labelledby="titre-coach">
          <div className="v-conteneur">
            <div className="v-bandeau-nuit">
              <span className="cercle" style={{ right: -60, top: -60, width: 220, height: 220, background: 'var(--nuit-2)' }} aria-hidden="true" />
              <div className="v-bandeau-nuit__texte">
                <h2 id="titre-coach">{V.coach.titre}</h2>
                <p>{V.coach.texte}</p>
              </div>
              <ul className="v-bandeau-nuit__points">
                {V.coach.points.map((p) => (
                  <li key={p}>
                    <span className="puce-ronde" style={{ background: 'var(--turquoise)', color: 'var(--nuit)' }} aria-hidden="true">
                      <Icone icone={Check} taille={14} trait={3.2} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="v-section v-section--blanche" id="tarifs" aria-labelledby="titre-tarifs">
          <div className="v-conteneur">
            <h2 id="titre-tarifs">{V.tarifs.titre}</h2>
            <p className="v-sous-titre">{V.tarifs.sousTitre}</p>
            <div className="v-grille v-grille--2 v-tarifs">
              {V.tarifs.offres.map((o) => (
                <article key={o.nom} className={`v-carte v-offre${o.miseEnAvant ? ' v-offre--avant' : ''}`}>
                  <span className="v-carte__surtitre">{o.mention}</span>
                  <h3>{o.nom}</h3>
                  <p className="v-offre__prix">{o.prix}</p>
                  <ul className="v-offre__liste">
                    {o.avantages.map((a) => (
                      <li key={a}>
                        <Icone icone={Check} taille={18} trait={3} />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <Lien vers="/app" className={`v-bouton v-bouton--grand ${o.miseEnAvant ? 'v-bouton--action' : 'v-bouton--clair'}`}>
                    {o.bouton}
                  </Lien>
                </article>
              ))}
            </div>
            <p className="v-note">{V.tarifs.paiement}</p>
          </div>
        </section>

        <section className="v-section" id="a-propos" aria-labelledby="titre-a-propos">
          <div className="v-conteneur v-a-propos">
            <div>
              <h2 id="titre-a-propos">{V.aPropos.titre}</h2>
              {V.aPropos.paragraphes.map((p) => (
                <p key={p} className="v-paragraphe">
                  {p}
                </p>
              ))}
            </div>
            <ul className="v-valeurs">
              {V.aPropos.valeurs.map((v) => (
                <li key={v.titre} className="v-carte">
                  <h3>{v.titre}</h3>
                  <p>{v.texte}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v-section v-section--blanche" id="installer" aria-labelledby="titre-installer">
          <div className="v-conteneur">
            <h2 id="titre-installer">{V.installation.titre}</h2>
            <p className="v-sous-titre">{V.installation.texte}</p>
            <div className="v-grille v-grille--2">
              {[V.installation.android, V.installation.iphone].map((s) => (
                <div key={s.titre} className="v-carte">
                  <span className="v-carte__icone">
                    <Icone icone={Smartphone} taille={24} />
                  </span>
                  <h3>{s.titre}</h3>
                  <ol className="v-etapes">
                    {s.etapes.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v-section" id="faq" aria-labelledby="titre-faq">
          <div className="v-conteneur v-faq">
            <h2 id="titre-faq">{V.faq.titre}</h2>
            {V.faq.questions.map((q) => (
              <details key={q.q} className="v-question">
                <summary>{q.q}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="v-section">
          <div className="v-conteneur">
            <div className="v-appel">
              <span className="cercle" style={{ right: -50, top: -50, width: 200, height: 200, background: 'var(--accent-clair)' }} aria-hidden="true" />
              <span className="cercle" style={{ right: 60, bottom: -30, width: 80, height: 80, background: 'var(--turquoise)' }} aria-hidden="true" />
              <h2>{V.appel.titre}</h2>
              <Lien vers="/app" className="v-bouton v-bouton--action v-bouton--grand">
                <Icone icone={Mic} trait={2.4} />
                {V.appel.bouton}
              </Lien>
            </div>
          </div>
        </section>
      </main>

      <footer className="v-pied">
        <div className="v-conteneur v-pied__ligne">
          <Marque />
          <ul className="v-pied__liens">
            <li>{V.pied.confidentialite}</li>
            <li>{V.pied.conditions}</li>
            <li>{V.pied.contact}</li>
          </ul>
          <span>{V.pied.droits}</span>
        </div>
      </footer>
    </div>
  )
}
