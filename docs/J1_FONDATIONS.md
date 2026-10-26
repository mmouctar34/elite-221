# Jalon J1 : Fondations (plan détaillé)

Version 2 (26 octobre 2026) : mise à jour pour la PWA ([ADR-001](adr/ADR-001-pwa.md)). Détaille le jalon J1 de la [feuille de route](FEUILLE_DE_ROUTE.md). Le découpage en user stories et en sprints est dans le [backlog](BACKLOG.md).

**But du jalon :** à la fin, on installe SPLEAD (PWA) sur un petit téléphone Android, on crée un compte, on accepte l'enregistrement de la voix, on navigue entre les 4 onglets, on se déconnecte, on se reconnecte et on supprime son compte. En parallèle, l'essai de transcription a désigné un outil.

---

## 1. Les outils sur le PC (mis à jour le 26 octobre 2026)

| Outil | Rôle | État |
|---|---|---|
| Git (et Git Bash) | Historique du code | Installé |
| Node.js 24 et npm | Construire et tester la PWA, outils Supabase | Installé |
| Supabase CLI | Gérer la base et les migrations | Utilisable sans installation via `npx supabase` |
| Docker | Copie locale de Supabase | **Facultatif** : les tests de la base tourneront dans l'intégration continue GitHub |
| Flutter, Java, Android Studio | — | **Plus nécessaires** depuis le choix de la PWA |

## 2. Ce que le fondateur doit fournir

| Élément | Pourquoi | Bloque |
|---|---|---|
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
| 1 | `j1/socle` | Projet PWA (Vite, React, TypeScript strict), manifeste et service worker, structure des dossiers, traductions (`fr`), `.env.example`, configuration par environnement (`dev`, `prod`) | Analyse et tests sans erreur ; la construction passe ; l'application s'installe et s'ouvre hors-ligne dans Chrome |
| 2 | `j1/integration-continue` | GitHub Actions : analyse, tests, construction, mesure de la taille du code, tests de la base | Un envoi déclenche les vérifications, qui passent |
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

**Décision du fondateur (18 octobre 2026) : compte Google et code par e-mail en J1** (gratuits), puis le SMS quand le budget sera connu. La base est prévue pour ajouter le SMS sans rien casser.

## 6. Points de vigilance

- **Application la plus légère possible** : la taille du code chargé à la première ouverture est mesurée à chaque construction (objectif : 200 Ko compressés au maximum).
- **Texte du consentement** : brouillon dans [contenu/fr/consentement-v1.md](../contenu/fr/consentement-v1.md), à faire relire par un juriste avant la bêta (J6).
- **Aucune donnée réelle dans `dev`** : seulement des comptes de test.
- **Aucun emoji**, ni dans le code, ni dans les textes, ni dans les commits.
