import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterCTA from '@/sections/FooterCTA';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Video,
  Users,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const getContactInfo = (t: any) => [
  {
    icon: Mail,
    title: t('contactInfo.general.title'),
    details: [t('contactInfo.general.email')],
    responseTime: t('contactInfo.general.responseTime'),
    color: 'primary',
  },
  {
    icon: Phone,
    title: t('contactInfo.hotline.title'),
    details: [t('contactInfo.hotline.phone')],
    responseTime: t('contactInfo.hotline.responseTime'),
    color: 'secondary',
  },
  {
    icon: MessageCircle,
    title: t('contactInfo.whatsapp.title'),
    details: [t('contactInfo.whatsapp.phone')],
    responseTime: t('contactInfo.whatsapp.responseTime'),
    color: 'primary',
  },
  {
    icon: Mail,
    title: t('contactInfo.business.title'),
    details: [t('contactInfo.business.email')],
    responseTime: t('contactInfo.business.responseTime'),
    color: 'secondary',
  },
];

const getSupportChannels = (t: any) => [
  { icon: MessageCircle, title: t('supportChannels.liveChat.title'), desc: t('supportChannels.liveChat.desc'), color: 'primary' },
  { icon: HelpCircle, title: t('supportChannels.helpCenter.title'), desc: t('supportChannels.helpCenter.desc'), color: 'secondary' },
  { icon: Users, title: t('supportChannels.community.title'), desc: t('supportChannels.community.desc'), color: 'primary' },
  { icon: Video, title: t('supportChannels.video.title'), desc: t('supportChannels.video.desc'), color: 'secondary' },
];

const getSubjects = (t: any) => [
  t('subjects.general'),
  t('subjects.technical'),
  t('subjects.billing'),
  t('subjects.feedback'),
  t('subjects.reportIssue'),
  t('subjects.partnership'),
  t('subjects.other'),
];

export default function Contact() {
  const { t } = useTranslation('contact');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const contactInfo = getContactInfo(t);
  const supportChannels = getSupportChannels(t);
  const subjects = getSubjects(t);

  const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

  const submitEmail = async () => {
    if (!FORM_ENDPOINT) {
      throw new Error('Contact form endpoint is not configured. Set VITE_CONTACT_FORM_ENDPOINT in .env');
    }

    const formDataPayload = new FormData();
    formDataPayload.append('name', formData.name);
    formDataPayload.append('email', formData.email);
    formDataPayload.append('phone', formData.phone);
    formDataPayload.append('subject', formData.subject);
    formDataPayload.append('message', formData.message);
    formDataPayload.append('_replyto', formData.email);
    formDataPayload.append('_subject', `Contact form message from ${formData.name}`);

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formDataPayload,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Form submission failed with status ${response.status}`);
    }

    return response.json();
  };

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setStatusMessage(t('form.errors.required'));
      return;
    }

    setStatus('loading');
    setStatusMessage(t('form.sending'));

    try {
      await submitEmail();
      setStatus('success');
      setStatusMessage(t('form.success'));
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact message:', error);
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : t('form.error')
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                {t('hero.title', { action: 'Touch' })}
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

        {/* Contact Info Cards */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="bg-white rounded-2xl p-6 border border-dark-100 hover:border-primary hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      info.color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
                    }`}>
                      <Icon className={`w-7 h-7 ${info.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="font-bold text-dark-800 mb-2">{info.title}</h3>
                    {info.details.map((detail) => (
                      <p key={detail} className="text-dark-600 text-sm">{detail}</p>
                    ))}
                    <div className="mt-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-dark-400" />
                      <span className="text-xs text-dark-500">{info.responseTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Office */}
        <section className="py-24 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-card">
                <h2 className="text-2xl font-bold text-dark-800 mb-2">{t('form.title')}</h2>
                <p className="text-dark-500 mb-8">
                  {t('form.description')}
                </p>

                {status === 'success' ? (
                  <div className="bg-success/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-800 mb-2">{t('form.successTitle')}</h3>
                    <p className="text-dark-500">
                      {t('form.successMessage')}
                    </p>
                  </div>
                ) : (
                  <>
                    {status !== 'idle' && (
                      <div
                        className={`rounded-2xl p-3 mb-6 text-sm ${
                          status === 'error' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {statusMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('form.nameLabel')}
                          </label>
                          <Input
                            type="text"
                            placeholder={t('form.namePlaceholder')}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('form.emailLabel')}
                          </label>
                          <Input
                            type="email"
                            placeholder={t('form.emailPlaceholder')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('form.phoneLabel')}
                          </label>
                          <Input
                            type="tel"
                            placeholder={t('form.phonePlaceholder')}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">
                            {t('form.subjectLabel')}
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            required
                          >
                            <option value="">{t('form.subjectPlaceholder')}</option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                          {t('form.messageLabel')}
                        </label>
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-primary hover:bg-primary-600 disabled:opacity-50"
                        size="lg"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {status === 'loading' ? t('form.sending') : t('form.submit')}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              {/* Office Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-dark-800 mb-6">{t('office.title')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-800">{t('office.company')}</p>
                        <p className="text-dark-500 text-sm">{t('office.location')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-800">{t('office.hoursTitle')}</p>
                        <p className="text-dark-500 text-sm">{t('office.weekdays')}</p>
                        <p className="text-dark-500 text-sm">{t('office.weekend')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">{t('responseTimes.title')}</h3>
                  <div className="space-y-3">
                    {[
                      { label: t('responseTimes.general'), time: t('responseTimes.generalTime') },
                      { label: t('responseTimes.technical'), time: t('responseTimes.technicalTime') },
                      { label: t('responseTimes.urgent'), time: t('responseTimes.urgentTime') },
                      { label: t('responseTimes.billing'), time: t('responseTimes.billingTime') },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className="text-white/80">{item.label}</span>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
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
              {supportChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.title}
                    className="bg-white rounded-2xl p-6 border border-dark-100 hover:border-primary hover:shadow-card-hover transition-all duration-300 text-center hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      channel.color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
                    }`}>
                      <Icon className={`w-7 h-7 ${channel.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="font-bold text-dark-800 mb-1">{channel.title}</h3>
                    <p className="text-sm text-dark-500">{channel.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
