import { Sparkles, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { company } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">{company.name}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              İstanbul genelinde evler ve işletmeler için profesyonel, çevre
              dostu temizlik. Her ziyarette memnuniyet garantisi.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Hizmetler
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Ev Temizliği</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Kurumsal Temizlik</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Derin Temizlik</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Taşınma Temizliği</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Halı ve Döşeme</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kurumsal
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#process" className="hover:text-teal-400 transition-colors">Nasıl çalışır</a></li>
              <li><a href="#testimonials" className="hover:text-teal-400 transition-colors">Yorumlar</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">S.S.S.</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              İletişim
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                <a href={company.phoneHref} className="hover:text-teal-400 transition-colors">{company.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                <a href={company.emailHref} className="hover:text-teal-400 transition-colors">{company.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.</p>
          <p>Sigortalı ve kefilli · Çevre dostu ürünler · %100 memnuniyet garantisi</p>
        </div>
      </div>
    </footer>
  );
}
