// Mesure le poids du code chargé à la première ouverture (ENF-02, US-005).
// Lit dist/index.html, additionne les scripts et styles qu'il charge, compressés (gzip).
// Au-delà du budget, affiche un avertissement sans bloquer (critère de US-005).
import { appendFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGET_KO = 200
const dossier = 'dist'
const pageHtml = join(dossier, 'index.html')

if (!existsSync(pageHtml)) {
  console.error("dist/index.html introuvable : lancez d'abord npm run build.")
  process.exit(1)
}

const html = readFileSync(pageHtml, 'utf8')
// Les chemins commencent par l'adresse de base (« / » ou « /elite-221/ ») : on ne garde que « assets/… ».
const chemins = [...html.matchAll(/(?:src|href)="[^"]*?(assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1])
const fichiers = [...new Set(chemins)]

let totalOctets = 0
for (const fichier of fichiers) {
  const octets = gzipSync(readFileSync(join(dossier, fichier))).length
  totalOctets += octets
  console.log(`  ${fichier} : ${(octets / 1024).toFixed(1)} Ko compressés`)
}

const totalKo = totalOctets / 1024
console.log(`Total chargé à la première ouverture : ${totalKo.toFixed(1)} Ko compressés (budget : ${BUDGET_KO} Ko).`)
const depassement = totalKo > BUDGET_KO
if (depassement) {
  console.warn(`AVERTISSEMENT : le budget de ${BUDGET_KO} Ko est dépassé de ${(totalKo - BUDGET_KO).toFixed(1)} Ko.`)
}

// Sur GitHub Actions, le résultat s'affiche aussi dans le résumé de la vérification.
if (process.env.GITHUB_STEP_SUMMARY) {
  const resume = [
    '### Taille du code chargé à la première ouverture',
    '',
    `**${totalKo.toFixed(1)} Ko** compressés, pour un budget de ${BUDGET_KO} Ko.`,
    depassement ? '' : 'Dans le budget.',
    depassement ? `**Avertissement : budget dépassé de ${(totalKo - BUDGET_KO).toFixed(1)} Ko.**` : '',
    '',
  ].join('\n')
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, resume)
}
