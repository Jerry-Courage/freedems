import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FSLC — Building businesses that move life forward',
  description: 'FREDEMS Solutions Limited Company is a diversified Ghanaian business group spanning real estate, agribusiness, logistics, imports and enterprise.',
  metadataBase: new URL('https://fslcgroup.com'),
  openGraph: { title: 'FSLC — One Group. Four Businesses.', description: 'Trusted solutions. Sustainable businesses. Meaningful impact.', type: 'website' },
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
