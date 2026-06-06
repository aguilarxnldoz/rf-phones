import { AnimatedBackground } from "@/components/AnimatedBackground";
import { IntakeForm } from "@/components/IntakeForm";
import { NavigationBar } from "@/components/NavigationBar";

interface IntakePageProps {
  searchParams: Promise<{ rep?: string }>;
}

export default async function IntakePage({ searchParams }: IntakePageProps) {
  const params = await searchParams;
  const repId = params?.rep ?? null;

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      {/* Navigation */}
      <NavigationBar variant="intake" />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white font-heading">
              Get Your <span className="text-primary">New Plan</span>
            </h1>
            <p className="text-lg text-gray-400">
              Fill out the form below to initiate your phone upgrade and secure your rate plan.
              {repId && (
                <span className="block mt-2 text-sm text-primary">
                  Working with Rep ID: {repId}
                </span>
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            
            <IntakeForm repId={repId} />
          </div>
        </div>
      </section>
    </main>
  );
}
