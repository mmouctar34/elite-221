# Consignes pour Claude (SPLEAD)

Application mobile d'entraînement à la prise de parole (Android d'abord). Brief complet : [docs/BRIEF_INITIAL.md](docs/BRIEF_INITIAL.md).

## Avant de travailler

Lis [docs/CADRAGE.md](docs/CADRAGE.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) et [docs/FEUILLE_DE_ROUTE.md](docs/FEUILLE_DE_ROUTE.md). Le jalon en cours et les questions ouvertes y sont indiqués.

## Règles non négociables

1. **Le fondateur n'est pas développeur** : explique chaque choix en termes simples, en français.
2. **Rien n'est codé avant la validation écrite du cadrage (J0).** Ensuite, avance jalon par jalon.
3. **Ne devine ni les chiffres, ni les prix, ni les noms** : écris `[À COMPLÉTER]`.
4. **Petits jalons testables** : une branche par fonctionnalité, un commit clair par étape. Après chaque jalon : tests, linter, résumé en 5 lignes (ce qui marche, ce qui reste).
5. **Aucun secret dans le dépôt** : variables d'environnement, et `.env.example` sans valeurs.
6. **Aucun emoji nulle part** : ni dans l'interface, ni dans les textes, ni dans les commits.
7. **Contenu pédagogique original**, stocké en base de données. Rien de recopié depuis Internet.
8. **L'IA et les paiements sont appelés uniquement depuis les fonctions serveur.** Les scores, quotas et séries sont calculés par le serveur.
9. **Règles d'accès par ligne sur toutes les tables**, plus des tests de sécurité qui bloquent la mise en ligne s'ils échouent.
10. **À la fin de chaque session** : ajoute une ligne au Journal de `docs/FEUILLE_DE_ROUTE.md` et corrige ce qui est devenu faux dans les documents.

## Décisions prises (17 octobre 2026)

- Nom : **SPLEAD**. Dépôt : `Projet Senpai\SPLEAD`, futur dépôt GitHub privé `mmouctar34/splead`.
- Un seul coach au lancement, mais la base prévoit plusieurs coachs.
- Audio supprimé au bout de 90 jours ; analyses conservées tant que le compte existe.
- Textes du prototype `elite-221` réutilisés après réécriture (tutoiement, sans emoji, corrections Mehrabian et posture de pouvoir).
- Cadrage, architecture et feuille de route **validés par le fondateur le 17 octobre 2026**. Stack : Flutter, Supabase, transcription choisie après essai, Claude pour l'analyse.

## Design « Souffle »

- Aéré, très arrondi, calme : cartes blanches sur fond lavande, grand bouton micro rond au centre de la séance.
- Couleurs :
  - Nuit `#1E1B4B` (texte, fonds sombres) ;
  - Indigo `#4F46E5` (marque) ;
  - Turquoise `#2DD4BF` (actions, avec texte `#1E1B4B`) ;
  - Brume `#E4E0FF` (pastilles) ;
  - Fond `#F3F1FF` ;
  - Blanc `#FFFFFF` ;
  - texte secondaire `#4B4A6B`.
  - Aucun orange ni rouge.
- Police Plus Jakarta Sans (500 à 800), incluse dans l'application ; texte de 15 px minimum.
- Icônes Lucide, trait de 2,2. Zones tactiles de 44 px minimum, contrastes suffisants, libellés sur les boutons-icônes.
- Navigation du bas : Accueil, S'entraîner, Progrès, Profil.
- Captures de référence dans `design/`. D'abord le système de design, ensuite les écrans.

## Contraintes terrain

- Fonctionne bien avec 2 Go de RAM.
- Leçons lisibles hors-ligne, envoi reprenable, audio compressé, application la plus petite possible.
- Bouton Éco-data.
- Prix en FCFA ; paiement par Wave ou Orange Money, sous réserve de la règle Google Play (CADRAGE § 7).
- Loi n° 2008-12 et CDP : consentement explicite, stockage privé, suppression sur demande.
