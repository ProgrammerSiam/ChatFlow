'use client';

const TECH_STACK = [
  { name: 'Next.js 16', role: 'App Router & RSC' },
  { name: 'React 19', role: 'Concurrent UI' },
  { name: 'TypeScript', role: 'Type Safety' },
  { name: 'Tailwind CSS v4', role: 'Modern Styling' },
  { name: 'Socket.IO Client', role: 'Real-Time WebSockets' },
  { name: 'TanStack Query v5', role: 'Server State & Caching' },
  { name: 'Zustand', role: 'Client Store & Sync' },
];

export default function TechStackStrip() {
  return (
    <div className="py-12 border-y bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Powered by Modern Production Architecture
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2.5 rounded-2xl border bg-card/80 px-4 py-2.5 shadow-xs backdrop-blur"
            >
              <span className="text-xs font-bold text-foreground">{tech.name}</span>
              <span className="text-[10px] text-muted-foreground border-l pl-2">
                {tech.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
