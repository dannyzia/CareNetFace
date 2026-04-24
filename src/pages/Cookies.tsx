import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const getSections = (t: any) => [
  {
    id: 'introduction',
    title: t('sections.introduction.title'),
    content: t('sections.introduction.content'),
  },
  {
    id: 'what-are-cookies',
    title: t('sections.whatAreCookies.title'),
    content: t('sections.whatAreCookies.content'),
  },
  {
    id: 'types-of-cookies',
    title: t('sections.typesOfCookies.title'),
    content: t('sections.typesOfCookies.content'),
  },
  {
    id: 'specific-cookies',
    title: t('sections.specificCookies.title'),
    content: t('sections.specificCookies.content'),
  },
  {
    id: 'third-party',
    title: t('sections.thirdParty.title'),
    content: t('sections.thirdParty.content'),
  },
  {
    id: 'consent-management',
    title: t('sections.consentManagement.title'),
    content: t('sections.consentManagement.content'),
  },
  {
    id: 'manage-disable',
    title: t('sections.manageDisable.title'),
    content: t('sections.manageDisable.content'),
  },
  {
    id: 'lifespan',
    title: t('sections.lifespan.title'),
    content: t('sections.lifespan.content'),
  },
  {
    id: 'updates',
    title: t('sections.updates.title'),
    content: t('sections.updates.content'),
  },
  {
    id: 'contact',
    title: t('sections.contact.title'),
    content: t('sections.contact.content'),
  },
];

export default function Cookies() {
  const { t } = useTranslation('cookies');
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const sections = getSections(t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section ref={heroRef} className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                {t('hero.title', { subtitle: 'Policy' })}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">{t('hero.lastUpdated')}</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H0Z" fill="white" />
            </svg>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-dark-500 text-lg mb-12">
                {t('disclaimer')}
              </p>
              <div className="space-y-10">
                {sections.map((section) => (
                  <article key={section.id} id={section.id} className="bg-white rounded-2xl border border-dark-100 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-dark-800 mb-4">{section.title}</h2>
                    <p className="text-dark-600 whitespace-pre-line">{section.content}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
