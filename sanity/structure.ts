import { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentIcon,
  EditIcon,
  UsersIcon,
  TagIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      S.listItem()
        .title('Site Instellingen')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Instellingen')
            .items([
              S.listItem()
                .title('Algemene Instellingen')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Algemene Instellingen')
                ),
              S.listItem()
                .title('Header Instellingen')
                .icon(ArrowUpIcon)
                .child(
                  S.document()
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                    .title('Header Instellingen')
                ),
              S.listItem()
                .title('Footer Instellingen')
                .icon(ArrowDownIcon)
                .child(
                  S.document()
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                    .title('Footer Instellingen')
                ),
            ])
        ),

      S.divider(),

      S.documentTypeListItem('page').title("Pagina's").icon(DocumentIcon),

      S.listItem()
        .title('Blog')
        .icon(EditIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Blogposts').icon(EditIcon),
              S.documentTypeListItem('category').title('Categorieën').icon(TagIcon),
            ])
        ),

      S.documentTypeListItem('author').title('Auteurs').icon(UsersIcon),
    ])
