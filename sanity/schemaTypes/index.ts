// ── Shared objects ────────────────────────────────────────────────────────────
export { localizedString } from './objects/localizedString'
export { localizedText } from './objects/localizedText'
export { linkObject } from './objects/linkObject'
export { seoFields } from './objects/seoFields'

// ── Documents ─────────────────────────────────────────────────────────────────
export { siteSettings } from './documents/siteSettings'
export { headerSettings } from './documents/headerSettings'
export { footerSettings } from './documents/footerSettings'
export { page } from './documents/page'
export { post } from './documents/post'
export { author } from './documents/author'
export { category } from './documents/category'

// ── Page builder sections ─────────────────────────────────────────────────────
// Each section has a matching React component in components/sections/.
// To add a new section:
//   1. Create sanity/schemaTypes/sections/mySection.ts (name: 'mySection')
//   2. Export it here
//   3. Add { type: 'mySection' } to the page.ts blocks array
//   4. Create components/sections/MySection.tsx
//   5. Register it in components/sections/SectionRenderer.tsx
export { textImageSection } from './sections/textImageSection'
export { ctaBannerSection } from './sections/ctaBannerSection'
export { uspSection } from './sections/uspSection'
export { testimonialsSection } from './sections/testimonialsSection'
export { faqSection } from './sections/faqSection'
export { teamSection } from './sections/teamSection'
export { contactSection } from './sections/contactSection'
export { richTextSection } from './sections/richTextSection'
