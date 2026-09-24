import type { Metadata } from 'next';
import { Poppins, Nunito } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { SITE } from '@/lib/site';

const head = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-head', display: 'swap' });
const body = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-body', display: 'swap' });

const DESC = 'Laptops, desktops, phones, tablets, accessories, networking and CCTV at Terry House, Mfangano Street, Nairobi CBD. Countrywide delivery via SpeedAF. Order on WhatsApp.';
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Computers, phones and accessories in Nairobi`, template: `%s | ${SITE.name}` },
  description: DESC,
  openGraph: { siteName: SITE.name, type: 'website', locale: 'en_KE', title: SITE.name, description: DESC, images: ['/logo.jpg'] },
};

const themeScript = `try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;
const storeJson = {
  '@context': 'https://schema.org', '@type': 'ComputerStore', name: SITE.name, url: SITE.url, image: `${SITE.url}/logo.jpg`,
  address: { '@type': 'PostalAddress', streetAddress: 'Terry House, Mfangano Street, Shop G15', addressLocality: 'Nairobi', addressCountry: 'KE' },
  hasMap: SITE.maps, areaServed: 'KE', currenciesAccepted: 'KES',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJson) }} />
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
