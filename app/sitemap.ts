import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { SITE } from '@/lib/site';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getProducts();
  return [
    { url: SITE.url },
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: p.updated_at })),
  ];
}