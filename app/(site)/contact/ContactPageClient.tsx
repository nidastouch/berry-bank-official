'use client';

import { motion } from 'framer-motion';
import { FooterSection, FAQ } from '@/components/modules';
import { Newsletter } from '@/components/shop';
import { Mail, MapPin, Phone } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MapPin,
  Phone,
};

interface ContactPageData {
  contactPage: {
    badge?: string;
    headline?: string;
    subline?: string;
    cards?: Array<{
      _key: string;
      icon?: string;
      title: string;
      value: string;
      linkPrefix?: string;
    }>;
    newsletterHeading?: string;
    newsletterSubline?: string;
  } | null;
  faqs: Array<{
    _id: string;
    question: string;
    answer: string;
  }> | null;
  companyInfo: {
    name?: string;
    tagline?: string;
    contactEmail?: string;
    legalName?: string;
    legalType?: string;
    headquarters?: string;
  } | null;
  siteSettings: {
    footerTagline?: string;
    footerQuote?: string;
    footerLinks?: Array<{ label: string; href: string }>;
  } | null;
}

const defaultCards = [
  { _key: '1', icon: 'Mail', title: 'Email', value: 'contact@berrybank.app', linkPrefix: 'mailto:' },
  { _key: '2', icon: 'MapPin', title: 'Location', value: 'Austin, TX, USA', linkPrefix: '' },
  { _key: '3', icon: 'Phone', title: 'Social', value: '@BerryBank', linkPrefix: '' },
];

export function ContactPageClient({ data }: { data: ContactPageData }) {
  const cp = data.contactPage;
  const cards = cp?.cards || defaultCards;

  return (
    <main className="min-h-screen bg-void pt-24 pb-24 md:pb-0" data-nav-theme="dark">
      {/* Hero Header */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-2 bg-growth/20 text-growth rounded-full text-sm font-medium mb-6">
            {cp?.badge || 'Get In Touch'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-mist mb-6">
            {cp?.headline || 'Contact Us'}
          </h1>
          <p className="text-lg md:text-xl text-mist/70">
            {cp?.subline || "Have questions about green banking? We're here to help you on your sustainable finance journey."}
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards?.map((card, index) => {
            const Icon = iconMap[card.icon || ''] || Mail;
            const colorClass = index % 2 === 0 ? 'bg-berry/20' : 'bg-growth/20';
            const iconColor = index % 2 === 0 ? 'text-berry' : 'text-growth';

            return (
              <motion.div
                key={card._key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="bg-mist/5 border border-mist/10 rounded-xl p-6 text-center"
              >
                <div className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-mist mb-2">{card.title}</h3>
                {card.linkPrefix ? (
                  <a href={`${card.linkPrefix}${card.value}`} className="text-growth hover:underline">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-mist/70">{card.value}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Newsletter + FAQ Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Newsletter />
          </div>
          <FAQ faqs={data.faqs || undefined} />
        </div>
      </section>

      <FooterSection
        companyName={data.companyInfo?.name}
        tagline={data.siteSettings?.footerTagline || data.companyInfo?.tagline}
        contactEmail={data.companyInfo?.contactEmail}
        legalName={data.companyInfo?.legalName}
        legalType={data.companyInfo?.legalType}
        headquarters={data.companyInfo?.headquarters}
        quote={data.siteSettings?.footerQuote}
        quickLinks={data.siteSettings?.footerLinks}
      />
    </main>
  );
}