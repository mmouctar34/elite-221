# SPLEAD : architecture technique

Statut : **validé par le fondateur le 17 octobre 2026 ; passage à la PWA validé le 26 octobre 2026** ([ADR-001](adr/ADR-001-pwa.md)).
Version : 2 (26 octobre 2026). À lire après [CADRAGE.md](CADRAGE.md).

Ce document explique **avec quoi** l'application sera construite et **pourquoi**. Chaque choix est résumé en une phrase simple, puis détaillé pour le développeur.

Les prix indiqués datent du 17 octobre 2026. Ceux marqués « à vérifier » viennent de mes connaissances et non d'une page officielle consultée aujourd'hui : il faudra les confirmer avant d'engager de l'argent.

---

## 1. Vue d'ensemble

```
 Téléphone Android ou iPhone, ou ordinateur (PWA installée, hébergée sur Cloudflare Pages)
 ├─ Leçons enregistrées sur le téléphone (lecture hors-ligne, service worker et IndexedDB)
 ├─ Enregistrement de la voix (fichier compressé, environ 250 Ko par minute)
 └─ File d'attente : envoi dès que le réseau revient, reprise si coupure
          │
          ▼
 Supabase (serveur)
 ├─ Comptes et connexion
 ├─ Base de données Postgres, avec des règles d'accès par ligne
 ├─ Stockage privé des enregistrements (suppression automatique au bout de 90 jours)
 └─ Fonctions serveur (seul endroit où se trouvent les clés secrètes)
      ├─ analyser-seance : transcription, mesures, analyse par l'IA, enregistrement du résultat
      ├─ calculer-score-arene (v1.1)
      ├─ paiement-webhook (v1.1)
      └─ verifier-certificat (v1.1, page publique)
          │
          ├──> Service de transcription (voix vers texte) : choisi après essai, voir § 5
          ├──> Claude (Anthropic) : analyse du texte, voir § 6
          ├──> Web Push (standard des navigateurs) : notifications (v1.1)
          ├──> Resend : e-mails (confirmation, reçus)
          └──> Sentry : suivi des plantages
```

**La règle d'or :** le téléphone ne parle jamais directement à l'IA ni au paiement. Il passe toujours par une fonction serveur. Ainsi, aucune clé secrète n'est dans l'application, et personne ne peut tricher en modifiant son téléphone.

## 2. L'application : une PWA

**Décision du 26 octobre 2026 : SPLEAD est d'abord une PWA** (application web installable). La comparaison avec Flutter, les raisons et les risques sont dans [l'ADR-001](adr/ADR-001-pwa.md). En résumé : 0 FCFA de store au départ, un seul code pour Android, iPhone et ordinateur, des compétences déjà connues de l'équipe (TypeScript, React), et aucun outil à installer.

**Bibliothèques prévues** (à confirmer au sprint 1, en vérifiant leur taille et qu'elles sont entretenues) :

| Besoin | Outil |
|---|---|
| Langage et construction | TypeScript strict, React, Vite |
| Installation et hors-ligne | `vite-plugin-pwa` (Workbox) : manifeste et service worker |
| Navigation | React Router |
| Données du serveur, cache | `@supabase/supabase-js`, TanStack Query |
| Base locale (leçons hors-ligne, file d'envoi) | IndexedDB, via Dexie |
| Enregistrement audio | API MediaRecorder du navigateur (Opus/WebM sur Chrome, AAC/MP4 sur Safari : le serveur accepte les deux) |
| Envoi reprenable | `tus-js-client` (protocole TUS, accepté par Supabase Storage) |
| Traductions | Fichiers JSON par langue et une petite fonction de traduction (une bibliothèque seulement si la taille le permet) |
| Icônes | `lucide-react`, trait de 2,2, en n'important que les icônes utilisées |
| Police | Plus Jakarta Sans **hébergée avec l'application** (graisses 500 à 800, caractères latins seulement), jamais chargée depuis Google au lancement |
| Tests | Vitest et Testing Library (unitaires), Playwright (de bout en bout), axe (accessibilité) |
| Suivi des erreurs | Sentry pour navigateur, chargé après l'affichage |
| Hébergement | Cloudflare Pages : une préversion par branche, la production seulement sur accord |

**Budget de légèreté :** 200 Ko compressés au maximum pour le code chargé à la première ouverture, vérifié par l'intégration continue. Les écrans du coach et les écrans rarement utilisés sont chargés seulement quand on les ouvre.

## 3. Le serveur : Supabase

**Pourquoi :** un seul service fournit la base de données, la connexion des comptes, le stockage privé des fichiers, les fonctions serveur et les règles d'accès. L'équipe le connaît déjà (Madior Insight l'utilise).

- **Projets séparés** : un projet `splead-dev` pour développer et tester, et un projet `splead-prod` pour les vrais apprenants. Aucune donnée réelle dans `dev`. L'environnement de test passera par une branche Supabase ou un troisième projet, selon le coût (à décider au jalon J6).
- **Région** : Europe (Paris ou Francfort, selon ce qui est proposé), la plus proche de Dakar parmi celles disponibles. Elle facilite aussi la question du transfert des données (§ 10).
- **Fonctions serveur** : en TypeScript (moteur Deno de Supabase). Le kit officiel d'Anthropic y fonctionne.
- **Tâches planifiées** (`pg_cron`) : suppression des audios de plus de 90 jours, remise à zéro de l'Arène chaque lundi, calcul du statut « À relancer », rappels.
- **Prix** : formule gratuite pour `dev`. Pour `prod`, formule Pro à environ 25 $ par mois (à vérifier) : la formule gratuite met le projet en pause après quelques jours sans activité, ce qui ne convient pas à une application en ligne.

## 4. Le parcours d'une séance (le cœur de l'application)

1. **Avant l'enregistrement** : l'application demande au serveur s'il reste des séances dans le quota du jour. Sans réseau, elle laisse enregistrer et vérifiera à l'envoi.
2. **Enregistrement** : 60 secondes, en mono et à bas débit (Opus ou AAC, environ 32 kbit/s), soit environ 250 Ko par minute. Le fichier est rangé sur le téléphone avec le statut `en_attente_envoi`.
3. **Envoi** : dès qu'il y a du réseau, l'envoi passe par un protocole reprenable (TUS, accepté par Supabase Storage). Si la connexion coupe à 70 %, il reprend à 70 %, pas à zéro.
   - Le fichier est rangé à `enregistrements/{id_utilisateur}/{id_seance}.ogg`, dans un espace privé.
   - En mode « Éco-data », l'envoi attend le Wi-Fi, sauf si l'apprenant appuie sur « Envoyer maintenant ».
4. **Analyse** : l'arrivée du fichier déclenche la fonction `analyser-seance`, qui :
   1. vérifie le quota et que la séance appartient bien à l'utilisateur ;
   2. envoie l'audio au service de transcription, qui renvoie le texte et l'heure de chaque mot ;
   3. calcule elle-même les mesures fiables (débit, pauses, tics comptés), sans IA ;
   4. envoie à Claude **le texte et ces mesures uniquement**, ni l'audio, ni le nom, ni le numéro ;
   5. reçoit une analyse au format imposé (résumé, 3 axes, point fort, priorité) ;
   6. enregistre l'analyse et le coût réel de la séance.
5. **Retour à l'apprenant** : le statut passe à `analysee` et l'écran Analyse s'affiche (mise à jour en direct). Pendant le traitement, l'écran montre une progression : « Envoi… », « Écoute… », « Analyse… ».
6. **En cas d'échec** : statut `echec`, nouvel essai automatique (3 au maximum), puis un message clair. Une séance échouée ne compte pas dans le quota.

**Statuts d'une séance :** `en_attente_envoi` (sur le téléphone) → `envoyee` → `en_analyse` → `analysee` ou `echec`.

## 5. La transcription (voix vers texte)

C'est **le plus gros risque technique** du projet. Il se règle par un essai, pas sur le papier.

**Ce que l'outil doit faire :**

1. Bien comprendre le français parlé au Sénégal.
2. **Garder les « euh » et les hésitations**. Beaucoup d'outils les effacent par défaut, et certains ne savent les garder qu'en anglais (c'est le cas annoncé pour Deepgram).
3. Donner l'heure de chaque mot, pour mesurer le débit et les pauses.
4. Selon la réponse à la question ouverte n° 6 : supporter le mélange français-wolof.
5. Coûter peu : l'ordre de grandeur du marché est de 0,3 à 1 centime de dollar par minute (à vérifier).

**Candidats à tester :** ElevenLabs Scribe, AssemblyAI, Deepgram, la transcription d'OpenAI et Google Speech. Aucune documentation consultée ne garantit le comportement sur le « euh » français ni le support du wolof : seul l'essai tranchera.

**L'essai (dès le jalon J1)** : 20 enregistrements réels de 60 secondes (voix d'hommes et de femmes, accents variés, avec des « euh » volontaires, et quelques passages en wolof si besoin). Je compare, pour chaque outil, les « euh » détectés à ceux comptés à l'oreille, les mots mal compris et le prix. Le choix est noté dans un document de décision.

**Si aucun outil ne garde bien les « euh »** : plan B, une détection des hésitations directement dans le son (sons longs sans mot). C'est moins précis ; il faudrait alors présenter le chiffre comme une estimation.

## 6. L'analyse par l'IA : Claude

- **Appel uniquement depuis la fonction serveur**, avec le kit officiel `@anthropic-ai/sdk`. La clé est stockée dans les secrets Supabase.
- **Réponse au format imposé** (sortie structurée) : le serveur reçoit toujours les mêmes champs, jamais du texte libre à décortiquer.
- **Consignes données à l'IA** : tutoiement, bienveillance, points forts d'abord, une seule priorité, aucun emoji. Elle ne donne jamais de chiffre que le serveur n'a pas mesuré : les tics et le débit viennent du calcul, pas de l'IA.
- **Le choix du modèle vous revient.** Il dépend surtout du budget. Estimation pour une séance de 60 secondes (environ 1 500 éléments de texte, ou « jetons », envoyés et 1 500 à 2 000 reçus, réflexion comprise) :

| Modèle | Prix pour 1 million de jetons envoyés / reçus | Coût d'une analyse (estimation) | Pour 20 000 séances par mois |
|---|---|---|---|
| Claude Opus 5.5 (le plus capable) | 4 $ / 20 $ | environ 0,04 à 0,05 $ | environ 800 à 1 000 $ |
| Claude Sonnet 5.5 | 2 $ / 10 $ | environ 0,02 à 0,025 $ | environ 400 à 500 $ |
| Claude Haiku 5.5 (le plus économique) | 0,10 $ / 0,50 $ | environ 0,001 $ | environ 20 à 30 $ |

**Ma proposition :** au jalon J3, faire analyser les mêmes 20 enregistrements par les trois modèles, puis **vous** comparez les retours à l'aveugle. Si le modèle le moins cher donne des retours aussi justes et aussi bienveillants, on le prend ; sinon, on prend le moins cher de ceux qui donnent satisfaction. Le système enregistre le modèle utilisé pour chaque analyse, ce qui permet d'en changer plus tard sans rien casser.

## 7. Les données (point de départ)

Toutes les tables ont des règles d'accès par ligne (§ 8). Les noms techniques sont en anglais, comme dans le brief ; les explications sont en français.

| Table | Contenu principal | Qui peut lire |
|---|---|---|
| `profiles` | prénom, objectif, langue, mode éco-data, fuseau horaire | soi-même ; ses coachs |
| `user_roles` | rôle (`learner`, `coach`, `admin`), **séparé du profil** | soi-même (lecture seule) ; modifiable uniquement par le serveur |
| `coach_assignments` | quel coach suit quel apprenant | le coach et l'apprenant concernés |
| `consents` | type (enregistrement vocal, conditions, notifications), version du texte, date, retrait éventuel | soi-même |
| `modules` | titre, ordre, langue, publié ou non | tout le monde (contenu publié) |
| `lessons` | module, ordre, texte court, principe clé, langue, version | tout le monde (contenu publié) |
| `practice_cases` | leçon, consigne, durée, scénario, « cas final du module » | tout le monde (contenu publié) |
| `lesson_progress` | leçon terminée, date, cas pratique validé | soi-même ; ses coachs |
| `sessions` | scénario, sujet, durée, chemin du fichier audio, statut, date de suppression de l'audio | soi-même ; ses coachs |
| `analyses` | séance, résumé, 3 axes (notes et commentaires), tics (JSON), débit, pauses, point fort, priorité, modèle utilisé | soi-même ; ses coachs |
| `ai_usage` | séance, service, durée audio, jetons, coût | serveur et administrateur uniquement |
| `daily_quotas` | utilisateur, jour, séances utilisées | soi-même (lecture) ; modifiable par le serveur |
| `streaks` | série actuelle, meilleure série, dernier jour actif | soi-même ; ses coachs |
| `coach_notes` | retour ou objectif, auteur, apprenant, date | l'apprenant concerné ; ses coachs |
| `messages` | message écrit entre apprenant et coach (texte seulement) | les deux personnes concernées |
| `meetings` | apprenant, coach, date et heure, lien Google Meet, statut | les deux personnes concernées |
| `push_tokens` (v1.1) | identifiant de notification du téléphone | soi-même |
| `badges`, `user_badges` (v1.1) | badges gagnés | soi-même ; ses coachs |
| `challenges` (v1.1) | défi de la semaine, sujet, début, fin | tout le monde |
| `leagues` (v1.1) | ligue d'une semaine (30 personnes au maximum, réglable) | ses membres |
| `challenge_entries` (v1.1) | séance, semaine, ligue, **score calculé par le serveur** | soi-même ; classement via une vue limitée |
| `payments` (v1.1) | montant en FCFA, moyen de paiement, référence du prestataire, statut | soi-même ; administrateur |
| `certificates` (v1.1) | code unique, apprenant, date, module ou parcours | soi-même ; vérification publique limitée (§ 9) |

**Pour la traduction :** chaque contenu porte une colonne `locale` (`fr`, plus tard `wo`). Les textes de l'interface sont dans des fichiers de traduction, jamais écrits en dur dans les écrans.

## 8. Sécurité

Les règles, et ce qu'elles empêchent concrètement :

1. **Règles d'accès par ligne sur toutes les tables, sans exception.** Un apprenant ne voit que ses données ; un coach ne voit que les apprenants qui lui sont attribués.
2. **Le rôle est rangé à part et seul le serveur peut le modifier.** Leçon tirée de la faille corrigée sur Madior Insight le 17 octobre 2026 : un utilisateur ne doit jamais pouvoir modifier une colonne qui lui donne des droits ou des points.
3. **Les scores, quotas, séries, badges et paiements sont calculés uniquement par le serveur.** Le téléphone ne peut qu'afficher.
4. **Le classement passe par une vue qui n'expose que le prénom, le score et le rang.** Ni le nom complet, ni le numéro, ni l'audio.
5. **Les audios restent privés.** On les écoute seulement par un lien signé valable 5 minutes, réservé au propriétaire et à son coach.
6. **Limitation de débit** sur chaque fonction serveur (par utilisateur et par minute), en plus du quota journalier de séances.
7. **Aucun secret dans le dépôt.** Les clés sont dans les secrets Supabase et les variables d'intégration continue ; un fichier `.env.example` liste les noms sans les valeurs.
8. **Tests de sécurité automatiques après chaque changement de la base.** Un jeu de tests vérifie qu'un apprenant A ne peut ni lire ni modifier les données d'un apprenant B, ni changer son rôle ou son score. Ces tests bloquent la mise en ligne s'ils échouent.
9. **Paiements** : un paiement n'est validé qu'après confirmation signée du prestataire (signature vérifiée) **et** une vérification du statut auprès de lui. Le retour du navigateur ou de l'application ne suffit jamais.

## 9. Certificat vérifiable (v1.1)

- Un code unique de 10 caractères, sans lettres ambiguës (pas de O/0 ni de I/1), par exemple `SPL-7K4M-Q9XA`.
- Une **page publique de vérification** : on saisit le code et elle affiche le prénom, l'initiale du nom, le parcours validé et la date. Rien d'autre. Elle fait partie de la PWA, à une adresse publique du type `/verifier`, sur un nom de domaine `[À COMPLÉTER]`.
- Le certificat est délivré après le quiz final. Il est éventuellement payant, selon le modèle économique (voir CADRAGE § 7).

## 10. Données personnelles et loi sénégalaise

Ce que j'ai vérifié (17 octobre 2026) : le texte en vigueur reste la **loi n° 2008-12 du 25 janvier 2008** sur la protection des données à caractère personnel. L'autorité compétente est la **CDP** (Commission de Protection des Données Personnelles). Une réforme est annoncée depuis 2019, mais je n'ai trouvé aucune confirmation de son adoption.

Ce que cela implique pour SPLEAD :

1. **Démarche auprès de la CDP avant la bêta** : déclarer le traitement (enregistrements vocaux, données d'apprentissage) et demander l'autorisation de transférer des données hors du Sénégal. Les serveurs Supabase sont en Europe, et les services d'IA et de transcription sont à l'étranger. La CDP examine notamment où sont les serveurs et quelles garanties sont offertes. **À faire valider par un juriste** : je ne suis pas juriste, ceci est un repérage et non un avis juridique.
2. **Consentement explicite à l'inscription**, séparé des conditions d'utilisation : « J'accepte que ma voix soit enregistrée et analysée pour me donner un retour. » On peut le retirer à tout moment.
3. **Conservation** : audio supprimé automatiquement au bout de 90 jours ; analyses écrites conservées tant que le compte existe ; tout est supprimé à la fermeture du compte.
4. **Suppression sur demande**, depuis l'application, en un geste, avec confirmation. Un export des données est aussi possible.
5. **Minimisation** : l'IA ne reçoit que le texte transcrit, sans nom ni numéro. On choisira des prestataires qui n'utilisent pas les données pour entraîner leurs modèles (à vérifier dans leurs conditions au moment du choix).
6. **Liste des sous-traitants** publiée dans la politique de confidentialité : Supabase, Cloudflare (hébergement), le service de transcription choisi, Anthropic, Resend, Sentry, le prestataire de paiement.

## 11. Hors-ligne et économie de données

- **Leçons** : téléchargées par module (texte et petites images compressées, quelques centaines de Ko), puis lues sans réseau. Un bouton « Télécharger pour le hors-ligne » par module.
- **Séances** : enregistrables sans réseau ; elles partent toutes seules plus tard.
- **Éco-data** (bouton visible dans l'en-tête) : pas de téléchargement automatique, envoi des audios en Wi-Fi uniquement (sauf « Envoyer maintenant »), images en qualité réduite, pas d'audio d'exemple en lecture automatique.
- **Synchronisation** : pour le contenu des leçons, c'est la version du serveur qui fait foi. Les séances et la progression sont ajoutées par le téléphone et jamais écrasées.
- **Taille de l'application** : 200 Ko compressés au maximum à la première ouverture, vérifié à chaque construction ; aucune grosse image ; police limitée aux graisses utilisées.
- **Stockage sur le téléphone** : l'application demande au navigateur un stockage persistant, pour que les leçons et les séances en attente ne soient pas effacées (important sur iPhone, voir l'ADR-001).

## 12. Notifications et rendez-vous

- **Rappels de série et de rendez-vous** (v1.1) : envoyés par le serveur avec Web Push, le standard des navigateurs (gratuit, sans Firebase). Sur iPhone, cela demande iOS 16.4 ou plus récent et une PWA installée. Rappel de rendez-vous la veille et une heure avant. L'heure du rappel de série est choisie par l'apprenant.
- **Rendez-vous** : le coach crée l'événement Google Meet lui-même, puis colle le lien et la date dans l'Espace coach. Le bouton « Rejoindre » ouvre Google Meet. Pas de visio dans l'application.

## 13. Paiement mobile (v1.1, après la décision du CADRAGE § 7)

| Option | Avantage | Inconvénient (sources non officielles, à vérifier) |
|---|---|---|
| Wave en direct (API Business) | Le moins cher, autour de 1 % | Clients Wave uniquement ; compte marchand nécessaire (NINEA, RCCM) |
| Orange Money en direct | Large public | Plus cher, autour de 3,5 % ; intégration plus lourde |
| Agrégateur sénégalais (PayDunya, PayTech) | Une seule intégration pour Wave, Orange Money et la carte | Environ 2,4 à 2,8 % ; versement à quelques jours |
| Agrégateur régional (CinetPay) | Couvre plusieurs pays d'Afrique de l'Ouest | Environ 2,5 à 3,5 % |
| Paiement Google Play | Conforme au règlement Google Play à coup sûr | Commission Google ; moyens de paiement locaux à vérifier |

Les chiffres viennent de comparatifs en ligne d'un même blog commercial, pas des grilles officielles. **Je demanderai les grilles officielles et je comparerai avant de choisir.** L'intégration passera par une fonction serveur `paiement-webhook` qui reste la même quel que soit le prestataire : le changer ne touche pas l'application.

## 14. Qualité et outils de travail

- **TypeScript en mode strict** partout (application et fonctions serveur), avec ESLint : aucun avertissement accepté.
- **Tests** :
  - tests unitaires (calcul des tics, du débit, de la série) ;
  - tests d'écrans (widgets) et captures de référence pour le système de design ;
  - tests des fonctions serveur ;
  - tests de sécurité de la base (§ 8).
- **Intégration continue (GitHub Actions)** : à chaque envoi, analyse, tests et construction de l'application Android. Rien n'est fusionné si une étape échoue.
- **Branches** : `main` toujours stable, une branche par fonctionnalité, un commit clair par étape, sans emoji.
- **Suivi des plantages** : Sentry (formule gratuite au départ), sans données personnelles dans les rapports.
- **Suivi des coûts** : la table `ai_usage` plus un tableau simple dans l'Espace coach (coût du jour, de la semaine, coût moyen par séance).

## 15. Coûts estimés

**Coûts fixes** (à vérifier) :

| Poste | Coût |
|---|---|
| Compte développeur Google Play | 25 $, une seule fois, **facultatif** : seulement pour publier la PWA sur Google Play (TWA) |
| Supabase `prod` (formule Pro) | environ 25 $ par mois |
| Supabase `dev` | gratuit |
| Web Push (notifications) | gratuit |
| Hébergement Cloudflare Pages | gratuit (formule de base, à vérifier pour le volume) |
| Compte développeur Apple | 0 $ : pas d'App Store au début (ADR-001) |
| Resend | gratuit jusqu'à quelques milliers d'e-mails par mois |
| Sentry | gratuit au départ |
| GitHub (dépôt privé et intégration continue) | gratuit dans les limites de base |
| Nom de domaine (page de vérification des certificats) | `[À COMPLÉTER]` par an |

**Coût variable par séance de 60 secondes** = transcription (environ 0,003 à 0,01 $, à vérifier) + analyse (de 0,001 à 0,05 $ selon le modèle, § 6) + stockage (négligeable : environ 250 Ko, supprimé au bout de 90 jours).

**Le quota de séances découle du budget** : quota par jour et par apprenant = budget mensuel ÷ (coût d'une séance × nombre d'apprenants actifs × 30). Le budget de la bêta est `[À COMPLÉTER]` ; dès qu'il est connu, je calcule le quota et je le règle dans la base (modifiable sans republier).

## 16. Décisions à prendre (et quand)

| Décision | Qui | Avant |
|---|---|---|
| Valider ce document et le cadrage | Fondateur | J1 |
| Service de transcription | Essai technique + fondateur | J3 |
| Modèle Claude pour l'analyse | Fondateur, après comparaison à l'aveugle | J3 |
| Budget de la bêta, donc quota par jour | Fondateur | J6 |
| Démarches auprès de la CDP | Fondateur + juriste | J6 (bêta fermée) |
| Modèle économique et règle Google Play | Fondateur | J8 |
| Prestataire de paiement | Comparaison des grilles officielles + fondateur | J8 |
