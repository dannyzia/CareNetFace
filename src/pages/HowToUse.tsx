import { useRef, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterCTA from '@/sections/FooterCTA';
import ParticleBackground from '@/components/ParticleBackground';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Users,
  UserCheck,
  Building2,
  ChevronDown,
  Phone,
  HelpCircle,
  BookOpen,
  Video,
  WifiOff,
  Bell,
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const getFAQs = (t: any): FAQ[] => [
  {
    question: t('faq.q1.question'),
    answer: t('faq.q1.answer'),
  },
  {
    question: t('faq.q2.question'),
    answer: t('faq.q2.answer'),
  },
  {
    question: t('faq.q3.question'),
    answer: t('faq.q3.answer'),
  },
  {
    question: t('faq.q4.question'),
    answer: t('faq.q4.answer'),
  },
];

const getGettingStartedSteps = (t: any) => [
  {
    number: '01',
    title: t('gettingStarted.step1.title'),
    description: t('gettingStarted.step1.description'),
    details: [t('gettingStarted.step1.detail1')],
  },
  {
    number: '02',
    title: t('gettingStarted.step2.title'),
    description: t('gettingStarted.step2.description'),
    details: [
      t('gettingStarted.step2.detail1'),
      t('gettingStarted.step2.detail2'),
      t('gettingStarted.step2.detail3'),
    ],
  },
  {
    number: '03',
    title: t('gettingStarted.step3.title'),
    description: t('gettingStarted.step3.description'),
    details: [
      t('gettingStarted.step3.detail1'),
      t('gettingStarted.step3.detail2'),
      t('gettingStarted.step3.detail3'),
      t('gettingStarted.step3.detail4'),
      t('gettingStarted.step3.detail5'),
    ],
  },
  {
    number: '04',
    title: t('gettingStarted.step4.title'),
    description: t('gettingStarted.step4.description'),
    details: [
      t('gettingStarted.step4.detail1'),
      t('gettingStarted.step4.detail2'),
      t('gettingStarted.step4.detail3'),
    ],
  },
];

type RoleStep = {
  title: string;
  bullets: string[];
};

type RoleGuide = {
  id: string;
  title: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  color: 'primary' | 'secondary';
  steps: RoleStep[];
};

const getRoleGuides = (t: any): RoleGuide[] => [
  {
    id: 'guardians',
    title: t('roleGuides.guardians.title'),
    icon: Users,
    color: 'primary',
    steps: [
      {
        title: t('roleGuides.guardians.step1.title'),
        bullets: [
          t('roleGuides.guardians.step1.b1'),
          t('roleGuides.guardians.step1.b2'),
          t('roleGuides.guardians.step1.b3'),
          t('roleGuides.guardians.step1.b4'),
          t('roleGuides.guardians.step1.b5'),
        ],
      },
      {
        title: t('roleGuides.guardians.step2.title'),
        bullets: [
          t('roleGuides.guardians.step2.b1'),
          t('roleGuides.guardians.step2.b2'),
          t('roleGuides.guardians.step2.b3'),
          t('roleGuides.guardians.step2.b4'),
          t('roleGuides.guardians.step2.b5'),
        ],
      },
      {
        title: t('roleGuides.guardians.step3.title'),
        bullets: [
          t('roleGuides.guardians.step3.b1'),
          t('roleGuides.guardians.step3.b2'),
          t('roleGuides.guardians.step3.b3'),
        ],
      },
      {
        title: t('roleGuides.guardians.step4.title'),
        bullets: [
          t('roleGuides.guardians.step4.b1'),
          t('roleGuides.guardians.step4.b2'),
          t('roleGuides.guardians.step4.b3'),
          t('roleGuides.guardians.step4.b4'),
        ],
      },
      {
        title: t('roleGuides.guardians.step5.title'),
        bullets: [
          t('roleGuides.guardians.step5.b1'),
          t('roleGuides.guardians.step5.b2'),
        ],
      },
    ],
  },
  {
    id: 'caregivers',
    title: t('roleGuides.caregivers.title'),
    icon: UserCheck,
    color: 'secondary',
    steps: [
      {
        title: t('roleGuides.caregivers.step1.title'),
        bullets: [
          t('roleGuides.caregivers.step1.b1'),
          t('roleGuides.caregivers.step1.b2'),
          t('roleGuides.caregivers.step1.b3'),
          t('roleGuides.caregivers.step1.b4'),
          t('roleGuides.caregivers.step1.b5'),
        ],
      },
      {
        title: t('roleGuides.caregivers.step2.title'),
        bullets: [
          t('roleGuides.caregivers.step2.b1'),
          t('roleGuides.caregivers.step2.b2'),
        ],
      },
      {
        title: t('roleGuides.caregivers.step3.title'),
        bullets: [
          t('roleGuides.caregivers.step3.b1'),
          t('roleGuides.caregivers.step3.b2'),
        ],
      },
      {
        title: t('roleGuides.caregivers.step4.title'),
        bullets: [
          t('roleGuides.caregivers.step4.b1'),
          t('roleGuides.caregivers.step4.b2'),
          t('roleGuides.caregivers.step4.b3'),
          t('roleGuides.caregivers.step4.b4'),
        ],
      },
      {
        title: t('roleGuides.caregivers.step5.title'),
        bullets: [
          t('roleGuides.caregivers.step5.b1'),
          t('roleGuides.caregivers.step5.b2'),
        ],
      },
    ],
  },
  {
    id: 'agencies',
    title: t('roleGuides.agencies.title'),
    icon: Building2,
    color: 'primary',
    steps: [
      {
        title: t('roleGuides.agencies.step1.title'),
        bullets: [
          t('roleGuides.agencies.step1.b1'),
          t('roleGuides.agencies.step1.b2'),
        ],
      },
      {
        title: t('roleGuides.agencies.step2.title'),
        bullets: [
          t('roleGuides.agencies.step2.b1'),
          t('roleGuides.agencies.step2.b2'),
          t('roleGuides.agencies.step2.b3'),
          t('roleGuides.agencies.step2.b4'),
        ],
      },
      {
        title: t('roleGuides.agencies.step3.title'),
        bullets: [
          t('roleGuides.agencies.step3.b1'),
          t('roleGuides.agencies.step3.b2'),
          t('roleGuides.agencies.step3.b3'),
          t('roleGuides.agencies.step3.b4'),
          t('roleGuides.agencies.step3.b5'),
        ],
      },
      {
        title: t('roleGuides.agencies.step4.title'),
        bullets: [
          t('roleGuides.agencies.step4.b1'),
          t('roleGuides.agencies.step4.b2'),
        ],
      },
    ],
  },
];

export default function HowToUse() {
  const { t } = useTranslation('howToUse');
  const [activeRole, setActiveRole] = useState('guardians');
  const heroRef = useRef<HTMLDivElement>(null);

  const faqs = getFAQs(t);
  const gettingStartedSteps = getGettingStartedSteps(t);
  const roleGuides = getRoleGuides(t);
  const activeRoleData = roleGuides.find(r => r.id === activeRole);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <ParticleBackground />
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

        {/* Getting Started Steps */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('gettingStarted.title')}
              </h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                {t('gettingStarted.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gettingStartedSteps.map((step, index) => (
                <Card key={step.number} className="relative border-dark-100 hover:border-primary hover:shadow-card-hover">
                  <CardHeader className="flex items-start gap-4">
                    <span className="text-5xl font-extrabold text-primary/20">{step.number}</span>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="list-disc list-inside space-y-1 text-dark-600">
                      {step.details.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </CardContent>
                  {index < gettingStartedSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-10 h-0.5 bg-dark-200" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Role-Specific Guides */}
        <section className="py-24 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('roleGuides.title')}
              </h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                {t('roleGuides.description')}
              </p>
            </div>

            {/* Role Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {roleGuides.map((role) => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;

                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? role.color === 'primary'
                          ? 'bg-primary text-white shadow-glow'
                          : 'bg-secondary text-white shadow-glow-orange'
                        : 'bg-white text-dark-600 hover:bg-dark-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{role.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Role Steps */}
            {activeRoleData && (
              <div className="bg-white rounded-3xl p-8 lg:p-12 animate-fade-in">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-dark-800 mb-6">
                      {t('roleGuides.guideTitle', { role: activeRoleData.title })}
                    </h3>
                    <div className="space-y-6">
                      {activeRoleData.steps.map((step, index) => (
                        <div key={index} className="bg-dark-50 rounded-xl p-4">
                          <h4 className="text-lg font-semibold text-dark-800 mb-2">
                            {index + 1}. {step.title}
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-dark-600">
                            {step.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`rounded-2xl p-8 ${
                    activeRoleData.color === 'primary' 
                      ? 'bg-gradient-to-br from-primary to-primary-700' 
                      : 'bg-gradient-to-br from-secondary to-secondary-700'
                  }`}>
                    <activeRoleData.icon className="w-24 h-24 text-white/80 mx-auto" />
                    <p className="text-white/80 text-center mt-6">
                      {t('roleGuides.followSteps', { role: activeRoleData.title.replace('For ', '') })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Offline Mode & Communication */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <WifiOff className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{t('offlineMode.title')}</CardTitle>
                  <CardDescription>{t('offlineMode.subtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-dark-600">
                    <li>{t('offlineMode.f1')}</li>
                    <li>{t('offlineMode.f2')}</li>
                    <li>{t('offlineMode.f3')}</li>
                    <li>{t('offlineMode.f4')}</li>
                  </ol>
                  <h4 className="mt-6 text-lg font-semibold text-dark-800">{t('offlineMode.bestPractices')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-dark-600">
                    <li>{t('offlineMode.bp1')}</li>
                    <li>{t('offlineMode.bp2')}</li>
                    <li>{t('offlineMode.bp3')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>{t('communication.title')}</CardTitle>
                  <CardDescription>{t('communication.subtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-dark-800">{t('communication.messagingTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-dark-600">
                      <li>{t('communication.m1')}</li>
                      <li>{t('communication.m2')}</li>
                      <li>{t('communication.m3')}</li>
                      <li>{t('communication.m4')}</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-dark-800">{t('communication.notificationsTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-dark-600">
                      <li>{t('communication.n1')}</li>
                      <li>{t('communication.n2')}</li>
                      <li>{t('communication.n3')}</li>
                      <li>{t('communication.n4')}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-dark-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-dark-500">
                {t('faq.subtitle')}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="bg-white rounded-xl border border-dark-100 px-5 py-3">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="bg-white rounded-b-xl border-x border-b border-dark-100 px-5 py-4 text-dark-600">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Support Resources */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark-800 mb-4">
                {t('support.title')}
              </h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                {t('support.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: HelpCircle,
                  title: t('support.helpCenter'),
                  desc: t('support.helpCenterDesc'),
                  color: 'primary',
                },
                {
                  icon: Phone,
                  title: t('support.phone'),
                  desc: t('support.phoneDesc'),
                  color: 'secondary',
                },
                {
                  icon: BookOpen,
                  title: t('support.email'),
                  desc: t('support.emailDesc'),
                  color: 'primary',
                },
                {
                  icon: Video,
                  title: t('support.whatsapp'),
                  desc: t('support.whatsappDesc'),
                  color: 'secondary',
                },
              ].map((resource) => {
                const Icon = resource.icon;
                return (
                  <div key={resource.title} className="bg-white rounded-2xl p-6 border border-dark-100 hover:border-primary hover:shadow-card-hover transition-all duration-300 text-center">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      resource.color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
                    }`}>
                      <Icon className={`w-7 h-7 ${resource.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="font-bold text-dark-800 mb-2">{resource.title}</h3>
                    <p className="text-sm text-dark-500">{resource.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-dark-600">{t('support.ticketNote')}</p>
            </div>
          </div>
        </section>

        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
