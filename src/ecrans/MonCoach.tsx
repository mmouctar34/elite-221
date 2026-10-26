import { ArrowRight, CalendarDays, Check, ChevronRight, MessageSquare, Video } from 'lucide-react'
import { Lien } from '../navigation'
import { coach } from '../donnees/exemple'
import { Appli, BarreBas, Cercle, Icone } from './commun'
import { T } from './textes'

export function MonCoach() {
  return (
    <Appli>
      <header className="titre-ecran">
        <h1>{T.coach.titre}</h1>
      </header>

      <main className="appli__contenu">
        <section className="carte-ligne">
          <span className="avatar" style={{ width: 56, height: 56, fontSize: 20, background: 'var(--accent)', color: 'var(--blanc)' }} aria-hidden="true">
            {coach.initiale}
          </span>
          <div className="carte-ligne__texte">
            <span style={{ fontSize: 18, fontWeight: 800 }}>{coach.nom}</span>
            <span style={{ fontSize: 14, color: 'var(--texte-secondaire)' }}>{coach.specialite}</span>
          </div>
        </section>

        <section className="carte-heros carte-heros--26 carte-heros--nuit" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Cercle style={{ right: -34, top: -34, width: 130, height: 130, background: 'var(--nuit-2)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--turquoise-clair)' }}>
            <Icone icone={CalendarDays} taille={18} trait={2.4} />
            <span className="surtitre">{T.coach.prochainMeet}</span>
          </div>
          <span style={{ position: 'relative', fontSize: 22, fontWeight: 800 }}>{coach.prochainMeet}</span>
          <span style={{ position: 'relative', fontSize: 14, color: 'var(--texte-sur-nuit)' }}>{T.coach.duree(coach.dureeMeet)}</span>
          <div style={{ position: 'relative', display: 'flex', gap: 10, marginTop: 6 }}>
            <a href={coach.lienMeet} target="_blank" rel="noopener noreferrer" className="bouton-action" style={{ flex: 2, height: 50, borderRadius: 25, fontSize: 15, gap: 8 }}>
              <Icone icone={Video} trait={2.4} />
              {T.coach.rejoindre}
            </a>
            <button type="button" className="bouton-action bouton-action--nuit" style={{ flex: 1, height: 50, borderRadius: 25, fontSize: 14 }}>
              {T.coach.agenda}
            </button>
          </div>
        </section>

        <section className="carte-s carte-s--16">
          <h2 className="texte-15-800" style={{ margin: 0 }}>
            {T.coach.retours}
          </h2>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className="puce-ronde" style={{ background: 'var(--accent)', color: 'var(--blanc)' }} aria-hidden="true">
              <Icone icone={Check} taille={14} trait={3.4} />
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.4 }}>
              <strong>{T.coach.pointFort}</strong> {coach.pointFort}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className="puce-ronde" style={{ background: 'var(--brume)', color: 'var(--accent)' }} aria-hidden="true">
              <Icone icone={ArrowRight} taille={14} trait={3} />
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.4 }}>
              <strong>{T.coach.objectif}</strong> {coach.objectif}
            </p>
          </div>
        </section>

        <section className="carte-s" style={{ padding: '4px 16px', gap: 0 }}>
          <button type="button" className="classement__ligne" style={{ background: 'none', border: 0, borderBottom: '1px solid var(--lavande-trait)', padding: '12px 0', font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer', minHeight: 44 }}>
            <span className="icone-carree icone-carree--40">
              <Icone icone={Video} />
            </span>
            <span className="carte-ligne__texte" style={{ gap: 0 }}>
              <span className="texte-15-700">{T.coach.meetDu(coach.dernierMeet)}</span>
              <span className="petit-gris">{T.coach.compteRendu}</span>
            </span>
            <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
              <Icone icone={ChevronRight} taille={18} trait={2.4} />
            </span>
          </button>
          <button type="button" className="classement__ligne" style={{ background: 'none', border: 0, padding: '12px 0', font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer', minHeight: 44 }}>
            <span className="icone-carree icone-carree--40">
              <Icone icone={MessageSquare} />
            </span>
            <span className="carte-ligne__texte" style={{ gap: 0 }}>
              <span className="texte-15-700">{T.coach.ecrire}</span>
              <span className="petit-gris">{T.coach.ecrireTexte}</span>
            </span>
            <span style={{ color: 'var(--texte-secondaire)', display: 'flex' }}>
              <Icone icone={ChevronRight} taille={18} trait={2.4} />
            </span>
          </button>
        </section>

        <Lien vers="/coach" className="petit-gris" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 44, padding: 12, color: 'var(--accent)', fontWeight: 700 }}>
          {T.coach.espaceCoach}
        </Lien>
      </main>

      <BarreBas />
    </Appli>
  )
}
