import { getClient, queries } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { ContactPageClient } from './ContactPageClient';

export const revalidate = 60;

async function getContactData() {
  const isDraft = (await draftMode()).isEnabled;
  const sanity = getClient(isDraft);

  try {
    const [contactPage, faqs, companyInfo, siteSettings] = await Promise.all([
      sanity.fetch(queries.contactPage),
      sanity.fetch(queries.faqs),
      sanity.fetch(queries.companyInfo),
      sanity.fetch(queries.siteSettings),
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
