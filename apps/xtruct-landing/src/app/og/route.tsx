import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Google Fonts as TTF (Satori can't read woff2). Returns null if unreachable at build time.
async function gfont(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}`, {
        // An old user agent makes Google Fonts serve TTF.
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30' },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

type Font = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500;
  style: 'normal' | 'italic';
};

const C = {
  bg: '#0C0A0B',
  well: '#141012',
  fg: '#EEEAE2',
  mute: '#B9B4AA',
  dim: '#8C887F',
  ember: '#FF5A2E',
};

// Ring geometry, shared by the back and front halves so they line up.
const RING = { left: 725, top: 250, width: 470, height: 120, rotate: 'rotate(-14deg)', w: 14 };

// Share image: the clay planet with its ring, the headline and both installs.
export async function GET() {
  const [serifR, serifI, sans, mono] = await Promise.all([
    gfont('Fraunces:opsz,wght@144,500'),
    gfont('Fraunces:ital,opsz,wght@1,144,500'),
    gfont('Geist:wght@400'),
    gfont('Geist+Mono:wght@400'),
  ]);
  const fonts = [
    serifR && { name: 'Fraunces', data: serifR, weight: 500, style: 'normal' },
    serifI && { name: 'Fraunces', data: serifI, weight: 500, style: 'italic' },
    sans && { name: 'Geist', data: sans, weight: 400, style: 'normal' },
    mono && { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
  ].filter(Boolean) as Font[];
  const serif = serifR ? 'Fraunces' : 'serif';
  const body = sans ? 'Geist' : 'sans-serif';
  const code = mono ? 'Geist Mono' : 'monospace';

  const ring = (front: boolean) => (
    <div
      style={{
        position: 'absolute',
        left: RING.left,
        top: RING.top,
        width: RING.width,
        height: RING.height,
        borderRadius: 9999,
        transform: RING.rotate,
        borderStyle: 'solid',
        borderWidth: RING.w,
        // Back half: the top arc, darker. Front half: the bottom arc, lit.
        borderColor: front
          ? 'transparent transparent #FF8A5C transparent'
          : '#7A3420 #7A3420 transparent #7A3420',
      }}
    />
  );

  const pill = (label: string, cmd: string) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 22px',
        borderRadius: 18,
        background: C.well,
        boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.55), inset -2px -2px 6px rgba(255,255,255,0.04)',
      }}
    >
      <span style={{ color: C.dim, fontFamily: body, fontSize: 16, letterSpacing: 2 }}>
        {label}
      </span>
      <span style={{ color: C.fg, fontFamily: code, fontSize: 24 }}>{cmd}</span>
    </div>
  );

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: `radial-gradient(circle at 78% 45%, #2A1612 0%, ${C.bg} 55%)`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 700,
          top: 60,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(255,90,46,0.30), rgba(12,10,11,0) 68%)',
        }}
      />
      {ring(false)}
      <div
        style={{
          position: 'absolute',
          left: 830,
          top: 180,
          width: 260,
          height: 260,
          borderRadius: 9999,
          background:
            'radial-gradient(circle at 34% 30%, #FF9A6E 0%, #FF5A2E 42%, #B8341A 78%, #6E1D0E 100%)',
          boxShadow:
            'inset -18px -22px 40px rgba(60,10,0,0.55), inset 14px 14px 30px rgba(255,210,180,0.35), 0 30px 60px rgba(0,0,0,0.6)',
        }}
      />
      {ring(true)}

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 92,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 9999,
              background: 'radial-gradient(circle at 35% 30%, #FF9A6E, #FF5A2E 55%, #A12E16)',
            }}
          />
          <span style={{ fontSize: 30, color: C.fg, fontFamily: serif }}>Xtruct</span>
          <span style={{ fontSize: 19, color: C.dim, fontFamily: body, marginLeft: 6 }}>
            a masst.dev tool
          </span>
        </div>
        <div
          style={{ fontSize: 92, color: C.fg, lineHeight: 1.02, marginTop: 44, fontFamily: serif }}
        >
          Describe it.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            color: C.fg,
            lineHeight: 1.02,
            fontFamily: serif,
          }}
        >
          Watch it get&nbsp;
          <span style={{ color: C.ember, fontStyle: 'italic' }}>built.</span>
        </div>
        <div
          style={{
            fontSize: 25,
            color: C.mute,
            marginTop: 30,
            fontFamily: body,
            maxWidth: 640,
            lineHeight: 1.45,
          }}
        >
          A team of Claude Code agents plans, maps and builds your product. You sign off.
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
          {pill('NPM', 'npx @masst/xtruct')}
          {pill('PY', 'uvx xtruct')}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined }
  );
}
