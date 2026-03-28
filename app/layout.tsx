import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { DottedSurface } from '@/components/ui/dotted-surface';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-[#080810] text-[#F0F4FF] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <DottedSurface />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
