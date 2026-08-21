export default function PageSkeleton() {
  return (
    <div className="w-full space-y-4 p-6 animate-pulse">
      <div className="h-8 w-1/3 rounded-md bg-muted" />
      <div className="h-4 w-2/3 rounded-md bg-muted" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-6">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-32 rounded-lg bg-muted" />
      </div>
    </div>
  );
}
