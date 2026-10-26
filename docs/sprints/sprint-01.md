# Sprint 01 : « J'ouvre SPLEAD sur mon téléphone, elle s'installe et elle a le style Souffle »

Dates : du 26/10/2026 au 01/11/2026. Capacité : 14 points (estimation prudente pour un premier sprint, à corriger avec la vélocité réelle).

Contenu validé par le fondateur le 26/10/2026.

## User stories

| US | Titre | Points | État | Recette |
|---|---|---|---|---|
| US-005 | Vérification automatique de chaque modification | 3 | Acceptée sous condition | [PV](../recettes/US-005.md) |
| US-007 | Système de design « Souffle » | 5 | Acceptée sous condition | [PV](../recettes/US-007.md) |
| US-001 | Installer SPLEAD sur Android | 3 | Acceptée sous condition | [PV](../recettes/US-001.md) |
| US-003 | Ouvrir SPLEAD sans réseau | 3 | Acceptée sous condition | [PV](../recettes/US-003.md) |

Décision du fondateur, le 26/10/2026 : « J'accepte les 4 user stories du sprint 1 avec leurs conditions. »

## Conditions à lever

Chaque user story passera « Terminée » quand sa condition sera levée et prouvée (preuve ajoutée à son procès-verbal).

| US | Condition | Dépend de | État |
|---|---|---|---|
| US-005 | Première exécution réelle de la vérification sur GitHub ; protection de `main` activée | Dépôt GitHub (finalement `mmouctar34/elite-221`) | Première exécution **réussie** le 26/10/2026 ; protection de `main` à activer par le fondateur |
| US-007 | Le contrôle des 44 px et du débordement devient un test automatique | US-042 | À faire |
| US-001 | Installation réussie sur un vrai téléphone Android | Téléphone du fondateur ; la préversion est en ligne depuis le 26/10/2026 : https://mmouctar34.github.io/elite-221/ | Prêt pour l'essai |
| US-003 | Ouverture en vrai mode avion sur un téléphone Android | Téléphone du fondateur ; même adresse | Prêt pour l'essai |

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

## Vélocité : 14 points acceptés (sous condition) sur 14 prévus

Pour planifier le sprint 2, on retient une capacité de 14 points. Les conditions ci-dessus seront traitées en priorité.
