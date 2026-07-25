import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vertex CRM — Enterprise Revenue & Relationship Intelligence Platform',
  description: 'Billion-dollar SaaS CRM demo built with Next.js App Router, Framer Motion, and Recharts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Core fonts preloaded at startup */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@300;400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&family=Figtree:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Urbanist:wght@300;400;500;600;700&family=Albert+Sans:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* font-family is controlled dynamically via --font-body CSS var set by applyThemeVariables */}
      <body className="h-full antialiased select-none theme-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
