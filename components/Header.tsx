'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const { count, setOpen } = useCart();
  const [q, setQ] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = q.trim();
    router.push(t ? `/?q=${encodeURIComponent(t)}#catalogue` : '/#catalogue');
  }
  return (
    <header className="top">
      <div className="wrap bar">
        <Link href="/" className="brand" aria-label="Skyline Computer World home">
          <img src="/logo.jpg" alt="Skyline Computer World logo" width={48} height={48} />
          <span>Skyline<br />Computer World</span>
        </Link>
        <form className="search" onSubmit={submit} role="search">
          <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search laptops, phones, accessories" aria-label="Search products" />
          <button className="btn sm" type="submit">Search</button>
        </form>
        <ThemeToggle />
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          🛒{count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
