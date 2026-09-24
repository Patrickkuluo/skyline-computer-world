import { SITE, ksh } from './site';

export type CartItem = {
  key: string; productId: string; slug: string; name: string; brand: string | null; model: string | null;
  condition: string | null; availability: string; image: string | null;
  specs: Record<string, string>; selected: Record<string, string>; unitPrice: number; qty: number;
};

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((n, i) => n + i.qty * i.unitPrice, 0);

export function buildMessage(items: CartItem[]) {
  const blocks = items.map((i) => {
    const chosen = new Set(Object.keys(i.selected).map((k) => k.toLowerCase()));
    const lines: string[] = [];
    if (i.brand) lines.push(`Brand: ${i.brand}`);
    if (i.model) lines.push(`Model: ${i.model}`);
    for (const [k, v] of Object.entries(i.specs)) if (v && !chosen.has(k.toLowerCase())) lines.push(`${k}: ${v}`);
    for (const [k, v] of Object.entries(i.selected)) lines.push(`${k}: ${v}`);
    if (i.condition) lines.push(`Condition: ${i.condition}`);
    lines.push(`Availability: ${i.availability}`);
    lines.push(`Price: ${ksh(i.unitPrice)}`);
    if (i.qty > 1) lines.push(`Line total: ${ksh(i.unitPrice * i.qty)}`);
    return `${i.qty} × ${i.name}\n\n${lines.join('\n')}`;
  });
  return [
    "Hello Skyline Computers, I'd like to order:", '',
    blocks.join('\n\n'), '',
    `TOTAL ITEMS: ${cartCount(items)}`,
    `RETAIL SUBTOTAL: ${ksh(cartSubtotal(items))}`, '',
    'Please confirm availability, delivery options and final price.',
  ].join('\n');
}
export const whatsappLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const orderLink = (items: CartItem[]) => whatsappLink(buildMessage(items));
