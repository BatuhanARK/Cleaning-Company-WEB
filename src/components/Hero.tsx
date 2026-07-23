import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { company, stats } from '@/lib/content';

type HeroProps = {
  onBook: () => void;
};

export function Hero({ onBook }: HeroProps) {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={company.heroImage}
          alt="Pırıl pırıl modern oturma odası"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/55 to-teal-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium animate-fade-up">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            2.300+ komşu tarafından 4.9 puan aldı
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] animate-fade-up delay-100">
            Temiz mekanlar.
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Aydınlık günlar.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl animate-fade-up delay-200">
            {company.name}, güvenilir yerel uzmanlarla titiz, çevre dostu
            temizlik sunar. İki dakikadan kısa sürede çevrimiçi randevu alın ve
            pırıl pırıl bir mekana geri dönün.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <button
              onClick={onBook}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold shadow-lg shadow-teal-900/30 transition-all hover:-translate-y-0.5"
            >
              Temizlik randevusu al
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold hover:bg-white/15 transition-all"
            >
              {company.phone}
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-white/70 text-sm animate-fade-up delay-400">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            Sabıka kontrolü yapılmış, sigortalı ve kefilli
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl animate-fade-up delay-400">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-white">{stat.value}</dt>
                <dd className="text-xs text-white/60 mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
