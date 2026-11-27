import './glass-reflection.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PrivacyPolicy from './PrivacyPolicy'
import TermsAndConditions from './TermsAndConditions'
import './design.css'

function Root() {
const page = new URLSearchParams(window.location.search).get('page')

return (
<div className="site-content">
{page === 'privacy-policy' ? (
<PrivacyPolicy />
) : page === 'terms' ? (
<TermsAndConditions />
) : (
<App />
)}
</div>
)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<Root />
</React.StrictMode>,
)
