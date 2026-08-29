import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { HubEmbed } from '@/components/HubEmbed';
import { greenHub, greenHubPage, company } from '@/content/site';

export const metadata: Metadata = {
  title: 'Green Hub',
  description: greenHub.summary,
};

export default function GreenHubPage() {
  return (
    <>
      <section className="band band-tight page-head">
        <div className="shell">
          <Reveal>
            <p className="label page-eyebrow">
              <span className="live" aria-hidden="true" />
              {greenHubPage.eyebrow}
            </p>
            <h1 className="display page-title">{greenHubPage.headline}</h1>
            <p className="lead prose page-lead">{greenHubPage.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="band-tight">
        <div className="shell">
          <Reveal>
            <HubEmbed />
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">Two sides</p>
              <div className="audiences">
                <article className="audience audience-lead">
                  <h2 className="h2 stack-heading">{greenHubPage.forOrgs.title}</h2>
                  <p className="prose">{greenHubPage.forOrgs.body}</p>
                </article>
                <article className="audience audience-second">
                  <h2 className="h3 stack-heading">{greenHubPage.forSupporters.title}</h2>
                  <p className="soft prose">{greenHubPage.forSupporters.body}</p>
                </article>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band-berry">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">Before you go</p>
              <div className="hub-body">
                <p className="lead prose">{greenHubPage.note}</p>
                <div className="hero-actions">
                  <a
                    href={greenHub.url}
                    className="btn btn-solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {greenHubPage.cta}
                  </a>
                  <a href={`mailto:${company.email}`} className="btn btn-line">
                    Ask us a question
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
