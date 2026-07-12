"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { PenTool } from "lucide-react";

interface ScribeReflectionProps {
  dayParam: number;
  planDay: any;
  scribeReflection: string;
  setScribeReflection: (val: string) => void;
  isSealBroken: boolean;
  setIsSealBroken: (val: boolean) => void;
  isShaking: boolean;
  setIsShaking: (val: boolean) => void;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
  toast: any;
}

export default function ScribeReflection({
  dayParam,
  planDay,
  scribeReflection,
  setScribeReflection,
  isSealBroken,
  setIsSealBroken,
  isShaking,
  setIsShaking,
  getThemeClass,
  toast
}: ScribeReflectionProps) {

  const handleBreakSeal = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsSealBroken(true);
      localStorage.setItem("scriptorium-seal-broken-21", "true");
      toast({
        title: "The Seal is Broken",
        description: "The private journal is unlocked. Examine your heart.",
      });
    }, 700);
  };

  return (
    <div className="mt-24 pt-16 border-t border-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <PenTool className="h-6 w-6 text-primary" />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Scribe's Reflection</span>
      </div>
      <div className="space-y-6">
        {dayParam === 21 && !isSealBroken ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 rounded-2xl bg-amber-500/5 dark:bg-slate-950/20 border border-amber-500/10 dark:border-slate-800 text-center space-y-6">
            <style>{`
              @keyframes shake {
                10%, 90% { transform: translate3d(-1px, 0, 0) rotate(-1deg); }
                20%, 80% { transform: translate3d(2px, 0, 0) rotate(1deg); }
                30%, 50%, 70% { transform: translate3d(-3px, 0, 0) rotate(-2deg); }
                40%, 60% { transform: translate3d(3px, 0, 0) rotate(2deg); }
              }
              .animate-shake {
                animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
              }
            `}</style>
            <div className="max-w-md">
              <h4 className="text-lg font-headline font-bold mb-2">The Mirror of Truth</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This reflection is locked behind a royal wax seal. Nathan has confronted you: "You are the man." To open your private journal and examine your heart, click the seal to break it.
              </p>
            </div>

            <button
              onClick={handleBreakSeal}
              className={cn(
                "w-28 h-28 rounded-full bg-[#9E1A1A] hover:bg-[#8A1313] border-4 border-amber-500/40 flex flex-col items-center justify-center relative cursor-pointer shadow-xl transition-all duration-300 outline-none transform hover:scale-105 active:scale-95",
                isShaking && "animate-shake"
              )}
            >
              <div className="absolute inset-2 border-2 border-dashed border-amber-500/25 rounded-full pointer-events-none" />
              <span className="text-3xl text-amber-500/80 drop-shadow-md select-none">👑</span>
              <span className="text-[10px] font-bold tracking-widest text-amber-500/90 font-headline mt-1 select-none">TRUTH</span>
            </button>
            
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
              Click seal to break
            </span>
          </div>
        ) : (
          <>
            {planDay?.reflectionQuestion && (
              <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-lg font-bold text-primary italic">Reflection: {planDay.reflectionQuestion}</p>
              </div>
            )}

            <Textarea 
              placeholder="Your study notes..."
              className={cn(
                "min-h-[200px] rounded-2xl transition-all p-8 text-lg focus:ring-primary/10",
                getThemeClass("bg-white border-slate-200 text-slate-900", "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422]", "bg-slate-900/50 border-slate-800 text-slate-200")
              )}
              value={scribeReflection}
              onChange={(e) => setScribeReflection(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
}
