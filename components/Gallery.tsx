'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [broken, setBroken] = useState<Set<number>>(new Set());
  const total = images.length;

  const move = useCallback(
    (dir: number) => setI((cur) => (cur + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (!zoom) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, move]);

  if (total === 0) {
    return (
      <div className="main-img empty muted" style={{ display: 'grid', placeItems: 'center' }}>
        No image available
      </div>
    );
  }

  return (
    <div>
      {broken.has(i) ? (
        <div className="main-img muted" style={{ display: 'grid', placeItems: 'center' }}>
          Image couldn’t load
        </div>
      ) : (
        <img
          className="main-img"
          src={images[i]}
          alt={`${name}, image ${i + 1} of ${total}`}
          onClick={() => setZoom(true)}
          onError={() => setBroken((s) => new Set(s).add(i))}
        />
      )}

      {total > 1 && (
        <div className="thumbs" role="tablist" aria-label="Product images">
          {images.map((src, n) => (
            <button
              key={src + n}
              className={n === i ? 'on' : ''}
              onClick={() => setI(n)}
              aria-label={`Show image ${n + 1}`}
              aria-selected={n === i}
              role="tab"
              type="button"
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image"
          onClick={() => setZoom(false)}
        >
          <img src={images[i]} alt={name} onClick={(e) => e.stopPropagation()} />
          {total > 1 && (
            <>
              <button
                className="icon-btn"
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  move(-1);
                }}
                aria-label="Previous image"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="icon-btn"
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  move(1);
                }}
                aria-label="Next image"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <button
            className="icon-btn"
            style={{ position: 'absolute', top: 16, right: 16 }}
            onClick={() => setZoom(false)}
            aria-label="Close"
            type="button"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}