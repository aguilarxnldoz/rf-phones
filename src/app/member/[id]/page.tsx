import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowRight,
} from "lucide-react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NavigationBar } from "@/components/NavigationBar";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

interface MemberPageProps {
  params: Promise<{ id: string }>;
}

const roleLabels: Record<string, string> = {
  employee: "Sales Representative",
  manager: "Sales Manager",
};

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  const member = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  // Public profile pages only exist for employees and managers.
  if (!member || member.role === "customer") {
    notFound();
  }

  const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toUpperCase();
  const roleLabel = roleLabels[member.role] ?? "Team Member";

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <NavigationBar variant="intake" />

      <section className="relative z-10 mx-auto max-w-5xl px-4 pt-32 pb-20">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
          {/* Cover Photo Area */}
          <div className="from-primary/40 relative h-48 w-full bg-gradient-to-r to-rose-900/40">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          </div>

          <div className="px-6 pb-8 sm:px-10">
            <div className="relative -mt-20 mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              {/* Profile Picture Placeholder Area (Ready for Uploadthing) */}
              {/* Use member.image if available, otherwise fallback */}
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-black bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
                {member.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={member.image}
                    alt={`${member.firstName}'s Profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-500">
                    {initials}
                  </span>
                )}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>

              <div className="flex-1 pb-2 text-center sm:text-left">
                <div className="border-primary/30 bg-primary/10 text-primary mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {roleLabel}
                </div>
                <h1 className="font-heading text-4xl font-extrabold text-white">
                  {member.firstName} {member.lastName}
                </h1>
                <p className="mt-1 flex items-center justify-center gap-2 text-gray-400 sm:justify-start">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column (About & Highlights) */}
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <h2 className="mb-3 text-lg font-bold text-white">
                    About Your Representative
                  </h2>
                  <p className="leading-relaxed text-gray-300">
                    Working with {member.firstName} ensures you get the best
                    personalized service plan. As an authorized {roleLabel}, they
                    have access to exclusive deals and can guide you through our
                    premium smartphone catalog to find the perfect fit for your
                    needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5">
                    <ShieldCheck className="text-primary h-8 w-8 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Verified Rep</p>
                      <p className="text-xs text-gray-400">Authorized Dealer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5">
                    <Zap className="text-primary h-8 w-8 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Fast Processing</p>
                      <p className="text-xs text-gray-400">Priority Intake</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (CTA / Intake Flow) */}
              <div className="flex flex-col justify-center rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center shadow-[0_0_30px_rgba(163,0,21,0.1)] lg:col-span-1">
                <div className="mb-6 flex justify-center">
                  <div className="bg-primary/20 text-primary flex h-16 w-16 items-center justify-center rounded-full">
                    <Smartphone className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Ready to upgrade?
                </h3>
                <p className="mb-8 text-sm text-gray-400">
                  Start your application directly with {member.firstName} to
                  secure your rate plan and device.
                </p>

                <Link
                  href={`/intake?rep=${member.id}`}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(163,0,21,0.3)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(163,0,21,0.5)] active:scale-[0.98]"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Start Application</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500">
                    Secure & Encrypted • Takes 2 mins
                    <br />
                    Rep ID: {member.id.substring(0, 8)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
