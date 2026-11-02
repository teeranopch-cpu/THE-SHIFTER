"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught an error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900/80 border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl font-black uppercase italic text-red-500">
            Critical System Error
          </h2>
          <p className="text-sm text-slate-300">
            A critical application error occurred. Details have been logged.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider transition-colors"
          >
            Reload Interface
          </button>
        </div>
      </body>
    </html>
  );
}
