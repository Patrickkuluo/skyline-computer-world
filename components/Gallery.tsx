'use client';
import { useState } from 'react';

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [broken, setBroken] = useState<Set<number>>(new Set());
  if (images.length === 0) return <div className="main-img empty muted" style={{ display: 'grid', placeItems: 'center' }}>No image available</div>;
  const bad = (n: number) => setBroken((s) => new Set(s).add(n));
  return (
    <div>
      {broken.has(i) ? <div className="main-img muted" style={{ display: 'grid', placeItems: 'center' }}>Image couldn’t load</div>
        : <img className="main-img" src={images[i]} alt={`${name}, image ${i + 1} of ${images.length}`} onClick={() => setZoom(true)} onError={() => bad(i)} />}
      {images.length > 1 && (
        <div className="thumbs">{images.map((src, n) => (
          <button key={src} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Show image ${n + 1}`}><img src={src} alt="" loading="lazy" /></button>
        ))}</div>
      )}
      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged image" onClick={() => setZoom(false)}>
          <img src={images[i]} alt={name} />
          {images.length > 1 && <div style={{ position: 'absolute', bottom: 16 }} className="row">
            <button className="btn sm" onClick={(e) => { e.stopPropagation(); setI((i + images.length - 1) % images.length); }}>Previous</button>
            <button className="btn sm" onClick={(e) => { e.stopPropagation(); setI((i + 1) % images.length); }}>Next</button>
          </div>}
          <button className="btn sm" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setZoom(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
