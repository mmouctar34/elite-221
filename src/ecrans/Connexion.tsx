import { useState, type FormEvent } from 'react'
import { ArrowLeft, Info, Mic } from 'lucide-react'
import { Lien, naviguer } from '../navigation'
import { prenomDepuisEmail, seConnecter } from '../session'
import { apprenant } from '../donnees/exemple'
import { ChampTexte } from '../ui/composants'
import { Cercle, Icone } from './commun'
import { T } from './textes'

type Mode = 'connexion' | 'inscription'

// Page de connexion de DÉMONSTRATION : tout est accepté, rien n'est vérifié ni envoyé.
export function Connexion({ mode: modeInitial, suite = '/app' }: { mode: Mode; suite?: string }) {
  const [mode, setMode] = useState<Mode>(modeInitial)
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreurs, setErreurs] = useState<{ prenom?: string; email?: string; motDePasse?: string }>({})
  const t = T.connexion
  const inscription = mode === 'inscription'

  function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nouvelles: typeof erreurs = {}
    if (inscription && prenom.trim().length < 2) nouvelles.prenom = t.erreurPrenom
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nouvelles.email = t.erreurEmail
    if (motDePasse.length === 0) nouvelles.motDePasse = t.erreurMotDePasse
    setErreurs(nouvelles)
    if (Object.keys(nouvelles).length > 0) return
    // Le mot de passe n'est ni enregistré ni envoyé : c'est une démonstration.
    seConnecter({ prenom: inscription ? prenom : prenomDepuisEmail(email) || apprenant.prenom, email })
    naviguer(suite)
  }

  function avecGoogle() {
    seConnecter({ prenom: apprenant.prenom, email: 'demo@splead.app' })
    naviguer(suite)
  }

  function changerMode() {
    setMode(inscription ? 'connexion' : 'inscription')
    setErreurs({})
  }

  return (
    <div className="connexion">
      <aside className="connexion__panneau">
        <Cercle style={{ right: -60, top: -60, width: 220, height: 220, background: 'var(--accent-clair)' }} />
        <Cercle style={{ right: 60, bottom: 40, width: 70, height: 70, background: 'var(--turquoise)' }} />
        <Lien vers="/" className="connexion__marque">
          <span className="marque-ronde__pastille" style={{ background: 'var(--blanc)', color: 'var(--accent)' }} aria-hidden="true">
            S
          </span>
          <span className="connexion__nom">
            SPLEAD
            <span className="connexion__devise">{T.laterale.devise}</span>
          </span>
        </Lien>
        <div className="connexion__accroche">
          <span className="connexion__micro" aria-hidden="true">
            <Icone icone={Mic} taille={28} trait={2.4} />
          </span>
          <p className="connexion__titre-panneau">{t.accroche}</p>
          <p className="connexion__texte-panneau">{t.sousAccroche}</p>
        </div>
      </aside>

      <main className="connexion__contenu">
        <div className="connexion__carte">
          <Lien vers="/" className="connexion__retour">
            <Icone icone={ArrowLeft} taille={18} />
            {T.laterale.retourSite}
          </Lien>
          <h1>{inscription ? t.titreInscription : t.titreConnexion}</h1>
          <p className="petit-gris" style={{ fontSize: 15 }}>
            {inscription ? t.introInscription : t.introConnexion}
          </p>

          <p className="connexion__demo" role="note">
            <Icone icone={Info} taille={18} />
            <span>{t.demo}</span>
          </p>

          <button type="button" className="bouton-action bouton-action--blanc connexion__google" onClick={avecGoogle}>
            <span className="connexion__g" aria-hidden="true">
              G
            </span>
            {t.google}
          </button>

          <div className="connexion__ou" aria-hidden="true">
            <span>{t.ou}</span>
          </div>

          <form className="connexion__formulaire" onSubmit={valider} noValidate>
            {inscription ? (
              <ChampTexte
                libelle={t.prenom}
                autoComplete="given-name"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                {...(erreurs.prenom ? { erreur: erreurs.prenom } : {})}
              />
            ) : null}
            <ChampTexte
              libelle={t.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...(erreurs.email ? { erreur: erreurs.email } : {})}
            />
            <ChampTexte
              libelle={t.motDePasse}
              type="password"
              autoComplete={inscription ? 'new-password' : 'current-password'}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              {...(erreurs.motDePasse ? { erreur: erreurs.motDePasse } : {})}
            />
            <button type="submit" className="bouton-action">
              {inscription ? t.creer : t.seConnecter}
            </button>
          </form>

          <p className="connexion__bascule">
            {inscription ? t.dejaCompte : t.pasDeCompte}{' '}
            <button type="button" className="connexion__lien" onClick={changerMode}>
              {inscription ? t.allerConnexion : t.allerInscription}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
