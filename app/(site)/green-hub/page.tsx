import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { GreenHubPageClient } from './GreenHubPageClient';

export const revalidate = 60;

async function getGreenHubData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [greenHub, companyInfo, siteSettings] = await Promise.all([
      sanity.fetch(queries.greenHub),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
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
