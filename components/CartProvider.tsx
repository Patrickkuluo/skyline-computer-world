'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { cartCount, cartSubtotal, type CartItem } from '@/lib/whatsapp';

type Ctx = {
  items: CartItem[]; count: number; subtotal: number; open: boolean; setOpen: (o: boolean) => void;
  add: (i: Omit<CartItem, 'key' | 'qty'>) => void; setQty: (key: string, q: number) => void; remove: (key: string) => void;
};
const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error('CartProvider missing'); return c; };
const KEY = 'skyline-cart-v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { try { const r = localStorage.getItem(KEY); if (r) setItems(JSON.parse(r)); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items, ready]);

  const add = useCallback((i: Omit<CartItem, 'key' | 'qty'>) => {
    const key = `${i.productId}|${JSON.stringify(Object.entries(i.selected).sort())}`;
    setItems((cur) => cur.some((c) => c.key === key)
      ? cur.map((c) => (c.key === key ? { ...c, qty: c.qty + 1 } : c))
      : [...cur, { ...i, key, qty: 1 }]);
    setOpen(true);
  }, []);
  const setQty = (key: string, q: number) => setItems((cur) => cur.map((c) => (c.key === key ? { ...c, qty: Math.max(1, q) } : c)));
  const remove = (key: string) => setItems((cur) => cur.filter((c) => c.key !== key));

  return <CartCtx.Provider value={{ items, count: cartCount(items), subtotal: cartSubtotal(items), open, setOpen, add, setQty, remove }}>{children}</CartCtx.Provider>;
}
