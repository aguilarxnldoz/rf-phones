"use client";

import {useState} from "react";
import {Send, CheckCircle} from "lucide-react";

export function IntakeForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call to save lead
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="animate-in fade-in flex flex-col items-center justify-center py-12 text-center duration-500">
				<div className="bg-primary/20 text-primary mb-6 rounded-full p-4">
					<CheckCircle className="h-12 w-12" />
				</div>
				<h3 className="font-heading mb-2 text-2xl font-bold text-white">Request Received!</h3>
				<p className="max-w-sm text-gray-400">We&apos;ve received your request and will be in touch shortly.</p>
				<button
					onClick={() => (window.location.href = "/")}
					className="mt-8 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-white/10"
				>
					Return Home
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="relative z-10 flex flex-col gap-5"
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="firstName"
						className="text-sm font-medium text-gray-300"
					>
						First Name
					</label>
					<input
						required
						type="text"
						id="firstName"
						name="firstName"
						className="focus:border-primary focus:ring-primary rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition-colors duration-150 focus:ring-1 focus:outline-none"
						placeholder="John"
					/>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="lastName"
						className="text-sm font-medium text-gray-300"
					>
						Last Name
					</label>
					<input
						required
						type="text"
						id="lastName"
						name="lastName"
						className="focus:border-primary focus:ring-primary rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition-colors duration-150 focus:ring-1 focus:outline-none"
						placeholder="Doe"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="email"
					className="text-sm font-medium text-gray-300"
				>
					Email Address
				</label>
				<input
					required
					type="email"
					id="email"
					name="email"
					className="focus:border-primary focus:ring-primary rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition-colors duration-150 focus:ring-1 focus:outline-none"
					placeholder="john@example.com"
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="phone"
					className="text-sm font-medium text-gray-300"
				>
					Current Phone Number
				</label>
				<input
					required
					type="tel"
					id="phone"
					name="phone"
					className="focus:border-primary focus:ring-primary rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 transition-colors duration-150 focus:ring-1 focus:outline-none"
					placeholder="(555) 123-4567"
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="provider"
					className="text-sm font-medium text-gray-300"
				>
					Current Provider
				</label>
				<select
					id="provider"
					name="provider"
					className="focus:border-primary focus:ring-primary appearance-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors duration-150 focus:ring-1 focus:outline-none"
				>
					<option
						value=""
						disabled
						selected
					>
						Select Provider
					</option>
					<option value="fido">Fido</option>
					<option value="rogers">Rogers</option>
					<option value="bell">Bell</option>
					<option value="telus">Telus</option>
					<option value="other">Other / New Activation</option>
				</select>
			</div>

			<div className="flex flex-col gap-1.5">
				<label
					htmlFor="deviceOfInterest"
					className="text-sm font-medium text-gray-300"
				>
					Device of Interest
				</label>
				<select
					id="deviceOfInterest"
					name="deviceOfInterest"
					className="focus:border-primary focus:ring-primary appearance-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors duration-150 focus:ring-1 focus:outline-none"
				>
					<option
						value=""
						disabled
						selected
					>
						Select Device
					</option>
					<option value="iphone15pro">iPhone 15 Pro</option>
					<option value="iphone15">iPhone 15</option>
					<option value="s24ultra">Samsung Galaxy S24 Ultra</option>
					<option value="pixel8pro">Google Pixel 8 Pro</option>
					<option value="other">Other</option>
				</select>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-primary hover:bg-primary-dark mt-4 flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(163,0,21,0.2)] transition-[transform,background-color] duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
			>
				{isSubmitting ? (
					<>
						<span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
						Processing...
					</>
				) : (
					<>
						<Send className="h-5 w-5" />
						Submit Request
					</>
				)}
			</button>
		</form>
	);
}
