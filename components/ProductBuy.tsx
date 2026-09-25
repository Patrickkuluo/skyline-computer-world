'use client';
import { useState } from 'react';
import { Check, Share2, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { canBuy } from '@/lib/types';
import { ksh } from '@/lib/site';
import { useCart } from './CartProvider';

export default function ProductBuy({ p }: { p: Product }) {
  const { add } = useCart();
  const [msg, setMsg] = useState('');
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      p.options
        .filter((g) => g.choices.length)
        .map((g) => [g.label, g.choices[0].value]),
    ),
  );
  const buyable = canBuy(p);

  const extra = p.options.reduce((n, g) => {
    const c = g.choices.find((c) => c.value === selected[g.label]);
    return n + (c?.price ?? 0);
  }, 0);
  const unitPrice = p.price + extra;

  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) await navigator.share({ title: p.name, url });
      else {
        await navigator.clipboard.writeText(url);
        setMsg('Link copied');
        setTimeout(() => setMsg(''), 2000);
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(url);
        setMsg('Link copied');
        setTimeout(() => setMsg(''), 2000);
      } catch {
        setMsg('Copy this page address from your browser');
      }
    }
  }

  function onAdd() {
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
      selected,
      unitPrice,
    });
  }

  return (
    <div>
      {p.options.length > 0 && (
        <div style={{ marginTop: 18 }}>
          {p.options.map((g) => (
            <div key={g.label} className="fgroup">
              <h3>{g.label}</h3>
              <div className="chips">
                {g.choices.map((c) => (
                  <button
                    key={c.value}
                    className={`chip ${selected[g.label] === c.value ? 'on' : ''}`}
                    aria-pressed={selected[g.label] === c.value}
                    onClick={() => setSelected({ ...selected, [g.label]: c.value })}
                    type="button"
                  >
                    {c.value}
                    {c.price > 0 ? ` (+${ksh(c.price)})` : ''}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="price-lg" style={{ marginTop: p.options.length ? 8 : 0 }}>
        {ksh(unitPrice)}
      </div>
      <div className="actions">
        <button className="btn lg" disabled={!buyable} onClick={onAdd} type="button">
          <ShoppingCart size={16} />
          {buyable ? 'Add to cart' : 'Out of stock'}
        </button>
        <button className="btn outline lg" onClick={share} type="button">
          <Share2 size={16} />
          Share
        </button>
      </div>
      <p className="small muted" aria-live="polite" style={{ minHeight: 20, marginTop: 6 }}>
        {msg === 'Link copied' ? (
          <span style={{ color: 'var(--ok)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Check size={14} /> Link copied
          </span>
        ) : (
          msg
        )}
      </p>
    </div>
  );
}