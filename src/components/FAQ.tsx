import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';

export function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-5 sm:px-8 reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Bilmekte fayda var
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Sıkça sorulan sorular
          </h2>
        </div>

        <div className="mt-12 divide-y divide-slate-100 border-y border-slate-100">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-teal-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
