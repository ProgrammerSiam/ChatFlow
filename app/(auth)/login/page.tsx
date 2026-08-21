'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Loader2, Phone, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

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
      toast.error('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(cleanPhone, cleanName);
      toast.success(`Welcome, ${user.name}!`);
      router.push('/chat');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your details.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50/50 via-background to-background dark:from-purple-950/20 dark:via-background dark:to-background text-foreground">
      {/* Top minimal header */}
      <header className="px-6 py-4 flex items-center justify-between border-b bg-card/60 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <span>ChatFlow</span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Login View */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6 rounded-[32px] border border-border/80 bg-white/90 dark:bg-card/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl text-card-foreground">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 shadow-inner">
              <Sparkles className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome to ChatFlow
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm leading-relaxed">
              Enter your phone and name. New numbers are automatically registered instantly with zero password hassle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-1234 or 01700000000"
                  required
                  autoFocus
                  className="w-full rounded-2xl border border-input bg-background pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  required
                  className="w-full rounded-2xl border border-input bg-background pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:opacity-95 hover:shadow-purple-500/40 active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Continue to Chat</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Security & Health Note */}
          <div className="pt-2 border-t flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>JWT Bearer Authentication & Socket.io Handshake</span>
          </div>
        </div>
      </main>
    </div>
  );
}
