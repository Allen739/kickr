export function LiveBadge() {
  return (
    <div className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      LIVE
    </div>
  );
}
