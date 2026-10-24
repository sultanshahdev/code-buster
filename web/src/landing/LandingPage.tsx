import React, { useEffect, useRef } from 'react';
import { ArrowRight, Crosshair, ExternalLink, Map, Search, ShieldCheck } from 'lucide-react';
import { CodeCraftGhost } from '../brand/CodeCraftGhost';
import { CodeCraftWordmark } from '../brand/CodeCraftWordmark';
import { PaymentRetryStory } from './PaymentRetryStory';
import { SessionExpirationStory } from './SessionExpirationStory';
import { WebhookVerificationStory } from './WebhookVerificationStory';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { const o = new IntersectionObserver((entries) => entries[0]?.isIntersecting && ref.current?.classList.add('is-visible'), { threshold: .16 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <section ref={ref} className={`cc-reveal ${className}`}>{children}</section>;
}

export function LandingPage({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  const learn = () => document.getElementById('trail')?.scrollIntoView({ behavior: 'smooth' });
  return <div className="cc-landing">
    <header className="cc-nav"><CodeCraftWordmark /><nav><button onClick={learn}>How it works</button><a href="https://github.com/sultanshahdev/codecraft" target="_blank" rel="noreferrer">GitHub</a><button className="cc-nav-cta" onClick={onOpenWorkspace}>Explore a repository <ArrowRight size={15}/></button></nav></header>
    <main>
      <section className="cc-hero"><div className="cc-hero-copy"><p className="cc-kicker">A local-first investigation tool</p><h1><span>Every codebase</span><span>has a mystery.</span></h1><p className="cc-hero-sub">Find the code behind the behavior.</p><p className="cc-hero-desc">Explore unfamiliar repositories, follow real source evidence, and understand how things work.</p><div className="cc-actions"><button className="cc-button cc-button--coral" onClick={onOpenWorkspace}>Explore a repository <ArrowRight size={17}/></button><button className="cc-button cc-button--quiet" onClick={learn}>See how it works</button></div></div><div className="cc-hero-art" aria-label="CodeCraft ghost following source evidence" role="img"><div className="cc-orbit"/><CodeCraftGhost className="cc-hero-ghost"/><div className="cc-evidence-card"><span><Search size={14}/> Where is a failed payment retried?</span><b>src/billing/retry.ts</b><code>42–68 · candidate evidence</code></div></div></section>
      <Reveal className="cc-trail"><div id="trail" className="cc-section-label"><Crosshair size={15}/> Follow the trail</div><PaymentRetryStory onOpenWorkspace={onOpenWorkspace}/></Reveal>
      <Reveal><SessionExpirationStory/></Reveal>
      <Reveal><WebhookVerificationStory/></Reveal>
      <Reveal className="cc-map-promo"><div><div className="cc-section-label"><Map size={15}/> See the whole repository</div><h2>A map made of <em>real files.</em></h2><p>Pan across the actual directory hierarchy, narrow by language, then open a file directly into source evidence.</p><button className="cc-text-action" onClick={onOpenWorkspace}>Open the explorer <ArrowRight size={15}/></button></div><div className="cc-map-illustration"><svg viewBox="0 0 500 270" aria-label="Repository hierarchy map"><g className="cc-map-lines"><path d="M72 136L202 70M72 136l130 66M202 70l140-32m-140 32 140 35M202 202l140 28"/></g><g className="cc-map-node"><rect x="28" y="114" width="90" height="42"/><text x="73" y="140">root</text></g><g className="cc-map-node"><rect x="161" y="49" width="82" height="42"/><text x="202" y="75">src</text></g><g className="cc-map-node cc-map-node--active"><rect x="336" y="18" width="125" height="42"/><text x="398" y="44">retry.ts</text></g><g className="cc-map-node"><rect x="336" y="83" width="125" height="42"/><text x="398" y="109">payments.ts</text></g><g className="cc-map-node"><rect x="161" y="181" width="82" height="42"/><text x="202" y="207">test</text></g><g className="cc-map-node"><rect x="336" y="209" width="125" height="42"/><text x="398" y="235">retry.test.ts</text></g></svg></div></Reveal>
      <Reveal className="cc-evidence"><div className="cc-evidence-number">Evidence<br/>over<br/><span>guesses.</span></div><div><div className="cc-section-label"><ShieldCheck size={15}/> Built to be honest</div><p>Every result keeps its file, line range, and source excerpt attached. Partial coverage and unsupported operations stay visible, because confidence without context is not useful.</p><ul><li>Inspectable locations, not summaries</li><li>Honest ranking and coverage warnings</li><li>Local processing, public GitHub sources when you choose</li></ul></div></Reveal>
      <Reveal className="cc-close"><CodeCraftGhost/><div><p className="cc-kicker">Start investigating</p><h2>The answer is in the code.</h2><button className="cc-button cc-button--coral" onClick={onOpenWorkspace}>Explore a repository <ArrowRight size={17}/></button></div></Reveal>
    </main><footer className="cc-footer"><CodeCraftWordmark compact/><span>Find the code behind the behavior.</span><a href="https://github.com/sultanshahdev/codecraft" target="_blank" rel="noreferrer"><ExternalLink size={15}/> GitHub</a></footer>
  </div>;
}
