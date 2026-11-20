import type { MetadataRoute } from 'next';
import { IS_STAGING, SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Keep the staging review copy out of search results
  if (IS_STAGING) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
