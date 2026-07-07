import React, { useEffect, useState } from 'react';
import { TextMorph } from 'torph/react';
import heraTechnologyPost from './content/blog/hera-z20-tecnologia.md?raw';
import modelsAccessibilityPost from './content/blog/modelos-3d-accesibilidad.md?raw';
import ultrasoundWeekPost from './content/blog/ultrasonido-segun-semana.md?raw';
import {
  Award,
  CalendarCheck,
  ChevronRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const logo = asset('Logo/cehmefe-logo.png');
const images = {
  hero: asset('doctor-photos/IMG_6047.JPG'),
  portrait: asset('doctor-photos/IMG_6048.JPG'),
  office: asset('doctor-photos/IMG_1988.JPG'),
  consult: asset('doctor-photos/IMG_1992.JPG'),
  equipment: asset('doctor-photos/IMG_1986.JPG'),
  heraDesktop: asset('Logo/hera_z20.png'),
  heraMobile: asset('Logo/hera_z20_mobile.jpg'),
  tactileModel: asset('assets/tactile-ultrasound-model.svg'),
};

const studyImages = [
  asset('assets/study1.png'),
  asset('assets/study2.png'),
  asset('assets/study3.png'),
  asset('assets/study4.png'),
];

function parseBlogPost(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const fields = {};

  if (!match) {
    return { fields, body: markdown.trim() };
  }

  match[1].split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    fields[key] = value;
  });

  return {
    fields,
    body: match[2].trim(),
  };
}

const blogPosts = [
  ultrasoundWeekPost,
  heraTechnologyPost,
  modelsAccessibilityPost,
]
  .map(parseBlogPost)
  .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

const content = {
  es: {
    nav: [
      ['Servicios', '#servicios'],
      ['Tecnología', '#tecnologia'],
      ['Especialista', '#especialista'],
      ['Blog', '#blog'],
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
          title: 'Ultrasonido de viabilidad fetal',
          desc: 'Confirmación temprana del embarazo, latido cardíaco y primeras evaluaciones del bebé.',
        },
        {
          title: 'Tamizaje del primer trimestre',
          desc: 'Evaluación no invasiva de riesgos cromosómicos entre las semanas recomendadas.',
        },
        {
          title: 'Ecocardiografía fetal',
          desc: 'Estudio detallado del corazón del bebé cuando el control prenatal lo indica.',
        },
        {
          title: 'Ultrasonido morfológico',
          desc: 'Revisión anatómica detallada del bebé, usualmente entre las semanas 18 y 24.',
        },
      ],
      moreTitle: 'También realizamos',
      moreItems: [
        'Diagnóstico prenatal no invasivo',
        'Monitoreo fetal electrónico',
        'Ultrasonido de longitud cervical',
        'Ultrasonido pélvico 3D',
        'Ultrasonido 3D/4D',
        'Ultrasonido de crecimiento y desarrollo fetal',
      ],
    },
    technology: {
      title: 'Tecnología avanzada para evaluar con más precisión.',
      subtitle:
        'Trabajamos con el Samsung HERA Z20, un sistema de ultrasonido para salud femenina diseñado para estudios obstétricos complejos, visualización 3D/4D y asistencia inteligente durante la exploración.',
      imageAlt: 'Ilustración de ultrasonido avanzado',
      model: 'Samsung HERA Z20',
      tagline: 'Nueva era de ultrasonido obstétrico',
      modelText:
        'Imágenes de alta calidad, herramientas de IA y visualización 3D para acompañar cada evaluación con mayor detalle.',
      features: [
        {
          title: 'Claridad de imagen',
          desc: 'Arquitectura de imagen avanzada para observar estructuras fetales con mejor contraste, profundidad y definición.',
        },
        {
          title: 'Asistencia con IA',
          desc: 'Herramientas como Live ViewAssist ayudan a identificar vistas, anotaciones y mediciones durante el estudio.',
        },
        {
          title: 'Visualización 3D/4D',
          desc: 'Funciones como PortraitVue y EzVolume apoyan la visualización volumétrica y la comprensión de estructuras.',
        },
        {
          title: 'Flujo más cómodo',
          desc: 'Configuración personalizable y diseño ergonómico para favorecer una consulta más eficiente y ordenada.',
        },
      ],
      accessibilityHighlight: {
        title: 'Una imagen que también puede sentirse.',
        body:
          'Con la información 3D capturada por el Samsung HERA Z20, pacientes no videntes pueden solicitar un archivo orientado a impresión 3D para convertir una imagen prenatal en un modelo táctil, cuando la calidad del estudio y el procesamiento técnico lo permiten.',
      },
    },
    guide: {
      title: '¿Qué estudio corresponde según tu semana de embarazo?',
      subtitle:
        'Esta guía resume momentos frecuentes de evaluación. La indicación final depende de tu historia clínica y del criterio de la especialista.',
      items: [
        {
          range: 'Semanas 6-8',
          title: 'Ultrasonido de viabilidad',
          desc: 'Confirma embarazo, ubicación, latido cardíaco y primeras observaciones.',
        },
        {
          range: 'Semanas 11-13',
          title: 'Tamizaje del primer trimestre',
          desc: 'Evalúa marcadores tempranos y riesgos cromosómicos de forma no invasiva.',
        },
        {
          range: 'Semanas 18-24',
          title: 'Morfología fetal',
          desc: 'Revisión anatómica detallada del bebé y estructuras principales.',
        },
        {
          range: 'Según indicación médica',
          title: 'Estudios complementarios',
          desc: 'Ecocardiografía fetal, longitud cervical, monitoreo fetal y crecimiento/desarrollo.',
        },
      ],
      note:
        'Si vienes referida por tu médico, comparte la orden del estudio y tus semanas de embarazo para orientarte mejor.',
    },
    blog: {
      title: 'Lecturas para acompañar tu embarazo.',
      subtitle:
        'Artículos breves basados en las dudas más frecuentes sobre estudios prenatales, tecnología y seguimiento fetal.',
      label: 'Blog',
      readMore: 'Ir al blog',
    },
    specialist: {
      name: 'Dra. Mónica García',
      role: 'Especialista en Medicina Materno Fetal',
      body:
        'La atención combina experiencia clínica, evaluación cuidadosa y comunicación cercana. Cada estudio se explica con lenguaje claro para que las familias comprendan los hallazgos y puedan tomar decisiones con tranquilidad.',
      credentialsLabel: 'Especialidades y experiencia',
      points: [
        'Medicina Materno Fetal',
        'Ginecología y Obstetricia',
        'Ultrasonido obstétrico avanzado',
        'Diagnóstico prenatal',
        'Ecocardiografía fetal',
        'Seguimiento del crecimiento fetal',
      ],
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
      ['Technology', '#tecnologia'],
      ['Specialist', '#especialista'],
      ['Blog', '#blog'],
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
          title: 'Fetal viability ultrasound',
          desc: 'Early confirmation of pregnancy, heartbeat, and first baby evaluations.',
        },
        {
          title: 'First trimester screening',
          desc: 'Non-invasive chromosomal risk evaluation during the recommended weeks.',
        },
        {
          title: 'Fetal echocardiography',
          desc: 'Detailed evaluation of the baby’s heart when prenatal care indicates it.',
        },
        {
          title: 'Morphology ultrasound',
          desc: 'Detailed anatomical review, usually between weeks 18 and 24.',
        },
      ],
      moreTitle: 'We also perform',
      moreItems: [
        'Non-invasive prenatal testing guidance',
        'Electronic fetal monitoring',
        'Cervical length ultrasound',
        '3D pelvic ultrasound',
        '3D/4D ultrasound',
        'Fetal growth and development ultrasound',
      ],
    },
    technology: {
      title: 'Advanced technology for more precise evaluation.',
      subtitle:
        'We work with the Samsung HERA Z20, a women’s health ultrasound system designed for complex obstetric studies, 3D/4D visualization, and intelligent assistance during scanning.',
      imageAlt: 'Advanced ultrasound illustration',
      model: 'Samsung HERA Z20',
      tagline: 'A new era of obstetric ultrasound',
      modelText:
        'High-quality images, AI tools, and 3D visualization to support each evaluation with greater detail.',
      features: [
        {
          title: 'Image clarity',
          desc: 'Advanced imaging architecture helps visualize fetal structures with improved contrast, depth, and definition.',
        },
        {
          title: 'AI assistance',
          desc: 'Tools such as Live ViewAssist help identify views, annotations, and measurements during the study.',
        },
        {
          title: '3D/4D visualization',
          desc: 'Features such as PortraitVue and EzVolume support volume visualization and clearer structural understanding.',
        },
        {
          title: 'Comfortable workflow',
          desc: 'Personalized settings and ergonomic design help make each visit more efficient and organized.',
        },
      ],
      accessibilityHighlight: {
        title: 'An image that can also be felt.',
        body:
          'With 3D information captured by the Samsung HERA Z20, patients who are blind or have low vision can request a file oriented to 3D printing, helping transform a prenatal image into a tactile model when study quality and technical processing allow it.',
      },
    },
    guide: {
      title: 'Which study matches your pregnancy week?',
      subtitle:
        'This guide summarizes common evaluation moments. The final indication depends on your clinical history and the specialist’s criteria.',
      items: [
        {
          range: 'Weeks 6-8',
          title: 'Viability ultrasound',
          desc: 'Confirms pregnancy, location, heartbeat, and first observations.',
        },
        {
          range: 'Weeks 11-13',
          title: 'First trimester screening',
          desc: 'Evaluates early markers and chromosomal risks in a non-invasive way.',
        },
        {
          range: 'Weeks 18-24',
          title: 'Fetal morphology',
          desc: 'Detailed anatomical review of the baby and main structures.',
        },
        {
          range: 'As medically indicated',
          title: 'Complementary studies',
          desc: 'Fetal echocardiography, cervical length, fetal monitoring, and growth/development.',
        },
      ],
      note:
        'If you were referred by your doctor, share the study order and your pregnancy week so we can guide you better.',
    },
    blog: {
      title: 'Reading to support your pregnancy.',
      subtitle:
        'Short articles based on common questions about prenatal studies, technology, and fetal follow-up.',
      label: 'Blog',
      readMore: 'Go to blog',
    },
    specialist: {
      name: 'Dr. Monica Garcia',
      role: 'Maternal-Fetal Medicine Specialist',
      body:
        'Care combines clinical experience, careful evaluation, and close communication. Every study is explained in clear language so families understand the findings and can make decisions calmly.',
      credentialsLabel: 'Specialties and experience',
      points: [
        'Maternal-Fetal Medicine',
        'Obstetrics and Gynecology',
        'Advanced obstetric ultrasound',
        'Prenatal diagnosis',
        'Fetal echocardiography',
        'Fetal growth follow-up',
      ],
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
  const fieldSuffix = lang === 'es' ? 'Es' : 'En';
  const normalizedPath = window.location.pathname.replace(/\/$/, '') || '/';
  const currentBlogPost = blogPosts.find((post) => `/blog/${post.fields.slug}` === normalizedPath);
  const isBlogPost = Boolean(currentBlogPost);
  const dateFormatter = new Intl.DateTimeFormat(lang === 'es' ? 'es-HN' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const sectionHref = (href) => (isBlogPost && href.startsWith('#') ? `/${href}` : href);

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
        <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href={isBlogPost ? '/' : '#inicio'} className="flex items-center" aria-label="CEHMEFE">
            <img src={logo} alt="CEHMEFE" className="h-[82px] w-[82px] object-contain" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {t.nav.map(([label, href]) => (
              <a key={label} href={sectionHref(href)} className="text-sm font-semibold text-[#6D6D6D] transition hover:text-[#272829]">
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
              href={isBlogPost ? '/#agendar' : '#agendar'}
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
                <a key={label} href={sectionHref(href)} className="text-lg font-semibold" onClick={() => setMenuOpen(false)}>
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

      {isBlogPost ? (
        <main className="pt-32">
          <article className="mx-auto max-w-4xl px-5 pb-24 pt-10 md:px-8 md:pb-32">
            <a href="/#blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#5F5F5F] transition hover:text-[#272829]">
              <ChevronRight className="rotate-180" size={16} />
              {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
            </a>
            <h1 className="mt-10 text-5xl font-black leading-tight text-[#272829] md:text-7xl">
              {currentBlogPost.fields[`title${fieldSuffix}`]}
            </h1>
            <time className="mt-6 block text-base font-semibold text-[#6A8390]" dateTime={currentBlogPost.fields.date}>
              {dateFormatter.format(new Date(`${currentBlogPost.fields.date}T00:00:00`))}
            </time>
            <p className="mt-8 text-xl leading-9 text-[#5F5F5F]">
              {currentBlogPost.fields[`excerpt${fieldSuffix}`]}
            </p>
            <div className="mt-12 space-y-7 border-t border-[#E2DDDD] pt-10 text-lg leading-9 text-[#3F4142]">
              {currentBlogPost.body.split(/\n\s*\n/).filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 rounded-md border border-[#DDE8EC] bg-[#F4FAFC] p-6">
              <h2 className="text-2xl font-black leading-tight">
                {lang === 'es' ? 'Agenda una evaluación especializada' : 'Book a specialized evaluation'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5F5F5F]">
                {lang === 'es'
                  ? 'La información del blog es orientativa. La indicación final depende de tu historia clínica y de la evaluación médica.'
                  : 'Blog information is for general guidance. The final indication depends on your clinical history and medical evaluation.'}
              </p>
              <a href="/#agendar" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#272829] px-5 py-3 text-sm font-bold text-white transition hover:bg-black">
                {t.hero.primary}
                <ChevronRight size={16} />
              </a>
            </div>
          </article>
        </main>
      ) : (
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
              {t.services.items.map((service, index) => {
                return (
                  <article key={service.title} data-reveal className="flex min-h-[430px] flex-col rounded-md border border-[#E2DDDD] bg-white p-8">
                    <div className="mb-10 flex h-52 items-center justify-center">
                      <img
                        src={studyImages[index]}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full max-w-[245px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-black leading-tight">{service.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#656565]">{service.desc}</p>
                  </article>
                );
              })}
            </div>

            <div data-reveal className="mt-8 rounded-md border border-[#E2DDDD] bg-white p-6 md:p-8">
              <h3 className="text-2xl font-black leading-tight">{t.services.moreTitle}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.services.moreItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-md bg-[#F8F8F8] px-4 py-3 text-sm font-bold leading-6 text-[#3E3F40]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A1C7D8]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tecnologia" className="border-y border-[#E5E0E0] bg-white py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div data-reveal className="mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-black leading-tight md:text-6xl">{t.technology.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5F5F5F]">{t.technology.subtitle}</p>
            </div>

            <div data-reveal style={{ '--reveal-delay': '120ms' }} className="mt-12 overflow-hidden rounded-md border border-[#E2DDDD] bg-[#F4F4F4]">
              <div className="relative md:aspect-[2881/1600]">
                <div className="relative z-10 p-6 sm:p-8 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[43%] md:items-center md:p-12 lg:p-16">
                  <div className="max-w-md rounded-md bg-white p-5 shadow-[0_18px_45px_-32px_rgba(0,0,0,0.45)] md:bg-transparent md:p-0 md:shadow-none">
                    <h3 className="text-4xl font-black leading-tight text-[#272829] md:text-5xl">{t.technology.model}</h3>
                    <p className="mt-4 text-2xl font-medium leading-tight text-[#272829] md:text-3xl">{t.technology.tagline}</p>
                    <p className="mt-5 text-sm leading-7 text-[#5F5F5F] md:text-base">{t.technology.modelText}</p>
                  </div>
                </div>
                <picture>
                  <source media="(max-width: 767px)" srcSet={images.heraMobile} />
                  <img
                    src={images.heraDesktop}
                    alt={t.technology.imageAlt}
                    className="h-auto w-full md:absolute md:inset-0 md:z-0 md:h-full md:object-cover"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.technology.features.map((feature) => {
                return (
                  <article key={feature.title} data-reveal className="rounded-md border border-[#E2DDDD] bg-white p-5">
                    <h3 className="text-lg font-black leading-tight">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#656565]">{feature.desc}</p>
                  </article>
                );
              })}
            </div>

            {false && (
            <section data-reveal className="mt-14 rounded-md border border-[#DDE8EC] bg-[#F4FAFC] p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <h3 className="text-4xl font-black leading-tight md:text-5xl">
                    {t.technology.accessibilityHighlight.title}
                  </h3>
                  <p className="mt-6 text-lg leading-8 text-[#4F5960]">
                    {t.technology.accessibilityHighlight.body}
                  </p>
                </div>

                <div className="overflow-hidden rounded-md border border-[#CFE0E7] bg-white p-4">
                  <img
                    src={images.tactileModel}
                    alt={lang === 'es' ? 'Ilustración de ultrasonido 3D convertido en modelo táctil' : 'Illustration of 3D ultrasound converted into a tactile model'}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
            )}
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
              <p className="mt-8 text-sm font-black uppercase tracking-[0.14em] text-[#6A8390]">{t.specialist.credentialsLabel}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.specialist.points.map((point) => (
                  <div key={point} className="rounded-md border border-[#E2DDDD] bg-[#F8F8F8] px-4 py-4 text-sm font-bold">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="border-y border-[#E5E0E0] bg-white py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div data-reveal className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-black leading-tight md:text-6xl">{t.blog.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5F5F5F]">{t.blog.subtitle}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {blogPosts.map((post, index) => {
                const title = post.fields[`title${fieldSuffix}`];
                const excerpt = post.fields[`excerpt${fieldSuffix}`];
                const dateText = dateFormatter.format(new Date(`${post.fields.date}T00:00:00`));
                const postHref = `/blog/${post.fields.slug}/`;

                return (
                  <article key={post.fields.slug} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }} className="rounded-md border border-[#E2DDDD] bg-[#F8F8F8] p-6">
                    <h3 className="text-2xl font-black leading-tight">{title}</h3>
                    <time className="mt-4 block text-sm font-semibold text-[#6A8390]" dateTime={post.fields.date}>{dateText}</time>
                    <p className="mt-4 text-sm leading-7 text-[#656565]">{excerpt}</p>

                    <a href={postHref} className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#CFCACA] px-4 py-3 text-sm font-bold text-[#272829] transition hover:border-[#272829] hover:bg-white">
                      {t.blog.readMore}
                      <ChevronRight size={16} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E0E0] bg-[#F8F8F8] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div data-reveal className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-black leading-tight md:text-6xl">{t.guide.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5F5F5F]">{t.guide.subtitle}</p>
            </div>

            <p data-reveal style={{ '--reveal-delay': '100ms' }} className="mx-auto mt-8 max-w-3xl text-center text-sm font-semibold leading-7 text-[#4F5960]">
              {t.guide.note}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {t.guide.items.map((item, index) => (
                <article key={item.range} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }} className="rounded-md border border-[#E2DDDD] bg-white p-6">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4F7] text-lg font-black text-[#272829]">
                    {index + 1}
                  </div>
                  <p className="text-sm font-black text-[#6A8390]">{item.range}</p>
                  <h3 className="mt-3 text-xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#656565]">{item.desc}</p>
                </article>
              ))}
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
      )}

      <footer className="border-t border-[#E5E0E0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.15fr_1fr_0.8fr] md:px-8 md:py-20">
          <div data-reveal>
            <img src={logo} alt="CEHMEFE" className="h-28 w-28 object-contain" />
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
              <a href={sectionHref('#servicios')} className="hover:text-[#272829]">{lang === 'es' ? 'Servicios' : 'Services'}</a>
              <a href={sectionHref('#tecnologia')} className="hover:text-[#272829]">{lang === 'es' ? 'Tecnología' : 'Technology'}</a>
              <a href={sectionHref('#especialista')} className="hover:text-[#272829]">{lang === 'es' ? 'Especialista' : 'Specialist'}</a>
              <a href={sectionHref('#blog')} className="hover:text-[#272829]">Blog</a>
              <a href={sectionHref('#agendar')} className="hover:text-[#272829]">{lang === 'es' ? 'Agendar cita' : 'Book appointment'}</a>
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
