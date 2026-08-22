'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Loader2,
  Phone,
  User as UserIcon,
  ShieldCheck,
  Zap,
  Lock,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import BrandLogo from '@/shared/BrandLogo';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuthStore();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    const cleanName = name.trim();

    if (!cleanPhone) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!cleanName) {
      toast.error('Please enter your full name');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(cleanPhone, cleanName);
      toast.success(`Welcome to ChatFlow, ${user.name}!`);
      router.push('/chat');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your details.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#FAF8FF] via-[#F6F3FE] to-[#F1EEFB] dark:from-[#090810] dark:via-[#0E0C1B] dark:to-[#07060D] text-foreground overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-400/15 dark:bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-400/15 dark:bg-indigo-600/10 blur-[120px]" />

      {/* Top Navigation Header */}
      <header className="relative z-10 px-6 sm:px-10 py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-border/50 bg-white/70 dark:bg-card/70 backdrop-blur-xl">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <BrandLogo size="md" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/80 dark:hover:bg-muted transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Login View */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 my-auto">
        <div className="relative w-full max-w-[440px] group">
          {/* Multi-color ambient aura glow behind the card */}
          <div className="pointer-events-none absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-[#8E7CFF]/35 via-[#725CFF]/25 to-[#FF8FE0]/30 blur-2xl opacity-80 group-hover:opacity-100 transition-all duration-500" />

          {/* Soft Glass Glow Container Background */}
          <div className="relative p-1.5 sm:p-2 rounded-[34px] bg-gradient-to-b from-purple-500/20 via-indigo-500/10 to-purple-500/20 border border-purple-500/25 shadow-[0_20px_60px_-15px_rgba(114,92,255,0.25)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="relative w-full rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white/95 dark:bg-card/95 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl text-card-foreground overflow-hidden">
              {/* Inner ambient corner glows */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[50px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[50px]" />

              {/* Logo & Headline */}
              <div className="relative z-10 text-center space-y-3">
                {/* Hero Brand Icon Badge */}
                <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-[20px] bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="translate-x-[0.5px] translate-y-[0.5px]"
                  >
                    <path
                      d="M3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 20 6.8 20 11.5C20 16.2 16.2 20 11.5 20C9.9 20 8.4 19.5 7.1 18.7L3 20L4.3 16.2C3.5 14.8 3 13.2 3 11.5Z"
                      fill="white"
                    />
                    <circle cx="8" cy="11.5" r="1.3" fill="#8E7CFF" />
                    <circle cx="11.5" cy="11.5" r="1.3" fill="#8E7CFF" />
                    <circle cx="15" cy="11.5" r="1.3" fill="#8E7CFF" />
                    <path
                      d="M19.5 1L20.2 3.2L22.4 3.9L20.2 4.6L19.5 6.8L18.8 4.6L16.6 3.9L18.8 3.2L19.5 1Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    Welcome to ChatFlow
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Enter your phone and name to continue.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 mt-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>Phone Number</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-1234 or 01700000000"
                      required
                      autoFocus
                      className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 pl-10.5 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>Full Name</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <UserIcon className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      required
                      className="w-full h-12 rounded-xl border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40 pl-10.5 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 shadow-2xs transition-all"
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !phone.trim() || !name.trim()}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-semibold shadow-md shadow-slate-950/20 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none transition-all cursor-pointer border border-slate-900 dark:border-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>Connecting to ChatFlow...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Chat</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
