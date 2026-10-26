# SPLEAD : prospection et recueil des besoins

Version 1 (26 octobre 2026). Phase 1 du [processus](PROCESSUS.md).

Ce document sépare toujours deux choses :

- **les faits**, qui ont une source datée ;
- **les hypothèses**, marquées `H1`, `H2`… Ce sont des suppositions à vérifier en parlant à de vrais utilisateurs, avant d'investir du temps de développement dessus.

---

## 1. Le marché : ce que disent les chiffres

| Fait | Chiffre | Source |
|---|---|---|
| Étudiants dans le supérieur (public et privé), 2024 | 286 169 | Ministre de l'Enseignement supérieur, rapporté par [Le Soleil](https://lesoleil.sn/actualites/education/universites-senegalaises-le-ministre-abdourahmane-diouf-livre-les-chiffres-cles-de-son-departement/) |
| Part du public | environ 69 % (198 009 étudiants) | Même source |
| Évolution | 93 000 en 2012, environ 286 000 en 2023 | Même source |
| Lignes internet mobile haut débit (3G, 4G, 5G), 1er trimestre 2025 | 18 189 870 | Rapport ARTP, rapporté par [Le Soleil](https://lesoleil.sn/actualites/economie/telecommunication-linternet-et-la-telephonie-fixe-en-pleine-expansion-au-senegal/) |
| Clients data mobile actifs chez Orange, 2025 | 6,83 millions | Rapport annuel Sonatel 2025, rapporté par [OSIRIS](https://www.osiris.sn/%E2%80%8Btelecoms-le-senegal-franchit-la-barre-record-de-128-de-taux-de-penetration.html) |

**Comment lire ces chiffres :**

- Une « ligne » n'est pas une personne : beaucoup de gens ont deux puces. On ne peut donc pas en déduire directement le nombre de personnes connectées.
- Le chiffre des étudiants suffit à montrer que la première cible est grande : même 1 % des étudiants représenterait près de 2 900 personnes.
- Je n'ai trouvé aucun chiffre public fiable sur les jeunes professionnels ou les entrepreneurs : `[À COMPLÉTER]` (pistes : ANSD, Ministère de la Jeunesse, incubateurs).

## 2. Les cibles

### Cible principale au lancement : les étudiants

C'est la cible la plus nombreuse, la plus facile à toucher (campus, associations, réseaux sociaux), avec des moments où le besoin est fort et daté : exposés, soutenances, concours d'éloquence, stages, premiers entretiens.

### Cibles secondaires

- **Jeunes professionnels** : réunions, présentations, entretiens annuels. Ils ont plus de moyens, mais moins de temps.
- **Entrepreneurs** : pitchs, demandes de financement, vente. Le besoin est très fort, mais les cas sont moins nombreux.
- **Les organisations** (piste B2B, c'est-à-dire « d'entreprise à entreprise ») : universités et écoles, incubateurs, entreprises qui forment leurs employés. Un seul contrat peut toucher des dizaines d'utilisateurs. C'est une hypothèse à creuser (H9).

### Trois personnages types (fictifs), pour concevoir l'application

| | Aminata, 21 ans | Ibrahima, 27 ans | Ndèye, 33 ans |
|---|---|---|---|
| Situation | Licence 3 à l'université, vit en famille | Chargé de clientèle dans une banque, Dakar | Créatrice d'une entreprise de transformation agroalimentaire, Thiès |
| Moment difficile | Exposé devant 80 étudiants, soutenance dans 3 mois | Présenter les résultats de son équipe chaque lundi | Pitch devant un fonds d'investissement le mois prochain |
| Téléphone et réseau | Android d'entrée de gamme, forfait limité, Wi-Fi du campus | Android de milieu de gamme, 4G | Android ou iPhone, 4G, coupures hors de Dakar |
| Ce qu'elle ou il veut | Ne plus trembler, structurer ses idées | Être clair et bref, paraître sûr de lui | Convaincre en 3 minutes, répondre aux questions |
| Ce qui freine | Le prix, la gêne de parler fort à la maison | Le manque de temps | Le manque de temps, le besoin de retours sérieux |

## 3. La concurrence

| Alternative | Prix constaté | Forces | Faiblesses pour notre cible | Source |
|---|---|---|---|---|
| Yoodli (application de coaching IA, en anglais) | À partir d'environ 10 $ par mois (version gratuite aussi) | Analyse IA avancée | Anglais, prix en dollars, pas de coach humain local | [Capterra](https://www.capterra.com/p/10019324/Yoodli/), à vérifier sur le site officiel |
| Speeko (application iPhone) | 24,99 $ par mois ou 89,99 $ par an (prix américains) | Exercices quotidiens | Anglais, iPhone, cher | [Fiche App Store](https://apps.appfollow.io/ios/speeko-ai-for-public-speaking/1071468459?country=mz) |
| Formation en présentiel (exemple : COFEB, 2 jours, édition 2024) | 1,5 million FCFA | Formateur expérimenté, réseau | Très cher, ponctuel, à Dakar | [Plaquette COFEB](https://cofeb.bceao.int/sites/default/files/2024-02/Plaquette_art_oratoire_2024-COFEB_HEC.pdf) |
| Coaching individuel à Dakar | Ordre de grandeur de 10 000 à 20 000 FCFA l'heure (constaté pour l'anglais, pas pour la prise de parole) | Personnalisé | Cher sur la durée, pas de pratique quotidienne | [Kolonell](https://kolonell.com/fr/blog/formation-anglais-conversationnel-travail-dakar-2026) |
| Vidéos, livres, YouTube | Gratuit | Accessible | Aucune pratique guidée, aucun retour | — |
| Clubs et concours d'éloquence | `[À COMPLÉTER : à recenser]` | Pratique réelle devant un public | Peu de places, pas tous les jours | — |

**Le positionnement de SPLEAD** se situe entre le gratuit, qui n'offre aucun retour, et le présentiel, qui est cher et ponctuel : **une pratique quotidienne guidée, en français, adaptée au Sénégal, avec un retour immédiat et un vrai coach**, pour le prix d'un forfait internet `[à confirmer par l'étude financière et les entretiens]`.

## 4. Les hypothèses à vérifier

| # | Hypothèse | Comment la vérifier | Si elle est fausse |
|---|---|---|---|
| H1 | Les étudiants ressentent la peur de parler en public comme un vrai problème, pas comme un simple inconfort | Entretiens : raconter la dernière prise de parole difficile | Revoir la cible ou le message |
| H2 | Ils pratiqueraient plusieurs fois par semaine si c'est court (60 secondes) | Bêta : nombre de séances par semaine | Revoir le format (défis, rappels, groupe) |
| H3 | Parler dans son téléphone chez soi n'est pas trop gênant (famille, colocation) | Entretiens : où et quand pourraient-ils s'entraîner | Prévoir un mode « à voix basse » ou des exercices écrits |
| H4 | Un retour automatique est jugé utile et crédible | Bêta : note donnée à chaque analyse | Mettre plus de coach humain, moins d'IA |
| H5 | Le coach humain est une vraie raison de payer | Entretiens et test de prix | Recentrer sur l'application seule, moins chère |
| H6 | Ils sont prêts à payer un petit montant chaque mois, par Wave ou Orange Money | Test de prix pendant la bêta (préventes, liste d'attente) | Modèle gratuit financé par les organisations (H9) |
| H7 | Le coût des données mobiles n'empêche pas l'usage (environ 250 Ko par séance) | Bêta : abandons, retours sur l'Éco-data | Réduire encore la taille, privilégier le Wi-Fi |
| H8 | Le tutoiement et le ton chaleureux plaisent aussi aux professionnels | Entretiens avec des jeunes professionnels | Proposer le vouvoiement dans les réglages |
| H9 | Des écoles, incubateurs ou entreprises paieraient pour leurs membres | 5 rendez-vous avec des responsables | Rester sur la vente directe aux particuliers |
| H10 | Une PWA, installée depuis un lien ou un QR code, suffit : pas besoin d'être sur les stores au début | Bêta : taux d'installation après visite | Publier sur Google Play (25 $) plus tôt |

## 5. Guide d'entretien (recueil des besoins)

**Objectif** : 15 entretiens de 20 minutes, 5 par cible (proposition, à ajuster). En personne, ou par appel WhatsApp.

**Règles** :

- On parle du **passé réel**, jamais du futur imaginé. « Est-ce que tu utiliserais… ? » donne toujours « oui », donc ne sert à rien.
- On ne présente pas SPLEAD avant la fin.
- On note les mots exacts de la personne.
- On demande l'accord avant de prendre des notes, et on n'enregistre que si la personne accepte.

**Questions :**

1. Raconte-moi la dernière fois que tu as dû parler devant d'autres personnes. C'était quoi, où, devant qui ?
2. Comment tu t'es senti avant, pendant, après ?
3. Qu'est-ce qui s'est bien passé ? Qu'est-ce que tu aurais voulu faire mieux ?
4. Comment tu t'étais préparé ? Combien de temps ?
5. As-tu déjà cherché à t'améliorer à l'oral ? Comment (vidéos, formation, club, ami) ? Qu'est-ce que ça a donné ?
6. As-tu déjà payé pour apprendre quelque chose en dehors de tes études ou de ton travail ? Quoi, combien, comment as-tu payé ?
7. Quand et où pourrais-tu t'entraîner à parler à voix haute, seul ? Est-ce que ce serait gênant ?
8. Quel téléphone as-tu ? Comment gères-tu ton forfait internet ?
9. Qui te donne des conseils quand tu dois parler en public ? Qu'en penses-tu ?
10. Quelle sera ta prochaine prise de parole importante ? Qu'est-ce qui t'aiderait le plus d'ici là ?
11. *(À la fin seulement, en présentant SPLEAD en deux phrases)* Qu'est-ce qui te plaît ? Qu'est-ce qui te gêne ?
12. Est-ce que je peux te recontacter pour essayer la première version ? *(constitue la liste des bêta-testeurs)*

## 6. Grille de synthèse

Après chaque entretien, remplir une ligne :

| # | Cible | Problème principal (ses mots) | Fréquence du besoin | Solution actuelle | A déjà payé pour apprendre ? | Freins à l'usage | Hypothèses confirmées ou infirmées | Bêta-testeur ? |
|---|---|---|---|---|---|---|---|---|

Après 15 entretiens, l'agent `analyste-metier` fait la synthèse : les hypothèses validées, celles à abandonner, et les changements à apporter au backlog.

## 7. Comment toucher les premiers utilisateurs (hypothèses)

- **Campus** : associations d'étudiants, clubs d'éloquence, bureaux des élèves, affiches avec QR code menant directement à l'installation de la PWA.
- **WhatsApp** : groupes de promotion. Un lien se partage en un geste, et c'est un vrai avantage de la PWA.
- **Réseaux sociaux** : TikTok et Instagram (vidéos courtes « avant et après »), LinkedIn pour les professionnels.
- **Partenaires** : incubateurs, écoles de commerce, concours d'éloquence (H9).

Le suivi de l'origine des inscrits (QR code, WhatsApp, TikTok…) est prévu dans le backlog, comme sur Madior Insight.
