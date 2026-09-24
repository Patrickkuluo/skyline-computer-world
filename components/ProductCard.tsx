'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { canBuy } from '@/lib/types';
import { ksh } from '@/lib/site';
import { useCart } from './CartProvider';
import StatusChip from './StatusChip';

const PREF = ['Processor', 'RAM', 'Storage', 'Screen', 'Display'];
export function highlights(p: Product) {
  const e = Object.entries(p.specifications).filter(([, v]) => v);
  const pref = PREF.map((k) => e.find(([kk]) => kk.toLowerCase() === k.toLowerCase())).filter(Boolean) as [string, string][];
  return (pref.length ? pref : e).slice(0, 3);
}

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [broken, setBroken] = useState(false);
  const hasOptions = p.options.length > 0;
  const from = hasOptions && p.options.some((g) => g.choices.some((c) => c.price > 0));
  return (
    <article className="card pcard">
      <Link href={`/products/${p.slug}`} className="pimg" aria-label={p.name}>
        {p.images[0] && !broken ? <img src={p.images[0]} alt={p.name} loading="lazy" onError={() => setBroken(true)} /> : <div className="empty small muted">No image</div>}
      </Link>
      <div className="pbody">
        {p.brand && <span className="small muted">{p.brand}</span>}
        <h3><Link href={`/products/${p.slug}`}>{p.name}</Link></h3>
        <div className="price">{from ? 'From ' : ''}{ksh(p.price)}</div>
        <div className="row"><StatusChip value={p.availability} />{p.condition && <span className="small muted">{p.condition}</span>}</div>
        <ul className="hl">{highlights(p).map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {!canBuy(p) ? <button className="btn block" disabled>Out of stock</button>
            : hasOptions ? <Link className="btn block" href={`/products/${p.slug}`}>Choose options</Link>
            : <button className="btn block" onClick={() => add({ productId: p.id, slug: p.slug, name: p.name, brand: p.brand, model: p.model, condition: p.condition, availability: p.availability, image: p.images[0] ?? null, specs: p.specifications, selected: {}, unitPrice: p.price })}>Add to cart</button>}
        </div>
      </div>
    </article>
  );
}
