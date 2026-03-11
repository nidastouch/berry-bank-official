import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'features', title: 'Features Section' },
    { name: 'mission', title: 'Mission Section' },
    { name: 'impact', title: 'Impact Chart Section' },
    { name: 'team', title: 'Team Section' },
    { name: 'faq', title: 'FAQ Section' },
    { name: 'join', title: 'Join Section' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'hero', initialValue: "Latin America's First Fully Green Digital Bank" }),
    defineField({ name: 'heroSubline', title: 'Hero Subline', type: 'string', group: 'hero', initialValue: "Don't choose between a sleek experience and saving the planet." }),
    defineField({ name: 'heroHook', title: 'Hero Hook Stat', type: 'string', group: 'hero', initialValue: 'Switching to a green bank reduces your carbon footprint by 52.2%.' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', group: 'hero', initialValue: 'Join the Waitlist' }),
    defineField({ name: 'heroBadge', title: 'Hero Badge Text', type: 'string', group: 'hero', initialValue: 'Now accepting early access signups' }),
    defineField({ name: 'heroLearnMoreText', title: 'Learn More Button Text', type: 'string', group: 'hero', initialValue: 'Learn More' }),

    // ── Features ─────────────────────────────
    defineField({ name: 'featuresHeading', title: 'Features Heading', type: 'string', group: 'features', initialValue: 'Banking, Reimagined' }),
    defineField({ name: 'featuresSubline', title: 'Features Subline', type: 'text', group: 'features', initialValue: 'Experience the future of sustainable finance with features designed for the eco-conscious generation.' }),
    defineField({
      name: 'featuresStats',
      title: 'Feature Stats',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: {
          select: { title: 'value', subtitle: 'label' },
        },
      }],
    }),

    // ── Mission ──────────────────────────────
    defineField({ name: 'missionSectionTitle', title: 'Section Title', type: 'string', group: 'mission', initialValue: 'Our Purpose' }),
    defineField({ name: 'missionSectionSubline', title: 'Section Subline', type: 'string', group: 'mission', initialValue: 'More than a bank. A movement for a greener future.' }),
    defineField({ name: 'missionLabel', title: 'Mission Card Label', type: 'string', group: 'mission', initialValue: 'Our Mission' }),
    defineField({ name: 'visionLabel', title: 'Vision Card Label', type: 'string', group: 'mission', initialValue: 'Our Vision' }),
    defineField({ name: 'coreValuesLabel', title: 'Core Values Label', type: 'string', group: 'mission', initialValue: 'Core Values' }),

    // ── Impact Chart ─────────────────────────
    defineField({ name: 'impactChartBadge', title: 'Chart Badge', type: 'string', group: 'impact', initialValue: 'Environmental Impact' }),
    defineField({ name: 'impactChartHeading', title: 'Chart Heading', type: 'string', group: 'impact', initialValue: 'Your Impact' }),
    defineField({ name: 'impactChartBottomStat', title: 'Bottom Stat Line', type: 'string', group: 'impact', initialValue: '52.2% less carbon footprint' }),
    defineField({ name: 'impactChartBottomSubline', title: 'Bottom Sub-line', type: 'string', group: 'impact', initialValue: 'Just by switching to a green bank' }),

    // ── Team ─────────────────────────────────
    defineField({ name: 'teamHeading', title: 'Team Heading', type: 'string', group: 'team', initialValue: 'Meet Our Founders' }),
    defineField({ name: 'teamSubline', title: 'Team Subline', type: 'string', group: 'team', initialValue: "The passionate team behind Latin America's first green digital bank." }),

    // ── FAQ ──────────────────────────────────
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string', group: 'faq', initialValue: 'Frequently Asked Questions' }),

    // ── Join / Newsletter ────────────────────
    defineField({ name: 'joinBadge', title: 'Join Badge', type: 'string', group: 'join', initialValue: 'Join the Movement' }),
    defineField({ name: 'joinHeadline', title: 'Join Headline', type: 'string', group: 'join', initialValue: 'Be Part of the Change' }),
    defineField({ name: 'joinSubline', title: 'Join Subline', type: 'string', group: 'join', initialValue: "Don't choose between a sleek experience and saving the planet." }),
    defineField({ name: 'joinSlogan', title: 'Join Slogan', type: 'string', group: 'join', initialValue: 'Bank Green. Live Clean.' }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      group: 'join',
      of: [{ type: 'string' }],
      initialValue: ['\ud83d\udd12 AES-256 Encryption', '\u2705 PCI-DSS Compliant', '\ud83c\udf31 100% Carbon Neutral'],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page', subtitle: 'Homepage content & sections' };
    },
  },
});
