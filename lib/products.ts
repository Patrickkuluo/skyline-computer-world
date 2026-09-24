import { publicClient } from './supabase';
import type { Product } from './types';

export function normalize(r: any): Product {
  return { ...r, images: r.images ?? [], specifications: r.specifications ?? {}, options: r.options ?? [] } as Product;
}
export async function getProducts(): Promise<{ products: Product[]; error: boolean }> {
  const { data, error } = await publicClient.from('products').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getProducts failed:', error.message); return { products: [], error: true }; }
  return { products: (data ?? []).map(normalize), error: false };
}
export async function getProduct(slug: string): Promise<{ product: Product | null; error: boolean }> {
  const { data, error } = await publicClient.from('products').select('*').eq('slug', slug).maybeSingle();
  if (error) { console.error('getProduct failed:', error.message); return { product: null, error: true }; }
  return { product: data ? normalize(data) : null, error: false };
}
