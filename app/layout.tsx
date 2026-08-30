import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './sections.css';
import './prime.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FREDEMS PRIME LIMITED COMPANY',
  description: 'A diversified Ghanaian business group creating trusted solutions and sustainable ventures.',
  metadataBase: new URL('https://fslcgroup.com'),
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
