#!/usr/bin/env node
/**
 * Seed script — maakt startdocumenten aan in Sanity.
 * Gebruik: node scripts/seed.cjs
 */
'use strict'

const fs   = require('fs')
const path = require('path')
const { createClient } = require('@sanity/client')

// ── Lees .env.local handmatig (geen dotenv-dependency nodig) ──────────────
function loadEnv(filePath) {
  try {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch { /* bestand bestaat niet */ }
}
loadEnv(path.resolve(__dirname, '../.env.local'))

// ── Sanity client ─────────────────────────────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn:    false,
})

// ── Helpers ───────────────────────────────────────────────────────────────
const key = () => Math.random().toString(36).slice(2, 10)

const nl  = (text) => ({ nl: text })
const bi  = (nl, en) => ({ nl, en })
const link = (label, href, blank = false) => ({ label, href, blank })

// ── Documenten ────────────────────────────────────────────────────────────
const documents = [

  // ── siteSettings (singleton) ─────────────────────────────────────────
  {
    _id:      'siteSettings',
    _type:    'siteSettings',
    siteName: 'SSUPPLY Starter',
    seo: {
      _type: 'seoFields',
      title: 'SSUPPLY Starter',
      description: 'Een modern Next.js 15 + Sanity v3 starter.',
    },
  },

  // ── headerSettings (singleton) ────────────────────────────────────────
  {
    _id:   'headerSettings',
    _type: 'headerSettings',
    navigation: [
      { _key: key(), _type: 'linkObject', ...link('Home',    '/') },
      { _key: key(), _type: 'linkObject', ...link('Blog',    '/blog') },
      { _key: key(), _type: 'linkObject', ...link('Contact', '/contact') },
    ],
    ctaButton: { _type: 'linkObject', ...link('Offerte aanvragen', '/contact') },
  },

  // ── footerSettings (singleton) ────────────────────────────────────────
  {
    _id:       'footerSettings',
    _type:     'footerSettings',
    copyright: `© ${new Date().getFullYear()} SSUPPLY. Alle rechten voorbehouden.`,
    columns: [
      {
        _key: key(),
        title: 'Navigatie',
        links: [
          { _key: key(), _type: 'linkObject', ...link('Home',    '/') },
          { _key: key(), _type: 'linkObject', ...link('Blog',    '/blog') },
          { _key: key(), _type: 'linkObject', ...link('Contact', '/contact') },
        ],
      },
    ],
    socials: {
      linkedin:  'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },

  // ── HOME ─────────────────────────────────────────────────────────────
  {
    _id:   'page-home',
    _type: 'page',
    title: 'Home',
    slug:  { _type: 'slug', current: 'home' },
    heroHeading:      bi('Welkom bij SSUPPLY Starter', 'Welcome to SSUPPLY Starter'),
    heroSubheading:   bi(
      'Een snelle, moderne boilerplate gebouwd op Next.js 15 en Sanity v3.',
      'A fast, modern boilerplate built on Next.js 15 and Sanity v3.',
    ),
    heroPrimaryCta:   { _type: 'linkObject', ...link('Neem contact op', '/contact') },
    heroSecondaryCta: { _type: 'linkObject', ...link('Meer lezen', '/blog') },
    blocks: [
      {
        _key:  key(),
        _type: 'uspBlock',
        heading: nl('Waarom SSUPPLY Starter?'),
        usps: [
          { _key: key(), icon: '⚡', title: nl('Razendsnel'), text: nl('Turbopack, Next.js 15 App Router en Tailwind v4.') },
          { _key: key(), icon: '🎨', title: nl('Volledig maakbaar'), text: nl('Primaire kleur aanpassen in één CSS-variabele.') },
          { _key: key(), icon: '📦', title: nl('Pagebuilder klaar'), text: nl('8 blokken out-of-the-box, eenvoudig uitbreidbaar.') },
        ],
      },
      {
        _key:    key(),
        _type:   'ctaBannerBlock',
        theme:   'primary',
        heading: nl('Klaar om te starten?'),
        subheading: nl('Maak je eerste pagina aan in de Sanity Studio.'),
        primaryCta:   { _type: 'linkObject', ...link('Open Studio', '/studio') },
        secondaryCta: { _type: 'linkObject', ...link('Bekijk de docs', 'https://nextjs.org/docs', true) },
      },
    ],
    seo: { _type: 'seoFields', title: 'Home — SSUPPLY Starter' },
  },

  // ── CONTACT ──────────────────────────────────────────────────────────
  {
    _id:   'page-contact',
    _type: 'page',
    title: 'Contact',
    slug:  { _type: 'slug', current: 'contact' },
    heroHeading:    bi('Neem contact op', 'Get in touch'),
    heroSubheading: bi(
      'Heb je een vraag of wil je samenwerken? Stuur ons een bericht.',
      'Have a question or want to collaborate? Send us a message.',
    ),
    blocks: [
      {
        _key:       key(),
        _type:      'contactBlock',
        heading:    nl('Stuur een bericht'),
        subheading: nl('We reageren binnen 1 werkdag.'),
      },
    ],
    seo: { _type: 'seoFields', title: 'Contact — SSUPPLY Starter' },
  },

  // ── BLOG CATEGORIEËN ─────────────────────────────────────────────────
  {
    _id:   'category-nieuws',
    _type: 'category',
    title: bi('Nieuws', 'News'),
    slug:  { _type: 'slug', current: 'nieuws' },
    description: bi('De laatste updates en aankondigingen.', 'The latest updates and announcements.'),
  },
  {
    _id:   'category-tips',
    _type: 'category',
    title: bi('Tips & Tricks', 'Tips & Tricks'),
    slug:  { _type: 'slug', current: 'tips-tricks' },
    description: bi('Handige tips voor developers en designers.', 'Useful tips for developers and designers.'),
  },

  // ── BLOGPOSTS ─────────────────────────────────────────────────────────
  {
    _id:         'post-nextjs-15',
    _type:       'post',
    title:       bi('Aan de slag met Next.js 15 App Router', 'Getting started with Next.js 15 App Router'),
    slug:        { _type: 'slug', current: 'aan-de-slag-met-nextjs-15-app-router' },
    excerpt:     bi(
      'Next.js 15 introduceert een volledig vernieuwde App Router met Layouts, Server Components en meer. In dit artikel leggen we de basisconcepten uit.',
      'Next.js 15 introduces a completely revamped App Router with Layouts, Server Components, and more. In this article we explain the core concepts.',
    ),
    publishedAt: '2026-03-01T10:00:00.000Z',
    categories: [
      { _key: key(), _type: 'reference', _ref: 'category-tips' },
    ],
    body: [
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Next.js 15 brengt een heleboel nieuwe mogelijkheden mee. De App Router maakt gebruik van React Server Components, waardoor je data direct op de server kunt ophalen zonder extra API-laag. Dit resulteert in snellere laadtijden en een betere developer experience.' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: key(), _type: 'span', text: 'Server Components vs Client Components' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Server Components draaien uitsluitend op de server en sturen alleen HTML naar de browser. Client Components (gemarkeerd met "use client") worden gehydrateerd in de browser en kunnen interactiviteit toevoegen zoals onClick-handlers en useState.' }],
      },
    ],
    seo: { _type: 'seoFields', title: 'Aan de slag met Next.js 15 App Router — SSUPPLY Starter' },
  },
  {
    _id:         'post-sanity-v3',
    _type:       'post',
    title:       bi('Waarom wij kiezen voor Sanity v3 als headless CMS', 'Why we choose Sanity v3 as headless CMS'),
    slug:        { _type: 'slug', current: 'waarom-sanity-v3-als-headless-cms' },
    excerpt:     bi(
      'Sanity v3 biedt een flexibel schema-systeem, realtime samenwerking en een embedded Studio — ideaal voor moderne webprojecten.',
      'Sanity v3 offers a flexible schema system, real-time collaboration, and an embedded Studio — ideal for modern web projects.',
    ),
    publishedAt: '2026-03-15T09:00:00.000Z',
    categories: [
      { _key: key(), _type: 'reference', _ref: 'category-nieuws' },
    ],
    body: [
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Als headless CMS heeft Sanity v3 een aantal sterke punten die het onderscheiden van andere platformen. Het schema-systeem is volledig code-first, wat betekent dat je types in TypeScript definieert en direct versiebeheert in je repository.' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: key(), _type: 'span', text: 'Embedded Studio' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Een van de grootste voordelen van Sanity v3 is de mogelijkheid om de Studio direct in je Next.js-applicatie te embedden op een route als /studio. Dit betekent geen apart dashboard-domein en eenvoudigere toegangsbeheer.' }],
      },
    ],
    seo: { _type: 'seoFields', title: 'Waarom Sanity v3 — SSUPPLY Starter' },
  },
  {
    _id:         'post-tailwind-v4',
    _type:       'post',
    title:       bi('Tailwind CSS v4: de belangrijkste veranderingen op een rij', 'Tailwind CSS v4: the most important changes listed'),
    slug:        { _type: 'slug', current: 'tailwind-css-v4-veranderingen' },
    excerpt:     bi(
      'Tailwind CSS v4 introduceert de nieuwe @theme syntax, snellere builds via Lightning CSS en een vereenvoudigde configuratie. Dit moet je weten.',
      'Tailwind CSS v4 introduces the new @theme syntax, faster builds via Lightning CSS, and a simplified config. Here\'s what you need to know.',
    ),
    publishedAt: '2026-04-01T08:00:00.000Z',
    categories: [
      { _key: key(), _type: 'reference', _ref: 'category-tips' },
    ],
    body: [
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Tailwind CSS v4 is een grote stap voorwaarts voor het populaire utility-first framework. De meest opvallende verandering is de introductie van de @theme syntax in je CSS-bestand, waardoor je design tokens direct in CSS definieert in plaats van in een JavaScript-configuratiebestand.' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: key(), _type: 'span', text: '@theme syntax' }],
      },
      {
        _key:  key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: 'Met de @theme syntax definieer je CSS-variabelen die automatisch als Tailwind-klassen beschikbaar worden. In de SSUPPLY Starter is --color-primary het enige token dat je per klantproject aanpast. Alle andere tokens erven van de Tailwind-standaarden.' }],
      },
    ],
    seo: { _type: 'seoFields', title: 'Tailwind CSS v4 veranderingen — SSUPPLY Starter' },
  },

  // ── PAGINA INHOUDSVOORBEELDEN ─────────────────────────────────────────
  {
    _id:   'page-inhoud-voorbeelden',
    _type: 'page',
    title: 'Pagina inhoudsvoorbeelden',
    slug:  { _type: 'slug', current: 'inhoud-voorbeelden' },
    heroHeading:      nl('Alle blokken — voorbeeldpagina'),
    heroSubheading:   nl('Op deze pagina staan alle beschikbare pagebuilder-blokken ingesteld met voorbeeldcontent.'),
    heroPrimaryCta:   { _type: 'linkObject', ...link('Primaire knop', '#') },
    heroSecondaryCta: { _type: 'linkObject', ...link('Secundaire knop', '#') },
    blocks: [
      // textImageBlock — afbeelding rechts
      {
        _key:          key(),
        _type:         'textImageBlock',
        imagePosition: 'right',
        heading:       nl('Tekst + Afbeelding — afbeelding rechts'),
        text:          nl('Dit blok combineert een tekstkolom met een afbeelding. De afbeelding staat hier aan de rechterkant. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
      },
      // textImageBlock — afbeelding links
      {
        _key:          key(),
        _type:         'textImageBlock',
        imagePosition: 'left',
        heading:       nl('Tekst + Afbeelding — afbeelding links'),
        text:          nl('Zelfde blok maar met de afbeelding aan de linkerkant. Handig om visuele afwisseling te creëren op een lange pagina. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'),
      },
      // uspBlock
      {
        _key:    key(),
        _type:   'uspBlock',
        heading: nl("USP's blok"),
        usps: [
          { _key: key(), icon: '🚀', title: nl('USP één'),  text: nl('Omschrijving van het eerste unique selling point.') },
          { _key: key(), icon: '🛡️', title: nl('USP twee'), text: nl('Omschrijving van het tweede unique selling point.') },
          { _key: key(), icon: '💡', title: nl('USP drie'), text: nl('Omschrijving van het derde unique selling point.') },
          { _key: key(), icon: '🎯', title: nl('USP vier'), text: nl('Omschrijving van het vierde unique selling point.') },
        ],
      },
      // ctaBannerBlock — primary
      {
        _key:         key(),
        _type:        'ctaBannerBlock',
        theme:        'primary',
        heading:      nl('CTA Banner — thema: primair'),
        subheading:   nl('Ondertitel voor de call-to-action banner in de primaire kleur.'),
        primaryCta:   { _type: 'linkObject', ...link('Primaire actie', '#') },
        secondaryCta: { _type: 'linkObject', ...link('Secundaire actie', '#') },
      },
      // ctaBannerBlock — dark
      {
        _key:         key(),
        _type:        'ctaBannerBlock',
        theme:        'dark',
        heading:      nl('CTA Banner — thema: donker'),
        subheading:   nl('Zelfde blok maar met een donkere achtergrond.'),
        primaryCta:   { _type: 'linkObject', ...link('Primaire actie', '#') },
        secondaryCta: { _type: 'linkObject', ...link('Secundaire actie', '#') },
      },
      // ctaBannerBlock — light
      {
        _key:         key(),
        _type:        'ctaBannerBlock',
        theme:        'light',
        heading:      nl('CTA Banner — thema: licht'),
        subheading:   nl('Zelfde blok maar met een lichte achtergrond.'),
        primaryCta:   { _type: 'linkObject', ...link('Primaire actie', '#') },
        secondaryCta: { _type: 'linkObject', ...link('Secundaire actie', '#') },
      },
      // testimonialsBlock
      {
        _key:    key(),
        _type:   'testimonialsBlock',
        heading: nl('Testimonials blok'),
        testimonials: [
          { _key: key(), name: 'Anna de Vries',  role: 'CEO',              company: 'Bedrijf A', quote: nl('Dit is een uitstekend product. Wij zijn er heel blij mee en bevelen het van harte aan.') },
          { _key: key(), name: 'Mark Janssen',   role: 'Marketing Manager', company: 'Bedrijf B', quote: nl('De samenwerking was prettig en het resultaat heeft onze verwachtingen overtroffen.') },
          { _key: key(), name: 'Sophie Bakker',  role: 'Designer',          company: 'Bedrijf C', quote: nl('Professioneel, snel en kwalitatief hoogwaardig. Een absolute aanrader!') },
        ],
      },
      // faqBlock
      {
        _key:    key(),
        _type:   'faqBlock',
        heading: nl('FAQ blok'),
        items: [
          { _key: key(), question: nl('Wat is de levertijd?'),             answer: nl('Wij hanteren doorgaans een levertijd van 5 tot 10 werkdagen, afhankelijk van de complexiteit van de opdracht.') },
          { _key: key(), question: nl('Kan ik mijn bestelling annuleren?'), answer: nl('Ja, bestellingen kunnen geannuleerd worden zolang de productie nog niet is gestart. Neem contact met ons op.') },
          { _key: key(), question: nl('Bieden jullie maatwerk aan?'),       answer: nl('Absoluut. Neem contact op met ons team om de mogelijkheden te bespreken.') },
          { _key: key(), question: nl('Hoe neem ik contact op?'),          answer: nl('Via het contactformulier op onze contactpagina of per e-mail. We reageren binnen 1 werkdag.') },
        ],
      },
      // teamBlock
      {
        _key:       key(),
        _type:      'teamBlock',
        heading:    nl('Team blok'),
        subheading: nl('Maak kennis met ons team van experts.'),
        members: [
          { _key: key(), name: 'Emma Visser',   role: nl('Oprichter & CEO'),          bio: nl('Emma heeft 10 jaar ervaring in digitale strategie en productdesign.') },
          { _key: key(), name: 'Liam de Boer',  role: nl('Lead Developer'),            bio: nl('Liam is gespecialiseerd in Next.js, TypeScript en cloud-infrastructuur.') },
          { _key: key(), name: 'Sara Meijer',   role: nl('UX/UI Designer'),            bio: nl('Sara vertaalt complexe vraagstukken naar heldere, intuïtieve interfaces.') },
          { _key: key(), name: 'Tom Klaassen',  role: nl('Content Strateeg'),          bio: nl('Tom zorgt ervoor dat elk woord bijdraagt aan de merkbelofte.') },
        ],
      },
      // contactBlock
      {
        _key:       key(),
        _type:      'contactBlock',
        heading:    nl('Contactformulier blok'),
        subheading: nl('Dit is een voorbeeld van het contactformulier als blok binnen een pagina.'),
      },
    ],
    seo: { _type: 'seoFields', title: 'Inhoudsvoorbeelden — SSUPPLY Starter', noIndex: true },
  },
]

// ── Uitvoeren ─────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱  Seeding naar project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} (${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'})…\n`)

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓  ${doc._type.padEnd(20)} ${doc._id}`)
    } catch (err) {
      console.error(`  ✗  ${doc._id}:`, err.message)
    }
  }

  console.log('\n✅  Seed voltooid.\n')
}

seed()
