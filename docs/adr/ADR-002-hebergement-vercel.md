# ADR-002 : héberger SPLEAD sur Vercel

Date : 26 octobre 2026. Statut : **acceptée** par le fondateur. Remplace la publication de test sur GitHub Pages et l'hébergement Cloudflare Pages prévu dans l'ADR-001.

## 1. Le problème

La préversion sur GitHub Pages ne convenait pas au fondateur, qui veut un hébergement adapté à une vraie application commerciale (abonnements, comptes, base de données). Il a d'abord demandé Netlify, mais l'accès Netlify n'était pas disponible dans la session de travail.

**Précision utile** : GitHub Pages, Netlify et Vercel hébergent tous une PWA de la même façon. La base de données (Supabase) est un service séparé, joignable depuis n'importe lequel d'entre eux. La différence porte sur les outils autour : préversion par branche, fonctions serveur, réglages et nom de domaine.

## 2. Les options

| Option | Accès dans la session | Préversion par branche | Fonctions serveur | Coût au départ |
|---|---|---|---|---|
| GitHub Pages | Oui | Non | Non | 0 |
| Netlify | **Non** (connecteur absent ; connexion à faire par le fondateur) | Oui | Oui | 0 (formule gratuite) |
| **Vercel** | **Oui** (connecteur actif) | Oui | Oui | 0 (formule gratuite, à vérifier pour un usage commercial) |

## 3. La décision

**Vercel**, choisi par le fondateur le 26 octobre 2026 : un projet `splead` séparé, dans l'équipe Vercel existante, relié au dépôt GitHub `mmouctar34/elite-221`. Chaque envoi sur `main` met à jour la production ; chaque branche reçoit sa propre adresse de préversion (US-006). La configuration est dans `vercel.json`.

**En ligne depuis le 26/10/2026** : https://splead-two.vercel.app (adresse publique de production). Les adresses en `…-madior-insight.vercel.app` sont protégées par Vercel : seuls les membres de l'équipe Vercel peuvent les ouvrir.

## 4. Points d'attention

- **Liaison GitHub** : le compte Vercel doit d'abord être connecté au compte GitHub du fondateur (réglage du compte Vercel). Sans cela, Vercel refuse de lier le dépôt.
- **Usage commercial** : la formule gratuite de Vercel (« Hobby ») est prévue pour un usage non commercial. Avant de faire payer des abonnements, il faudra vérifier les conditions et passer, si nécessaire, à une formule payante `[À COMPLÉTER : prix à vérifier]`, ou revenir à Netlify ou Cloudflare.
- **Réversibilité** : l'application est une PWA standard. Changer d'hébergeur revient à reconfigurer la publication, sans toucher au code.
