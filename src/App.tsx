import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  Volume2, 
  SlidersHorizontal, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Check, 
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Equipment item structure
interface EquipmentItem {
  id: string;
  name: string;
  category: 'sets' | 'speakers' | 'mics' | 'light';
  description: string;
  approxPrice: string;
  numericPriceMin: number;
  specs: string[];
  power?: string;
  brand: string;
}

// Compact and realistic Sound & Light Equipment Catalog
const CATALOG: EquipmentItem[] = [
  {
    id: 'set-picnic',
    name: 'Комплект «Пикник» (1 кВт)',
    category: 'sets',
    description: 'Компактная акустика для небольших презентаций, загородных коттеджей, дней рождения и семейных событий до 30 человек.',
    approxPrice: 'от 5 000 ₽ / сутки',
    numericPriceMin: 5000,
    specs: ['2 × Активные акустические системы RCF', 'Компактный пульт с Bluetooth / AUX', 'Профессиональный радиомикрофон', 'Стойки и комплект коммутации'],
    power: '1000 Вт',
    brand: 'RCF'
  },
  {
    id: 'set-banket',
    name: 'Комплект «Банкет» (3 кВт)',
    category: 'sets',
    description: 'Сбалансированная звуковая система с глубоким басом для свадеб, банкетов и праздничных корпоративов до 100 человек.',
    approxPrice: 'от 12 000 ₽ / сутки',
    numericPriceMin: 12000,
    specs: ['2 × Сателлита Electro-Voice', '2 × Активных мощных сабвуфера 18"', 'Цифровой микшерный пульт', '2 × Радиосистемы вокальные Shure'],
    power: '3000 Вт',
    brand: 'Electro-Voice'
  },
  {
    id: 'set-concert',
    name: 'Комплект «Байкал Фест» (12 кВт)',
    category: 'sets',
    description: 'Профессиональный линейный массив для масштабных опен-эйров на побережье Байкала, городских праздников и живых концертов.',
    approxPrice: 'от 45 000 ₽ / сутки',
    numericPriceMin: 45000,
    specs: ['Линейный массив dBTechnologies', 'Сабвуферы повышенного давления 2х18"', 'Сценический мониторинг артистов', 'Цифровая консоль Behringer X32'],
    power: '12 000 Вт',
    brand: 'dBTechnologies'
  },
  {
    id: 'sub-ev',
    name: 'Активный сабвуфер 18"',
    category: 'speakers',
    description: 'Дополнительный сабвуфер для плотного и бархатного баса на танцевальной площадке.',
    approxPrice: 'от 3 500 ₽ / сутки',
    numericPriceMin: 3500,
    specs: ['Динамик 18 дюймов', 'Встроенный DSP-процессор обработки', 'Идеален в паре со стойкой под топ'],
    brand: 'Electro-Voice'
  },
  {
    id: 'top-rcf',
    name: 'Акустическая колонка RCF Art',
    category: 'speakers',
    description: 'Итальянская акустическая система премиум-класса для детального воспроизведения вокала и музыки.',
    approxPrice: 'от 2 500 ₽ / сутки',
    numericPriceMin: 2500,
    specs: ['Динамик 15 дюймов', 'Высокое звуковое давление без искажений', 'Надежный эргономичный корпус'],
    brand: 'RCF'
  },
  {
    id: 'mic-shure',
    name: 'Радиосистема Shure SM58',
    category: 'mics',
    description: 'Легендарный вокальный микрофон, зарекомендовавший себя на сценах по всему миру. Кристальная передача голоса.',
    approxPrice: 'от 1 500 ₽ / сутки',
    numericPriceMin: 1500,
    specs: ['Легендарный капсюль SM58', 'Стабильная радиопередача до 100м', 'Высокая защита от посторонних шумов'],
    brand: 'Shure'
  },
  {
    id: 'dj-pioneer',
    name: 'DJ-комплект Pioneer CDJ/DJM',
    category: 'mics',
    description: 'Стандартный райдерный комплект профессиональных медиаплееров и микшера для диджеев.',
    approxPrice: 'от 10 000 ₽ / сутки',
    numericPriceMin: 10000,
    specs: ['2 × Профессиональных плеера CDJ-2000NXS2', 'Клубный микшер DJM-900NXS2', 'Все необходимые линки и питание'],
    brand: 'Pioneer DJ'
  },
  {
    id: 'effect-smoke',
    name: 'Генератор тяжелого дыма CO2',
    category: 'light',
    description: 'Густой стелющийся белый дым, создающий невероятный эффект парения в облаках. Идеально для первого свадебного танца.',
    approxPrice: 'от 7 000 ₽ / услуга',
    numericPriceMin: 7000,
    specs: ['Безопасен для здоровья и одежды', 'Не оставляет следов и запахов', 'В стоимость включен запуск специалистом'],
    brand: 'Chauvet'
  },
  {
    id: 'light-tbar',
    name: 'Комплект светодиодной заливки',
    category: 'light',
    description: 'Световая Т-образная стойка для динамической цветной заливки сцены, фотозоны или танцевального зала.',
    approxPrice: 'от 3 000 ₽ / сутки',
    numericPriceMin: 3000,
    specs: ['4 мощных прожектора RGBW', 'Стойка-тренога до 3 метров', 'Автоматические и звуковые режимы работы'],
    brand: 'Involight'
  }
];

// Delivery options
const DELIVERY_ZONES = [
  { id: 'city', name: 'Улан-Удэ (в черте города)', approxPrice: 'от 2 000 ₽', baseCost: 2000 },
  { id: 'other', name: 'Другие населенные пункты (Байкал, Аршан и др.)', approxPrice: 'Обсуждается индивидуально', baseCost: 0 }
];

// Inline SVG Wave Logo that replicates the user's shirt photo design with 4 parallel lines that converge at the ends
function LogoWave({ className = "w-32 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeLinecap="round">
        {/* Layer 1 - Lowest opacity, thinnest */}
        <path d="M 60,64 C 110,95 130,170 180,170 C 230,170 250,55 300,55 C 340,55 358,112 378,110" strokeWidth="4.5" opacity="0.3" />
        {/* Layer 2 */}
        <path d="M 60,64 C 110,87 130,158 180,158 C 230,158 250,65 300,65 C 340,65 358,105 378,110" strokeWidth="5" opacity="0.55" />
        {/* Layer 3 */}
        <path d="M 60,64 C 110,79 130,146 180,146 C 230,146 250,75 300,75 C 340,75 358,98 378,110" strokeWidth="5.5" opacity="0.8" />
        {/* Layer 4 - Fully white / thickest */}
        <path d="M 60,64 C 110,71 130,134 180,134 C 230,134 250,85 300,85 C 340,85 358,91 378,110" strokeWidth="6.5" />
      </g>
    </svg>
  );
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const WEEKDAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function App() {
  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ item: EquipmentItem; quantity: number }[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(getToday());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventLocation, setEventLocation] = useState<string>('');
  const [currentViewDate, setCurrentViewDate] = useState<Date>(getToday());
  const [deliveryZone, setDeliveryZone] = useState<string>('city');
  const [needSoundEngineer, setNeedSoundEngineer] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const rentalDays = (() => {
    if (!startDate) return 1;
    if (!endDate) return 1;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  })();

  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    if (startDate && date.getTime() === startDate.getTime()) return true;
    if (endDate && date.getTime() === endDate.getTime()) return true;
    return false;
  };

  const isInRange = (date: Date | null) => {
    if (!date || !startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isPast = (date: Date | null) => {
    if (!date) return true;
    const today = getToday();
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    const today = getToday();
    if (date < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray: (Date | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(currentYear, currentMonth, d));
  }

  // Filtered Equipment List
  const filteredCatalog = activeCategory === 'all' 
    ? CATALOG 
    : CATALOG.filter(item => item.category === activeCategory);

  // Cart operations
  const addToCart = (item: EquipmentItem) => {
    const existing = cart.find(ci => ci.item.id === item.id);
    if (existing) {
      setCart(cart.map(ci => ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
    // Auto-scroll to calculator section so user sees the update
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(ci => ci.item.id !== itemId));
  };

  const updateQty = (itemId: string, delta: number) => {
    setCart(cart.map(ci => {
      if (ci.item.id === itemId) {
        const newQty = ci.quantity + delta;
        return { ...ci, quantity: newQty > 0 ? newQty : 1 };
      }
      return ci;
    }));
  };

  // Ballpark calculation
  const gearSubtotal = cart.reduce((sum, ci) => sum + (ci.item.numericPriceMin * ci.quantity), 0) * rentalDays;
  const deliverySubtotal = DELIVERY_ZONES.find(z => z.id === deliveryZone)?.baseCost || 0;
  const engineerSubtotal = needSoundEngineer ? (6000 * rentalDays) : 0;
  const estimatedTotal = gearSubtotal + deliverySubtotal + engineerSubtotal;

  // Preset loaders
  const applyQuickPreset = (type: 'party' | 'wedding' | 'concert') => {
    if (type === 'party') {
      const item = CATALOG.find(i => i.id === 'set-picnic');
      if (item) setCart([{ item, quantity: 1 }]);
      setNeedSoundEngineer(false);
      setDeliveryZone('city');
    } else if (type === 'wedding') {
      const gear = CATALOG.filter(i => i.id === 'set-banket' || i.id === 'effect-smoke');
      setCart(gear.map(i => ({ item: i, quantity: 1 })));
      setNeedSoundEngineer(true);
      setDeliveryZone('city');
    } else if (type === 'concert') {
      const item = CATALOG.find(i => i.id === 'set-concert');
      if (item) setCart([{ item, quantity: 1 }]);
      setNeedSoundEngineer(true);
      setDeliveryZone('other');
    }
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Contact links
  const contactLinks = {
    tg: 'https://t.me/Al_Satoshi',
    vk: 'https://vk.com/baikalsound_uu',
    phone: 'tel:+79999999999',
    phoneDisplay: '+7 (999) 999-99-99'
  };

  const formatDateRussian = (d: Date | null) => {
    if (!d) return '';
    const day = d.getDate();
    const month = d.toLocaleDateString('ru-RU', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getDatesDisplay = () => {
    if (!startDate) return 'Не выбрано';
    if (!endDate) return `${formatDateRussian(startDate)} (1 сутки)`;
    return `с ${formatDateRussian(startDate)} по ${formatDateRussian(endDate)} (${rentalDays} суток)`;
  };

  // Text compiler to share directly in messengers
  const getCompiledOrderText = () => {
    const list = cart.map(ci => `• ${ci.item.name} (${ci.quantity} шт.)`).join('\n');
    const deliveryName = DELIVERY_ZONES.find(z => z.id === deliveryZone)?.name || '';
    const deliveryNote = deliveryZone === 'other' ? ' (доставка обсуждается отдельно)' : '';
    const venueText = eventLocation.trim() ? eventLocation.trim() : 'Не указано';
    return `Привет! Хочу арендовать звуковое оборудование у Baikal Sound.
    
Выбранные позиции:
${list || 'Индивидуальный подбор'}

Детали:
- Место проведения: ${venueText} (${deliveryName}${deliveryNote})
- Даты мероприятия: ${getDatesDisplay()}
- Звукорежиссер: ${needSoundEngineer ? 'Да' : 'Нет'}
- Предварительный расчет: ~ ${estimatedTotal.toLocaleString('ru-RU')} ₽ (без учета загородной доставки)

Пожалуйста, свяжитесь со мной для подтверждения доступности дат и точного расчета!`;
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(getCompiledOrderText());
    window.open(`https://t.me/share/url?url=${text}`, '_blank');
  };

  const shareToVk = () => {
    const text = encodeURIComponent(getCompiledOrderText());
    window.open(`https://vk.com/share.php?url=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white antialiased relative overflow-x-hidden">
      
      {/* ATMOSPHERIC BACKGROUND RADIAL GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-800/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] left-1/4 w-[500px] h-[500px] bg-zinc-900/5 rounded-full blur-[140px] pointer-events-none" />

      {/* STICKY HEADER WITH LOGO WAVE & NEW FONT */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Wide Typography */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Elegant SVG Wave Logo based on user's shirt design */}
            <div className="text-white hover:text-zinc-300 transition-colors">
              <LogoWave className="w-16 h-8 md:w-20 md:h-10 text-white" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-brand font-black text-xs md:text-sm tracking-[0.2em] leading-none text-white whitespace-nowrap">
                BAIKAL SOUND SYSTEM
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-zinc-500 font-brand font-bold mt-1 uppercase">
                PROFESSIONAL AUDIO & LIGHT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">О сервисе</a>
            <a href="#catalog" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Оборудование</a>
            <a href="#calculator" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Расчет сметы</a>
            <a href="#contacts" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Контакты</a>
          </nav>

          {/* Contact action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={contactLinks.phone}
              className="px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              id="phone-header-btn"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-zinc-200">{contactLinks.phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-800 bg-[#0c0c0e] px-4 py-6 space-y-4"
            >
              <nav className="flex flex-col gap-4">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  О сервисе
                </a>
                <a 
                  href="#catalog" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Оборудование
                </a>
                <a 
                  href="#calculator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Расчет сметы
                </a>
                <a 
                  href="#contacts" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Контакты
                </a>
              </nav>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <a 
                  href={contactLinks.phone}
                  className="w-full py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-zinc-300" />
                  <span className="text-zinc-200">{contactLinks.phoneDisplay}</span>
                </a>
                <a 
                  href={contactLinks.tg}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-zinc-800/50 border border-zinc-700/50 text-zinc-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Написать в Telegram</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>



      {/* HERO HERO SECTION WITH STUNNING CENTRAL BRAND IMAGE */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-zinc-950">
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xl">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300 tracking-wide">Улан-Удэ</span>
          </div>

          {/* Large brand wave & title */}
          <div className="mb-6 flex justify-center">
            <LogoWave className="w-48 h-24 md:w-64 md:h-32 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-brand tracking-[0.08em] text-white leading-tight uppercase mb-4">
            BAIKAL SOUND SYSTEM
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans mb-8">
            Профессиональный прокат высококлассного звукового и светового оборудования. Качественное озвучивание любых площадок, надежный райдерный бренд и опытные инженеры для идеального звука.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#catalog"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-black tracking-wider rounded-xl text-xs uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              id="cta-catalog-btn"
            >
              <span>Посмотреть каталог</span>
            </a>
            <a 
              href="#calculator"
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              id="cta-calc-btn"
            >
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <span>Расчет сметы онлайн</span>
            </a>
          </div>

        </div>
      </section>

      {/* CORE INFO & HIGHLIGHTS */}
      <section id="about" className="py-16 bg-[#09090b] border-b border-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-[16px] xs:text-lg sm:text-xl md:text-3xl font-black tracking-wide text-white mb-2 leading-tight">Почему выбирают Baikal Sound System</h2>
            <p className="text-xs md:text-sm text-zinc-400">Мы гарантируем стабильную работу оборудования в любых условиях и превосходный звук на каждой площадке.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-[#121215] border border-zinc-800/80 rounded-2xl flex flex-col justify-between" id="benefit-turnkey">
              <div>
                <div className="w-10 h-10 bg-zinc-800/40 border border-zinc-700/30 rounded-xl flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Комплексная работа под ключ</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Берем на себя всю логистику, монтаж, инсталляцию и демонтаж. Дополнительно предоставляем услуги профессионального звукорежиссера для настройки вокала и ведения программы.
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono mt-4 font-semibold uppercase tracking-wider">СЕРВИС ПОД КЛЮЧ</span>
            </div>

            <div className="p-6 bg-[#121215] border border-zinc-800/80 rounded-2xl flex flex-col justify-between" id="benefit-quality">
              <div>
                <div className="w-10 h-10 bg-zinc-800/40 border border-zinc-700/30 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Исключительно райдерные бренды</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Никаких компромиссов в качестве. В нашем арсенале проверенные временем бренды RCF, Electro-Voice, Shure, dBTechnologies и Pioneer DJ, которые отвечают самым строгим требованиям артистов.
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono mt-4 font-semibold uppercase tracking-wider">100% РАЙДЕРНОСТЬ</span>
            </div>

            <div className="p-6 bg-[#121215] border border-zinc-800/80 rounded-2xl flex flex-col justify-between" id="benefit-weather">
              <div>
                <div className="w-10 h-10 bg-zinc-800/40 border border-zinc-700/30 rounded-xl flex items-center justify-center mb-4">
                  <Waves className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Защита от погодных условий</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Мы учитываем особенности загородных площадок, ветров и перепадов температур. Используем уличные влагозащитные кейсы, надежные стабилизаторы сети и дублируем сигнальные линии.
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono mt-4 font-semibold uppercase tracking-wider">НАДЁЖНОСТЬ</span>
            </div>

          </div>

          {/* Quick presets for event formats */}
          <div className="mt-12 p-6 bg-gradient-to-br from-[#121215] to-[#09090b] border border-zinc-800 rounded-2xl">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">БЫСТРЫЙ ЗАПУСК</span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-2">Готовые комплекты под формат вашего события</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Мы подобрали оптимальные варианты для самых популярных видов праздников. Нажмите на нужный формат, чтобы мгновенно сгенерировать примерный состав сметы.
                </p>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-3 gap-3">
                <button 
                  onClick={() => applyQuickPreset('party')}
                  className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 rounded-xl text-left transition-all group"
                >
                  <span className="block text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">Пикник / День Рождения</span>
                  <span className="block text-[10px] text-zinc-400 mt-1">До 30 гостей</span>
                  <span className="inline-block text-[10px] bg-zinc-800/50 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-700/30 mt-3">от 5 000 ₽</span>
                </button>

                <button 
                  onClick={() => applyQuickPreset('wedding')}
                  className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 rounded-xl text-left transition-all group"
                >
                  <span className="block text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">Свадьба / Юбилей</span>
                  <span className="block text-[10px] text-zinc-400 mt-1">До 100 гостей</span>
                  <span className="inline-block text-[10px] bg-zinc-800/50 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-700/30 mt-3">от 12 000 ₽</span>
                </button>

                <button 
                  onClick={() => applyQuickPreset('concert')}
                  className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 rounded-xl text-left transition-all group"
                >
                  <span className="block text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">Концерт / Мероприятие</span>
                  <span className="block text-[10px] text-zinc-400 mt-1">Масштабное событие</span>
                  <span className="inline-block text-[10px] bg-zinc-800/50 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-700/30 mt-3">от 45 000 ₽</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATALOG SECTION */}
      <section id="catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">КАТАЛОГ ТЕХНИКИ</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1 mb-2">Аренда звука, света и эффектов</h2>
              <p className="text-xs text-zinc-400 max-w-xl">
                Выберите необходимые позиции для вашего события. Все оборудование проходит регулярную диагностику и готово к работе на 100%.
              </p>
            </div>
            
            {/* Category selection */}
            <div className="flex flex-wrap gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800 shrink-0">
              {[
                { id: 'all', label: 'Все категории' },
                { id: 'sets', label: 'Готовые комплекты' },
                { id: 'speakers', label: 'Акустика' },
                { id: 'mics', label: 'Микрофоны / DJ' },
                { id: 'light', label: 'Свет / Эффекты' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === tab.id ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map(item => (
              <div 
                key={item.id}
                className="bg-[#121215] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all group"
                id={`catalog-item-${item.id}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800">
                      {item.brand}
                    </span>
                    {item.power && (
                      <span className="text-[10px] text-zinc-500 font-mono font-medium">
                        Мощность: {item.power}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {item.specs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-center gap-2 text-[10px] md:text-[11px] text-zinc-300">
                        <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-mono">Ориентировочно</span>
                    <span className="text-xs font-black text-white">{item.approxPrice}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-2 bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white rounded-lg text-zinc-300 hover:text-zinc-950 font-bold transition-all flex items-center justify-center gap-1.5 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Добавить</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RENTAL ESTIMATOR CALCULATOR */}
      <section id="calculator" className="py-16 bg-[#09090b] border-y border-zinc-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">СМЕТНЫЙ КАЛЬКУЛЯТОР</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1 mb-2">Оценить стоимость аренды</h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Сформируйте примерную конфигурацию и отправьте менеджеру для точного расчета с учетом свободных дат.
            </p>
          </div>

          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-600">
                  <Volume2 className="w-6 h-6 animate-pulse" />
                </div>
                <span className="block text-sm text-zinc-300 font-bold mb-1">Сметный лист пуст</span>
                <p className="text-[11px] md:text-xs text-zinc-500 max-w-md mx-auto mb-6">
                  Выберите готовый комплект из пресетов выше или добавьте отдельные позиции в каталоге, чтобы составить смету.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => applyQuickPreset('party')}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold rounded-lg transition-all text-zinc-300"
                  >
                    Пакет «Пикник»
                  </button>
                  <button 
                    onClick={() => applyQuickPreset('wedding')}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold rounded-lg transition-all text-zinc-300"
                  >
                    Пакет «Банкет»
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Cart Items list */}
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider block mb-3">Выбранные позиции:</span>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                    {cart.map(ci => (
                      <div key={ci.item.id} className="flex items-center justify-between bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60 gap-4">
                        <div>
                          <span className="text-xs font-bold text-white block">{ci.item.name}</span>
                          <span className="text-[10px] text-zinc-400 font-medium">{ci.item.approxPrice}</span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                            <button 
                              onClick={() => updateQty(ci.item.id, -1)}
                              className="p-1 hover:bg-zinc-850 rounded text-zinc-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white w-5 text-center">{ci.quantity}</span>
                            <button 
                              onClick={() => updateQty(ci.item.id, 1)}
                              className="p-1 hover:bg-zinc-850 rounded text-zinc-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(ci.item.id)}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics & Settings */}
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1.5 uppercase font-mono tracking-wider">Район доставки:</label>
                      <select
                        value={deliveryZone}
                        onChange={(e) => setDeliveryZone(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl p-3 focus:border-zinc-700 focus:outline-none transition-colors"
                      >
                        {DELIVERY_ZONES.map(z => (
                          <option key={z.id} value={z.id}>{z.name} ({z.approxPrice})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1.5 uppercase font-mono tracking-wider">Место проведения (кафе, ресторан, турбаза):</label>
                      <input
                        type="text"
                        placeholder="Например: Ресторан Мэргэн, ул. Борсоева"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 rounded-xl p-3 focus:border-zinc-700 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Calendar Widget */}
                  <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-zinc-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Даты проведения:</span>
                      </div>
                      <span className="text-xs font-bold text-zinc-200 bg-zinc-900 px-2.5 py-1 rounded-lg font-mono text-center">
                        {getDatesDisplay()}
                      </span>
                    </div>

                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-4 px-1">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors"
                        type="button"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        {MONTH_NAMES[currentMonth]} {currentYear}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-1 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors"
                        type="button"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Calendar Grid Header */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1">
                      {WEEKDAY_NAMES.map((wd) => (
                        <div key={wd} className="text-[10px] text-zinc-500 font-bold py-1">
                          {wd}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {daysArray.map((date, idx) => {
                        if (!date) {
                          return <div key={`empty-${idx}`} className="py-2" />;
                        }

                        const selected = isSelected(date);
                        const range = isInRange(date);
                        const past = isPast(date);

                        let btnClass = "text-xs py-2 rounded-lg font-mono transition-all ";
                        if (past) {
                          btnClass += "text-zinc-800 opacity-25 cursor-not-allowed";
                        } else if (selected) {
                          btnClass += "bg-white text-zinc-950 font-bold shadow-md shadow-white/5";
                        } else if (range) {
                          btnClass += "bg-zinc-800/80 text-white font-medium";
                        } else {
                          btnClass += "text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer";
                        }

                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            disabled={past}
                            onClick={() => handleDateClick(date)}
                            className={btnClass}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sound Engineer Add-on */}
                <div className="bg-zinc-900/20 p-4 border border-zinc-800 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="engineer"
                      checked={needSoundEngineer}
                      onChange={(e) => setNeedSoundEngineer(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-zinc-300 focus:ring-0 cursor-pointer accent-zinc-100"
                    />
                    <div>
                      <label htmlFor="engineer" className="text-xs font-bold text-white cursor-pointer select-none">
                        Работа квалифицированного звукорежиссера
                      </label>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Полное сопровождение, настройка звука артистов и ведение программы</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono shrink-0">от 6 000 ₽ / сутки</span>
                </div>

                {/* Calculations Output & Messenger Integration */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-[#121215] to-[#09090b] border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Оценочная стоимость:</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl md:text-3xl font-black text-white font-mono">~ {estimatedTotal.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>

                    {/* Immediate messaging */}
                    <div className="flex gap-2">
                      <button
                        onClick={shareToTelegram}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-black tracking-wider rounded-xl text-[10px] uppercase flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <Send className="w-3.5 h-3.5 text-slate-950" />
                        <span>В Telegram</span>
                      </button>

                      <button
                        onClick={shareToVk}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-[#2787F5] hover:bg-[#3d94ff] text-white font-black tracking-wider rounded-xl text-[10px] uppercase flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>ВКонтакте</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right px-2">
                    <span className="text-[9px] text-zinc-600 font-medium">* Расчет является предварительным и не является публичной офертой</span>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER & CONTACTS */}
      <footer id="contacts" className="bg-[#08080a] border-t border-zinc-950 py-12 text-zinc-400 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-12 gap-8 mb-10 items-start">
            
            {/* Logo and About */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <LogoWave className="w-16 h-8 text-white" />
                <span className="font-brand font-black text-xs md:text-sm tracking-[0.2em] uppercase text-white">
                  BAIKAL SOUND SYSTEM
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                Профессиональное техническое обеспечение, безупречный звук и световое шоу для мероприятий любого уровня в Республике Бурятия.
              </p>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-brand">РАЗДЕЛЫ</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-white transition-colors">О сервисе</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Оборудование</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">Расчет сметы</a></li>
              </ul>
            </div>

            {/* Contacts list */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-brand">КОНТАКТЫ МЕНЕДЖЕРА</h4>
              <div className="space-y-3 text-xs">
                
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <a href={contactLinks.phone} className="text-zinc-200 hover:text-white font-bold font-mono text-sm transition-colors">
                    {contactLinks.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-zinc-400" />
                  <div className="flex gap-2">
                    <a 
                      href={contactLinks.tg}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-sky-950/40 border border-sky-900/30 text-sky-400 hover:bg-sky-900/30 font-semibold rounded-md transition-colors"
                    >
                      Telegram
                    </a>
                    <a 
                      href={contactLinks.vk}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-[#2787F5]/10 border border-[#2787F5]/30 text-[#2787F5] hover:bg-[#2787F5]/20 font-semibold rounded-md transition-colors"
                    >
                      ВКонтакте
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Бурятия, г. Улан-Удэ. Работа на выезде в другие районы и регионы обсуждается индивидуально.
                </p>

              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-zinc-900 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            © {new Date().getFullYear()} BAIKAL SOUND SYSTEM. ALL RIGHTS RESERVED.
          </div>

        </div>
      </footer>

    </div>
  );
}
