Je werkt in de SSUPPLY Starter v1.0 — een Next.js 15 + Tailwind CSS v4 + Sanity v3 boilerplate.

Pas de volgende zaken aan voor het project van de nieuwe klant.
Alles buiten deze lijst wordt beheerd via Sanity Studio — raak dat NIET aan.

---

## 1. KLEUR TOKENS

Open `app/globals.css` en vervang uitsluitend de volgende zes tokens binnen het `@theme` blok:

--color-primary:              [VUL IN — bijv. #E63946]
--color-primary-foreground:   [VUL IN — bijv. #ffffff]
--color-secondary:            [VUL IN — bijv. #457B9D]
--color-secondary-foreground: [VUL IN — bijv. #ffffff]
--color-background:           [VUL IN — bijv. #F1FAEE]
--color-body:                 [VUL IN — bijv. #1D3557]

Laat de volgende tokens altijd ongemoeid:
- --color-muted
- --color-border
- Alle --spacing-*, --radius-*, --transition-*, --font-* tokens

---

## 2. FONT

Open `app/layout.tsx` en vervang de Geist font-imports door de fonts van de klant.

Huidige situatie:
  import { Geist, Geist_Mono } from 'next/font/google'
  const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
  const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

Vervang door:
  import { [HEADING_FONT], [BODY_FONT] } from 'next/font/google'
  const headingFont = [HEADING_FONT]({ subsets: ['latin'], weight: [[VUL IN — bijv. '400', '700']], variable: '--font-heading' })
  const bodyFont = [BODY_FONT]({ subsets: ['latin'], weight: [[VUL IN — bijv. '400', '600']], variable: '--font-body' })

  Klantfonts:
  - Heading font: [VUL IN — bijv. Playfair Display]
  - Body font:    [VUL IN — bijv. Inter]

Zorg dat beide font-variabelen correct worden meegegeven in de className van het root element.

Open daarna `app/globals.css` en vervang de font-variabelen:

  Van:
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);

  Naar:
    --font-sans: var(--font-body);
    --font-mono: var(--font-heading);

  Opmerking: als de klantwebsite geen code-elementen bevat (niet-tech), mag
  --font-mono ook op var(--font-body) worden gezet — scheelt een font-import.

---

## REGELS

- Raak geen Sanity schemas, queries of Studio-configuratie aan
- Raak geen componenten, secties of paginastructuur aan
- Pas alleen de zes kleur-tokens en de twee font-variabelen aan
- Verander geen packages of dependencies
- Controleer na de aanpassingen of `npm run dev` nog foutloos start