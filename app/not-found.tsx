import Link from 'next/link';
import { MessageSquareOff, Home, ArrowLeft } from 'lucide-react';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto max-w-md space-y-6">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-muted/80 ring-1 ring-border shadow-inner">
            <MessageSquareOff className="h-12 w-12 text-muted-foreground animate-pulse" />
            <span className="absolute -top-2 -right-2 flex h-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground shadow">
              404
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Sorry, we couldn&apos;t find the page or conversation you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
