import { defineField, defineType } from 'sanity';

export const shopPage = defineType({
  name: 'shopPage',
  title: 'Shop Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Page Hero' },
    { name: 'shopSection', title: 'Shop Section' },
    { name: 'benefits', title: 'Benefits' },
  ],
  fields: [
    // Page hero (ShopPageClient)
    defineField({ name: 'badge', title: 'Page Badge', type: 'string', group: 'hero', initialValue: 'Sustainable Style' }),
    defineField({ name: 'headline', title: 'Page Headline', type: 'string', group: 'hero', initialValue: 'Berry Shop' }),
    defineField({ name: 'subline', title: 'Page Subline', type: 'text', group: 'hero', initialValue: 'Premium eco-friendly merchandise. Every purchase supports our mission to make green banking accessible to all.' }),
    // Shop section (ShopSection component)
    defineField({ name: 'shopBadge', title: 'Shop Section Badge', type: 'string', group: 'shopSection', initialValue: 'Merch Store' }),
    defineField({ name: 'shopHeading', title: 'Shop Section Heading', type: 'string', group: 'shopSection', initialValue: 'Shop Berry' }),
    defineField({ name: 'shopSubline', title: 'Shop Section Subline', type: 'text', group: 'shopSection', initialValue: 'Support sustainable banking with eco-friendly merchandise. All products are made with environmentally conscious materials.' }),
    defineField({ name: 'comingSoonText', title: 'Coming Soon Text', type: 'string', group: 'shopSection', initialValue: 'More products coming soon. Join the waitlist to be notified!' }),
    // Benefits
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'benefits',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'emoji' },
          prepare({ title, subtitle }) { return { title: (subtitle || '') + ' ' + (title || '') }; },
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Shop Page', subtitle: 'Shop page content' };
    },
  },
});
