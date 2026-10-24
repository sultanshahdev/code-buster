import React, { useState } from 'react';
import { CodeCraftMark } from './CodeCraftMark';

export function CodeCraftGhost({ className = '', label }: { className?: string; label?: string }) {
  const [renderUnavailable, setRenderUnavailable] = useState(false);
  return <div className={`codecraft-ghost ${className}`} aria-label={label} role={label ? 'img' : undefined} aria-hidden={label ? undefined : true}>
    {!renderUnavailable && <img className="codecraft-ghost__render" src="/brand/codecraft-hero.png" alt="" onError={() => setRenderUnavailable(true)} />}
    {renderUnavailable && <span className="codecraft-ghost__fallback"><CodeCraftMark size={160} title={label ?? 'Decorative CodeCraft ghost'} /></span>}
    <i className="codecraft-ghost__trail codecraft-ghost__trail--one" /><i className="codecraft-ghost__trail codecraft-ghost__trail--two" />
  </div>;
}
