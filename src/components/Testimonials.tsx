import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Yerel halkın favorisi
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Bize sadece sözümüze güvenmeyin
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-600 font-medium">4.9 ortalama · 2.300+ yorum</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-teal-100" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-700 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
