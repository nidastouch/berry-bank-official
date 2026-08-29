/**
 * ==========================================================================
 * Berry Bank — site content
 * ==========================================================================
 * Every word on the website lives in this file. To change copy, edit here,
 * save, and push. No CMS, no login, nothing new to learn.
 *
 * Two rules we hold to:
 *   1. No number goes on this site unless it is real and we can source it.
 *   2. Nothing is described as further along than it is. Goals are labelled
 *      as goals.
 * ==========================================================================
 */

export const company = {
  name: 'Berry Bank',
  legalName: 'Berry Fintech, Inc.',
  entity: 'Delaware C Corporation',
  industry: 'Crowdfunding and Personal Fundraising',
  location: 'San Antonio, Texas',
  email: 'contact@berrybank.app',
  /** Their own line. Odd, memorable, and theirs. Worth keeping. */
  aside: 'Cherries are berries.',
} as const;

export const greenHub = {
  name: 'Green Hub',
  url: 'https://greenhub.berrybank.app/',
  status: 'Live',
  summary:
    'Green Hub connects local environmental organizations with supporters who want to fund their work.',
} as const;

export const nav = [
  { label: 'How it works', href: '/#how' },
  { label: 'Green Hub', href: '/green-hub' },
  { label: 'Investors', href: '/investors' },
] as const;

/* -------------------------------------------------------------------------- */
/* Home                                                                       */
/* -------------------------------------------------------------------------- */

export const home = {
  hero: {
    eyebrow: 'San Antonio, Texas',
    headline: 'The best person to fund a local cause lives near it.',
    body: 'Berry Bank builds fundraising tools for environmental organizations. Our first platform, the Green Hub, is live.',
    primary: { label: 'See the Green Hub', href: '/green-hub' },
    secondary: { label: 'How it works', href: '/#how' },
  },

  premise: {
    label: 'The premise',
    heading: 'Distance is what most fundraising platforms ignore.',
    body: [
      'A river cleanup in San Antonio and a campaign four states away land in the same feed. The stranger scrolls past. The neighbor does not.',
      'We build for the neighbor.',
    ],
  },

  /* A real sequence, so it is numbered. Order carries meaning here. */
  how: {
    label: 'How it works',
    heading: 'Three steps, in this order.',
    steps: [
      {
        n: '01',
        title: 'An organization posts a project',
        body: 'A nonprofit, a university group, or a neighborhood association says what the work is and what it costs.',
      },
      {
        n: '02',
        title: 'People nearby find it',
        body: 'Projects surface to the community around them instead of to a national feed.',
      },
      {
        n: '03',
        title: 'It gets funded and the work happens',
        body: 'Small contributions reach the goal. Supporters can see what came of it.',
      },
    ],
  },

  audiences: {
    label: 'Who uses it',
    lead: {
      title: 'Environmental organizations',
      body: 'Nonprofits, university groups, and neighborhood associations raising for local environmental work: river cleanups, tree planting, habitat restoration.',
      cta: { label: 'See the Green Hub', href: '/green-hub' },
    },
    second: {
      title: 'Supporters',
      body: 'People who want to fund the environmental work happening where they live, and find out what came of it.',
    },
  },

  direction: {
    label: 'Where this goes',
    heading: 'Green banking is the goal. Green Hub is the first step.',
    body: 'Berry Bank intends to operate as a green bank. We are not one today. The Green Hub is how we start: the same people, the same causes, the funding side first.',
  },

  team: {
    label: 'Who we are',
    heading: 'You would be dealing with the people who build it.',
    body: 'Berry Bank is early. There are three of us.',
    members: [
      { name: 'Enrique Gomez Jackson', role: 'Chief Executive Officer' },
      { name: 'Don Vasser', role: 'Chief Technology Officer' },
      { name: 'Leo Sanchez', role: 'Chief Financial & Marketing Officer' },
    ],
  },

  signup: {
    label: 'Stay in touch',
    heading: 'We write when something ships.',
    body: 'Occasional updates on what we have released and where Berry Bank is opening next.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Green Hub page                                                             */
/* -------------------------------------------------------------------------- */

export const greenHubPage = {
  eyebrow: 'Live platform',
  headline: 'Green Hub',
  body: 'Green Hub connects local environmental organizations with supporters who want to fund their work. Organizations list a project. People nearby fund it.',
  cta: 'Open Green Hub',
  note: 'Green Hub is a separate application with its own account. Opening it will take you off this site.',
  forOrgs: {
    title: 'For organizations',
    body: 'Register, describe the project, and put it in front of the community it serves. You keep the relationship with everyone who funded it.',
  },
  forSupporters: {
    title: 'For supporters',
    body: 'Create an account to see environmental projects in your area and fund the ones you want to happen.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Investors page                                                             */
/* -------------------------------------------------------------------------- */

export const investors = {
  eyebrow: 'Investor information',
  headline: 'Berry Bank builds fundraising tools for environmental organizations.',
  body: 'This page is the short version. Materials, financials, and details of the current round are available on request.',

  facts: [
    { term: 'Legal entity', value: 'Berry Fintech, Inc.' },
    { term: 'Structure', value: 'Delaware C Corporation' },
    { term: 'Headquarters', value: 'San Antonio, Texas' },
    { term: 'Industry', value: 'Crowdfunding and Personal Fundraising' },
    { term: 'Live product', value: 'Green Hub' },
    { term: 'Stage', value: 'Early. First platform in market.' },
    { term: 'Long term goal', value: 'Green banking' },
  ],

  thesis: {
    label: 'The thesis',
    heading: 'Most platforms compete on reach. We compete on proximity.',
    body: [
      'Crowdfunding rewards campaigns that travel. Most causes do not travel, so most campaigns fail.',
      'Local environmental work is different. The people who benefit are easy to identify, easy to reach, and already motivated. Nobody has to persuade them the project matters. They can see it from the road.',
    ],
  },

  product: {
    label: 'The product',
    heading: 'Green Hub is in market.',
    body: 'Our first platform serves environmental organizations, matching them with supporters in their area. It tests the mechanics we intend to carry forward: local discovery, community-scale goals, and follow-through after funding.',
  },

  /* Deliberately no metrics. Add them here when there are real ones. */
  traction: {
    label: 'Traction',
    heading: 'Figures on request.',
    body: 'We do not publish numbers we cannot source. Ask, and we will walk you through where the Green Hub stands.',
  },

  contact: {
    label: 'Get in touch',
    heading: 'Write to the founders.',
    body: 'There is no investor relations desk. Email reaches the three of us.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Legal                                                                      */
/* -------------------------------------------------------------------------- */

export const legal = {
  updated: 'August 29, 2026',
  headline: 'Privacy Policy',
  intro:
    'This policy explains what Berry Fintech, Inc. ("Berry Bank", "we", "us") collects when you use our website and the Green Hub, why we collect it, and what you can ask us to do about it. We have kept it in plain language.',

  sections: [
    {
      heading: 'What we collect',
      body: 'We collect only what a given interaction requires.',
      list: [
        'What you give us. Your name, email address, and ZIP code when you sign up for updates, and the account details you provide when you register for the Green Hub.',
        'What your visit tells us. Pages viewed, approximate location from your IP address, browser and device type, and the site you arrived from.',
        'Payments. Contributions made through the Green Hub are processed by a third-party payment provider. Berry Bank does not store your card number.',
      ],
    },
    {
      heading: 'Why we use it',
      body: 'We use it to:',
      list: [
        'Operate the Green Hub and the accounts on it.',
        'Send you the updates you asked for, and nothing you did not.',
        'Show projects that are near you.',
        'Answer you when you contact us.',
        'Meet our legal, tax, and anti-fraud obligations.',
      ],
    },
    {
      heading: 'What we do not do',
      body: 'We do not sell your personal information. We do not rent or trade it. We do not hand it to advertisers to target you elsewhere.',
    },
    {
      heading: 'Who we share it with',
      body: 'We share information with the service providers who make the product run, including email delivery, payment processing, hosting, and analytics. Each one gets only the portion it needs. We may also disclose information if the law requires it, or to investigate fraud or a threat to someone\'s safety. If Berry Bank is ever acquired or merged, information may transfer as part of that transaction, and we will say so before it does.',
    },
    {
      heading: 'How long we keep it',
      body: 'Account information stays for as long as your account is open. Contribution records stay for as long as tax and financial rules require. Ask us to delete your information and we will, except where we are legally required to keep a record.',
    },
    {
      heading: 'Your choices',
      body: 'At any time you can:',
      list: [
        'Unsubscribe using the link at the bottom of any email we send.',
        'Ask for a copy of what we hold about you.',
        'Ask us to correct anything that is wrong.',
        'Ask us to delete your information.',
      ],
      after: 'Email us and we will handle it. Depending on where you live you may have further rights under state or national privacy law, including the Texas Data Privacy and Security Act. We honor those requests wherever you live.',
    },
    {
      heading: 'Security',
      body: 'We encrypt data in transit, limit access to the people who need it, and use established providers for payments and authentication. No system is perfect and we will not claim otherwise. If a breach affects your information, we will tell you.',
    },
    {
      heading: 'Children',
      body: 'Berry Bank is not intended for anyone under 13, and we do not knowingly collect information from children under 13. If you believe a child has given us information, contact us and we will remove it.',
    },
    {
      heading: 'Cookies',
      body: 'We use cookies necessary for the site to work, plus a small amount of analytics to see which pages get read. You can block cookies in your browser and the site will still work.',
    },
    {
      heading: 'Changes',
      body: 'If we change this policy we will update the date at the top of this page. If a change is significant, we will tell the people it affects.',
    },
    {
      heading: 'Contact',
      body: 'Questions about this policy, or a request about your information, go to the address below.',
    },
  ],
} as const;
