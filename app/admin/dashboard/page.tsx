'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { normalize } from '@/lib/products';
import { ALL_CATEGORIES, CATEGORY_GROUPS } from '@/lib/categories';
import { AVAILABILITY, type Product } from '@/lib/types';
import { ksh, slugify } from '@/lib/site';

type Draft = {
  id?: string; name: string; slug: string; brand: string; model: string; category: string; condition: string;
  price: string; availability: string; stock: string; description: string;
  specs: { k: string; v: string }[]; options: { label: string; choices: { value: string; price: string }[] }[]; images: string[];
};
const BUCKET = 'product-images';
const blank = (): Draft => ({ name: '', slug: '', brand: '', model: '', category: ALL_CATEGORIES[0], condition: '', price: '', availability: 'In Stock', stock: '0', description: '', specs: [{ k: '', v: '' }], options: [], images: [] });
const pathOf = (url: string) => decodeURIComponent(url.split(`/${BUCKET}/`)[1] ?? '');
const toDraft = (p: Product): Draft => ({
  id: p.id, name: p.name, slug: p.slug, brand: p.brand ?? '', model: p.model ?? '', category: p.category, condition: p.condition ?? '',
  price: String(p.price), availability: p.availability, stock: String(p.stock), description: p.description ?? '',
  specs: Object.entries(p.specifications).map(([k, v]) => ({ k, v })), options: p.options.map((g) => ({ label: g.label, choices: g.choices.map((c) => ({ value: c.value, price: String(c.price) })) })), images: p.images,
});

export default function Dashboard() {
  const router = useRouter();
  const [state, setState] = useState<'loading' | 'denied' | 'ok'>('loading');
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) setMsg('Could not load products: ' + error.message); else setProducts((data ?? []).map(normalize));
  }, []);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.replace('/admin/login');
      const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle();
      if (!data) return setState('denied');
      setState('ok'); load();
    })();
  }, [router, load]);

  async function signOut() { await supabase.auth.signOut(); router.replace('/admin/login'); }
  async function remove(p: Product) {
    if (!confirm(`Delete “${p.name}”? This also deletes its images.`)) return;
    const paths = p.images.map(pathOf).filter(Boolean);
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    const { error } = await supabase.from('products').delete().eq('id', p.id);
    setMsg(error ? 'Delete failed: ' + error.message : `Deleted “${p.name}”.`);
    load();
  }

  if (state === 'loading') return <div className="wrap section">Loading…</div>;
  if (state === 'denied') return <div className="wrap section"><div className="notice err"><h2>No admin access</h2><p>This account isn’t authorised to manage products.</p><button className="btn" onClick={signOut}>Sign out</button></div></div>;

  return (
    <div className="wrap section admin">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 28 }}>Products</h1>
        <div className="row"><button className="btn" onClick={() => { setDraft(blank()); setMsg(''); }}>Add product</button><button className="btn ghost" onClick={signOut}>Sign out</button></div>
      </div>
      {msg && <p role="status">{msg}</p>}
      {draft ? <Editor draft={draft} onDone={(saved) => { setDraft(null); if (saved) { setMsg('Saved and published.'); load(); } }} /> : (
        products.length === 0 ? <div className="notice empty"><p>No products yet. Add your first product.</p></div> : (
          <div style={{ overflowX: 'auto' }}><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Availability</th><th></th></tr></thead><tbody>
            {products.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.category}</td><td>{ksh(p.price)}</td><td>{p.availability}</td>
              <td><div className="row"><button className="btn outline sm" onClick={() => { setDraft(toDraft(p)); setMsg(''); }}>Edit</button><button className="btn danger sm" onClick={() => remove(p)}>Delete</button></div></td></tr>)}
          </tbody></table></div>)
      )}
    </div>
  );
}

function Editor({ draft, onDone }: { draft: Draft; onDone: (saved: boolean) => void }) {
  const [d, setD] = useState<Draft>(draft);
  const [added, setAdded] = useState<string[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (patch: Partial<Draft>) => setD((x) => ({ ...x, ...patch }));

  async function upload(files: FileList | null) {
    if (!files) return;
    const room = 6 - d.images.length;
    if (files.length > room) setErr(`You can add ${room} more image${room === 1 ? '' : 's'} (maximum 6).`);
    const urls: string[] = [];
    for (const f of Array.from(files).slice(0, Math.max(room, 0))) {
      const path = `${slugify(d.name) || 'product'}/${Date.now()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, f, { cacheControl: '31536000' });
      if (error) { setErr('Image upload failed: ' + error.message); continue; }
      urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    }
    setAdded((a) => [...a, ...urls]); set({ images: [...d.images, ...urls] });
  }
  function dropImage(url: string) {
    set({ images: d.images.filter((u) => u !== url) });
    if (added.includes(url)) { supabase.storage.from(BUCKET).remove([pathOf(url)]); setAdded((a) => a.filter((u) => u !== url)); }
    else setRemoved((r) => [...r, url]);
  }
  async function cancel() { if (added.length) await supabase.storage.from(BUCKET).remove(added.map(pathOf)); onDone(false); }

  async function save() {
    setErr('');
    const price = Number(d.price);
    if (!d.name.trim()) return setErr('Enter a product name.');
    if (!Number.isFinite(price) || price < 0 || d.price === '') return setErr('Enter a valid price in KSh.');
    if (d.images.length < 1) return setErr('Add at least one image (up to 6).');
    const specifications = Object.fromEntries(d.specs.filter((s) => s.k.trim() && s.v.trim()).map((s) => [s.k.trim(), s.v.trim()]));
    const options = d.options.map((g) => ({ label: g.label.trim(), choices: g.choices.filter((c) => c.value.trim()).map((c) => ({ value: c.value.trim(), price: Math.max(0, Number(c.price) || 0) })) })).filter((g) => g.label && g.choices.length);
    const row = {
      name: d.name.trim(), slug: slugify(d.slug || d.name), description: d.description.trim() || null, price, category: d.category,
      brand: d.brand.trim() || null, model: d.model.trim() || null, condition: d.condition.trim() || null,
      stock: Math.max(0, Math.floor(Number(d.stock) || 0)), availability: d.availability, images: d.images, specifications, options,
    };
    setBusy(true);
    const { error } = d.id ? await supabase.from('products').update(row).eq('id', d.id) : await supabase.from('products').insert(row);
    setBusy(false);
    if (error) return setErr(error.code === '23505' ? 'Another product already uses this URL name. Change the URL name.' : 'Save failed: ' + error.message);
    if (removed.length) await supabase.storage.from(BUCKET).remove(removed.map(pathOf));
    onDone(true);
  }

  return (
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      <h2>{d.id ? 'Edit product' : 'Add product'}</h2>
      <div className="cols">
        <div><label className="f" htmlFor="n">Name</label><input id="n" className="input" value={d.name} onChange={(e) => set({ name: e.target.value })} /></div>
        <div><label className="f" htmlFor="s">URL name (optional)</label><input id="s" className="input" value={d.slug} placeholder={slugify(d.name)} onChange={(e) => set({ slug: e.target.value })} /></div>
        <div><label className="f" htmlFor="c">Category</label><select id="c" className="input" value={d.category} onChange={(e) => set({ category: e.target.value })}>{CATEGORY_GROUPS.map((g) => <optgroup key={g.name} label={g.name}>{g.items.map((i) => <option key={i}>{i}</option>)}</optgroup>)}</select></div>
        <div><label className="f" htmlFor="b">Brand</label><input id="b" className="input" value={d.brand} onChange={(e) => set({ brand: e.target.value })} /></div>
        <div><label className="f" htmlFor="m">Model</label><input id="m" className="input" value={d.model} onChange={(e) => set({ model: e.target.value })} /></div>
        <div><label className="f" htmlFor="cd">Condition (e.g. New, Refurbished, Used)</label><input id="cd" className="input" value={d.condition} onChange={(e) => set({ condition: e.target.value })} /></div>
        <div><label className="f" htmlFor="p">Base price (KSh)</label><input id="p" className="input" inputMode="numeric" value={d.price} onChange={(e) => set({ price: e.target.value })} /></div>
        <div><label className="f" htmlFor="a">Availability</label><select id="a" className="input" value={d.availability} onChange={(e) => set({ availability: e.target.value })}>{AVAILABILITY.map((a) => <option key={a}>{a}</option>)}</select></div>
        <div><label className="f" htmlFor="st">Stock count</label><input id="st" className="input" inputMode="numeric" value={d.stock} onChange={(e) => set({ stock: e.target.value })} /></div>
      </div>
      <label className="f" htmlFor="d">Description</label>
      <textarea id="d" className="input" value={d.description} onChange={(e) => set({ description: e.target.value })} />

      <h3 style={{ marginTop: 20 }}>Specifications</h3>
      <p className="small muted">Only enter verified values. Use names like Processor, RAM, Storage, Screen, Display so filters and cards pick them up.</p>
      {d.specs.map((s, i) => (
        <div key={i} className="row" style={{ marginBottom: 6 }}>
          <input className="input" style={{ flex: 1 }} aria-label="Specification name" placeholder="Name" value={s.k} onChange={(e) => set({ specs: d.specs.map((x, j) => (j === i ? { ...x, k: e.target.value } : x)) })} />
          <input className="input" style={{ flex: 2 }} aria-label="Specification value" placeholder="Value" value={s.v} onChange={(e) => set({ specs: d.specs.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)) })} />
          <button className="btn ghost sm" onClick={() => set({ specs: d.specs.filter((_, j) => j !== i) })}>Remove</button>
        </div>))}
      <button className="btn outline sm" onClick={() => set({ specs: [...d.specs, { k: '', v: '' }] })}>Add specification</button>

      <h3 style={{ marginTop: 20 }}>Options customers can choose</h3>
      <p className="small muted">Each choice can add to the base price (enter 0 for the default). Example: Storage → 256GB SSD +0, 512GB SSD +5000.</p>
      {d.options.map((g, gi) => (
        <div key={gi} className="notice" style={{ marginBottom: 8 }}>
          <div className="row"><input className="input" style={{ flex: 1 }} aria-label="Option name" placeholder="Option name (e.g. RAM)" value={g.label} onChange={(e) => set({ options: d.options.map((x, j) => (j === gi ? { ...x, label: e.target.value } : x)) })} />
            <button className="btn ghost sm" onClick={() => set({ options: d.options.filter((_, j) => j !== gi) })}>Remove option</button></div>
          {g.choices.map((c, ci) => (
            <div key={ci} className="row" style={{ marginTop: 6 }}>
              <input className="input" style={{ flex: 2 }} aria-label="Choice" placeholder="Choice (e.g. 16GB)" value={c.value} onChange={(e) => set({ options: d.options.map((x, j) => (j === gi ? { ...x, choices: x.choices.map((y, k) => (k === ci ? { ...y, value: e.target.value } : y)) } : x)) })} />
              <input className="input" style={{ flex: 1 }} inputMode="numeric" aria-label="Extra price in KSh" placeholder="+ KSh" value={c.price} onChange={(e) => set({ options: d.options.map((x, j) => (j === gi ? { ...x, choices: x.choices.map((y, k) => (k === ci ? { ...y, price: e.target.value } : y)) } : x)) })} />
              <button className="btn ghost sm" onClick={() => set({ options: d.options.map((x, j) => (j === gi ? { ...x, choices: x.choices.filter((_, k) => k !== ci) } : x)) })}>Remove</button>
            </div>))}
          <button className="btn outline sm" style={{ marginTop: 8 }} onClick={() => set({ options: d.options.map((x, j) => (j === gi ? { ...x, choices: [...x.choices, { value: '', price: '0' }] } : x)) })}>Add choice</button>
        </div>))}
      <button className="btn outline sm" onClick={() => set({ options: [...d.options, { label: '', choices: [{ value: '', price: '0' }] }] })}>Add option</button>

      <h3 style={{ marginTop: 20 }}>Images ({d.images.length}/6)</h3>
      <div className="thumbs-adm">{d.images.map((u) => <div key={u}><img src={u} alt="" /><button aria-label="Remove image" onClick={() => dropImage(u)}>×</button></div>)}</div>
      {d.images.length < 6 && <p><input type="file" accept="image/*" multiple aria-label="Upload images" onChange={(e) => { upload(e.target.files); e.target.value = ''; }} /></p>}

      {err && <p role="alert" style={{ color: 'var(--err)' }}>{err}</p>}
      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save and publish'}</button>
        <button className="btn ghost" onClick={cancel} disabled={busy}>Cancel</button>
      </div>
    </div>
  );
}
