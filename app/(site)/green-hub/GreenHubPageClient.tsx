'use client';

import { motion } from 'framer-motion';
import { GreenHubEmbed, FooterSection } from '@/components/modules';

interface GreenHubPageData {
  greenHub: {
    embedUrl?: string;
    title?: string;
    description?: string;
    badge?: string;
    embedUrlBarText?: string;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  } | null;
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

export function GreenHubPageClient({ data }: { data: GreenHubPageData }) {
  const gh = data.greenHub;

  const defaultFeatures = [
    {
      icon: '🌿',
      title: 'Impact Tracking',
      description: 'See exactly how your deposits fund renewable energy, sustainable agriculture, and green infrastructure.',
    },
    {
      icon: '📊',
      title: 'Portfolio View',
      description: 'Monitor your green investments with real-time ESG scores and sustainability metrics.',
    },
    {
      icon: '🎯',
      title: 'Goal Setting',
      description: 'Set and track financial goals while maintaining your commitment to sustainability.',
    },
  ];

  const features = gh?.features && gh.features.length > 0 ? gh.features : defaultFeatures;

  return (
    <main className="min-h-screen bg-void pt-24 pb-24 md:pb-0" data-nav-theme="dark">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-2 bg-growth/20 text-growth rounded-full text-sm font-medium mb-6">
            {gh?.badge || 'Your Financial Ecosystem'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-mist mb-6">
            The {gh?.title || 'Green Hub'}
          </h1>
          <p className="text-lg md:text-xl text-mist/70">
            {gh?.description || 'All your sustainable banking tools in one place. Track your impact, manage your investments, and watch your money grow green.'}
          </p>
        </motion.div>
      </section>

      {/* Green Hub Embed - Full Width */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-mist rounded-2xl p-4 md:p-8"
        >
          <GreenHubEmbed
            embedUrl={gh?.embedUrl}
            title={gh?.title}
            description={gh?.description}
            badge={gh?.badge}
            embedUrlBarText={gh?.embedUrlBarText}
          />
        </motion.div>
      </section>

      {/* Features List */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature: any, index: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-void border border-mist/10 rounded-xl p-6 hover:border-growth/50 transition-colors"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-mist mb-2">{feature.title}</h3>
              <p className="text-mist/60">{feature.description}</p>
            </motion.div>
          ))}
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