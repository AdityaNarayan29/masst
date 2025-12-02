import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masst UI - Component Library",
  description: "A beautiful React component library built on shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
