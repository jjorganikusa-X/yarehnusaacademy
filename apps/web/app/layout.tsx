import type { Metadata, Viewport } from 'next';
import "./globals.css";
import { AppGenProvider } from "@/components/appgen-provider";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Yarehnusa Academy',
  description: 'Platform pembelajaran untuk anak neurodivergen di kepulauan',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppGenProvider>{children}</AppGenProvider>
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
      </body>
    </html>
  );
}
