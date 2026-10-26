// Données d'exemple, en attendant les comptes et la base de données (sprint suivant).
// Les textes des leçons du module 1 reprennent le prototype elite-221, réécrits au tutoiement
// (voir contenu/fr/module-1-prise-de-parole.md). Les modules 2 et 3 reprennent les titres du prototype.

export type Lecon = {
  numero: number
  titre: string
  etiquette: string
  duree: string
  paragraphes: string[]
  points: string[]
  principe: string
  casPratique: string
}

export type Module = {
  id: number
  titre: string
  themes: string[]
  // Accès gratuit (freemium) ou réservé à l'abonnement : décision du 26/10/2026.
  acces: 'gratuit' | 'abonnement'
  lecons: Lecon[]
}

export const apprenant = {
  prenom: 'Aminata',
  serieJours: 3,
  // Lundi à dimanche : séance faite, aujourd'hui, ou à venir.
  semaine: ['faite', 'faite', 'faite', 'aujourdhui', 'a-venir', 'a-venir', 'a-venir'] as const,
  leconEnCours: { module: 1, lecon: 2 },
  leconsTerminees: 1,
  seances: 9,
  minutes: 11,
  ticsEnMoins: 14,
  abonnement: false,
}

export const modules: Module[] = [
  {
    id: 1,
    titre: 'Prise de Parole en Public',
    themes: ['Communication', 'Voix et corps', 'Storytelling', 'Gestion du stress'],
    acces: 'gratuit',
    lecons: [
      {
        numero: 1,
        titre: 'Techniques de Communication Efficace',
        etiquette: 'Fondamentaux',
        duree: '2 min',
        paragraphes: [
          "Quand tu parles, ton public reçoit trois messages en même temps : tes mots, ta voix et ton corps. Si les trois disent la même chose, on te croit. Si ta voix tremble pendant que tu dis « je suis sûr de moi », c'est la voix qu'on retient.",
          "Tu as peut-être entendu que « 7 % seulement passe par les mots ». C'est une mauvaise lecture d'une étude qui portait sur l'expression des émotions, pas sur un discours. Tes mots comptent énormément, mais ils ne suffisent pas.",
        ],
        points: [
          'Clarté : une seule idée principale par prise de parole.',
          "Concision : dis en 2 minutes ce que d'autres disent en 10.",
          'Cohérence : ton message, ton ton et tes gestes vont dans le même sens.',
          'Conviction : parle de ce en quoi tu crois. Ça s’entend.',
        ],
        principe: 'Avant de parler, demande-toi quelle est la seule chose que tu veux qu’on retienne.',
        casPratique:
          "Présente-toi comme au début d'un entretien. Choisis une seule idée que tu veux qu'on retienne de toi, annonce-la dès la première phrase et termine en la répétant.",
      },
      {
        numero: 2,
        titre: 'Gestion du Stress et du Trac',
        etiquette: 'Maîtrise émotionnelle',
        duree: '2 min',
        paragraphes: [
          "Le trac n'est pas ton ennemi : c'est de l'énergie. Les grands orateurs ne cherchent pas à l'éliminer, ils apprennent à la convertir en puissance.",
          "Au lieu de te dire « j'ai peur », dis-toi « je suis prêt, j'ai de l'énergie ». Changer ainsi l'interprétation aide à mieux performer.",
        ],
        points: [
          "Respiration lente : inspire 4 secondes par le nez, puis expire plus longtemps par la bouche. Trois fois.",
          'Posture ouverte : droit, épaules relâchées, pieds bien posés.',
          'Souvenir de réussite : 10 secondes pour repenser à un moment où tu as réussi.',
          'Petit rituel : toujours le même avant de parler.',
          "Visages bienveillants : adresse-toi à deux ou trois personnes attentives, à tour de rôle.",
        ],
        principe: "Quand l'adrénaline monte, ton cerveau s'aiguise et ta voix devient plus présente.",
        casPratique:
          'Tu dois présenter ton projet devant 30 personnes dans 5 minutes. Fais trois respirations lentes, puis explique à voix haute comment tu gères ton trac.',
      },
      {
        numero: 3,
        titre: "Structuration d'un Discours d'Impact",
        etiquette: 'Storytelling',
        duree: '3 min',
        paragraphes: [
          "Un discours sans structure, c'est une maison sans fondations. La méthode PEEL t'aide à construire une prise de parole solide, même courte.",
          'Les 10 premières secondes décident si on t’écoute : commence par une question, une histoire vraie, un chiffre vérifié, une citation courte ou un paradoxe.',
        ],
        points: [
          'P comme Point : annonce ton idée principale dès le début.',
          'E comme Évidence : une preuve, un fait, un chiffre vérifié.',
          'E comme Exemple : une histoire concrète.',
          'L comme Lien : reviens à ton idée et dis ce que tu attends.',
        ],
        principe: 'Une idée, une preuve, un exemple, un lien. Dans cet ordre.',
        casPratique:
          'Explique pourquoi tu veux progresser à l’oral. Commence par une question ou une histoire, puis suis les quatre étapes PEEL.',
      },
      {
        numero: 4,
        titre: 'Présence Scénique et Travail de la Voix',
        etiquette: 'Performance',
        duree: '2 min',
        paragraphes: [
          "La présence, ça se travaille, ça n'est pas un don. Et la voix en est le premier outil.",
          'Devant un public, ton corps parle aussi : regarde les gens quelques secondes chacun, garde les pieds ancrés et fais des gestes ouverts.',
        ],
        points: [
          'Volume : baisser la voix sur une phrase importante attire l’attention.',
          'Rythme : ralentis sur l’essentiel, accélère dans les récits.',
          'Intonation : la voix descend à la fin d’une affirmation.',
          'Articulation : termine tes mots, surtout les fins de phrase.',
          'Pause : après une idée forte, tais-toi un instant.',
        ],
        principe: 'Une pause bien placée vaut mieux qu’un « euh ».',
        casPratique:
          'Parle de quelque chose qui te passionne. Fais au moins trois pauses volontaires après tes idées les plus fortes.',
      },
    ],
  },
  {
    id: 2,
    titre: 'Leadership Moderne',
    themes: ['Leadership agile', 'Prise de décision', 'Influence', 'Relations'],
    acces: 'abonnement',
    lecons: [
      { numero: 1, titre: 'Fondamentaux du Leadership Agile', etiquette: 'Théorie', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 2, titre: 'Leadership Personnel et Rayonnement', etiquette: 'Identité', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 3, titre: 'Maîtrise de la Prise de Décision', etiquette: 'Stratégie', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 4, titre: 'Gestion des Relations Interpersonnelles', etiquette: 'Intelligence relationnelle', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
    ],
  },
  {
    id: 3,
    titre: 'Développement Personnel',
    themes: ['Intelligence émotionnelle', 'Confiance en soi', 'Discipline', 'Objectifs'],
    acces: 'abonnement',
    lecons: [
      { numero: 1, titre: 'Intelligence Émotionnelle', etiquette: 'Conscience de soi', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 2, titre: 'Confiance en Soi et Estime Personnelle', etiquette: 'Fondations', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 3, titre: 'Discipline et Construction des Habitudes', etiquette: 'Performance durable', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
      { numero: 4, titre: "Fixation d'Objectifs et Plan d'Action", etiquette: 'Exécution', duree: '', paragraphes: [], points: [], principe: '', casPratique: '' },
    ],
  },
]

export const analyseExemple = {
  resume:
    'Ton idée principale est claire et ton exemple est concret. Ta conclusion arrive un peu vite : prends le temps de la poser.',
  axes: [
    { nom: 'Structure', niveau: 'Solide', valeur: 70 },
    { nom: 'Voix', niveau: 'À travailler', valeur: 55 },
    { nom: 'Impact', niveau: 'Très bien', valeur: 80 },
  ],
  tics: [
    { mot: 'euh', nombre: 4 },
    { mot: 'donc', nombre: 2 },
    { mot: 'du coup', nombre: 1 },
  ],
  pointFort: 'Ton accroche par une question a capté l’attention dès les premières secondes.',
  priorite: 'Remplace les « euh » par une courte pause silencieuse.',
}

// Évolution du nombre de tics sur les dernières séances (de la plus ancienne à la plus récente).
export const evolutionTics = [12, 10, 10.5, 6.5, 5.5, 3]

export const badges = [
  { nom: 'Première séance', obtenu: true, icone: 'micro' },
  { nom: '3 jours de suite', obtenu: true, icone: 'flamme' },
  { nom: '7 jours de suite', obtenu: false, icone: 'cadenas' },
] as const

export const coach = {
  nom: 'Coach SPLEAD',
  initiale: 'C',
  specialite: 'Coach en prise de parole et leadership',
  prochainMeet: 'Jeudi 30/10 · 18:00',
  dureeMeet: 30,
  lienMeet: 'https://meet.google.com/',
  pointFort: 'Tu poses ta voix beaucoup mieux qu’il y a deux semaines.',
  objectif: 'Trois séances cette semaine, avec une pause volontaire après chaque idée forte.',
  dernierMeet: '23/10',
}

export const arene = {
  numero: 12,
  finDans: '2 j',
  sujet: 'Défends une idée qui peut changer ton quartier, en 60 secondes.',
  ligue: 'Baobab',
  participants: 248,
  classement: [
    { rang: 1, nom: 'Mariama D.', points: 940 },
    { rang: 2, nom: 'Cheikh N.', points: 905 },
    { rang: 3, nom: 'Awa S.', points: 870 },
    { rang: 4, nom: 'Ibrahima F.', points: 812 },
    { rang: 5, nom: 'Fatou K.', points: 790 },
  ],
  monRang: 14,
  mesPoints: 610,
}

export type StatutApprenant = 'Actif' | 'À relancer'

export const apprenantsDuCoach: ReadonlyArray<{
  nom: string
  statut: StatutApprenant
  progression: number
  derniereSeance: string
  serie: number
}> = [
  { nom: 'Aminata B.', statut: 'Actif', progression: 70, derniereSeance: 'il y a 1 j', serie: 3 },
  { nom: 'Ousmane T.', statut: 'À relancer', progression: 35, derniereSeance: 'il y a 9 j', serie: 0 },
  { nom: 'Khady M.', statut: 'Actif', progression: 55, derniereSeance: 'aujourd’hui', serie: 5 },
  { nom: 'Pape S.', statut: 'Actif', progression: 85, derniereSeance: 'il y a 2 j', serie: 2 },
]

export const statsCoach = { apprenants: 24, meetsSemaine: 6, aRelancer: 5 }

export function initiales(nom: string): string {
  return nom
    .replace(/[.]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase() ?? '')
    .join('')
}
