import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileCheck,
  Shield,
  HeartPulse,
  Brain,
  UserCheck,
  BadgeCheck,
  Building2,
  Lock,
  Headphones,
} from 'lucide-react';

interface VerificationStep {
  number: number;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}

interface SafetyFeature {
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}

export default function TrustSafety() {
  const { t } = useTranslation('home');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const verificationSteps: VerificationStep[] = [
    {
      number: 1,
      titleKey: 'trustSafety.steps.1.title',
      descriptionKey: 'trustSafety.steps.1.description',
      icon: FileCheck,
    },
    {
      number: 2,
      titleKey: 'trustSafety.steps.2.title',
      descriptionKey: 'trustSafety.steps.2.description',
      icon: Shield,
    },
    {
      number: 3,
      titleKey: 'trustSafety.steps.3.title',
      descriptionKey: 'trustSafety.steps.3.description',
      icon: HeartPulse,
    },
    {
      number: 4,
      titleKey: 'trustSafety.steps.4.title',
      descriptionKey: 'trustSafety.steps.4.description',
      icon: Brain,
    },
    {
      number: 5,
      titleKey: 'trustSafety.steps.5.title',
      descriptionKey: 'trustSafety.steps.5.description',
      icon: UserCheck,
    },
    {
      number: 6,
      titleKey: 'trustSafety.steps.6.title',
      descriptionKey: 'trustSafety.steps.6.description',
      icon: BadgeCheck,
    },
  ];

  const safetyFeatures: SafetyFeature[] = [
    {
      titleKey: 'trustSafety.features.1.title',
      descriptionKey: 'trustSafety.features.1.description',
      icon: Building2,
    },
    {
      titleKey: 'trustSafety.features.2.title',
      descriptionKey: 'trustSafety.features.2.description',
      icon: Lock,
    },
    {
      titleKey: 'trustSafety.features.3.title',
      descriptionKey: 'trustSafety.features.3.description',
      icon: Headphones,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary rounded-full text-sm font-semibold mb-4">
            {t('trustSafety.badge')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-dark-800 mb-4">
            {t('trustSafety.title')}
          </h2>
          <p className="text-lg text-dark-500 max-w-2xl mx-auto">
            {t('trustSafety.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Verification Steps */}
          <div className="animate-slide-up delay-200">
            <h3 className="text-2xl font-bold text-dark-800 mb-8">
              {t('trustSafety.stepsTitle')}
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary" />

              {/* Steps */}
              <div className="space-y-6">
                {verificationSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;

                  return (
                    <div
                      key={step.number}
                      className="relative flex gap-6 group cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onMouseEnter={() => setActiveStep(index)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      {/* Number Badge */}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'bg-primary text-white shadow-glow scale-110'
                            : 'bg-white border-2 border-dark-200 text-dark-500 group-hover:border-primary group-hover:text-primary'
                        }`}
                      >
                        <span className="font-bold">{step.number}</span>
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 bg-white rounded-xl p-5 shadow-sm border transition-all duration-300 ${
                          isActive
                            ? 'border-primary shadow-md'
                            : 'border-dark-100 group-hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isActive ? 'text-primary' : 'text-dark-400'
                            }`}
                          />
                          <h4 className="font-bold text-dark-800">
                            {t(step.titleKey)}
                          </h4>
                        </div>
                        <p className="text-sm text-dark-500">
                          {t(step.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Safety Features */}
          <div className="animate-slide-up delay-400">
            <h3 className="text-2xl font-bold text-dark-800 mb-8">
              {t('trustSafety.featuresTitle')}
            </h3>

            <div className="space-y-6">
              {safetyFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.titleKey}
                    className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 animate-slide-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:to-primary-600 transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="font-bold text-dark-800 mb-2 group-hover:text-primary transition-colors duration-300">
                          {t(feature.titleKey)}
                        </h4>
                        <p className="text-dark-500 text-sm">
                          {t(feature.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badge */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary-700 rounded-2xl p-6 text-white animate-fade-in delay-700">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('trustSafety.badgeValue')}</p>
                  <p className="text-white/80 text-sm">
                    {t('trustSafety.badgeDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
