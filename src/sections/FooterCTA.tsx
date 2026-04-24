import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FooterCTA() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-20 w-8 h-8 text-white/30 animate-float" />
        <Sparkles className="absolute top-40 right-32 w-6 h-6 text-white/20 animate-float" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute bottom-32 left-40 w-10 h-10 text-white/20 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            {t('footerCTA.title')}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            {t('footerCTA.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              {t('footerCTA.ctaPrimary')}
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 backdrop-blur-sm">
              {t('footerCTA.ctaSecondary')}
            </Button>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-white/60 text-sm animate-fade-in delay-500">
            {t('footerCTA.trustText')}
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80L60 75C120 70 240 60 360 55C480 50 600 50 720 52.5C840 55 960 60 1080 62.5C1200 65 1320 65 1380 65L1440 65V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#0F172A"
          />
        </svg>
      </div>
    </section>
  );
}
