---
name: sprint
description: Prépare, suit ou clôture un sprint Scrum de SPLEAD. À utiliser quand le fondateur dit « lance le sprint N », « prépare le sprint », « où en est le sprint » ou « clôture le sprint ».
---

# Sprint SPLEAD

Le fondateur est le Product Owner : il choisit le contenu du sprint. Tu proposes, il décide.

## Préparer un sprint (« lance le sprint N »)

1. Lis `docs/PROCESSUS.md` (définitions de « prêt » et de « terminé »), `docs/BACKLOG.md` et les fiches précédentes de `docs/sprints/`.
2. Calcule la capacité : la moyenne des points terminés lors des 3 derniers sprints. Pour le premier sprint, propose environ 13 à 15 points et dis que c'est une estimation prudente, à corriger avec la vélocité réelle.
3. Propose un **objectif de sprint** en une phrase (ce que le fondateur pourra essayer sur son téléphone à la fin), puis la liste des user stories « prêtes », par ordre de priorité, sans dépasser la capacité.
4. Signale les user stories importantes qui ne sont pas prêtes, et pourquoi.
5. Demande la validation du fondateur avant d'écrire la fiche.
6. Écris `docs/sprints/sprint-NN.md` avec ce plan :

```
# Sprint NN : [objectif en une phrase]
Dates : du JJ/MM/AAAA au JJ/MM/AAAA. Capacité : X points.

## User stories
| US | Titre | Points | État (À faire, En cours, En recette, Terminée, Reportée) |

## Blocages
| Date | Ce qui bloque | Qui peut débloquer |

## Revue (fin de sprint)
## Rétrospective
- Ce qui a bien marché :
- Ce qui a coincé :
- Ce qu'on change au prochain sprint :
## Vélocité : X points terminés sur Y prévus
```

7. Ajoute une ligne au Journal de `docs/FEUILLE_DE_ROUTE.md`.

## Suivre un sprint (« où en est le sprint »)

Mets à jour la colonne État de la fiche, liste les blocages, et donne le reste à faire en points. Cinq lignes au plus.

## Clôturer un sprint

1. Une user story n'est « Terminée » que si son procès-verbal de recette existe dans `docs/recettes/` et que le fondateur l'a acceptée. Sinon, elle est « Reportée », avec la raison.
2. Remplis la revue, la rétrospective et la vélocité.
3. Remets les user stories reportées en tête du backlog.
4. Lance ensuite la commande `/rapport` sur le sprint.

Aucun emoji, français simple.
