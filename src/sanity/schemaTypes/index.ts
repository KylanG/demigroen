import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import heroSection from './heroSection'
import textImageSection from './textImageSection'
import statsSection from './statsSection'
import ctaSection from './ctaSection'
import clientSlider from './clientSlider'
import page from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    heroSection,
    textImageSection,
    statsSection,
    ctaSection,
    clientSlider,
    page,
  ],
}