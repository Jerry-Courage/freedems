import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './sections.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FREDEMS Young Professionals & Projects Network',
  description: 'A network connecting skilled young professionals, practical expertise and meaningful projects.',
  metadataBase: new URL('https://fslcgroup.com'),
  openGraph: { title: 'FREDEMS Young Professionals & Projects Network', description: 'Building Skills. Creating Opportunities. Delivering Projects.', type: 'website', images: [{ url: '/og.jpg', width: 1536, height: 864, alt: 'FREDEMS Young Professionals & Projects Network' }] },
  twitter: { card: 'summary_large_image', title: 'FREDEMS Young Professionals & Projects Network', description: 'Building Skills. Creating Opportunities. Delivering Projects.', images: ['/og.jpg'] },
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
