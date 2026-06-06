import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LoginForm } from "@/components/LoginForm";
import { NavigationBar } from "@/components/NavigationBar";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <NavigationBar variant="intake" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-heading mb-4 text-4xl font-extrabold tracking-tight text-white">
              Welcome <span className="text-primary">Back</span>
            </h1>
            <p className="text-lg text-gray-400">
              Sign in to access your account.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl">
            <div className="bg-primary/20 pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full blur-[80px]" />

            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
