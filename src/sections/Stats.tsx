import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Headphones, ThumbsUp, Heart, Building2 } from 'lucide-react';

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
  icon: React.ElementType;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (ease-out-expo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatCard({ stat, index, t }: { stat: StatItem; index: number; t: any }) {
  const count = useCountUp(stat.value, 2000, true);
  const Icon = stat.icon;

  return (
    <div
      className="relative group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 text-center card-3d">
        {/* Icon */}
        <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Value */}
        <div className="text-4xl lg:text-5xl font-extrabold text-dark-800 mb-2">
          {stat.value >= 1000 ? `${Math.floor(count / 1000)}K` : count}
          <span className="text-primary">{stat.suffix}</span>
        </div>

        {/* Label */}
        <p className="text-dark-500 font-medium">{t(stat.labelKey)}</p>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500" />
      </div>
    </div>
  );
}

export default function Stats() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const stats: StatItem[] = [
    { value: 10000, suffix: '+', labelKey: 'stats.label1', icon: Users },
    { value: 24, suffix: '/7', labelKey: 'stats.label2', icon: Headphones },
    { value: 98, suffix: '%', labelKey: 'stats.label3', icon: ThumbsUp },
    { value: 5000, suffix: '+', labelKey: 'stats.label4', icon: Heart },
    { value: 500, suffix: '+', labelKey: 'stats.label5', icon: Building2 },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-800 mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-lg text-dark-500 max-w-2xl mx-auto">
            {t('stats.description')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.labelKey}
              stat={stat}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
