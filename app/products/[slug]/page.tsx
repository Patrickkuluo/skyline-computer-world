import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getVariantSiblings } from '@/lib/products';
import { groupOf } from '@/lib/categories';
import { SITE, ksh } from '@/lib/site';
import Gallery from '@/components/Gallery';
import ProductBuy from '@/components/ProductBuy';
import StatusChip from '@/components/StatusChip';
import VariantSiblings from '@/components/VariantSiblings';

export const revalidate = 30;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { product: p } = await getProduct(slug);
  if (!p) return { title: 'Product not found' };
  const specs = Object.entries(p.specifications)
    .slice(0, 4)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
  const desc =
    (p.description?.slice(0, 150) || `${p.name} at ${SITE.name}, Nairobi.`) +
    ` ${ksh(p.price)}. ${p.availability}.${specs ? ' ' + specs + '.' : ''}`;
  const url = `${SITE.url}/products/${p.slug}`;
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: p.name,
      description: desc,
      url,
      type: 'website',
      images: p.images[0] ? [p.images[0]] : ['/logo.jpg'],
    },
  };
}

const AV = {
  'In Stock': 'InStock',
  'Available on Order': 'PreOrder',
  'Out of Stock': 'OutOfStock',
} as const;

const COND: Record<string, string> = {
  new: 'NewCondition',
  used: 'UsedCondition',
  refurbished: 'RefurbishedCondition',
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { product: p, error } = await getProduct(slug);

  if (error) {
    return (
      <div className="wrap section">
        <div className="notice err">
          <h2>We couldn’t load this product</h2>
          <p>
            Please refresh the page or{' '}
            <Link href="/#catalogue">go back to the catalogue</Link>.
          </p>
        </div>
      </div>
    );
  }
  if (!p) notFound();

  const siblings = await getVariantSiblings(p);
  const group = groupOf(p.category);

  const specs: [string, string][] = [
    ...(p.brand ? [['Brand', p.brand] as [string, string]] : []),
    ...(p.model ? [['Model', p.model] as [string, string]] : []),
    ...(p.condition ? [['Condition', p.condition] as [string, string]] : []),
    ...Object.entries(p.specifications).filter(([, v]) => v),
  ];

  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: p.images,
    description: p.description ?? undefined,
    sku: p.id,
    brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
    model: p.model ?? undefined,
    category: p.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: p.price,
      availability: `https://schema.org/${AV[p.availability]}`,
      itemCondition:
        p.condition && COND[p.condition.toLowerCase()]
          ? `https://schema.org/${COND[p.condition.toLowerCase()]}`
          : undefined,
      url: `${SITE.url}/products/${p.slug}`,
      seller: { '@type': 'Organization', name: SITE.name },
    },
  };

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        <Link href={`/?cat=${encodeURIComponent(p.category)}#catalogue`}>
          {group ? `${group}: ` : ''}
          {p.category}
        </Link>
        <span className="sep">›</span>
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="pdp">
        <Gallery images={p.images} name={p.name} />
        <div>
          {p.brand && <span className="pbrand">{p.brand}</span>}
          <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginTop: 6 }}>
            {p.name}
          </h1>
          <p style={{ marginTop: 12 }}>
            <StatusChip value={p.availability} />
          </p>
          <ProductBuy p={p} />
          <p className="small muted">
            Countrywide delivery via {SITE.courier}. Delivery charges depend on destination.
            Final availability and price are confirmed on WhatsApp.
          </p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        {specs.length > 0 && (
          <>
            <h2>Specifications</h2>
            <div className="card" style={{ marginTop: 12 }}>
              <table className="spec">
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {p.description && (
          <>
            <h2 style={{ marginTop: specs.length > 0 ? 32 : 0 }}>Description</h2>
            <p style={{ maxWidth: '70ch', whiteSpace: 'pre-line' }}>{p.description}</p>
          </>
        )}

        <VariantSiblings siblings={siblings} current={p} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </div>
  );
}