import { client, queries } from '@/lib/sanity';
import { ImpactPageClient } from './ImpactPageClient';

export const revalidate = 60;

async function getImpactData() {
  try {
    const [impactPage, impactSection, companyInfo, siteSettings] = await Promise.all([
      client.fetch(queries.impactPage),
      client.fetch(queries.impactSection),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
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
