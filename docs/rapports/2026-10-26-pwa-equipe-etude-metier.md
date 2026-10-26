# Rapport : passage à la PWA, équipe d'agents et étude métier

Date : 26/10/2026. Période couverte : 17 au 26 octobre 2026. Commits : `fdbf17b` à celui de ce rapport.

## 1. En une phrase

SPLEAD est devenue une PWA (pas de compte Apple à payer), et le projet a maintenant une équipe d'agents, un processus Scrum, une étude de marché, une étude financière, un cahier des charges et un backlog de 41 user stories, prêts pour le sprint 1.

## 2. Pourquoi c'était nécessaire

- Le compte développeur Apple coûte 99 $ par an (environ 57 900 FCFA). Le payer avant de savoir si l'application plaît était un risque inutile.
- Avant d'écrire du code, il fallait répondre aux questions du métier : pour qui, quel problème, combien ça coûte, combien ça peut rapporter, et que doit faire exactement la première version.
- Le fondateur voulait une organisation de type « équipe » (analyste, scrum master, testeur…), et un moyen de suivre et d'apprendre.

## 3. Ce qui a été fait, étape par étape

1. **Décision de plateforme.** Trois options ont été comparées : application Flutter, PWA, site web simple. Le fondateur a choisi la PWA. La décision est écrite dans une ADR : [docs/adr/ADR-001-pwa.md](../adr/ADR-001-pwa.md).
2. **Prospection.** Recherche de chiffres publics et sourcés : 286 169 étudiants en 2024, 18,2 millions de lignes internet mobile haut débit début 2025, prix des concurrents. Résultat : [docs/PROSPECTION.md](../PROSPECTION.md), avec 3 personnages types, 10 hypothèses à vérifier et un guide d'entretien de 12 questions.
3. **Étude financière.** Calcul des coûts fixes et variables en FCFA (1 $ = 585 FCFA au 19/10/2026), du seuil de rentabilité et de l'effet des utilisateurs gratuits : [docs/ANALYSE_FINANCIERE.md](../ANALYSE_FINANCIERE.md).
4. **Cahier des charges.** 17 exigences fonctionnelles, 12 exigences non fonctionnelles mesurables, les critères de recette et un glossaire : [docs/CAHIER_DES_CHARGES.md](../CAHIER_DES_CHARGES.md).
5. **Backlog Scrum.** 41 user stories en 10 épopées, avec priorité, points et critères d'acceptation, plus une proposition de 8 sprints : [docs/BACKLOG.md](../BACKLOG.md).
6. **Équipe et processus.** Création de 4 agents (`analyste-metier`, `analyste-financier`, `scrum-master`, `testeur-recette`) et de 3 commandes (`/sprint`, `/recette`, `/rapport`) dans le dossier `.claude/`, et rédaction de [docs/PROCESSUS.md](../PROCESSUS.md). Les agents techniques de l'extension ECC (architecte, relecteur de code, sécurité, tests) sont réutilisés.
7. **Mise à jour des documents existants** (architecture, cadrage, plan J1, feuille de route, CLAUDE.md), pour remplacer Flutter par la PWA.

Commandes utiles pour vérifier vous-même :

```bash
git -C "C:/Users/HP/OneDrive/Desktop/Projet Senpai/SPLEAD" log --oneline
```

(Affiche l'historique : une ligne par étape enregistrée.)

```bash
git -C "C:/Users/HP/OneDrive/Desktop/Projet Senpai/SPLEAD" show --stat HEAD
```

(Montre les fichiers créés ou modifiés par le dernier enregistrement.)

## 4. Ce qu'il faut retenir

- **PWA (Progressive Web App)** : un site web qui s'installe comme une application, marche en partie sans réseau et peut envoyer des notifications. Un seul code pour tous les appareils.
- **ADR (Architecture Decision Record)** : une fiche qui garde la trace d'une décision technique et de ses raisons. On n'efface jamais une ADR : on en écrit une nouvelle si l'on change d'avis.
- **Hypothèse** : une supposition à vérifier auprès des vrais utilisateurs. Une bonne prospection sépare toujours les faits (sourcés) des hypothèses.
- **Seuil de rentabilité** : le nombre de clients payants à partir duquel les revenus couvrent les coûts. Ici, la leçon principale est que **ce sont les utilisateurs gratuits qui coûtent cher (l'IA), pas les serveurs**.
- **User story** : un besoin écrit du point de vue de l'utilisateur (« En tant que…, je veux…, afin de… »), avec des **critères d'acceptation** vérifiables. C'est l'unité de travail d'un sprint.
- **Définition de « prêt » et de « terminé »** : deux listes de contrôle qui évitent de commencer une tâche floue ou d'en déclarer une finie sans preuve.

## 5. Ce qui a coincé et comment c'était réglé

- **Un garde-fou installé sur le PC** (extension ECC) demande de justifier chaque nouveau fichier avant de l'écrire. Cela ralentit un peu le travail, mais n'empêche rien. Il peut être assoupli dans les réglages d'ECC si le fondateur le souhaite.
- **Les chiffres du marché sont incomplets** : aucun chiffre fiable sur les jeunes professionnels et les entrepreneurs. Ils sont marqués `[À COMPLÉTER]`, plutôt qu'inventés.
- **Risque iPhone** : des développeurs signalent que l'enregistrement du micro ne marche pas toujours dans une PWA installée sur iPhone. Ce n'est pas confirmé officiellement. Une parade est prévue (ouvrir la séance dans Safari) et un essai sur un vrai iPhone est planifié au sprint 4.

## 6. Décisions prises (et par qui)

| Date | Décision | Par |
|---|---|---|
| 26/10/2026 | PWA d'abord, pas d'App Store au début, Google Play facultatif | Le fondateur |
| 26/10/2026 | Processus Scrum en sprints d'une semaine, avec recette et rapport à chaque sprint | Proposé par Claude, à confirmer au lancement du sprint 1 |

## 7. Ce qui reste à faire

Décisions du fondateur :

1. Lancer le sprint 1 (proposition : installation, hors-ligne, système de design, vérification automatique).
2. Créer le dépôt GitHub privé `mmouctar34/splead`, nécessaire pour l'intégration continue.
3. Supabase : rester gratuit jusqu'à la bêta, dans une organisation SPLEAD séparée.
4. Avis sur le ton du module 1 réécrit.
5. Modèle de revenus provisoire et budget de la bêta.
6. Captures du design dans `design/`.

Sur le terrain : faire les 15 entretiens du guide de [PROSPECTION.md](../PROSPECTION.md) § 5, et préparer les 20 enregistrements de l'essai de transcription.

## 8. Pour aller plus loin

- [Le guide Scrum officiel, en français](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-French.pdf) : 13 pages, la référence.
- [web.dev : apprendre les PWA](https://web.dev/learn/pwa) (Google, en anglais) : ce qu'est une PWA et comment elle fonctionne.
