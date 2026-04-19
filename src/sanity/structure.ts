import type {StructureResolver} from 'sanity/structure'

const singletons = ['siteSettings', 'footerSettings', 'heroSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Instellingen')
        .id('site-instellingen')
        .child(
          S.list()
            .title('Site Instellingen')
            .items([
              S.listItem()
                .title('Header Instellingen')
                .id('siteSettings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Footer Instellingen')
                .id('footerSettings')
                .child(S.document().schemaType('footerSettings').documentId('footerSettings')),
              S.listItem()
                .title('Hero Sectie')
                .id('heroSettings')
                .child(S.document().schemaType('heroSettings').documentId('heroSettings')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletons.includes(item.getId() ?? '')
      ),
    ])
