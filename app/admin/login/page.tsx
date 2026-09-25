'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setErr('Sign in failed. Check your email and password.');
    router.push('/admin/dashboard');
  }
  return (
    <div className="wrap section" style={{ maxWidth: 420 }}>
      <h1 style={{ fontSize: 28 }}>Admin sign in</h1>
      <form onSubmit={submit}>
        <label className="f" htmlFor="email">Email</label>
        <input
          id="email"
          className="input"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="f" htmlFor="pw">Password</label>
        <input
          id="pw"
          className="input"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p role="alert" style={{ color: 'var(--err)' }}>{err}</p>}
        <p>
          <button className="btn block" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </p>
      </form>
    </div>
  );
}