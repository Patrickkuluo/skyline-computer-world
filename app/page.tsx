import { Suspense } from 'react';
import Link from 'next/link';
import Catalogue from '@/components/Catalogue';
import { getProducts } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/lib/categories';
import { SITE } from '@/lib/site';

export const revalidate = 30;

const FAQ = [
  { q: 'How do I order from Skyline Computer World?', a: 'Add products to your cart, then send the order to us on WhatsApp. You don’t need an account. We confirm availability, delivery and the final price with you there.' },
  { q: 'Do you deliver outside Nairobi?', a: `Yes. We deliver countrywide via ${SITE.courier}. Delivery charges depend on your destination.` },
  { q: 'Where is your shop?', a: `${SITE.address}.` },
  { q: 'Are the prices on the site final?', a: 'Prices shown are our retail prices in KSh. Final availability and price are confirmed on WhatsApp.' },
];

export default async function Home() {
  const { products, error } = await getProducts();
  const faqJson = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      <section className="hero wrap">
        <h1>Computers, phones and accessories in Nairobi CBD</h1>
        <p className="muted">Browse our catalogue, build your order, and send it to us on WhatsApp. Prices, condition and availability are shown on every product.</p>
        <div className="actions"><a className="btn" href="#catalogue">Browse catalogue</a><a className="btn outline" href="#store">Visit our store</a></div>
      </section>
      <section className="wrap" aria-label="Shop by category">
        <div className="tiles">
          {CATEGORY_GROUPS.map((g) => (
            <Link key={g.name} className="tile" href={`/?cat=${encodeURIComponent(g.name)}#catalogue`}>{g.name}<small>{g.items.join(', ')}</small></Link>
          ))}
        </div>
      </section>
      <Suspense fallback={<div className="wrap section" id="catalogue">Loading catalogue…</div>}>
        <Catalogue products={products} error={error} />
      </Suspense>
      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Common questions</h2>
        {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p className="muted">{f.a}</p></details>)}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      </section>
    </>
  );
}
