# SPLEAD : analyse financière

Version 1 (26 octobre 2026). Phase 2 du [processus](PROCESSUS.md).

**À lire avant tout :** les prix de vente de SPLEAD présentés ici sont des **scénarios de calcul, pas des décisions**. Seul le fondateur fixe les prix. Les prix des fournisseurs viennent de sources datées ou sont marqués « à vérifier ». Ce document n'est ni un conseil comptable, ni un conseil fiscal.

**Taux de change utilisé :** 1 $ = 585 FCFA (taux relevé au 19 octobre 2026 sur un [site agrégateur](https://xe.soft9.us/history/usd-to-xof/2026), non officiel ; on vérifiera auprès de la BCEAO ou d'une banque). L'euro, lui, est fixe : 1 € = 655,957 FCFA.

---

## 1. Ce que le choix de la PWA change

| Poste | Application native (prévu avant) | PWA (choisie le 26/10/2026) |
|---|---|---|
| Compte développeur Apple | 99 $ par an, soit environ 57 900 FCFA par an | **0 FCFA** : pas d'App Store au début |
| Compte Google Play | 25 $ une seule fois, soit environ 14 600 FCFA | **Facultatif** : seulement si on publie aussi sur Google Play |
| Commission des stores sur les ventes | 15 à 30 % si l'on vend dans l'application (règles des stores) | **0 %** : paiement Wave ou Orange Money directement sur la PWA |
| Hébergement de l'application | — | 0 FCFA (Cloudflare Pages, formule gratuite, comme Madior Insight ; à vérifier pour le volume) |

## 2. Les coûts fixes (chaque mois, même sans utilisateur)

| Poste | Pendant le développement | À partir de la bêta (J6) | Source |
|---|---|---|---|
| Supabase (base, comptes, stockage) | 0 FCFA (formule gratuite) | 25 $, soit environ 14 600 FCFA par mois | Comparatifs, à vérifier sur supabase.com/pricing |
| Hébergement PWA (Cloudflare Pages) | 0 FCFA | 0 FCFA | À vérifier |
| Nom de domaine | `[À COMPLÉTER]` par an | idem | — |
| E-mails (Resend), suivi d'erreurs (Sentry) | 0 FCFA (formules gratuites) | 0 FCFA tant qu'on reste petit | À vérifier |
| **Total mensuel** | **environ 0 FCFA** | **environ 14 600 FCFA + domaine** | |

## 3. Les coûts variables (par séance de 60 secondes)

**Formule :** coût d'une séance = transcription + analyse par l'IA + stockage (négligeable : environ 250 Ko, supprimés au bout de 90 jours).

| Élément | En dollars | En FCFA |
|---|---|---|
| Transcription (à vérifier lors de l'essai) | 0,003 à 0,01 $ | 1,8 à 5,9 FCFA |
| Analyse avec Claude Haiku 5.5 | environ 0,001 $ | environ 0,6 FCFA |
| Analyse avec Claude Sonnet 5.5 | 0,02 à 0,025 $ | 11,7 à 14,6 FCFA |
| Analyse avec Claude Opus 5.5 | 0,04 à 0,05 $ | 23,4 à 29,3 FCFA |

**Coût total d'une séance selon le modèle choisi :**

| Modèle | Coût par séance |
|---|---|
| Haiku 5.5 | 2,4 à 6,5 FCFA |
| Sonnet 5.5 | 13,5 à 20,5 FCFA |
| Opus 5.5 | 25,2 à 35,2 FCFA |

**Coût par apprenant actif et par mois** = séances par mois × coût d'une séance :

| Usage | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 |
|---|---|---|---|
| 12 séances par mois (3 par semaine) | 29 à 78 FCFA | 162 à 246 FCFA | 302 à 422 FCFA |
| 30 séances par mois (1 par jour) | 72 à 195 FCFA | 405 à 615 FCFA | 756 à 1 056 FCFA |

**Frais de paiement :** environ 1 % avec Wave en direct, 2,4 à 3,5 % avec un agrégateur (sources commerciales, à vérifier ; voir ARCHITECTURE § 13).

## 4. Le seuil de rentabilité

**Formule :** marge par abonné = prix − frais de paiement − coût variable d'un abonné.
Nombre d'abonnés nécessaires = (coûts fixes + coût des utilisateurs gratuits) ÷ marge par abonné.

### Cas simple : seulement des abonnés, sans offre gratuite

Hypothèses : coûts fixes de 14 625 FCFA par mois, analyse Sonnet 5.5 au coût le plus haut (246 FCFA par mois pour 12 séances), Wave à 1 %.

| Prix testé (scénario) | Marge par abonné | Abonnés nécessaires pour couvrir les coûts |
|---|---|---|
| 1 000 FCFA par mois | 1 000 − 10 − 246 = 744 FCFA | 14 625 ÷ 744 ≈ **20** |
| 2 000 FCFA par mois | 2 000 − 20 − 246 = 1 734 FCFA | 14 625 ÷ 1 734 ≈ **9** |
| 3 000 FCFA par mois | 3 000 − 30 − 246 = 2 724 FCFA | 14 625 ÷ 2 724 ≈ **6** |

### Cas réaliste : avec des utilisateurs gratuits

**C'est le point le plus important de cette analyse : ce sont les utilisateurs gratuits qui coûtent cher, pas les serveurs.**

- 100 utilisateurs gratuits à 12 séances par mois, avec Sonnet 5.5 : 100 × 246 = **24 600 FCFA par mois**, plus que Supabase.
- Les mêmes, avec Haiku 5.5 : 100 × 78 = **7 800 FCFA par mois**.

Exemple : 200 utilisateurs gratuits avec Haiku (15 600 FCFA), coûts fixes (14 625 FCFA), abonnés à 2 000 FCFA avec Sonnet (marge de 1 734 FCFA). Il faut alors (15 600 + 14 625) ÷ 1 734 ≈ **18 abonnés**, soit environ 9 utilisateurs sur 100 qui paient. Ce taux est à mesurer pendant la bêta. Il est souvent faible pour les applications grand public.

**Conséquences pour le produit :**

1. L'offre gratuite doit être **limitée** : par exemple quelques séances par semaine, ou une analyse plus courte avec le modèle le moins cher.
2. Le quota de séances par jour (déjà prévu) protège le budget.
3. Le **choix du modèle d'IA est l'hypothèse qui change le plus le résultat**. D'où la comparaison à l'aveugle prévue au jalon J3.

## 5. Les façons de gagner de l'argent (à choisir par le fondateur)

| Modèle | Principe | Avantage | Point d'attention |
|---|---|---|---|
| Freemium | Gratuit limité, plus un abonnement mensuel | Facile à essayer | Il faut que suffisamment de gratuits deviennent payants |
| Pass ponctuel | Par exemple « 30 jours avant ma soutenance » | Correspond aux moments de besoin forts | Revenu irrégulier |
| Rendez-vous avec le coach | Le meet est payant, ou réservé aux abonnés | Valorise le temps du coach | Le temps du coach est limité (ci-dessous) |
| Certificat | Payant après le quiz final | Revenu sans coût récurrent | Doit avoir une vraie valeur (partenaires) |
| Organisations (B2B) | Une école, un incubateur ou une entreprise paie pour ses membres | Un contrat touche beaucoup d'utilisateurs, paiement plus régulier | Cycle de vente plus long, facture, statut juridique nécessaire |

**Le temps du coach** est la ressource la plus rare. Si le fondateur consacre `[À COMPLÉTER]` heures par semaine aux meets de 30 minutes, il peut en tenir 2 fois ce nombre d'heures par semaine. Par exemple, 5 heures permettent 10 meets par semaine. Au-delà, il faudra d'autres coachs (la base est prévue pour).

## 6. Les dépenses de départ (une seule fois)

| Poste | Montant | Obligatoire ? |
|---|---|---|
| Compte Google Play | environ 14 600 FCFA | Non, seulement pour être sur Google Play |
| Compte Apple | 0 FCFA | Non, reporté |
| Nom de domaine | `[À COMPLÉTER]` | Oui, pour la PWA et la vérification des certificats |
| Création de l'entreprise (NINEA, RCCM) | `[À COMPLÉTER]` | Oui, pour encaisser avec un compte marchand |
| Relecture juridique (confidentialité, conditions, CDP) | `[À COMPLÉTER]` | Oui, avant la bêta ouverte |
| Crédits d'essai des outils de transcription | 0 à `[À COMPLÉTER]` FCFA | Pour l'essai de J1 |

## 7. Décisions attendues du fondateur

1. Le modèle de revenus (section 5), même provisoire, pour la bêta.
2. Le budget mensuel maximum de la bêta : il fixe le quota de séances.
3. Le nombre d'heures par semaine consacrées aux meets.
4. Les prix à **tester** pendant la bêta (deux ou trois prix), plutôt qu'un prix définitif.
