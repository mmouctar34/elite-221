import { useState } from 'react'
import { ChartLine, Download, House, Mic, RefreshCw, User, X } from 'lucide-react'
import { couleurs, type NomCouleur } from '../ui/tokens'
import { rapportContraste } from '../ui/contraste'
import {
  BarreNavigation,
  Bouton,
  BoutonIcone,
  BoutonMicro,
  Carte,
  Chargement,
  ChampTexte,
  EtatErreur,
  Pastille,
} from '../ui/composants'

// Page interne (adresse /design), réservée à l'équipe : elle montre tout le système
// de design au même endroit. Ses textes ne sont pas destinés aux apprenants,
// c'est pourquoi ils ne passent pas par les fichiers de traduction.

const nomsCouleurs: Record<NomCouleur, string> = {
  nuit: 'Nuit',
  indigo: 'Indigo',
  turquoise: 'Turquoise',
  brume: 'Brume',
  fond: 'Fond',
  blanc: 'Blanc',
  texteSecondaire: 'Texte secondaire',
}

export function PageDesign() {
  const [enregistrement, setEnregistrement] = useState(false)
  const [onglet, setOnglet] = useState<'accueil' | 'entrainer' | 'progres' | 'profil'>('accueil')
  const [prenom, setPrenom] = useState('')
  const erreurPrenom = prenom.length === 1 ? 'Écris au moins 2 lettres.' : undefined

  return (
    <>
      <main className="ecran">
        <header className="entete">
          <span className="marque">SPLEAD</span>
          <Pastille>Système de design</Pastille>
        </header>

        <Carte titre="Couleurs">
          <div className="nuancier">
            {(Object.keys(couleurs) as NomCouleur[]).map((nom) => {
              const fond = couleurs[nom]
              const texte = rapportContraste(fond, couleurs.nuit) >= 4.5 ? couleurs.nuit : couleurs.blanc
              return (
                <div key={nom} className="nuancier__case" style={{ background: fond, color: texte }}>
                  <span>{nomsCouleurs[nom]}</span>
                  <span>{fond}</span>
                </div>
              )
            })}
          </div>
        </Carte>

        <Carte titre="Typographie">
          <h1>Titre 1, 28 px, 800</h1>
          <h2>Titre 2, 22 px, 700</h2>
          <h3>Titre 3, 18 px, 700</h3>
          <p>Texte courant, 16 px, 500. Plus Jakarta Sans.</p>
          <p className="texte-secondaire">Texte secondaire, 15 px : le minimum autorisé.</p>
        </Carte>

        <Carte titre="Boutons">
          <div className="grille-demo">
            <Bouton>Commencer</Bouton>
            <Bouton variante="secondaire">Plus tard</Bouton>
            <Bouton variante="marque" icone={Download}>
              Installer
            </Bouton>
            <Bouton disabled>Indisponible</Bouton>
            <BoutonIcone icone={X} libelle="Fermer" />
            <BoutonIcone icone={RefreshCw} libelle="Réessayer" />
          </div>
          <Bouton pleineLargeur>Bouton pleine largeur</Bouton>
        </Carte>

        <Carte titre="Pastilles">
          <div className="grille-demo">
            <Pastille>Module 1</Pastille>
            <Pastille icone={Mic}>60 secondes</Pastille>
          </div>
        </Carte>

        <Carte titre="Champ de saisie">
          <ChampTexte
            libelle="Ton prénom"
            aide="Il sera affiché sur ton accueil."
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            {...(erreurPrenom ? { erreur: erreurPrenom } : {})}
          />
        </Carte>

        <Carte titre="Gros bouton micro">
          <div className="grille-demo" style={{ justifyContent: 'center', padding: '24px 0' }}>
            <BoutonMicro
              enregistrement={enregistrement}
              libelleDemarrer="Commencer à parler"
              libelleArreter="Arrêter l'enregistrement"
              onClick={() => setEnregistrement((v) => !v)}
            />
          </div>
          <p className="texte-secondaire" style={{ textAlign: 'center' }}>
            {enregistrement ? 'Enregistrement en cours (démonstration)' : 'Touche le micro pour essayer'}
          </p>
        </Carte>

        <Carte titre="Chargement">
          <Chargement texte="Analyse de ta séance…" />
        </Carte>

        <EtatErreur
          titre="La connexion a coupé"
          message="Ta séance est gardée sur ton téléphone. Elle partira dès que le réseau revient."
          libelleReessayer="Réessayer maintenant"
          onReessayer={() => {}}
        />
      </main>

      <BarreNavigation
        onglets={[
          { cle: 'accueil', libelle: 'Accueil', icone: House },
          { cle: 'entrainer', libelle: "S'entraîner", icone: Mic },
          { cle: 'progres', libelle: 'Progrès', icone: ChartLine },
          { cle: 'profil', libelle: 'Profil', icone: User },
        ]}
        actif={onglet}
        onChoisir={setOnglet}
        libelle="Navigation de démonstration"
      />
    </>
  )
}
