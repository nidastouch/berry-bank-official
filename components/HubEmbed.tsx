'use client';

import { useEffect, useRef, useState } from 'react';
import { greenHub } from '@/content/site';

/** The Green Hub is built for a desktop viewport. We render it at that size
 *  and scale it down to fit, rather than squeezing its layout. */
const FRAME_W = 1360;
const FRAME_H = 850;

export function HubEmbed() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [wideEnough, setWideEnough] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setWideEnough(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const node = boxRef.current;
    if (!node || !wideEnough) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_W);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [wideEnough]);

  return (
    <figure className="hub-figure">
      <div className="hub-frame" ref={boxRef}>
        {wideEnough && (
          <iframe
            src={greenHub.url}
            title="Green Hub, live preview"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="hub-iframe"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(${scale || 0})`,
              opacity: scale ? 1 : 0,
            }}
          />
        )}

        {!wideEnough && (
          <div className="hub-fallback">
            <p className="soft">
              The Green Hub is built for a larger screen. Open it directly to sign in
              or create an account.
            </p>
          </div>
        )}

        <a
          href={greenHub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hub-overlay"
        >
          <span className="btn btn-solid">Open Green Hub</span>
        </a>
      </div>

      <figcaption className="hub-caption">
        {wideEnough
          ? 'Live preview. Signing in happens on the Green Hub itself, never in this frame.'
          : 'Green Hub opens in its own tab.'}
      </figcaption>
    </figure>
  );
}
