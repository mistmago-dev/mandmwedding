'use client';

import { useEffect, useState } from 'react';
import { entourage, galleryItems, wedding } from '@/data/wedding';

const navItems = [
	{ label: 'Home', href: '#home' },
	{ label: 'Story', href: '#story' },
	{ label: 'Details', href: '#details' },
	{ label: 'Gallery', href: '#gallery' },
	{ label: 'RSVP', href: '#rsvp' },
];

const entourageLabels: Record<string, string> = {
	parents: 'Parents',
	principalSponsors: 'Principal Sponsors',
	bestMan: 'Best Man',
	maidOfHonor: 'Maid of Honor',
	groomsmen: 'Groomsmen',
	bridesmaids: 'Bridesmaids',
	flowerGirls: 'Flower Girls',
	ringBearer: 'Ring Bearer',
	bibleBearer: 'Bible Bearer',
	coinBearer: 'Coin Bearer',
};

function getTimeLeft() {
	const target = new Date(wedding.date).getTime();
	const difference = target - Date.now();

	if (difference <= 0) {
		return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	const seconds = Math.floor((difference / 1000) % 60);

	return { total: difference, days, hours, minutes, seconds };
}

function Countdown() {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => window.clearInterval(timer);
	}, []);

	if (timeLeft.total <= 0) {
		return (
			<div className="mt-8 font-display text-3xl uppercase tracking-[0.25em] text-[#6e1f2a] sm:text-4xl">
				THE BEGINNING OF FOREVER
			</div>
		);
	}

	const values = [
		{ label: 'Days', value: timeLeft.days },
		{ label: 'Hours', value: timeLeft.hours },
		{ label: 'Minutes', value: timeLeft.minutes },
		{ label: 'Seconds', value: timeLeft.seconds },
	];

	return (
		<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
			{values.map(({ label, value }) => (
				<div
					key={label}
					className="rounded-[1.5rem] border border-[#d8d0ca] bg-white/70 p-4 text-center shadow-[0_10px_35px_rgba(17,17,17,0.04)] backdrop-blur-sm">
					<div className="font-display text-4xl tracking-wide text-[#111111] sm:text-5xl">
						{String(value).padStart(2, '0')}
					</div>
					<div className="mt-2 text-[0.68rem] uppercase tracking-[0.32em] text-[#6e1f2a]">{label}</div>
				</div>
			))}
		</div>
	);
}

export default function WeddingPage() {
	const [isInvitationOpen, setIsInvitationOpen] = useState(false);

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center bg-[#6e1f2a] px-6 text-[#faf8f5] transition-all duration-700 ease-out ${
					isInvitationOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
				}`}>
				<div className="w-full max-w-2xl border border-[#f3dfe2]/40 bg-[#6e1f2a]/90 px-6 py-10 text-center shadow-[0_20px_80px_rgba(17,17,17,0.24)] backdrop-blur-sm sm:px-12">
					<p className="text-xs uppercase tracking-[0.5em] text-[#f4e6e7]">{wedding.heroTitle}</p>
					<h1 className="mt-6 font-display text-5xl leading-none tracking-[0.06em] sm:text-7xl">
						{wedding.groom}
						<span className="mx-3 inline-block text-3xl align-middle sm:text-5xl">&</span>
						{wedding.bride}
					</h1>
					<p className="mt-5 font-display text-2xl italic tracking-[0.08em] text-[#f7ecee] sm:text-4xl">
						“{wedding.quote}”
					</p>
					<p className="mt-6 text-sm uppercase tracking-[0.35em] text-[#f4e6e7] sm:text-base">{wedding.displayDate}</p>
					<button
						type="button"
						onClick={() => setIsInvitationOpen(true)}
						className="mt-8 inline-flex items-center justify-center rounded-full border border-[#faf8f5]/80 px-7 py-3 text-xs font-medium uppercase tracking-[0.32em] text-[#faf8f5] transition hover:bg-[#faf8f5] hover:text-[#6e1f2a] focus:outline-none focus:ring-2 focus:ring-[#faf8f5] focus:ring-offset-2 focus:ring-offset-[#6e1f2a]">
						Open Invitation
					</button>
				</div>
			</div>

			<div
				className={`min-h-screen bg-[#faf8f5] text-[#111111] transition-opacity duration-700 ease-out ${
					isInvitationOpen ? 'opacity-100' : 'opacity-0'
				}`}>
				<header className="sticky top-0 z-30 border-b border-[#d8d0ca] bg-[#faf8f5]/80 backdrop-blur-sm">
					<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
						<a
							href="#home"
							className="font-display text-2xl tracking-[0.2em] text-[#6e1f2a]">
							M & M
						</a>
						<div className="hidden items-center gap-8 text-[0.66rem] uppercase tracking-[0.26em] text-[#111111]/75 md:flex">
							{navItems.map((item) => (
								<a
									key={item.label}
									href={item.href}
									className="transition hover:text-[#6e1f2a]">
									{item.label}
								</a>
							))}
						</div>
						<a
							href="#rsvp"
							className="inline-flex items-center justify-center rounded-full bg-[#6e1f2a] px-4 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-[#faf8f5] transition hover:bg-[#54141f]">
							RSVP
						</a>
					</nav>
				</header>

				<main
					id="home"
					className="overflow-x-hidden">
					<section className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-20">
						<div className="relative overflow-hidden rounded-[2.25rem] border border-[#d8d0ca] bg-[#6e1f2a] px-6 py-12 text-[#faf8f5] shadow-[0_25px_90px_rgba(110,31,42,0.18)] sm:px-10 lg:px-16 lg:py-20">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_40%)]" />
							<div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#f3dfe2]/30 lg:block" />
							<div className="relative grid items-center gap-8 lg:grid-cols-2">
								<div>
									<p className="text-xs uppercase tracking-[0.5em] text-[#f4e6e7]">The Wedding of</p>
									<h1 className="mt-6 font-display text-5xl leading-[0.9] tracking-[0.04em] sm:text-6xl lg:text-8xl">
										Marvin
										<span className="my-2 block text-3xl sm:text-4xl lg:text-6xl">&</span>
										Meri Cris
									</h1>
									<p className="mt-8 font-display text-2xl italic tracking-[0.08em] text-[#f5ecef] sm:text-3xl">
										“{wedding.quote}”
									</p>
								</div>

								<div className="space-y-6 border border-[#f7e8eb]/25 bg-[#faf8f5]/4 p-6 backdrop-blur-[1px] lg:ml-auto lg:max-w-md">
									<div className="text-xs uppercase tracking-[0.4em] text-[#f4e6e7]">October 26, 2026</div>
									<div className="h-px w-full bg-[#f3dfe2]/30" />
									<div className="space-y-4 text-sm uppercase tracking-[0.24em] text-[#f4e6e7]">
										<p>San Antonio de Padua Parish</p>
										<p>San Francisco, Bulan, Sorsogon</p>
									</div>
									<div className="flex gap-3">
										<a
											href="#details"
											className="inline-flex flex-1 items-center justify-center rounded-full bg-[#faf8f5] px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#6e1f2a] transition hover:bg-white">
											View Details
										</a>
										<a
											href="#rsvp"
											className="inline-flex flex-1 items-center justify-center rounded-full border border-[#faf8f5]/75 px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#faf8f5] transition hover:bg-[#faf8f5]/10">
											RSVP
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section
						id="details"
						className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">Together with their families</p>
							<h2 className="mt-5 font-display text-5xl leading-none tracking-[0.04em] text-[#111111] sm:text-6xl">
								{wedding.groom}
								<span className="mx-3 text-3xl align-middle sm:text-5xl">&</span>
								{wedding.bride}
							</h2>
							<p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#111111]/75 sm:text-xl">
								joyfully invite you to celebrate their wedding day
							</p>
							<p className="mt-6 font-display text-4xl text-[#6e1f2a] sm:text-5xl">{wedding.displayDate}</p>
						</div>
					</section>

					<section className="border-y border-[#d8d0ca] bg-[#f3eee9]">
						<div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
							<div>
								<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">The Wedding Day</p>
								<h2 className="mt-5 font-display text-5xl leading-none text-[#111111] sm:text-6xl">
									{wedding.displayDate}
								</h2>
							</div>
							<div className="space-y-6 rounded-[2rem] border border-[#d8d0ca] bg-[#faf8f5] p-8 shadow-[0_15px_40px_rgba(17,17,17,0.04)]">
								<p className="text-xl font-medium text-[#111111]">{wedding.venue.name}</p>
								<p className="text-base text-[#111111]/75">{wedding.venue.location}</p>
								<a
									href="#location"
									className="inline-flex items-center justify-center rounded-full bg-[#6e1f2a] px-6 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-[#faf8f5] transition hover:bg-[#54141f]">
									View Location
								</a>
							</div>
						</div>
					</section>

					<section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">Countdown</p>
							<h2 className="mt-5 font-display text-5xl leading-none text-[#111111] sm:text-6xl">Until our day</h2>
							<Countdown />
						</div>
					</section>

					<section
						id="story"
						className="bg-[#111111] px-4 py-20 text-[#faf8f5] sm:px-6 lg:px-8">
						<div className="mx-auto max-w-5xl">
							<p className="text-xs uppercase tracking-[0.45em] text-[#d8d0ca]">Our Story</p>
							<h2 className="mt-5 font-display text-5xl leading-none sm:text-6xl">Every love story has a beginning.</h2>
							<div className="mt-10 rounded-[2rem] border border-white/15 bg-white/5 p-8 sm:p-12">
								<p className="max-w-3xl text-lg leading-relaxed text-[#faf8f5]/80">
									Story content to be shared soon. This placeholder section is intentionally designed to be updated with
									the couple&apos;s personal journey when details become available.
								</p>
							</div>
						</div>
					</section>

					<section
						id="gallery"
						className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="mb-10 text-center">
							<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">Gallery</p>
							<h2 className="mt-5 font-display text-5xl leading-none text-[#111111] sm:text-6xl">
								Moments to remember
							</h2>
						</div>

						<div className="grid gap-4 md:grid-cols-3 md:grid-rows-3">
							{galleryItems.map((item, index) => (
								<div
									key={`${item.label}-${index}`}
									className={`group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#d8d0ca] ${item.className}`}>
									<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#111111]/30 transition duration-500 group-hover:scale-105" />
									<div className="absolute inset-x-0 bottom-0 p-6 text-left">
										<span className="inline-block rounded-full border border-white/40 bg-[#111111]/20 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
											{item.label}
										</span>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="bg-[#f3eee9] px-4 py-20 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-6xl">
							<div className="mb-10 text-center">
								<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">Entourage</p>
								<h2 className="mt-5 font-display text-5xl leading-none text-[#111111] sm:text-6xl">
									Our trusted circle
								</h2>
							</div>

							<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
								{Object.entries(entourage).map(([key, values]) => (
									<div
										key={key}
										className="rounded-[2rem] border border-[#d8d0ca] bg-[#faf8f5] p-6">
										<h3 className="text-xs uppercase tracking-[0.35em] text-[#6e1f2a]">
											{entourageLabels[key] ?? key}
										</h3>
										<div className="mt-5 space-y-3 text-base text-[#111111]/75">
											{values.length > 0 ?
												values.map((person) => <p key={person}>{person}</p>)
											:	<p>Details to be provided</p>}
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					<section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="rounded-[2.5rem] border border-[#d8d0ca] bg-[#faf8f5] p-8 shadow-[0_20px_50px_rgba(17,17,17,0.03)] sm:p-12">
							<p className="text-xs uppercase tracking-[0.45em] text-[#6e1f2a]">Dress Code</p>
							<h2 className="mt-5 font-display text-5xl leading-none text-[#111111] sm:text-6xl">
								Details to be provided
							</h2>
						</div>
					</section>

					<section
						id="rsvp"
						className="bg-[#6e1f2a] px-4 py-20 text-[#faf8f5] sm:px-6 lg:px-8">
						<div className="mx-auto max-w-5xl text-center">
							<p className="text-xs uppercase tracking-[0.45em] text-[#f3dfe2]">RSVP</p>
							<h2 className="mt-5 font-display text-5xl leading-none sm:text-6xl">
								We would be honored to celebrate with you.
							</h2>
							<button
								type="button"
								className="mt-10 inline-flex items-center justify-center rounded-full bg-[#faf8f5] px-7 py-4 text-[0.62rem] uppercase tracking-[0.24em] text-[#6e1f2a] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#faf8f5] focus:ring-offset-2 focus:ring-offset-[#6e1f2a]">
								RSVP Now
							</button>
						</div>
					</section>
				</main>

				<footer className="border-t border-[#d8d0ca] bg-[#faf8f5] px-4 py-20 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-5xl text-center">
						<blockquote className="font-display text-4xl italic leading-tight text-[#6e1f2a] sm:text-6xl">
							“{wedding.quote}”
						</blockquote>
						<p className="mt-8 font-display text-3xl uppercase tracking-[0.08em] text-[#111111] sm:text-5xl">
							{wedding.groom} & {wedding.bride}
						</p>
						<p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#111111]/70">{wedding.displayDate}</p>
					</div>
				</footer>
			</div>
		</>
	);
}
