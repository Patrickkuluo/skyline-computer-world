'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import type { Product } from '@/lib/types';
import {
  CATEGORY_GROUPS,
  matchesCategory,
  iconForCategory,
} from '@/lib/categories';
import ProductCard from './ProductCard';

const SPEC_KEYS = ['Processor', 'RAM', 'Storage'];
const uniq = (a: (string | null | undefined)[]) =>
  [...new Set(a.filter(Boolean) as string[])].sort();

export default function Catalogue({
  products,
  error,
}: {
  products: Product[];
  error: boolean;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [sheet, setSheet] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const q = sp.get('q') ?? '';
  const cat = sp.get('cat') ?? '';
  const brand = sp.get('brand') ?? '';
  const cond = sp.get('condition') ?? '';

  const specSel: Record<string, string> = {};
  SPEC_KEYS.forEach((k) => {
    const v = sp.get('s_' + k);
    if (v) specSel[k] = v;
  });
  const active = !!(q || cat || brand || cond || Object.keys(specSel).length);

  function set(key: string, val: string) {
    const n = new URLSearchParams(sp.toString());
    if (val && n.get(key) !== val) n.set(key, val);
    else n.delete(key);
    const s = n.toString();
    router.replace(`/${s ? '?' + s : ''}#catalogue`, { scroll: false });
  }
  const clearAll = () => router.replace('/#catalogue', { scroll: false });

  useEffect(() => {
    if (q || cat) document.getElementById('catalogue')?.scrollIntoView();
  }, [q, cat]);

  const brands = useMemo(() => uniq(products.map((p) => p.brand)), [products]);
  const conds = useMemo(() => uniq(products.map((p) => p.condition)), [products]);
  const specOpts = useMemo(
    () =>
      Object.fromEntries(
        SPEC_KEYS.map((k) => [k, uniq(products.map((p) => p.specifications[k]))]),
      ),
    [products],
  );

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => {
      if (!matchesCategory(p.category, cat)) return false;
      if (brand && p.brand !== brand) return false;
      if (cond && p.condition !== cond) return false;
      for (const [k, v] of Object.entries(specSel)) {
        if (p.specifications[k] !== v) return false;
      }
      if (!t) return true;
      const hay = [p.name, p.brand, p.model, p.category, p.description, ...Object.values(p.specifications)]
        .join(' ')
        .toLowerCase();
      return t.split(/\s+/).every((w) => hay.includes(w));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, q, cat, brand, cond, sp.toString()]);

  const Chips = ({
    label,
    param,
    values,
    current,
  }: {
    label: string;
    param: string;
    values: string[];
    current: string;
  }) =>
    values.length === 0 ? null : (
      <div className="fgroup">
        <h3>{label}</h3>
        <div className="chips">
          {values.map((v) => (
            <button
              key={v}
              className={`chip ${current === v ? 'on' : ''}`}
              aria-pressed={current === v}
              onClick={() => set(param, v)}
              type="button"
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );

  const panel = (
    <div>
      <div className="fgroup">
        <h3>Category</h3>
        <button
          className={`list-item all ${!cat ? 'on' : ''}`}
          onClick={() => set('cat', '')}
          type="button"
        >
          View all
        </button>
        {CATEGORY_GROUPS.map((g) => {
          const GroupIcon = g.icon;
          const groupOn = cat === g.name;
          const showAll = expanded[g.name] || g.items.length <= 4;
          const visibleItems = showAll ? g.items : g.items.slice(0, 4);
          return (
            <div key={g.name} style={{ marginTop: 4 }}>
              <button
                className={`list-item ${groupOn ? 'on' : ''}`}
                onClick={() => set('cat', g.name)}
                type="button"
              >
                <GroupIcon size={16} className="li-icon" />
                {g.name}
              </button>
              {visibleItems.map((i) => {
                const ItemIcon = iconForCategory(i);
                return (
                  <button
                    key={i}
                    className={`list-item sub ${cat === i ? 'on' : ''}`}
                    onClick={() => set('cat', i)}
                    type="button"
                  >
                    <ItemIcon size={14} className="li-icon" />
                    {i}
                  </button>
                );
              })}
              {g.items.length > 4 && (
                <button
                  className="list-item sub"
                  style={{ color: 'var(--red)', fontWeight: 600 }}
                  onClick={() =>
                    setExpanded((e) => ({ ...e, [g.name]: !e[g.name] }))
                  }
                  type="button"
                >
                  {expanded[g.name] ? (
                    <>
                      <ChevronUp size={14} className="li-icon" /> Show fewer
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} className="li-icon" /> Show all {g.items.length}
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Chips label="Brand" param="brand" values={brands} current={brand} />
      <Chips label="Condition" param="condition" values={conds} current={cond} />
      {SPEC_KEYS.map((k) => (
        <Chips key={k} label={k} param={'s_' + k} values={specOpts[k]} current={specSel[k] ?? ''} />
      ))}
    </div>
  );

  return (
    <section id="catalogue" className="section wrap" aria-labelledby="cat-h">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 id="cat-h">
          Catalogue{q ? `: “${q}”` : ''}
        </h2>
        <button
          className="btn outline sm mobile-only"
          onClick={() => setSheet(true)}
          type="button"
        >
          <SlidersHorizontal size={14} />
          Filters{active ? ' (on)' : ''}
        </button>
      </div>

      <div className="layout">
        <aside className="aside" aria-label="Filters">
          {panel}
        </aside>
        <div>
          {error ? (
            <div className="notice err">
              <h3>We couldn’t load the catalogue</h3>
              <p>Please refresh the page. If it keeps happening, message us on WhatsApp.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="notice empty">
              <h3>No products yet</h3>
              <p className="muted">
                Our catalogue is being updated. Message us on WhatsApp to ask what’s available.
              </p>
            </div>
          ) : shown.length === 0 ? (
            <div className="notice empty">
              <h3>No products match</h3>
              <p className="muted">Try a different search or remove some filters.</p>
              <button className="btn" onClick={clearAll} type="button">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="small muted" aria-live="polite" style={{ marginBottom: 12 }}>
                {shown.length} product{shown.length === 1 ? '' : 's'}
              </p>
              <div className="grid">
                {shown.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {active && (
        <button className="btn floating-clear" onClick={clearAll} type="button">
          Clear filters
        </button>
      )}

      {sheet && (
        <>
          <div className="overlay" onClick={() => setSheet(false)} />
          <div className="sheet bottom" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
              <h2>Filters</h2>
              <button className="btn ghost sm" onClick={() => setSheet(false)} type="button">
                Done
              </button>
            </div>
            {panel}
            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn outline" onClick={clearAll} type="button">
                Clear filters
              </button>
              <button className="btn" onClick={() => setSheet(false)} type="button">
                Show {shown.length} result{shown.length === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}