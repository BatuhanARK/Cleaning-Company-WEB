# Temizlik Şirketi Sitesi

Vite + React + TypeScript + Tailwind ile yapılmış, bolt.new'den bağımsız hale getirilmiş statik site.
Randevu formu, Supabase yerine `/api/booking` adlı bir Vercel serverless function üzerinden
[Resend](https://resend.com) ile doğrudan şirket e-postasına mail atar. Hiçbir müşteri verisi
veritabanında tutulmaz.

## Yerel geliştirme

```bash
npm install
npm run dev
```

`api/booking.ts` yereldeki `vite dev` ile çalışmaz (Vercel function'dır). Formu uçtan uca test etmek
için `vercel dev` komutunu kullanabilirsin (aşağıda).

## Yayına alma (Vercel)

1. Bu klasörü bir GitHub reposuna push et.
2. [vercel.com](https://vercel.com) üzerinde ücretsiz hesap aç, "Add New Project" ile bu repoyu seç.
   Vercel, Vite projesini otomatik tanır; ekstra ayar gerekmez.
3. Deploy etmeden önce (veya sonra) **Project Settings > Environment Variables** kısmına şunları ekle:
   - `RESEND_API_KEY` — resend.com hesabından alınan API key
   - `BOOKING_TO_EMAIL` — randevu taleplerinin gideceği şirket e-postası
   - `BOOKING_FROM_EMAIL` — (opsiyonel) domain doğrulanana kadar `onboarding@resend.dev` bırakabilirsin
4. Deploy et. `https://proje-adi.vercel.app` gibi bir adres alırsın.
5. **Kendi domainini bağlama:** Project Settings > Domains kısmına Namecheap'ten aldığın domaini
   yazınca Vercel sana eklemen gereken DNS kayıtlarını (genelde bir A kaydı + CNAME) gösterir.
   Bu kayıtları Namecheap'in DNS panelinden ekleyip birkaç saat içinde domain aktif olur.
6. **(Önerilir) Resend'de kendi domainini doğrula:** Böylece mailler
   `randevu@seninsiten.com` gibi kendi domaininden gider, spam'e düşme ihtimali azalır.
   Resend panelinde domain ekleyip verilen DNS (TXT/CNAME) kayıtlarını Namecheap'e eklemen yeterli.
   Doğrulanana kadar `BOOKING_FROM_EMAIL=onboarding@resend.dev` ile de sorunsuz çalışır.

## Notlar

- `.env` dosyası artık kullanılmıyor / gerekmiyor; gizli anahtarlar sadece Vercel'in
  Environment Variables ekranında tutulur, koda veya repoya asla girmez.
- Randevu verisi hiçbir yerde saklanmaz; sadece e-posta olarak iletilir.
- Aylık 200 kullanıcı seviyesinde Vercel Hobby planı ve Resend ücretsiz planı (3000 mail/ay)
  fazlasıyla yeterlidir.
