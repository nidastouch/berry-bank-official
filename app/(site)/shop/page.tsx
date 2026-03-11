import { client, queries } from '@/lib/sanity';
import { ShopPageClient } from './ShopPageClient';

export const revalidate = 60;

async function getShopData() {
  try {
    const [shopPage, products, companyInfo, siteSettings] = await Promise.all([
      client.fetch(queries.shopPage),
      client.fetch(queries.products),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
    ]);
    return { shopPage, products, companyInfo, siteSettings };
  } catch (error) {
    console.error('Failed to fetch shop data:', error);
    return { shopPage: null, products: null, companyInfo: null, siteSettings: null };
  }
}

export default async function ShopPage() {
  const data = await getShopData();
  return <ShopPageClient data={data} />;
}
