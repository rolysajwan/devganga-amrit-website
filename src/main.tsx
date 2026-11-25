import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PrivacyPolicy from './PrivacyPolicy'
import TermsAndConditions from './TermsAndConditions'
import './design.css'

const page = new URLSearchParams(window.location.search).get('page')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {page === 'privacy-policy' ? (
      <PrivacyPolicy />
    ) : page === 'terms' ? (
      <TermsAndConditions />
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
