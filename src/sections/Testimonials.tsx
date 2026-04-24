import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  nameKey: string;
  locationKey: string;
  roleKey: string;
  quoteKey: string;
  avatar: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-dark-300'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isVisible,
  t,
}: {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
  t: any;
}) {
  return (
    <div
      className={`relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
        isVisible
          ? 'animate-slide-up opacity-100'
          : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <p className="text-dark-600 mb-6 leading-relaxed italic">
        "{t(testimonial.quoteKey)}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={t(testimonial.nameKey)}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>
          <p className="font-bold text-dark-800">{t(testimonial.nameKey)}</p>
          <p className="text-sm text-dark-500">
            {t(testimonial.roleKey)} • {t(testimonial.locationKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation('home');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      nameKey: 'testimonials.t1.name',
      locationKey: 'testimonials.t1.location',
      roleKey: 'testimonials.t1.role',
      quoteKey: 'testimonials.t1.quote',
      avatar: '/avatar-fatima.jpg',
      rating: 5,
    },
    {
      nameKey: 'testimonials.t2.name',
      locationKey: 'testimonials.t2.location',
      roleKey: 'testimonials.t2.role',
      quoteKey: 'testimonials.t2.quote',
      avatar: '/avatar-mohammad.jpg',
      rating: 5,
    },
    {
      nameKey: 'testimonials.t3.name',
      locationKey: 'testimonials.t3.location',
      roleKey: 'testimonials.t3.role',
      quoteKey: 'testimonials.t3.quote',
      avatar: '/avatar-rahman.jpg',
      rating: 5,
    },
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 gradient-dark relative overflow-hidden"
    >
      {/* Background Quote Marks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Quote className="absolute top-20 left-10 w-64 h-64 text-white/5 rotate-180" />
        <Quote className="absolute bottom-20 right-10 w-64 h-64 text-white/5" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.nameKey}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
              t={t}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-16 flex flex-wrap justify-center items-center gap-8 transition-all duration-700 delay-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{t('testimonials.stats.rating')}</p>
            <p className="text-white/60 text-sm">{t('testimonials.stats.ratingLabel')}</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{t('testimonials.stats.users')}</p>
            <p className="text-white/60 text-sm">{t('testimonials.stats.usersLabel')}</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{t('testimonials.stats.recommend')}</p>
            <p className="text-white/60 text-sm">{t('testimonials.stats.recommendLabel')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
