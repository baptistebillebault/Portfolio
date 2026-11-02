import type { CSSProperties, ReactNode } from 'react';

// CSS-3D robot arm: cuboids nested inside joints. Joint rotations are written
// every frame by <TwinFigure>, which finds them by their data-j attributes.

type Kind = 'real' | 'twin' | 'cam' | 'obj';
type Shade = 'top' | 'bot' | 'front' | 'back' | 'side' | 'side2';

const SH: Record<Shade, string> = {
  top: 'var(--color-neutral-100)',
  bot: 'var(--color-neutral-600)',
  front: 'var(--color-neutral-300)',
  back: 'var(--color-neutral-400)',
  side: 'var(--color-neutral-200)',
  side2: 'var(--color-neutral-500)',
};

function faceStyle(kind: Kind, shade: Shade): CSSProperties {
  switch (kind) {
    case 'twin':
      return {
        background: 'color-mix(in srgb, var(--color-accent) 7%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-accent-300) 80%, transparent)',
      };
    case 'cam':
      return {
        background: shade === 'top' ? 'var(--color-neutral-700)' : 'var(--color-neutral-800)',
        border: '1px solid var(--color-accent)',
      };
    case 'obj':
      return {
        background:
          shade === 'top' ? 'var(--color-accent-300)'
          : shade === 'side' || shade === 'front' ? 'var(--color-accent-500)'
          : 'var(--color-accent-700)',
        border: '1px solid var(--color-accent-800)',
      };
    default:
      return { background: SH[shade], border: '1px solid color-mix(in srgb, var(--color-neutral-900) 45%, transparent)' };
  }
}

/** Six-faced cuboid of width w, depth d, height h, sitting on z = 0. */
function Box({ w, d, h, kind, transform }: { w: number; d: number; h: number; kind: Kind; transform?: string }) {
  const faces: [number, number, string, Shade][] = [
    [w, d, 'translateZ(0px)', 'bot'],
    [w, h, `translate3d(0,${-d / 2}px,${h / 2}px) rotateX(90deg)`, 'back'],
    [h, d, `translate3d(${-w / 2}px,0,${h / 2}px) rotateY(90deg)`, 'side2'],
    [h, d, `translate3d(${w / 2}px,0,${h / 2}px) rotateY(90deg)`, 'side'],
    [w, h, `translate3d(0,${d / 2}px,${h / 2}px) rotateX(90deg)`, 'front'],
    [w, d, `translateZ(${h}px)`, 'top'],
  ];
  return (
    <div className="p3" style={{ transform: transform ?? 'none' }}>
      {faces.map(([W, H, t, s]) => (
        <div key={s} className="face" style={{ left: -W / 2, top: -H / 2, width: W, height: H, transform: t, ...faceStyle(kind, s) }} />
      ))}
    </div>
  );
}

function Anchor({ name, transform }: { name: string; transform: string }) {
  return <div data-anchor={name} style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 1, transform }} />;
}

function Joint({ n, t, axis, children }: { n: number; t: string; axis: 'Y' | 'Z'; children: ReactNode }) {
  return (
    <div className="p3" data-j={n} data-t={t} data-ax={axis} style={{ transform: t }}>
      {children}
    </div>
  );
}

/** One arm. The real arm carries the anchors for the C1–C5 callouts (C2 sits on the twin). */
export function RobotArm({ kind }: { kind: 'real' | 'twin' }) {
  const real = kind === 'real';
  return (
    <div className="p3" data-arm={kind}>
      <Box w={130} d={130} h={28} kind={kind} />
      {real && <Anchor name="edge" transform="translate3d(65px,0,14px)" />}
      <Joint n={1} t="translateZ(28px)" axis="Z">
        <Box w={84} d={84} h={62} kind={kind} />
        {real && (
          <div
            style={{ position: 'absolute', left: 190, top: -55, width: 130, height: 110, border: '1px dashed var(--color-accent-300)', transform: 'translateZ(-27px)' }}
          />
        )}
        <Anchor name={real ? 'control' : 'sim'} transform="translate3d(0,42px,40px)" />
        <Joint n={2} t="translateZ(62px)" axis="Y">
          <Box w={46} d={46} h={220} kind={kind} />
          <Joint n={3} t="translateZ(220px)" axis="Y">
            <Box w={38} d={38} h={180} kind={kind} />
            <Joint n={4} t="translateZ(180px)" axis="Y">
              <Box w={32} d={32} h={48} kind={kind} />
              <Box w={22} d={34} h={26} kind={real ? 'cam' : kind} transform="translate3d(28px,0,6px)" />
              {real && <Anchor name="perception" transform="translate3d(40px,0,20px)" />}
              <Box w={8} d={22} h={40} kind={kind} transform="translate3d(-12px,0,48px)" />
              <Box w={8} d={22} h={40} kind={kind} transform="translate3d(12px,0,48px)" />
              {real && <Anchor name="learning" transform="translate3d(0,0,88px)" />}
            </Joint>
          </Joint>
        </Joint>
      </Joint>
      <Box w={40} d={40} h={40} kind={real ? 'obj' : 'twin'} transform="translate3d(255px,0,0)" />
      <div className="arm-label" style={{ color: real ? 'var(--color-neutral-300)' : 'var(--color-accent-300)' }}>
        {real ? 'RÉEL' : 'JUMEAU · SIM'}
      </div>
    </div>
  );
}
