import {
  Home,
  Building2,
  Sparkles,
  Truck,
  Sofa,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  basePrice: string;
  icon: LucideIcon;
  image: string;
};

export const services: Service[] = [
  {
    id: 'residential',
    name: 'Ev Temizliği',
    tagline: 'Her seferinde pırıl pırıl bir ev',
    description:
      'Her odayı tavanından zeminine kadar kapsayan kapsamlı ev temizliği. Güvenilir uzmanlarımız mekanınıza özen ve saygıyla davranır.',
    features: [
      'Toz alma ve yüzey silme',
      'Mutfak ve banyo dezenfeksiyonu',
      'Zemin silme ve süpürme',
      'Çöp boşaltma',
    ],
    basePrice: '89₺\'dan başlayan',
    icon: Home,
    image:
      'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'commercial',
    name: 'Kurumsal Temizlik',
    tagline: 'Profesyonel mekanlar, kusursuz sonuçlar',
    description:
      'Ofisinizi veya mağazanızı iş saatleriniz etrafında esnek planlamayla tertemiz tutun.',
    features: [
      'Çalışma istasyonu dezenfeksiyonu',
      'Tuvalet derin temizliği',
      'Ortak alan bakımı',
      'Mesai sonrası esnek hizmet',
    ],
    basePrice: '149₺\'dan başlayan',
    icon: Building2,
    image:
      'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'deep',
    name: 'Derin Temizlik',
    tagline: 'Yeterli olmadığı durumlarda',
    description:
      'Düzenli temizliğin atladığı kir, birikinti ve zor ulaşılan bölgeleri hedef alan baştan sona kapsamlı bir derin temizlik.',
    features: [
      'Süpürgelik ve korniş temizliği',
      'Beyaz eşya içi temizlik',
      'Karo ve derz ovalama',
      'İç pencere temizliği',
    ],
    basePrice: '199₺\'dan başlayan',
    icon: Sparkles,
    image:
      'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'move',
    name: 'Taşınma Temizliği',
    tagline: 'Taze bir başlangıç, garantili temizlik',
    description:
      'Kapsamlı taşınma temizlik hizmetimizle büyük bir izlenim bırakın veya depozitonuzu geri alın.',
    features: [
      'Tüm iç mekan temizliği',
      'Dolap ve çekmece içi silme',
      'Beyaz eşya içi temizlik',
      'Halı süpürme ve zemin bakımı',
    ],
    basePrice: '179₺\'dan başlayan',
    icon: Truck,
    image:
      'https://images.pexels.com/photos/4246259/pexels-photo-4246259.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'office',
    name: 'Ofis Temizliği',
    tagline: 'Verimlilik temiz bir mekandan başlar',
    description:
      'Ekibinizin büyüklüğüne ve mekanınıza göre özelleştirilen, tekrarlayan ofis temizliği ile iş yeriniz her zaman en iyi görünümünde olur.',
    features: [
      'Masa ve ekipman dezenfeksiyonu',
      'Mutfak ve dinlenme alanı bakımı',
      'Cam ve bölme temizliği',
      'Planlı haftalık ziyaretler',
    ],
    basePrice: '129₺\'dan başlayan',
    icon: Sofa,
    image:
      'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'carpet',
    name: 'Halı ve Döşeme',
    tagline: 'Üzerinde yürüdüğünüzü ve oturduğunuzu yenileyin',
    description:
      'Halı, kilim ve döşemenizi canlandıran sıcak su ekstraksiyonu ve leke tedavisi.',
    features: [
      'Sıcak su ekstraksiyonu',
      'Leke ve koku tedavisi',
      'Döşeme şampuanlama',
      'Hızlı kuruma işlemi',
    ],
    basePrice: '99₺\'dan başlayan',
    icon: Wind,
    image:
      'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export const homeSizes = [
  { id: 'studio', label: 'Stüdyo', bedrooms: 0, bathrooms: 1 },
  { id: 'small', label: '1+1', bedrooms: 1, bathrooms: 1 },
  { id: 'medium', label: '2+1', bedrooms: 2, bathrooms: 1 },
  { id: 'standard', label: '3+1', bedrooms: 3, bathrooms: 2 },
  { id: 'large', label: '4+1', bathrooms: 3, bedrooms: 4 },
  { id: 'xl', label: '5+1 ve üzeri', bedrooms: 5, bathrooms: 3 },
];

export const frequencies = [
  { id: 'one-time', label: 'Tek seferlik', note: 'Tek bir derin temizlik' },
  { id: 'weekly', label: 'Haftalık', note: 'Yoğun evler için en uygun' },
  { id: 'biweekly', label: 'İki haftada bir', note: 'En popüler planımız' },
  { id: 'monthly', label: 'Aylık', note: 'Mevsimlik bakım' },
];
