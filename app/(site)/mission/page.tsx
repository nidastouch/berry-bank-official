import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { MissionPageClient } from './MissionPageClient';

export const revalidate = 60;

async function getMissionData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [missionPage, companyInfo, siteSettings] = await Promise.all([
      sanity.fetch(queries.missionPage),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
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
