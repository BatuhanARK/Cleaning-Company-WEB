import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/lib/services';
import { useReveal } from '@/hooks/useReveal';

type ServicesProps = {
  onBook: (serviceId?: string) => void;
};

export function Services({ onBook }: ServicesProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Ne yapıyoruz
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Her mekan için temizlik hizmetleri
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Haftalık bakımdan tek seferlik derin temizliğe kadar, eviniz veya
            işletmeniz için uygun bir planımız var — hepsi eğitimli, güvenilir
            uzmanlar tarafından sunulur.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-teal-600" strokeWidth={2.2} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      {service.name}
                    </h3>
                    <span className="text-sm font-semibold text-teal-600 whitespace-nowrap">
                      {service.basePrice}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-teal-600/80">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onBook(service.id)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group/btn"
                  >
                    Bu hizmeti rezerve et
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
