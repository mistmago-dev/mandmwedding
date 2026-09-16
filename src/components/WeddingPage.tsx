'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { entourage, galleryItems, wedding } from '@/data/wedding';

const navItems = [
	{ label: 'Home', href: '#home' },
	{ label: 'Story', href: '#story' },
	{ label: 'Details', href: '#details' },
	{ label: 'Gallery', href: '#gallery' },
	{ label: 'Entourage', href: '#entourage' },
	{ label: 'RSVP', href: '#rsvp' },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
	return (
		<div className="mb-14 text-center">
			<p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#6e1f2a]">{eyebrow}</p>

			<h2 className="font-script text-5xl font-normal tracking-tight text-[#111111] sm:text-6xl">{title}</h2>

			<div className="mx-auto mt-6 h-px w-12 bg-[#6e1f2a]/50" />
		</div>
	);
}

function NameList({ people, centered = true }: { people?: readonly string[]; centered?: boolean }) {
	if (!people || people.length === 0) {
		return <p className={`text-sm italic text-black/40 ${centered ? 'text-center' : ''}`}>Details to be provided</p>;
	}

	return (
		<div className={centered ? 'text-center' : ''}>
			{people.map((person, index) => (
				<p
					key={`${person}-${index}`}
					className="font-serif text-lg leading-relaxed text-[#111111]">
					{person}
				</p>
			))}
		</div>
	);
}

function PersonGroup({ label, people }: { label: string; people?: readonly string[] }) {
	return (
		<div className="border-t border-black/10 py-7">
			<p className="mb-4 text-center text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#6e1f2a]">{label}</p>

			<NameList people={people} />
		</div>
	);
}

function CoupleRole({ label, people }: { label: string; people?: readonly string[] }) {
	return (
		<div className="border-t border-black/10 py-8 text-center">
			<p className="mb-3 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-black/50">{label}</p>

			<NameList people={people} />
		</div>
	);
}

type RsvpStatus = 'idle' | 'submitting' | 'success' | 'error';

const emptyRsvp = { fullName: '', contact: '', guestCount: '1', guestNames: '', message: '' };

export default function WeddingPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [countdown, setCountdown] = useState(['--', '--', '--', '--']);
	const [rsvp, setRsvp] = useState(emptyRsvp);
	const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>('idle');
	const [rsvpError, setRsvpError] = useState('');

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const updateCountdown = () => {
			const remaining = new Date('2026-10-26T00:00:00').getTime() - Date.now();

			if (remaining <= 0) {
				setCountdown(['0', '0', '0', '0']);
				return;
			}

			const totalSeconds = Math.floor(remaining / 1000);
			const days = Math.floor(totalSeconds / 86400);
			const hours = Math.floor((totalSeconds % 86400) / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			setCountdown([
				String(days),
				String(hours).padStart(2, '0'),
				String(minutes).padStart(2, '0'),
				String(seconds).padStart(2, '0'),
			]);
		};

		updateCountdown();
		const interval = window.setInterval(updateCountdown, 1000);

		return () => window.clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio('/llb-music.mp3');
			audioRef.current.loop = true;
			audioRef.current.volume = 0.35;
		}

		return () => {
			audioRef.current?.pause();
		};
	}, []);

	const openInvitation = async () => {
		setIsOpen(true);

		if (audioRef.current) {
			try {
				await audioRef.current.play();
				setIsPlaying(true);
			} catch {
				setIsPlaying(false);
			}
		}
	};

	const toggleMusic = async () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			return;
		}

		try {
			await audioRef.current.play();
			setIsPlaying(true);
		} catch {
			setIsPlaying(false);
		}
	};

	const submitRsvp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setRsvpError('');
		setRsvpStatus('submitting');

		const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT;

		if (!endpoint) {
			setRsvpStatus('error');
			setRsvpError('RSVP is not configured yet. Please try again later.');
			return;
		}

		try {
			await fetch(endpoint, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'text/plain;charset=utf-8' },
				body: JSON.stringify({
					fullName: rsvp.fullName.trim(),
					contact: rsvp.contact.trim(),
					guestCount: Number(rsvp.guestCount),
					guestNames: rsvp.guestNames.trim(),
					message: rsvp.message.trim(),
				}),
			});
		} catch {
			setRsvpStatus('error');
			setRsvpError('We could not save your RSVP. Please try again.');
			return;
		}

		setRsvpStatus('success');
	};

	const scrollTo = (href: string) => {
		setMenuOpen(false);

		const element = document.querySelector(href);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<main className="min-h-screen bg-[#faf8f5] text-[#111111]">
			<div
				className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#6e1f2a] px-6 transition-all duration-1000 ${
					isOpen ? 'pointer-events-none invisible opacity-0' : 'visible opacity-100'
				}`}>
				<div className="w-full max-w-3xl text-center text-[#faf8f5]">
					<p className="mb-8 text-[0.65rem] uppercase tracking-[0.45em] text-[#faf8f5]/70">The Wedding of</p>

					<h1 className="whitespace-nowrap font-serif text-4xl font-normal leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
						Marvin
						<span className="mx-3 text-[#faf8f5]/50 sm:mx-5">&</span>
						Meri Cris
					</h1>

					<div className="mx-auto my-10 h-px w-16 bg-[#faf8f5]/40" />

					<p className="font-serif text-lg italic text-[#faf8f5]/80 sm:text-xl">“The beginning of forever”</p>

					<p className="mt-8 text-[0.65rem] uppercase tracking-[0.3em] text-[#faf8f5]/70">October 26, 2026</p>

					<button
						type="button"
						onClick={openInvitation}
						className="mt-12 border border-[#faf8f5]/40 px-8 py-4 text-[0.65rem] font-medium uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#faf8f5] hover:text-[#6e1f2a]">
						Open Invitation
					</button>
				</div>
			</div>

			<header className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-[#faf8f5]/90 backdrop-blur-md">
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
					<button
						type="button"
						onClick={() => scrollTo('#home')}
						className="font-serif text-xl">
						M <span className="text-[#6e1f2a]">&</span> M
					</button>

					<nav className="hidden items-center gap-8 md:flex">
						{navItems.map((item) => (
							<button
								key={item.href}
								type="button"
								onClick={() => scrollTo(item.href)}
								className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-black/60 transition-colors hover:text-[#6e1f2a]">
								{item.label}
							</button>
						))}
					</nav>

					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={toggleMusic}
							aria-label={isPlaying ? 'Pause music' : 'Play music'}
							className="hidden text-[0.6rem] uppercase tracking-[0.2em] text-black/50 transition-colors hover:text-[#6e1f2a] sm:block">
							{isPlaying ? 'Sound On' : 'Sound Off'}
						</button>

						<button
							type="button"
							onClick={() => setMenuOpen(!menuOpen)}
							className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
							aria-label="Toggle menu">
							<span className="h-px w-5 bg-black" />
							<span className="h-px w-5 bg-black" />
						</button>
					</div>
				</div>

				<div
					className={`overflow-hidden border-t border-black/5 bg-[#faf8f5] transition-all duration-300 md:hidden ${
						menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
					}`}>
					<nav className="flex flex-col px-6 py-5">
						{navItems.map((item) => (
							<button
								key={item.href}
								type="button"
								onClick={() => scrollTo(item.href)}
								className="border-b border-black/5 py-4 text-left text-[0.65rem] font-medium uppercase tracking-[0.25em] text-black/70">
								{item.label}
							</button>
						))}

						<button
							type="button"
							onClick={toggleMusic}
							className="py-4 text-left text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#6e1f2a]">
							{isPlaying ? 'Turn Sound Off' : 'Turn Sound On'}
						</button>
					</nav>
				</div>
			</header>

			<section
				id="home"
				className="flex min-h-screen items-center justify-center bg-[#6e1f2a] px-6 pb-20 pt-28 text-[#faf8f5]">
				<div className="w-full max-w-6xl">
					<div className="mx-auto max-w-4xl text-center">
						<p className="mb-7 text-[0.65rem] uppercase tracking-[0.45em] text-[#faf8f5]/60">We are getting married</p>

						<h1 className="whitespace-nowrap font-serif text-4xl font-normal leading-[0.9] tracking-tight sm:text-8xl md:text-9xl">
							Marvin
							<span className="mx-2 text-[#faf8f5]/40 sm:mx-5">&</span>
							Meri Cris
						</h1>

						<div className="mx-auto my-10 h-px w-20 bg-[#faf8f5]/30" />

						<p className="font-serif text-xl italic text-[#faf8f5]/80 sm:text-2xl">The beginning of forever</p>

						<div className="mt-10 flex flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#faf8f5]/60 sm:flex-row sm:justify-center sm:gap-8">
							<span>October 26, 2026</span>
							<span className="hidden h-1 w-1 rounded-full bg-[#faf8f5]/40 sm:block" />
							<span>San Francisco, Bulan</span>
						</div>

						<div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
							<button
								type="button"
								onClick={() => scrollTo('#details')}
								className="border border-[#faf8f5]/30 px-8 py-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] transition-all hover:bg-[#faf8f5] hover:text-[#6e1f2a]">
								View Details
							</button>

							<button
								type="button"
								onClick={() => scrollTo('#rsvp')}
								className="bg-[#faf8f5] px-8 py-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#6e1f2a] transition-opacity hover:opacity-85">
								RSVP
							</button>
						</div>
					</div>
				</div>
			</section>

			<section
				id="details"
				className="px-6 py-28 sm:py-36">
				<div className="mx-auto max-w-5xl">
					<SectionHeading
						eyebrow="You are invited"
						title="Join us as we begin forever"
					/>

					<div className="mx-auto max-w-3xl text-center">
						<p className="font-serif text-2xl leading-relaxed text-black/75 sm:text-3xl">
							With joyful hearts, we invite you to witness and celebrate the beginning of our life together.
						</p>

						<div className="mx-auto my-12 h-px w-12 bg-[#6e1f2a]/40" />

						<p className="text-sm leading-8 text-black/55">
							We would be honored to have you with us as we exchange our vows and begin this beautiful new chapter
							together.
						</p>
					</div>

					<div className="mt-20 grid border-y border-black/10 md:grid-cols-2">
						<div className="border-b border-black/10 px-6 py-10 text-center md:border-b-0 md:border-r">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Ceremony</p>

							<h3 className="font-serif text-2xl">San Antonio de Padua Parish Church</h3>

							<p className="mt-3 text-sm leading-7 text-black/50">San Francisco, Bulan, Sorsogon</p>
						</div>

						<div className="px-6 py-10 text-center">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Date</p>

							<h3 className="font-serif text-2xl">October 26, 2026</h3>

							<p className="mt-3 text-sm leading-7 text-black/50">Monday</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-[#f3eee9] px-6 py-28 sm:py-36">
				<div className="mx-auto max-w-5xl">
					<SectionHeading
						eyebrow="The Wedding Day"
						title="Where we say I do"
					/>

					<div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
						<div className="text-center md:text-left">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Ceremony</p>

							<h3 className="font-serif text-3xl">San Antonio de Padua Parish Church</h3>

							<p className="mt-5 max-w-md text-sm leading-8 text-black/55">San Francisco, Bulan, Sorsogon</p>

							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d267.94661302324073!2d123.90645458261373!3d12.721443274812716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0d1536151385f%3A0xaa297fc4eaa8d63d!2sSan%20Antonio%20de%20Padua%20Parish%20Church%20-%20Polot%2C%20Bulan%2C%20Sorsogon%20(Diocese%20of%20Sorsogon)!5e1!3m2!1sen!2sph!4v1789553152502!5m2!1sen!2sph"
								className="mt-8 aspect-[4/3] w-full border-0 md:w-[280px] lg:w-[400px]"
								allowFullScreen
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
								title="Map to San Antonio de Padua Parish Church"
							/>
						</div>

						<div className="border-t border-black/10 pt-10 text-center md:border-l md:border-t-0 md:pt-0 md:text-left">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Reception</p>

							<h3 className="font-serif text-3xl">San Francisco Covered Court</h3>

							<p className="mt-5 max-w-md text-sm leading-8 text-black/55">San Francisco, Bulan, Sorsogon</p>

							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d267.9484973039009!2d123.90690550273776!3d12.71965836477921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0d1430bb2f047%3A0xaa363bdb40e65e3b!2sSAN%20FRANCISCO%20COVERED%20COURT!5e1!3m2!1sen!2sph!4v1789553255255!5m2!1sen!2sph"
								className="mt-8 aspect-[4/3] w-full border-0 md:w-[280px] lg:w-[400px]"
								allowFullScreen
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
								title="Map to San Francisco Covered Court"
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-[#111111] px-6 py-24 text-[#faf8f5]">
				<div className="mx-auto max-w-5xl text-center">
					<p className="mb-10 text-[0.6rem] uppercase tracking-[0.4em] text-[#faf8f5]/40">Counting down to forever</p>

					<div className="grid grid-cols-2 divide-x divide-[#faf8f5]/10 md:grid-cols-4">
						{countdown.map((value, index) => {
							const label = ['Days', 'Hours', 'Minutes', 'Seconds'][index];

							return (
								<div
									key={label}
									className="px-4 py-5">
									<p className="font-serif text-4xl sm:text-5xl">{value}</p>

									<p className="mt-3 text-[0.55rem] uppercase tracking-[0.3em] text-[#faf8f5]/40">{label}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section
				id="story"
				className="bg-[#111111] px-6 py-28 text-[#faf8f5] sm:py-36">
				<div className="mx-auto max-w-5xl">
					<div className="mb-16 text-center">
						<p className="mb-4 text-[0.65rem] uppercase tracking-[0.4em] text-[#faf8f5]/40">Our Story</p>

						<h2 className="font-serif text-4xl sm:text-5xl">And so it begins</h2>
					</div>

					<div className="mx-auto max-w-3xl">
						<p className="font-serif text-2xl leading-relaxed text-[#faf8f5]/80 sm:text-3xl">
							Every love story has its own rhythm, its own unexpected turns, and its own moment when two lives begin
							moving in the same direction.
						</p>

						<p className="mt-10 text-sm leading-8 text-[#faf8f5]/45">
							Our story is still being written. And on this day, surrounded by the people who mean the most to us, we
							begin its next chapter together.
						</p>
					</div>
				</div>
			</section>

			<section
				id="gallery"
				className="px-6 py-28 sm:py-36">
				<div className="mx-auto max-w-6xl">
					<SectionHeading
						eyebrow="Moments"
						title="A glimpse of us"
					/>

					{galleryItems?.length > 0 ?
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
							{galleryItems.map((item, index) => {
								if ('src' in item && typeof item.src === 'string') {
									const photo = item as { src: string; alt?: string };

									return (
										<div
											key={photo.src || index}
											className={`group overflow-hidden bg-[#f3eee9] ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
											<img
												src={photo.src}
												alt={photo.alt ?? `Marvin and Meri Cris photo ${index + 1}`}
												className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
											/>
										</div>
									);
								}

								return (
									<div
										key={`${item.label}-${index}`}
										className={`group flex min-h-[220px] items-center justify-center overflow-hidden ${item.className}`}>
										<p className="text-xs uppercase tracking-[0.25em] text-white/70">{item.label}</p>
									</div>
								);
							})}
						</div>
					:	<div className="flex min-h-[400px] items-center justify-center border border-dashed border-black/10 bg-[#f3eee9]">
							<p className="text-sm italic text-black/30">Gallery coming soon</p>
						</div>
					}
				</div>
			</section>

			<section
				id="entourage"
				className="bg-[#f3eee9] px-6 py-28 sm:py-36">
				<div className="mx-auto max-w-6xl">
					<SectionHeading
						eyebrow="The Entourage"
						title="Those beside us"
					/>

					<p className="mx-auto mb-20 max-w-2xl text-center font-serif text-xl italic leading-relaxed text-black/55">
						The people who have supported us, guided us, and will stand beside us as we begin this new chapter.
					</p>

					<div>
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Our Families</p>
						</div>

						<div className="grid md:grid-cols-2 md:divide-x md:divide-black/10">
							<div className="px-4 md:px-12">
								<PersonGroup
									label="Parents of the Groom"
									people={entourage.parentsOfTheGroom}
								/>
							</div>

							<div className="px-4 md:px-12">
								<PersonGroup
									label="Parents of the Bride"
									people={entourage.parentsOfTheBride}
								/>
							</div>
						</div>
					</div>

					<div className="mt-24">
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Principal Sponsors</p>
						</div>

						{Math.max(entourage.principalSponsorsBoys.length, entourage.principalSponsorsGirls.length) > 0 ?
							<div className="border-y border-black/10">
								<div className="grid grid-cols-[1fr_auto_1fr] border-b border-black/10 px-5 py-3 text-center text-[0.55rem] font-medium uppercase tracking-[0.25em] text-black/45">
									<span>Boys</span>
									<span />
									<span>Girls</span>
								</div>

								{Array.from(
									{ length: Math.max(entourage.principalSponsorsBoys.length, entourage.principalSponsorsGirls.length) },
									(_, index) => (
										<div
											key={`${entourage.principalSponsorsBoys[index] ?? 'boy'}-${entourage.principalSponsorsGirls[index] ?? 'girl'}-${index}`}
											className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/10 px-5 py-5 text-center last:border-b-0">
											<p className="font-serif text-lg">{entourage.principalSponsorsBoys[index] ?? ''}</p>
											<span className="px-3 font-serif text-lg text-[#6e1f2a]">&amp;</span>
											<p className="font-serif text-lg">{entourage.principalSponsorsGirls[index] ?? ''}</p>
										</div>
									),
								)}
							</div>
						:	<div className="border-y border-black/10 py-10 text-center">
								<p className="text-sm italic text-black/35">Details to be provided</p>
							</div>
						}
					</div>

					<div className="mt-24">
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Honors</p>
						</div>

						<div className="grid md:grid-cols-2 md:divide-x md:divide-black/10">
							<div className="px-4 md:px-12">
								<CoupleRole
									label="Best Man"
									people={entourage.bestMan}
								/>
							</div>

							<div className="px-4 md:px-12">
								<CoupleRole
									label="Maid of Honor"
									people={entourage.maidOfHonor}
								/>
							</div>
						</div>
					</div>

					<div className="mt-24">
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Bridal Party</p>
						</div>

						<div className="grid md:grid-cols-2 md:divide-x md:divide-black/10">
							<div className="px-4 md:px-12">
								<PersonGroup
									label="Groomsmen"
									people={entourage.groomsmen}
								/>
							</div>

							<div className="px-4 md:px-12">
								<PersonGroup
									label="Bridesmaids"
									people={entourage.bridesmaids}
								/>
							</div>
						</div>
					</div>

					<div className="mt-24">
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Ceremony Roles</p>
						</div>

						<div className="grid border-y border-black/10 md:grid-cols-3">
							<PersonGroup
								label="Veil"
								people={entourage.viel}
							/>

							<div className="md:border-l md:border-black/10">
								<PersonGroup
									label="Cord"
									people={entourage.cord}
								/>
							</div>

							<div className="md:border-l md:border-black/10">
								<PersonGroup
									label="Candle"
									people={entourage.candle}
								/>
							</div>
						</div>
					</div>

					<div className="mt-24">
						<div className="mb-10 text-center">
							<p className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#6e1f2a]">Bearers</p>
						</div>

						<div className="grid border-y border-black/10 sm:grid-cols-2 lg:grid-cols-4">
							<PersonGroup
								label="Flower Girls"
								people={entourage.flowerGirls}
							/>

							<div className="sm:border-l sm:border-black/10">
								<PersonGroup
									label="Ring Bearer"
									people={entourage.ringBearer}
								/>
							</div>

							<div className="lg:border-l lg:border-black/10">
								<PersonGroup
									label="Bible Bearer"
									people={entourage.bibleBearer}
								/>
							</div>

							<div className="sm:border-l sm:border-black/10">
								<PersonGroup
									label="Coin Bearer"
									people={entourage.coinBearer}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-6 py-28 sm:py-36">
				<div className="mx-auto max-w-4xl">
					<SectionHeading
						eyebrow="Dress Code"
						title="Come dressed with love"
					/>

					<div className="grid border-y border-black/10 md:grid-cols-2">
						<div className="border-b border-black/10 px-8 py-12 text-center md:border-b-0 md:border-r">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Gentlemen</p>

							<h3 className="font-serif text-2xl">Formal Attire</h3>

							<p className="mt-4 text-sm leading-7 text-black/50">Details to be announced.</p>
						</div>

						<div className="px-8 py-12 text-center">
							<p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-[#6e1f2a]">Ladies</p>

							<h3 className="font-serif text-2xl">Formal Attire</h3>

							<p className="mt-4 text-sm leading-7 text-black/50">Details to be announced.</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="rsvp"
				className="bg-[#6e1f2a] px-6 py-28 text-[#faf8f5] sm:py-36">
				<div className="mx-auto max-w-4xl">
					<p className="mb-5 text-[0.65rem] uppercase tracking-[0.4em] text-[#faf8f5]/50">Kindly Respond</p>

					<h2 className="text-center font-script text-5xl sm:text-6xl">Will you join us?</h2>

					<p className="mx-auto mt-8 max-w-xl text-center text-sm leading-8 text-[#faf8f5]/60">
						Your presence would mean so much to us. Please let us know if you will be celebrating this special day with
						us.
					</p>

					{rsvpStatus === 'success' ?
						<div className="mx-auto mt-12 max-w-2xl border border-[#faf8f5]/20 px-8 py-14 text-center">
							<p className="font-script text-4xl text-[#faf8f5]">Thank you</p>

							<p className="mx-auto mt-5 max-w-md text-sm leading-8 text-[#faf8f5]/70">
								Your RSVP has been received. We look forward to celebrating with you.
							</p>
						</div>
					:	<form
							className="mx-auto mt-12 max-w-3xl text-left"
							onSubmit={submitRsvp}>
							<div className="grid gap-6 sm:grid-cols-2">
								<label className="block">
									<span className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#faf8f5]/60">
										Full name
									</span>
									<input
										required
										value={rsvp.fullName}
										onChange={(event) => setRsvp({ ...rsvp, fullName: event.target.value })}
										className="w-full border-b border-[#faf8f5]/30 bg-transparent px-0 py-3 text-sm text-[#faf8f5] outline-none placeholder:text-[#faf8f5]/30 focus:border-[#faf8f5]"
										placeholder="Your name"
									/>
								</label>

								<label className="block">
									<span className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#faf8f5]/60">
										Email / contact number
									</span>
									<input
										required
										value={rsvp.contact}
										onChange={(event) => setRsvp({ ...rsvp, contact: event.target.value })}
										className="w-full border-b border-[#faf8f5]/30 bg-transparent px-0 py-3 text-sm text-[#faf8f5] outline-none placeholder:text-[#faf8f5]/30 focus:border-[#faf8f5]"
										placeholder="Email or phone number"
									/>
								</label>

								<label className="block">
									<span className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#faf8f5]/60">
										Number of guests
									</span>
									<input
										required
										min="1"
										max="20"
										type="number"
										value={rsvp.guestCount}
										onChange={(event) => setRsvp({ ...rsvp, guestCount: event.target.value })}
										className="w-full border-b border-[#faf8f5]/30 bg-transparent px-0 py-3 text-sm text-[#faf8f5] outline-none placeholder:text-[#faf8f5]/30 focus:border-[#faf8f5]"
									/>
								</label>

								<label className="block">
									<span className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#faf8f5]/60">
										Guest names
									</span>
									<input
										value={rsvp.guestNames}
										onChange={(event) => setRsvp({ ...rsvp, guestNames: event.target.value })}
										className="w-full border-b border-[#faf8f5]/30 bg-transparent px-0 py-3 text-sm text-[#faf8f5] outline-none placeholder:text-[#faf8f5]/30 focus:border-[#faf8f5]"
										placeholder="Optional"
									/>
								</label>
							</div>

							<label className="mt-6 block">
								<span className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#faf8f5]/60">
									Message for the couple
								</span>
								<textarea
									rows={4}
									value={rsvp.message}
									onChange={(event) => setRsvp({ ...rsvp, message: event.target.value })}
									className="w-full resize-none border-b border-[#faf8f5]/30 bg-transparent px-0 py-3 text-sm text-[#faf8f5] outline-none placeholder:text-[#faf8f5]/30 focus:border-[#faf8f5]"
									placeholder="Leave a note"
								/>
							</label>

							{rsvpError ?
								<p className="mt-5 text-sm text-[#f7c7c7]">{rsvpError}</p>
							:	null}

							<button
								type="submit"
								disabled={rsvpStatus === 'submitting'}
								className="mt-8 bg-[#faf8f5] px-10 py-4 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#6e1f2a] transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60">
								{rsvpStatus === 'submitting' ? 'Sending...' : 'Send RSVP'}
							</button>
						</form>
					}
				</div>
			</section>

			<footer className="bg-[#111111] px-6 py-20 text-center text-[#faf8f5]">
				<p className="font-script text-3xl text-[#faf8f5]/70 sm:text-4xl">“The beginning of forever”</p>

				<div className="mx-auto my-8 h-px w-10 bg-[#faf8f5]/20" />

				<p className="font-serif text-3xl">
					Marvin <span className="text-[#faf8f5]/30">&</span> Meri Cris
				</p>

				<p className="mt-6 text-[0.55rem] uppercase tracking-[0.3em] text-[#faf8f5]/30">October 26, 2026</p>
			</footer>
		</main>
	);
}
