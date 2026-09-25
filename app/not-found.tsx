import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap section">
      <div className="notice empty">
        <h1 style={{ fontSize: 28 }}>We couldn’t find that page</h1>
        <p className="muted">The product may have been removed or the link is wrong.</p>
        <Link className="btn" href="/#catalogue">Browse the catalogue</Link>
      </div>
    </div>
  );
}