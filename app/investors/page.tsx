import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { investors, company, home } from '@/content/site';

export const metadata: Metadata = {
  title: 'Investors',
  description:
    'Berry Fintech, Inc. is a Delaware C Corporation in San Antonio, Texas, building crowdfunding and personal fundraising products. Materials available on request.',
};

export default function InvestorsPage() {
  return (
    <>
      <section className="band band-tight page-head">
        <div className="shell">
          <Reveal>
            <p className="label page-eyebrow">{investors.eyebrow}</p>
            <h1 className="display page-title">{investors.headline}</h1>
            <p className="lead prose page-lead">{investors.body}</p>
            <p className="page-actions">
              <a href={`mailto:${company.email}`} className="btn btn-solid">
                Request materials
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* The company as a table of record. Mono, because these are filing facts. */}
      <section className="band-tight">
        <div className="shell">
          <Reveal>
            <dl className="facts">
              {investors.facts.map((fact) => (
                <div className="fact" key={fact.term}>
                  <dt className="label">{fact.term}</dt>
                  <dd className="fact-value">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{investors.thesis.label}</p>
              <div>
                <h2 className="h2 stack-heading">{investors.thesis.heading}</h2>
                {investors.thesis.body.map((p) => (
                  <p key={p} className="prose">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band-paper-2">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{investors.product.label}</p>
              <div>
                <h2 className="h2 stack-heading">{investors.product.heading}</h2>
                <p className="prose">{investors.product.body}</p>
                <p className="audience-cta">
                  <Link href="/green-hub" className="link">See the Green Hub</Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{investors.traction.label}</p>
              <div>
                <h2 className="h2 stack-heading">{investors.traction.heading}</h2>
                <p className="prose">{investors.traction.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band-paper-2">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">Founders</p>
              <ul className="team team-flush">
                {home.team.members.map((m) => (
                  <li key={m.name} className="team-member">
                    <p className="team-name">{m.name}</p>
                    <p className="mono team-role">{m.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band-berry">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{investors.contact.label}</p>
              <div className="hub-body">
                <h2 className="h2 stack-heading">{investors.contact.heading}</h2>
                <p className="lead prose">{investors.contact.body}</p>
                <p className="page-actions">
                  <a href={`mailto:${company.email}`} className="btn btn-solid">
                    {company.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
