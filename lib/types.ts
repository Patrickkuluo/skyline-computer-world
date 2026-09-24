export type Availability = 'In Stock' | 'Available on Order' | 'Out of Stock';
export const AVAILABILITY: Availability[] = ['In Stock', 'Available on Order', 'Out of Stock'];
export type OptionChoice = { value: string; price: number };
export type OptionGroup = { label: string; choices: OptionChoice[] };
export type Product = {
  id: string; name: string; slug: string; description: string | null; price: number;
  category: string; brand: string | null; model: string | null; condition: string | null;
  stock: number; availability: Availability; images: string[];
  specifications: Record<string, string>; options: OptionGroup[];
  created_at: string; updated_at: string;
};
export const canBuy = (p: Product) => p.availability !== 'Out of Stock';
