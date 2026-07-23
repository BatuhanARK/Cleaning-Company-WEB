import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, Phone } from 'lucide-react';
import { company } from '@/lib/content';

type HeaderProps = {
  onBook: () => void;
};

const navLinks = [
  { label: 'Hizmetler', href: '#services' },
  { label: 'Nasıl çalışır', href: '#process' },
  { label: 'Yorumlar', href: '#testimonials' },
  { label: 'S.S.S.', href: '#faq' },
];

export function Header({ onBook }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-sm shadow-teal-200/60 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {company.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                  scrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={company.phoneHref}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-teal-500 ${
                scrolled ? 'text-slate-700' : 'text-white/90'
              }`}
            >
              <Phone className="w-4 h-4" />
              {company.phone}
            </a>
            <button
              onClick={onBook}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold shadow-sm shadow-teal-200/60 hover:shadow-md hover:shadow-teal-200/80 transition-all hover:-translate-y-0.5"
            >
              Teklif al
            </button>
          </div>

          <button
            className={`md:hidden p-2 -mr-2 ${scrolled ? 'text-slate-800' : 'text-white'}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-slide-down">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left py-3 px-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 py-3 px-2 text-slate-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              {company.phone}
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="block w-full mt-2 py-3 rounded-full bg-teal-500 text-white font-semibold"
            >
              Teklif al
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
