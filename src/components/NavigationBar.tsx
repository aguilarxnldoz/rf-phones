import Link from "next/link";
import {QrCode, Smartphone} from "lucide-react";

import {AuthNavButton} from "@/components/AuthNavButton";
import {getSession} from "@/server/better-auth/server";

interface NavigationBarProps {
	variant?: "home" | "intake";
}

export async function NavigationBar({variant = "home"}: NavigationBarProps) {
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
				<div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-gray-300 md:flex">
					<Link
						href="#phones"
						className="hover:text-primary transition-colors"
					>
						Phones
					</Link>
					<Link
						href="#internet"
						className="hover:text-primary transition-colors"
					>
						Internet
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
					<Link
						href="#contact"
						className="hover:text-primary transistion-colors"
					>
						Contact
					</Link>
				</div>
			)}

			<div className="flex items-center gap-3">
				{variant === "intake" && (
					<div className="hidden items-center gap-2 text-sm font-medium text-gray-300 sm:flex">
						<QrCode className="text-primary h-4 w-4" />
						<span>Secure Intake</span>
					</div>
				)}

				<AuthNavButton user={authUser} />
			</div>
		</nav>
	);
}
