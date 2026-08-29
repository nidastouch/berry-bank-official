import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { legal, company } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What Berry Fintech, Inc. collects, why, and what you can ask us to do about it.',
};

export default function LegalPage() {
  return (
    <>
      <section className="band band-tight page-head">
        <div className="shell">
          <Reveal>
            <p className="label page-eyebrow">Last updated {legal.updated}</p>
            <h1 className="display page-title legal-title">{legal.headline}</h1>
            <p className="lead prose page-lead">{legal.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="band-tight legal-body">
        <div className="shell">
          {legal.sections.map((section) => (
            <Reveal key={section.heading}>
              <div className="rail legal-section">
                <h2 className="label rail-label legal-heading">{section.heading}</h2>
                <div>
                  <p className="prose">{section.body}</p>

                  {'list' in section && section.list && (
                    <ul className="legal-list">
                      {section.list.map((item) => (
                        <li key={item} className="legal-item">
                          <span className="legal-bullet" aria-hidden="true" />
                          <span className="prose">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {'after' in section && section.after && (
                    <p className="prose legal-after">{section.after}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="rail legal-section">
              <h2 className="label rail-label legal-heading">Reach us</h2>
              <address className="legal-address">
                <p className="h3">{company.legalName}</p>
                <p className="soft">{company.location}</p>
                <p>
                  <a href={`mailto:${company.email}`} className="link">{company.email}</a>
                </p>
              </address>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
