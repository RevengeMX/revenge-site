import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['landingPage', 'siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Revenge Site Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('landingPage').documentId('landingPage').title('Home page')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
