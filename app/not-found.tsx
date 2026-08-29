import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="band page-head">
      <div className="shell">
        <p className="label page-eyebrow">404</p>
        <h1 className="display page-title">That page is not here.</h1>
        <p className="lead prose page-lead">
          The link may be old, or we may have moved something. The homepage will get
          you where you were going.
        </p>
        <p className="page-actions">
          <Link href="/" className="btn btn-solid">Back to the homepage</Link>
        </p>
      </div>
    </section>
  );
}
