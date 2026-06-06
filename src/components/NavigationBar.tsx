import Link from "next/link";
import { QrCode, Smartphone } from "lucide-react";

import { AuthNavButton } from "@/components/AuthNavButton";
import { getSession } from "@/server/better-auth/server";

interface NavigationBarProps {
	variant?: "home" | "intake" | "rep";
}

export async function NavigationBar({ variant = "home" }: NavigationBarProps) {
	const session = await getSession();
	const authUser = session?.user
		? {
				id: session.user.id,
				name: session.user.name,
				role: session.user.role ?? "customer",
			}
		: null;

	return (
		<nav className="bg-dark-bg/80 fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-white/5 p-6 px-8 backdrop-blur-sm">
			<Link
				href="/"
				className="flex items-center gap-2"
			>
				<div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl text-white">
					<Smartphone className="h-6 w-6" />
				</div>
				<span className="font-heading text-2xl font-bold tracking-tight text-white">
					RF <span className="text-primary">Phones</span>
				</span>
			</Link>

			{variant === "home" && (
				<div className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
					<Link
						href="#phones"
						className="hover:text-primary transition-colors"
					>
						Phones
					</Link>
					<Link
						href="#plans"
						className="hover:text-primary transition-colors"
					>
						Plans
					</Link>
					<Link
						href="#about"
						className="hover:text-primary transition-colors"
					>
						About Us
					</Link>
				</div>
			)}

			<div className="flex items-center gap-3">
				{variant === "home" && (
					<Link
						href="/rep/demo-rep"
						className="bg-primary hover:bg-primary-dark hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(163,0,21,0.3)] transition-[transform,background-color] duration-150 hover:scale-105 active:scale-95 sm:flex"
					>
						<QrCode className="h-4 w-4" />
						<span>Rep Portal</span>
					</Link>
				)}

				{variant === "intake" && (
					<div className="hidden items-center gap-2 text-sm font-medium text-gray-300 sm:flex">
						<QrCode className="text-primary h-4 w-4" />
						<span>Secure Intake</span>
					</div>
				)}

				{variant === "rep" && (
					<div className="hidden text-sm font-medium text-gray-300 sm:block">Rep Portal</div>
				)}

				<AuthNavButton user={authUser} />
			</div>
		</nav>
	);
}
