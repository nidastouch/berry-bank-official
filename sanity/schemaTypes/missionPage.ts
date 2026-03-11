import { defineField, defineType } from 'sanity';

export const missionPage = defineType({
  name: 'missionPage',
  title: 'Mission Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'values', title: 'Core Values' },
    { name: 'whyChoose', title: 'Why Choose Section' },
  ],
  fields: [
    defineField({ name: 'badge', title: 'Badge Text', type: 'string', group: 'hero', initialValue: 'Our Purpose' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: 'hero', initialValue: 'Mission & Vision' }),
    defineField({ name: 'subline', title: 'Subline', type: 'text', group: 'hero', initialValue: 'Building a financial system that works for people and the planet.' }),
    defineField({ name: 'coreValuesHeading', title: 'Core Values Heading', type: 'string', group: 'values', initialValue: 'Our Core Values' }),
    defineField({
      name: 'coreValueEmojis',
      title: 'Core Value Emojis',
      type: 'array',
      group: 'values',
      description: 'One emoji per core value, in the same order as Company Info > Core Values',
      of: [{ type: 'string' }],
      initialValue: ['\ud83c\udf0d', '\ud83e\udd1d', '\ud83d\udc9a', '\ud83d\udca1', '\ud83c\udf31'],
    }),
    defineField({ name: 'whyChooseHeadline', title: 'Why Choose Headline', type: 'string', group: 'whyChoose', initialValue: 'Why Choose Berry Bank?' }),
    defineField({
      name: 'whyChooseCards',
      title: 'Why Choose Cards',
      type: 'array',
      group: 'whyChoose',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mission Page', subtitle: 'Mission page content' };
    },
  },
});
