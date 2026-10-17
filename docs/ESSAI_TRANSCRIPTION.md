# Essai de transcription (jalon J1)

Version 1 (17 octobre 2026). Voir [ARCHITECTURE.md § 5](ARCHITECTURE.md).

## Pourquoi cet essai

L'analyse de SPLEAD repose sur un outil qui transforme la voix en texte. S'il comprend mal l'accent ou s'il efface les « euh », toute l'analyse est fausse. On choisit donc l'outil **sur de vrais enregistrements**, avant de construire l'écran Analyse.

## Ce qu'il faut : 20 enregistrements de 60 secondes

| Critère | Répartition souhaitée |
|---|---|
| Personnes | Au moins 6 personnes différentes, hommes et femmes |
| Lieu | La moitié au calme, l'autre moitié avec un bruit de fond normal (rue, maison, bureau) |
| Hésitations | 5 enregistrements avec des « euh », « donc », « du coup » dits **volontairement** et souvent |
| Wolof | 3 enregistrements mêlant français et wolof, si les apprenants le feront (question ouverte) |
| Téléphone | De préférence des téléphones d'entrée de gamme |

**Comment enregistrer :** avec l'application d'enregistrement vocal du téléphone, le téléphone tenu à environ 20 cm de la bouche, sans s'arrêter, pendant 60 secondes.

**Sujets** (au choix) :

1. Présente-toi comme si tu étais en entretien d'embauche.
2. Convaincs-moi d'essayer ton plat préféré.
3. Explique ton projet ou tes études à quelqu'un qui n'y connaît rien.
4. Raconte un moment où tu as dû convaincre quelqu'un.
5. Défends une idée qui te tient à cœur.

**Noms des fichiers :** `e01.m4a`, `e02.m4a`… jusqu'à `e20.m4a`.

## Accord des participants (obligatoire)

Une voix est une donnée personnelle. Avant d'enregistrer, chaque participant donne son accord, par écrit ou par message :

> « J'accepte que mon enregistrement serve uniquement à tester des outils de transcription pour SPLEAD. Il sera supprimé à la fin de l'essai et ne sera pas publié. »

Les enregistrements **ne vont jamais dans le dépôt GitHub** : le dossier `essais/transcription/audio/` est exclu par `.gitignore`. Ils seront envoyés aux outils testés, qui sont des services étrangers : prévenez-en les participants.

## Le comptage à l'oreille

Pour chaque enregistrement, réécoutez-le et remplissez une ligne de la fiche [`essais/transcription/comptage.csv`](../essais/transcription/comptage.csv) (elle s'ouvre avec Excel ou Google Sheets) :

| Colonne | À remplir |
|---|---|
| `fichier` | `e01`, `e02`… |
| `participant` | Un code, jamais le nom : P1, P2… |
| `genre` | F ou H |
| `lieu` | calme ou bruit |
| `euh` | Nombre de « euh » (et « heu », « hum ») entendus |
| `donc` | Nombre de « donc » |
| `du_coup` | Nombre de « du coup » |
| `autres_tics` | Autres tics répétés, avec leur nombre (ex. : « en fait 3 ; voilà 2 ») |
| `wolof` | oui ou non |
| `remarques` | Ce qui peut gêner la compréhension (bruit, débit très rapide…) |

Pour 5 enregistrements, écrivez aussi **mot pour mot** ce qui est dit, « euh » compris, dans un fichier texte `e01.txt`… C'est la référence qui sert à mesurer les mots mal compris.

## Ce que je fais ensuite

1. J'ouvre des comptes d'essai chez les outils candidats (ElevenLabs Scribe, AssemblyAI, Deepgram, OpenAI, Google). La plupart offrent un crédit gratuit ; s'il en faut un payant, je vous demande d'abord.
2. Je fais passer les 20 enregistrements dans chaque outil.
3. Pour chaque outil, je compare :
   - les tics détectés et ceux comptés à l'oreille ;
   - les mots mal compris, sur les 5 textes de référence ;
   - la précision de l'heure de chaque mot, pour le débit et les pauses ;
   - la gestion du wolof ;
   - le prix par minute.
4. J'écris le résultat et la recommandation dans ce document, puis vous choisissez.
5. Les enregistrements sont supprimés de mon PC et des outils testés à la fin de l'essai.

## Résultats

`[À COMPLÉTER après l'essai]`
