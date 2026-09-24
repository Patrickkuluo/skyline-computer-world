'use client';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { canBuy } from '@/lib/types';
import { ksh } from '@/lib/site';
import { useCart } from './CartProvider';

export default function ProductBuy({ p }: { p: Product }) {
  const { add } = useCart();
  const [sel, setSel] = useState<Record<string, string>>(() => Object.fromEntries(p.options.filter((g) => g.choices.length).map((g) => [g.label, g.choices[0].value])));
  const [msg, setMsg] = useState('');
  const extra = p.options.reduce((n, g) => n + (g.choices.find((c) => c.value === sel[g.label])?.price ?? 0), 0);
  const price = p.price + extra;

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: p.name, url });
      else { await navigator.clipboard.writeText(url); setMsg('Link copied'); }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      try { await navigator.clipboard.writeText(url); setMsg('Link copied'); } catch { setMsg('Copy this page address from your browser'); }
    }
  }
  return (
    <div>
      {p.options.map((g) => (
        <div key={g.label} className="fgroup"><h3>{g.label}</h3>
          <div className="chips">{g.choices.map((c) => (
            <button key={c.value} className={`chip ${sel[g.label] === c.value ? 'on' : ''}`} aria-pressed={sel[g.label] === c.value} onClick={() => setSel({ ...sel, [g.label]: c.value })}>
              {c.value}{c.price > 0 ? ` (+${ksh(c.price)})` : ''}
            </button>))}
          </div>
        </div>
      ))}
      <div className="price" style={{ fontSize: 28 }}>{ksh(price)}</div>
      <div className="actions">
        <button className="btn" disabled={!canBuy(p)} onClick={() => add({ productId: p.id, slug: p.slug, name: p.name, brand: p.brand, model: p.model, condition: p.condition, availability: p.availability, image: p.images[0] ?? null, specs: p.specifications, selected: sel, unitPrice: price })}>
          {canBuy(p) ? 'Add to cart' : 'Out of stock'}
        </button>
        <button className="btn outline" onClick={share}>Share</button>
      </div>
      <p className="small muted" aria-live="polite">{msg}</p>
    </div>
  );
}
