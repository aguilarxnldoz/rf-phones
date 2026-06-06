import {AnimatedBackground} from "@/components/AnimatedBackground";
import {NavigationBar} from "@/components/NavigationBar";
import {PhoneListingCard} from "@/components/PhoneListingCard";
import {mockPhones} from "@/data/phones";
import {QrCode, Smartphone, Zap, ShieldCheck} from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />

			{/* Navigation */}
			<NavigationBar variant="home" />

			{/* Hero Section */}
			<section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
				<h1 className="font-heading mb-6 max-w-4xl text-5xl leading-tight font-extrabold tracking-tight text-white drop-shadow-lg sm:text-7xl">
					The future of mobile,
					<br />
					<span className="from-primary bg-gradient-to-r to-rose-400 bg-clip-text text-transparent">delivered to you.</span>
				</h1>

				<p className="mb-10 max-w-2xl text-lg text-gray-400">Get the best deals on premium smartphones with flexible financing options. Scan a rep&apos;s QR code to get a personalized service plan tailored just for you.</p>

				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						href="#phones"
						className="bg-primary hover:bg-primary-dark flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(163,0,21,0.2)] transition-[transform,background-color] duration-150 hover:scale-105"
					>
						<Smartphone className="h-5 w-5" />
						View Phones
					</Link>
					<button className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/10">
						View Service Plans
					</button>
				</div>

				{/* Features Row */}
				<div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
					<div className="flex flex-col items-center text-center">
						<div className="text-primary mb-4 rounded-full border border-white/10 bg-white/5 p-3">
							<Zap className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-bold text-white">Instant Activation</h3>
						<p className="text-sm text-gray-500">Get your plan active immediately after checkout.</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="text-primary mb-4 rounded-full border border-white/10 bg-white/5 p-3">
							<ShieldCheck className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-bold text-white">Secure Financing</h3>
						<p className="text-sm text-gray-500">0% APR financing options available on select devices.</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="text-primary mb-4 rounded-full border border-white/10 bg-white/5 p-3">
							<QrCode className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-bold text-white">Rep Personalized</h3>
						<p className="text-sm text-gray-500">Scan QR codes for exclusive tailored offers.</p>
					</div>
				</div>
			</section>

			{/* Phone Listings Section */}
			<section
				id="phones"
				className="relative z-10 mx-auto max-w-7xl px-4 py-32"
			>
				<div className="mb-12 flex flex-col items-center text-center">
					<h2 className="font-heading mb-4 text-4xl font-extrabold text-white">
						Featured <span className="text-primary">Devices</span>
					</h2>
					<p className="max-w-2xl text-gray-400">Discover our hand-picked selection of top-tier smartphones. Choose the perfect device and pair it with a plan that fits your lifestyle.</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{mockPhones.map((phone) => (
						<PhoneListingCard
							key={phone.id}
							{...phone}
						/>
					))}
				</div>
			</section>

			{/* Footer CTA */}
			<footer className="bg-dark-bg/90 border-t border-white/10 py-12 text-center">
				<h2 className="mb-4 text-2xl font-bold text-white">Ready to upgrade?</h2>
				<p className="mb-8 text-gray-400">Ask your RF Phones representative for their QR code to get started.</p>
				<p className="text-sm text-gray-600">© {new Date().getFullYear()} RF Phones. All rights reserved.</p>
			</footer>
		</main>
	);
}
