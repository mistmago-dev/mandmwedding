export const wedding = {
	groom: 'Marvin',
	bride: 'Meri Cris',
	date: '2026-10-26T00:00:00+08:00',
	displayDate: 'October 26, 2026',
	venue: {
		name: 'Saint Anthony de Padua Parish Church',
		location: 'San Francisco Bulan, Sorsogon',
		locationUrl: 'https://maps.app.goo.gl/QyjsEtZ6TcABR4ca7',
		reception: 'San Francisco Elementary School Covered Court',
	},
	quote: 'The beginning of forever',
	heroTitle: 'THE WEDDING OF',
	title: 'Marvin & Meri Cris — The Beginning of Forever',
	description: 'Join Marvin and Meri Cris as they begin their forever together on October 26, 2026.',
};

export const entourage = {
	parentsOfTheGroom: ['Mr.Dario G. Robelas', 'Mrs.Susan C.Robelas'],
	parentsOfTheBride: ['Mr.Renato E.Gelua', 'Mrs.Milagros G.Gelua'],
	principalSponsorsBoys: [
		'Mr. Daniel G. Robelas',
		'Atty. Loreto G. Javier Jr.',
		'Mr.Raymund G. Mercado',
		'Mr. Jan Anthony G. Geronilla',
		'Mr. Jose M. Guran',
		'Mr. Ronie M. Gocoyo',
		'Mr. Romano D. Bajamundi',
		'Mr. Enad D. Sanchez',
		'Mr. Ronald G. Dichoso',
		'Mr. Dan D. Magdasoc',
		'Mr. Rommel V. Guran',
		'Mr. Rafael G. Guran',
		'Mr. Romeo L. Caingat',
		'Mr. Diego G. Robelas',
	],
	principalSponsorsGirls: [
		'Mrs. Nora G. Advincula',
		'Dra. Medy  G. Auxillos',
		'Mrs. Analiza P. Villaroya',
		'Mrs. Lorna L. Robelas',
		'Mrs. Marina G. Mesa',
		'Dra. Adeltrudis D. Ojeda',
		'Mrs. Maniline C. Robelas',
		'Mrs. Mrs. Jannie T. Rectra',
		'Mrs. Evelyn P. De Los Santos',
		'Mrs. Rosie G. Magdasoc',
		'Mrs. Marilyn C. Guran',
		'Mrs. Lorenza R. Guran',
		'Mrs. Eba R. Golloso',
		'Mrs. Lorna B. Dogillo',
	],
	bestMan: ['John Eric Garcia'],
	maidOfHonor: ['Maureen Joy Bueta'],
	groomsmen: [
		'Adrian Robelas',
		'Gerald Robelas',
		'Mike Stephen Gollena',
		'Lou Renzo Millario',
		'Mark Kevin Dreu',
		'Reymart Golpeo',
		'Jerome Palabino',
		'Mark Adrian Gillego',
	],
	bridesmaids: [
		'Dhapne Robelas',
		'Mhel Joyce Opiasa',
		'Khaite Rose Gelua',
		'Vieyan Ryne Endiape',
		'Maricar Mesa',
		'Mairene Shane Morona',
		'Nicole Godalle',
		'Shaimae Crizelle Estipona',
	],
	viel: ['Daniel Castro', 'Mary Rose Gelua'],
	cord: ['Flordeliza Ross Gelua', 'JM Leoncio Guran'],
	candle: ['Lyn Lyn Gelua', 'Llander Robelas'],
	ringBearer: ['John Carl Tapang'],
	bibleBearer: ['Aaron Jay Golpeo'],
	coinBearer: ['Khen Jake Morona'],
	flowerGirls: [
		'Sabrina Opiasa',
		'Kataliah Breianne Gelua',
		'Thea Jane Tolentino',
		'Daun Hwang',
		'Princess Sofia Caingat',
		'Rein Akira Sabuito',
	],
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
	{ label: 'Church', detail: 'Saint Anthony de Padua Parish Church' },
	{ label: 'Location', detail: 'San Francisco Bulan, Sorsogon' },
	{ label: 'Reception', detail: 'San Francisco Elementary School Covered Court' },
] as const;
