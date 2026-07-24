import './globals.css';

const siteUrl = 'https://bearlabs.kr';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '맞춤 업무 시스템·웹개발 | ERP·CRM·WMS 구축 | 베어랩스',
  description: 'ERP, CRM, WMS, 사내관리 시스템, 업무 자동화와 웹서비스를 설계·개발하는 베어랩스입니다.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: '맞춤 업무 시스템·웹개발 | 베어랩스',
    description: 'ERP, CRM, WMS, 사내관리 시스템, 업무 자동화와 웹서비스를 설계·개발합니다.',
    url: '/',
    siteName: '베어랩스',
    locale: 'ko_KR',
    type: 'website',
    images: [{
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'BearLabs',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '맞춤 업무 시스템·웹개발 | 베어랩스',
    description: 'ERP, CRM, WMS, 사내관리 시스템, 업무 자동화와 웹서비스를 설계·개발합니다.',
    images: ['/opengraph-image.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '베어랩스',
  alternateName: 'BearLabs',
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description: 'ERP, CRM, WMS, 사내관리 시스템, 업무 자동화와 웹서비스를 설계·개발하는 베어랩스입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
