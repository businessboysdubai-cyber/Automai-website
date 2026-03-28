'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HERO } from '@/lib/constants';

// Embed the robot inside the phone mockup — client only, no SSR
const RobotSceneEmbed = dynamic(
  () => import('@/components/canvas/RobotScene'),
  { ssr: false, loading: () => null },
);

// ── Typewriter cycling questions ──────────────────────────────────────────────
const QUESTIONS = [
  'Come posso automatizzare il marketing?',
  'Posso ridurre i costi dell\'80%?',
  'Come gestisco 1000 email al giorno?',
  'Posso fare data analysis senza dev?',
];

function TypewriterQuestion() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing');

  useEffect(() => {
    const question = QUESTIONS[idx];
    if (phase === 'typing') {
      if (displayed.length < question.length) {
        const t = setTimeout(() => setDisplayed(question.slice(0, displayed.length + 1)), 48);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('holding'), 2200);
      return () => clearTimeout(t);
    }
    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('erasing'), 400);
      return () => clearTimeout(t);
    }
    // erasing
    if (displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      return () => clearTimeout(t);
    }
    setIdx((i) => (i + 1) % QUESTIONS.length);
    setPhase('typing');
  }, [displayed, phase, idx]);

  return (
    <span>
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          background: '#00D4FF',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function CounterAnimation({ target = 320 }: { target?: number }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const duration = 2200;
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={containerRef}>{count}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial states
      gsap.set(bgTextRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set([leftColRef.current, rightColRef.current], { opacity: 0 });
      gsap.set(phoneRef.current, { scale: 0.82, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // t=0   — bg text sweeps in
      tl.to(bgTextRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
      }, 0)

        // t=0.4 — phone scales in
        .to(phoneRef.current, { scale: 1, opacity: 1, duration: 0.9 }, 0.4)

        // t=0.7 — left col slides in
        .to(leftColRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.7)

        // t=0.9 — right col slides in
        .to(rightColRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.9);

      // Set slide start positions before first frame
      gsap.set(leftColRef.current, { x: -50 });
      gsap.set(rightColRef.current, { x: 50 });

      // Continuous glitch on bg text
      const glitch = () => {
        gsap.to(bgTextRef.current, {
          x: () => (Math.random() - 0.5) * 6,
          skewX: () => (Math.random() - 0.5) * 1.5,
          duration: 0.06,
          ease: 'none',
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(bgTextRef.current, { x: 0, skewX: 0 });
          },
        });
      };

      // Glitch every ~4 seconds after initial reveal
      const glitchInterval = setInterval(glitch, 4200);
      return () => clearInterval(glitchInterval);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20"
      style={{ background: '#050510' }}
    >
      {/* ── Scanlines ──────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.025) 2px, rgba(0,212,255,0.025) 4px)',
        }}
      />

      {/* ── Vignette ───────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.75) 100%)',
        }}
      />

      {/* ── Giant background "AUTOMAI" text ────────────────────────────── */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
        aria-hidden
      >
        <span
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(6rem, 18vw, 20rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(79,142,247,0.13)',
            textShadow: '0 0 120px rgba(0,212,255,0.04)',
            userSelect: 'none',
          }}
        >
          AUTOMAI
        </span>
      </div>

      {/* ── Three-column layout ────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center gap-8 lg:gap-14">

        {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
        <div
          ref={leftColRef}
          className="hidden lg:flex flex-col gap-5 flex-1"
          style={{ maxWidth: 280 }}
        >
          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
              style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#00D4FF]">
              AI Automation Agency
            </span>
          </div>

          {/* Metadata row */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[#8892A4] tracking-wider font-mono">v2.0</span>
            <span className="text-[11px] text-[#4F8EF7] tracking-wider font-mono">AUTOMAI PRO</span>
          </div>

          {/* Typewriter question bubble */}
          <div
            className="rounded-xl p-4"
            style={{
              background: 'rgba(79,142,247,0.06)',
              border: '1px solid rgba(79,142,247,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-[9px] text-[#8892A4] mb-2 uppercase tracking-widest">
              Domanda
            </div>
            <p
              className="text-sm text-[#F0F4FF] leading-relaxed"
              style={{ minHeight: 64 }}
            >
              <TypewriterQuestion />
            </p>
          </div>

          {/* AI reply bubble */}
          <div
            className="rounded-xl p-4"
            style={{
              background: 'rgba(0,212,255,0.05)',
              border: '1px solid rgba(0,212,255,0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-[9px] text-[#00D4FF] mb-2 uppercase tracking-widest">
              AutomAI
            </div>
            <p className="text-xs text-[#8892A4] leading-relaxed">
              Analizzo il tuo flusso e creo un agente dedicato in meno di 48h.
            </p>
            {/* Typing dots */}
            <div className="flex gap-1 mt-2.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#00D4FF',
                    opacity: 0.5,
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CENTER — Phone mockup ─────────────────────────────────────── */}
        <div
          ref={phoneRef}
          className="relative flex-shrink-0"
          style={{ width: 280, height: 560 }}
        >
          {/* Outer phone frame */}
          <div
            className="absolute inset-0 rounded-[40px] overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(79,142,247,0.12) 0%, rgba(123,97,255,0.08) 100%)',
              border: '1px solid rgba(79,142,247,0.35)',
              boxShadow:
                '0 0 60px rgba(0,212,255,0.12), 0 0 120px rgba(79,142,247,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Dynamic island / notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30">
              <div
                style={{
                  width: 64,
                  height: 4,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
            </div>

            {/* Inner screen */}
            <div
              className="absolute inset-2 rounded-[34px] overflow-hidden"
              style={{ background: '#020208' }}
            >
              {/* 3D Robot canvas */}
              <div className="w-full h-full">
                <RobotSceneEmbed embedded />
              </div>

              {/* Screen scanlines */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
                }}
              />

              {/* Bottom HUD bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between"
                style={{
                  background:
                    'linear-gradient(to top, rgba(2,2,8,0.92) 0%, transparent 100%)',
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 9, color: '#4F8EF7', letterSpacing: '0.15em' }}
                >
                  ONLINE
                </span>
                <div className="flex items-end gap-0.5">
                  {[6, 9, 12, 15].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 2,
                        height: h,
                        borderRadius: 2,
                        background: '#00D4FF',
                        opacity: 0.7 + i * 0.075,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Corner bracket accents */}
            {[
              { pos: 'top-2 left-2', bt: 1, bb: 0, bl: 1, br: 0 },
              { pos: 'top-2 right-2', bt: 1, bb: 0, bl: 0, br: 1 },
              { pos: 'bottom-2 left-2', bt: 0, bb: 1, bl: 1, br: 0 },
              { pos: 'bottom-2 right-2', bt: 0, bb: 1, bl: 0, br: 1 },
            ].map(({ pos, bt, bb, bl, br }, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-4 h-4`}
                style={{
                  borderColor: 'rgba(0,212,255,0.45)',
                  borderStyle: 'solid',
                  borderTopWidth: bt,
                  borderBottomWidth: bb,
                  borderLeftWidth: bl,
                  borderRightWidth: br,
                  borderRadius:
                    i === 0 ? '4px 0 0 0'
                    : i === 1 ? '0 4px 0 0'
                    : i === 2 ? '0 0 0 4px'
                    : '0 0 4px 0',
                }}
              />
            ))}
          </div>

          {/* Glow beneath phone */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
            aria-hidden
            style={{
              width: 180,
              height: 50,
              background: 'radial-gradient(ellipse, rgba(0,212,255,0.18) 0%, transparent 70%)',
              filter: 'blur(18px)',
            }}
          />
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
        <div
          ref={rightColRef}
          className="hidden lg:flex flex-col gap-6 flex-1"
          style={{ maxWidth: 280 }}
        >
          {/* Headline */}
          <div>
            <h1
              className="font-bold leading-tight text-[#F0F4FF]"
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                lineHeight: 1.2,
              }}
            >
              {HERO.headline1} il tuo business con{' '}
              <span className="text-gradient-animated">{HERO.headline3}</span>
            </h1>
            <p className="mt-3 text-sm text-[#8892A4] leading-relaxed">
              {HERO.subheadline.slice(0, 118)}…
            </p>
          </div>

          {/* Animated counter card */}
          <div
            className="rounded-xl p-5"
            style={{
              background: 'rgba(123,97,255,0.07)',
              border: '1px solid rgba(123,97,255,0.22)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-[9px] text-[#8892A4] uppercase tracking-widest mb-1">
              Processi automatizzati
            </div>
            <div className="flex items-end gap-0.5">
              <span
                className="font-bold text-[#7B61FF]"
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '3.25rem',
                  lineHeight: 1,
                }}
              >
                <CounterAnimation target={320} />
              </span>
              <span
                className="text-[#7B61FF] font-bold mb-1"
                style={{ fontSize: '1.5rem' }}
              >
                +
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="mt-3 rounded-full overflow-hidden"
              style={{ height: 3, background: 'rgba(123,97,255,0.15)' }}
            >
              <div
                style={{
                  height: '100%',
                  width: '80%',
                  borderRadius: 9999,
                  background: '#7B61FF',
                  boxShadow: '0 0 8px rgba(123,97,255,0.55)',
                  animation: 'progressGrow 2.5s ease-out forwards',
                }}
              />
            </div>
          </div>

          {/* CTA links */}
          <div className="flex flex-col gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00D4FF] transition-colors hover:text-[#4F8EF7]"
            >
              <span>Inizia ora</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm text-[#8892A4] transition-colors hover:text-[#F0F4FF]"
            >
              <span>Scopri come funziona</span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-start gap-1 mt-2">
            <span
              className="text-[9px] tracking-widest uppercase text-[#8892A4]"
              style={{ opacity: 0.5 }}
            >
              Scorri
            </span>
            <div
              style={{
                width: 1,
                height: 32,
                background: 'linear-gradient(to bottom, #4F8EF7, transparent)',
                animation: 'scrollLine 1.6s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile fallback headline (lg breakpoint hides columns) ─────── */}
      <div
        className="lg:hidden absolute bottom-12 left-0 right-0 px-6 text-center z-10"
      >
        <h1
          className="font-bold text-[#F0F4FF]"
          style={{ fontFamily: 'var(--font-space)', fontSize: '1.75rem', lineHeight: 1.2 }}
        >
          {HERO.headline1} il tuo business<br />
          con <span className="text-gradient-animated">{HERO.headline3}</span>
        </h1>
        <p className="mt-3 text-sm text-[#8892A4]">{HERO.subheadline.slice(0, 90)}…</p>
        <div className="mt-5 flex items-center justify-center gap-4">
          <a
            href="#cta"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #4F8EF7, #7B61FF)' }}
          >
            Inizia ora
          </a>
          <a href="#how-it-works" className="text-sm text-[#8892A4]">
            Scopri come
          </a>
        </div>
      </div>

      {/* ── Global keyframes for this section ──────────────────────────── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.3; }
          40% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50% { opacity: 0.7; transform: scaleY(1.15); }
        }
        @keyframes progressGrow {
          from { width: 0%; }
          to { width: 80%; }
        }
      `}</style>
    </section>
  );
}
