import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, Heart, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

export default function Hero() {
  const { t } = useTranslation('home');
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen gradient-hero overflow-hidden"
    >
      <ParticleBackground />

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Diagonal Shape */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/30 to-transparent z-0"
        style={{
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              {t('hero.eyebrow')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {t('hero.headline1')}
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-secondary">{t('hero.headline2')}</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/80 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {t('hero.subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('hero.ctaSecondary')}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Shield className="w-5 h-5 text-secondary" />
                <span>{t('hero.trustBadge1')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock className="w-5 h-5 text-secondary" />
                <span>{t('hero.trustBadge2')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Star className="w-5 h-5 text-secondary" />
                <span>{t('hero.trustBadge3')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="relative hidden lg:block">
            {/* Main Hero Image */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-caregiver.jpg"
                  alt="Professional caregiver"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>

              {/* Floating App Mockup */}
              <div
                className="absolute -bottom-8 -left-8 w-48 animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-3 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/app-mockup.jpg"
                    alt="CareNet App"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-800">{t('hero.statValue')}</p>
                    <p className="text-sm text-dark-500">{t('hero.statLabel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
