import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { wedding } from '@/data/wedding';

const cormorant = Cormorant_Garamond({
	variable: '--font-display',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL('https://example.com'),
	title: wedding.title,
	description: wedding.description,
	openGraph: {
		title: wedding.title,
		description: wedding.description,
		url: 'https://example.com',
		siteName: 'Marvin & Meri Cris',
		images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Marvin & Meri Cris — The Beginning of Forever' }],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: wedding.title,
		description: wedding.description,
		images: ['/og-image.svg'],
	},
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
			<body className="min-h-full bg-[#faf8f5] text-[#111111]">{children}</body>
		</html>
	);
}
