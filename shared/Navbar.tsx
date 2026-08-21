import BrandLogo from '@/shared/BrandLogo';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* Brand Logo (Matches User Screenshot) */}
        <Link href="/" className="inline-flex">
          <BrandLogo name="Aymo" suffix=".AI" />
        </Link>

        {/* Centered Segmented Pill Menu (No Harsh Shadow, Clean Border Only) */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/90 dark:border-border/80 bg-white/95 dark:bg-card/90 px-1.5 py-1 backdrop-blur-md">
          <Link
            href="/"
            className="rounded-full bg-white dark:bg-muted/80 px-4 py-1.5 text-xs font-semibold text-slate-900 dark:text-white border border-slate-200/80 dark:border-border transition-all"
          >
            Home
          </Link>
          <a
            href="#features"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sandbox
          </a>
          <a
            href="#how-it-works"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#faq"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Log In
          </Link>

          <Link
            href={isAuthenticated ? '/chat' : '/login'}
            className="inline-flex items-center justify-center rounded-full transition-all cursor-pointer duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-5 py-2 text-xs sm:text-sm font-medium shadow-md shadow-slate-900/10 dark:shadow-white/5 active:scale-98"
          >
            <span>{isAuthenticated ? 'Open App' : 'Try Free'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
