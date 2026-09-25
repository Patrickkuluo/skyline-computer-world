import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { SITE } from '@/lib/site';

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const DESC =
  'Laptops, desktops, phones, tablets, accessories, networking and CCTV at Terry House, Mfangano Street, Nairobi CBD. Countrywide delivery via SpeedAF. Order on WhatsApp.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Computers, phones and accessories in Nairobi`,
    template: `%s | ${SITE.name}`,
  },
  description: DESC,
  openGraph: {
    siteName: SITE.name,
    type: 'website',
    locale: 'en_KE',
    title: SITE.name,
    description: DESC,
    images: ['/logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: DESC,
    images: ['/logo.jpg'],
  },
};

const themeScript = `try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;

const storeJson = {
  '@context': 'https://schema.org',
  '@type': 'ComputerStore',
  '@id': `${SITE.url}#store`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/logo.jpg`,
  telephone: `+${SITE.whatsapp}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Terry House, Mfangano Street, Shop G15',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi CBD',
    addressCountry: 'KE',
  },
  hasMap: SITE.maps,
  areaServed: 'KE',
  currenciesAccepted: 'KES',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJson) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}