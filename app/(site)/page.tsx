import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { HomePageClient } from './HomePageClient';

// Revalidate this page every 60 seconds so Sanity changes appear quickly
export const revalidate = 60;

// Server component that fetches data
async function getHomePageData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [homePage, impactSection, companyInfo, siteSettings, greenHub, features, teamMembers, faqs, products] = await Promise.all([
      sanity.fetch(queries.homePage),
      sanity.fetch(queries.impactSection),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
      sanity.fetch(queries.greenHub),
      sanity.fetch(queries.features),
      sanity.fetch(queries.teamMembers),
      sanity.fetch(queries.faqs),
      sanity.fetch(queries.products),
    ]);
    return { homePage, impactSection, companyInfo, siteSettings, greenHub, features, teamMembers, faqs, products };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return { homePage: null, impactSection: null, companyInfo: null, siteSettings: null, greenHub: null, features: null, teamMembers: null, faqs: null, products: null };
  }
}

export default async function HomePage() {
  const data = await getHomePageData();
  return <HomePageClient data={data} />;
}
