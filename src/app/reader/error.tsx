'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ReaderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Reader Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="bg-brand-gradient h-1.5 w-full" />
          <CardContent className="p-12 text-center space-y-8">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold text-slate-900">Reader Error</h2>
              <p className="text-slate-500 font-body leading-relaxed">
                We encountered an issue loading the scripture content or study tools. This might be due to a temporary connection problem.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-mono text-slate-400 break-all text-left max-h-32 overflow-auto">
              {error.message}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => reset()} 
                className="flex-1 btn-gradient py-6 h-auto font-bold rounded-xl gap-2 shadow-xl shadow-primary/20"
              >
                <RefreshCcw className="h-4 w-4" />
                Retry
              </Button>
              <Link href="/" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full py-6 h-auto font-bold rounded-xl border-slate-200 gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}