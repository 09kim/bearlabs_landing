'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Code2,
  FileSpreadsheet,
  FolderKanban,
  Handshake,
  Keyboard,
  MessageCircle,
  Package,
  Phone,
  Puzzle,
  Target,
  Users,
  Wrench,
} from 'lucide-react';
import { portfolioProjects } from './portfolio-projects';

const painPoints = [
  { icon: FileSpreadsheet, title: '발주서, 재고 현황이 전부 엑셀 파일 어딘가에', desc: '담당자 한 명이 자리를 비우면 업무가 멈춰요' },
  { icon: Keyboard, title: '매일 반복하는 수기 입력', desc: '사람이 하니까, 사람이 실수해요' },
  { icon: BarChart3, title: '데이터는 쌓이는데 아무도 못 봐요', desc: '감으로 하는 마케팅, 감으로 하는 재고 예측' },
  { icon: Wrench, title: '급하게 도입한 프로그램', desc: '회사는 컸는데 시스템은 그대로, 여기저기서 삐걱거려요' },
];

const services = [
  { icon: FolderKanban, tone: 'blue', title: 'ERP · 사내관리 시스템', desc: '발주, 재고, 인사, 회계까지, 흩어진 업무를 하나로 모아요', href: '/erp-development' },
  { icon: Users, tone: 'green', title: 'CRM · 고객관리 자동화', desc: '고객 데이터 수집부터 마케팅 자동화까지 한 번에', href: '/crm-automation' },
  { icon: Package, tone: 'yellow', title: 'WMS · 물류·재고관리', desc: '입출고, 실시간 재고 추적으로 오배송을 줄여요', href: '/wms-development' },
  { icon: Code2, tone: 'blue', title: '홈페이지 · 웹서비스 개발', desc: '기업 소개 홈페이지부터 관리자 페이지까지 목적에 맞게 만들어요', href: '/web-development' },
];

const processSteps = [
  { num: '01', title: '무료 상담 & 진단', desc: '지금 업무가 어디서 새는지부터 파악해요' },
  { num: '02', title: '프로토타입 설계', desc: '실제 화면으로 먼저 확인, 방향이 다르면 여기서 바꿔요' },
  { num: '03', title: '기능 정의 & 개발', desc: '필요한 기능만 정확히, 군더더기 없이 만들어요' },
  { num: '04', title: '배포 & 운영 지원', desc: '런칭 후에도 함께 다듬어가요' },
];

const quoteSteps = [
  { num: '01', title: '상담 신청', desc: '지금 겪고 있는 문제를 편하게 말씀해주세요' },
  { num: '02', title: '업무 진단 & 범위 확정', desc: '실제 필요한 기능만 함께 정의해요' },
  { num: '03', title: '맞춤 견적서 전달', desc: '범위에 맞는 정확한 견적을 안내드려요' },
];

const selectionReasons = [
  { icon: Handshake, title: '외주의 외주가 아닙니다', desc: '상담부터 개발, 배포, 유지보수까지 처음 담당한 개발자가 직접 진행합니다.' },
  { icon: Code2, title: '대표 개발자가 직접 개발합니다', desc: '영업 담당자가 아닌, 실제 개발자가 요구사항을 분석하고 설계합니다.' },
  { icon: Target, title: '한 번에 한 프로젝트만 진행합니다', desc: '여러 프로젝트를 동시에 진행하지 않습니다. 프로젝트에 집중해 더 빠르고 완성도 있게 개발합니다.' },
  { icon: Puzzle, title: '회사에 맞게 처음부터 설계합니다', desc: '기성 ERP를 억지로 맞추는 것이 아니라 업무 흐름에 맞춰 필요한 기능만 개발합니다.' },
  { icon: Wrench, title: '유지보수까지 책임집니다', desc: '배포가 끝이 아닙니다. 안정적인 운영과 지속적인 개선까지 함께합니다.' },
];

const faqItems = [
  { question: '프로젝트는 얼마나 걸리나요?', answer: '일반적인 기업 소개 홈페이지는 약 2~4주가 소요됩니다. ERP·업무 시스템은 필요한 기능과 연동 범위에 따라 상담 후 일정을 안내드립니다.' },
  { question: '제작 비용은 얼마인가요?', answer: '모든 프로젝트는 필요한 기능과 규모가 다르기 때문에 상담 후 맞춤 견적을 제공합니다.' },
  { question: '유지보수도 가능한가요?', answer: '가능합니다. 배포 이후에도 기능 개선, 버그 수정, 운영 지원을 제공합니다.' },
  { question: '기존 업무 방식에 맞게 개발 가능한가요?', answer: '가능합니다. 현재 사용하는 엑셀, 카카오톡, 수기 업무 등을 분석해 회사에 맞는 시스템으로 개발합니다.' },
  { question: 'SEO도 함께 진행하나요?', answer: '홈페이지 제작 시 기본적인 SEO 최적화를 적용하며, 검색 상위 노출을 위한 추가 컨설팅도 가능합니다.' },
  { question: '모바일에서도 사용할 수 있나요?', answer: '네. 모든 시스템은 모바일, 태블릿, PC에서 사용할 수 있도록 반응형으로 개발합니다.' },
];

const comparisonRows = [
  { label: '업무 흐름', standard: '표준 프로세스에 맞춰 업무를 조정', custom: '현재 업무 흐름을 기준으로 설계' },
  { label: '업종·화면', standard: '업종별 기능과 화면이 제한적', custom: '역할·업종에 맞는 화면과 권한 구성' },
  { label: '기능 추가', standard: '모듈별 별도 견적\n추가 비용 예시 300~500만원', custom: '계약 범위의 기능을 업무에 맞춰 직접 개발' },
  { label: '외부 연동', standard: '지원되는 서비스 중심으로 연동', custom: '필요한 API·기존 시스템·알림 서비스를 연동' },
  { label: '운영 확장', standard: '공급사 로드맵과 정책에 따라 확장', custom: '사업 변화에 맞춰 다음 기능을 함께 정의' },
];

const RevealContext = createContext(false);

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

function useShouldReduceMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setShouldReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return shouldReduceMotion;
}

function RevealSection({ children, className = '', id }) {
  const [ref, visible] = useReveal();
  return <section ref={ref} id={id} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}><RevealContext.Provider value={visible}>{children}</RevealContext.Provider></section>;
}

function RevealCard({ children, className = '', delay = 0 }) {
  const isSectionVisible = useContext(RevealContext);

  return <motion.article className={className} initial={false} animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: 0.45, delay, ease: [0.22, 0.61, 0.36, 1] }}>{children}</motion.article>;
}

function ComparisonRow({ row, index }) {
  const isSectionVisible = useContext(RevealContext);

  return <motion.div className="comparison-row" role="row" initial={false} animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 0.61, 0.36, 1] }}><div className="comparison-label" role="rowheader">{row.label}</div><div className="comparison-cell comparison-standard" role="cell" data-label="기성 ERP">{row.standard}</div><div className="comparison-cell comparison-ours" role="cell" data-label="베어랩스 맞춤 개발"><Check aria-hidden="true" /><span>{row.custom}</span></div></motion.div>;
}

function PortfolioCard({ item, index }) {
  const isSectionVisible = useContext(RevealContext);
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] } },
    hover: { y: -4, boxShadow: '0 12px 28px rgba(0, 19, 43, .12)' },
  };

  return <motion.article className="portfolio-card" variants={variants} initial={false} animate={isSectionVisible ? 'visible' : 'hidden'} whileHover="hover"><a href={`/portfolio/${item.slug}`}><div className="portfolio-image"><motion.img src={item.image} alt={item.imageAlt} variants={{ hover: { scale: 1.04, transition: { duration: 0.3, ease: 'easeOut' } } }} /></div><div><span className="portfolio-category">{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p></div></a></motion.article>;
}

function SystemFlowPreview() {
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <motion.div className="system-flow-preview" aria-label="흩어진 업무를 맞춤 시스템으로 통합하는 흐름" initial={{ opacity: 0, y: 12 }} animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -7, 0] }} transition={shouldReduceMotion ? { duration: 0.3 } : { opacity: { duration: 0.55, delay: 0.32 }, y: { duration: 4, delay: 0.75, repeat: Infinity, ease: 'easeInOut' } }}>
      <div className="flow-source">
        <span className="flow-title">흩어진 업무</span>
        <div className="flow-source-item spreadsheet"><FileSpreadsheet /><span>엑셀 파일</span></div>
        <div className="flow-source-item chat"><MessageCircle /><span>카카오톡</span></div>
        <div className="flow-source-item phone"><Phone /><span>전화·수기입력</span></div>
      </div>
      <div className="flow-connector" aria-hidden="true"><span /><ArrowRight /></div>
      <div className="flow-system">
        <div className="flow-window-bar"><div><i /><i /><i /></div><span>맞춤 업무 시스템</span></div>
        <div className="flow-modules">
          <div><Users /><span>고객 관리</span></div>
          <div><FileSpreadsheet /><span>견적·정산</span></div>
          <div><Package /><span>재고·발주</span></div>
          <div><Bot /><span>AI 자동화</span></div>
        </div>
        <div className="flow-automation"><Bot /><span>반복 업무 자동화</span><i>ON</i></div>
      </div>
    </motion.div>
  );
}

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get('name') || !form.get('phone') || !form.get('privacyConsent')) return;

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
      <a
        className={`floating-contact-cta ${isContactVisible ? 'is-hidden' : ''}`}
        href="#contact"
        aria-hidden={isContactVisible}
        tabIndex={isContactVisible ? -1 : undefined}
      >
        <MessageCircle aria-hidden="true" />
        <span>무료 상담 신청</span>
      </a>

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
              <h1>엑셀과 카톡으로<br />버티던 업무,<br />이제 시스템이<br />대신 뛰게 하세요</h1>
              <p className="hero-copy">우리 회사 업무에 맞는 ERP를 직접 개발합니다. 쇼핑몰, 물류, 유통, 에이전시의 업무 흐름을 ERP·CRM·WMS·업무 자동화로 연결해요. 화면부터 먼저 보는 프로토타입 개발이라, 필요한 기능을 확인한 뒤 시작할 수 있어요.</p>
              <div className="hero-actions"><a className="button primary" href="#contact">무료로 진단받기</a><a className="button secondary" href="#portfolio">포트폴리오 보기</a></div>
              <p className="hero-note">상담은 무료, 첫 프로토타입까지 평균 2주가 걸려요</p>
            </div>
            <SystemFlowPreview />
          </div>
        </section>

        <RevealSection className="section pain-section">
          <div className="container">
            <div className="section-heading centered"><span>이런 고민, 익숙하신가요</span><h2>성장은 하고 있는데,<br />시스템은 그대로인 회사들</h2></div>
            <div className="grid grid-four">{painPoints.map(({ icon: Icon, title, desc }, index) => <RevealCard className="pain-card" delay={index * 0.08} key={title}><div className="icon-box"><Icon /></div><h3>{title}</h3><p>{desc}</p></RevealCard>)}</div>
          </div>
        </RevealSection>

        <RevealSection className="section comparison-section">
          <div className="container">
            <div className="section-heading centered"><span>맞춤 개발이 필요한 순간</span><h2>기성 ERP가 맞지 않는 순간,<br />직접 만드는 편이 빨라집니다</h2><p>표준 업무라면 기성 ERP로 충분할 수 있습니다. 하지만 우리 회사만의 업무 흐름이 있다면 시스템도 달라야 합니다.</p></div>
            <div className="comparison-table" role="table" aria-label="기성 ERP와 베어랩스 맞춤 개발 비교">
              <div className="comparison-row comparison-header" role="row"><div role="columnheader">비교 항목</div><div className="comparison-standard" role="columnheader">기성 ERP</div><div className="comparison-ours" role="columnheader">베어랩스 맞춤 개발</div></div>
              {comparisonRows.map((row, index) => <ComparisonRow row={row} index={index} key={row.label} />)}
            </div>
            <p className="comparison-note">기성 ERP의 추가 모듈 비용은 솔루션과 기능 범위에 따라 달라질 수 있습니다. 빠른 표준 도입이 우선이면 기성 ERP, 업무 차별화와 자동화가 우선이면 맞춤 개발이 적합합니다.</p>
          </div>
        </RevealSection>

        <RevealSection id="services" className="section">
          <div className="container"><div className="section-heading"><span>무엇을 만들어 드리나요</span><h2>회사 상황에 맞는<br />시스템만, 정확하게</h2></div><div className="grid grid-two">{services.map(({ icon: Icon, tone, title, desc, href }, index) => <RevealCard className="service-card" delay={index * 0.08} key={title}><a className="service-card-link" href={href}><div className={`icon-box ${tone}`}><Icon /></div><div><h3>{title}</h3><p>{desc}</p></div></a></RevealCard>)}</div></div>
        </RevealSection>

        <RevealSection className="section selection-section">
          <div className="container"><div className="section-heading centered"><span>BearLabs의 방식</span><h2>왜 BearLabs를 선택할까요?</h2><p>프로젝트를 많이 하는 것보다, 한 프로젝트를 제대로 만드는 것을 목표로 합니다.</p></div><div className="selection-grid">{selectionReasons.map(({ icon: Icon, title, desc }, index) => <RevealCard className="selection-card" delay={index * 0.07} key={title}><div className="icon-box"><Icon /></div><h3>{title}</h3><p>{desc}</p></RevealCard>)}</div></div>
        </RevealSection>

        <RevealSection id="process" className="section muted-section">
          <div className="container"><div className="section-heading centered"><span>일하는 방식</span><h2>프로토타입부터, 확실하게</h2></div><div className="steps">{processSteps.map((step, index) => <RevealCard delay={index * 0.08} key={step.num}><span>STEP {step.num}</span><h3>{step.title}</h3><p>{step.desc}</p></RevealCard>)}</div></div>
        </RevealSection>

        <RevealSection id="portfolio" className="section">
          <div className="container"><div className="section-heading"><span>포트폴리오</span><h2>이런 시스템을 만들었습니다</h2></div><div className="grid grid-four">{portfolioProjects.map((item, index) => <PortfolioCard item={item} index={index} key={item.slug} />)}</div></div>
        </RevealSection>

        <RevealSection id="pricing" className="section pricing-section">
          <div className="container"><div className="section-heading centered light"><span>견적 안내</span><h2>정해진 가격표가 없는 이유</h2><p>회사마다 필요한 기능은 달라요. 그래서 정찰가 대신, 무료 상담으로 꼭 필요한 기능만 정의하고 그에 맞는 견적을 드려요.</p></div><div className="grid grid-three quote-grid">{quoteSteps.map((step, index) => <RevealCard delay={index * 0.08} key={step.num}><span>{step.num}</span><h3>{step.title}</h3><p>{step.desc}</p></RevealCard>)}</div><div className="center-action"><a className="button primary" href="#contact">지금 견적 받아보기</a></div></div>
        </RevealSection>

        <RevealSection className="section faq-section">
          <div className="container narrow"><div className="section-heading centered"><span>자주 묻는 질문</span><h2>FAQ</h2></div><div className="faq-list">{faqItems.map((item, index) => { const isOpen = openFaqIndex === index; return <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}><h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}><span>{item.question}</span><ChevronDown aria-hidden="true" /></button></h3><div id={`faq-answer-${index}`} className="faq-answer" hidden={!isOpen}><p>{item.answer}</p></div></article>; })}</div></div>
        </RevealSection>

        <RevealSection id="contact" className="section contact-section">
          <div className="container narrow contact-panel"><div className="section-heading centered"><h2>지금, 무료로 진단받아보세요</h2><p>간단한 정보만 남겨주시면 1영업일 내로 연락드려요</p></div>{submitted ? <div className="submission-complete"><div className="icon-box"><Check /></div><h3>신청이 완료되었어요</h3><p>빠르게 확인 후 1영업일 내로 연락드릴게요</p></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><input name="name" type="text" placeholder="이름" required /><input name="company" type="text" placeholder="회사명" required /></div><input name="phone" type="tel" placeholder="연락처" required /><textarea name="message" placeholder="어떤 업무를 시스템화하고 싶으신가요 (선택)" rows="4" /><div className="privacy-consent"><input id="privacy-consent" name="privacyConsent" type="checkbox" required /><label htmlFor="privacy-consent">개인정보 수집 및 이용에 동의합니다 <em>(필수)</em></label></div><p className="privacy-notice">수집 항목: 이름, 회사명, 연락처, 문의 내용 · 이용 목적: 상담 및 답변 · 보유 기간: 문의 처리 완료 후 1년 · 동의를 거부할 수 있으며, 이 경우 문의 접수가 어렵습니다.</p><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" /><button type="submit" disabled={isSubmitting}>{isSubmitting ? '전송 중...' : '무료 상담 신청하기'}</button>{submitError && <p className="form-error" role="alert">{submitError}</p>}</form>}</div>
        </RevealSection>
      </main>

      <footer><div className="container footer-content"><div className="brand"><span className="brand-mark"><img src="/assets/bearlabs-logo.png" alt="" /></span><span>베어랩스</span></div><p>© 2026 BearLabs. All rights reserved.</p></div></footer>
    </div>
  );
}

export default App;
