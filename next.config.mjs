/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (served at the stratcoug.com root, so no basePath)
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  // Let phones and laptops on the office Wi-Fi load the dev server's scripts
  // (dev only; has no effect on the static export)
  allowedDevOrigins: ['192.168.1.7', '192.168.1.*'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
