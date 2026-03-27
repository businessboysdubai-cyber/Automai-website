// ─── Brand ───────────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Automai',
  logo: 'AGNT',
  tagline: 'AI Automation Agency',
} as const;

// ─── Colors ──────────────────────────────────────────────────────────────────
export const COLORS = {
  background: '#050510',
  electricBlue: '#4F8EF7',
  neonCyan: '#00D4FF',
  violet: '#7B61FF',
  white: '#F0F4FF',
  muted: '#8892A4',
} as const;

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Servizi', href: '#features' },
  { label: 'Come funziona', href: '#how-it-works' },
  { label: 'Contatti', href: '#cta' },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HERO = {
  badge: 'AI Automation Agency',
  headline1: 'Automatizza il tuo',
  headline2: 'business con',
  headline3: 'AI Agents',
  subheadline:
    'Progettiamo e implementiamo AI agents personalizzati che eliminano il lavoro manuale, accelerano i tuoi processi e moltiplicano la produttività del tuo team.',
  cta_primary: 'Inizia ora',
  cta_secondary: 'Scopri come',
  stats: [
    { value: '10×', label: 'Produttività' },
    { value: '−80%', label: 'Costi operativi' },
    { value: '24/7', label: 'Operatività' },
  ],
} as const;

// ─── Features ────────────────────────────────────────────────────────────────
export const FEATURES = {
  heading: 'Cosa costruiamo per te',
  subheading:
    'AI agents su misura che si integrano perfettamente nel tuo stack tecnologico e nei tuoi flussi di lavoro.',
  items: [
    {
      icon: 'brain',
      title: 'AI Agents Intelligenti',
      description:
        'Agenti autonomi alimentati da LLM di ultima generazione che ragionano, pianificano ed eseguono task complessi in modo indipendente.',
      color: '#4F8EF7',
    },
    {
      icon: 'network',
      title: 'Automazione dei Processi',
      description:
        'Eliminiamo i workflow ripetitivi con pipeline end-to-end: da data extraction a reportistica, zero intervento umano.',
      color: '#00D4FF',
    },
    {
      icon: 'integration',
      title: 'Integrazioni Native',
      description:
        'Connettiamo gli AI agents ai tuoi sistemi esistenti: CRM, ERP, email, Slack, database e oltre 500 app via API.',
      color: '#7B61FF',
    },
  ],
} as const;

// ─── How It Works ─────────────────────────────────────────────────────────────
export const HOW_IT_WORKS = {
  heading: 'Dal problema al risultato',
  subheading: 'Un processo snello e collaudato per portare l\'AI nella tua azienda in settimane, non mesi.',
  steps: [
    {
      number: '01',
      title: 'Analisi',
      description:
        'Studiamo i tuoi processi, identifichiamo i colli di bottiglia e definiamo i KPI di successo. Workshop di 2-3 giorni con il tuo team.',
      color: '#4F8EF7',
    },
    {
      number: '02',
      title: 'Automazione',
      description:
        'Progettiamo e sviluppiamo gli AI agents personalizzati, li integriamo nei tuoi sistemi e li addestriamo sui tuoi dati.',
      color: '#00D4FF',
    },
    {
      number: '03',
      title: 'Risultati',
      description:
        'Monitoraggio continuo, ottimizzazione iterativa e supporto dedicato. Misuri il ROI fin dal primo giorno di deploy.',
      color: '#7B61FF',
    },
  ],
} as const;

// ─── CTA Section ─────────────────────────────────────────────────────────────
export const CTA_SECTION = {
  heading: 'Pronto a trasformare il tuo business?',
  subheading:
    'Prenota una consulenza gratuita di 30 minuti. Analizziamo insieme i tuoi processi e ti mostriamo dove l\'AI può fare la differenza.',
  placeholder: 'La tua email aziendale',
  cta: 'Prenota la consulenza',
  disclaimer: 'Nessuno spam. Solo valore.',
  social_proof: 'Oltre 40 aziende stanno già automatizzando con Automai',
} as const;

// ─── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  copy: `© ${new Date().getFullYear()} Automai. Tutti i diritti riservati.`,
  links: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Termini di Servizio', href: '#' },
  ],
} as const;
