import './globals.css';

export const metadata = {
  title: '베어랩스 | 소프트웨어 개발 파트너',
  description: '쇼핑몰, 물류, 유통, 에이전시를 위한 ERP, CRM, WMS, 업무 자동화 개발 파트너 베어랩스',
  openGraph: {
    title: '베어랩스 | 소프트웨어 개발 파트너',
    description: '쇼핑몰, 물류, 유통, 에이전시를 위한 ERP, CRM, WMS, 업무 자동화',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
