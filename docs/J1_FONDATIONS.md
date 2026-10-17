# Jalon J1 : Fondations (plan détaillé)

Version 1 (17 octobre 2026). Détaille le jalon J1 de la [feuille de route](FEUILLE_DE_ROUTE.md).

**But du jalon :** à la fin, on installe SPLEAD sur un petit téléphone Android, on crée un compte, on accepte l'enregistrement de la voix, on navigue entre les 4 onglets, on se déconnecte, on se reconnecte et on supprime son compte. En parallèle, l'essai de transcription a désigné un outil.

---

## 1. Ce qui manque sur le PC (constaté le 17 octobre 2026)

| Outil | Rôle | État |
|---|---|---|
| Git | Historique du code | Installé |
| Node.js 24 | Outils Supabase et scripts d'essai | Installé |
| Flutter (avec Dart) | Construire l'application | **Absent** |
| Java (JDK 17) | Nécessaire pour construire une application Android | **Absent** |
| Android SDK (via Android Studio) | Outils Android, émulateur | **Absent** |
| Supabase CLI | Gérer la base et les migrations | Absent : utilisable sans installation via `npx supabase` |
| Docker | Faire tourner une copie locale de Supabase | Absent, **facultatif** : les tests de la base tourneront dans l'intégration continue GitHub |

Installer Flutter, Java et Android Studio représente plusieurs gigaoctets de téléchargement. **Je le fais seulement avec votre accord.**

## 2. Ce que le fondateur doit fournir

| Élément | Pourquoi | Bloque |
|---|---|---|
| Accord pour installer Flutter, Java et Android Studio sur ce PC | Sans eux, impossible de construire l'application | Tout le code de J1 |
| Dépôt GitHub privé vide `mmouctar34/splead` (sur github.com > New repository, sans README) | Sauvegarde du code et intégration continue | L'intégration continue |
| Choix de l'organisation Supabase (voir § 4) | Séparer les factures et les accès de Madior Insight | La base de données |
| Captures du design dans `design/` | Reproduire fidèlement le style « Souffle » | Le système de design |
| Un téléphone Android d'entrée de gamme (2 Go de RAM) | Vérifier la fluidité réelle | La fin de J1 |
| Les enregistrements de l'essai de transcription | Choisir l'outil de transcription | La fin de J1 |
| Le mode de connexion (voir § 5) | Inscription et connexion | Les comptes |

## 3. Les étapes, dans l'ordre

Chaque étape a sa branche et se termine par des tests verts.

| # | Branche | Contenu | Terminé quand |
|---|---|---|---|
| 1 | `j1/socle` | Projet Flutter, analyse stricte, structure des dossiers, traductions (`fr`), `.env.example`, fichier de configuration par environnement (`dev`, `prod`) | `flutter analyze` sans avertissement, un test vide passe, l'application s'ouvre sur l'émulateur |
| 2 | `j1/integration-continue` | GitHub Actions : analyse, tests, construction de l'APK, tests de la base | Un envoi déclenche les vérifications, qui passent |
| 3 | `j1/systeme-design` | Couleurs, police Plus Jakarta Sans (500 à 800, incluse), espacements, arrondis, icônes Lucide (trait de 2,2), composants : bouton principal, bouton secondaire, bouton-icône avec libellé, carte, pastille, champ de saisie, gros bouton micro, barre du bas, écran de chargement, écran d'erreur | Page de démonstration interne ; captures de référence automatiques ; zones tactiles de 44 px minimum vérifiées par test ; contrastes vérifiés |
| 4 | `j1/navigation` | Les 4 onglets (Accueil, S'entraîner, Progrès, Profil), écrans vides mais propres | On passe d'un onglet à l'autre ; le bouton retour d'Android se comporte normalement |
| 5 | `j1/base-comptes` | Projets Supabase `splead-dev` et `splead-prod` ; premières tables : `profiles`, `user_roles`, `consents`, `coach_assignments`, avec leurs règles d'accès ; création automatique du profil à l'inscription ; tests de sécurité | Les tests prouvent qu'un apprenant ne lit ni ne modifie le profil d'un autre et ne peut pas changer son propre rôle |
| 6 | `j1/inscription` | Écrans d'accueil, connexion, prénom et objectif, **consentement à l'enregistrement de la voix** (case non cochée par défaut, texte versionné), déconnexion, suppression du compte (avec confirmation) | Le parcours complet marche sur le téléphone ; la suppression efface vraiment les données (test) |
| 7 | `j1/suivi-erreurs` | Sentry branché, sans données personnelles | Un plantage volontaire en `dev` apparaît dans Sentry |

L'**essai de transcription** se déroule en parallèle, dès que les enregistrements sont prêts : voir [ESSAI_TRANSCRIPTION.md](ESSAI_TRANSCRIPTION.md).

## 4. Où ranger SPLEAD dans Supabase

Votre compte Supabase contient aujourd'hui une seule organisation, « Madior Insight », avec le projet de production de Madior (région Paris).

- **Proposition : créer une organisation séparée « SPLEAD »** (sur supabase.com > New organization). Les factures, les accès et les limites restent séparés de Madior Insight : une erreur sur SPLEAD ne peut pas toucher Madior, et inversement.
- Dans cette organisation : `splead-dev` (formule gratuite) maintenant, et `splead-prod` plus tard (avant J6, formule payante).
- Région : Paris (eu-west-3), comme Madior.

La création d'une organisation se fait dans le tableau de bord Supabase : c'est à vous de la faire. Je crée ensuite les projets avec votre accord, car un projet peut entraîner des frais.

## 5. Mode de connexion

| Option | Coût | Remarque |
|---|---|---|
| Code reçu par e-mail | Gratuit (dans les limites de Supabase et Resend) | Tous les étudiants n'utilisent pas leur e-mail au quotidien |
| Compte Google | Gratuit | Presque tous les téléphones Android en ont un ; un seul geste |
| Code reçu par SMS | Payant à chaque SMS, prix vers le Sénégal `[À COMPLÉTER]` | Le plus naturel au Sénégal, mais il faut un fournisseur de SMS |

**Proposition : compte Google et code par e-mail en J1** (gratuits), puis le SMS quand le budget sera connu. La base est prévue pour ajouter le SMS sans rien casser.

## 6. Points de vigilance

- **Application la plus légère possible** : la taille de l'APK est mesurée à chaque construction (objectif : moins de 15 Mo).
- **Texte du consentement** : je rédige un brouillon simple, à faire relire par un juriste avant la bêta (J6).
- **Aucune donnée réelle dans `dev`** : seulement des comptes de test.
- **Aucun emoji**, ni dans le code, ni dans les textes, ni dans les commits.
