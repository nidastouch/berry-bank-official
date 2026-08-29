import Link from 'next/link';
import { Mark } from './Mark';
import { company, nav } from '@/content/site';

export function Header() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <Link href="/" className="wordmark" aria-label={`${company.name}, home`}>
          <Mark className="wordmark-mark" />
          <span>{company.name}</span>
        </Link>

        <nav className="masthead-nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="masthead-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={`mailto:${company.email}`} className="btn btn-line masthead-cta">
          Contact
        </a>
      </div>
    </header>
  );
}
