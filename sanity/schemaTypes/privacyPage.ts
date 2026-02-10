import { defineType, defineField } from 'sanity';

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      description: 'The date this policy was last updated (shown at the top)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              description: 'e.g. "1. Introduction"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Rich text content — supports bold, italic, lists, links',
            }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email shown in the contact section',
    }),
    defineField({
      name: 'companyAddress',
      title: 'Company Address',
      type: 'string',
      description: 'Address shown in the contact section',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Privacy Policy' };
    },
  },
});
