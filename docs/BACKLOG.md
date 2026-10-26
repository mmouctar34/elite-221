# SPLEAD : backlog produit

Version 1 (26 octobre 2026). Tenu par l'agent `scrum-master`, priorisé par le fondateur (Product Owner).

**Lire une user story :** identifiant, titre, priorité (Indispensable, Important, Souhaitable, Plus tard), points (effort relatif : 1 très petit, 13 très gros), état. Les critères d'acceptation suivent le format « Étant donné… Quand… Alors… ».

**État :** `Prête`, `À préciser` (il manque une décision ou une maquette), `En cours`, `Terminée`.

Les user stories qui ont un écran restent `À préciser` tant que les captures de `design/` ne sont pas fournies. Le système de design peut toutefois démarrer à partir des couleurs et de la police déjà fixées.

---

## E-01 Socle PWA et livraison

**US-001 Installer SPLEAD sur Android.** Indispensable, 3 points, Prête.
En tant qu'apprenant sur Android, je veux installer SPLEAD sur mon écran d'accueil, afin de l'ouvrir comme une application.
- Étant donné Chrome pour Android, quand je visite SPLEAD pour la deuxième fois, alors un bouton « Installer SPLEAD » m'est proposé (pas de fenêtre imposée dès la première seconde).
- Étant donné SPLEAD installée, quand je l'ouvre, alors elle s'affiche en plein écran, avec l'icône et le nom SPLEAD, sans barre d'adresse.

**US-002 Installer SPLEAD sur iPhone.** Important, 2 points, Prête.
En tant qu'apprenant sur iPhone, je veux être guidé pour ajouter SPLEAD à mon écran d'accueil, afin de l'utiliser sans App Store.
- Étant donné Safari sur iPhone, quand SPLEAD n'est pas installée, alors un encart explique en deux étapes, avec des images, comment faire « Partager > Sur l'écran d'accueil ».

**US-003 Ouvrir SPLEAD sans réseau.** Indispensable, 3 points, Prête.
En tant qu'apprenant, je veux ouvrir l'application même sans connexion, afin de m'entraîner partout.
- Étant donné une première visite réussie, quand je rouvre SPLEAD en mode avion, alors l'accueil s'affiche avec un bandeau « Hors-ligne » et aucune page d'erreur du navigateur.

**US-004 Mettre à jour sans rien perdre.** Important, 2 points, Prête.
En tant qu'apprenant, je veux être prévenu qu'une nouvelle version existe, afin d'en profiter sans perdre une séance en cours.
- Étant donné une nouvelle version en ligne, quand j'ouvre SPLEAD, alors un message « Nouvelle version disponible » propose de recharger. Le rechargement n'a jamais lieu pendant un enregistrement.

**US-005 Vérification automatique de chaque modification.** Indispensable, 3 points, Prête.
En tant que fondateur, je veux que chaque modification soit vérifiée automatiquement, afin de ne jamais mettre en ligne une version cassée.
- Étant donné un envoi sur GitHub, quand l'intégration continue tourne, alors l'analyse du code, les tests et la construction passent, sinon la fusion est bloquée.
- La taille du code chargé à la première ouverture est affichée et dépasse 200 Ko compressés seulement avec un avertissement.

**US-006 Préversion et mise en ligne contrôlée.** Indispensable, 3 points, À préciser (compte Cloudflare et domaine).
En tant que fondateur, je veux une adresse de test pour chaque branche et une mise en ligne seulement sur mon accord, afin de tout essayer avant les apprenants.
- Étant donné une branche envoyée, alors une adresse de préversion est créée automatiquement.
- La production n'est mise à jour que par le script de mise en ligne, après mon accord écrit.

## E-02 Système de design et navigation

**US-007 Système de design « Souffle ».** Indispensable, 5 points, Prête (couleurs et police connues).
En tant que fondateur, je veux des couleurs, une police et des composants réutilisables, afin que tous les écrans soient cohérents.
- Une page interne montre : couleurs, typographie (Plus Jakarta Sans 500 à 800, texte de 15 px minimum), boutons, carte, pastille, champ, gros bouton micro, barre du bas, chargement, erreur.
- Un test vérifie que chaque bouton mesure au moins 44 × 44 px et que les contrastes respectent le niveau AA.
- Aucun orange, aucun rouge, aucun emoji.

**US-042 Test automatique des zones tactiles et du débordement.** Important, 3 points, Prête. Ajoutée le 26/10/2026, après la recette de US-007.
En tant que fondateur, je veux qu'un test vérifie automatiquement, dans un vrai navigateur, la taille des boutons et l'absence de débordement, afin qu'aucune régression d'accessibilité ne passe inaperçue.
- Étant donné l'intégration continue, quand elle tourne, alors un test Playwright ouvre l'accueil et `/design` à 360 px, puis à 180 px (affichage agrandi à 200 %), et échoue si un élément cliquable mesure moins de 44 × 44 px à 360 px ou si un élément dépasse de l'écran.

**US-008 Navigation du bas.** Indispensable, 2 points, À préciser (captures).
En tant qu'apprenant, je veux passer d'Accueil à S'entraîner, Progrès et Profil en un geste, afin de trouver vite ce que je cherche.
- Les 4 onglets sont visibles, l'onglet actif est indiqué autrement que par la couleur seule, et le bouton retour d'Android ramène à l'écran précédent.

## E-03 Comptes, connexion et consentement

**US-009 S'inscrire avec Google.** Indispensable, 3 points, Prête.
En tant que visiteur, je veux créer mon compte avec mon compte Google, afin de m'inscrire en un geste.
- Étant donné un compte Google, quand j'appuie sur « Continuer avec Google », alors mon compte SPLEAD est créé et je passe à l'étape du prénom.

**US-010 S'inscrire avec un code par e-mail.** Indispensable, 3 points, Prête.
En tant que visiteur sans compte Google, je veux recevoir un code par e-mail, afin de m'inscrire sans mot de passe.
- Étant donné mon adresse e-mail, quand je demande un code, alors je le reçois en moins de 2 minutes, et il expire au bout de 10 minutes.
- Après 5 codes demandés en une heure, une nouvelle demande est refusée avec un message clair.

**US-011 Prénom et objectif.** Indispensable, 2 points, À préciser (captures).
En tant que nouvel apprenant, je veux indiquer mon prénom et mon objectif (entretien, pitch, présentation, réunion), afin que SPLEAD s'adresse à moi.
- Le prénom est obligatoire (2 à 40 caractères) ; l'objectif est choisi dans une liste ; l'accueil me salue par mon prénom.

**US-012 Consentement à l'enregistrement de la voix.** Indispensable, 3 points, Prête (texte : `contenu/fr/consentement-v1.md`).
En tant qu'apprenant, je veux comprendre et accepter l'enregistrement de ma voix, afin de décider en connaissance de cause.
- La case est décochée par défaut ; « J'accepte et je continue » reste inactif tant qu'elle n'est pas cochée.
- L'accord est enregistré avec la version du texte et la date.
- « Plus tard » donne accès aux leçons, mais le micro reste désactivé, avec un lien pour donner son accord.

**US-013 Se déconnecter et se reconnecter.** Indispensable, 1 point, Prête.
En tant qu'apprenant, je veux me déconnecter et me reconnecter, afin de prêter mon téléphone sans risque.
- Après la déconnexion, aucune donnée personnelle ne reste visible ni lisible sur le téléphone.

**US-014 Supprimer mon compte.** Indispensable, 5 points, Prête.
En tant qu'apprenant, je veux supprimer mon compte et toutes mes données, afin d'exercer mon droit à l'effacement.
- Une confirmation est demandée (saisir « SUPPRIMER »).
- Un test vérifie qu'après la suppression, il ne reste rien de l'apprenant dans aucune table ni dans le stockage des audios.

**US-015 Personne ne voit les données des autres.** Indispensable, 5 points, Prête.
En tant qu'apprenant, je veux être sûr que personne d'autre ne voit mes séances, afin d'oser m'entraîner.
- Des tests automatiques prouvent qu'un apprenant A ne peut ni lire ni modifier les données d'un apprenant B, ni changer son propre rôle, ni écrire un score ou un quota.
- Un coach ne voit que les apprenants qui lui sont attribués.

## E-04 Contenu pédagogique

**US-016 Voir les modules et ma progression.** Indispensable, 3 points, À préciser (captures).
En tant qu'apprenant, je veux voir les 3 modules et où j'en suis, afin de savoir quoi faire ensuite.
- Chaque module affiche le nombre de leçons faites sur 4 ; un module verrouillé indique ce qu'il faut faire pour l'ouvrir.

**US-017 Lire une leçon.** Indispensable, 3 points, À préciser (captures).
En tant qu'apprenant, je veux lire une leçon courte avec son principe clé et son cas pratique, afin d'apprendre puis de pratiquer.
- Le texte vient de la base (aucun texte de leçon dans le code) ; il est lisible avec le texte agrandi à 200 %.
- « Faire le cas pratique » ouvre une séance avec la consigne de la leçon.

**US-018 Débloquer les modules dans l'ordre.** Indispensable, 3 points, Prête.
En tant qu'apprenant, je veux que le module suivant s'ouvre quand j'ai réussi le cas final, afin de progresser étape par étape.
- Le déblocage est décidé par le serveur, jamais par le téléphone.

**US-019 Télécharger un module pour le hors-ligne.** Indispensable, 5 points, Prête.
En tant qu'apprenant avec un petit forfait, je veux télécharger un module en Wi-Fi, afin de le lire sans connexion.
- La taille est annoncée avant le téléchargement ; après, le module se lit en mode avion.

**US-020 Mode Éco-data.** Important, 3 points, Prête.
En tant qu'apprenant avec un petit forfait, je veux un bouton Éco-data, afin de contrôler ce qui se télécharge.
- En Éco-data : aucun téléchargement automatique, et les envois d'audio attendent le Wi-Fi, sauf si j'appuie sur « Envoyer maintenant ».

## E-05 Séance

**US-021 Enregistrer une séance de 60 secondes.** Indispensable, 8 points, À préciser (captures).
En tant qu'apprenant, je veux parler 60 secondes sur un sujet avec un chrono et une onde sonore, afin de m'entraîner dans des conditions réelles.
- Le micro n'est demandé qu'au premier appui sur le bouton, avec une explication avant la demande du navigateur.
- Pause, reprise et fin fonctionnent ; l'enregistrement s'arrête seul à 60 secondes.
- Le fichier pèse environ 250 Ko au maximum (audio compressé).
- Testé sur Chrome Android et sur Safari iPhone, en application installée **et** dans le navigateur (risque connu sur iPhone, voir l'ADR-001).

**US-022 Enregistrer sans réseau, envoyer plus tard.** Indispensable, 8 points, Prête.
En tant qu'apprenant avec une connexion instable, je veux que ma séance parte toute seule quand le réseau revient, afin de ne jamais perdre un enregistrement.
- Étant donné le mode avion, quand je termine une séance, alors elle est gardée sur le téléphone avec l'état « En attente d'envoi ».
- Quand le réseau revient (application ouverte), l'envoi part sans action de ma part ; si la connexion coupe, il reprend là où il s'était arrêté.

**US-023 Voir mon quota du jour.** Indispensable, 2 points, Prête.
En tant qu'apprenant, je veux savoir combien de séances il me reste aujourd'hui, afin de m'organiser.
- Le quota est réglé par l'administrateur dans la base, et une séance échouée ne compte pas.

## E-06 Analyse

**US-024 Recevoir mon analyse.** Indispensable, 8 points, À préciser (outil de transcription, captures).
En tant qu'apprenant, je veux une analyse claire juste après ma séance, afin de savoir ce que je fais bien et quoi travailler.
- L'analyse affiche, dans cet ordre : point fort, résumé, Structure, Voix, Impact, tics comptés, une seule priorité.
- Les chiffres (débit, pauses, tics) viennent du calcul du serveur, pas de l'IA ; tutoiement, ton bienveillant, aucun emoji.
- Aucune clé d'IA n'est présente dans le code envoyé au téléphone.

**US-025 Suivre le traitement de ma séance.** Indispensable, 3 points, Prête.
En tant qu'apprenant, je veux voir où en est ma séance (Envoi, Écoute, Analyse), afin de patienter sans inquiétude.
- En cas d'échec : 3 essais automatiques, puis un message clair et un bouton « Réessayer ».

**US-026 Suivre le coût de chaque séance.** Indispensable, 3 points, Prête.
En tant que fondateur, je veux connaître le coût réel de chaque séance, afin de tenir mon budget.
- Chaque analyse enregistre le service utilisé, la durée, les jetons et le coût en dollars et en FCFA.

**US-041 Essai des outils de transcription (étude technique).** Indispensable, 5 points, À préciser (enregistrements).
En tant que fondateur, je veux comparer les outils de transcription sur 20 vrais enregistrements, afin de choisir celui qui comprend notre accent et garde les « euh ».
- Protocole : [ESSAI_TRANSCRIPTION.md](ESSAI_TRANSCRIPTION.md). Livrable : un tableau comparatif et une recommandation.

## E-07 Progrès

**US-027 Ma série de jours.** Important, 3 points, Prête.
En tant qu'apprenant, je veux voir ma série de jours d'entraînement, afin d'être motivé à revenir.
- La série est calculée par le serveur à l'heure de Dakar ; une séance enregistrée à 23 h 58 et envoyée à 0 h 05 compte pour la veille.

**US-028 Mes statistiques et la courbe des tics.** Important, 5 points, À préciser (captures).
En tant qu'apprenant, je veux voir l'évolution de mes tics et de mes séances, afin de constater mes progrès.

**US-029 Un accueil qui me guide.** Important, 3 points, À préciser (captures).
En tant qu'apprenant, je veux voir à l'accueil ma séance du jour, ma série, ma leçon en cours et mon prochain meet, afin de savoir quoi faire aujourd'hui.

## E-08 Mon coach (côté apprenant)

**US-030 Rejoindre mon prochain meet.** Important, 3 points, À préciser (captures).
En tant qu'apprenant, je veux voir la date de mon prochain meet et le rejoindre en un geste, afin de ne pas le manquer.
- « Rejoindre » ouvre le lien Google Meet enregistré par le coach.

**US-031 Lire les retours et objectifs du coach.** Important, 2 points, À préciser (captures).

**US-032 Écrire au coach.** Souhaitable, 3 points, À préciser (captures).
- Texte seulement (pas de vocal), 1 000 caractères au maximum.

## E-09 Espace coach

**US-033 Liste de mes apprenants.** Important, 5 points, À préciser (captures).
En tant que coach, je veux voir mes apprenants avec leur progression, leur dernière séance, leur série et leur statut, afin de savoir qui relancer.
- Statut « À relancer » automatique après 7 jours sans séance (durée réglable) ; filtres par statut et par module.

**US-034 Fiche d'un apprenant.** Important, 5 points, À préciser (captures).
- Historique des séances et des analyses ; l'audio s'écoute par un lien valable 5 minutes.

**US-035 Planifier un meet.** Important, 3 points, À préciser (captures).
- Date, heure (fuseau de Dakar) et lien Google Meet ; le lien doit commencer par `https://meet.google.com/`.

**US-036 Écrire des retours et objectifs.** Important, 2 points, À préciser (captures).

**US-037 Statistiques globales et coûts.** Important, 3 points, À préciser (captures).
- Séances par semaine, apprenants à relancer, coût de l'IA du jour, de la semaine et du mois.

## E-10 Données personnelles

**US-038 Télécharger mes données.** Indispensable, 3 points, Prête.
En tant qu'apprenant, je veux télécharger toutes mes données, afin d'exercer mon droit d'accès.

**US-039 Effacer automatiquement les audios au bout de 90 jours.** Indispensable, 2 points, Prête.
- Une tâche quotidienne supprime les fichiers de plus de 90 jours ; un test le vérifie avec une date simulée.

**US-040 Connaître l'origine des inscrits.** Souhaitable, 2 points, Prête.
En tant que fondateur, je veux savoir d'où viennent les inscrits (QR code, WhatsApp, TikTok…), afin de savoir quels canaux marchent.

## Après le MVP (version 1.1 et plus tard)

| Épopée | Contenu | Priorité |
|---|---|---|
| E-11 Arène 60 secondes | Défi de la semaine, ligues, classement (score calculé par le serveur) | Plus tard |
| E-12 Notifications | Rappels de série et de meet (Web Push, iPhone avec iOS 16.4 ou plus récent) | Plus tard |
| E-13 Certificat et paiement | Quiz final, code vérifiable, paiement Wave ou Orange Money | Plus tard |
| E-14 Distribution sur les stores | Google Play via TWA (25 $), App Store seulement si les revenus le justifient | Plus tard |
| E-15 Modules 2 et 3 | Réécriture (échantillon du module 1 à valider) | Important |
| E-16 Wolof | Interface et contenus | Plus tard |

## Proposition de découpage en sprints (à valider au lancement de chaque sprint)

La capacité réelle sera mesurée dès le sprint 1 ; ce découpage changera.

| Sprint | Objectif | User stories | Points |
|---|---|---|---|
| 1 | « J'ouvre SPLEAD sur mon téléphone, elle s'installe et elle a le style Souffle » | US-005, US-007, US-001, US-003 | 14 |
| 2 | « Je crée mon compte et j'accepte l'enregistrement » | US-009, US-010, US-012, US-013, US-015 | 15 |
| 3 | « Je lis une leçon, même sans réseau » | US-016, US-017, US-018, US-019 | 14 |
| 4 | « J'enregistre une séance, même sans réseau » | US-021, US-022, US-023 | 18 |
| 5 | « Je reçois mon analyse » | US-024, US-025, US-026 (après US-041) | 14 |
| 6 | « Je vois mes progrès » | US-027, US-028, US-029, US-020 | 14 |
| 7 | « Mon coach me suit » | US-030, US-031, US-033, US-035, US-036 | 15 |
| 8 | « Mes données m'appartiennent », puis la bêta | US-014, US-038, US-039, US-034, US-037, US-002, US-004, US-006, US-008, US-011, US-032, US-040 | 30, à répartir |

US-041 (essai de transcription) se fait en parallèle, dès que les enregistrements sont prêts.
