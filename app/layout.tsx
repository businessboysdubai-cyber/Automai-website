import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Automai — AI Automation Agency',
  description:
    'Progettiamo e implementiamo AI agents personalizzati che eliminano il lavoro manuale, accelerano i tuoi processi e moltiplicano la produttività del tuo team.',
  keywords: ['AI agents', 'automazione', 'intelligenza artificiale', 'workflow', 'AI automation'],
  openGraph: {
    title: 'Automai — AI Automation Agency',
    description: 'AI agents su misura per automatizzare il tuo business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className="h-full"
      style={{ colorScheme: 'dark' }}
    >
      <head>
        {/*
          Preconnect to Google Fonts.
          Fonts load client-side; if unavailable the CSS fallback stack is used.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts are loaded via CSS @import in globals.css so SSR never blocks on them */}
      </head>
      <body className="min-h-full bg-[#050510] text-[#F0F4FF] antialiased">
        {children}
      </body>
    </html>
  );
}
