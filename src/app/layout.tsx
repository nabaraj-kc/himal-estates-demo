import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { brand } from '@/config/brand';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description:
    'Discover verified rooms, flats, houses, land (ropani/aana), shops, hotels, and running businesses for sale and rent across Kathmandu, Lalitpur, Bhaktapur, and Pokhara.',
  keywords: [
    'Nepal Real Estate',
    'Kathmandu Flats for Rent',
    'House for sale in Lalitpur',
    'Land for sale Nepal',
    'Jhamsikhel apartment',
    'Pokhara real estate',
    'Commercial shop for rent Kathmandu',
    'Himal Estates',
  ],
  authors: [{ name: brand.name }],
  metadataBase: new URL(`https://${brand.domain}`),
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      'Connecting verified property owners with serious buyers across Nepal. 100% inspected listings with transparent middleman advisory.',
    type: 'website',
    locale: 'ne_NP',
    siteName: brand.name,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${notoSansDevanagari.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111827] overflow-x-hidden selection:bg-teal-700 selection:text-white pb-20 md:pb-0">
        <LanguageProvider>
          {children}
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
