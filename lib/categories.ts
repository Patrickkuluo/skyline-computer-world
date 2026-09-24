export const CATEGORY_GROUPS = [
  { name: 'Computers', items: ['Laptops', 'Desktop Computers'] },
  { name: 'Phones & Tablets', items: ['Tablets', 'Phones'] },
  { name: 'Computer Accessories', items: ['Keyboards & Mice', 'Headphones & Audio', 'Speakers', 'Adapters & Converters', 'Splitters', 'Networking'] },
  { name: 'Electronics', items: ['Power & Electronic Accessories'] },
  { name: 'Security', items: ['CCTV Cameras'] },
];
export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.items);
export const groupOf = (cat: string) => CATEGORY_GROUPS.find((g) => g.items.includes(cat))?.name;
export function matchesCategory(productCat: string, selected: string) {
  if (!selected) return true;
  if (productCat === selected) return true;
  return !!CATEGORY_GROUPS.find((g) => g.name === selected)?.items.includes(productCat);
}
