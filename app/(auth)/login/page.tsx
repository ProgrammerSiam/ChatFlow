'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Loader2, Phone, User as UserIcon, ShieldCheck } from 'lucide-react';
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
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/chat');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your details.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top minimal header */}
      <header className="px-6 py-4 flex items-center justify-between border-b bg-card/60 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
            <MessageCircle className="h-4 w-4" />
          </div>
          <span>ChatFlow</span>
        </Link>
        <Link
          href="/"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Login View */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6 rounded-3xl border bg-card/90 p-8 shadow-2xl backdrop-blur text-card-foreground">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
              <MessageCircle className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome to ChatFlow
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Enter your phone and name. New numbers are automatically registered instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-1234 or 01700000000"
                  required
                  autoFocus
                  className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  required
                  className="w-full rounded-2xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !phone.trim() || !name.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
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

          <div className="pt-2 border-t flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Secure JWT authentication & real-time WebSocket connection</span>
          </div>
        </div>
      </main>
    </div>
  );
}
