'use client';

import { useEffect, useRef } from 'react';
import { RobotArm } from './RobotArm';
import { captions, sectionNames, site, skills } from '@/lib/content';

// Fixed page chrome: the background figure, the C1–C5 callouts, the nav with its
// section counter, and the bottom-left caption. A requestAnimationFrame loop poses
// the figure from the scroll position. Sections are found by [data-sec].

type Pose = { rx: number; rz: number; a: number[]; sep: number; drift: number; lab: number; x: number; sc: number; op: number };

// a: joint angles [yaw, shoulder, elbow, wrist]; sep: twin offset (px); drift: sim-real jitter (deg)
const POSES: Pose[] = [
  { rx: 64, rz: -28, a: [25, 22, 58, 55],  sep: 380, drift: 5, lab: 0, x: 0.22,  sc: 1.0,  op: 1 },    // Accueil — side by side
  { rx: 62, rz: 12,  a: [-30, 12, 42, 60], sep: 0,   drift: 0, lab: 0, x: -0.24, sc: 1.05, op: 1 },    // À propos — overlaid
  { rx: 58, rz: -48, a: [0, 46, 72, 58],   sep: 380, drift: 2, lab: 0, x: 0,     sc: 1.35, op: 0.42 }, // Projets — both reach
  { rx: 66, rz: -18, a: [35, 18, 50, 45],  sep: 360, drift: 1, lab: 1, x: 0.2,   sc: 0.95, op: 1 },    // Compétences — labelled
  { rx: 52, rz: 48,  a: [-60, 30, 34, 70], sep: 220, drift: 3, lab: 0, x: -0.24, sc: 1.05, op: 1 },    // Conférences — turned
  { rx: 68, rz: -30, a: [0, 0, 0, 0],      sep: 0,   drift: 0, lab: 0, x: 0,     sc: 1.5,  op: 0.32 }, // Contact — merged
];

// Callout anchors (in skills order C1–C5) and leader-line offsets in screen px.
const CALLOUTS: { anchor: string; dx: number; dy: number }[] = [
  { anchor: 'perception', dx: 150, dy: -40 },
  { anchor: 'sim', dx: 110, dy: -90 },
  { anchor: 'control', dx: 170, dy: 60 },
  { anchor: 'learning', dx: 70, dy: -130 },
  { anchor: 'edge', dx: 90, dy: 150 },
];

const NARROW = 960;
const pad = (n: number) => String(n).padStart(2, '0');

export function TwinFigure() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current!, rig = rigRef.current!, sync = syncRef.current!;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-sec]'));
    const arms = Array.from(rig.querySelectorAll<HTMLElement>('[data-arm]')).map((node) => ({
      node,
      twin: node.dataset.arm === 'twin',
      joints: Array.from(node.querySelectorAll<HTMLElement>('[data-j]')).map((j) => ({
        node: j, n: Number(j.dataset.j) - 1, t: j.dataset.t!, ax: j.dataset.ax!,
      })),
    }));
    const labels = Array.from(calloutsRef.current!.querySelectorAll<HTMLElement>('[data-for]')).map((node) => ({
      node,
      anchor: rig.querySelector<HTMLElement>(`[data-anchor="${node.dataset.for}"]`),
    }));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tops: number[] = [];
    const measure = () => { tops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY); };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    document.fonts?.ready.then(measure);
    // Re-measure if section heights change (e.g. images or fonts loading).
    const ro = new ResizeObserver(measure);
    sections.forEach((s) => ro.observe(s));

    const t0 = performance.now();
    let cur = -1;
    let raf = 0;

    const tick = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const narrow = vw < NARROW;
      const mid = window.scrollY + vh * 0.5;

      // Current section, and eased progress towards the next one.
      let i = 0;
      while (i < tops.length - 1 && mid >= tops[i + 1]) i++;
      let f = i < tops.length - 1 ? (mid - tops[i]) / (tops[i + 1] - tops[i]) : 0;
      f = Math.min(1, Math.max(0, (f - 0.35) / 0.65));
      f = f * f * (3 - 2 * f);

      const A = POSES[i], B = POSES[Math.min(i + 1, POSES.length - 1)];
      const lerp = (a: number, b: number) => a + (b - a) * f;
      const P = {
        rx: lerp(A.rx, B.rx), rz: lerp(A.rz, B.rz), sep: lerp(A.sep, B.sep), drift: lerp(A.drift, B.drift),
        lab: lerp(A.lab, B.lab), x: lerp(A.x, B.x), sc: lerp(A.sc, B.sc), op: lerp(A.op, B.op),
      };
      const ang = A.a.map((v, k) => lerp(v, B.a[k]));

      const t = reduceMotion.matches ? 0 : (performance.now() - t0) / 1000;
      const base = Math.min(vw / 1250, vh / 820);
      const s = Math.max(0.45, base * P.sc * (narrow ? 0.85 : 1));
      const x = narrow ? 0 : P.x * vw;
      rig.style.transform = `translateX(${x}px) scale(${s}) rotateX(${P.rx}deg) rotateZ(${P.rz + Math.sin(t * 0.3) * 3}deg) translate3d(${-P.sep / 2}px,0,-170px)`;
      scene.style.opacity = String(narrow ? Math.min(P.op, 0.36) : P.op);

      const sway = [Math.sin(t * 0.7) * 4, Math.sin(t * 0.9) * 3, Math.sin(t * 1.1) * 4, Math.sin(t * 1.3) * 5];
      for (const arm of arms) {
        if (arm.twin) arm.node.style.transform = `translateX(${P.sep}px) scale3d(1.025,1.025,1.025)`;
        for (const j of arm.joints) {
          let deg = ang[j.n] + sway[j.n];
          if (arm.twin) deg += P.drift * Math.sin(t * 1.7 + j.n * 1.3);
          j.node.style.transform = `${j.t} rotate${j.ax}(${deg}deg)`;
        }
      }

      sync.style.width = `${Math.max(0, P.sep)}px`;
      sync.style.opacity = String(Math.min(1, P.sep / 200));

      if (!narrow) {
        for (const l of labels) {
          l.node.style.opacity = String(P.lab);
          if (P.lab < 0.01 || !l.anchor) continue;
          const r = l.anchor.getBoundingClientRect();
          l.node.style.transform = `translate(${r.left}px, ${r.top}px)`;
        }
      }

      const c = f > 0.5 ? Math.min(i + 1, sectionNames.length - 1) : i;
      if (c !== cur) {
        cur = c;
        if (counterRef.current) counterRef.current.textContent = `§ ${pad(c + 1)} · ${sectionNames[c]}`;
        if (captionRef.current) captionRef.current.textContent = captions[c];
        if (ghostRef.current) ghostRef.current.textContent = pad(c + 1);
        Array.from(ticksRef.current?.children ?? []).forEach((n, k) => n.classList.toggle('on', k === c));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="scene" ref={sceneRef}>
          <div className="stack" ref={rigRef}>
            <div className="floor" />
            <div className="sync" ref={syncRef}><span>sync · 1 kHz</span></div>
            <RobotArm kind="real" />
            <RobotArm kind="twin" />
          </div>
        </div>
        <div className="vignette" />
        <div className="ghost" ref={ghostRef}>01</div>
      </div>

      <div className="callouts desktop-only" ref={calloutsRef} aria-hidden="true">
        {CALLOUTS.map(({ anchor, dx, dy }, k) => (
          <div key={anchor} className="callout" data-for={anchor}>
            <span className="dot" />
            <span className="line" style={{ width: Math.hypot(dx, dy), transform: `rotate(${Math.atan2(dy, dx)}rad)` }} />
            <span className="text" style={{ transform: `translate(${dx}px, calc(${dy}px - 50%))` }}>
              <b>{skills[k].code}</b> {skills[k].name}
            </span>
          </div>
        ))}
      </div>

      <nav className="nav" aria-label="Principale">
        <a href="#hero" className="nav-brand">{site.name} <small>{site.role}</small></a>
        <div className="nav-links desktop-only">
          <a href="#about">À propos</a>
          <a href="#work">Projets</a>
          <a href="#stack">Compétences</a>
          <a href="#talks">Conférences</a>
        </div>
        <span className="counter desktop-only" ref={counterRef} aria-hidden="true">§ 01 · {sectionNames[0]}</span>
        <a href="#contact" className="btn btn-primary">Me contacter</a>
      </nav>

      <div className="figcap desktop-only" aria-hidden="true">
        <div className="figcap-kicker">Fig. 1 — Bras réel &amp; jumeau</div>
        <p ref={captionRef}>{captions[0]}</p>
        <div className="ticks" ref={ticksRef}>
          {sectionNames.map((n, k) => <span key={n} className={k === 0 ? 'on' : undefined} />)}
        </div>
      </div>
    </>
  );
}
