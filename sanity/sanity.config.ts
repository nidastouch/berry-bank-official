'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, singletonTypes } from './schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'berry-bank',
  title: 'Berry Bank Studio',
  projectId,
  dataset,
  basePath: '/studio',
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Global Settings ──────────────────
            S.listItem()
              .title('\ud83c\udf10 Global Settings')
              .child(
                S.list()
                  .title('Global Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
                    S.listItem()
                      .title('Company Info')
                      .child(S.document().schemaType('companyInfo').documentId('companyInfo')),
                  ]),
              ),

            S.divider(),

            // ── Pages ────────────────────────────
            S.listItem()
              .title('\ud83d\udcc4 Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home Page')
                      .child(S.document().schemaType('homePage').documentId('homePage')),
                    S.listItem()
                      .title('Mission Page')
                      .child(S.document().schemaType('missionPage').documentId('missionPage')),
                    S.listItem()
                      .title('Impact Page')
                      .child(S.document().schemaType('impactPage').documentId('impactPage')),
                    S.listItem()
                      .title('Green Hub')
                      .child(S.document().schemaType('greenHub').documentId('greenHub')),
                    S.listItem()
                      .title('Contact Page')
                      .child(S.document().schemaType('contactPage').documentId('contactPage')),
                    S.listItem()
                      .title('Shop Page')
                      .child(S.document().schemaType('shopPage').documentId('shopPage')),
                    S.listItem()
                      .title('Privacy Page')
                      .child(S.document().schemaType('privacyPage').documentId('privacyPage')),
                    S.divider(),
                    S.listItem()
                      .title('Impact Chart Data')
                      .child(S.document().schemaType('impactSection').documentId('impactSection')),
                  ]),
              ),

            S.divider(),

            // ── Content Collections ──────────────
            S.listItem()
              .title('\ud83d\udce6 Content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.documentTypeListItem('feature').title('Features'),
                    S.documentTypeListItem('teamMember').title('Team Members'),
                    S.documentTypeListItem('product').title('Products'),
                    S.documentTypeListItem('faq').title('FAQs'),
                  ]),
              ),
          ]),
    }),
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.includes(context.schemaType)
        ? input.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : input,
  },
});
