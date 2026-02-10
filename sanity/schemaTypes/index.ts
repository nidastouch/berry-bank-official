import { homePage } from './homePage';
import { greenHub } from './greenHub';
import { teamMember } from './teamMember';
import { product } from './product';
import { faq } from './faq';
import { companyInfo } from './companyInfo';
import { impactSection } from './impactSection';
import { feature } from './feature';
import { aboutPage } from './aboutPage';
import { siteSettings } from './siteSettings';
import { contactPage } from './contactPage';
import { shopPage } from './shopPage';
import { impactPage } from './impactPage';
import { missionPage } from './missionPage';
import { privacyPage } from './privacyPage';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  greenHub,
  companyInfo,
  impactSection,
  aboutPage,
  contactPage,
  shopPage,
  impactPage,
  missionPage,
  privacyPage,
  // Collections
  teamMember,
  product,
  faq,
  feature,
];

// Singleton type names for structure builder
export const singletonTypes = [
  'siteSettings',
  'homePage',
  'greenHub',
  'companyInfo',
  'impactSection',
  'aboutPage',
  'contactPage',
  'shopPage',
  'impactPage',
  'missionPage',
  'privacyPage',
];
