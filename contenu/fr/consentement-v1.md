# Consentement à l'enregistrement de la voix (version 1)

**Brouillon du 18 octobre 2026, à faire relire par un juriste avant la bêta (J6).** Ce texte s'affiche à l'inscription, avant la première séance. Chaque version est datée, et la base enregistre quelle version la personne a acceptée.

---

## Écran affiché dans l'application

### Ta voix, tes données

Pour t'aider à progresser, SPLEAD enregistre ta voix pendant tes séances, puis l'analyse.

**Ce qu'on enregistre**
- Ta voix, uniquement pendant une séance, quand tu appuies sur le micro.
- Le texte de ce que tu as dit, et l'analyse de ta séance.

**Pourquoi**
- Pour te donner un retour sur ta structure, ta voix et ton impact.
- Pour que ton coach suive tes progrès.
- Jamais pour de la publicité. Jamais revendu.

**Qui y a accès**
- Toi, et le coach qui te suit.
- Des services techniques qui transforment ta voix en texte et l'analysent. Ils reçoivent l'enregistrement ou le texte, mais jamais ton nom ni ton numéro. Liste complète : `[lien vers la politique de confidentialité, À COMPLÉTER]`.

**Où sont tes données**
- Sur des serveurs en Europe, et chez des services situés hors du Sénégal.

**Combien de temps**
- Tes enregistrements sont supprimés automatiquement au bout de 90 jours.
- Tes analyses écrites sont gardées tant que ton compte existe, pour suivre tes progrès.

**Tes droits**
- Tu peux retirer ton accord à tout moment, dans Profil > Mes données. Tu ne pourras alors plus faire de séance enregistrée, mais tu pourras continuer à lire les leçons.
- Tu peux télécharger ou supprimer toutes tes données, dans Profil > Mes données.
- Pour toute question : `[adresse e-mail de contact, À COMPLÉTER]`.
- Tu peux aussi t'adresser à la Commission de Protection des Données Personnelles (CDP).

**Case à cocher, non cochée par défaut :**

> J'accepte que ma voix soit enregistrée et analysée pour me donner un retour sur mes séances.

**Boutons :** « J'accepte et je continue » (actif seulement si la case est cochée), « Plus tard ». « Plus tard » permet de lire les leçons sans pouvoir enregistrer.

---

## Notes pour le développement

- L'accord est enregistré dans la table `consents` : type `enregistrement_vocal`, version `1`, date, et date de retrait éventuel.
- Ce consentement est **distinct** de l'acceptation des conditions d'utilisation (autre case, autre ligne dans `consents`).
- En cas de retrait, le bouton micro est désactivé, avec un lien pour redonner son accord. Les enregistrements déjà faits restent supprimables à la demande.
- Si le texte change de façon importante, la version passe à `2` et l'accord est redemandé.
