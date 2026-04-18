import { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { EvidenceSection } from './components/EvidenceSection';
import { WhoWeServe } from './components/WhoWeServe';
import { OurApproach } from './components/OurApproach';
import { OurApproachPillars } from './components/OurApproachPillars';
import { CareerEvolution } from './components/CareerEvolution';
import { Programs } from './components/Programs';
import { OurPromise } from './components/OurPromise';
import { Outcomes } from './components/Outcomes';
import { StatsNumbers } from './components/StatsNumbers';
import { Testimonials } from './components/Testimonials';
import { AdvisoryBoard } from './components/AdvisoryBoard';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TabImageSection } from './components/TabImageSection';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          const offset = 96;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen antialiased relative" style={{ backgroundColor: '#FFFFFF' }}>

      {/* ── Continuous ambient background — very subtle on white ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
        {/* Top-right teal bloom */}
        <div style={{
          position: 'absolute', top: '0%', right: '0%',
          width: 900, height: 900, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,100,100,0.07) 0%, transparent 62%)',
        }} />
        {/* Upper-left violet bloom */}
        <div style={{
          position: 'absolute', top: '5%', left: '-5%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,120,120,0.06) 0%, transparent 60%)',
        }} />
        {/* Mid mint */}
        <div style={{
          position: 'absolute', top: '25%', right: '5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130,130,130,0.07) 0%, transparent 60%)',
        }} />
        {/* Mid-left violet */}
        <div style={{
          position: 'absolute', top: '42%', left: '-3%',
          width: 650, height: 650, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,120,120,0.05) 0%, transparent 58%)',
        }} />
        {/* Center-right teal */}
        <div style={{
          position: 'absolute', top: '58%', right: '12%',
          width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,100,100,0.05) 0%, transparent 55%)',
        }} />
        {/* Lower-left mint */}
        <div style={{
          position: 'absolute', top: '72%', left: '8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130,130,130,0.05) 0%, transparent 55%)',
        }} />
        {/* Bottom-right violet */}
        <div style={{
          position: 'absolute', top: '85%', right: '5%',
          width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,120,120,0.05) 0%, transparent 58%)',
        }} />
        {/* Bottom-center teal */}
        <div style={{
          position: 'absolute', top: '95%', left: '30%',
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,100,100,0.04) 0%, transparent 55%)',
        }} />
      </div>

      <Header />

      <main
        className="relative"
        style={{ zIndex: 1, animation: 'page-reveal 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
      >
        <HeroSection />
        <StatsSection />
        <TabImageSection />
        <EvidenceSection />
        <WhoWeServe />
        <OurApproach />
        <OurApproachPillars />
        <CareerEvolution />
        <Programs />
        <OurPromise />
        <Outcomes />
        <StatsNumbers />
        <Testimonials />
        <AdvisoryBoard />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
