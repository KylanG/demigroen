# SSUPPLY Starter v1.0 — Projectspecificatie

> Laatst bijgewerkt: 12 april 2026, 00:00
> Status: ✅ Volledig gebouwd en werkend

Dit document beschrijft de volledige specificatie van de **SSUPPLY Starter v1.0** boilerplate.
Gebruik dit bestand als leidraad bij het bouwen of uitbreiden van het project.

---

## 1. Stack

| Onderdeel | Keuze |
|---|---|
| Framework | Next.js 15 (App Router) |
| Taal | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` syntax) + `@tailwindcss/typography` |
| CMS | Sanity v3 (embedded Studio op `/studio`) |
| Lettertype | Geist via `next/font/google` |
| E-mail | Resend |
| Bundler dev | Turbopack (`next dev --turbopack`) |
| Bundler build | Webpack (`next build`) |
| Deploy | Vercel |

---

## 2. Packages

```bash
npm install next-sanity @sanity/image-url sanity \
  @sanity/vision @sanity/icons @sanity/ui resend react-icons \
  @tailwindcss/typography @portabletext/react
```

---

## 3. Omgevingsvariabelen

`.env.local` (nooit committen naar Git):

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=        ← alleen lezen (SSR + preview)
SANITY_API_WRITE_TOKEN=       ← schrijfrechten (seed script)

# Resend
RESEND_API_KEY=
CONTACT_FORM_TO_EMAIL=

# Preview mode
SANITY_PREVIEW_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=https://example.com
```

Commit altijd een `.env.local.example` met dezelfde sleutels maar lege waarden.

---

## 4. Projectstructuur

```
/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx              ← Header, Footer, CookieBanner, PreviewBanner
│   │   ├── loading.tsx             ← algemene pagina skeleton
│   │   ├── page.tsx                ← homepage (slug 'home' uit Sanity)
│   │   ├── [slug]/page.tsx         ← dynamische pagina's
│   │   ├── blog/
│   │   │   ├── page.tsx            ← blog overzicht met categoriefilter
│   │   │   ├── loading.tsx         ← blog overzicht skeleton
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        ← blog detailpagina met breadcrumbs
│   │   │       └── loading.tsx     ← blog detailpagina skeleton
│   │   └── styleguide/page.tsx     ← hardcoded UI-referentiepagina (noIndex)
│   ├── api/
│   │   ├── contact/route.ts        ← Resend contactformulier API
│   │   ├── draft/route.ts          ← Sanity preview mode inschakelen
│   │   └── disable-draft/route.ts  ← Sanity preview mode uitschakelen
│   ├── studio/
│   │   └── [[...tool]]/page.tsx    ← embedded Sanity Studio
│   ├── not-found.tsx               ← 404 pagina (data uit Sanity)
│   ├── sitemap.ts                  ← dynamische XML sitemap
│   ├── robots.ts                   ← robots.txt (respecteert siteNoIndex)
│   ├── globals.css                 ← Tailwind @theme tokens + @plugin typography
│   └── layout.tsx                  ← root layout met Geist font + favicon metadata
├── components/
│   ├── layout/
│   │   ├── Header.tsx              ← sticky, hamburger, actieve link
│   │   └── Footer.tsx              ← kolommen, socials, copyright
│   ├── ui/
│   │   └── Breadcrumbs.tsx         ← breadcrumb nav met JSON-LD BreadcrumbList
│   ├── sections/
│   │   ├── SectionRenderer.tsx     ← dispatcher op basis van _type
│   │   ├── HeroSection.tsx
│   │   ├── TextImageSection.tsx
│   │   ├── CtaBannerSection.tsx
│   │   ├── UspSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── RichTextSection.tsx
│   ├── CookieBanner.tsx            ← consent banner, laadt GTM/GA4 na acceptatie
│   ├── PreviewBanner.tsx           ← zichtbare balk in Sanity preview modus
│   └── PortableTextRenderer.tsx    ← Portable Text met custom styling
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── documents/
│   │   │   ├── siteSettings.ts
│   │   │   ├── headerSettings.ts
│   │   │   ├── footerSettings.ts
│   │   │   ├── page.ts
│   │   │   ├── post.ts
│   │   │   ├── author.ts
│   │   │   └── category.ts
│   │   ├── sections/
│   │   │   ├── textImageSection.ts
│   │   │   ├── ctaBannerSection.ts
│   │   │   ├── uspSection.ts
│   │   │   ├── testimonialsSection.ts
│   │   │   ├── faqSection.ts
│   │   │   ├── teamSection.ts
│   │   │   ├── contactSection.ts
│   │   │   └── richTextSection.ts
│   │   └── objects/
│   │       ├── localizedString.ts
│   │       ├── localizedText.ts
│   │       ├── linkObject.ts
│   │       └── seoFields.ts
│   ├── lib/
│   │   ├── client.ts               ← publieke client + clientWithToken (previewDrafts)
│   │   ├── image.ts                ← urlFor() helper
│   │   └── queries.ts              ← alle GROQ queries
│   └── structure.ts                ← custom desk structuur met singletons + categorieën
├── types/
│   └── sections.ts                 ← TypeScript interfaces voor alle page sections
├── lib/
│   └── i18n.ts                     ← getLang() helper (NL/EN)
├── scripts/
│   ├── seed.cjs                    ← seed script (npm run seed)
│   └── patch-react-useeffectevent.cjs  ← postinstall patch
├── sanity.config.ts
├── next.config.ts
├── vercel.json
├── .env.local                      ← nooit committen
├── .env.local.example
└── SPEC.md
```

---

## 5. Tailwind CSS v4

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-primary: #2563eb;           /* ← aanpassen per klant */
  --color-primary-foreground: #ffffff;
  --color-secondary: #64748b;
  --color-secondary-foreground: #ffffff;
  --color-background: #f9f9f9;
  --color-body: #1a1a1a;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;

  --spacing-container: 1280px;
  --spacing-section: 6rem;           /* ← verticale sectie padding */

  --radius-sm: 0.375rem;             /* ← inputs, badges */
  --radius-md: 0.75rem;              /* ← knoppen, kaarten */
  --radius-lg: 1.25rem;
  --radius-full: 9999px;

  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;     /* ← standaard hover/focus */
  --transition-slow: 400ms ease;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Drie utility-klassen zijn geregistreerd via `@utility`: `transition-fast`, `transition-base`, `transition-slow`.

> ⚠️ `--color-primary` is het enige token dat per klantproject aangepast wordt.

---

## 6. Lettertype

```typescript
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
```

---

## 7. Sanity — Desk Structuur

```
⚙️  Site Instellingen
  ├── Algemene Instellingen   (singleton: documentId = 'siteSettings')
  ├── Header Instellingen     (singleton: documentId = 'headerSettings')
  └── Footer Instellingen     (singleton: documentId = 'footerSettings')
─────────────────────────────────────────
📄 Pagina's
✍️  Blog
  ├── Blogposts
  └── Categorieën
👤 Auteurs
```

Singletons verschijnen **niet** als losse lijst — alleen via Site Instellingen bereikbaar.

---

## 8. Sanity — Schema's

### 8.1 Objects

| Schema | Gebruik |
|---|---|
| `localizedString` | `{ nl: string (verplicht), en: string (optioneel) }` — korte teksten |
| `localizedText` | `{ nl: text (verplicht), en: text (optioneel) }` — lange teksten |
| `linkObject` | `{ label, href, blank: boolean }` |
| `seoFields` | `{ title, description (max 160), ogImage, noIndex }` |

### 8.2 Documents

#### `siteSettings` (singleton) — 4 tabs
| Tab | Veld | Type |
|---|---|---|
| Algemeen | `siteName` | string (verplicht) |
| Algemeen | `logo` | image (hotspot) |
| Algemeen | `logoAlt` | string |
| Algemeen | `faviconBase` | image — bronafbeelding |
| Algemeen | `faviconIco` | image — 16×16 / 32×32 |
| Algemeen | `appleTouchIcon` | image — 180×180 (iOS) |
| Algemeen | `webmanifestIcon` | image — 192×192 / 512×512 (Android/PWA) |
| Analytics | `gtmId` | string — bijv. `GTM-XXXXXXX` |
| Analytics | `ga4Id` | string — bijv. `G-XXXXXXXXXX` (alleen actief zonder GTM) |
| Analytics | `googleSiteVerification` | string — wordt meta tag in `<head>` |
| SEO | `siteNoIndex` | boolean — verberg hele site voor zoekmachines |
| SEO | `seo` | seoFields — globale fallback |
| 404-pagina | `notFoundTitle` | localizedString |
| 404-pagina | `notFoundText` | localizedText |
| 404-pagina | `notFoundCta` | linkObject |

#### `headerSettings` (singleton)
| Veld | Type |
|---|---|
| `logo` | image (hotspot) |
| `logoAlt` | string |
| `navigation` | array van `linkObject` |
| `ctaButton` | linkObject |

#### `footerSettings` (singleton)
| Veld | Type |
|---|---|
| `logo` | image (hotspot) |
| `logoAlt` | string |
| `columns` | array van `{ title, links: linkObject[] }` |
| `socials` | `{ linkedin, instagram, facebook, twitter }` (url) |
| `copyright` | string |

#### `page` — 3 tabs (Pagina, Inhoud, SEO)
| Tab | Veld | Type |
|---|---|---|
| Pagina | `title` | string (verplicht, intern) |
| Pagina | `slug` | slug (source: `title`) — homepage = `home` |
| Pagina | `heroHeading` | localizedString (optioneel — fallback: title) |
| Pagina | `heroSubheading` | localizedText |
| Pagina | `heroImage` | image (hotspot) |
| Pagina | `heroImageAlt` | localizedString |
| Pagina | `heroPrimaryCta` | linkObject |
| Pagina | `heroSecondaryCta` | linkObject |
| Inhoud | `blocks` | array van alle blokken |
| SEO | `seo` | seoFields |

#### `post`
| Veld | Type |
|---|---|
| `title` | localizedString (verplicht) |
| `slug` | slug (source: `title.nl`) |
| `author` | reference → `author` |
| `coverImage` | image (hotspot) |
| `excerpt` | localizedText |
| `publishedAt` | datetime |
| `categories` | array van references → `category` |
| `body` | Portable Text (blocks + images met alt-veld) |
| `seo` | seoFields |

#### `category`
| Veld | Type |
|---|---|
| `title` | localizedString (verplicht) |
| `slug` | slug (source: `title.nl`) |
| `description` | localizedText |

#### `author`
| Veld | Type |
|---|---|
| `name` | string (verplicht) |
| `slug` | slug |
| `photo` | image (hotspot) |
| `bio` | localizedText |

### 8.3 Sections (page builder)

De hero is **geen** losse section — die staat flat op het `page` document (tab Pagina). Alle overige sections zijn opgenomen in het `blocks` array op het page document.

Alle tekstvelden gebruiken `localizedString` of `localizedText` tenzij anders aangegeven. Sections met afbeeldingen hebben een `imageAlt` / `photoAlt` veld voor toegankelijkheid.

Het Sanity `name` veld (bijv. `textImageBlock`) is bewust behouden voor database-compatibiliteit. Componentbestanden gebruiken de `Section` suffix.

| Section (`_type`) | Component | Velden |
|---|---|---|
| `textImageBlock` | `TextImageSection` | `heading`, `text`, `image`, `imageAlt`, `imagePosition` (left/right) |
| `ctaBannerBlock` | `CtaBannerSection` | `heading`, `subheading`, `primaryCta`, `secondaryCta`, `theme` (primary/dark/light) |
| `uspBlock` | `UspSection` | `heading`, `usps[]` (icon, title, text) |
| `testimonialsBlock` | `TestimonialsSection` | `heading`, `testimonials[]` (name, role, company, quote, photo, photoAlt) |
| `faqBlock` | `FaqSection` | `heading`, `items[]` (question, answer) |
| `teamBlock` | `TeamSection` | `heading`, `subheading`, `members[]` (name, role, bio, photo, photoAlt) |
| `contactBlock` | `ContactSection` | `heading`, `subheading` |
| `richTextSection` | `RichTextSection` | `content` (Portable Text: blocks + images met alt-veld) |

### 8.4 TypeScript types (`types/sections.ts`)

Discriminated union voor type-veilige section rendering:

```typescript
export type PageSection =
  | TextImageSection
  | CtaBannerSection
  | UspSection
  | TestimonialsSection
  | FaqSection
  | TeamSection
  | ContactSection
  | RichTextSection
```

`SectionRenderer` dispatcht op `section._type` en geeft een dev-waarschuwing als een onbekend type wordt gebruikt.

---

## 9. Sanity — Client & Helpers

### `sanity/lib/client.ts`
- `client` — publieke client voor SSR/SSG (useCdn: true, zonder token)
- `clientWithToken` — client met `SANITY_API_READ_TOKEN`, `perspective: 'previewDrafts'` voor draft preview

### `sanity/lib/image.ts`
```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}
```

### `sanity/lib/queries.ts`
| Query | Gebruik |
|---|---|
| `siteSettingsQuery` | Globale site-instellingen (incl. favicon, notFound, analytics) |
| `notFoundQuery` | 404-pagina tekst en CTA uit siteSettings |
| `headerSettingsQuery` | Header data |
| `footerSettingsQuery` | Footer data |
| `pageBySlugQuery` | Pagina op basis van slug (incl. heroImageAlt, alle blokken) |
| `allPageSlugsQuery` | Alle slugs + noIndex vlag voor sitemap |
| `allPostsQuery` | Alle blogposts, filterbaar op `$category` slug |
| `postBySlugQuery` | Één blogpost op basis van slug (incl. categories) |
| `allPostSlugsQuery` | Alle post slugs voor `generateStaticParams` |
| `allCategoriesQuery` | Alle categorieën voor filterUI |

---

## 10. i18n Helper

```typescript
// lib/i18n.ts
export type Locale = 'nl' | 'en'
export const defaultLocale: Locale = 'nl'

export function getLang(
  field: { nl?: string; en?: string } | undefined,
  locale: Locale = defaultLocale
): string {
  if (!field) return ''
  return field[locale] || field[defaultLocale] || ''
}
```

---

## 11. Analytics, SEO & Cookies

### Cookie consent (`CookieBanner.tsx`)
- Client component, getoond bij eerste bezoek wanneer `localStorage.cookie_consent` niet gezet is
- Twee opties: **Accepteren** (slaat `accepted` op) of **Weigeren** (slaat `declined` op)
- GTM of GA4 scripts worden uitsluitend **na acceptatie** dynamisch in de DOM geïnjecteerd
- Bij weigering worden geen tracking scripts geladen
- De site layout bevat **geen** vaste `<Script>` tags voor analytics

### Favicon (`app/layout.tsx`)
- Root layout heeft `generateMetadata()` die favicon-URLs ophaalt uit Sanity
- `faviconIco` → `<link rel="icon">` (16×16, 32×32)
- `appleTouchIcon` → `<link rel="apple-touch-icon">` (180×180)
- `webmanifestIcon` → `<link rel="icon">` (192×192, 512×512)

### OG image fallback
Per pagina/post wordt de OG-afbeelding bepaald in deze volgorde:
1. Paginaspecifieke `seo.ogImage`
2. Post `coverImage` (alleen voor blogposts)
3. `siteSettings.seo.ogImage`
4. `siteSettings.logo`

### Sitemap (`app/sitemap.ts`)
- Leeg als `siteSettings.siteNoIndex` true is
- Bevat alle pagina's zonder `seo.noIndex`, alle blogposts en `/blog`
- Gebruikt `NEXT_PUBLIC_SITE_URL` als basis-URL

### Robots.txt (`app/robots.ts`)
- `disallow: /` als `siteNoIndex` true is
- `allow: /` met sitemap-referentie als `siteNoIndex` false is

### Per pagina
- `generateMetadata()` met paginaspecifieke SEO als eerste keuze
- Fallback naar `siteSettings.seo`
- `noIndex` wordt gerespecteerd
- `googleSiteVerification` via `siteSettings.googleSiteVerification`

---

## 12. Header & Footer

### Header
- Sticky
- Logo links via `next/image` + Sanity CDN
- Navigatielinks (desktop)
- CTA knop rechts (desktop)
- Hamburger menu (mobiel) via `useState`
- Actieve link styling via `usePathname`

### Footer
- Logo bovenaan
- Linkkolommen in responsive grid
- Sociale media iconen via `react-icons`
- Copyright regel onderaan

---

## 13. Contactformulier

### `app/api/contact/route.ts`
- Accepteert POST: `{ name, email, message }`
- Server-side validatie
- Verstuurt e-mail via Resend naar `CONTACT_FORM_TO_EMAIL`
- Geeft `200`, `400`, of `500` terug

### `ContactBlock.tsx`
- Velden: Naam, E-mail, Bericht
- Client-side validatie
- Loading state
- Succes- en foutmelding
- `fetch` naar `/api/contact`

---

## 14. Blog

### Overzichtspagina (`app/(site)/blog/page.tsx`)
- `force-dynamic`
- Categoriefilter als pill-tabs (URL param `?category=slug`)
- `allPostsQuery` accepteert `$category` parameter (null = alles)
- Categorielabels worden op kaarten getoond

### Detailpagina (`app/(site)/blog/[slug]/page.tsx`)
- Breadcrumbs: Home → Blog → [post titel]
- JSON-LD `BreadcrumbList` voor SEO
- Post body gerenderd via `PortableTextRenderer`

### `PortableTextRenderer.tsx`
Custom Portable Text component met styling voor:
- `h2`, `h3`, `h4` — Tailwind typografieklassen
- `blockquote` — primaire border-l, italic
- `ul` / `ol` — nette lijsten met juiste spacing
- `a` — primaire kleur, underline, `transition-base`
- `strong`, `em`, `code` — inline styles
- `image` — `next/image` met figcaption via alt-tekst

---

## 15. Skeleton loaders

| Bestand | Beschrijving |
|---|---|
| `app/(site)/loading.tsx` | Hero + blok placeholder |
| `app/(site)/blog/loading.tsx` | Titel, categoriepills, 6 kaartplaceholders |
| `app/(site)/blog/[slug]/loading.tsx` | Breadcrumbs, header, coverafbeelding, bodytekstpatroon |

Alle skeletons gebruiken `animate-pulse` met `bg-border` als placeholder kleur.

---

## 16. Sanity Preview Mode

### API routes
- `app/api/draft/route.ts` — valideert `SANITY_PREVIEW_SECRET`, roept `draftMode().enable()` aan, redirect naar `?slug=`
- `app/api/disable-draft/route.ts` — roept `draftMode().disable()` aan, redirect terug

### Implementatie
- `clientWithToken` heeft `perspective: 'previewDrafts'`
- Site layout detecteert `draftMode().isEnabled` en gebruikt dan `clientWithToken` i.p.v. `client`
- `PreviewBanner.tsx` toont een vaste balk onderaan met "Afsluiten" knop

---

## 17. Seeded content

| Type | ID / slug | Inhoud |
|---|---|---|
| siteSettings | `siteSettings` | Sitenaam, SEO |
| headerSettings | `headerSettings` | Navigatie, CTA knop |
| footerSettings | `footerSettings` | Linkkolom, socials, copyright |
| page | `home` | Hero, USP's, CTA banner |
| page | `contact` | Hero + contactformulier blok |
| page | `inhoud-voorbeelden` | Alle blokken in elke configuratie (noIndex) |
| category | `nieuws` | Nieuws categorie (NL/EN) |
| category | `tips-tricks` | Tips & Tricks categorie (NL/EN) |
| post | `aan-de-slag-met-nextjs-15-app-router` | Blogpost over Next.js 15 |
| post | `waarom-sanity-v3-als-headless-cms` | Blogpost over Sanity v3 |
| post | `tailwind-css-v4-veranderingen` | Blogpost over Tailwind CSS v4 |

Seed uitvoeren:
```bash
npm run seed
```

---

## 18. Bekende quirk — React 19.1 + Sanity

Sanity gebruikt intern `useEffectEvent` dat niet in React 19.1.x stable zit. Turbopack resolveert `react` naar `next/dist/compiled/react` (interne bundel), waardoor aliassen worden omzeild.

**Oplossing:** `scripts/patch-react-useeffectevent.cjs` patcht de hook direct in de gecompileerde React-bestanden. Draait automatisch via `postinstall` bij elke `npm install`.

---

## 19. Vercel

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

Stel deze environment variables in op Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_FORM_TO_EMAIL`
- `SANITY_PREVIEW_SECRET`
- `NEXT_PUBLIC_SITE_URL`

---

## 20. Handige scripts

```bash
npm run dev     # Turbopack dev server
npm run build   # Webpack productie build
npm run seed    # Sanity seed documenten aanmaken/overschrijven
```

---

## 21. Conventies

- **Primaire kleur:** alleen `--color-primary` in `globals.css` aanpassen per klant
- **Design tokens:** gebruik `bg-background`, `text-body`, `text-muted`, `border-border`, `py-section`, `rounded-md`, `rounded-sm`, `transition-base` — nooit hardcoded Tailwind grijswaarden
- **Meertaligheid:** alle tekstvelden in blokken zijn `localizedString`/`localizedText` — ophalen via `getLang(field, locale)`
- **Afbeeldingen:** altijd `next/image` + `urlFor()` van Sanity CDN, altijd een alt-tekst veld
- **SEO:** elke pagina heeft `generateMetadata()` met OG fallback-keten en noIndex check
- **Singletons:** altijd via eigen queries ophalen, nooit via pagina-blokken
- **Tracking:** nooit directe `<Script>` tags voor analytics — altijd via `CookieBanner` na consent

---

*SSUPPLY Starter v1.0 — Projectspecificatie*
