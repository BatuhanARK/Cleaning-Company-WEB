import { CalendarCheck, UserCheck, Sparkles } from 'lucide-react';
import { steps, company } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';

const icons = [CalendarCheck, UserCheck, Sparkles];

type ProcessProps = {
  onBook: () => void;
};

export function Process({ onBook }: ProcessProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="py-24 bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Nasıl çalışır
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Pırıl pırıl bir mekana üç basit adım
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Profesyonel temizliği zahmetsiz hale getirdik. Telefon kovalamaca
              yok, depozito yok, sürpriz yok — sadece kendi programınıza göre
              temiz bir ev.
            </p>

            <div className="mt-10 space-y-8">
              {steps.map((step, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={step.title}
                    className="flex gap-5 reveal"
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}),
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-sm shadow-teal-200">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-teal-600 text-xs font-bold flex items-center justify-center shadow-sm border border-slate-100">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onBook}
              className="mt-10 inline-flex items-center px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all hover:-translate-y-0.5"
            >
              Hemen başla
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60">
              <img
                src={company.aboutImage}
                alt="Çalışan temizlik uzmanı"
                className="w-full h-[460px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 border border-slate-100 max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">2 dk</p>
                  <p className="text-xs text-slate-500">ortalama randevu süresi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
