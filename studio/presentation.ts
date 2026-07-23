import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  // Tells the Presentation Tool which document is "the page" for a given
  // route, so it's shown as the main/primary document instead of mixed in
  // flat with every referenced partner/service/client-case on that page.
  mainDocuments: [
    { route: '/', type: 'landingPage' },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
      params: ({ params }) => ({ slug: params.slug }),
    },
  ],
  locations: {
    landingPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Home', href: '/' }],
      }),
    }),
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/${doc?.slug ?? ''}` },
        ],
      }),
    }),
  },
}
