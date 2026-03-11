import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { ImpactPageClient } from './ImpactPageClient';

export const revalidate = 60;

async function getImpactData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [impactPage, impactSection, companyInfo, siteSettings] = await Promise.all([
      sanity.fetch(queries.impactPage),
      sanity.fetch(queries.impactSection),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
    ]);
    return { impactPage, impactSection, companyInfo, siteSettings };
  } catch (error) {
    console.error('Failed to fetch impact data:', error);
    return { impactPage: null, impactSection: null, companyInfo: null, siteSettings: null };
  }
}

export default async function ImpactPage() {
  const data = await getImpactData();
  return <ImpactPageClient data={data} />;
}
