// Textes de la page d'accueil publique (vitrine), en français.
export const V = {
  devise: 'L’art de bien parler',
  nav: [
    { ancre: 'fonctionnement', libelle: 'Comment ça marche' },
    { ancre: 'programme', libelle: 'Le programme' },
    { ancre: 'tarifs', libelle: 'Tarifs' },
    { ancre: 'a-propos', libelle: 'À propos' },
    { ancre: 'faq', libelle: 'Questions' },
  ],
  navLibelle: 'Navigation du site',
  menu: 'Menu',
  fermerMenu: 'Fermer le menu',
  seConnecter: 'Se connecter',
  commencer: 'Commencer gratuitement',
  installer: 'Installer l’application',
  heros: {
    badge: 'Dakar, Sénégal · Une séance par jour',
    titre: 'L’art de bien parler, une séance par jour.',
    texte:
      'SPLEAD t’entraîne à parler en public. Tu parles 60 secondes dans ton micro, tu reçois tout de suite une analyse claire, et un vrai coach suit tes progrès.',
    decouvrir: 'Découvrir le programme',
    chiffres: [
      { valeur: '3', libelle: 'modules' },
      { valeur: '12', libelle: 'leçons' },
      { valeur: '60 s', libelle: 'par séance' },
      { valeur: '1', libelle: 'vrai coach' },
    ],
  },
  apercu: { seance: 'Séance du jour', titre: 'Convaincre en 60 secondes', bouton: 'Commencer' },
  fonctionnement: {
    titre: 'Comment ça marche',
    sousTitre: 'Quatre étapes, chaque jour, en quelques minutes.',
    etapes: [
      { titre: 'Apprends', texte: 'Une leçon courte, un principe clé à retenir.' },
      { titre: 'Parle 60 secondes', texte: 'Un sujet concret, un chrono, et ton micro.' },
      { titre: 'Reçois ton analyse', texte: 'Structure, voix, impact, tics de langage : les points forts d’abord.' },
      { titre: 'Ton coach te suit', texte: 'Des retours, des objectifs et des rendez-vous en visio.' },
    ],
  },
  programme: {
    titre: 'Le programme',
    sousTitre: 'Trois modules qui se débloquent dans l’ordre. Chaque leçon se termine par un cas pratique à voix haute.',
    lecons: (n: number) => `${n} leçons`,
    gratuit: 'Gratuit',
    abonnement: 'Abonnement',
  },
  publics: {
    titre: 'Pour qui ?',
    liste: [
      { titre: 'Étudiants', texte: 'Exposés, soutenances, concours d’éloquence, premiers entretiens.' },
      { titre: 'Jeunes professionnels', texte: 'Réunions, présentations, entretiens annuels.' },
      { titre: 'Entrepreneurs', texte: 'Pitchs, rendez-vous clients, demandes de financement.' },
    ],
  },
  coach: {
    titre: 'Un vrai coach, pas seulement une machine',
    texte:
      'L’analyse automatique te répond tout de suite. Ton coach, lui, suit ta progression, te fixe des objectifs et te retrouve en visioconférence.',
    points: ['Rendez-vous sur Google Meet', 'Retours et objectifs écrits', 'Suivi de ta série et de tes progrès'],
  },
  tarifs: {
    titre: 'Commence gratuitement',
    sousTitre: 'Tu découvres SPLEAD sans payer, puis tu passes à l’abonnement quand tu es prêt.',
    offres: [
      {
        nom: 'Gratuit',
        prix: '0 FCFA',
        mention: 'Pour découvrir',
        avantages: ['Le module 1 complet', '3 séances analysées par semaine', 'L’Arène en spectateur'],
        bouton: 'Commencer gratuitement',
        miseEnAvant: false,
      },
      {
        nom: 'Abonnement',
        prix: 'Tarif annoncé au lancement',
        mention: 'Pour progresser vraiment',
        avantages: [
          'Les 3 modules',
          'Une séance analysée par jour',
          'L’Arène 60 secondes et le classement',
          'Mon coach : rendez-vous et retours',
          'Le certificat de fin de parcours',
        ],
        bouton: 'Être prévenu du lancement',
        miseEnAvant: true,
      },
    ],
    paiement: 'Paiement par Wave ou Orange Money.',
  },
  aPropos: {
    titre: 'À propos de SPLEAD',
    paragraphes: [
      'Beaucoup de talents perdent des occasions parce qu’ils ont du mal à parler devant les autres. Les formations en salle coûtent cher et ont lieu une fois ; les vidéos n’apprennent pas à pratiquer.',
      'SPLEAD est né à Dakar pour combler ce manque : une pratique quotidienne guidée, en français, pensée pour les téléphones et les connexions du Sénégal, avec un retour immédiat et un vrai coach.',
    ],
    valeurs: [
      { titre: 'Bienveillance', texte: 'Tes points forts d’abord, puis une seule priorité à travailler.' },
      { titre: 'Pratique', texte: 'On apprend à parler en parlant, un peu chaque jour.' },
      { titre: 'Accessible', texte: 'Léger, utilisable sans réseau pour les leçons, sur un petit téléphone.' },
    ],
  },
  installation: {
    titre: 'Installe SPLEAD sur ton téléphone',
    texte: 'SPLEAD est une application web : pas besoin de store. Tu l’ajoutes à ton écran d’accueil en quelques secondes, et elle s’ouvre comme une application.',
    android: { titre: 'Sur Android (Chrome)', etapes: ['Ouvre SPLEAD dans Chrome.', 'Touche « Installer l’application » (ou le menu, puis « Installer »).', 'L’icône SPLEAD apparaît sur ton écran d’accueil.'] },
    iphone: { titre: 'Sur iPhone (Safari)', etapes: ['Ouvre SPLEAD dans Safari.', 'Touche le bouton Partager.', 'Choisis « Sur l’écran d’accueil ».'] },
  },
  faq: {
    titre: 'Questions fréquentes',
    questions: [
      { q: 'Faut-il télécharger SPLEAD sur un store ?', r: 'Non. SPLEAD s’ouvre dans ton navigateur et s’installe sur ton écran d’accueil, sans passer par Google Play ni l’App Store.' },
      { q: 'Est-ce que ça marche sans internet ?', r: 'Les leçons que tu as téléchargées se lisent sans réseau. Tes séances enregistrées partent automatiquement dès que la connexion revient.' },
      { q: 'Que devient ma voix ?', r: 'Elle sert uniquement à analyser ta séance. Elle est stockée de façon privée et supprimée automatiquement au bout de 90 jours. Tu peux tout supprimer à tout moment.' },
      { q: 'Combien ça coûte ?', r: 'Tu commences gratuitement. L’abonnement, payable par Wave ou Orange Money, sera annoncé au lancement.' },
    ],
  },
  appel: { titre: 'Ta prochaine prise de parole commence aujourd’hui.', bouton: 'Commencer gratuitement' },
  pied: { droits: '© 2026 SPLEAD', confidentialite: 'Confidentialité (bientôt)', conditions: 'Conditions d’utilisation (bientôt)', contact: 'Contact : [À COMPLÉTER]' },
} as const
