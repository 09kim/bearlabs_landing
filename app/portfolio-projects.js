export const portfolioProjects = [
  {
    slug: 'pipe-erp',
    category: '현장 서비스 ERP',
    title: '문의·배차·정산 통합 ERP',
    summary: '현장 배관·누수 서비스의 문의 접수부터 기사 배차, 공사 결과, 정산까지 하나의 흐름으로 관리하는 시스템입니다.',
    image: '/portfolio/pipe-erp.png',
    imageAlt: '배관 서비스 통합 ERP 대시보드 화면',
    overview: '지역과 작업 유형에 따라 배차를 관리하고, 현장 진행 상황과 매출 데이터를 운영 화면에서 바로 확인할 수 있도록 구축했습니다.',
    capabilities: [
      '문의 접수와 지역 기반 자동 배차',
      '작업 기사·관리자별 현장 진행 관리',
      '공사 결과 등록과 정산 관리',
      '매출·광고 성과 대시보드',
      '카카오 알림톡 자동 발송',
    ],
  },
  {
    slug: 'achievement',
    category: '예약·서비스업 ERP',
    title: '예약·견적·정산 올인원 시스템',
    summary: '서비스업 운영에 필요한 스케줄, 견적, 고객, 정산 업무를 웹과 모바일에서 통합 관리하는 ERP입니다.',
    image: '/portfolio/achievement.png',
    imageAlt: '예약·견적·정산 올인원 시스템의 스케줄 화면',
    overview: '예약 일정과 고객 정보를 연결하고, 견적서 발행부터 정산과 세금계산서 처리까지 이어지는 반복 업무를 한곳에 모았습니다.',
    capabilities: [
      '월간 스케줄과 예약 현황 관리',
      '견적서·PDF 발행과 이력 관리',
      '고객·회원 데이터 통합 관리',
      '정산과 세금계산서 업무 관리',
      '웹·모바일 환경의 운영 화면',
    ],
  },
  {
    slug: 'rdms',
    category: '유통·물류 ERP',
    title: '유통·물류 통합관리 시스템',
    summary: '상품, 발주, 재고, 출고, 정산을 역할별 화면으로 운영할 수 있도록 구축한 유통·물류 ERP입니다.',
    image: '/portfolio/rdms.png',
    imageAlt: '유통·물류 통합관리 시스템 화면',
    overview: '유통·물류 업무의 흐름을 하나로 연결해 담당자별로 필요한 정보와 작업을 빠르게 확인할 수 있도록 설계했습니다.',
    capabilities: [
      '상품·재고·입출고 통합 관리',
      '발주와 주문, 출고 프로세스 관리',
      '배송 배차와 정산 업무 관리',
      '역할별 운영 화면과 권한 관리',
      '엑셀 업로드·다운로드 지원',
    ],
  },
];

export function getPortfolioProject(slug) {
  return portfolioProjects.find((project) => project.slug === slug);
}
