"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface IntakeFormProps {
  repId: string | null;
}

export function IntakeForm({ repId }: IntakeFormProps) {
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
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
        <div className="mb-6 rounded-full bg-primary/20 p-4 text-primary">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white font-heading">Request Received!</h3>
        <p className="text-gray-400 max-w-sm">
          {repId 
            ? "Your representative has been notified and will process your request shortly."
            : "We've received your request and will be in touch shortly."}
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-white/10"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
      {repId && <input type="hidden" name="repId" value={repId} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
          <input 
            required
            type="text" 
            id="firstName" 
            name="firstName" 
            className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150"
            placeholder="John"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
          <input 
            required
            type="text" 
            id="lastName" 
            name="lastName" 
            className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
        <input 
          required
          type="email" 
          id="email" 
          name="email" 
          className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150"
          placeholder="john@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-gray-300">Current Phone Number</label>
        <input 
          required
          type="tel" 
          id="phone" 
          name="phone" 
          className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="provider" className="text-sm font-medium text-gray-300">Current Provider</label>
        <select 
          id="provider" 
          name="provider" 
          className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150 appearance-none"
        >
          <option value="" disabled selected>Select Provider</option>
          <option value="fido">Fido</option>
          <option value="rogers">Rogers</option>
          <option value="bell">Bell</option>
          <option value="telus">Telus</option>
          <option value="other">Other / New Activation</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="deviceOfInterest" className="text-sm font-medium text-gray-300">Device of Interest</label>
        <select 
          id="deviceOfInterest" 
          name="deviceOfInterest" 
          className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150 appearance-none"
        >
          <option value="" disabled selected>Select Device</option>
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
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white transition-[transform,background-color] duration-150 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(163,0,21,0.2)]"
      >
        {isSubmitting ? (
          <>
            <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
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
