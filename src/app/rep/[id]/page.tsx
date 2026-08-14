import {AnimatedBackground} from "@/components/AnimatedBackground";
import {NavigationBar} from "@/components/NavigationBar";
import {QRCodeSVG} from "qrcode.react";
import {Share2} from "lucide-react";
import {headers} from "next/headers";

import {CopyLinkButton} from "@/components/CopyLinkButton";

interface RepPortalPageProps {
	params: Promise<{id: string}>;
}

export default async function RepPortalPage({params}: RepPortalPageProps) {
	const {id: repId} = await params;

	// Get host from headers to build absolute URL for QR
	const headersList = await headers();
	const host = headersList.get("host") ?? "localhost:3000";
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
	const intakeUrl = `${protocol}://${host}/intake?rep=${repId}`;

	return (
		<main className="relative min-h-screen">
			<AnimatedBackground />

			<NavigationBar variant="rep" />

			<section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20">
				<div className="w-full max-w-md">
					<div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-8 pt-10 text-center shadow-2xl">
						<div className="bg-primary/20 pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full blur-[80px]" />

						<div className="border-primary/30 bg-primary/10 text-primary mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
							<span className="bg-primary flex h-1.5 w-1.5 animate-pulse rounded-full" />
							Active Rep
						</div>

						<h1 className="font-heading mb-2 text-2xl font-bold tracking-tight text-white">Your Intake QR Code</h1>
						<p className="mb-8 text-sm text-gray-400">Have customers scan this code to securely begin their application tagged to you.</p>

						<div className="mb-8 rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(163,0,21,0.15)]">
							<QRCodeSVG
								value={intakeUrl}
								size={220}
								level="H"
								fgColor="#000000"
								bgColor="#ffffff"
							/>
						</div>

						<div className="w-full space-y-3">
							<CopyLinkButton url={intakeUrl} />

							<button className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-colors duration-150">
								<Share2 className="h-4 w-4" />
								Share Link
							</button>
						</div>

						<div className="mt-8 w-full border-t border-white/10 pt-6 text-center">
							<p className="text-xs text-gray-500">Rep ID: {repId}</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
