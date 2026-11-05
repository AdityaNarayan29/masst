import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Share image: the black hole poster with the headline.
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#020203',
        position: 'relative',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 610,
          top: 120,
          width: 560,
          height: 560,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(255,120,50,0.28), rgba(2,2,3,0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 560,
          top: 330,
          width: 660,
          height: 130,
          borderRadius: 9999,
          background:
            'radial-gradient(ellipse, rgba(255,214,170,0.95), rgba(255,110,40,0.6) 45%, rgba(140,20,8,0.25) 70%, rgba(2,2,3,0) 72%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 790,
          top: 250,
          width: 200,
          height: 200,
          borderRadius: 9999,
          background: '#020203',
          boxShadow: '0 0 0 2px rgba(255,190,140,0.55)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 180,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: '#8C887F', fontFamily: 'monospace' }}>
          MASST PRESENTS
        </div>
        <div style={{ fontSize: 108, color: '#EEEAE2', lineHeight: 1, marginTop: 24 }}>
          Tools with
        </div>
        <div style={{ fontSize: 108, color: '#FF4A1C', lineHeight: 1, fontStyle: 'italic' }}>
          gravity.
        </div>
        <div style={{ fontSize: 26, color: '#8C887F', marginTop: 30, fontFamily: 'sans-serif' }}>
          Six free, open-source developer tools · masst.dev
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
