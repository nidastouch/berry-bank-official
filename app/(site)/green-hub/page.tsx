import { client, queries } from '@/lib/sanity';
import { GreenHubPageClient } from './GreenHubPageClient';

export const revalidate = 60;

async function getGreenHubData() {
  try {
    const [greenHub, companyInfo, siteSettings] = await Promise.all([
      client.fetch(queries.greenHub),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
    ]);
    return { greenHub, companyInfo, siteSettings };
  } catch (error) {
    console.error('Failed to fetch green hub data:', error);
    return { greenHub: null, companyInfo: null, siteSettings: null };
  }
}

export default async function GreenHubPage() {
  const data = await getGreenHubData();
  return <GreenHubPageClient data={data} />;
}
