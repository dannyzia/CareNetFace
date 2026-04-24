import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterCTA from '@/sections/FooterCTA';
import { Check, Mail, ArrowRight, Sparkles, Users, Building2, UserCheck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const getComingSoonFeatures = (t: any) => [
  t('comingSoon.whatsIncluded.platformAccess'),
  t('comingSoon.whatsIncluded.coreFeatures'),
  t('comingSoon.whatsIncluded.realTimeUpdates'),
  t('comingSoon.whatsIncluded.customerSupport'),
  t('comingSoon.whatsIncluded.platformUpdates'),
];

const getEnterpriseFeatures = (t: any) => [
  t('comingSoon.enterprise.customIntegrations'),
  t('comingSoon.enterprise.accountManagement'),
  t('comingSoon.enterprise.prioritySupport'),
  t('comingSoon.enterprise.volumeDiscounts'),
  t('comingSoon.enterprise.customReporting'),
];

export default function Pricing() {
  const { t } = useTranslation('pricing');
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const comingSoonFeatures = getComingSoonFeatures(t);
  const enterpriseFeatures = getEnterpriseFeatures(t);

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
                {t('hero.title')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                {t('hero.headline')}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Pricing Coming Soon */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('comingSoon.title')}
              </h2>
              
              <p className="text-dark-500 mb-8 max-w-xl mx-auto">
                {t('comingSoon.description')}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 text-left">
                  <h3 className="font-bold text-dark-800 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    {t('comingSoon.whatsIncluded.title')}
                  </h3>
                  <ul className="space-y-3">
                    {comingSoonFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-dark-500">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 text-left">
                  <h3 className="font-bold text-dark-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-secondary" />
                    {t('comingSoon.enterprise.title')}
                  </h3>
                  <ul className="space-y-3">
                    {enterpriseFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-dark-500">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-dark-800 mb-2">
                  {t('comingSoon.earlyAccess.title')}
                </h3>
                <p className="text-dark-500 text-sm mb-4">
                  {t('comingSoon.earlyAccess.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder={t('comingSoon.earlyAccess.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary-600">
                    {t('comingSoon.earlyAccess.cta')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Different Users */}
        <section className="py-24 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('forUsers.title')}
              </h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                {t('forUsers.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, title: t('forUsers.guardians'), desc: t('forUsers.guardiansDesc'), color: 'primary' },
                { icon: UserCheck, title: t('forUsers.caregivers'), desc: t('forUsers.caregiversDesc'), color: 'secondary' },
                { icon: Building2, title: t('forUsers.agencies'), desc: t('forUsers.agenciesDesc'), color: 'primary' },
                { icon: ShoppingBag, title: t('forUsers.shopOwners'), desc: t('forUsers.shopOwnersDesc'), color: 'secondary' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-2xl p-6 text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      item.color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
                    }`}>
                      <Icon className={`w-7 h-7 ${item.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="font-bold text-dark-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-dark-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Sales */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">
              {t('contactSales.title')}
            </h2>
            <p className="text-dark-500 mb-8 max-w-xl mx-auto">
              {t('contactSales.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-primary hover:bg-primary-600">
                <Mail className="w-4 h-4 mr-2" />
                {t('contactSales.contactSales')}
              </Button>
              <Button variant="outline" className="border-dark-200">
                {t('contactSales.scheduleDemo')}
              </Button>
            </div>
          </div>
        </section>

        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
