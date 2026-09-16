export const wedding = {
	groom: 'Marvin',
	bride: 'Meri Cris',
	date: '2026-10-26T00:00:00+08:00',
	displayDate: 'October 26, 2026',
	venue: { name: 'San Antonio de Padua Parish', location: 'San Francisco, Bulan, Sorsogon' },
	quote: 'The beginning of forever',
	heroTitle: 'THE WEDDING OF',
	title: 'Marvin & Meri Cris — The Beginning of Forever',
	description: 'Join Marvin and Meri Cris as they begin their forever together on October 26, 2026.',
};

export const entourage = {
	parents: [],
	principalSponsors: [],
	bestMan: [],
	maidOfHonor: [],
	groomsmen: [],
	bridesmaids: [],
	flowerGirls: [],
	ringBearer: [],
	bibleBearer: [],
	coinBearer: [],
} as const;

export const galleryItems = [
	{
		label: 'Portrait',
		className:
			'md:col-span-2 md:row-span-2 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_30%),linear-gradient(135deg,#6e1f2a,#2b0d15)]',
	},
	{
		label: 'Couple',
		className:
			'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_20%),linear-gradient(135deg,#d8d0ca,#f5efe9)]',
	},
	{
		label: 'Engagement',
		className:
			'bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_25%),linear-gradient(135deg,#111111,#4d4a47)]',
	},
	{
		label: 'Wedding',
		className:
			'md:col-span-2 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_28%),linear-gradient(135deg,#faf8f5,#d8d0ca)]',
	},
] as const;

export const engagementSections = [
	{ label: 'The Wedding Day', detail: 'October 26, 2026' },
	{ label: 'Location', detail: 'San Antonio de Padua Parish' },
	{ label: 'Venue', detail: 'San Francisco, Bulan, Sorsogon' },
] as const;
