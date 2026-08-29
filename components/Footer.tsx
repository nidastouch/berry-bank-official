import Link from 'next/link';
import { Mark } from './Mark';
import { company, greenHub } from '@/content/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Mark className="footer-mark" />
            <p className="footer-aside">{company.aside}</p>
          </div>

          <div className="footer-cols">
            <div>
              <p className="label">Site</p>
              <ul className="footer-list">
                <li><Link href="/#how" className="footer-link">How it works</Link></li>
                <li><Link href="/green-hub" className="footer-link">Green Hub</Link></li>
                <li><Link href="/investors" className="footer-link">Investors</Link></li>
              </ul>
            </div>

            <div>
              <p className="label">Legal</p>
              <ul className="footer-list">
                <li><Link href="/legal" className="footer-link">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <p className="label">Contact</p>
              <ul className="footer-list">
                <li>
                  <a href={`mailto:${company.email}`} className="footer-link">
                    {company.email}
                  </a>
                </li>
                <li className="footer-plain">{company.location}</li>
                <li>
                  <a
                    href={greenHub.url}
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Green Hub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="rule footer-rule" />

        <div className="footer-meta mono">
          <span>{company.legalName}</span>
          <span>{company.entity}</span>
          <span>{company.industry}</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
