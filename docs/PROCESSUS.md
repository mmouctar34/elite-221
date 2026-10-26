# SPLEAD : processus de travail et équipe

Version 1 (26 octobre 2026). Ce document dit **qui fait quoi, dans quel ordre, et ce qui prouve qu'une étape est finie.**

---

## 1. Les rôles

| Rôle | Qui | Ce qu'il fait |
|---|---|---|
| CEO, Product Owner, CTO | **Le fondateur** | Décide, priorise le backlog, valide chaque livrable, accepte ou refuse une user story à la recette |
| Exécution | **Claude** | Analyse, rédige, code, teste, déploie, et fait un rapport à chaque étape |
| Spécialistes | **Agents** (ci-dessous) | Claude leur confie les tâches de leur domaine |

Le fondateur garde toujours le dernier mot. Aucune mise en ligne, aucune dépense et aucun changement de périmètre sans son accord écrit.

## 2. L'équipe d'agents

Deux familles d'agents :

- **Agents SPLEAD**, créés pour ce projet. Ils sont dans `.claude/agents/` et connaissent ses règles : français simple, aucun emoji, aucun chiffre inventé.
- **Agents ECC**, déjà installés sur ce PC avec l'extension ECC (Everything Claude Code). Ils sont génériques, mais solides sur la technique.

| Domaine | Agent | Famille |
|---|---|---|
| Prospection, besoins, personas, entretiens, cahier des charges, user stories | `analyste-metier` | SPLEAD |
| Coûts, prix, rentabilité, budget, suivi des dépenses | `analyste-financier` | SPLEAD |
| Backlog, sprints, vélocité, blocages, journal, rapports | `scrum-master` | SPLEAD |
| Recette des user stories, procès-verbaux de recette | `testeur-recette` | SPLEAD |
| Architecture, décisions techniques (ADR) | `ecc:architect`, `ecc:planner` | ECC |
| Base de données et règles d'accès | `ecc:database-reviewer` | ECC |
| Accessibilité, système de design | `ecc:a11y-architect` | ECC |
| Développement piloté par les tests | `ecc:tdd-guide` | ECC |
| Relecture du code | `ecc:code-reviewer`, `ecc:typescript-reviewer`, `ecc:react-reviewer` | ECC |
| Sécurité | `ecc:security-reviewer` | ECC |
| Tests de bout en bout dans le navigateur | `ecc:e2e-runner` | ECC |
| Erreurs de construction | `ecc:build-error-resolver` | ECC |
| Lancement, communication | `ecc:marketing-agent` | ECC |
| Mise à jour de la documentation | `ecc:doc-updater` | ECC |

## 3. Les commandes (skills SPLEAD)

| Commande | Ce qu'elle fait | Fichier produit |
|---|---|---|
| `/sprint` | Prépare un sprint : choisit les user stories prêtes, vérifie la capacité, écrit l'objectif du sprint | `docs/sprints/sprint-NN.md` |
| `/recette` | Vérifie une user story critère par critère, avec des preuves (tests, captures) | `docs/recettes/US-XXX.md` |
| `/rapport` | Écrit un rapport détaillé et pédagogique : ce qui a été fait, comment, pourquoi, ce qu'on apprend | `docs/rapports/AAAA-MM-JJ-sujet.md` |

Pour les lancer, dites simplement à Claude : « lance /sprint 1 », « fais la recette de US-012 » ou « /rapport sur la journée ».

## 4. Les phases du projet

| # | Phase | Livrables | Agents | Validation par le fondateur |
|---|---|---|---|---|
| 1 | Prospection et recueil des besoins | [PROSPECTION.md](PROSPECTION.md), guide d'entretien, synthèse des entretiens | `analyste-metier`, `ecc:marketing-agent` | Les cibles et les besoins sont les bons |
| 2 | Étude financière | [ANALYSE_FINANCIERE.md](ANALYSE_FINANCIERE.md) | `analyste-financier` | Le prix et le budget sont choisis |
| 3 | Cahier des charges | [CAHIER_DES_CHARGES.md](CAHIER_DES_CHARGES.md) | `analyste-metier`, `ecc:architect` | Le périmètre est figé pour la version en cours |
| 4 | Conception | [ARCHITECTURE.md](ARCHITECTURE.md), décisions dans `adr/`, système de design | `ecc:architect`, `ecc:database-reviewer`, `ecc:a11y-architect` | Les choix techniques sont compris et acceptés |
| 5 | Planification Scrum | [BACKLOG.md](BACKLOG.md), fiches de sprint | `scrum-master`, `/sprint` | Le contenu du sprint est accepté |
| 6 | Développement | Code, tests, revues | `ecc:tdd-guide` et relecteurs | Démo à la fin du sprint |
| 7 | Tests et recette | Procès-verbaux de recette | `testeur-recette`, `ecc:e2e-runner`, `/recette` | Chaque user story est acceptée ou refusée |
| 8 | Livraison (DevOps) | Version en ligne, notes de version | `scrum-master`, `ecc:security-reviewer` | Accord écrit avant chaque mise en ligne |
| 9 | Suivi | Rapports, indicateurs, coûts réels | `scrum-master`, `analyste-financier`, `/rapport` | Revue mensuelle |

Les phases 1 à 4 se font une fois au début, puis sont mises à jour quand le produit évolue. Les phases 5 à 9 se répètent à chaque sprint.

## 5. Scrum, adapté à une équipe d'une personne et de Claude

- **Durée d'un sprint** : 1 semaine (modifiable).
- **Planification** (début de sprint) : le fondateur choisit, parmi les user stories prêtes, celles du sprint. `/sprint` écrit la fiche.
- **Point quotidien** : une ligne dans le Journal de [FEUILLE_DE_ROUTE.md](FEUILLE_DE_ROUTE.md) (fait, à faire, blocage).
- **Revue** (fin de sprint) : démonstration sur un téléphone, puis recette de chaque user story.
- **Rétrospective** : trois questions dans la fiche de sprint (ce qui a bien marché, ce qui a coincé, ce qu'on change).
- **Rapport** : `/rapport` à la fin de chaque sprint.

### Une user story est « prête » quand

1. Elle suit la forme « En tant que…, je veux…, afin de… ».
2. Ses critères d'acceptation sont écrits et vérifiables.
3. Elle est estimée en points.
4. Elle ne dépend d'aucune décision non prise.
5. Si elle a un écran, la maquette ou la capture correspondante existe.

### Une user story est « terminée » quand

1. Le code est sur sa branche, relu, et fusionné dans `main`.
2. Les tests automatiques passent : analyse, tests unitaires, tests de sécurité si la base est touchée.
3. Chaque critère d'acceptation a sa preuve dans le procès-verbal de recette.
4. Elle fonctionne sur un téléphone Android d'entrée de gamme, en ligne et hors-ligne si c'est concerné.
5. La documentation et le Journal sont à jour.
6. Le fondateur l'a acceptée.

## 6. Les rapports, pour suivre et pour apprendre

Chaque rapport (`docs/rapports/`) répond toujours aux mêmes questions :

1. Ce qui a été fait, en une phrase.
2. Pourquoi c'était nécessaire.
3. Comment c'était fait, étape par étape, avec les commandes utilisées.
4. Les notions apprises, expliquées simplement (avec un mot du vocabulaire du métier et sa définition).
5. Ce qui a posé problème, et comment c'était réglé.
6. Ce qui reste à faire.
7. Pour aller plus loin : une ou deux ressources fiables.

## 7. Si l'abonnement à Claude s'interrompt

Tout ce qui précède est écrit dans le dépôt, en clair :

- Les documents, le backlog et les fiches de sprint restent lisibles et utilisables à la main.
- Les agents et commandes reprendront dès qu'une session Claude Code sera rouverte dans le dossier SPLEAD.
- Pour reprendre : ouvrir Claude Code dans le dossier SPLEAD et dire « Lis CLAUDE.md et la feuille de route, puis continue le sprint en cours ».
