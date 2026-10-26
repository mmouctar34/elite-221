import { useState } from 'react'
import { Download, WifiOff, X } from 'lucide-react'
import { t } from '../i18n'
import { Bouton, BoutonIcone, TRAIT_ICONE } from '../ui/composants'
import { lancerInstallation, useInstallation } from './installation'
import { useEnLigne } from './enLigne'

export function BandeauHorsLigne() {
  const enLigne = useEnLigne()
  if (enLigne) return null
  return (
    <div className="bandeau" role="status">
      <WifiOff aria-hidden="true" size={22} strokeWidth={TRAIT_ICONE} />
      <p className="bandeau__texte">{t('horsLigne.texte')}</p>
    </div>
  )
}

// Proposé à partir de la deuxième visite, jamais imposé (US-001).
export function BandeauInstallation({ visites }: { visites: number }) {
  const { peutInstaller } = useInstallation()
  const [masque, setMasque] = useState(false)

  if (!peutInstaller || masque || visites < 2) return null

  return (
    <div className="bandeau bandeau--marque" role="region" aria-label={t('installation.region')}>
      <Download aria-hidden="true" size={22} strokeWidth={TRAIT_ICONE} />
      <p className="bandeau__texte">{t('installation.texte')}</p>
      <Bouton onClick={() => void lancerInstallation()}>{t('installation.bouton')}</Bouton>
      <BoutonIcone icone={X} libelle={t('installation.plusTard')} onClick={() => setMasque(true)} />
    </div>
  )
}
