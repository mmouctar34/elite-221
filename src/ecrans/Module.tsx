import { Check, ChevronLeft, Download, Lock, Mic, Play } from 'lucide-react'
import { Lien } from '../navigation'
import { apprenant, modules } from '../donnees/exemple'
import { Appli, Barre, BarreBas, Cercle, Icone } from './commun'
import { T } from './textes'

export function EcranModule({ id }: { id: number }) {
  const module = modules.find((m) => m.id === id) ?? modules[0]
  if (!module) return null

  const premierModule = module.id === 1
  // Données d'exemple : seule la progression du module 1 existe.
  const faites = premierModule ? apprenant.leconsTerminees : 0
  const enCours = premierModule ? apprenant.leconEnCours.lecon : 0

  return (
    <Appli>
      <header className="entete-module">
        <Cercle style={{ right: -40, top: -40, width: 150, height: 150, background: 'var(--accent-clair)', position: 'absolute' }} />
        <Cercle style={{ right: 26, top: 40, width: 46, height: 46, background: 'var(--turquoise)', position: 'absolute' }} />
        <Lien vers="/app/entrainer" aria-label={T.commun.retour} className="bouton-rond">
          <Icone icone={ChevronLeft} taille={22} trait={2.6} />
        </Lien>
        <span className="surtitre" style={{ color: 'var(--turquoise-clair)' }}>
          {T.module.surtitre(module.id)}
        </span>
        <h1>{module.titre}</h1>
        <span style={{ fontSize: 14, color: 'var(--texte-sur-accent)' }}>{module.themes.join(' · ')}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Barre valeur={((faites + (enCours ? 1 : 0)) / module.lecons.length) * 100} className="barre--8" couleur="var(--turquoise)" />
          <span style={{ fontSize: 13, fontWeight: 700 }}>{T.module.lecons(faites + (enCours ? 1 : 0), module.lecons.length)}</span>
        </div>
      </header>

      <main className="appli__contenu" style={{ paddingTop: 16, gap: 10 }}>
        {!premierModule ? (
          <p className="carte-s pleine" style={{ fontSize: 15, lineHeight: 1.4 }}>
            {T.module.reserve}
          </p>
        ) : null}

        {module.lecons.map((l) => {
          const faite = l.numero <= faites
          const active = l.numero === enCours
          if (faite) {
            return (
              <Lien key={l.numero} vers={`/app/lecon/${module.id}/${l.numero}`} className="carte-ligne carte-ligne--18 lien-carte">
                <span className="rond-etat rond-etat--faite" aria-hidden="true">
                  <Icone icone={Check} taille={16} trait={3.2} />
                </span>
                <div className="carte-ligne__texte" style={{ gap: 0 }}>
                  <span className="texte-15-700">{l.titre}</span>
                  <span className="tres-petit-gris">{T.module.leconEtat(l.numero, T.module.terminee)}</span>
                </div>
              </Lien>
            )
          }
          if (active) {
            return (
              <div key={l.numero} className="carte-ligne carte-ligne--18 carte-ligne--active">
                <Lien vers={`/app/lecon/${module.id}/${l.numero}`} className="lien-carte" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, minHeight: 44 }}>
                  <span className="rond-etat rond-etat--en-cours" aria-hidden="true">
                    <Icone icone={Play} taille={14} plein trait={0} />
                  </span>
                  <span className="carte-ligne__texte" style={{ gap: 0 }}>
                    <span className="texte-15-800">{l.titre}</span>
                    <span className="tres-petit-gris">{T.module.leconEtat(l.numero, T.module.enCours)}</span>
                  </span>
                </Lien>
                <button type="button" className="bouton-telecharger" aria-label={`${T.module.telecharger} : ${l.titre}`}>
                  <Icone icone={Download} trait={2.4} />
                </button>
              </div>
            )
          }
          return (
            <div key={l.numero} className="carte-ligne carte-ligne--18">
              <span className="rond-etat rond-etat--a-faire" aria-hidden="true" />
              <div className="carte-ligne__texte" style={{ gap: 0 }}>
                <span className="texte-15-700" style={{ fontWeight: 600 }}>
                  {l.titre}
                </span>
                <span className="tres-petit-gris">{T.module.leconEtat(l.numero, l.etiquette)}</span>
              </div>
              <button type="button" className="bouton-telecharger bouton-telecharger--neutre" aria-label={`${T.module.telecharger} : ${l.titre}`}>
                <Icone icone={Download} trait={2.4} />
              </button>
            </div>
          )
        })}

        <div className="carte-ligne carte-ligne--18 pleine" style={{ background: 'var(--nuit)', color: 'var(--blanc)', padding: 14 }}>
          <span className="rond-etat rond-etat--en-cours" aria-hidden="true">
            <Icone icone={Mic} taille={18} trait={2.4} />
          </span>
          <div className="carte-ligne__texte" style={{ gap: 0 }}>
            <span className="texte-15-800">{T.module.casFinal}</span>
            <span style={{ fontSize: 12, color: 'var(--texte-sur-nuit)' }}>{T.module.casFinalTexte}</span>
          </div>
          <span style={{ color: 'var(--gris-cadenas)', display: 'flex' }}>
            <Icone icone={Lock} />
          </span>
        </div>
      </main>

      <BarreBas />
    </Appli>
  )
}
