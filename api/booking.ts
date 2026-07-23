import type { VercelRequest, VercelResponse } from '@vercel/node';

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  homeSize?: string | null;
  frequency: string;
  preferredDate?: string | null;
  address?: string | null;
  notes?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValid(body: any): body is BookingPayload {
  if (!body || typeof body !== 'object') return false;
  if (typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.trim().length > 120) return false;
  if (typeof body.email !== 'string' || !EMAIL_RE.test(body.email.trim())) return false;
  if (typeof body.phone !== 'string' || body.phone.replace(/\D/g, '').length < 7) return false;
  if (typeof body.serviceType !== 'string' || body.serviceType.trim().length === 0) return false;
  if (typeof body.frequency !== 'string' || body.frequency.trim().length === 0) return false;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body;

  if (!isValid(body)) {
    res.status(400).json({ error: 'Geçersiz veya eksik bilgi.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.BOOKING_TO_EMAIL;
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or BOOKING_TO_EMAIL env vars');
    res.status(500).json({ error: 'Sunucu yapılandırma hatası.' });
    return;
  }

  const reference = `BK-${Date.now().toString(36).toUpperCase()}`;

  const rows: [string, string | null | undefined][] = [
    ['Referans', reference],
    ['Ad Soyad', body.name],
    ['E-posta', body.email],
    ['Telefon', body.phone],
    ['Hizmet', body.serviceType],
    ['Ev büyüklüğü', body.homeSize],
    ['Sıklık', body.frequency],
    ['Tercih edilen tarih', body.preferredDate],
    ['Adres', body.address],
    ['Notlar', body.notes],
  ];

  const htmlRows = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px;font-weight:600;">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#0f172a;">Yeni randevu talebi</h2>
      <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Temizlik Sitesi <${fromEmail}>`,
        to: [toEmail],
        reply_to: body.email,
        subject: `Yeni randevu talebi — ${body.name} (${reference})`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', errText);
      res.status(502).json({ error: 'Mail gönderilemedi.' });
      return;
    }

    res.status(200).json({ reference });
  } catch (err) {
    console.error('Booking handler error:', err);
    res.status(500).json({ error: 'Beklenmeyen bir hata oluştu.' });
  }
}
