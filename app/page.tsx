import Link from 'next/link';
import { Mark } from '@/components/Mark';
import { Reveal } from '@/components/Reveal';
import { SignupForm } from '@/components/SignupForm';
import { home, greenHub, company } from '@/content/site';

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero — type on the left, the mark cropped by the right edge.      */}
      {/* ---------------------------------------------------------------- */}
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-type">
            <p className="label hero-eyebrow">{home.hero.eyebrow}</p>
            <h1 className="display hero-headline">{home.hero.headline}</h1>
            <p className="lead hero-body">{home.hero.body}</p>
            <div className="hero-actions">
              <Link href={home.hero.primary.href} className="btn btn-solid">
                {home.hero.primary.label}
              </Link>
              <Link href={home.hero.secondary.href} className="btn btn-line">
                {home.hero.secondary.label}
              </Link>
            </div>
          </div>
        </div>
        <Mark className="hero-mark" />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Premise                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="band band-paper-2">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.premise.label}</p>
              <div>
                <h2 className="h2 stack-heading">{home.premise.heading}</h2>
                {home.premise.body.map((p) => (
                  <p key={p} className="prose">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works — a genuine sequence, so it is numbered.             */}
      {/* ---------------------------------------------------------------- */}
      <section className="band" id="how">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.how.label}</p>
              <h2 className="h2 section-heading">{home.how.heading}</h2>
            </div>
          </Reveal>

          <ol className="steps">
            {home.how.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 90} className="step">
                <span className="mono step-n">{step.n}</span>
                <h3 className="h3 step-title">{step.title}</h3>
                <p className="soft step-body">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Green Hub — the one heavy color field on the site.               */}
      {/* ---------------------------------------------------------------- */}
      <section className="band band-berry">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">
                <span className="live" aria-hidden="true" />
                {greenHub.status}
              </p>
              <div className="hub-body">
                <h2 className="h2 stack-heading">{greenHub.name}</h2>
                <p className="lead prose">{greenHub.summary}</p>
                <div className="hero-actions">
                  <Link href="/green-hub" className="btn btn-solid">
                    See what it does
                  </Link>
                  <a
                    href={greenHub.url}
                    className="btn btn-line"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open the platform
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Audiences — two blocks, deliberately unequal.                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.audiences.label}</p>
              <div className="audiences">
                <article className="audience audience-lead">
                  <h3 className="h2 stack-heading">{home.audiences.lead.title}</h3>
                  <p className="prose">{home.audiences.lead.body}</p>
                  <p className="audience-cta">
                    <Link href={home.audiences.lead.cta.href} className="link">
                      {home.audiences.lead.cta.label}
                    </Link>
                  </p>
                </article>

                <article className="audience audience-second">
                  <h3 className="h3 stack-heading">{home.audiences.second.title}</h3>
                  <p className="soft prose">{home.audiences.second.body}</p>
                </article>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Direction — stated as a goal, because that is what it is.         */}
      {/* ---------------------------------------------------------------- */}
      <section className="band band-tight">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.direction.label}</p>
              <div>
                <h2 className="h2 stack-heading">{home.direction.heading}</h2>
                <p className="prose">{home.direction.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Team — real people, no stock photography.                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="band band-paper-2">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.team.label}</p>
              <div>
                <h2 className="h2 stack-heading">{home.team.heading}</h2>
                <p className="lead prose">{home.team.body}</p>
              </div>
            </div>
          </Reveal>

          <ul className="team">
            {home.team.members.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 80} className="team-member">
                <p className="team-name">{m.name}</p>
                <p className="mono team-role">{m.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Signup                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="band" id="updates">
        <div className="shell">
          <Reveal>
            <div className="rail">
              <p className="label rail-label">{home.signup.label}</p>
              <div className="signup">
                <div className="signup-copy">
                  <h2 className="h2 stack-heading">{home.signup.heading}</h2>
                  <p className="soft prose">{home.signup.body}</p>
                  <p className="soft signup-alt">
                    Prefer to just write to us?{' '}
                    <a href={`mailto:${company.email}`} className="link">{company.email}</a>
                  </p>
                </div>
                <div className="signup-form">
                  <SignupForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
