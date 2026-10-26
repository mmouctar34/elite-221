# Rapport : refonte des écrans selon le design validé

Date : 26/10/2026. Commits : `cb019e6` à celui de ce rapport.

## 1. En une phrase

Les 10 écrans de SPLEAD reproduisent maintenant fidèlement le design « SPLEAD Design » validé par le fondateur. Ils sont reliés entre eux et remplis avec des données d'exemple et les vrais textes de leçons du prototype. Ils ne sont pas encore en ligne : il faut d'abord connecter Vercel à GitHub.

## 2. Pourquoi c'était nécessaire

Le fondateur a jugé la première version « trop fade ». C'était fondé : le design de référence n'avait jamais été transmis dans cette session (le dossier `design/` était vide), et j'avais construit les écrans à partir des seules couleurs du brief. J'aurais dû insister pour obtenir les maquettes avant de coder.

## 3. Ce qui a été fait

1. **Design retrouvé** dans les artifacts Claude du fondateur (« SPLEAD Design », 11 écrans) et copié dans `design/maquettes-souffle/`, avec une note de référence.
2. **Publication GitHub Pages arrêtée** (le workflow `publication-pages.yml` est supprimé).
3. **Navigation** entre écrans (`src/navigation.tsx`), sans bibliothèque supplémentaire : le bouton retour d'Android fonctionne.
4. **10 écrans** dans `src/ecrans/`, avec les mesures de la maquette : Accueil, S'entraîner, Module, Leçon, Séance (vrai chrono de 60 secondes, pause, arrêt automatique), Analyse, Progrès (courbe dessinée en code), Arène, Mon coach, Espace coach (filtres qui fonctionnent).
5. **Données d'exemple** (`src/donnees/exemple.ts`) : textes des 4 leçons du module 1 repris du prototype et réécrits au tutoiement ; titres des modules 2 et 3 du prototype ; module 1 gratuit, modules 2 et 3 marqués « Abonnement ».
6. **Vérification** : 51 tests automatiques ; comparaison de chaque écran à la maquette dans le navigateur, à 390 × 844 ([captures](../recettes/captures/)) ; aucun débordement ; tous les boutons font au moins 44 px et ont un nom.

```bash
npm run verifier
```

(Analyse du code, 51 tests, construction, et mesure : 89 Ko à l'ouverture, pour un budget de 200 Ko.)

## 4. Ce qu'il faut retenir

- **Maquette de référence** : avant de coder un écran, on a la maquette sous les yeux. Sans elle, on invente, et le résultat ne correspond pas à ce que veut le fondateur.
- **Données d'exemple** : de fausses données réalistes permettent de voir et de valider les écrans avant que les comptes et la base existent. Elles sont regroupées dans un seul fichier, facile à remplacer.
- **Freemium** : une partie gratuite pour découvrir, une partie payante pour aller plus loin. La limite doit être vérifiée par le serveur, jamais seulement par l'écran.
- **Hébergeur** : GitHub Pages, Netlify et Vercel hébergent tous une PWA. La base de données est un service séparé (Supabase). Le choix porte sur les outils autour (préversions, fonctions serveur).

## 5. Ce qui a coincé

- **Netlify** : le connecteur n'était plus disponible dans la session. Le fondateur a choisi Vercel.
- **Vercel** refuse de lier le dépôt GitHub tant que le compte Vercel n'est pas connecté au compte GitHub du fondateur : action à faire par lui.
- **Taille de texte** : la maquette utilise 12 à 13 px pour les petites étiquettes, alors que le brief demandait 15 px minimum. J'ai suivi la maquette ; point à confirmer par le fondateur.
- **Leçons plus longues que sur la maquette** : les vrais textes du prototype font défiler la page ; le principe clé et le cas pratique arrivent après le texte.

## 6. Décisions prises (par le fondateur, le 26/10/2026)

Vercel à la place de Netlify (ADR-002) ; freemium provisoire (épopée E-17 du backlog) ; écrans d'abord, comptes ensuite.

## 7. Ce qui reste à faire

1. **Fondateur** : connecter Vercel à GitHub (voir le message de fin de session), puis je crée le projet `splead` et je publie.
2. **Fondateur** : confirmer la taille des petites étiquettes (12-13 px comme la maquette, ou 15 px comme le brief).
3. **Sprint suivant** : comptes (Google et code e-mail), freemium vérifié par le serveur, puis enregistrement réel de la voix.

## 8. Pour aller plus loin

- [Documentation Vercel : déployer depuis GitHub](https://vercel.com/docs/git/vercel-for-github)
