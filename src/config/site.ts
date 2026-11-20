export const SITE_URL = 'https://stratcoug.com';

export const SITE_NAME = 'Stratco';

export const SITE_TITLE =
  'Stratco — Strategic Creative & Production House, Kampala';

export const SITE_DESCRIPTION =
  'Kampala creative and production house: strategy, TVCs and film, brand campaigns and live broadcast production, all under one roof.';

export const OG_IMAGE = '/og.jpg';

/**
 * Set NEXT_PUBLIC_SITE_ENV=staging on the review (Vercel) copy: it turns off
 * analytics and asks search engines not to index it. The live site leaves it unset.
 */
export const IS_STAGING = process.env.NEXT_PUBLIC_SITE_ENV === 'staging';
