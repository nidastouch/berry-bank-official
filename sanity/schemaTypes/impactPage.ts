import { defineField, defineType } from 'sanity';

export const impactPage = defineType({
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'chart', title: 'Chart Section' },
    { name: 'categories', title: 'Categories Section' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string', group: 'hero', initialValue: 'Real Results' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: 'hero', initialValue: 'Our Impact' }),
    defineField({ name: 'subline', title: 'Subline', type: 'text', group: 'hero', initialValue: 'Every deposit makes a difference. See how your money is creating positive change across Latin America and beyond.' }),
    defineField({
      name: 'stats',
      title: 'Impact Stats',
      type: 'array',
      group: 'hero',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'unit', title: 'Unit', type: 'string' }),
          defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
        ],
        preview: {
          select: { title: 'label', subtitle: 'value' },
        },
      }],
    }),
    defineField({ name: 'chartSectionTitle', title: 'Chart Section Title', type: 'string', group: 'chart', initialValue: 'How Green Are Berry Bank Members?' }),
    defineField({
      name: 'projectCategories',
      title: 'Project Categories',
      type: 'array',
      group: 'categories',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'percentage', title: 'Percentage', type: 'number' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'color', title: 'Tailwind Color Class', type: 'string', description: 'e.g. bg-growth, bg-green-600' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'percentage' },
          prepare({ title, subtitle }) { return { title, subtitle: subtitle + '%' }; },
        },
      }],
    }),
    defineField({ name: 'categoriesSectionTitle', title: 'Categories Section Title', type: 'string', group: 'categories', initialValue: 'Where Your Money Goes' }),
    defineField({ name: 'ctaHeadline', title: 'CTA Headline', type: 'string', group: 'cta', initialValue: 'Ready to Make an Impact?' }),
    defineField({ name: 'ctaSubline', title: 'CTA Subline', type: 'text', group: 'cta', initialValue: 'Join thousands of members who are growing their wealth while protecting our planet.' }),
    defineField({ name: 'ctaButtonText', title: 'CTA Button Text', type: 'string', group: 'cta', initialValue: 'Get Started Today' }),
  ],
  preview: {
    prepare() {
      return { title: 'Impact Page', subtitle: 'Impact page content' };
    },
  },
});
