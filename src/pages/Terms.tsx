import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Shield, UserCheck, CreditCard, AlertTriangle, Lock, Scale, Gavel, Mail } from 'lucide-react';

const getSections = (t: any) => [
  {
    id: 'introduction',
    title: t('sections.introduction.title'),
    icon: FileText,
    content: t('sections.introduction.content'),
  },
  {
    id: 'accounts',
    title: t('sections.accounts.title'),
    icon: UserCheck,
    content: t('sections.accounts.content'),
  },
  {
    id: 'verification',
    title: t('sections.verification.title'),
    icon: Shield,
    content: t('sections.verification.content'),
  },
  {
    id: 'payment',
    title: t('sections.payment.title'),
    icon: CreditCard,
    content: t('sections.payment.content'),
  },
  {
    id: 'conduct',
    title: t('sections.conduct.title'),
    icon: AlertTriangle,
    content: t('sections.conduct.content'),
  },
  {
    id: 'disputes',
    title: t('sections.disputes.title'),
    icon: Scale,
    content: t('sections.disputes.content'),
  },
  {
    id: 'privacy',
    title: t('sections.privacy.title'),
    icon: Lock,
    content: t('sections.privacy.content'),
  },
  {
    id: 'intellectual',
    title: t('sections.intellectual.title'),
    icon: FileText,
    content: t('sections.intellectual.content'),
  },
  {
    id: 'liability',
    title: t('sections.liability.title'),
    icon: Gavel,
    content: t('sections.liability.content'),
  },
  {
    id: 'termination',
    title: t('sections.termination.title'),
    icon: AlertTriangle,
    content: t('sections.termination.content'),
  },
  {
    id: 'indemnification',
    title: t('sections.indemnification.title'),
    icon: Shield,
    content: t('sections.indemnification.content'),
  },
  {
    id: 'governing-law',
    title: t('sections.governingLaw.title'),
    icon: Scale,
    content: t('sections.governingLaw.content'),
  },
  {
    id: 'changes',
    title: t('sections.changes.title'),
    icon: FileText,
    content: t('sections.changes.content'),
  },
  {
    id: 'severability',
    title: t('sections.severability.title'),
    icon: Gavel,
    content: t('sections.severability.content'),
  },
  {
    id: 'contact-information',
    title: t('sections.contact.title'),
    icon: Mail,
    content: t('sections.contact.content'),
  },
];

export default function Terms() {
  const { t } = useTranslation('terms');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
        {/* Hero Section */}
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
                {t('hero.title', { subtitle: t('hero.subtitle') })}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                {t('hero.lastUpdated')}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-dark-500 text-lg mb-12">
                {t('disclaimer')}
              </p>

               <div className="space-y-8">
                 {sections.map((section) => {
                   const Icon = section.icon;
                   const isActive = activeSection === section.id;
 
                   return (
                     <div
                       key={section.id}
                       id={section.id}
                       className="bg-white rounded-2xl border border-dark-100 overflow-hidden scroll-mt-24"
                     >
                       <button
                         onClick={() => setActiveSection(isActive ? null : section.id)}
                         className="w-full flex items-center gap-4 p-6 text-left hover:bg-dark-50 transition-colors"
                       >
                         <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                           <Icon className="w-6 h-6 text-primary" />
                         </div>
                         <h2 className="text-xl font-bold text-dark-800 flex-1">{section.title}</h2>
                       </button>
                       <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[2000px]' : 'max-h-0'}`}>
                         <div className="px-6 pb-6">
                           <div className="pl-16">
                             <div className="text-dark-600 whitespace-pre-line">
                               {section.content}
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
           </div>
         </section>
      </main>
      <Footer />
    </div>
  );
}
