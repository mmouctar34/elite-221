# SPLEAD : feuille de route

Statut : **validé par le fondateur le 17 octobre 2026.** Jalon en cours : **J1 – Fondations**.
Version : 1 (17 octobre 2026). À lire avec [CADRAGE.md](CADRAGE.md) et [ARCHITECTURE.md](ARCHITECTURE.md).

Chaque jalon donne quelque chose qu'on peut **essayer sur un téléphone**. À la fin de chaque jalon : tests, analyse du code (linter), et un résumé en 5 lignes de ce qui marche et de ce qui reste.

Je n'indique pas de durée : elle dépend du temps disponible pour les relectures et les essais. Je pourrai l'estimer de façon réaliste après le jalon J1.

---

## J0 – Cadrage (en cours)

- **Livrables** : `CADRAGE.md`, `ARCHITECTURE.md`, `FEUILLE_DE_ROUTE.md`.
- **Terminé quand** : le fondateur a écrit « validé » (avec ou sans corrections).
- **Ce que le fondateur fournit** : relecture, réponses aux questions ouvertes si possible.

## J1 – Fondations

Plan détaillé : [J1_FONDATIONS.md](J1_FONDATIONS.md). Protocole de l'essai : [ESSAI_TRANSCRIPTION.md](ESSAI_TRANSCRIPTION.md).

- **Livrables** :
  - Dépôt GitHub privé `mmouctar34/splead`, intégration continue (analyse, tests, construction Android).
  - Projets Supabase `splead-dev` et `splead-prod`, avec les premières tables, leurs règles d'accès et les tests de sécurité.
  - **Système de design** : couleurs, police, espacements, arrondis, boutons, cartes, pastilles, champ de saisie, gros bouton micro, barre de navigation du bas, écran de chargement, écran d'erreur. Le tout est visible sur une page de démonstration interne.
  - Navigation du bas : Accueil, S'entraîner, Progrès, Profil (écrans vides pour l'instant).
  - Inscription et connexion, prénom et objectif, **consentement à l'enregistrement de la voix**, suppression du compte.
  - Traductions en place (français), prêtes pour le wolof.
  - **Essai de transcription** (voir ARCHITECTURE § 5) : 20 enregistrements réels, comparaison des outils, choix noté par écrit.
- **Terminé quand** : on installe l'application sur un téléphone de 2 Go de RAM, on crée un compte, on se déconnecte, on se reconnecte et on supprime son compte. Les tests passent, et l'essai de transcription a désigné un outil (ou déclenché le plan B).
- **Ce que le fondateur fournit** : **les captures du design dans `design/`**, la création du dépôt GitHub vide, l'accès à un compte Supabase, un téléphone Android d'entrée de gamme pour les essais, et 20 enregistrements (ou des volontaires pour les faire).

## J2 – Contenu

- **Livrables** :
  - Les 3 modules et leurs 12 leçons réécrits (tutoiement, sans emoji, corrections de fond), chacun avec un principe clé et un cas pratique à voix haute, plus un cas final par module.
  - Le contenu est saisi en base, pas dans le code.
  - Écrans S'entraîner, Module et Leçon ; déblocage dans l'ordre ; progression enregistrée.
  - Téléchargement d'un module pour le hors-ligne ; bouton Éco-data.
- **Terminé quand** : en mode avion, on lit une leçon téléchargée ; de retour en ligne, la progression apparaît sur le serveur. Le fondateur a relu et validé les textes des leçons.
- **Ce que le fondateur fournit** : relecture des leçons, nom de la méthode pédagogique.

## J3 – Séance et analyse

- **Livrables** :
  - Écran Séance : sujet, chrono de 60 secondes, onde sonore, pause et fin.
  - Enregistrement compressé, file d'attente, envoi reprenable.
  - Fonction serveur `analyser-seance` : transcription, mesures (débit, pauses, tics), analyse par Claude, enregistrement du coût.
  - Quota par jour réglable dans la base.
  - Écran Analyse : résumé, Structure, Voix, Impact, tics comptés, point fort, priorité. Points forts d'abord, ton bienveillant.
  - **Comparaison à l'aveugle des modèles Claude** sur les 20 enregistrements ; choix par le fondateur.
- **Terminé quand** :
  - Une séance enregistrée en mode avion part toute seule au retour du réseau, même si la connexion coupe pendant l'envoi.
  - Le nombre de « euh » affiché correspond au comptage à l'oreille, dans la marge définie lors de l'essai.
  - Le coût moyen réel d'une séance est connu.
- **Ce que le fondateur fournit** : son choix de modèle après la comparaison à l'aveugle.

## J4 – Progrès

- **Livrables** : série de jours (calculée par le serveur, selon le fuseau horaire de Dakar), statistiques simples, courbe des tics de langage, écran Accueil complet, rappels affichés dans l'application.
- **Terminé quand** : après plusieurs jours de séances simulées, la série, les chiffres et la courbe sont justes (tests automatiques), y compris pour une séance faite juste avant minuit et envoyée après.

## J5 – Coach

- **Livrables** :
  - Côté apprenant (Profil > Mon coach) : prochain rendez-vous avec bouton « Rejoindre », retours et objectifs, historique, message écrit.
  - Espace coach : liste des apprenants (progression, dernière séance, série, statut Actif ou À relancer), filtres, fiche d'un apprenant, planification d'un rendez-vous (date, heure, lien Google Meet), retours et objectifs, statistiques globales simples, tableau des coûts.
  - Attribution des apprenants à un coach.
- **Terminé quand** : le coach voit uniquement ses apprenants (test de sécurité), planifie un rendez-vous, et l'apprenant le voit et peut rejoindre la visio.

**Fin du MVP.**

## J6 – Bêta fermée sur Google Play

- **Livrables** :
  - Compte développeur Google Play, fiche de l'application, politique de confidentialité et conditions d'utilisation en français.
  - Test interne (équipe), puis test fermé (`[À COMPLÉTER]` apprenants volontaires). Google Play peut exiger un nombre minimum de testeurs et une durée minimale de test fermé pour les nouveaux comptes : à vérifier au moment de créer le compte.
  - Suivi des plantages et des coûts réels ; quota réglé selon le budget.
  - Démarches auprès de la CDP faites avant d'accueillir de vrais apprenants.
- **Terminé quand** : les indicateurs du CADRAGE § 9 sont mesurés sur au moins 2 semaines, avec 99 % de sessions sans plantage.

## J7 – Arène 60 secondes et classement (version 1.1)

- **Livrables** : défi de la semaine, ligues de taille limitée, score calculé uniquement par le serveur, classement (prénom et score seulement), remise à zéro chaque lundi, notifications push (série, rendez-vous), badges.
- **Terminé quand** : un test prouve qu'un téléphone modifié ne peut pas changer son score, et le calcul tient sur des données simulées de 10 000 joueurs.

## J8 – Certificat et paiement mobile (version 1.1)

- **Préalable** : décision sur le modèle économique et la règle Google Play (CADRAGE § 7).
- **Livrables** : quiz final, certificat avec code unique, page publique de vérification, paiement selon l'option choisie, reçus par e-mail.
- **Terminé quand** : un paiement de test est confirmé par signature et par vérification du statut ; un faux retour de paiement est refusé ; un code de certificat se vérifie sur la page publique.

---

## À préparer avant la mise en vente

| Élément | Responsable | Statut |
|---|---|---|
| Statut juridique de l'entreprise | Fondateur | `[À COMPLÉTER]` |
| Nom et marque (dépôt à l'OAPI) | Fondateur | `[À COMPLÉTER]` ; nom retenu : SPLEAD |
| NINEA et RCCM (nécessaires aux comptes marchands) | Fondateur | `[À COMPLÉTER]` |
| Compte développeur Google Play | Fondateur | À faire avant J6 |
| Politique de confidentialité et conditions d'utilisation en français | Fondateur + juriste (brouillon préparé par Claude) | À faire avant J6 |
| Démarches auprès de la CDP (déclaration, transfert hors du Sénégal) | Fondateur + juriste | À faire avant J6 |
| Compte marchand Wave et/ou Orange Money, ou agrégateur | Fondateur | À faire avant J8 |
| Décision sur le modèle économique et la règle Google Play | Fondateur | À faire avant J8 |
| Adresse e-mail professionnelle | Fondateur | `[À COMPLÉTER]` |
| Nom de domaine (vérification des certificats, e-mails) | Fondateur | `[À COMPLÉTER]` |
| Plan de communication de lancement | Fondateur | `[À COMPLÉTER]` |

## Questions ouvertes

Voir CADRAGE § 12 : modèle économique, budget de la bêta, langue parlée au micro, nom de la méthode, public prioritaire et captures du design.

## Journal

| Date | Ce qui a été fait |
|---|---|
| 17/10/2026 | Création du dépôt. Cadrage, architecture et feuille de route rédigés (version 1), en attente de validation. |
| 17/10/2026 | Cadrage validé par le fondateur. J1 préparé : plan détaillé, protocole de l'essai de transcription, fiche de comptage. Bloqué en attente de : accord pour installer Flutter, Java et Android Studio, dépôt GitHub, organisation Supabase, mode de connexion, captures du design. |
| 18/10/2026 | Connexion décidée (Google + code e-mail). Installation des outils reportée par le fondateur. Brouillon du consentement (`contenu/fr/consentement-v1.md`) et module 1 réécrit en échantillon (`contenu/fr/module-1-prise-de-parole.md`), à relire. Organisation Supabase : réponse « autre chose », à préciser. |
