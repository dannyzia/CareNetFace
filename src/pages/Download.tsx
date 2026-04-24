import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Download as DownloadIcon } from 'lucide-react';

export default function Download() {
  const { t } = useTranslation('download');
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
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
                {t('hero.title', { app: 'CareNet' })}
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

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-2xl border border-dark-100 text-center">
              <DownloadIcon className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{t('platforms.windows.title')}</h2>
              <p className="mt-2 text-sm text-dark-500">{t('platforms.windows.description')}</p>
              <button disabled className="mt-4 px-5 py-2 rounded-lg bg-dark-100 text-dark-400 font-semibold">
                {t('platforms.comingSoon')}
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dark-100 text-center">
              <DownloadIcon className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{t('platforms.linuxDeb.title')}</h2>
              <p className="mt-2 text-sm text-dark-500">{t('platforms.linuxDeb.description')}</p>
              <button disabled className="mt-4 px-5 py-2 rounded-lg bg-dark-100 text-dark-400 font-semibold">
                {t('platforms.comingSoon')}
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dark-100 text-center">
              <DownloadIcon className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{t('platforms.linuxRpm.title')}</h2>
              <p className="mt-2 text-sm text-dark-500">{t('platforms.linuxRpm.description')}</p>
              <button disabled className="mt-4 px-5 py-2 rounded-lg bg-dark-100 text-dark-400 font-semibold">
                {t('platforms.comingSoon')}
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dark-100 text-center">
              <DownloadIcon className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{t('platforms.macos.title')}</h2>
              <p className="mt-2 text-sm text-dark-500">{t('platforms.macos.description')}</p>
              <button disabled className="mt-4 px-5 py-2 rounded-lg bg-dark-100 text-dark-400 font-semibold">
                {t('platforms.comingSoon')}
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dark-100 text-center md:col-span-2 lg:col-span-1">
              <DownloadIcon className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{t('platforms.android.title')}</h2>
              <p className="mt-2 text-sm text-dark-500">{t('platforms.android.description')}</p>
              <button disabled className="mt-4 px-5 py-2 rounded-lg bg-dark-100 text-dark-400 font-semibold">
                {t('platforms.comingSoon')}
              </button>
            </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-dark-500">
                {t('contact.text')} <a href="mailto:carenet@digital-papyrus.xyz" className="text-primary underline">{t('contact.email')}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
