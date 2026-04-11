// Haalt de juiste taal op uit een localizedString/localizedText object.
// Valt terug op Nederlands als de gevraagde taal niet beschikbaar is.

export type Locale = 'nl' | 'en'
export const defaultLocale: Locale = 'nl'

export function getLang(
  field: { nl?: string; en?: string } | undefined,
  locale: Locale = defaultLocale
): string {
  if (!field) return ''
  return field[locale] || field[defaultLocale] || ''
}
