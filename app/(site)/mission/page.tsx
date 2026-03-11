import { client, queries } from '@/lib/sanity';
import { MissionPageClient } from './MissionPageClient';

export const revalidate = 60;

async function getMissionData() {
  try {
    const [missionPage, companyInfo, siteSettings] = await Promise.all([
      client.fetch(queries.missionPage),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
    ]);
    return { missionPage, companyInfo, siteSettings };
  } catch (error) {
    console.error('Failed to fetch mission data:', error);
    return { missionPage: null, companyInfo: null, siteSettings: null };
  }
}

export default async function MissionPage() {
  const data = await getMissionData();
  return <MissionPageClient data={data} />;
}
