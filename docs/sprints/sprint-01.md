# Sprint 01 : « J'ouvre SPLEAD sur mon téléphone, elle s'installe et elle a le style Souffle »

Dates : du 26/10/2026 au 01/11/2026. Capacité : 14 points (estimation prudente pour un premier sprint, à corriger avec la vélocité réelle).

Contenu validé par le fondateur le 26/10/2026.

## User stories

| US | Titre | Points | État | Recette |
|---|---|---|---|---|
| US-005 | Vérification automatique de chaque modification | 3 | En recette | [PV](../recettes/US-005.md) : acceptée sous condition (première exécution sur GitHub) |
| US-007 | Système de design « Souffle » | 5 | En recette | [PV](../recettes/US-007.md) : acceptée avec une réserve (test automatique des 44 px) |
| US-001 | Installer SPLEAD sur Android | 3 | En recette | [PV](../recettes/US-001.md) : acceptée sous condition (essai sur téléphone) |
| US-003 | Ouvrir SPLEAD sans réseau | 3 | En recette | [PV](../recettes/US-003.md) : acceptée sous condition (vrai mode avion sur téléphone) |

Une user story ne passe « Terminée » qu'après la décision du fondateur dans son procès-verbal.

## Blocages

| Date | Ce qui bloque | Qui peut débloquer |
|---|---|---|
| 26/10/2026 | US-005 : sans dépôt GitHub, l'intégration continue ne peut pas tourner sur GitHub (vérifiée en local en attendant) | Le fondateur (créer `mmouctar34/splead`) |
| 26/10/2026 | US-001 et US-003 : la vérification finale demande un vrai téléphone Android et une adresse en ligne (préversion) | Le fondateur (téléphone), puis le déploiement (US-006) |
| 26/10/2026 | US-007 : sans les captures de `design/`, le système suit les couleurs, la police et les règles du brief, mais pas encore les écrans exacts | Le fondateur (captures) |

## Revue (26/10/2026)

Ce qui se démontre aujourd'hui, dans le navigateur de l'ordinateur :

- L'accueil SPLEAD au style Souffle, avec la navigation du bas à 4 onglets ([capture](../recettes/captures/sprint01-accueil-375px.jpg)).
- La page interne `/design` qui montre tout le système de design.
- L'application qui s'ouvre **alors que le serveur est coupé** (service worker).
- La vérification complète `npm run verifier` : analyse, 31 tests, construction, et 75,0 Ko chargés à l'ouverture (budget : 200 Ko).

Un défaut a été trouvé pendant la recette (débordement avec l'affichage agrandi à 200 %) et corrigé dans le sprint.

## Rétrospective

- **Ce qui a bien marché** : le découpage par branche et par user story ; la recette a trouvé un vrai défaut avant le fondateur ; le budget de légèreté est largement respecté (75 Ko sur 200).
- **Ce qui a coincé** :
  - le garde-fou ECC demande une justification avant chaque nouveau fichier, ce qui a beaucoup ralenti ;
  - l'outil d'aperçu lisait la configuration de Madior : SPLEAD a désormais ses ports (5180 et 4180) ;
  - le cache npm abîmé, probablement par OneDrive ;
  - l'absence de téléphone et d'adresse en ligne empêche de clôturer les user stories.
- **Ce qu'on change au prochain sprint** : mettre en ligne une préversion très tôt (US-006), pour que chaque recette puisse se faire sur le téléphone du fondateur ; ajouter le test automatique des zones tactiles (US-042).

## Vélocité : 14 points livrés en recette sur 14 prévus ; points « terminés » à compter après la décision du fondateur
