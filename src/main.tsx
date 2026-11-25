import './glass-reflection.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LiquidGlassScene from './LiquidGlassScene'
import PrivacyPolicy from './PrivacyPolicy'
import TermsAndConditions from './TermsAndConditions'
import './design.css'
import { useLiquidGlassScroll } from './effects'

function Root() {
  const page = new URLSearchParams(window.location.search).get('page')
  const isPolicyPage = page === 'privacy-policy' || page === 'terms'
  useLiquidGlassScroll(isPolicyPage)

  return (
    <>
      <LiquidGlassScene />
      {page === 'privacy-policy' ? (
        <PrivacyPolicy />
      ) : page === 'terms' ? (
        <TermsAndConditions />
      ) : (
        <App />
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
