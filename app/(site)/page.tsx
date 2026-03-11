import { client, queries } from '@/lib/sanity';
import { HomePageClient } from './HomePageClient';

// Revalidate this page every 60 seconds so Sanity changes appear quickly
export const revalidate = 60;

// Server component that fetches data
async function getHomePageData() {
  try {
    const [homePage, impactSection, companyInfo, siteSettings, greenHub, features, teamMembers, faqs, products] = await Promise.all([
      client.fetch(queries.homePage),
      client.fetch(queries.impactSection),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
      client.fetch(queries.greenHub),
      client.fetch(queries.features),
      client.fetch(queries.teamMembers),
      client.fetch(queries.faqs),
      client.fetch(queries.products),
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
