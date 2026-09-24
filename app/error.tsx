'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="wrap section"><div className="notice err"><h2>Something went wrong</h2><p>Please try again. If it continues, message us on WhatsApp.</p><button className="btn" onClick={reset}>Try again</button></div></div>;
}
