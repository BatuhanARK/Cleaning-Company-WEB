import { ArrowRight, Phone } from 'lucide-react';
import { company } from '@/lib/content';

type CTAProps = {
  onBook: () => void;
};

export function CTA({ onBook }: CTAProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-600 to-cyan-700 px-8 py-14 sm:px-16 sm:py-16">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Pırıl pırıl bir mekan için hazır mısınız?
              </h2>
              <p className="mt-3 text-teal-50 text-lg max-w-md">
                İki dakikadan kısa sürede çevrimiçi randevu alın. Depozito yok,
                yükümlülük yok — sadece kendi programınıza göre temiz bir ev.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={onBook}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-teal-700 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Temizlik randevusu al
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-teal-700/40 backdrop-blur border border-white/20 text-white font-semibold hover:bg-teal-700/60 transition-all"
              >
                <Phone className="w-5 h-5" />
                Bizi arayın
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
