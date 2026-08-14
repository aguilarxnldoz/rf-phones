import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck } from "lucide-react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { IntakeForm } from "@/components/IntakeForm";
import { NavigationBar } from "@/components/NavigationBar";
import { roleLabels } from "@/lib/roles";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

interface IntakePageProps {
	params: Promise<{ id: string }>;
}

export default async function IntakePage({ params }: IntakePageProps) {
	const { id } = await params;

	const representative = await db.query.user.findFirst({
		where: eq(user.id, id),
	});

	if (!representative || representative.role === "customer") {
		notFound();
	}

	const initials = `${representative.firstName.charAt(0)}${representative.lastName.charAt(0)}`.toUpperCase();
	const roleLabel = roleLabels[representative.role] ?? "Team Member";

	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />

			<NavigationBar variant="intake" />

			<section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20">
				<div className="w-full max-w-xl">
					<div className="mb-8 text-center">
						<h1 className="font-heading mb-4 text-4xl font-extrabold tracking-tight text-white">
							Get Your <span className="text-primary">New Plan</span>
						</h1>
						<p className="text-lg text-gray-400">
							Complete the form with {representative.firstName} to initiate your phone upgrade and secure your rate plan.
						</p>
					</div>

					<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl">
						<div className="bg-primary/20 pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full blur-[80px]" />

						<div className="relative z-10 mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
							<p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">Assisted by</p>
							<div className="mt-3 flex items-center gap-3">
								<div className="bg-primary/20 text-primary flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold">
									{initials}
								</div>
								<div>
									<Link
										href={`/member/${representative.id}`}
										className="text-base font-semibold text-white transition-colors duration-150 hover:text-primary"
									>
										{representative.name}
									</Link>
									<p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
										<BadgeCheck className="h-3.5 w-3.5" />
										{roleLabel}
									</p>
								</div>
							</div>
						</div>

						<IntakeForm repId={representative.id} />
					</div>
				</div>
			</section>
		</main>
	);
}
