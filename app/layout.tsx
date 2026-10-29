import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const script = localFont({ src: './fonts/GreatVibes-Regular.ttf', variable: '--font-script', display: 'swap' });
const serif = localFont({ src: './fonts/CormorantGaramond.ttf', variable: '--font-serif', display: 'swap' });
export const metadata: Metadata = { title: 'Asib & Nadia | A celebration of love', description: 'Celebrate the wedding of SK MD ASIB and Nadia Naj on 27 December in Purba Bardhaman, followed by the reception on 28 December.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={`${script.variable} ${serif.variable}`}><body suppressHydrationWarning>{children}</body></html>; }
