import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  Monitor,
  Building2,
  Layers,
  WifiOff,
  Languages,
  CreditCard,
} from 'lucide-react';

interface ValueProp {
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}

function ValueCard({ prop, index, t }: { prop: ValueProp; index: number; t: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = prop.icon;

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-dark-800 mb-3 group-hover:text-primary transition-colors duration-300">
        {t(prop.titleKey)}
      </h3>
      <p className="text-dark-500 text-sm leading-relaxed">{t(prop.descriptionKey)}</p>

      {/* Hover accent */}
      <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>{t('valueProps.learnMore')}</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default function ValueProposition() {
  const { t } = useTranslation('home');
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const valueProps: ValueProp[] = [
    {
      titleKey: 'valueProps.prop1.title',
      descriptionKey: 'valueProps.prop1.description',
      icon: Shield,
    },
    {
      titleKey: 'valueProps.prop2.title',
      descriptionKey: 'valueProps.prop2.description',
      icon: Monitor,
    },
    {
      titleKey: 'valueProps.prop3.title',
      descriptionKey: 'valueProps.prop3.description',
      icon: Building2,
    },
    {
      titleKey: 'valueProps.prop4.title',
      descriptionKey: 'valueProps.prop4.description',
      icon: Layers,
    },
    {
      titleKey: 'valueProps.prop5.title',
      descriptionKey: 'valueProps.prop5.description',
      icon: WifiOff,
    },
    {
      titleKey: 'valueProps.prop6.title',
      descriptionKey: 'valueProps.prop6.description',
      icon: Languages,
    },
    {
      titleKey: 'valueProps.prop7.title',
      descriptionKey: 'valueProps.prop7.description',
      icon: CreditCard,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-dark-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary rounded-full text-sm font-semibold mb-4">
            {t('valueProps.badge')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-dark-800 mb-4">
            {t('valueProps.title')}
          </h2>
          <p className="text-lg text-dark-500 max-w-2xl mx-auto">
            {t('valueProps.description')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Value Cards Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map((prop, index) => (
              <ValueCard key={prop.titleKey} prop={prop} index={index} t={t} />
            ))}
          </div>

          {/* Illustration */}
          <div className="lg:col-span-4 hidden lg:block">
            <div
              className={`sticky top-32 transition-all duration-1000 delay-500 ${
                headerVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                <img
                  src="/value-illustration.jpg"
                  alt="Caregiver with patient"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark-800">{t('valueProps.badgeValue')}</p>
                      <p className="text-xs text-dark-500">{t('valueProps.badgeLabel')}</p>
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
