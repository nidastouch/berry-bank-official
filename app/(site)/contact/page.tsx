import { client, queries } from '@/lib/sanity';
import { ContactPageClient } from './ContactPageClient';

export const revalidate = 60;

async function getContactData() {
  try {
    const [contactPage, faqs, companyInfo, siteSettings] = await Promise.all([
      client.fetch(queries.contactPage),
      client.fetch(queries.faqs),
      client.fetch(queries.companyInfo),
      client.fetch(queries.siteSettings),
    ]);
    return { contactPage, faqs, companyInfo, siteSettings };
  } catch (error) {
    console.error('Failed to fetch contact data:', error);
    return { contactPage: null, faqs: null, companyInfo: null, siteSettings: null };
  }
}

export default async function ContactPage() {
  const data = await getContactData();
  return <ContactPageClient data={data} />;
}
