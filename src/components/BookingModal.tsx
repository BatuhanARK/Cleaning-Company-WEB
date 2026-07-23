import { useEffect, useState } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Home as HomeIcon,
  Repeat,
  User,
  Sparkles,
  Loader2,
  PartyPopper,
} from 'lucide-react';
import { services, homeSizes, frequencies } from '@/lib/services';

type BookingInsert = {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  home_size?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  frequency: string;
  preferred_date?: string | null;
  address?: string | null;
  notes?: string | null;
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  preselectService?: string | null;
};

type FormState = {
  serviceType: string;
  homeSize: string;
  frequency: string;
  preferredDate: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

const initialForm: FormState = {
  serviceType: '',
  homeSize: '',
  frequency: 'one-time',
  preferredDate: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
};

const steps = ['Hizmet', 'Detaylar', 'Tarih', 'İletişim'] as const;
const stepIcons = [Sparkles, HomeIcon, Calendar, User];

export function BookingModal({ open, onClose, preselectService }: BookingModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ reference: string } | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setError(null);
      setSuccess(null);
      setForm((f) => ({
        ...initialForm,
        serviceType: preselectService ?? f.serviceType,
      }));
    }
  }, [open, preselectService]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, submitting]);

  if (!open) return null;

  const selectedService = services.find((s) => s.id === form.serviceType);
  const isResidential = form.serviceType === 'residential' || form.serviceType === 'deep' || form.serviceType === 'move';

  const update = (patch: Partial<FormState>) =>
    setForm((f) => ({ ...f, ...patch }));

  const validateStep = (s: number): string | null => {
    if (s === 0 && !form.serviceType) return 'Devam etmek için bir hizmet seçin.';
    if (s === 1) {
      if (isResidential && !form.homeSize) return 'Devam etmek için ev büyüklüğünüzü seçin.';
    }
    if (s === 2 && !form.preferredDate) return 'Devam etmek için bir tarih seçin.';
    if (s === 3) {
      if (!form.name.trim()) return 'Lütfen adınızı girin.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Lütfen geçerli bir e-posta girin.';
      if (form.phone.replace(/\D/g, '').length < 7) return 'Lütfen geçerli bir telefon numarası girin.';
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    const err = validateStep(3);
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    setError(null);

    const homeSize = homeSizes.find((h) => h.id === form.homeSize);
    const payload: BookingInsert = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service_type: form.serviceType,
      home_size: isResidential ? form.homeSize || null : null,
      bedrooms: homeSize?.bedrooms ?? null,
      bathrooms: homeSize?.bathrooms ?? null,
      frequency: form.frequency,
      preferred_date: form.preferredDate || null,
      address: form.address.trim() || null,
      notes: form.notes.trim() || null,
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          serviceType: payload.service_type,
          homeSize: payload.home_size,
          frequency: payload.frequency,
          preferredDate: payload.preferred_date,
          address: payload.address,
          notes: payload.notes,
        }),
      });

      const data = await response.json();
      setSubmitting(false);

      if (!response.ok) {
        setError(data?.error || 'Talebiniz gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.');
        return;
      }
      setSuccess({ reference: data.reference });
    } catch {
      setSubmitting(false);
      setError('Talebiniz gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => !submitting && onClose()}
      />

      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {success ? 'Randevu onaylandı' : 'Temizlik randevusu alın'}
            </h2>
            {!success && (
              <p className="text-sm text-slate-500">
                Adım {step + 1} / {steps.length} · {steps[step]}
              </p>
            )}
          </div>
          <button
            onClick={() => !submitting && onClose()}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!success && (
          <div className="px-6 pt-4 flex-shrink-0">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? 'bg-teal-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700 animate-slide-down">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-6 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto">
                <PartyPopper className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Hazırsınız, {form.name.split(' ')[0]}!
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  {selectedService?.name ?? 'temizlik'}
                </span>{' '}
                talebiniz alındı. Ekibimiz birkaç saat içinde e-posta yoluyla
                randevunuzu onaylayacak.
              </p>
              <div className="mt-5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Randevu referansı</p>
                <p className="mt-1 font-mono text-sm text-slate-900 break-all">
                  {success.reference}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Step 0 — Service */}
              {step === 0 && (
                <div className="space-y-3 animate-fade-in">
                  {services.map((s) => {
                    const Icon = s.icon;
                    const active = form.serviceType === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => update({ serviceType: s.id })}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          active
                            ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            active ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900">{s.name}</p>
                          <p className="text-sm text-slate-500 truncate">{s.tagline}</p>
                        </div>
                        <span className="text-sm font-semibold text-teal-600 flex-shrink-0">
                          {s.basePrice}
                        </span>
                        {active && (
                          <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 1 — Details */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  {isResidential ? (
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        Evinizin büyüklüğü nedir?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {homeSizes.map((h) => {
                          const active = form.homeSize === h.id;
                          return (
                            <button
                              key={h.id}
                              onClick={() => update({ homeSize: h.id })}
                              className={`p-3 rounded-xl border-2 text-center transition-all ${
                                active
                                  ? 'border-teal-500 bg-teal-50/50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <p className="font-semibold text-slate-900 text-sm">{h.label}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-6 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <HomeIcon className="w-8 h-8 text-teal-500 mx-auto" />
                      <p className="mt-3 text-sm text-slate-600">
                        {selectedService?.name} için mekanınızı değerlendirip
                        talebiniz alındıktan sonra size özel fiyat teklifi sunuyoruz.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Ne sıklıkta temizliğe ihtiyacınız var?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {frequencies.map((f) => {
                        const active = form.frequency === f.id;
                        return (
                          <button
                            key={f.id}
                            onClick={() => update({ frequency: f.id })}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              active
                                ? 'border-teal-500 bg-teal-50/50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <p className="font-semibold text-slate-900 text-sm">{f.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{f.note}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Schedule */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Tercih ettiğiniz tarih
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        min={today}
                        value={form.preferredDate}
                        onChange={(e) => update({ preferredDate: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Tercih ettiğiniz tarihe uyum sağlamak için elimizden geleni
                      yapacağız ve e-posta ile onaylayacağız.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Hizmet adresi <span className="text-slate-400 font-normal">(isteğe bağlı)</span>
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update({ address: e.target.value })}
                      placeholder="Bağdat Cad. No: 123, Kadıköy, İstanbul"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Bilmemiz gereken bir şey var mı? <span className="text-slate-400 font-normal">(isteğe bağlı)</span>
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      rows={3}
                      placeholder="Evcil hayvanlar, erişim talimatları, odaklanılacak alanlar…"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 — Contact */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update({ name: e.target.value })}
                      placeholder="Ayşe Yılmaz"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                      placeholder="ayse@ornek.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      placeholder="(0212) 555 0 192"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-sm">
                    <p className="font-semibold text-slate-900">Randevu özeti</p>
                    <div className="flex justify-between"><span className="text-slate-500">Hizmet</span><span className="text-slate-900 font-medium">{selectedService?.name}</span></div>
                    {form.homeSize && <div className="flex justify-between"><span className="text-slate-500">Ev büyüklüğü</span><span className="text-slate-900 font-medium">{homeSizes.find(h => h.id === form.homeSize)?.label}</span></div>}
                    <div className="flex justify-between"><span className="text-slate-500">Sıklık</span><span className="text-slate-900 font-medium">{frequencies.find(f => f.id === form.frequency)?.label}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Tarih</span><span className="text-slate-900 font-medium">{form.preferredDate}</span></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / actions */}
        {!success && (
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
            <button
              onClick={back}
              disabled={step === 0 || submitting}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full text-slate-600 font-semibold disabled:opacity-0 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-sm transition-all hover:-translate-y-0.5"
              >
                İleri
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gönderiliyor…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Randevuyu onayla
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {success && (
          <div className="px-6 py-4 border-t border-slate-100 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
            >
              Tamam
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
