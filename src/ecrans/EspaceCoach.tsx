import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { apprenantsDuCoach, initiales, statsCoach } from '../donnees/exemple'
import { Appli, Barre, BarreBas, Icone } from './commun'
import { T } from './textes'

type Filtre = 'tous' | 'relancer' | 'progres'

export function filtrerApprenants(filtre: Filtre) {
  if (filtre === 'relancer') return apprenantsDuCoach.filter((a) => a.statut === 'À relancer')
  // « En progrès » : apprenants actifs qui ont dépassé la moitié du parcours.
  if (filtre === 'progres') return apprenantsDuCoach.filter((a) => a.statut === 'Actif' && a.progression >= 50)
  return apprenantsDuCoach
}

export function EspaceCoach() {
  const [filtre, setFiltre] = useState<Filtre>('tous')
  const liste = filtrerApprenants(filtre)

  return (
    <Appli>
      <header className="titre-ecran">
        <h1>{T.espaceCoach.titre}</h1>
        <span style={{ padding: '6px 12px', borderRadius: 16, background: 'var(--nuit)', color: 'var(--turquoise)', fontSize: 12, fontWeight: 800 }}>{T.espaceCoach.role}</span>
      </header>

      <main className="appli__contenu">
        <section className="grille-3 pleine">
          <div className="chiffre" style={{ background: 'var(--accent)', color: 'var(--blanc)' }}>
            <span className="chiffre__valeur">{statsCoach.apprenants}</span>
            <span style={{ fontSize: 12, color: 'var(--texte-sur-accent)' }}>{T.espaceCoach.apprenants}</span>
          </div>
          <div className="chiffre">
            <span className="chiffre__valeur">{statsCoach.meetsSemaine}</span>
            <span className="tres-petit-gris">{T.espaceCoach.meets}</span>
          </div>
          <div className="chiffre">
            <span className="chiffre__valeur">{statsCoach.aRelancer}</span>
            <span className="tres-petit-gris">{T.espaceCoach.aRelancer}</span>
          </div>
        </section>

        <div className="filtres pleine" role="group" aria-label={T.espaceCoach.filtresLibelle}>
          {(Object.keys(T.espaceCoach.filtres) as Filtre[]).map((cle) => (
            <button key={cle} type="button" className="filtre" aria-pressed={filtre === cle} onClick={() => setFiltre(cle)}>
              {T.espaceCoach.filtres[cle]}
            </button>
          ))}
        </div>

        <ul className="pleine liste-apprenants">
          {liste.map((a) => (
            <li key={a.nom} className="carte-ligne carte-ligne--20" style={{ gap: 12, padding: '12px 14px' }}>
              <span className="avatar avatar--44" aria-hidden="true">
                {initiales(a.nom)}
              </span>
              <div className="carte-ligne__texte" style={{ gap: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span className="texte-15-800">{a.nom}</span>
                  <span className={`statut ${a.statut === 'Actif' ? 'statut--actif' : 'statut--relancer'}`}>{a.statut}</span>
                </div>
                <div role="meter" aria-label={T.espaceCoach.progression(a.nom, a.progression)} aria-valuemin={0} aria-valuemax={100} aria-valuenow={a.progression}>
                  <Barre valeur={a.progression} />
                </div>
                <span className="tres-petit-gris">{T.espaceCoach.derniere(a.derniereSeance, a.serie)}</span>
              </div>
              <button type="button" className="bouton-telecharger" style={{ background: 'var(--nuit)', color: 'var(--turquoise)' }} aria-label={T.espaceCoach.planifier(a.nom)}>
                <Icone icone={CalendarDays} />
              </button>
            </li>
          ))}
        </ul>
      </main>

      <BarreBas coach />
    </Appli>
  )
}
