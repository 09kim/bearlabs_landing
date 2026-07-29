import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getPortfolioProject } from '../portfolio-projects';
import { getServicePage } from '../service-pages';

const processSteps = [
  ['01', '무료 상담 & 업무 진단', '현재 업무 흐름과 필요한 결과를 먼저 확인합니다.'],
  ['02', '프로토타입 설계', '실제 화면과 사용 흐름을 먼저 보고 방향을 맞춥니다.'],
  ['03', '기능 정의 & 개발', '확정된 범위의 기능을 개발하고 중간 결과를 함께 확인합니다.'],
  ['04', '배포 & 운영 지원', '배포 후에도 실제 운영에 맞게 개선을 이어갑니다.'],
];

export default function ServicePage({ slug }) {
  const service = getServicePage(slug);
  const relatedProject = service.relatedProjectSlug ? getPortfolioProject(service.relatedProjectSlug) : null;

  return (
    <div className="service-page">
      <header className="case-header">
        <div className="container case-nav">
          <Link className="brand" href="/" aria-label="베어랩스 홈">
            <span className="brand-mark"><img src="/assets/bearlabs-logo.png" alt="" /></span>
            <span>베어랩스</span>
          </Link>
          <Link className="case-contact-link" href="/#contact">무료 상담 신청</Link>
        </div>
      </header>

      <main>
        <section className="service-hero">
          <div className="container">
            <Link className="back-link" href="/#services"><ArrowLeft /> 서비스로 돌아가기</Link>
            <div className="service-hero-grid">
              <div className="service-copy">
                <span className="case-category">{service.label}</span>
                <h1>{service.title}</h1>
                <p>{service.intro}</p>
                <Link className="service-primary-link" href="/#contact">무료 상담 신청 <ArrowRight /></Link>
              </div>
              <ul className="service-hero-points" aria-label={`${service.title} 주요 특징`}>
                {service.heroPoints.map((point) => <li key={point}><Check />{point}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="container">
            <div className="service-section-heading">
              <span className="case-section-label">COMMON CHALLENGES</span>
              <h2>이런 업무 문제를<br />정리합니다</h2>
            </div>
            <div className="service-problem-grid">
              {service.problems.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="service-section service-capability-section">
          <div className="container">
            <div className="service-section-heading">
              <span className="case-section-label">WHAT WE BUILD</span>
              <h2>회사에 맞춰<br />구축하는 기능</h2>
            </div>
            <ul className="capability-list">
              {service.capabilities.map((capability) => <li key={capability}><Check />{capability}</li>)}
            </ul>
          </div>
        </section>

        <section className="service-section service-process-section">
          <div className="container">
            <div className="service-section-heading centered">
              <span className="case-section-label">HOW WE WORK</span>
              <h2>프로토타입부터<br />확실하게 확인합니다</h2>
            </div>
            <div className="service-process-grid">
              {processSteps.map(([number, title, description]) => <article key={number}><span>STEP {number}</span><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="service-section service-pricing-section">
          <div className="container service-pricing-grid">
            <div>
              <span className="case-section-label">ESTIMATE GUIDE</span>
              <h2>정해진 가격표 대신,<br />필요한 범위를 봅니다</h2>
              <p>업무 방식과 필요한 기능이 다르기 때문에, 실제 운영에 필요한 범위를 확인한 뒤 맞춤 견적을 안내드립니다.</p>
            </div>
            <ul>
              {service.pricingFactors.map((factor) => <li key={factor}><Check />{factor}</li>)}
            </ul>
          </div>
        </section>

        {relatedProject && (
          <section className="service-section service-related-section">
            <div className="container">
              <div className="service-section-heading"><span className="case-section-label">RELATED PROJECT</span><h2>관련 구축 사례</h2></div>
              <Link className="service-related-project" href={`/portfolio/${relatedProject.slug}`}>
                <div><img src={relatedProject.image} alt={relatedProject.imageAlt} /></div>
                <article><span>{relatedProject.category}</span><h3>{relatedProject.title}</h3><p>{relatedProject.summary}</p><strong>사례 자세히 보기 <ArrowRight /></strong></article>
              </Link>
            </div>
          </section>
        )}

        <section className="case-cta-section">
          <div className="container case-cta-content"><div><span>YOUR NEXT SYSTEM</span><h2>우리 회사 업무에도<br />맞는 시스템이 필요하다면</h2></div><Link className="case-cta-link" href="/#contact">무료 상담 신청 <ArrowRight /></Link></div>
        </section>
      </main>
    </div>
  );
}
