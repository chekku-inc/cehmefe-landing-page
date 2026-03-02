import React, { useState, useEffect, useMemo } from 'react';
import doctorHero from '../FB_IMG_1772487438695.jpg';
import {
  ChevronRight,
  BrainCircuit,
  ShieldCheck,
  Globe,
  Menu,
  X,
  MapPin,
  Phone,
  Instagram,
  Clock,
  Baby,
  HeartPulse,
  Activity,
  Smartphone,
  Apple,
  MessageCircle,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

// --- Custom Logo (gradient heart + CEHMEFE) ---
const CehmefeLogo = ({ className = 'h-12 w-auto' }) => (
  <svg viewBox="0 0 400 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
    </defs>
    <path d="M40 60C40 37.9086 57.9086 20 80 20C102.091 20 120 37.9086 120 60C120 82.0914 102.091 100 80 100C57.9086 100 40 82.0914 40 60Z" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" />
    <path d="M65 60C65 51.7157 71.7157 45 80 45C88.2843 45 95 51.7157 95 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="80" cy="75" r="8" fill="url(#logoGrad)" />
    <text x="140" y="70" className="font-serif fill-current text-3xl font-bold tracking-tighter">CEHMEFE</text>
    <text x="140" y="90" className="font-sans fill-current opacity-60 text-[10px] tracking-[0.2em] uppercase font-semibold">Medicine Fetal Center</text>
  </svg>
);

const App = () => {
  const [lang, setLang] = useState('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceIcons = [Activity, BrainCircuit, HeartPulse, Baby];

  const content = {
    es: {
      nav: ['Servicios', 'Tecnología', 'Especialista', 'Citas'],
      hero: {
        badge: 'Cuidado Fetal de Vanguardia',
        title: 'La vida comienza con el mejor cuidado.',
        subtitle:
          'Especialistas en Medicina Fetal y ultrasonidos de alta definición en San Pedro Sula. Tecnología 5D para el diagnóstico más preciso.',
        cta: 'Agendar Cita',
        secondary: 'Conocer Tecnología',
        ai: 'Asistente IA 24/7',
      },
      stats: [
        { label: 'Años de Experiencia', value: '12+' },
        { label: 'Pacientes Felices', value: '5k+' },
        { label: 'Precisión Diagnóstica', value: '99%' },
      ],
      services: {
        title: 'Excelencia en Diagnóstico',
        subtitle:
          'Ofrecemos soluciones integrales para cada etapa de tu embarazo con calidez humana y rigor científico.',
        items: [
          { title: 'Morfológico 18-24', desc: 'Anatomía detallada órgano por órgano.' },
          { title: 'Tamizaje Genético', desc: 'Detección temprana de riesgos cromosómicos.' },
          { title: 'Ecocardiografía', desc: 'Evaluación avanzada del corazón fetal.' },
          { title: 'Experiencia 5D', desc: 'Vínculo emocional con imágenes hiperrealistas.' },
        ],
      },
      doctor: {
        tag: 'Nuestra Especialista',
        name: 'Dra. Mónica García',
        role: 'Especialista en Medicina Materno Fetal',
        bio: 'Certificada internacionalmente, la Dra. García combina años de experiencia clínica con la tecnología más avanzada para garantizar el bienestar de mamá y bebé.',
        features: ['Medicina Fetal Certificada', 'Ultrasonido Avanzado', 'Atención Personalizada'],
      },
      tech: {
        title: 'Tecnología de Punta',
        desc: 'Utilizamos los equipos de ultrasonido más avanzados del mercado para garantizar diagnósticos certeros y una experiencia visual inigualable.',
        features: ['Inteligencia Artificial Diagnóstica', 'Alta Resolución 4K', 'Seguimiento Digital'],
      },
      app: {
        title: 'Lleva tu embarazo en la palma de tu mano',
        subtitle:
          'Muy pronto podrás seguir tus citas, resultados y recordatorios de chequeos desde la app CEHMEFE.',
        bullets: [
          'Calendario de controles y ultrasonidos recomendado por la Dra. Mónica.',
          'Resumen de estudios y hallazgos clave siempre disponibles.',
          'Recordatorios suaves para no olvidar tus próximas citas.',
        ],
      },
      faq: {
        title: 'Asistente CEHMEFE con IA',
        subtitle:
          'Un chatbot entrenado por la Dra. Mónica para responder tus preguntas frecuentes sobre embarazo y estudios.',
        note: 'Las respuestas mostradas son solo ejemplos. Pronto integraremos un asistente con IA y RAG entrenado con la experiencia clínica de la Dra. Mónica.',
        questions: [
          {
            q: '¿En qué semana debo hacerme el ultrasonido morfológico?',
            a: 'Generalmente entre las semanas 18 y 24, según tu control prenatal.',
          },
          {
            q: '¿Qué es un ultrasonido de viabilidad fetal?',
            a: 'Es un estudio temprano que confirma la presencia del embarazo y evalúa el latido cardiaco.',
          },
          {
            q: '¿El ultrasonido le hace daño al bebé?',
            a: 'No. Cuando se realiza con equipos adecuados y por personal entrenado es un estudio seguro.',
          },
        ],
      },
      testimonials: {
        title: 'Testimonios de mamás CEHMEFE',
        subtitle: 'Historias reales de tranquilidad y acompañamiento durante el embarazo.',
        items: [
          {
            name: 'Ana María',
            role: 'Mamá primeriza',
            quote:
              'La Dra. García me explicó cada detalle del ultrasonido y salí con una paz que no había sentido en semanas.',
            image:
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400',
          },
          {
            name: 'Carolina',
            role: 'Embarazo de alto riesgo',
            quote:
              'En CEHMEFE sentí que mi bebé y yo estábamos en manos expertas. El seguimiento fue muy humano y profesional.',
            image:
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400&sat=-30',
          },
          {
            name: 'Gabriela',
            role: 'Segundo bebé',
            quote:
              'La tecnología de imagen es impresionante. Pudimos ver a nuestro bebé con una claridad increíble y eso nos dio mucha confianza.',
            image:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400&h=400',
          },
        ],
      },
      footer: {
        address: 'Local 1503, Nivel 15, Nuevos Horizontes Business Center, San Pedro Sula.',
        rights: '© 2026 CEHMEFE. San Pedro Sula, Honduras.',
      },
    },
    en: {
      nav: ['Services', 'Technology', 'Specialist', 'Booking'],
      hero: {
        badge: 'Cutting-edge Fetal Care',
        title: 'Life begins with the finest care.',
        subtitle:
          'Fetal Medicine specialists and high-definition ultrasounds in San Pedro Sula. 5D technology for the most precise diagnosis.',
        cta: 'Book Appointment',
        secondary: 'Our Technology',
        ai: '24/7 AI Assistant',
      },
      stats: [
        { label: 'Years Experience', value: '12+' },
        { label: 'Happy Patients', value: '5k+' },
        { label: 'Diagnostic Accuracy', value: '99%' },
      ],
      services: {
        title: 'Diagnostic Excellence',
        subtitle:
          'We offer comprehensive solutions for every stage of your pregnancy with human warmth and scientific rigor.',
        items: [
          { title: 'Morphology 18-24', desc: 'Detailed organ-by-organ anatomy.' },
          { title: 'Genetic Screening', desc: 'Early detection of chromosomal risks.' },
          { title: 'Echocardiography', desc: 'Advanced fetal heart evaluation.' },
          { title: '5D Experience', desc: 'Emotional bonding with hyper-realistic images.' },
        ],
      },
      doctor: {
        tag: 'Our Specialist',
        name: 'Dr. Monica Garcia',
        role: 'Maternal-Fetal Medicine Specialist',
        bio: 'Internationally certified, Dr. Garcia combines years of clinical experience with state-of-the-art technology to ensure maternal and fetal well-being.',
        features: ['Certified Fetal Medicine', 'Advanced Ultrasound', 'Personalized Care'],
      },
      tech: {
        title: 'State-of-the-Art Tech',
        desc: 'We use the most advanced ultrasound equipment on the market to ensure accurate diagnoses and an unmatched visual experience.',
        features: ['Diagnostic AI', '4K High Resolution', 'Digital Tracking'],
      },
      app: {
        title: 'Your pregnancy, organized in one app',
        subtitle:
          'Soon you will be able to track appointments, results, and follow-ups from the CEHMEFE mobile app.',
        bullets: [
          'Control calendar and ultrasound schedule curated by Dr. Monica.',
          'Key ultrasound findings and reports at your fingertips.',
          'Gentle reminders so you never miss an important visit.',
        ],
      },
      faq: {
        title: 'CEHMEFE AI Assistant',
        subtitle:
          'A chatbot trained by Dr. Monica to answer the most common questions about pregnancy and fetal medicine.',
        note: 'The answers shown are mock examples. We will soon integrate a RAG-based assistant powered by the clinical expertise of Dr. Monica.',
        questions: [
          {
            q: 'When should I schedule my morphology scan?',
            a: 'Usually between weeks 18 and 24 of pregnancy, depending on your prenatal control.',
          },
          {
            q: 'What is a fetal viability ultrasound?',
            a: 'It is an early scan that confirms the presence of pregnancy and evaluates the heartbeat.',
          },
          {
            q: 'Is ultrasound harmful for my baby?',
            a: 'No. When performed with proper equipment and trained staff, it is considered safe.',
          },
        ],
      },
      testimonials: {
        title: 'Stories from CEHMEFE moms',
        subtitle: 'Real experiences from families who trusted us with their pregnancy.',
        items: [
          {
            name: 'Anna',
            role: 'First-time mom',
            quote:
              'From the very first scan I felt truly cared for. Everything was explained with patience and empathy.',
            image:
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400',
          },
          {
            name: 'Caroline',
            role: 'High-risk pregnancy',
            quote:
              'The fetal medicine team gave us confidence at every visit. Their detailed ultrasounds helped us stay calm.',
            image:
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400&sat=-30',
          },
          {
            name: 'Gabrielle',
            role: 'Second pregnancy',
            quote:
              'Seeing our baby in such high definition was unforgettable. We felt in expert, caring hands the whole time.',
            image:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400&h=400',
          },
        ],
      },
      footer: {
        address: 'Suite 1503, Level 15, Nuevos Horizontes Business Center, San Pedro Sula.',
        rights: '© 2026 CEHMEFE. San Pedro Sula, Honduras.',
      },
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-600">
      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <CehmefeLogo className={`h-10 w-auto transition-all ${scrolled ? 'text-slate-900' : 'text-slate-900'}`} />

          <div className="hidden md:flex items-center gap-10">
            {t.nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-rose-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-xs font-bold hover:text-rose-600 transition-colors uppercase tracking-widest"
            >
              <Globe size={14} className="text-rose-500" /> {lang}
            </button>
            <button className="bg-slate-900 text-white px-7 py-3 rounded-full text-[13px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10">
              {t.hero.cta}
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white p-8 flex flex-col justify-center gap-8 animate-in fade-in zoom-in-95 duration-300">
          {t.nav.map((item) => (
            <a
              key={item}
              href="#"
              className="text-4xl font-serif font-bold text-slate-900 border-b border-slate-100 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              setLang(lang === 'es' ? 'en' : 'es');
              setIsMenuOpen(false);
            }}
            className="text-xl font-bold text-rose-600 flex items-center gap-3"
          >
            <Globe /> Switch to {lang === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      )}

      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-rose-50 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] aspect-square bg-blue-50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 relative">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{t.hero.badge}</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-slate-900">
              {t.hero.title}
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">{t.hero.subtitle}</p>

            <div className="flex flex-wrap gap-5 pt-4">
              <button className="bg-rose-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-rose-700 transition-all shadow-2xl shadow-rose-200 group">
                {t.hero.cta}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                {t.hero.secondary}
              </button>
            </div>

            <div className="flex gap-12 pt-8">
              {t.stats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-3xl font-serif font-bold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform transition-all duration-700 group-hover:scale-[1.02]">
              <img src={doctorHero} alt="Dra. Mónica García" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">Tecnología Voluson™ E10</h4>
                    <p className="text-xs opacity-80 uppercase tracking-widest mt-1">
                      {lang === 'es' ? 'Imágenes en tiempo real HD' : 'Real-time HD imaging'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-rose-100 rounded-[3rem] -z-10 transform translate-x-4 translate-y-4" />
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="servicios" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6 tracking-tight">{t.services.title}</h2>
            <p className="text-slate-400 text-xl leading-relaxed">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((item, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <div
                  key={idx}
                  className="group bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white hover:text-slate-900 transition-all duration-500 cursor-default"
                >
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-8 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400 group-hover:text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Doctor Spotlight --- */}
      <section id="especialista" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative max-w-lg">
                <img src={doctorHero} alt={t.doctor.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-rose-600/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-50 max-w-xs hidden md:block">
                <Award className="text-rose-500 w-12 h-12 mb-4" />
                <h4 className="font-bold text-lg mb-1">Fetal Medicine Foundation</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  {lang === 'es' ? 'Londres, UK - Certificación' : 'London, UK - Certification'}
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-block text-rose-600 font-bold text-xs uppercase tracking-[0.3em]">
                {t.doctor.tag}
              </div>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-slate-900">{t.doctor.name}</h2>
              <div className="text-xl font-bold text-slate-400 italic">{t.doctor.role}</div>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">{t.doctor.bio}</p>
              <div className="space-y-4 pt-4">
                {t.doctor.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-slate-700 tracking-tight">{f}</span>
                  </div>
                ))}
              </div>
              <button className="pt-6 flex items-center gap-3 text-rose-600 font-bold text-lg hover:gap-5 transition-all group">
                {lang === 'es' ? 'Ver Currículum Completo' : 'View Full Curriculum'}
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="tecnología" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.2" />
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-rose-500" />
                <span className="text-rose-400 font-bold uppercase tracking-widest text-sm">
                  {lang === 'es' ? 'Innovación' : 'Innovation'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">{t.tech.title}</h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">{t.tech.desc}</p>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {t.tech.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <button className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
                {lang === 'es' ? 'Explorar Tecnología' : 'Explore Technology'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
              <Smartphone size={14} />
              <span>{lang === 'es' ? 'App móvil CEHMEFE' : 'CEHMEFE Mobile App'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif">{t.app.title}</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{t.app.subtitle}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              {t.app.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-left text-white shadow-md hover:bg-slate-800 transition-colors">
                <Smartphone size={22} />
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
                    {lang === 'es' ? 'Muy pronto en' : 'Coming soon on'}
                  </div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3 text-left text-slate-900 hover:bg-slate-50 transition-colors">
                <Apple size={22} />
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {lang === 'es' ? 'Muy pronto en' : 'Coming soon on'}
                  </div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'es'
                ? 'La app estará disponible para pacientes CEHMEFE. Te avisaremos en tu próxima cita.'
                : 'The app will be available for CEHMEFE patients. We will notify you during your visit.'}
            </p>
          </div>
          <div className="relative">
            <div className="mx-auto aspect-[9/18] w-full max-w-xs rounded-[2.2rem] bg-slate-900 p-3 shadow-2xl">
              <div className="h-full w-full rounded-[1.8rem] bg-gradient-to-b from-rose-100 via-white to-slate-100 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>CEHMEFE</span>
                  <span>{lang === 'es' ? 'Próximo control' : 'Next checkup'}</span>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-900">
                    {lang === 'es'
                      ? 'Tu embarazo, organizado en un solo lugar.'
                      : 'Your pregnancy, organized in one place.'}
                  </p>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                      <span>{lang === 'es' ? 'Control trimestral' : 'Trimester visit'}</span>
                      <span className="text-[10px] font-semibold text-rose-600">08:30</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                      <span>{lang === 'es' ? 'Ultrasonido morfológico' : 'Morphology scan'}</span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        {lang === 'es' ? 'Semana 20' : 'Week 20'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{lang === 'es' ? 'Recordatorios suaves' : 'Gentle reminders'}</span>
                  <span>{lang === 'es' ? 'Seguimiento seguro' : 'Safe follow-up'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-serif">{t.testimonials.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
              {t.testimonials.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((tm) => (
              <div
                key={tm.name}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={tm.image}
                    alt={tm.name}
                    className="w-14 h-14 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{tm.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {tm.role}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">“{tm.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-rose-600">
                <MessageCircle size={14} />
                <span>{lang === 'es' ? 'Chatbot próximamente' : 'Chatbot coming soon'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif">{t.faq.title}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.faq.subtitle}
              </p>
              <div className="space-y-4 pt-4">
                {t.faq.questions.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-900 mb-1">{item.q}</p>
                    <p className="text-sm text-slate-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-slate-900">
                      {lang === 'es' ? 'Asistente CEHMEFE IA' : 'CEHMEFE AI Assistant'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {lang === 'es' ? 'Versión demo · Respuestas de muestra' : 'Demo · Sample answers'}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {lang === 'es' ? 'Próximamente' : 'Soon'}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <div className="mt-1 h-6 w-6 rounded-full bg-slate-200" />
                  <div className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-800 max-w-[80%]">
                    {lang === 'es'
                      ? '¿Qué debo traer a mi primera cita de ultrasonido?'
                      : 'What should I bring to my first ultrasound visit?'}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="rounded-2xl bg-rose-600 px-3 py-2 text-white text-sm max-w-[80%]">
                    {lang === 'es'
                      ? 'Por ahora esta es una vista de ejemplo. Pronto podrás chatear en tiempo real con un asistente entrenado por la Dra. Mónica.'
                      : 'For now this is a sample preview. Soon you will chat in real time with an assistant trained by Dr. Monica.'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="mt-1 h-6 w-6 rounded-full bg-slate-200" />
                  <div className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-800 max-w-[80%]">
                    {lang === 'es'
                      ? '¿El ultrasonido 3D/4D necesita alguna preparación especial?'
                      : 'Do I need any special preparation for a 3D/4D ultrasound?'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400 max-w-3xl mx-auto">
            {t.faq.note}
          </p>
        </div>
      </section>

      {/* --- Contact & Location --- */}
      <section id="citas" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50">
            <h2 className="text-4xl font-serif font-bold mb-10">
              {lang === 'es' ? 'Reserva tu Espacio' : 'Book Your Space'}
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1">
                    {lang === 'es' ? 'Nombre Completo' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-rose-500 transition-all"
                    placeholder={lang === 'es' ? 'Ej. Ana Pérez' : 'e.g. Jane Doe'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1">
                    {lang === 'es' ? 'Teléfono' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-rose-500 transition-all"
                    placeholder="+504"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1">
                  {lang === 'es' ? 'Tipo de Servicio' : 'Service Type'}
                </label>
                <select className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-rose-500 transition-all appearance-none">
                  <option>{lang === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
                  {t.services.items.map((item, i) => (
                    <option key={i}>{item.title}</option>
                  ))}
                </select>
              </div>
              <button className="w-full bg-rose-600 text-white font-bold py-5 rounded-2xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-200">
                {lang === 'es' ? 'Confirmar Solicitud' : 'Confirm Request'}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between py-8">
            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{lang === 'es' ? 'Ubicación' : 'Location'}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Nivel 15, Suite 1503
                    <br />
                    Nuevos Horizontes Business Center
                    <br />
                    San Pedro Sula, Honduras.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{lang === 'es' ? 'Contacto Directo' : 'Direct Contact'}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    +504 9440-1234
                    <br />
                    info@cehmefe.com
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{lang === 'es' ? 'Síguenos' : 'Follow Us'}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">@cehmefe_fetalmed</p>
                </div>
              </div>
            </div>

            <div className="pt-12">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex items-center justify-between">
                <div>
                  <div className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1">
                    {lang === 'es' ? 'Soporte Médico' : 'Medical Support'}
                  </div>
                  <div className="text-lg font-bold">
                    {lang === 'es' ? 'Asistente IA Disponible' : 'AI Assistant Available'}
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(true)}
                  className="bg-white text-slate-900 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                >
                  <BrainCircuit size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-16">
            <CehmefeLogo className="h-12 w-auto" />
            <div className="flex gap-12 font-bold text-[13px] uppercase tracking-widest text-slate-400">
              <a href="#servicios" className="hover:text-rose-600 transition-colors">
                {lang === 'es' ? 'Servicios' : 'Services'}
              </a>
              <a href="#tecnología" className="hover:text-rose-600 transition-colors">
                {lang === 'es' ? 'Tecnología' : 'Technology'}
              </a>
              <a href="#" className="hover:text-rose-600 transition-colors">Blog</a>
              <a href="#" className="hover:text-rose-600 transition-colors">
                {lang === 'es' ? 'Portal Pacientes' : 'Patient Portal'}
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 pt-12 border-t border-slate-50">
            <p>{t.footer.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-900 transition-colors">
                {lang === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                {lang === 'es' ? 'Privacidad de Datos' : 'Privacy Policy'}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating AI Chat Widget --- */}
      <div
        className={`fixed bottom-8 right-8 z-[200] transition-all duration-500 transform ${
          showAIChat ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white w-[360px] h-[500px] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden flex flex-col">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">CEHMEFE AI</h4>
                <div className="flex items-center gap-1 text-[10px] opacity-70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online 24/7
                </div>
              </div>
            </div>
            <button onClick={() => setShowAIChat(false)} className="hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50 font-medium text-sm">
            <div className="bg-white p-4 rounded-2xl shadow-sm self-start max-w-[85%] text-slate-600">
              {lang === 'es'
                ? 'Hola, soy tu asistente de CEHMEFE. ¿En qué puedo ayudarte hoy con respecto a tu embarazo o citas?'
                : "Hi, I'm your CEHMEFE assistant. How can I help you today about your pregnancy or appointments?"}
            </div>
          </div>
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl flex items-center px-4 py-2">
              <input
                type="text"
                placeholder={lang === 'es' ? 'Escribe tu duda...' : 'Type your question...'}
                className="flex-1 bg-transparent border-none text-sm focus:ring-0"
              />
              <button className="text-rose-600 font-bold text-xs uppercase p-2">
                {lang === 'es' ? 'Enviar' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Floating Action Button (Mobile) --- */}
      {!showAIChat && (
        <div className="fixed bottom-8 right-8 md:hidden z-[150]">
          <button
            onClick={() => setShowAIChat(true)}
            className="bg-rose-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center animate-bounce"
          >
            <MessageCircle size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

