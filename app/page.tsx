import { Suspense } from 'react';
import Link from 'next/link';
import { Truck, MapPin, MessageCircle, ShieldCheck, Store } from 'lucide-react';
import Catalogue from '@/components/Catalogue';
import Reveal from '@/components/Reveal';
import { WhatsAppIcon } from '@/components/icons';
import { getProducts } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/lib/categories';
import { SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/whatsapp';

export const revalidate = 30;

const FAQ = [
  {
    q: 'How do I order from Skyline Computer World?',
    a: 'Add products to your cart, then send the order to us on WhatsApp. You don’t need an account. We confirm availability, delivery and the final price with you there.',
  },
  {
    q: 'Do you deliver outside Nairobi?',
    a: `Yes. We deliver countrywide via ${SITE.courier}. Delivery charges depend on your destination.`,
  },
  {
    q: 'Where is your shop?',
    a: `${SITE.address}.`,
  },
  {
    q: 'Are the prices on the site final?',
    a: 'Prices shown are our retail prices in KSh. Final availability and price are confirmed on WhatsApp.',
  },
];

const TRUST = [
  { icon: Truck, label: `Countrywide delivery via ${SITE.courier}` },
  { icon: MapPin, label: 'Physical store in Nairobi CBD' },
  { icon: MessageCircle, label: 'WhatsApp support' },
  { icon: ShieldCheck, label: 'Verified product information' },
];

export default async function Home() {
  const { products, error } = await getProducts();
  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Reveal>
            <span className="overline">Nairobi · CBD</span>
            <h1 style={{ marginTop: 12 }}>
              Computers, phones and accessories in Nairobi CBD
            </h1>
            <p className="lead">
              Browse our catalogue, build your order, and send it to us on WhatsApp. Prices,
              condition and availability are shown on every product — what you see is what you get.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="actions">
              <a className="btn lg" href="#catalogue">Browse catalogue</a>
              <a className="btn outline lg" href="#store">Visit our store</a>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="trust" role="list" aria-label="Why buy from Skyline">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="trust-item" role="listitem">
                  <Icon size={18} aria-hidden />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap section" aria-label="Shop by category">
        <Reveal>
          <div className="tiles">
            {CATEGORY_GROUPS.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.name}
                  className="tile"
                  href={`/?cat=${encodeURIComponent(g.name)}#catalogue`}
                >
                  <span className="tile-icon" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <span>
                    {g.name}
                    <small>{g.items.join(', ')}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      <Suspense fallback={<div className="wrap section" id="catalogue">Loading catalogue…</div>}>
        <Catalogue products={products} error={error} />
      </Suspense>

      <section className="wrap section" id="store" aria-labelledby="store-h">
        <Reveal>
          <div className="store-card">
            <div>
              <span className="overline">Visit us</span>
              <h2 id="store-h" style={{ marginTop: 8 }}>
                Our showroom in Nairobi CBD
              </h2>
              <address>
                <strong style={{ color: 'var(--text)' }}>{SITE.name}</strong>
                <br />
                Terry House, Mfangano Street
                <br />
                Shop G15, Ground Floor
                <br />
                Nairobi CBD, Kenya
              </address>
              <div className="actions" style={{ marginTop: 16 }}>
                <a
                  className="btn"
                  href={SITE.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={16} />
                  Get directions
                </a>
                <a
                  className="btn outline"
                  href={whatsappLink('Hello Skyline Computers, I would like to visit your store.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={16} />
                  Chat before you visit
                </a>
              </div>
            </div>
            <div className="store-visual" aria-hidden>
              <Store size={64} />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-h">
        <Reveal>
          <span className="overline">Common questions</span>
          <h2 id="faq-h" style={{ marginTop: 8, marginBottom: 16 }}>
            Quick answers
          </h2>
        </Reveal>
        {FAQ.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          </Reveal>
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />
      </section>
    </>
  );
}