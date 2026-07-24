export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://bearlabs.kr/sitemap.xml',
    host: 'https://bearlabs.kr',
  };
}
