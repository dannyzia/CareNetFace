import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enCommon from '../locales/en/common.json';
import bnCommon from '../locales/bn/common.json';
import enHome from '../locales/en/home.json';
import bnHome from '../locales/bn/home.json';
import enFeatures from '../locales/en/features.json';
import bnFeatures from '../locales/bn/features.json';
import enPricing from '../locales/en/pricing.json';
import bnPricing from '../locales/bn/pricing.json';
import enHowToUse from '../locales/en/howToUse.json';
import bnHowToUse from '../locales/bn/howToUse.json';
import enDownload from '../locales/en/download.json';
import bnDownload from '../locales/bn/download.json';
import enContact from '../locales/en/contact.json';
import bnContact from '../locales/bn/contact.json';
import enPrivacy from '../locales/en/privacy.json';
import bnPrivacy from '../locales/bn/privacy.json';
import enTerms from '../locales/en/terms.json';
import bnTerms from '../locales/bn/terms.json';
import enCookies from '../locales/en/cookies.json';
import bnCookies from '../locales/bn/cookies.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    features: enFeatures,
    pricing: enPricing,
    howToUse: enHowToUse,
    download: enDownload,
    contact: enContact,
    privacy: enPrivacy,
    terms: enTerms,
    cookies: enCookies,
  },
  bn: {
    common: bnCommon,
    home: bnHome,
    features: bnFeatures,
    pricing: bnPricing,
    howToUse: bnHowToUse,
    download: bnDownload,
    contact: bnContact,
    privacy: bnPrivacy,
    terms: bnTerms,
    cookies: bnCookies,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'bn', // Default language is Bengali
    fallbackLng: 'bn',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
