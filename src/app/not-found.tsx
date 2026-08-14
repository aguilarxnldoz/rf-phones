import {NavigationBar} from "@/components/NavigationBar";
import {AnimatedBackground} from "@/components/AnimatedBackground";
import {Home} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="relative flex min-h-screen flex-col">
			<AnimatedBackground />
			<NavigationBar variant="home" />

			<section className="relative flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-12 text-center">
				<p className="text-primary mb-4 text-sm font-bold tracking-[0.3em] uppercase">Error 404</p>

				<h1 className="font-heading mb-6 text-7xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-8xl lg:text-9xl">404</h1>

				<p className="mb-4 text-2xl font-bold text-white sm:text-3xl">Page not found.</p>

				<p className="mb-10 max-w-md text-lg text-gray-400">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

				<Link
					href="/"
					className="bg-primary hover:bg-primary-dark flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(163,0,21,0.2)] transition-[transform,background-color] duration-150 hover:scale-105 active:scale-95"
				>
					<Home className="h-5 w-5" />
					Back to Home
				</Link>
			</section>
		</main>
	);
}
