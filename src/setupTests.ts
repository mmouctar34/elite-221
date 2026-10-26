import '@testing-library/jest-dom/vitest'

// jsdom ne sait pas faire défiler la page : on remplace scrollTo par une fonction vide.
window.scrollTo = () => {}
