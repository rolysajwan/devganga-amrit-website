import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PrivacyPolicy from './PrivacyPolicy'
import './style.css'

const isPrivacyPolicy =
  new URLSearchParams(window.location.search).get('page') ===
  'privacy-policy'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isPrivacyPolicy ? <PrivacyPolicy /> : <App />}
  </React.StrictMode>,
)
