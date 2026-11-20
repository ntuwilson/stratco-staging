/**
 * Stratco's social channels. Leave a URL empty until the account is ready:
 * buttons only appear (in Watch the work and the footer) for channels that
 * have a link.
 */
export const SOCIAL: { name: string; url: string }[] = [
  { name: 'YouTube', url: '' },
  { name: 'TikTok', url: '' },
  { name: 'Instagram', url: '' },
];

export const SOCIAL_LINKS = SOCIAL.filter((s) => s.url.trim() !== '');
