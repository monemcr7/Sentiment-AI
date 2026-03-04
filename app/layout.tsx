import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import LayoutClient from '@/components/LayoutClient';
import Footer from '@/components/Footer';
import { getHeaderFooter } from '@/lib/api';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

// Prevent static generation at build time — the WP API is not reachable from Vercel build servers
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Sentiment AI — Revenue Intelligence from Every Sales Call',
    template: '%s — Sentiment AI',
  },
  description:
    'Sentiment AI captures, analyzes, and scores every sales conversation — turning behavioral signals into actionable revenue insights that close deals faster.',
  icons: {
    icon: '/assets/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer } = await getHeaderFooter();

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <LayoutClient headerData={header}>{children}</LayoutClient>
        <Footer data={footer} />
      </body>
    </html>
  );
}
