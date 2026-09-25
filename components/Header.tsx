'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
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
          <img src="/logo.jpg" alt="Skyline Computer World logo" width={44} height={44} />
          <span>
            Skyline
            <small>Computer World</small>
          </span>
        </Link>
        <form className="search" onSubmit={submit} role="search">
          <input
            className="input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search laptops, phones, accessories"
            aria-label="Search products"
          />
          <button className="btn sm" type="submit" aria-label="Search">
            <Search size={16} />
          </button>
        </form>
        <ThemeToggle />
        <button
          className="icon-btn"
          onClick={() => setOpen(true)}
          aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          type="button"
        >
          <ShoppingCart size={18} />
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}