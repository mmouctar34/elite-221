# ADR-001 : SPLEAD est d'abord une PWA, pas une application Flutter

Date : 26 octobre 2026. Statut : **acceptée** par le fondateur. Remplace le choix de Flutter du 17 octobre 2026 ([ARCHITECTURE.md](../ARCHITECTURE.md) § 2, version 1).

*Une ADR (Architecture Decision Record, ou « fiche de décision d'architecture ») garde la trace d'un choix technique important : le problème, les options, la décision et ses conséquences. On ne la réécrit pas : si l'on change d'avis, on en écrit une nouvelle qui la remplace.*

---

## 1. Le problème

Le fondateur veut toucher Android **et** iPhone, sans payer les 99 $ par an d'Apple (environ 57 900 FCFA) tant que l'application n'a pas prouvé qu'elle marche. Le PC de développement n'a ni Flutter, ni Java, ni Android Studio, et l'équipe connaît TypeScript et React (Madior Insight).

## 2. Les options étudiées

| Option | Coût des stores | Android | iPhone | Compétences | Outils à installer |
|---|---|---|---|---|---|
| A. Application Flutter | 25 $ (Google) + 99 $ par an (Apple) | Très bon | Seulement via l'App Store | Dart, à apprendre | Flutter, Java, Android Studio |
| **B. PWA** | 0 $ (25 $ si l'on veut aussi Google Play) | Très bon : installation, hors-ligne, micro, notifications | Bon, via Safari : installation, micro, notifications depuis iOS 16.4, avec des limites (§ 4) | TypeScript et React, déjà connus | Rien : Node.js est installé |
| C. Site web simple | 0 $ | Pas d'installation, pas de hors-ligne | Idem | Déjà connues | Rien |

## 3. La décision

**Option B : une PWA**, construite avec React, TypeScript et Vite, hébergée sur Cloudflare Pages (comme Madior Insight), avec Supabase côté serveur.

- **Plus tard, Google Play** : publier la même PWA sur Google Play grâce à une TWA (Trusted Web Activity, une « coquille » Android officielle qui affiche la PWA), pour 25 $, sans réécrire le code.
- **Plus tard, si les revenus le justifient, l'App Store** : emballer le même code avec Capacitor (un outil qui transforme une application web en application native). Le travail fait aujourd'hui n'est pas perdu.

## 4. Les conséquences

### Ce qu'on gagne

- 0 FCFA de compte développeur au départ, et aucune commission des stores sur les paiements faits sur la PWA.
- Un seul code pour Android, iPhone et ordinateur. Le coach peut utiliser l'Espace coach sur son ordinateur.
- Les mises à jour sont immédiates, sans validation par un store.
- Un lien ou un QR code suffit pour installer : idéal pour WhatsApp et les campus.
- Les compétences et outils sont déjà là : TypeScript, React, Node.js, Cloudflare.

### Ce qu'on accepte (risques et parades)

| Risque | Parade |
|---|---|
| **iPhone : des développeurs signalent que l'enregistrement du micro ne marche pas toujours dans une PWA installée** (rapports sur les forums Apple et WebKit, non confirmés officiellement) | Essai sur un vrai iPhone dès le sprint 4. Si le problème se confirme, la séance s'ouvre dans Safari plutôt que dans la PWA installée. L'iPhone n'est de toute façon pas la cible principale. |
| iPhone : pas d'envoi en arrière-plan (« Background Sync ») | Les séances en attente partent à la prochaine ouverture de l'application, avec un message « 1 séance en attente d'envoi ». |
| iPhone : l'espace de stockage peut être vidé si l'application n'est pas utilisée longtemps | Demander le stockage persistant au navigateur, garder la file d'envoi petite, et avertir l'apprenant qu'une séance n'est pas encore envoyée. |
| Un peu moins fluide que Flutter sur un téléphone très modeste | Budget strict : 200 Ko de code au maximum à la première ouverture, mesuré à chaque construction ; animations légères ; essai sur un téléphone de 2 Go dès le sprint 1. |
| Pas de présence sur les stores au début (moins visible) | Distribution par liens, QR codes et partenaires ; Google Play via TWA dès que la bêta le justifie (E-14). |
| Règles de Google Play si l'on y publie la TWA : les ventes de contenus numériques dans la version Google Play doivent passer par le paiement Google | Dans la version Google Play, ne rien vendre (ou utiliser le paiement Google) ; la vente passe par la PWA. À vérifier avec les règles en vigueur au moment de la publication. |

## 5. Ce qui ne change pas

Le serveur (Supabase), la sécurité, l'analyse vocale, le modèle de données, le design « Souffle », la loi sur les données et le processus de travail sont inchangés.

## 6. Sources

- [MagicBell : limites des PWA sur iOS](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide) (source secondaire)
- [Forum des développeurs Apple : MediaRecorder dans une PWA iOS](https://developer.apple.com/forums/thread/797987)
- [WebKit Bugzilla, signalement 300990](https://bugs.webkit.org/show_bug.cgi?id=300990)
