import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
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
    socialLinks
  }`,

  homePage: `*[_type == "homePage"][0]{
    heroHeadline,
    heroSubline,
    heroHook,
    ctaText,
    heroBadge,
    heroLearnMoreText,
    missionSectionTitle,
    missionSectionSubline,
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
    description
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
    benefits
  }`,

  impactPage: `*[_type == "impactPage"][0]{
    badge,
    headline,
    subline,
    stats,
    projectCategories,
    ctaHeadline,
    ctaSubline,
    ctaButtonText
  }`,

  missionPage: `*[_type == "missionPage"][0]{
    badge,
    headline,
    subline,
    whyChooseHeadline,
    whyChooseCards
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
