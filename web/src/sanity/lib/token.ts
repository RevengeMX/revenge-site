// Intentionally not thrown when missing: this is imported from the root
// layout via `live.ts`, and the site's dataset is public — it must keep
// rendering published content even if this token isn't configured yet
// (e.g. before it's added to Vercel). Missing it only disables live/draft
// features, which next-sanity already degrades gracefully without it.
export const token = process.env.SANITY_API_READ_TOKEN;
