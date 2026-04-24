import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterCTA from '@/sections/FooterCTA';
import ParticleBackground from '@/components/ParticleBackground';
import {
  Users,
  UserCheck,
  Building2,
  Heart,
  ShoppingBag,
  Check,
  Globe,
  Smartphone,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';

interface Feature {
  titleKey: string;
  descriptionKey: string;
}

interface FeatureCategory {
  id: string;
  titleKey: string;
  subtitleKey: string;
  icon: React.ElementType;
  color: string;
  features: Feature[];
}

const getFeatureCategories = (): FeatureCategory[] => [
  {
    id: 'guardians',
    titleKey: 'guardians.title',
    subtitleKey: 'guardians.subtitle',
    icon: Users,
    color: 'primary',
    features: [
      { titleKey: 'guardians.f1.title', descriptionKey: 'guardians.f1.description' },
      { titleKey: 'guardians.f2.title', descriptionKey: 'guardians.f2.description' },
      { titleKey: 'guardians.f3.title', descriptionKey: 'guardians.f3.description' },
      { titleKey: 'guardians.f4.title', descriptionKey: 'guardians.f4.description' },
      { titleKey: 'guardians.f5.title', descriptionKey: 'guardians.f5.description' },
      { titleKey: 'guardians.f6.title', descriptionKey: 'guardians.f6.description' },
      { titleKey: 'guardians.f7.title', descriptionKey: 'guardians.f7.description' },
      { titleKey: 'guardians.f8.title', descriptionKey: 'guardians.f8.description' },
    ],
  },
  {
    id: 'caregivers',
    titleKey: 'caregivers.title',
    subtitleKey: 'caregivers.subtitle',
    icon: UserCheck,
    color: 'secondary',
    features: [
      { titleKey: 'caregivers.f1.title', descriptionKey: 'caregivers.f1.description' },
      { titleKey: 'caregivers.f2.title', descriptionKey: 'caregivers.f2.description' },
      { titleKey: 'caregivers.f3.title', descriptionKey: 'caregivers.f3.description' },
      { titleKey: 'caregivers.f4.title', descriptionKey: 'caregivers.f4.description' },
      { titleKey: 'caregivers.f5.title', descriptionKey: 'caregivers.f5.description' },
      { titleKey: 'caregivers.f6.title', descriptionKey: 'caregivers.f6.description' },
      { titleKey: 'caregivers.f7.title', descriptionKey: 'caregivers.f7.description' },
      { titleKey: 'caregivers.f8.title', descriptionKey: 'caregivers.f8.description' },
    ],
  },
  {
    id: 'agencies',
    titleKey: 'agencies.title',
    subtitleKey: 'agencies.subtitle',
    icon: Building2,
    color: 'primary',
    features: [
      { titleKey: 'agencies.f1.title', descriptionKey: 'agencies.f1.description' },
      { titleKey: 'agencies.f2.title', descriptionKey: 'agencies.f2.description' },
      { titleKey: 'agencies.f3.title', descriptionKey: 'agencies.f3.description' },
      { titleKey: 'agencies.f4.title', descriptionKey: 'agencies.f4.description' },
      { titleKey: 'agencies.f5.title', descriptionKey: 'agencies.f5.description' },
      { titleKey: 'agencies.f6.title', descriptionKey: 'agencies.f6.description' },
      { titleKey: 'agencies.f7.title', descriptionKey: 'agencies.f7.description' },
      { titleKey: 'agencies.f8.title', descriptionKey: 'agencies.f8.description' },
      { titleKey: 'agencies.f9.title', descriptionKey: 'agencies.f9.description' },
    ],
  },
  {
    id: 'patients',
    titleKey: 'patients.title',
    subtitleKey: 'patients.subtitle',
    icon: Heart,
    color: 'secondary',
    features: [
      { titleKey: 'patients.f1.title', descriptionKey: 'patients.f1.description' },
      { titleKey: 'patients.f2.title', descriptionKey: 'patients.f2.description' },
      { titleKey: 'patients.f3.title', descriptionKey: 'patients.f3.description' },
      { titleKey: 'patients.f4.title', descriptionKey: 'patients.f4.description' },
      { titleKey: 'patients.f5.title', descriptionKey: 'patients.f5.description' },
      { titleKey: 'patients.f6.title', descriptionKey: 'patients.f6.description' },
      { titleKey: 'patients.f7.title', descriptionKey: 'patients.f7.description' },
    ],
  },
  {
    id: 'shops',
    titleKey: 'shops.title',
    subtitleKey: 'shops.subtitle',
    icon: ShoppingBag,
    color: 'primary',
    features: [
      { titleKey: 'shops.f1.title', descriptionKey: 'shops.f1.description' },
      { titleKey: 'shops.f2.title', descriptionKey: 'shops.f2.description' },
      { titleKey: 'shops.f3.title', descriptionKey: 'shops.f3.description' },
      { titleKey: 'shops.f4.title', descriptionKey: 'shops.f4.description' },
      { titleKey: 'shops.f5.title', descriptionKey: 'shops.f5.description' },
      { titleKey: 'shops.f6.title', descriptionKey: 'shops.f6.description' },
      { titleKey: 'shops.f7.title', descriptionKey: 'shops.f7.description' },
      { titleKey: 'shops.f8.title', descriptionKey: 'shops.f8.description' },
    ],
  },
];

const getPlatformFeatures = () => [
  { titleKey: 'platform.f1.title', descriptionKey: 'platform.f1.description', icon: Zap },
  { titleKey: 'platform.f2.title', descriptionKey: 'platform.f2.description', icon: Globe },
  { titleKey: 'platform.f3.title', descriptionKey: 'platform.f3.description', icon: Smartphone },
  { titleKey: 'platform.f4.title', descriptionKey: 'platform.f4.description', icon: Zap },
  { titleKey: 'platform.f5.title', descriptionKey: 'platform.f5.description', icon: Shield },
  { titleKey: 'platform.f6.title', descriptionKey: 'platform.f6.description', icon: Clock },
];

export default function Features() {
  const { t } = useTranslation('features');
  const [activeCategory, setActiveCategory] = useState('guardians');
  const heroRef = useRef<HTMLDivElement>(null);

  const featureCategories = getFeatureCategories();
  const platformFeatures = getPlatformFeatures();
  const activeCategoryData = featureCategories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <ParticleBackground />
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                {t('hero.title')}
                <span className="block text-secondary">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Features by Role Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {featureCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? category.color === 'primary'
                          ? 'bg-primary text-white shadow-glow'
                          : 'bg-secondary text-white shadow-glow-orange'
                        : 'bg-dark-50 text-dark-600 hover:bg-dark-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t(category.titleKey)}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Content */}
            {activeCategoryData && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-3">
                    {t(activeCategoryData.titleKey)}
                  </h2>
                  <p className="text-dark-500">{t(activeCategoryData.subtitleKey)}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeCategoryData.features.map((feature, index) => (
                    <div
                      key={feature.titleKey}
                      className="group bg-white rounded-2xl p-6 border border-dark-100 hover:border-primary hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                        activeCategoryData.color === 'primary' 
                          ? 'bg-primary-100 group-hover:bg-primary' 
                          : 'bg-secondary-100 group-hover:bg-secondary'
                      } transition-colors duration-300`}>
                        <Check className={`w-5 h-5 ${
                          activeCategoryData.color === 'primary' 
                            ? 'text-primary group-hover:text-white' 
                            : 'text-secondary group-hover:text-white'
                        } transition-colors duration-300`} />
                      </div>
                      <h3 className="font-bold text-dark-800 mb-2 group-hover:text-primary transition-colors">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-sm text-dark-500">{t(feature.descriptionKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Platform-Wide Features */}
        <section className="py-24 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary rounded-full text-sm font-semibold mb-4">
                {t('platform.badge')}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-800 mb-4">
                {t('platform.title')} <span className="text-gradient">{t('platform.subtitle')}</span>
              </h2>
              <p className="text-lg text-dark-500 max-w-2xl mx-auto">
                {t('platform.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.titleKey}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow-card flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-800 mb-2 group-hover:text-primary transition-colors">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-dark-500 text-sm">{t(feature.descriptionKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
