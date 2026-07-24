'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  Check,
  FileSpreadsheet,
  FolderKanban,
  Keyboard,
  Package,
  Users,
  Wrench,
} from 'lucide-react';

const painPoints = [
  { icon: FileSpreadsheet, title: '발주서, 재고 현황이 전부 엑셀 파일 어딘가에', desc: '담당자 한 명이 자리를 비우면 업무가 멈춰요' },
  { icon: Keyboard, title: '매일 반복하는 수기 입력', desc: '사람이 하니까, 사람이 실수해요' },
  { icon: BarChart3, title: '데이터는 쌓이는데 아무도 못 봐요', desc: '감으로 하는 마케팅, 감으로 하는 재고 예측' },
  { icon: Wrench, title: '급하게 도입한 프로그램', desc: '회사는 컸는데 시스템은 그대로, 여기저기서 삐걱거려요' },
];

const services = [
  { icon: FolderKanban, tone: 'blue', title: 'ERP · 사내관리 시스템', desc: '발주, 재고, 인사, 회계까지, 흩어진 업무를 하나로 모아요' },
  { icon: Users, tone: 'green', title: 'CRM · 고객관리 자동화', desc: '고객 데이터 수집부터 마케팅 자동화까지 한 번에' },
  { icon: Package, tone: 'yellow', title: 'WMS · 물류·재고관리', desc: '입출고, 실시간 재고 추적으로 오배송을 줄여요' },
  { icon: Bot, tone: 'blue', title: 'AI 업무 자동화', desc: '반복 업무는 AI에게, 사람은 중요한 일에 집중하도록' },
];

const processSteps = [
  { num: '01', title: '무료 상담 & 진단', desc: '지금 업무가 어디서 새는지부터 파악해요' },
  { num: '02', title: '프로토타입 설계', desc: '실제 화면으로 먼저 확인, 방향이 다르면 여기서 바꿔요' },
  { num: '03', title: '기능 정의 & 개발', desc: '필요한 기능만 정확히, 군더더기 없이 만들어요' },
  { num: '04', title: '배포 & 운영 지원', desc: '런칭 후에도 함께 다듬어가요' },
];

const portfolio = [
  { tag: 'ERP', tone: 'erp', title: '패션 쇼핑몰 발주·재고관리 시스템', desc: '엑셀로 관리하던 발주와 재고를 하나의 시스템으로 통합' },
  { tag: 'WMS', tone: 'wms', title: '물류 대행사 WMS 구축', desc: '입출고 프로세스 자동화로 오배송률 개선' },
  { tag: 'CRM', tone: 'crm', title: '유통 에이전시 CRM + 자동화', desc: '고객 데이터 기반 마케팅 자동화 파이프라인 구축' },
];

const quoteSteps = [
  { num: '01', title: '상담 신청', desc: '지금 겪고 있는 문제를 편하게 말씀해주세요' },
  { num: '02', title: '업무 진단 & 범위 확정', desc: '실제 필요한 기능만 함께 정의해요' },
  { num: '03', title: '맞춤 견적서 전달', desc: '범위에 맞는 정확한 견적을 안내드려요' },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function RevealSection({ children, className = '', id }) {
  const [ref, visible] = useReveal();
  return <section ref={ref} id={id} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</section>;
}

function DashboardPreview() {
  return (
    <div className="dashboard-wrap">
      <div className="dashboard">
        <div className="traffic-lights"><span /><span /><span /></div>
        <div className="stock-card">
          <div className="dashboard-label">재고 현황</div>
          <div className="bar-chart"><i /><i /><i /><i /><i /><i /></div>
        </div>
        <div className="dashboard-stats">
          <div className="dashboard-stat"><div className="dashboard-label">오늘 발주</div><strong>128건</strong></div>
          <div className="dashboard-stat"><div className="dashboard-label">처리 상태</div><strong className="success">정상</strong></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get('name') || !form.get('phone')) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });

      if (!response.ok) throw new Error('Unable to send contact request');
      setSubmitted(true);
    } catch {
      setSubmitError('전송에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-content">
          <a className="brand" href="#top" aria-label="베어랩스 홈">
            <span className="brand-mark"><img src="/assets/bearlabs-logo.png" alt="" /></span>
            <span>베어랩스</span>
          </a>
          <nav className="nav-links" aria-label="주요 메뉴">
            <a href="#services">서비스</a><a href="#process">프로세스</a><a href="#portfolio">포트폴리오</a><a href="#pricing">견적안내</a>
          </nav>
          <a className="nav-cta" href="#contact">무료 상담 신청</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="hero-eyebrow">소프트웨어 개발 파트너 · 베어랩스</div>
              <h1>엑셀과 카톡으로<br />버티던 업무,<br />이제 시스템이 대신 뛰게 하세요</h1>
              <p className="hero-copy">쇼핑몰, 물류, 유통, 에이전시를 위한 ERP·CRM·WMS·업무 자동화를 만들어요. 화면부터 먼저 보여드리는 프로토타입 개발이라, 엉뚱한 곳에 돈 쓸 일이 없어요.</p>
              <div className="hero-actions"><a className="button primary" href="#contact">무료로 진단받기</a><a className="button secondary" href="#portfolio">포트폴리오 보기</a></div>
              <p className="hero-note">상담은 무료, 첫 프로토타입까지 평균 2주가 걸려요</p>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <RevealSection className="section pain-section">
          <div className="container">
            <div className="section-heading centered"><span>이런 고민, 익숙하신가요</span><h2>성장은 하고 있는데,<br />시스템은 그대로인 회사들</h2></div>
            <div className="grid grid-four">{painPoints.map(({ icon: Icon, title, desc }) => <article className="pain-card" key={title}><div className="icon-box"><Icon /></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
          </div>
        </RevealSection>

        <RevealSection id="services" className="section">
          <div className="container"><div className="section-heading"><span>무엇을 만들어 드리나요</span><h2>회사 상황에 맞는<br />시스템만, 정확하게</h2></div><div className="grid grid-two">{services.map(({ icon: Icon, tone, title, desc }) => <article className="service-card" key={title}><div className={`icon-box ${tone}`}><Icon /></div><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div>
        </RevealSection>

        <RevealSection id="process" className="section muted-section">
          <div className="container"><div className="section-heading centered"><span>일하는 방식</span><h2>프로토타입부터, 확실하게</h2></div><div className="steps">{processSteps.map((step) => <article key={step.num}><span>STEP {step.num}</span><h3>{step.title}</h3><p>{step.desc}</p></article>)}</div></div>
        </RevealSection>

        <RevealSection id="portfolio" className="section">
          <div className="container"><div className="section-heading"><span>포트폴리오</span><h2>이런 회사들과 함께했습니다</h2></div><div className="grid grid-three">{portfolio.map((item) => <article className="portfolio-card" key={item.tag}><div className={`portfolio-image ${item.tone}`}><span>{item.tag}</span></div><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></div>
        </RevealSection>

        <RevealSection id="pricing" className="section pricing-section">
          <div className="container"><div className="section-heading centered light"><span>견적 안내</span><h2>정해진 가격표가 없는 이유</h2><p>회사마다 필요한 기능은 달라요. 그래서 정찰가 대신, 무료 상담으로 꼭 필요한 기능만 정의하고 그에 맞는 견적을 드려요.</p></div><div className="grid grid-three quote-grid">{quoteSteps.map((step) => <article key={step.num}><span>{step.num}</span><h3>{step.title}</h3><p>{step.desc}</p></article>)}</div><div className="center-action"><a className="button primary" href="#contact">지금 견적 받아보기</a></div></div>
        </RevealSection>

        <RevealSection id="contact" className="section contact-section">
          <div className="container narrow"><div className="section-heading centered"><h2>지금, 무료로 진단받아보세요</h2><p>간단한 정보만 남겨주시면 1영업일 내로 연락드려요</p></div>{submitted ? <div className="submission-complete"><div className="icon-box"><Check /></div><h3>신청이 완료되었어요</h3><p>빠르게 확인 후 1영업일 내로 연락드릴게요</p></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><input name="name" type="text" placeholder="이름" required /><input name="company" type="text" placeholder="회사명" required /></div><input name="phone" type="tel" placeholder="연락처" required /><textarea name="message" placeholder="어떤 업무를 시스템화하고 싶으신가요 (선택)" rows="4" /><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" /><button type="submit" disabled={isSubmitting}>{isSubmitting ? '전송 중...' : '무료 상담 신청하기'}</button>{submitError && <p className="form-error" role="alert">{submitError}</p>}</form>}</div>
        </RevealSection>
      </main>

      <footer><div className="container footer-content"><div className="brand"><span className="brand-mark"><img src="/assets/bearlabs-logo.png" alt="" /></span><span>베어랩스</span></div><p>© 2026 BearLabs. All rights reserved.</p></div></footer>
    </div>
  );
}

export default App;
