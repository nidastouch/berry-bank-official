import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { ShopPageClient } from './ShopPageClient';

export const revalidate = 60;

async function getShopData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [shopPage, products, companyInfo, siteSettings] = await Promise.all([
      sanity.fetch(queries.shopPage),
      sanity.fetch(queries.products),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
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
