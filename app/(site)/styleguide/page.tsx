import type { Metadata } from 'next'
import {
  FaLinkedin, FaInstagram, FaFacebook, FaXTwitter,
  FaArrowRight, FaCheck, FaEnvelope, FaPhone, FaLocationDot,
  FaStar, FaHeart, FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaCircleInfo,
} from 'react-icons/fa6'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

// ── Hulpcomponenten ───────────────────────────────────────────────────────

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 border-b border-gray-100 scroll-mt-20">
      <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">{title}</h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {label && <p className="text-xs text-gray-400 mb-2 font-mono">{label}</p>}
      <div className="flex flex-wrap items-start gap-8">{children}</div>
    </div>
  )
}

// ── Pagina ────────────────────────────────────────────────────────────────

export default async function StyleguidePage() {
  const siteSettings = await client.fetch(siteSettingsQuery).catch(() => null)
  const siteName = siteSettings?.siteName ?? 'Site'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12 pb-8 border-b-2 border-primary">
        <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">{siteName}</p>
        <h1 className="text-5xl font-bold text-gray-900">Styleguide</h1>
        <p className="mt-3 text-gray-500">Overzicht van alle UI-elementen, tokens en componenten.</p>
      </div>

      {/* Inhoudsopgave */}
      <nav className="mb-12 p-5 bg-gray-50 rounded-xl text-sm">
        <p className="font-semibold text-gray-700 mb-3">Inhoudsopgave</p>
        <ol className="grid sm:grid-cols-2 gap-1 list-decimal list-inside text-gray-500">
          {['Kleuren', 'Typografie', 'Knoppen', 'Formulierelementen', 'Iconen', 'Kaarten'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="hover:text-primary transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── 1. Kleuren ───────────────────────────────────────────────── */}
      <Section title="1. Kleuren" id="kleuren">
        <Row>
          <ColorSwatch name="primary" value="#861054" style={{ backgroundColor: 'var(--color-primary)' }} />
          <ColorSwatch name="primary-foreground" value="#ffffff" style={{ backgroundColor: 'var(--color-primary-foreground)' }} border />
          <ColorSwatch name="secondary" value="#FF0090" style={{ backgroundColor: 'var(--color-secondary)' }} />
          <ColorSwatch name="secondary-foreground" value="#ffffff" style={{ backgroundColor: 'var(--color-secondary-foreground)' }} border />
          <ColorSwatch name="background" value="#F5EEE7" style={{ backgroundColor: 'var(--color-background)' }} border />
          <ColorSwatch name="body" value="#000000" style={{ backgroundColor: 'var(--color-body)' }} />
          <ColorSwatch name="muted" value="#6b7280" style={{ backgroundColor: 'var(--color-muted)' }} />
          <ColorSwatch name="border" value="#e5e7eb" style={{ backgroundColor: 'var(--color-border)' }} border />
        </Row>
      </Section>

      {/* ── 2. Typografie ────────────────────────────────────────────── */}
      <Section title="2. Typografie" id="typografie">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h1 — text-5xl font-bold</p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">Koptekst niveau 1</h1>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h2 — text-4xl font-bold</p>
            <h2 className="text-4xl font-bold text-gray-900">Koptekst niveau 2</h2>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h3 — text-3xl font-semibold</p>
            <h3 className="text-3xl font-semibold text-gray-900">Koptekst niveau 3</h3>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h4 — text-2xl font-semibold</p>
            <h4 className="text-2xl font-semibold text-gray-900">Koptekst niveau 4</h4>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h5 — text-xl font-semibold</p>
            <h5 className="text-xl font-semibold text-gray-900">Koptekst niveau 5</h5>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">h6 — text-lg font-semibold</p>
            <h6 className="text-lg font-semibold text-gray-900">Koptekst niveau 6</h6>
          </div>
          <hr className="border-gray-100 my-2" />
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">lead — text-xl text-gray-600</p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Dit is een lead-alinea. Gebruikt als introductietekst onder een heading. Iets groter dan normale body tekst.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">body — text-base text-gray-700</p>
            <p className="text-base text-gray-700 leading-relaxed">
              Dit is de standaard bodytekst. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">small — text-sm text-gray-500</p>
            <p className="text-sm text-gray-500">Kleine tekst voor metadata, labels en secundaire informatie.</p>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">caption / overline — text-xs uppercase tracking-widest</p>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Caption / overline tekst</p>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">mono — font-mono</p>
            <p className="font-mono text-sm text-gray-700">const greeting = &apos;Hello, world!&apos;</p>
          </div>
          <hr className="border-gray-100 my-2" />
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">link</p>
            <a href="#" className="text-primary underline hover:opacity-75 transition-opacity">Dit is een link</a>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">blockquote</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
              &ldquo;Een goed citaat inspireert en overtuigt tegelijkertijd.&rdquo;
            </blockquote>
          </div>
        </div>
      </Section>

      {/* ── 3. Knoppen ───────────────────────────────────────────────── */}
      <Section title="3. Knoppen" id="knoppen">
        <Row label="Variant">
          <button className="btn-primary">Primair</button>
          <button className="btn-secondary">Secundair</button>
          <button className="btn-outline">Outline</button>
        </Row>
        <Row label="Met icoon">
          <button className="btn-primary gap-2">
            Verder <FaArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="btn-outline gap-2">
            <FaCheck className="w-3.5 h-3.5" /> Bevestigen
          </button>
        </Row>
        <Row label="Status">
          <button disabled className="btn-primary">Uitgeschakeld</button>
          <button className="btn-primary gap-2 opacity-70 cursor-wait">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Laden…
          </button>
        </Row>
        <Row label="Volledig breed">
          <button className="btn-primary w-full max-w-sm">
            Volledige breedte
          </button>
        </Row>
      </Section>

      {/* ── 4. Formulierelementen ─────────────────────────────────────── */}
      <Section title="4. Formulierelementen" id="formulierelementen">
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tekstveld</label>
            <input type="text" placeholder="Typ hier…"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" placeholder="naam@voorbeeld.nl"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fout-staat</label>
            <input type="text" defaultValue="Ongeldige waarde"
              className="w-full px-4 py-2.5 border border-red-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 bg-red-50" />
            <p className="mt-1 text-xs text-red-500">Dit veld is verplicht.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Uitgeschakeld</label>
            <input type="text" disabled defaultValue="Kan niet worden bewerkt"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Textarea</label>
            <textarea rows={4} placeholder="Schrijf hier je bericht…"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select</label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white">
              <option>Kies een optie…</option>
              <option>Optie één</option>
              <option>Optie twee</option>
              <option>Optie drie</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary rounded" />
              <span className="text-sm text-gray-700">Checkbox — aangevinkt</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
              <span className="text-sm text-gray-700">Checkbox — leeg</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="radio" name="demo" defaultChecked className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-700">Radio — geselecteerd</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="radio" name="demo" className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-700">Radio — leeg</span>
            </label>
          </div>
        </div>
      </Section>

      {/* ── 5. Iconen ─────────────────────────────────────────────────── */}
      <Section title="5. Iconen" id="iconen">
        <p className="text-sm text-gray-500 mb-4">Iconen via <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">react-icons/fa6</code>. Grootte via Tailwind <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">w-*</code> / <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">h-*</code>.</p>
        <Row label="Socialmedia">
          <IconPreview icon={<FaLinkedin />} name="FaLinkedin" />
          <IconPreview icon={<FaInstagram />} name="FaInstagram" />
          <IconPreview icon={<FaFacebook />} name="FaFacebook" />
          <IconPreview icon={<FaXTwitter />} name="FaXTwitter" />
        </Row>
        <Row label="Algemeen">
          <IconPreview icon={<FaArrowRight />} name="FaArrowRight" />
          <IconPreview icon={<FaCheck />} name="FaCheck" />
          <IconPreview icon={<FaEnvelope />} name="FaEnvelope" />
          <IconPreview icon={<FaPhone />} name="FaPhone" />
          <IconPreview icon={<FaLocationDot />} name="FaLocationDot" />
          <IconPreview icon={<FaStar />} name="FaStar" />
          <IconPreview icon={<FaHeart />} name="FaHeart" />
        </Row>
        <Row label="Feedback">
          <IconPreview icon={<FaCircleCheck className="text-green-500" />} name="FaCircleCheck" />
          <IconPreview icon={<FaCircleXmark className="text-red-500" />} name="FaCircleXmark" />
          <IconPreview icon={<FaTriangleExclamation className="text-amber-400" />} name="FaTriangleExclamation" />
          <IconPreview icon={<FaCircleInfo className="text-blue-500" />} name="FaCircleInfo" />
        </Row>
        <Row label="Schaalgrootten">
          {(['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6', 'w-8 h-8', 'w-10 h-10', 'w-12 h-12'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1.5">
              <FaStar className={`text-primary ${size}`} />
              <span className="font-mono text-xs text-gray-400">{size.split(' ')[0]}</span>
            </div>
          ))}
        </Row>
      </Section>

      {/* ── 6. Kaarten ───────────────────────────────────────────────── */}
      <Section title="6. Kaarten" id="kaarten">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Standaard kaart</p>
            <h3 className="font-semibold text-gray-900 mb-1">Kaarttitel</h3>
            <p className="text-sm text-gray-600">Omschrijving van de inhoud van deze kaart.</p>
          </div>
          <div className="rounded-xl border-2 border-primary p-5">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">Gemarkeerde kaart</p>
            <h3 className="font-semibold text-gray-900 mb-1">Kaarttitel</h3>
            <p className="text-sm text-gray-600">Kaart met een gekleurde rand om aandacht te trekken.</p>
          </div>
          <div className="rounded-xl bg-gray-900 text-white p-5">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Donkere kaart</p>
            <h3 className="font-semibold mb-1">Kaarttitel</h3>
            <p className="text-sm text-gray-400">Kaart met donkere achtergrond voor contrast.</p>
          </div>
        </div>
      </Section>

    </div>
  )
}

// ── Sub-componenten ───────────────────────────────────────────────────────

function ColorSwatch({ name, value, style, border }: { name: string; value: string; style: React.CSSProperties; border?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-14 h-14 rounded-lg shadow-sm${border ? ' border border-gray-200' : ''}`}
        style={style}
      />
      <span className="font-mono text-xs text-gray-700 font-medium">{name}</span>
      <span className="font-mono text-xs text-gray-400">{value}</span>
    </div>
  )
}

function IconPreview({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-50 min-w-[72px]">
      <div className="text-gray-700 text-xl">{icon}</div>
      <span className="font-mono text-[10px] text-gray-400 text-center leading-tight">{name}</span>
    </div>
  )
}
