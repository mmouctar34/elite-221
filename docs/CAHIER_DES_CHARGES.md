# SPLEAD : cahier des charges (MVP)

Version 1 (26 octobre 2026). Phase 3 du [processus](PROCESSUS.md). Le contexte, la promesse et les cibles sont dans [CADRAGE.md](CADRAGE.md) et [PROSPECTION.md](PROSPECTION.md) ; ce document dit **précisément ce que le MVP doit faire et comment on vérifiera qu'il le fait**.

---

## 1. Objet

Construire la première version (MVP) de SPLEAD : une **application web progressive (PWA)** d'entraînement quotidien à la prise de parole, avec analyse automatique de la voix et suivi par un coach humain.

**PWA, définition :** un site web qui s'installe sur l'écran d'accueil comme une application, s'ouvre en plein écran, fonctionne en partie sans réseau et peut envoyer des notifications. Un seul code sert à la fois Android, iPhone et ordinateur.

## 2. Objectif mesurable du MVP

Répondre à une question : **les apprenants reviennent-ils s'entraîner plusieurs fois par semaine ?** On le mesure pendant la bêta fermée, avec les indicateurs du [CADRAGE § 9](CADRAGE.md).

## 3. Les acteurs

| Acteur | Description |
|---|---|
| Visiteur | Personne qui ouvre le lien sans compte |
| Apprenant | Personne inscrite qui s'entraîne |
| Coach | Suit les apprenants qui lui sont attribués (au lancement : le fondateur) |
| Administrateur | Le fondateur : gère le contenu, les rôles et les quotas |
| Système | Tâches automatiques : analyse, suppression des audios, calcul des séries |

## 4. Exigences fonctionnelles

Chaque exigence a un identifiant `EF-NN` et renvoie à une épopée du [backlog](BACKLOG.md). Le détail (user stories et critères d'acceptation) est dans le backlog.

| ID | Exigence | Épopée | Priorité |
|---|---|---|---|
| EF-01 | L'application s'installe sur l'écran d'accueil (Android, et iPhone via Safari) et s'ouvre en plein écran | E-01 | Indispensable |
| EF-02 | L'application s'ouvre et affiche le contenu déjà téléchargé sans réseau | E-01 | Indispensable |
| EF-03 | Inscription et connexion par compte Google ou par code reçu par e-mail | E-03 | Indispensable |
| EF-04 | À l'inscription : prénom, objectif principal, consentement explicite à l'enregistrement de la voix | E-03 | Indispensable |
| EF-05 | Suppression du compte et de toutes les données, depuis l'application | E-03, E-10 | Indispensable |
| EF-06 | 3 modules de 4 leçons, avec texte court, principe clé et cas pratique, débloqués dans l'ordre | E-04 | Indispensable |
| EF-07 | Téléchargement d'un module pour le lire hors-ligne ; mode Éco-data | E-04 | Indispensable |
| EF-08 | Séance de 60 secondes : sujet, chrono, onde sonore, pause, fin | E-05 | Indispensable |
| EF-09 | Une séance enregistrée sans réseau part automatiquement plus tard, et l'envoi reprend après une coupure | E-05 | Indispensable |
| EF-10 | Analyse : résumé, Structure, Voix, Impact, tics comptés, point fort, priorité, avec les points forts en premier | E-06 | Indispensable |
| EF-11 | Quota de séances par jour, réglable par l'administrateur sans republier | E-05 | Indispensable |
| EF-12 | Progrès : série de jours, statistiques, courbe des tics | E-07 | Important |
| EF-13 | Mon coach : prochain meet avec « Rejoindre », retours et objectifs, historique, message écrit | E-08 | Important |
| EF-14 | Espace coach : liste des apprenants avec statut et filtres, fiche apprenant, planification d'un meet, retours et objectifs | E-09 | Important |
| EF-15 | Statistiques globales et coût de l'IA, visibles par l'administrateur | E-09 | Important |
| EF-16 | Export des données de l'apprenant ; suppression automatique des audios au bout de 90 jours | E-10 | Indispensable |
| EF-17 | Origine des inscrits (QR code, WhatsApp, réseaux sociaux…) | E-10 | Souhaitable |

## 5. Exigences non fonctionnelles

| ID | Domaine | Exigence vérifiable |
|---|---|---|
| ENF-01 | Appareils | Fonctionne sur Chrome pour Android sur un téléphone de 2 Go de RAM, et sur Safari pour iPhone (iOS 16.4 ou plus récent pour les notifications) |
| ENF-02 | Légèreté | Code chargé à la première ouverture : 200 Ko compressés au maximum (objectif), mesuré à chaque construction |
| ENF-03 | Rapidité | Premier affichage en moins de 3 secondes en 4G et en moins de 6 secondes en 3G simulée (objectifs, mesurés avec Lighthouse) |
| ENF-04 | Hors-ligne | Après une première visite : ouverture, lecture des modules téléchargés et enregistrement d'une séance sans réseau |
| ENF-05 | Données mobiles | Séance de 60 secondes : environ 250 Ko au maximum à l'envoi ; aucun téléchargement automatique en Éco-data |
| ENF-06 | Sécurité | Règles d'accès par ligne sur toutes les tables ; tests de sécurité automatiques ; aucune clé secrète dans le navigateur ; IA et paiements appelés uniquement depuis le serveur |
| ENF-07 | Données personnelles | Consentement versionné ; audios privés (liens signés de 5 minutes) ; suppression au bout de 90 jours ; export et suppression sur demande |
| ENF-08 | Accessibilité | Zones tactiles de 44 px minimum, contrastes conformes au niveau AA des règles WCAG, libellés sur tous les boutons-icônes, utilisable avec le texte agrandi à 200 % |
| ENF-09 | Langue | Tout le texte de l'interface dans des fichiers de traduction (français), prêts pour le wolof |
| ENF-10 | Qualité | TypeScript strict ; tests automatiques ; chaque modification vérifiée par l'intégration continue avant fusion |
| ENF-11 | Fiabilité | 99 % des sessions sans erreur bloquante pendant la bêta (mesuré avec Sentry) |
| ENF-12 | Design | Fidèle au style « Souffle » (couleurs, police, arrondis, icônes Lucide, aucun emoji, aucun orange ni rouge) |

## 6. Contraintes

- **Technique** : PWA (React, TypeScript, Vite), Supabase, Cloudflare Pages. Voir [ARCHITECTURE.md](ARCHITECTURE.md) et [l'ADR-001](adr/ADR-001-pwa.md).
- **Budget** : 0 FCFA de coût fixe pendant le développement ; le budget de la bêta est `[À COMPLÉTER]`.
- **Juridique** : loi n° 2008-12 et démarches auprès de la CDP avant la bêta ouverte.
- **Contenu** : textes originaux, saisis en base, modifiables sans republier.

## 7. Hors du périmètre du MVP

Arène et classement, notifications push, badges, certificat, paiement, publication sur Google Play et l'App Store, wolof, débats en duel. Ils sont dans le backlog, épopées E-11 à E-14.

## 8. Livrables

1. La PWA en ligne (préproduction pour la bêta, puis production sur accord).
2. Le code source dans le dépôt GitHub, avec ses tests.
3. Les migrations de la base et les tests de sécurité.
4. La documentation à jour, les fiches de sprint, les procès-verbaux de recette et les rapports.

## 9. Recette

Chaque user story est recettée avec la commande `/recette` (procès-verbal dans `docs/recettes/`). Le MVP est accepté quand :

1. toutes les user stories « Indispensable » sont acceptées par le fondateur ;
2. les ENF-01 à ENF-08 sont mesurées et conformes ;
3. 5 bêta-testeurs ont fait au moins 3 séances chacun sans blocage.

## 10. Glossaire

| Mot | Définition simple |
|---|---|
| MVP | Première version, avec le minimum utile pour apprendre si le produit plaît |
| PWA | Site web installable comme une application (voir § 1) |
| Service worker | Petit programme du navigateur qui garde l'application en mémoire pour qu'elle marche sans réseau |
| User story | Besoin écrit du point de vue de l'utilisateur : « En tant que…, je veux…, afin de… » |
| Critère d'acceptation | Condition vérifiable qui dit quand une user story est réussie |
| Recette | Vérification finale qu'une fonctionnalité fait exactement ce qui était demandé |
| Règle d'accès par ligne (RLS) | Règle de la base de données qui empêche chacun de voir les données des autres |
| Sprint | Période courte (1 semaine) pendant laquelle on construit un petit lot de user stories |
