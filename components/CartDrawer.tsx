'use client';
import Link from 'next/link';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { ksh } from '@/lib/site';
import { orderLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export default function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, remove } = useCart();
  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={() => setOpen(false)} />
      <aside className="sheet right" role="dialog" aria-modal="true" aria-label="Your order">
        <div className="cart-inner">
          <div className="cart-head">
            <div>
              <div className="overline">Your selection</div>
              <h2>Ready to talk?</h2>
              <p className="small muted" style={{ marginTop: 4 }}>
                Review your products, then send the full selection to Skyline on WhatsApp.
              </p>
            </div>
            <button
              className="icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="cart-body">
            {items.length === 0 ? (
              <div className="empty">
                <ShoppingCart size={44} className="dim" />
                <div>
                  <div style={{ fontWeight: 600 }}>Your cart is empty</div>
                  <div className="small muted" style={{ marginTop: 4 }}>
                    Add priced products from the catalogue.
                  </div>
                </div>
                <button className="btn outline" onClick={() => setOpen(false)} type="button">
                  Keep browsing
                </button>
              </div>
            ) : (
              items.map((i) => (
                <div key={i.key} className="cart-item">
                  {i.image ? (
                    <img src={i.image} alt="" width={64} height={64} />
                  ) : (
                    <div
                      aria-hidden
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 10,
                        background: 'var(--elevated)',
                        flex: 'none',
                      }}
                    />
                  )}
                  <div className="cart-item-body">
                    <Link
                      href={`/products/${i.slug}`}
                      className="cart-item-title"
                      onClick={() => setOpen(false)}
                    >
                      {i.name}
                    </Link>
                    {(i.brand || i.model || i.condition) && (
                      <div className="cart-item-config">
                        {[i.brand, i.model, i.condition].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    {Object.keys(i.selected).length > 0 && (
                      <div className="cart-item-config">
                        {Object.entries(i.selected)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')}
                      </div>
                    )}
                    <div className="cart-item-price">{ksh(i.unitPrice)}</div>
                    <div className="cart-item-controls">
                      <div className="qty">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(i.key, i.qty - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span aria-live="polite">{i.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(i.key, i.qty + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn-link danger"
                        onClick={() => remove(i.key)}
                        aria-label={`Remove ${i.name}`}
                        type="button"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-foot">
              <div className="cart-totals">
                <span className="muted">Total items</span>
                <strong>{count}</strong>
                <span className="muted">Retail subtotal</span>
                <strong>{ksh(subtotal)}</strong>
              </div>
              <a
                className="btn block lg"
                href={orderLink(items)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                Send order on WhatsApp
              </a>
              <p className="small muted" style={{ textAlign: 'center', marginTop: 10 }}>
                Final availability and price confirmed on WhatsApp.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}