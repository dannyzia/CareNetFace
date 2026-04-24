import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import logoImage from '../../Logo/logo _only.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');

  // Get current language prefix from URL
  const currentLang = location.pathname.split('/')[1] || 'bn';

  const navLinks = [
    { name: t('nav.home'), href: `/${currentLang}` },
    { name: t('nav.features'), href: `/${currentLang}/features` },
    { name: t('nav.pricing'), href: `/${currentLang}/pricing` },
    { name: t('nav.howToUse'), href: `/${currentLang}/how-to-use` },
    { name: t('nav.download'), href: `/${currentLang}/download` },
    { name: t('nav.contact'), href: `/${currentLang}/contact` },
  ];

  const externalLinks = [
    { name: t('nav.privacy'), href: `/${currentLang}/privacy` },
    { name: t('nav.terms'), href: `/${currentLang}/terms` },
    { name: t('nav.cookies'), href: `/${currentLang}/cookies` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImage}
              alt="CareNet logo"
              className={`w-10 h-10 object-contain rounded-xl transition-all duration-300 ${
                isScrolled ? 'bg-white/20' : 'bg-white/10'
              }`}
            />
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-dark-800' : 'text-white'
              }`}
            >
              CareNet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? isActive(link.href)
                      ? 'text-primary'
                      : 'text-dark-600 hover:text-primary hover:bg-primary-50'
                    : isActive(link.href)
                    ? 'text-white bg-white/20'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                )}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-dark-600 hover:text-primary hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Selector & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className={`flex items-center gap-2 transition-all duration-300 ${
                isScrolled
                  ? 'text-dark-600 hover:bg-gray-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'bn' ? 'BN' : 'EN'}</span>
            </Button>
            <Button
              className={`font-semibold px-6 transition-all duration-300 ${
                isScrolled
                  ? 'bg-primary hover:bg-primary-600 text-white shadow-md hover:shadow-glow'
                  : 'bg-white text-primary hover:bg-white/90 shadow-lg'
              }`}
            >
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-dark-800 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div
            className={`rounded-2xl p-4 space-y-2 ${
              isScrolled ? 'bg-white shadow-xl' : 'bg-white/10 backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? isActive(link.href)
                      ? 'bg-primary-50 text-primary'
                      : 'text-dark-700 hover:bg-gray-50'
                    : isActive(link.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-dark-700 hover:bg-gray-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <Button
                variant="outline"
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="w-full flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'bn' ? 'BN' : 'EN'}</span>
              </Button>
              <Button className="w-full bg-primary hover:bg-primary-600 text-white font-semibold">
                {t('nav.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
