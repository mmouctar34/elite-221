---
name: rapport
description: Écrit un rapport détaillé et pédagogique sur une étape, une journée ou un sprint de SPLEAD, pour que le fondateur suive l'avancement et apprenne en même temps. À utiliser quand le fondateur dit « fais un rapport », « /rapport » ou à la clôture d'un sprint.
---

# Rapport d'étape SPLEAD

Le fondateur est en apprentissage : un rapport doit lui permettre de **comprendre et de refaire**, pas seulement de constater.

## Étapes

1. Rassemble les faits : le Journal de `docs/FEUILLE_DE_ROUTE.md`, l'historique git depuis le dernier rapport (`git log --oneline`), les fiches de sprint et les procès-verbaux de recette concernés.
2. N'écris que ce qui s'est vraiment passé. Ce qui n'a pas été vérifié est dit comme tel.
3. Écris `docs/rapports/AAAA-MM-JJ-sujet-court.md` avec ce plan :

```
# Rapport : [sujet]
Date : JJ/MM/AAAA. Période couverte : ... Commits : [premier]..[dernier]

## 1. En une phrase
## 2. Pourquoi c'était nécessaire
## 3. Ce qui a été fait, étape par étape
(avec les commandes utilisées dans des blocs de code, et ce que chacune fait)
## 4. Ce qu'il faut retenir
(3 à 6 notions, chacune avec un mot du métier en gras et sa définition simple)
## 5. Ce qui a coincé et comment c'était réglé
## 6. Décisions prises (et par qui)
## 7. Ce qui reste à faire
## 8. Pour aller plus loin
(1 ou 2 ressources fiables : documentation officielle de préférence)
```

4. Ajoute le rapport à la liste de `docs/rapports/README.md`, en le créant s'il n'existe pas : une ligne par rapport, avec la date, le sujet et un lien.

Français simple, aucun emoji, phrases courtes.
