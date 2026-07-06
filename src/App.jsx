import React, { useEffect, useState } from 'react';
import { TextMorph } from 'torph/react';
import {
  Award,
  Baby,
  CalendarCheck,
  ChevronRight,
  Clock,
  HeartPulse,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const logo = asset('Logo/cehmefe-logo-cropped.png');
const images = {
  hero: asset('Fotos Dra. Mónica/IMG_6047.JPG'),
  portrait: asset('Fotos Dra. Mónica/IMG_6048.JPG'),
  office: asset('Fotos Dra. Mónica/IMG_1988.JPG'),
  consult: asset('Fotos Dra. Mónica/IMG_1992.JPG'),
  equipment: asset('Fotos Dra. Mónica/IMG_1986.JPG'),
};

const content = {
  es: {
    nav: [
      ['Servicios', '#servicios'],
      ['Especialista', '#especialista'],
      ['Agendar', '#agendar'],
    ],
    hero: {
      titleLead: 'Medicina fetal con ',
      titleMorphs: [
        'claridad y cuidado.',
        'confianza y calma.',
        'atención humana.',
      ],
      subtitle:
        'Te acompañamos durante el embarazo con estudios especializados de tu bebé, explicando cada resultado con claridad y cuidado para que vivas esta etapa con más tranquilidad y confianza.',
      primary: 'Agendar cita',
      secondary: 'Ver servicios',
    },
    trust: [
      { icon: ShieldCheck, value: 'Médicos certificados', label: 'Atención especializada en medicina fetal' },
      { icon: Award, value: 'Experiencia clínica', label: 'Acompañamiento claro y humano' },
      { icon: MapPin, value: 'SPS, Honduras', label: 'Nuevos Horizontes Business Center' },
    ],
    services: {
      title: 'Estudios especializados para cada etapa del embarazo.',
      subtitle:
        'Evaluaciones con tecnología avanzada, explicación médica clara y un ambiente pensado para generar calma.',
      items: [
        {
          icon: Baby,
          title: 'Ultrasonido de viabilidad fetal',
          desc: 'Confirmación temprana del embarazo, latido cardíaco y primeras evaluaciones del bebé.',
        },
        {
          icon: Microscope,
          title: 'Tamizaje del primer trimestre',
          desc: 'Evaluación no invasiva de riesgos cromosómicos entre las semanas recomendadas.',
        },
        {
          icon: HeartPulse,
          title: 'Ecocardiografía fetal',
          desc: 'Estudio detallado del corazón del bebé cuando el control prenatal lo indica.',
        },
        {
          icon: Stethoscope,
          title: 'Ultrasonido morfológico',
          desc: 'Revisión anatómica detallada del bebé, usualmente entre las semanas 18 y 24.',
        },
      ],
    },
    specialist: {
      name: 'Dra. Mónica García',
      role: 'Especialista en Medicina Materno Fetal',
      body:
        'La atención combina experiencia clínica, evaluación cuidadosa y comunicación cercana. Cada estudio se explica con lenguaje claro para que las familias comprendan los hallazgos y puedan tomar decisiones con tranquilidad.',
      points: ['Medicina fetal certificada', 'Ultrasonido avanzado', 'Atención personalizada'],
    },
    appointment: {
      title: 'Agenda tu cita o escríbenos.',
      subtitle:
        'Atendemos por WhatsApp, llamada o correo. Para orientarte mejor, comparte tus semanas de embarazo, el estudio indicado y si vienes referida por tu médico.',
      hours: 'Lunes a viernes 8:00 AM - 6:00 PM · Sábado 9:00 AM - 1:00 PM',
      address: 'Local 1503, Nivel 15, Nuevos Horizontes Business Center, San Pedro Sula.',
      email: 'info@cehmefe.com',
      whatsapp: 'WhatsApp',
      call: 'Llamar',
      directions: 'Abrir en Google Maps',
    },
    footer: {
      description: 'Centro Hondureño de Medicina Fetal. Estudios especializados, tecnología avanzada y acompañamiento médico claro y humano.',
      contact: 'Contacto',
      links: 'Enlaces',
      rights: '© 2026 CEHMEFE. Centro Hondureño de Medicina Fetal.',
    },
  },
  en: {
    nav: [
      ['Services', '#servicios'],
      ['Specialist', '#especialista'],
      ['Booking', '#agendar'],
    ],
    hero: {
      titleLead: 'Fetal medicine with ',
      titleMorphs: [
        'clarity and care.',
        'confidence and calm.',
        'human attention.',
      ],
      subtitle:
        'We accompany you through pregnancy with specialized studies of your baby, explaining each result with clarity and care so this stage feels calmer and more confident.',
      primary: 'Book appointment',
      secondary: 'View services',
    },
    trust: [
      { icon: ShieldCheck, value: 'Certified care', label: 'Specialized fetal medicine support' },
      { icon: Award, value: 'Clinical experience', label: 'Clear and human accompaniment' },
      { icon: MapPin, value: 'SPS, Honduras', label: 'Nuevos Horizontes Business Center' },
    ],
    services: {
      title: 'Specialized studies for every stage of pregnancy.',
      subtitle:
        'Advanced technology, clear medical explanations, and a calm environment for families.',
      items: [
        {
          icon: Baby,
          title: 'Fetal viability ultrasound',
          desc: 'Early confirmation of pregnancy, heartbeat, and first baby evaluations.',
        },
        {
          icon: Microscope,
          title: 'First trimester screening',
          desc: 'Non-invasive chromosomal risk evaluation during the recommended weeks.',
        },
        {
          icon: HeartPulse,
          title: 'Fetal echocardiography',
          desc: 'Detailed evaluation of the baby’s heart when prenatal care indicates it.',
        },
        {
          icon: Stethoscope,
          title: 'Morphology ultrasound',
          desc: 'Detailed anatomical review, usually between weeks 18 and 24.',
        },
      ],
    },
    specialist: {
      name: 'Dr. Monica Garcia',
      role: 'Maternal-Fetal Medicine Specialist',
      body:
        'Care combines clinical experience, careful evaluation, and close communication. Every study is explained in clear language so families understand the findings and can make decisions calmly.',
      points: ['Certified fetal medicine', 'Advanced ultrasound', 'Personalized care'],
    },
    appointment: {
      title: 'Book your visit or write to us.',
      subtitle:
        'We respond by WhatsApp, phone, or email. For better guidance, share your pregnancy week, the requested study, and whether you were referred by your doctor.',
      hours: 'Monday to Friday 8:00 AM - 6:00 PM · Saturday 9:00 AM - 1:00 PM',
      address: 'Suite 1503, Level 15, Nuevos Horizontes Business Center, San Pedro Sula.',
      email: 'info@cehmefe.com',
      whatsapp: 'WhatsApp',
      call: 'Call',
      directions: 'Open in Google Maps',
    },
    footer: {
      description: 'Honduran Center for Fetal Medicine. Specialized studies, advanced technology, and clear, human medical accompaniment.',
      contact: 'Contact',
      links: 'Links',
      rights: '© 2026 CEHMEFE. Honduran Center for Fetal Medicine.',
    },
  },
};

function App() {
  const [lang, setLang] = useState('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const t = content[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setHeroTitleIndex(0);
    const interval = window.setInterval(() => {
      setHeroTitleIndex((index) => (index + 1) % content[lang].hero.titleMorphs.length);
    }, 3400);
    return () => window.clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#272829]">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled ? 'border-[#E6E1E1] bg-[#F8F8F8]/95 backdrop-blur' : 'border-transparent bg-[#F8F8F8]/80'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#inicio" className="flex items-center" aria-label="CEHMEFE">
            <img src={logo} alt="CEHMEFE" className="h-14 w-auto object-contain mix-blend-multiply" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {t.nav.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-semibold text-[#6D6D6D] transition hover:text-[#272829]">
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="rounded-md border border-[#D9D5D5] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#272829]"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a
              href="#agendar"
              className="inline-flex items-center gap-2 rounded-md bg-[#272829] px-4 py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              {t.hero.primary}
              <ChevronRight size={16} />
            </a>
          </nav>

          <button
            type="button"
            className="rounded-md border border-[#D9D5D5] p-2 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E6E1E1] bg-[#F8F8F8] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {t.nav.map(([label, href]) => (
                <a key={label} href={href} className="text-lg font-semibold" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setLang(lang === 'es' ? 'en' : 'es');
                  setMenuOpen(false);
                }}
                className="w-fit rounded-md border border-[#D9D5D5] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em]"
              >
                {lang === 'es' ? 'English' : 'Español'}
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="inicio">
        <section className="pt-28 md:pt-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <h1 data-reveal style={{ '--reveal-delay': '40ms' }} className="text-5xl font-black leading-[0.98] tracking-normal text-[#272829] md:text-7xl">
                {t.hero.titleLead}
                <TextMorph
                  as="span"
                  duration={720}
                  ease="cubic-bezier(0.22, 1, 0.36, 1)"
                  className="hero-morph-title mt-2 block min-h-[2em] max-w-full md:min-h-[1em]"
                >
                  {t.hero.titleMorphs[heroTitleIndex]}
                </TextMorph>
              </h1>
              <p data-reveal style={{ '--reveal-delay': '90ms' }} className="mt-7 max-w-xl text-lg leading-8 text-[#5F5F5F]">{t.hero.subtitle}</p>
              <div data-reveal style={{ '--reveal-delay': '170ms' }} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#agendar"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#272829] px-6 py-4 text-sm font-bold text-white transition hover:bg-black"
                >
                  {t.hero.primary}
                  <CalendarCheck size={18} />
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-md border border-[#CFCACA] px-6 py-4 text-sm font-bold text-[#272829] transition hover:border-[#272829]"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>

            <div data-reveal style={{ '--reveal-delay': '120ms' }} className="grid gap-4 sm:grid-cols-[1fr_0.68fr]">
              <div className="overflow-hidden rounded-md border border-[#E5E0E0] bg-white">
                <img src={images.hero} alt="Dra. Mónica junto a equipo de ultrasonido" className="h-full min-h-[500px] w-full object-cover" />
              </div>
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-md border border-[#E5E0E0] bg-white">
                  <img src={images.office} alt="Consultorio CEHMEFE" className="h-56 w-full object-cover" />
                </div>
                <div data-reveal style={{ '--reveal-delay': '260ms' }} className="bg-[#272829] p-6 text-white">
                  <p className="text-2xl font-black leading-tight">
                    {lang === 'es' ? 'Claridad médica para una etapa sensible.' : 'Medical clarity for a sensitive stage.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E0E0] bg-white">
          <div className="mx-auto grid max-w-7xl gap-px bg-[#E5E0E0] px-0 md:grid-cols-3">
            {t.trust.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.value} data-reveal className="bg-white px-6 py-8 md:px-8">
                  <Icon className="mb-5 text-[#272829]" size={26} strokeWidth={1.8} />
                  <h2 className="text-lg font-black">{item.value}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6D6D6D]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="servicios" className="bg-[#F8F8F8] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div data-reveal className="max-w-3xl">
              <h2 className="text-4xl font-black leading-tight md:text-6xl">{t.services.title}</h2>
              <p className="mt-5 text-lg leading-8 text-[#5F5F5F]">{t.services.subtitle}</p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {t.services.items.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} data-reveal className="rounded-md border border-[#E2DDDD] bg-white p-6">
                    <Icon className="mb-10 text-[#272829]" size={30} strokeWidth={1.7} />
                    <h3 className="text-xl font-black leading-tight">{service.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#656565]">{service.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="especialista" className="bg-white py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.78fr_1fr] lg:items-center">
            <div data-reveal className="grid grid-cols-[0.72fr_1fr] gap-4">
              <img src={images.portrait} alt={t.specialist.name} className="h-full min-h-[480px] w-full rounded-md object-cover" />
              <div className="grid gap-4">
                <img src={images.consult} alt="Atención durante ultrasonido" className="h-60 w-full rounded-md object-cover" />
                <img src={images.equipment} alt="Equipo de ultrasonido" className="h-60 w-full rounded-md object-cover" />
              </div>
            </div>

            <div data-reveal style={{ '--reveal-delay': '140ms' }}>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">{t.specialist.name}</h2>
              <p className="mt-3 text-lg font-semibold text-[#777]">{t.specialist.role}</p>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5F5F5F]">{t.specialist.body}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.specialist.points.map((point) => (
                  <div key={point} className="rounded-md border border-[#E2DDDD] bg-[#F8F8F8] px-4 py-4 text-sm font-bold">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="agendar" className="bg-[#F6F1F1] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1fr]">
              <div data-reveal>
                <h2 className="text-4xl font-black leading-tight text-[#272829] md:text-6xl">{t.appointment.title}</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#5F5F5F]">{t.appointment.subtitle}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://wa.me/50494401234"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#272829] px-6 py-4 text-sm font-bold text-white transition hover:bg-black"
                  >
                    <MessageCircle size={18} />
                    {t.appointment.whatsapp}
                  </a>
                  <a
                    href="tel:+50494401234"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#A1A0A1] px-6 py-4 text-sm font-bold text-[#272829] transition hover:border-[#272829] hover:bg-white"
                  >
                    <Phone size={18} />
                    {t.appointment.call} +504 9440-1234
                  </a>
                </div>
              </div>

              <div data-reveal style={{ '--reveal-delay': '120ms' }} className="rounded-md border border-[#DDD8D8] bg-white p-7 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.35)] md:p-9">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <h3 className="text-lg font-black text-[#272829]">{lang === 'es' ? 'Dirección' : 'Address'}</h3>
                    <p className="mt-2 leading-7 text-[#5F5F5F]">{t.appointment.address}</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Nuevos%20Horizontes%20Business%20Center%20San%20Pedro%20Sula%20Honduras"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#272829] underline underline-offset-4"
                    >
                      {t.appointment.directions}
                      <ChevronRight size={15} />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#272829]">{lang === 'es' ? 'Horario' : 'Hours'}</h3>
                    <div className="mt-2 flex items-start gap-3 text-[#5F5F5F]">
                      <Clock className="mt-1 shrink-0 text-[#272829]" size={18} />
                      <p className="leading-7">{t.appointment.hours}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#272829]">{lang === 'es' ? 'Correo' : 'Email'}</h3>
                    <div className="mt-2 flex items-start gap-3 text-[#5F5F5F]">
                      <Mail className="mt-1 shrink-0 text-[#272829]" size={18} />
                      <a href="mailto:info@cehmefe.com" className="leading-7 hover:text-[#272829]">{t.appointment.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="mt-14 overflow-hidden rounded-md border border-[#DDD8D8] bg-white">
              <iframe
                title="CEHMEFE location map"
                src="https://www.google.com/maps?q=Nuevos%20Horizontes%20Business%20Center%20San%20Pedro%20Sula%20Honduras&output=embed"
                className="h-[340px] w-full border-0 md:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5E0E0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.15fr_1fr_0.8fr] md:px-8 md:py-20">
          <div data-reveal>
            <img src={logo} alt="CEHMEFE" className="h-20 w-auto object-contain mix-blend-multiply" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#666]">{t.footer.description}</p>
            <a
              href="https://wa.me/50494401234"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#272829] px-5 py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              <MessageCircle size={17} />
              {t.hero.primary}
            </a>
          </div>

          <div data-reveal style={{ '--reveal-delay': '90ms' }}>
            <h2 className="text-xl font-black text-[#272829]">{t.footer.contact}</h2>
            <div className="mt-6 space-y-5 text-sm leading-6 text-[#666]">
              <p className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[#272829]" size={18} />
                <span>{t.appointment.address}</span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 shrink-0 text-[#272829]" size={18} />
                <a href="tel:+50494401234" className="hover:text-[#272829]">+504 9440-1234</a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 shrink-0 text-[#272829]" size={18} />
                <a href="mailto:info@cehmefe.com" className="hover:text-[#272829]">info@cehmefe.com</a>
              </p>
            </div>
          </div>

          <div data-reveal style={{ '--reveal-delay': '180ms' }}>
            <h2 className="text-xl font-black text-[#272829]">{t.footer.links}</h2>
            <nav className="mt-6 flex flex-col gap-4 text-sm font-semibold text-[#666]">
              <a href="#servicios" className="hover:text-[#272829]">{lang === 'es' ? 'Servicios' : 'Services'}</a>
              <a href="#especialista" className="hover:text-[#272829]">{lang === 'es' ? 'Especialista' : 'Specialist'}</a>
              <a href="#agendar" className="hover:text-[#272829]">{lang === 'es' ? 'Agendar cita' : 'Book appointment'}</a>
              <a className="inline-flex items-center gap-2 hover:text-[#272829]" href="https://www.instagram.com/cehmefe_fetalmed">
                <Instagram size={17} />
                @cehmefe_fetalmed
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-[#E5E0E0]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-[#777] md:flex-row md:items-center md:justify-between md:px-8">
            <p>{t.footer.rights}</p>
            <p>San Pedro Sula, Honduras.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
