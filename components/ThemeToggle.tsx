'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => { setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'); }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  }
  return (
    <button className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to white theme' : 'Switch to black theme'} title="Toggle black / white theme">
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
