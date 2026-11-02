"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none rounded-[2.5rem] shadow-2xl glass-card text-center">
        <CardHeader className="pt-10 pb-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-destructive/20">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-black uppercase italic text-destructive">
            System Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-10">
          <p className="text-sm sm:text-base text-muted-foreground">
            An unexpected error occurred while running the application.
          </p>
          <Button
            onClick={() => reset()}
            className="w-full h-12 font-black uppercase italic rounded-2xl neon-glow-primary"
          >
            <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
