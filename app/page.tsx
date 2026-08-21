import Link from 'next/link';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to <span className="text-blue-600 dark:text-blue-400">ChatFlow</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Real-time messaging platform powered by Zustand, TanStack Query, and Socket.IO.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
