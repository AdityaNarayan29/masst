import type { Metadata } from 'next';

// The page itself is the static public/home.html served by route.ts.
// This layout only exists for Next's built-in pages (e.g. 404).
export const metadata: Metadata = {
  title: 'Xtruct — A dev team made of agents',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#020203', color: '#EEEAE2' }}>{children}</body>
    </html>
  );
}
