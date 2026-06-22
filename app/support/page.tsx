export default function SupportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center px-4">
      <div className="flex flex-col items-center gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight">Support the Project</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          This tracker is free and open-source. If you find it useful, consider buying me a coffee!
        </p>
      </div>

      <a
        href="https://buymeacoffee.com/allenwest"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 21.5h20v-3H2v3zM20.5 8.5c-.4-.7-1-1.3-1.7-1.7L16.4 2H7.6L5.2 6.8c-.7.4-1.3 1-1.7 1.7L2 12.5l3 5h14l3-5-1.5-4z" />
        </svg>
        Buy me a coffee
      </a>


    </div>
  );
}
