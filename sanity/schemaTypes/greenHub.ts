import { defineField, defineType } from 'sanity';

export const greenHub = defineType({
  name: 'greenHub',
  title: 'Green Hub',
  type: 'document',
  fields: [
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'URL of the Green Hub web app to embed',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({ name: 'title', title: 'Section Title', type: 'string', initialValue: 'Green Hub' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'Environmental Impact' }),
    defineField({ name: 'embedUrlBarText', title: 'URL Bar Display Text', type: 'string', initialValue: 'greeninitiatives.berrybank.app', description: 'Text shown in the browser chrome URL bar above the embed' }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      description: 'Feature cards shown below the embed on the Green Hub page',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon Emoji', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'description', media: 'icon' },
          prepare({ title, subtitle, media }) {
            return { title: (media || '') + ' ' + (title || ''), subtitle };
          },
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Green Hub Settings' };
    },
  },
});
