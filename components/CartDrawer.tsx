'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { ksh } from '@/lib/site';
import { orderLink } from '@/lib/whatsapp';

export default function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, remove } = useCart();
  if (!open) return null;
  return (
    <>
      <div className="overlay" onClick={() => setOpen(false)} />
      <aside className="sheet right" role="dialog" aria-modal="true" aria-label="Your order">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2>Your order</h2>
          <button className="btn ghost sm" onClick={() => setOpen(false)}>Close</button>
        </div>
        {items.length === 0 ? (
          <div className="empty"><p>Your order is empty.</p><button className="btn" onClick={() => setOpen(false)}>Keep browsing</button></div>
        ) : (
          <>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {items.map((i) => (
                <div key={i.key} className="row" style={{ alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)', flexWrap: 'nowrap' }}>
                  {i.image && <img src={i.image} alt="" width={64} height={64} style={{ borderRadius: 8, objectFit: 'cover' }} />}
                  <div style={{ flex: 1 }}>
                    <Link href={`/products/${i.slug}`} onClick={() => setOpen(false)} style={{ fontWeight: 700, color: 'var(--text)' }}>{i.name}</Link>
                    {Object.entries(i.selected).map(([k, v]) => <div key={k} className="small muted">{k}: {v}</div>)}
                    <div>{ksh(i.unitPrice)}</div>
                    <div className="row" style={{ marginTop: 6 }}>
                      <div className="qty">
                        <button aria-label="Decrease quantity" onClick={() => setQty(i.key, i.qty - 1)}>−</button>
                        <span>{i.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                      </div>
                      <button className="btn ghost sm" onClick={() => remove(i.key)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 12 }}>
              <div className="row" style={{ justifyContent: 'space-between' }}><span>Total items</span><strong>{count}</strong></div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}><span>Retail subtotal</span><strong>{ksh(subtotal)}</strong></div>
              <a className="btn block" href={orderLink(items)} target="_blank" rel="noopener noreferrer">Send order on WhatsApp</a>
              <p className="small muted">We confirm availability, delivery and the final price with you on WhatsApp.</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
