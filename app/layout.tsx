import type { Metadata } from 'next';
import { Schibsted_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-schibsted',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://berrybank.app'),
  title: {
    default: 'Berry Bank | Local fundraising in San Antonio',
    template: '%s | Berry Bank',
  },
  description:
    'Berry Bank builds crowdfunding and personal fundraising tools for individuals and local organizations. Our first platform, the Green Hub, connects environmental projects with supporters in their own community.',
  openGraph: {
    title: 'Berry Bank | Local fundraising in San Antonio',
    description:
      'Crowdfunding and personal fundraising built around the people closest to the cause. San Antonio, Texas.',
    url: 'https://berrybank.app',
    siteName: 'Berry Bank',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berry Bank | Local fundraising in San Antonio',
    description:
      'Crowdfunding and personal fundraising built around the people closest to the cause.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
