# Brief de développement : application mobile SPLEAD

Texte d'origine fourni par le fondateur le 17 octobre 2026, conservé tel quel. Les décisions prises depuis sont dans [CADRAGE.md](CADRAGE.md) (section 11) et dans [../CLAUDE.md](../CLAUDE.md).

---

À coller comme premier message dans Claude Code, ou à enregistrer à la racine du nouveau dépôt sous le nom `CLAUDE.md`. Les passages entre [crochets] sont à compléter par le fondateur avant de commencer.

## 0. Ta mission et ta façon de travailler

Tu es le directeur technique et le développeur principal d'une application mobile commerciale d'entraînement à la prise de parole. Le fondateur n'est pas développeur : explique chaque choix technique en termes simples, en français.

Règles de travail, non négociables :

1. Ne code rien avant d'avoir validé le cadrage. Commence en mode plan. Livre d'abord `docs/CADRAGE.md` (problème, cible, proposition de valeur, MVP, versions suivantes), `docs/ARCHITECTURE.md` (stack, schéma de données, sécurité, coûts) et `docs/FEUILLE_DE_ROUTE.md` (jalons). Attends la validation écrite du fondateur.
2. Pose-moi les questions bloquantes en une seule fois, puis avance. Ne devine pas les chiffres, les prix ou les noms : utilise des champs `[À COMPLÉTER]` visibles.
3. Travaille par petits jalons livrables et testables, un commit clair par étape, une branche par fonctionnalité.
4. Après chaque jalon : lance les tests, lance le linter, résume en 5 lignes ce qui marche et ce qui reste.
5. Ne mets jamais de clé secrète, de mot de passe ou de jeton dans le code ni dans le dépôt. Utilise des variables d'environnement et un fichier `.env.example`.

## 1. Le produit

Nom de l'application : [SPLEAD ou Split : à confirmer]. Application mobile uniquement (pas de site web public). Langue : français, ton chaleureux avec tutoiement. Wolof possible plus tard : prépare l'internationalisation dès le départ.

Promesse : une séance par jour, on parle dans le micro, on reçoit tout de suite une analyse claire, et un vrai coach humain suit la progression.

Public : étudiants, jeunes professionnels et entrepreneurs au Sénégal qui veulent mieux parler en public (entretiens, pitchs, présentations, réunions).

Le fondateur est aussi le coach. Il suit la progression des apprenants depuis un tableau de bord, et organise lui-même des rendez-vous en visioconférence (Google Meet). Les apprenants ne lui envoient pas de vocaux.

Méthode pédagogique propre : [NOM DE LA MÉTHODE : À COMPLÉTER]. Les leçons, cas pratiques et exercices de l'application sont originaux. Ne recopie aucun contenu protégé trouvé sur Internet (PDF, manuels, sites). Les sources externes servent d'inspiration uniquement.

## 2. Fonctionnalités

### Pour l'apprenant

- Accueil : salutation, série de jours, séance du jour (« Convaincre en 60 secondes »), semaine en cours, leçon en cours, prochain meet avec le coach.
- S'entraîner : Arène 60 secondes, liste des 3 modules (Prise de Parole en Public, Leadership Moderne, Développement Personnel), séance libre par scénario (entretien, pitch, présentation, réunion).
- Module et leçons : chaque leçon a du texte court, un principe clé et un cas pratique à réaliser à voix haute. Le module se valide par un cas pratique final. Les modules suivants se débloquent dans l'ordre. Chaque leçon est téléchargeable pour le hors-ligne.
- Séance : sujet, enregistrement avec chrono (60 secondes), onde sonore, pause, fin.
- Analyse : résumé, trois axes (Structure, Voix, Impact), tics de langage comptés (« euh », « donc », « du coup »), un point fort, une priorité. Le ton est bienveillant : les points forts d'abord.
- Progrès : série de jours, statistiques, courbe des tics de langage, badges.
- Arène 60 secondes : défi de la semaine et classement. Remise à zéro chaque semaine, ligues par groupes de taille limitée, score calculé uniquement côté serveur (aucune triche possible depuis le téléphone). Conçue pour monter en charge.
- Mon coach (dans le Profil) : prochain meet avec bouton « Rejoindre », retours et objectifs du coach, historique des meets, message écrit au coach. Pas de vocaux.
- Certificat vérifiable (après le quiz final) : code unique et page de vérification publique par code. Paiement par Wave ou Orange Money.

### Pour le coach (rôle `coach`, dans la même application)

- Espace coach : liste des apprenants avec progression, dernière séance, série, statut (Actif, À relancer), filtres.
- Planifier un meet (date, heure, lien Google Meet), écrire des retours et objectifs, consulter l'historique d'un apprenant.
- Statistiques globales : séances par semaine, apprenants à relancer.

### Versions

- MVP (à valider avec moi) : comptes, onboarding, modules et leçons avec cas pratiques, séance et analyse, progrès, écran Mon coach et Espace coach de base.
- Version 1.1 : Arène 60 secondes et classement, notifications, certificat avec paiement mobile.
- Plus tard : débats en duel, wolof, version iPhone.

## 3. Contraintes terrain (Sénégal)

- Android d'abord, y compris téléphones d'entrée de gamme. Cible : fonctionne bien avec 2 Go de RAM.
- Connexions lentes ou coupées : lecture des leçons hors-ligne, enregistrements mis en file d'attente puis envoyés quand le réseau revient (envoi reprenable), audio compressé (Opus ou AAC bas débit), pas de grosses images, taille de l'application la plus petite possible.
- Économie de données : bouton « Éco-data » visible, qui limite les téléchargements automatiques.
- Paiements locaux : Wave et Orange Money, prix en FCFA. Utilise soit les API officielles, soit un agrégateur qui les gère ; vérifie la documentation actuelle et compare avant de choisir (frais, délais, fiabilité). Aucun paiement par carte requis au départ.
- Données personnelles : les enregistrements vocaux sont des données sensibles. Consentement explicite à l'inscription, durée de conservation définie [À COMPLÉTER], suppression sur demande, stockage privé. Vérifie les obligations de la loi sénégalaise sur les données personnelles et de l'autorité compétente.

## 4. Stack recommandée (à discuter dans ARCHITECTURE.md)

Compare Flutter, React Native (Expo) et natif, puis recommande avec justification simple. Mon avis de départ, à confirmer ou contredire avec des arguments :

- Application : Flutter (une seule base de code Android puis iPhone, bonnes performances sur téléphones modestes, rendu identique partout).
- Backend : Supabase (Postgres, authentification, stockage privé, règles de sécurité par ligne, fonctions serveur, temps réel).
- Analyse vocale par IA : transcription (STT) puis analyse par un modèle de langage, appelée uniquement depuis une fonction serveur (jamais depuis le téléphone, pour protéger les clés). Séances limitées à 60-120 secondes, quota par utilisateur et par jour, traitement asynchrone avec indicateur de progression, suivi des coûts.
- Notifications : push (Firebase Cloud Messaging) pour les rappels de série et les rendez-vous.
- Meets : le coach crée l'événement Google Meet ; l'application stocke le lien et la date. Pas de visio intégrée dans l'application.
- E-mails transactionnels : Resend.
- Qualité : TypeScript ou Dart strict, tests automatiques, intégration continue, environnements séparés (développement, test, production), suivi d'erreurs.

## 5. Modèle de données (point de départ)

`profiles` (rôle apprenant ou coach), `modules`, `lessons`, `practice_cases`, `lesson_progress`, `sessions` (enregistrement, durée, scénario, statut), `analyses` (axes, tics en JSON, résumé, point fort, priorité), `streaks`, `challenges`, `challenge_entries` (score, semaine, ligue), `leagues`, `coach_notes`, `meetings` (apprenant, coach, date, lien, statut), `payments`, `certificates` (code unique), `consents`.

Le contenu pédagogique est stocké en base (modifiable par le coach sans republier l'application), pas écrit en dur dans le code.

Sécurité : règles de sécurité par ligne sur toutes les tables (un apprenant ne voit que ses données ; le coach voit ses apprenants ; le classement n'expose que prénom et score), fichiers audio privés avec liens signés à durée courte, limitation de débit sur les fonctions serveur.

## 6. Design à respecter

Le design est fourni sous forme de captures d'écran dans `design/` : Accueil, S'entraîner, Module, Leçon et cas pratique, Arène 60 secondes, Séance, Analyse, Progrès, Mon coach, Espace coach. Reproduis-le fidèlement.

- Style « Souffle » : aéré, très arrondi, calme. Cartes blanches sur fond lavande, grand bouton micro rond au centre de la séance.
- Couleurs : Nuit `#1E1B4B` (texte, fonds sombres), Indigo `#4F46E5` (marque), Turquoise `#2DD4BF` (actions, avec texte `#1E1B4B`), Brume `#E4E0FF` (pastilles), Fond `#F3F1FF`, Blanc `#FFFFFF`, texte secondaire `#4B4A6B`. Aucun orange ni rouge.
- Police : Plus Jakarta Sans (500 à 800), texte 15 px minimum.
- Icônes : jeu d'icônes à trait uniforme (Lucide), épaisseur ~2,2. Aucun emoji nulle part : ni dans l'interface, ni dans les textes, ni dans les messages de commit.
- Accessibilité : zones tactiles de 44 px minimum, contrastes suffisants, libellés sur les boutons-icônes.
- Navigation du bas : Accueil, S'entraîner, Progrès, Profil.
- Construis d'abord un système de design (couleurs, typographie, composants) réutilisable, puis les écrans.

## 7. Jalons proposés

1. J0 – Cadrage : les trois documents, validés.
2. J1 – Fondations : dépôt, intégration continue, système de design, navigation, comptes et inscription, consentement.
3. J2 – Contenu : modules, leçons, cas pratiques, progression, hors-ligne.
4. J3 – Séance et analyse : enregistrement, envoi reprenable, fonction d'analyse, écran Analyse.
5. J4 – Progrès : série, statistiques, badges, rappels.
6. J5 – Coach : Mon coach, Espace coach, meets, retours.
7. J6 – Bêta fermée sur Google Play (test interne puis fermé), mesure des erreurs et des coûts.
8. J7 – Arène et classement, puis J8 – Certificat et paiement mobile.

## 8. À préparer avant la mise en vente (liste à tenir à jour dans la feuille de route)

Statut juridique de l'entreprise [À COMPLÉTER], nom et marque [À COMPLÉTER], compte développeur Google Play, politique de confidentialité et conditions d'utilisation en français, compte marchand Wave et Orange Money, adresse e-mail professionnelle et nom de domaine pour la vérification des certificats, plan de communication de lancement.

## 9. Ce que tu fais maintenant

1. Lis ce brief en entier et le dépôt existant s'il y en a un. Le prototype `mmouctar34/elite-221` est un petit site web statique : réutilise uniquement ses textes de leçons et de quiz, pas son interface.
2. Pose tes questions bloquantes en une seule liste.
3. Produis `docs/CADRAGE.md`, `docs/ARCHITECTURE.md` et `docs/FEUILLE_DE_ROUTE.md`, puis attends ma validation avant d'écrire la moindre ligne de l'application.
