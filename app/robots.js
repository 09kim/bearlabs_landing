export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://www.bearlabs.kr/sitemap.xml',
    host: 'https://www.bearlabs.kr',
  };
}
