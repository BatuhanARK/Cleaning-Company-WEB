import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectService, setPreselectService] = useState<string | null>(null);

  const openBooking = (serviceId?: string) => {
    setPreselectService(serviceId ?? null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <Services onBook={(id) => openBooking(id)} />
        <Process onBook={() => openBooking()} />
        <Testimonials />
        <FAQ />
        <CTA onBook={() => openBooking()} />
      </main>
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectService={preselectService}
      />
    </div>
  );
}

export default App;
