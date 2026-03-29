import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import footerSettings from './footerSettings'
import heroSection from './heroSection'
import textImageSection from './textImageSection'
import statsSection from './statsSection'
import ctaSection from './ctaSection'
import clientSlider from './clientSlider'
import page from './page'
import button from './button'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    button,
    siteSettings,
    footerSettings,
    heroSection,
    textImageSection,
    statsSection,
    ctaSection,
    clientSlider,
    page,
  ],
}