import { Link, useLocation } from 'react-router-dom';
import { Heart, Facebook, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const location = useLocation();
  const { t } = useTranslation('common');

  // Get current language prefix from URL
  const currentLang = location.pathname.split('/')[1] || 'bn';

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: `/${currentLang}` },
    { name: t('footer.quickLinks.features'), href: `/${currentLang}/features` },
    { name: t('footer.quickLinks.pricing'), href: `/${currentLang}/pricing` },
    { name: t('footer.quickLinks.howToUse'), href: `/${currentLang}/how-to-use` },
    { name: t('footer.quickLinks.contact'), href: `/${currentLang}/contact` },
  ];

  const legalLinks = [
    { name: t('footer.legal.terms'), href: `/${currentLang}/terms` },
    { name: t('footer.legal.privacy'), href: `/${currentLang}/privacy` },
    { name: t('footer.legal.cookies'), href: `/${currentLang}/cookies` },
  ];
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to={`/${currentLang}`} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold">{t('footer.brand.name')}</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              {t('footer.brand.description')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-dark-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-400 hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.legal.title')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-400 hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.newsletter.title')}</h3>
            <p className="text-dark-400 text-sm mb-4">
              {t('footer.newsletter.description')}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="bg-dark-800 border-dark-700 text-white placeholder:text-dark-500 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary-600 text-white px-4">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center gap-3 text-dark-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t('footer.contact.location')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            {t('footer.bottom.copyright')}
          </p>
          <p className="text-dark-500 text-sm">
            {t('footer.bottom.poweredBy')}{' '}
            <a href="#" className="text-primary hover:underline">
              Digital Papyrus
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
