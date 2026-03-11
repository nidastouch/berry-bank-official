import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// useCdn: false ensures we always get fresh data from the Sanity API
// Combined with Next.js revalidation, this gives us on-demand fresh content
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Queries
export const queries = {
  // Singletons
  siteSettings: `*[_type == "siteSettings"][0]{
    siteName,
    siteDescription,
    siteUrl,
    contactEmail,
    navItems,
    navCtaText,
    navCtaLink,
    footerTagline,
    footerQuote,
    footerLinks,
    socialLinks,
    metaTitle,
    metaDescription,
    metaKeywords
  }`,

  homePage: `*[_type == "homePage"][0]{
    heroHeadline,
    heroSubline,
    heroHook,
    ctaText,
    heroBadge,
    heroLearnMoreText,
    featuresHeading,
    featuresSubline,
    featuresStats,
    missionSectionTitle,
    missionSectionSubline,
    missionLabel,
    visionLabel,
    coreValuesLabel,
    impactChartBadge,
    impactChartHeading,
    impactChartBottomStat,
    impactChartBottomSubline,
    teamHeading,
    teamSubline,
    faqHeading,
    joinBadge,
    joinHeadline,
    joinSubline,
    joinSlogan,
    trustBadges
  }`,

  companyInfo: `*[_type == "companyInfo"][0]{
    name,
    tagline,
    secondaryTaglines,
    mission,
    vision,
    coreValues,
    contactEmail,
    legalName,
    legalType,
    headquarters
  }`,

  impactSection: `*[_type == "impactSection"][0]{
    title,
    description,
    chartData
  }`,

  greenHub: `*[_type == "greenHub"][0]{
    embedUrl,
    title,
    description,
    badge,
    embedUrlBarText,
    features
  }`,

  contactPage: `*[_type == "contactPage"][0]{
    badge,
    headline,
    subline,
    cards,
    newsletterHeading,
    newsletterSubline
  }`,

  shopPage: `*[_type == "shopPage"][0]{
    badge,
    headline,
    subline,
    benefits,
    shopBadge,
    shopHeading,
    shopSubline,
    comingSoonText
  }`,

  impactPage: `*[_type == "impactPage"][0]{
    badge,
    headline,
    subline,
    stats,
    projectCategories,
    ctaHeadline,
    ctaSubline,
    ctaButtonText,
    chartSectionTitle,
    categoriesSectionTitle
  }`,

  missionPage: `*[_type == "missionPage"][0]{
    badge,
    headline,
    subline,
    whyChooseHeadline,
    whyChooseCards,
    coreValuesHeading,
    coreValueEmojis
  }`,

  privacyPage: `*[_type == "privacyPage"][0]{
    lastUpdated,
    sections[]{
      heading,
      content
    },
    contactEmail,
    companyAddress
  }`,

  // Collections
  teamMembers: `*[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    image,
    bio
  }`,

  products: `*[_type == "product"]{
    _id,
    title,
    slug,
    price,
    image,
    description,
    stripePriceId,
    featured
  }`,

  faqs: `*[_type == "faq"] | order(order asc){
    _id,
    question,
    answer
  }`,

  features: `*[_type == "feature"] | order(order asc){
    _id,
    title,
    description,
    icon
  }`,
};
