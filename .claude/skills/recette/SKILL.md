---
name: recette
description: Fait la recette d'une user story de SPLEAD, c'est-à-dire vérifie chacun de ses critères d'acceptation avec des preuves, puis écrit le procès-verbal. À utiliser quand le fondateur dit « fais la recette de US-NNN » ou « est-ce que US-NNN est terminée ».
---

# Recette d'une user story

La recette, c'est l'étape où l'on vérifie que ce qui a été construit correspond exactement à ce qui était demandé. Elle se termine par un procès-verbal (PV) : le document qui garde la preuve.

## Étapes

1. Lis la user story et ses critères d'acceptation dans `docs/BACKLOG.md`, ainsi que la définition de « terminé » dans `docs/PROCESSUS.md`.
2. Confie la vérification à l'agent `testeur-recette`. Si tu la fais toi-même, applique ses règles.
3. Lance les vérifications automatiques du projet (analyse, tests, construction) et garde leur résultat.
4. Pour chaque critère, note un verdict avec sa preuve :
   - **Conforme** : vérifié, preuve jointe ;
   - **Non conforme** : étapes pour reproduire, résultat attendu, résultat obtenu ;
   - **Non vérifiable** : ce qui manque pour vérifier (un téléphone, un accès, une donnée).
5. Vérifie aussi les cas difficiles : hors-ligne, réseau qui coupe, écran de 360 px, texte agrandi, accès aux données d'un autre utilisateur.
6. Écris `docs/recettes/US-NNN.md` :

```
# Recette US-NNN : [titre]
Date : JJ/MM/AAAA. Version testée : [commit court].

| Critère | Verdict | Preuve |

## Cas difficiles vérifiés
## Défauts trouvés
## Verdict proposé : Acceptée / Refusée
## Décision du fondateur : [à remplir par le fondateur]
```

7. Le verdict final appartient au fondateur. Ne marque jamais la user story « Terminée » à sa place.

Aucun emoji, français simple.
