import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteName,
    logo,
    logoAlt,
    faviconBase,
    faviconIco,
    appleTouchIcon,
    webmanifestIcon,
    siteNoIndex,
    seo,
    gtmId,
    ga4Id,
    googleSiteVerification,
    socials,
  }
`

export const notFoundQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    notFoundTitle,
    notFoundText,
    notFoundCta,
  }
`

export const headerSettingsQuery = groq`
  *[_type == "headerSettings" && _id == "headerSettings"][0] {
    logo,
    logoAlt,
    navigation,
    ctaButton,
  }
`

export const footerSettingsQuery = groq`
  *[_type == "footerSettings" && _id == "footerSettings"][0] {
    logo,
    logoAlt,
    description,
    ctaButton,
    menu1Title,
    "menu1Links": menu1Links[defined(page->slug.current)] {
      "label": coalesce(label, page->title),
      "href": "/" + page->slug.current,
    },
    menu2Title,
    "menu2Links": menu2Links[defined(page->slug.current)] {
      "label": coalesce(label, page->title),
      "href": "/" + page->slug.current,
    },
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    slug,
    heroHeading,
    heroSubheading,
    heroImage,
    heroImageAlt,
    heroVideo,
    heroPrimaryCta,
    heroSecondaryCta,
    blocks,
    seo,
  }
`

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    "noIndex": seo.noIndex,
  }
`

export const allPostsQuery = groq`
  *[_type == "post" && (!defined($category) || $category in categories[]->slug.current)] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    "author": author-> { name, photo },
    "categories": categories[]->{ title, "slug": slug.current },
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    author-> { name, photo, bio },
    coverImage,
    excerpt,
    publishedAt,
    body,
    seo,
    "categories": categories[]->{ title, "slug": slug.current },
  }
`

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title.nl asc) {
    title,
    "slug": slug.current,
  }
`
