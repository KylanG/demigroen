'use client'

import { useEffect, useState } from 'react'

type Consent = 'accepted' | 'declined' | null

interface CookieBannerProps {
  gtmId?: string
  ga4Id?: string
}

export default function CookieBanner({ gtmId, ga4Id }: CookieBannerProps) {
  const [consent, setConsent] = useState<Consent | 'loading'>('loading')

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent') as Consent
    setConsent(stored)
  }, [])

  useEffect(() => {
    if (consent !== 'accepted') return

    // GTM
    if (gtmId && typeof window !== 'undefined') {
      if (!document.getElementById('gtm-script')) {
        const script = document.createElement('script')
        script.id = 'gtm-script'
        script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`
        document.head.appendChild(script)
      }
      return
    }

    // GA4 (alleen als geen GTM)
    if (ga4Id && typeof window !== 'undefined') {
      if (!document.getElementById('ga4-script')) {
        const gtagScript = document.createElement('script')
        gtagScript.id = 'ga4-script'
        gtagScript.async = true
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
        document.head.appendChild(gtagScript)

        const inlineScript = document.createElement('script')
        inlineScript.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`
        document.head.appendChild(inlineScript)
      }
    }
  }, [consent, gtmId, ga4Id])

  function handleAccept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setConsent('accepted')
  }

  function handleDecline() {
    localStorage.setItem('cookie_consent', 'declined')
    setConsent('declined')
  }

  // Verberg banner als keuze al gemaakt is of nog aan het laden
  if (consent !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6"
    >
      <div className="max-w-2xl mx-auto bg-white border border-border rounded-md shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-body leading-relaxed flex-1">
          Wij gebruiken cookies voor analytics en het verbeteren van onze website. Kies hieronder je voorkeur.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-sm border border-border text-sm font-medium text-body hover:bg-background transition-base"
          >
            Weigeren
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-base"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
