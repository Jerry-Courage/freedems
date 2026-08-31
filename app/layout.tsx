import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';
import './globals.css';
import './sections.css';
import './prime.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'FREDEMS PRIME LIMITED COMPANY',
  description: 'A diversified Ghanaian business group creating trusted solutions and sustainable ventures.',
  metadataBase: new URL('https://fplcgroup.com'),
  openGraph: { title: 'FREDEMS PRIME LIMITED COMPANY', description: 'Trusted services. Innovative solutions. Sustainable businesses.', type: 'website', images: [{ url: '/og-prime.png', width: 1536, height: 864, alt: 'FREDEMS PRIME LIMITED COMPANY' }] },
  twitter: { card: 'summary_large_image', title: 'FREDEMS PRIME LIMITED COMPANY', description: 'Trusted services. Innovative solutions. Sustainable businesses.', images: ['/og-prime.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
