import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  UserCheck,
  Building2,
  ShoppingBag,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Audience {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featureKeys: string[];
  icon: React.ElementType;
  color: string;
}

export default function TargetAudience() {
  const { t } = useTranslation('home');
  const [activeTab, setActiveTab] = useState('guardians');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const audiences: Audience[] = [
    {
      id: 'guardians',
      titleKey: 'targetAudience.guardians.title',
      subtitleKey: 'targetAudience.guardians.subtitle',
      descriptionKey: 'targetAudience.guardians.description',
      featureKeys: [
        'targetAudience.guardians.features.0',
        'targetAudience.guardians.features.1',
        'targetAudience.guardians.features.2',
        'targetAudience.guardians.features.3',
        'targetAudience.guardians.features.4',
      ],
      icon: Users,
      color: 'primary',
    },
    {
      id: 'caregivers',
      titleKey: 'targetAudience.caregivers.title',
      subtitleKey: 'targetAudience.caregivers.subtitle',
      descriptionKey: 'targetAudience.caregivers.description',
      featureKeys: [
        'targetAudience.caregivers.features.0',
        'targetAudience.caregivers.features.1',
        'targetAudience.caregivers.features.2',
        'targetAudience.caregivers.features.3',
        'targetAudience.caregivers.features.4',
      ],
      icon: UserCheck,
      color: 'secondary',
    },
    {
      id: 'agencies',
      titleKey: 'targetAudience.agencies.title',
      subtitleKey: 'targetAudience.agencies.subtitle',
      descriptionKey: 'targetAudience.agencies.description',
      featureKeys: [
        'targetAudience.agencies.features.0',
        'targetAudience.agencies.features.1',
        'targetAudience.agencies.features.2',
        'targetAudience.agencies.features.3',
        'targetAudience.agencies.features.4',
      ],
      icon: Building2,
      color: 'primary',
    },
    {
      id: 'shops',
      titleKey: 'targetAudience.shops.title',
      subtitleKey: 'targetAudience.shops.subtitle',
      descriptionKey: 'targetAudience.shops.description',
      featureKeys: [
        'targetAudience.shops.features.0',
        'targetAudience.shops.features.1',
        'targetAudience.shops.features.2',
        'targetAudience.shops.features.3',
        'targetAudience.shops.features.4',
      ],
      icon: ShoppingBag,
      color: 'secondary',
    },
  ];

  const activeAudience = audiences.find((a) => a.id === activeTab) || audiences[0];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-primary-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-secondary-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary-100 text-secondary rounded-full text-sm font-semibold mb-4">
            {t('targetAudience.badge')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-dark-800 mb-4">
            {t('targetAudience.title')}
          </h2>
          <p className="text-lg text-dark-500 max-w-2xl mx-auto">
            {t('targetAudience.description')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;
            const isActive = activeTab === audience.id;

            return (
              <button
                key={audience.id}
                onClick={() => setActiveTab(audience.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? audience.color === 'primary'
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-secondary text-white shadow-glow-orange'
                    : 'bg-dark-50 text-dark-600 hover:bg-dark-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{t(audience.titleKey).split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-dark-100">
            <div className="grid lg:grid-cols-2">
              {/* Left - Content */}
              <div className="p-8 lg:p-12">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    activeAudience.color === 'primary'
                      ? 'bg-primary-100'
                      : 'bg-secondary-100'
                  }`}
                >
                  <activeAudience.icon
                    className={`w-8 h-8 ${
                      activeAudience.color === 'primary'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-dark-800 mb-2">
                  {t(activeAudience.titleKey)}
                </h3>
                <p
                  className={`text-lg font-medium mb-4 ${
                    activeAudience.color === 'primary'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                >
                  {t(activeAudience.subtitleKey)}
                </p>
                <p className="text-dark-500 mb-8 leading-relaxed">
                  {t(activeAudience.descriptionKey)}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {activeAudience.featureKeys.map((featureKey, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                          activeAudience.color === 'primary'
                            ? 'bg-primary-100'
                            : 'bg-secondary-100'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 ${
                            activeAudience.color === 'primary'
                              ? 'text-primary'
                              : 'text-secondary'
                          }`}
                        />
                      </div>
                      <span className="text-dark-700">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`font-semibold ${
                    activeAudience.color === 'primary'
                      ? 'bg-primary hover:bg-primary-600'
                      : 'bg-secondary hover:bg-secondary-600'
                  }`}
                >
                  {t('targetAudience.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Right - Visual */}
              <div
                className={`relative min-h-[300px] lg:min-h-full ${
                  activeAudience.color === 'primary'
                    ? 'bg-gradient-to-br from-primary to-primary-700'
                    : 'bg-gradient-to-br from-secondary to-secondary-700'
                }`}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* Icon display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <activeAudience.icon className="w-24 h-24 text-white" />
                    </div>
                    {/* Orbiting elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center animate-float">
                      <Check className="w-6 h-6 text-dark-800" />
                    </div>
                    <div
                      className="absolute bottom-4 left-0 w-10 h-10 bg-white rounded-full flex items-center justify-center animate-float"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <Check className="w-5 h-5 text-dark-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
