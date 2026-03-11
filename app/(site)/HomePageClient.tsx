"use client";

import { motion } from "framer-motion";
import {
  Hero,
  GreenHubEmbed,
  MissionSection,
  ImpactChart,
  JoinSection,
  FooterSection,
  FeatureGrid,
  Team,
  FAQ,
} from "@/components/modules";

interface HomePageData {
  homePage: any;
  impactSection: any;
  companyInfo: any;
  siteSettings: any;
  greenHub: any;
  features: any;
  teamMembers: any;
  faqs: any;
  products: any;
}

interface HomePageClientProps {
  data: HomePageData;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function HomePageClient({ data }: HomePageClientProps) {
  const hp = data.homePage || {};
  const ci = data.companyInfo || {};
  const ss = data.siteSettings || {};

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero */}
      <section id="hero" data-nav-theme="dark" className="relative min-h-screen w-full">
        <Hero cmsData={hp} />
      </section>

      {/* Green Hub */}
      <motion.section
        id="green-hub"
        data-nav-theme="light"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full"
      >
        <GreenHubEmbed
          embedUrl={data.greenHub?.embedUrl}
          title={data.greenHub?.title}
          description={data.greenHub?.description}
          badge={data.greenHub?.badge}
          embedUrlBarText={data.greenHub?.embedUrlBarText}
        />
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32"
      >
        <FeatureGrid
          features={data.features || undefined}
          heading={hp.featuresHeading}
          subline={hp.featuresSubline}
          stats={hp.featuresStats}
        />
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        id="mission"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32"
      >
        <MissionSection
          mission={ci.mission}
          vision={ci.vision}
          coreValues={ci.coreValues}
          sectionTitle={hp.missionSectionTitle}
          sectionSubline={hp.missionSectionSubline}
          missionLabel={hp.missionLabel}
          visionLabel={hp.visionLabel}
          coreValuesLabel={hp.coreValuesLabel}
        />
      </motion.section>

      {/* Impact Chart */}
      <motion.section
        id="impact"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32"
      >
        <ImpactChart
          cmsData={data.impactSection}
          badge={hp.impactChartBadge}
          heading={hp.impactChartHeading}
          bottomStat={hp.impactChartBottomStat}
          bottomSubline={hp.impactChartBottomSubline}
        />
      </motion.section>

      {/* Team */}
      <motion.section
        id="team"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32"
      >
        <Team
          members={data.teamMembers || undefined}
          legalName={ci.legalName}
          legalType={ci.legalType}
          headquarters={ci.headquarters}
          heading={hp.teamHeading}
          subline={hp.teamSubline}
        />
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32 px-4"
      >
        <FAQ faqs={data.faqs || undefined} heading={hp.faqHeading} />
      </motion.section>

      {/* Join / Newsletter */}
      <motion.section
        id="join"
        data-nav-theme="dark"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full bg-void py-20 md:py-32"
      >
        <JoinSection
          badge={hp.joinBadge}
          headline={hp.joinHeadline}
          subline={hp.joinSubline}
          slogan={hp.joinSlogan}
          trustBadges={hp.trustBadges ?? undefined}
        />
      </motion.section>

      {/* Footer */}
      <section id="footer" data-nav-theme="dark">
        <FooterSection
          companyName={ci.name}
          tagline={ss.footerTagline || ci.tagline}
          contactEmail={ci.contactEmail}
          legalName={ci.legalName}
          legalType={ci.legalType}
          headquarters={ci.headquarters}
          quote={ss.footerQuote}
          quickLinks={ss.footerLinks}
        />
      </section>
    </main>
  );
}
