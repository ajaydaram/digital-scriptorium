'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled Application Error:', error);
  }, [error]);

  const isPermissionError = error.message.includes('permission');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md w-full border-none shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-brand-gradient h-2 w-full" />
        <CardHeader className="text-center pt-10">
          <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold text-slate-900">
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10 text-center space-y-6">
          <p className="text-slate-500 leading-relaxed font-body">
            {isPermissionError 
              ? "It looks like you don't have permission to access this resource. Please try signing in again."
              : "An unexpected error occurred while loading the application. Our team has been notified."}
          </p>
          
          <div className="p-4 bg-slate-100 rounded-2xl text-[10px] font-mono text-slate-500 break-all text-left">
            {error.message}
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => reset()} 
              className="btn-gradient w-full py-6 h-auto font-bold rounded-xl gap-2 shadow-xl shadow-primary/20"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full py-6 h-auto font-bold rounded-xl border-slate-200"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}