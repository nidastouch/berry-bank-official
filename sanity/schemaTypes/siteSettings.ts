import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // General
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'Berry Bank',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      group: 'general',
      initialValue: "Latin America's First Fully Green Digital Bank",
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
      initialValue: 'https://berrybank.app',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'general',
      initialValue: 'contact@berrybank.app',
    }),

    // Navigation
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
            {
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                    { name: 'emoji', title: 'Emoji Icon', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'navCtaText',
      title: 'Nav CTA Button Text',
      type: 'string',
      group: 'navigation',
      initialValue: 'Join Waitlist',
    }),
    defineField({
      name: 'navCtaLink',
      title: 'Nav CTA Button Link',
      type: 'string',
      group: 'navigation',
      initialValue: '/contact',
    }),

    // Footer
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
      initialValue: 'Where Your Money Grows Green',
    }),
    defineField({
      name: 'footerQuote',
      title: 'Footer Quote',
      type: 'string',
      group: 'footer',
      initialValue: 'Cherries are Berries.',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Quick Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),

    // Social
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'handle', title: 'Handle', type: 'string' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'handle' },
          },
        },
      ],
    }),

    // SEO
    defineField({ name: 'metaTitle', title: 'Default Meta Title', type: 'string', group: 'seo', initialValue: "Berry Bank | Latin America's First Green Digital Bank" }),
    defineField({ name: 'metaDescription', title: 'Default Meta Description', type: 'text', group: 'seo', initialValue: 'Where your money grows green. Switching to a green bank reduces your carbon footprint by 52.2%.' }),
    defineField({ name: 'metaKeywords', title: 'Meta Keywords', type: 'array', group: 'seo', of: [{ type: 'string' }] }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      };
    },
  },
});
