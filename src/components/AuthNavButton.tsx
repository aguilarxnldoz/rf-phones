"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {LogIn, LogOut, UserRound, IdCard} from "lucide-react";

import {authClient} from "@/server/better-auth/client";

interface AuthNavUser {
	id: string;
	name: string;
	role: string;
}

interface AuthNavButtonProps {
	user: AuthNavUser | null;
}

export function AuthNavButton({user}: AuthNavButtonProps) {
	const router = useRouter();
	const [isSigningOut, setIsSigningOut] = useState(false);

	if (!user) {
		return (
			<Link
				href="/login"
				className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(163,0,21,0.3)] transition-[transform,background-color] duration-150 hover:scale-105 active:scale-95"
			>
				<LogIn className="h-4 w-4" />
				<span>Sign In</span>
			</Link>
		);
	}

	const isStaff = user.role === "employee" || user.role === "manager";

	const handleSignOut = async () => {
		setIsSigningOut(true);
		await authClient.signOut();
		setIsSigningOut(false);
		router.push("/");
		router.refresh();
	};

	return (
		<div className="flex items-center gap-3">
			{isStaff && (
				<Link
					href={`/member/${user.id}`}
					className={`${isStaff ? "block" : "hidden"}items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors duration-150 hover:border-white/30 hover:bg-white/10 sm:flex`}
				>
					<IdCard className="h-4 w-4" />
					My Profile
				</Link>
			)}

			<span className="hidden items-center gap-2 text-sm font-medium text-gray-300 md:flex">
				<UserRound className="text-primary h-4 w-4" />
				{user.name}
			</span>

			<button
				onClick={handleSignOut}
				disabled={isSigningOut}
				className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
			>
				<LogOut className="h-4 w-4" />
				<span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
			</button>
		</div>
	);
}
