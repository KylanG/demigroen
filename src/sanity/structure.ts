import type {StructureResolver} from 'sanity/structure'

const singletons = ['siteSettings', 'footerSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Instellingen')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Footer Instellingen')
        .id('footerSettings')
        .child(S.document().schemaType('footerSettings').documentId('footerSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletons.includes(item.getId() ?? '')
      ),
    ])
