import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getPortfolioProject, portfolioProjects } from '../../portfolio-projects';

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | 베어랩스 포트폴리오`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | 베어랩스`,
      description: project.summary,
      url: `/portfolio/${project.slug}`,
      images: [{ url: project.image, width: 1200, height: 1200, alt: project.imageAlt }],
    },
  };
}

export default async function PortfolioProjectPage({ params }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) return null;

  return (
    <div className="case-page">
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
        <section className="case-hero">
          <div className="container">
            <Link className="back-link" href="/#portfolio"><ArrowLeft /> 포트폴리오로 돌아가기</Link>
            <div className="case-hero-grid">
              <div className="case-copy">
                <span className="case-category">{project.category}</span>
                <h1>{project.title}</h1>
                <p>{project.summary}</p>
              </div>
              <div className="case-image"><img src={project.image} alt={project.imageAlt} /></div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="container case-content-grid">
            <div><span className="case-section-label">PROJECT OVERVIEW</span><h2>업무 흐름을 하나의 시스템으로</h2></div>
            <p className="case-overview">{project.overview}</p>
          </div>
        </section>

        <section className="case-section case-capability-section">
          <div className="container">
            <div className="case-section-heading"><span className="case-section-label">KEY CAPABILITIES</span><h2>구축한 핵심 기능</h2></div>
            <ul className="capability-list">
              {project.capabilities.map((capability) => <li key={capability}><Check />{capability}</li>)}
            </ul>
          </div>
        </section>

        <section className="case-section case-showcase-section">
          <div className="container">
            <div className="case-section-heading"><span className="case-section-label">PROJECT SCREENS</span><h2>구축 화면</h2></div>
            <div className="case-showcase-image"><img src={project.detailImage} alt={project.detailImageAlt} loading="lazy" /></div>
          </div>
        </section>

        <section className="case-cta-section">
          <div className="container case-cta-content"><div><span>YOUR NEXT SYSTEM</span><h2>우리 회사 업무에도<br />맞는 시스템이 필요하다면</h2></div><Link className="case-cta-link" href="/#contact">무료 상담 신청 <ArrowRight /></Link></div>
        </section>
      </main>
    </div>
  );
}
