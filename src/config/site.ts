export const SITE_URL = 'https://stratcoug.com';

export const SITE_NAME = 'Stratco';

export const SITE_TITLE =
  'Stratco — Strategic Creative & Production House, Kampala';

export const SITE_DESCRIPTION =
  'Kampala creative and production house: strategy, TVCs and film, brand campaigns and live broadcast production, all under one roof.';

export const OG_IMAGE = '/og.jpg';

/**
 * The review copy (built on Vercel, which always sets VERCEL=1) turns off
 * analytics and asks search engines not to index it. The live site builds on
 * GitHub Actions, where neither is set. NEXT_PUBLIC_SITE_ENV=staging forces it.
 * Read at build time only (layout metadata, robots, the Analytics server component).
 */
export const IS_STAGING =
  process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_SITE_ENV === 'staging';
