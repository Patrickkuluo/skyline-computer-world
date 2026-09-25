import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { ksh } from '@/lib/site';
import StatusChip from './StatusChip';

const PREF = ['Processor', 'RAM', 'Storage', 'Screen', 'Display'];

function configLine(p: Product) {
  const entries = Object.entries(p.specifications).filter(([, v]) => v);
  const pref = PREF
    .map((k) => entries.find(([kk]) => kk.toLowerCase() === k.toLowerCase()))
    .filter(Boolean) as [string, string][];
  const picks = (pref.length ? pref : entries).slice(0, 3);
  return picks.map(([, v]) => v).join(' · ');
}

export default function VariantSiblings({
  siblings,
  current,
}: {
  siblings: Product[];
  current: Product;
}) {
  if (siblings.length === 0) return null;
  const all = [current, ...siblings].sort((a, b) => a.price - b.price);

  return (
    <section style={{ marginTop: 40 }} aria-labelledby="siblings-h">
      <h2 id="siblings-h">
        Other configurations of {current.brand} {current.model}
      </h2>
      <p className="small muted" style={{ marginTop: 4 }}>
        Each configuration is a distinct product with its own price and availability.
      </p>
      <div className="grid" style={{ marginTop: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {all.map((p) => {
          const isCurrent = p.id === current.id;
          const config = configLine(p);
          return (
            <article
              key={p.id}
              className="card"
              style={{
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                borderColor: isCurrent ? 'var(--red)' : undefined,
              }}
            >
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <StatusChip value={p.availability} />
                {isCurrent && (
                  <span className="small" style={{ color: 'var(--red)', fontWeight: 600 }}>
                    Viewing
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 600, fontSize: '.9375rem', lineHeight: 1.35 }}>
                {config || p.name}
              </div>
              <div className="price">{ksh(p.price)}</div>
              {isCurrent ? (
                <span className="btn outline block" aria-disabled="true" style={{ marginTop: 'auto' }}>
                  Current selection
                </span>
              ) : (
                <Link
                  className="btn block"
                  href={`/products/${p.slug}`}
                  style={{ marginTop: 'auto' }}
                >
                  View &amp; add
                  <ArrowRight size={14} />
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}