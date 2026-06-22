'use client';

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <span className="text-destructive text-lg font-bold">!</span>
      </div>
      <h2 className="text-lg font-bold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button onClick={reset} className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
        Try again
      </button>
    </div>
  );
}
