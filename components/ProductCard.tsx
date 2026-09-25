'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { canBuy } from '@/lib/types';
import { ksh } from '@/lib/site';
import { useCart } from './CartProvider';
import StatusChip from './StatusChip';

const PREF = ['Processor', 'RAM', 'Storage', 'Screen', 'Display'];

export function highlights(p: Product) {
  const entries = Object.entries(p.specifications).filter(([, v]) => v);
  const pref = PREF
    .map((k) => entries.find(([kk]) => kk.toLowerCase() === k.toLowerCase()))
    .filter(Boolean) as [string, string][];
  return (pref.length ? pref : entries).slice(0, 3);
}

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [broken, setBroken] = useState(false);
  const buyable = canBuy(p);

  return (
    <article className="card pcard">
      <Link href={`/products/${p.slug}`} className="pimg" aria-label={p.name}>
        {p.images[0] && !broken ? (
          <img src={p.images[0]} alt={p.name} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="empty small muted" style={{ padding: 0 }}>No image</div>
        )}
      </Link>

      <div className="pbody">
        {p.brand && <span className="pbrand">{p.brand}</span>}
        <h3>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <div className="price">{ksh(p.price)}</div>
        <div className="row" style={{ gap: 8 }}>
          <StatusChip value={p.availability} />
          {p.condition && <span className="small dim">{p.condition}</span>}
        </div>
        <ul className="hl">
          {highlights(p).map(([k, v]) => (
            <li key={k}>
              {k}: {v}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 'auto', paddingTop: 10 }}>
          {!buyable ? (
            <button className="btn block" disabled type="button">
              Out of stock
            </button>
          ) : (
            <button
              className="btn block"
              onClick={() =>
                add({
                  productId: p.id,
                  slug: p.slug,
                  name: p.name,
                  brand: p.brand,
                  model: p.model,
                  condition: p.condition,
                  availability: p.availability,
                  image: p.images[0] ?? null,
                  specs: p.specifications,
                  selected: {},
                  unitPrice: p.price,
                })
              }
              type="button"
            >
              <ShoppingCart size={16} />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}