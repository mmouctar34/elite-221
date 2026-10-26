import { t } from './i18n'

export function App() {
  return (
    <main>
      <h1>{t('app.nom')}</h1>
      <p>{t('accueil.bientot')}</p>
    </main>
  )
}
