import { Metadata } from 'next';
import { Leaf, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { client, queries } from '@/lib/sanity';
import { PortableText } from 'next-sanity';

export const metadata: Metadata = {
  title: 'Privacy Policy | Berry Bank',
  description: 'Berry Bank privacy policy and data protection information.',
};

interface PrivacySection {
  heading: string;
  content: any[];
}

interface PrivacyData {
  lastUpdated?: string;
  sections?: PrivacySection[];
  contactEmail?: string;
  companyAddress?: string;
}

const defaultSections = [
  {
    heading: '1. Introduction',
    text: 'Berry Fintech, Inc. ("Berry Bank," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.',
  },
  {
    heading: '2. Information We Collect',
    text: 'We may collect information about you in various ways, including:',
    list: [
      'Personal information you provide (name, email, etc.)',
      'Financial information necessary for banking services',
      'Device and usage information',
      'Location data (with your consent)',
    ],
  },
  {
    heading: '3. Data Security',
    text: 'We use AES-256 encryption and adhere to PCI-DSS compliance standards to protect your data. We implement administrative, technical, and physical security measures to safeguard your personal information.',
  },
  {
    heading: '4. How We Use Your Information',
    text: 'We use the information we collect to:',
    list: [
      'Provide and maintain our services',
      'Process transactions and send related information',
      'Send promotional communications (with your consent)',
      'Improve our services and develop new features',
      'Comply with legal obligations',
    ],
  },
  {
    heading: '5. Contact Us',
    text: 'If you have questions about this Privacy Policy, please contact us.',
  },
];

export default async function PrivacyPage() {
  const data: PrivacyData | null = await client.fetch(queries.privacyPage).catch(() => null);

  const hasCmsContent = data?.sections && data.sections.length > 0;
  const contactEmail = data?.contactEmail || 'contact@berrybank.app';
  const companyAddress = data?.companyAddress || 'Berry Fintech, Inc., Austin, TX';
  const lastUpdated = data?.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="min-h-screen bg-void text-mist py-20 pb-28 md:pb-20 px-6" data-nav-theme="dark">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-mist/60 hover:text-mist transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-berry flex items-center justify-center">
              <Leaf className="w-6 h-6 text-mist" />
            </div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          
          <p className="text-mist/60">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {hasCmsContent ? (
            /* CMS content */
            data.sections!.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-xl font-bold text-mist mb-4">{section.heading}</h2>
                <div className="text-mist/70 leading-relaxed [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_p]:mb-4 [&_a]:text-berry [&_a]:hover:underline">
                  <PortableText value={section.content} />
                </div>
              </section>
            ))
          ) : (
            /* Fallback hardcoded content */
            <>
              {defaultSections.map((section, index) => (
                <section key={index} className="mb-10">
                  <h2 className="text-xl font-bold text-mist mb-4">{section.heading}</h2>
                  <p className="text-mist/70 leading-relaxed mb-4">{section.text}</p>
                  {section.list && (
                    <ul className="list-disc list-inside text-mist/70 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <section className="mb-10">
                <p className="text-mist mt-4">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contactEmail}`} className="text-berry hover:underline">
                    {contactEmail}
                  </a>
                </p>
                <p className="text-mist mt-2">
                  <strong>Address:</strong> {companyAddress}
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-mist/40">
          <p>© {new Date().getFullYear()} Berry Fintech, Inc. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
