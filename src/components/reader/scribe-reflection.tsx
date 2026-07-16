"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Heart, Binary } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScribeReflectionProps {
  dayParam: number;
  planDay: any;
  scribeReflection: string;
  setScribeReflection: (val: string) => void;
  structuralReflection: string;
  setStructuralReflection: (val: string) => void;
  isSealBroken: boolean;
  setIsSealBroken: (val: boolean) => void;
  isShaking: boolean;
  setIsShaking: (val: boolean) => void;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
  toast: any;
  onSealScroll?: () => void;
  showSealButton?: boolean;
}

export default function ScribeReflection({
  dayParam,
  planDay,
  scribeReflection,
  setScribeReflection,
  structuralReflection,
  setStructuralReflection,
  isSealBroken,
  setIsSealBroken,
  isShaking,
  setIsShaking,
  getThemeClass,
  toast,
  onSealScroll,
  showSealButton = false
}: ScribeReflectionProps) {
  const [activeTab, setActiveTab] = useState<'transformational' | 'structural'>('transformational');

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

  const activePrompt = activeTab === 'transformational' 
    ? planDay?.reflectionQuestion 
    : planDay?.structuralReflectionQuestion;

  const activeValue = activeTab === 'transformational' 
    ? scribeReflection 
    : structuralReflection;

  const handleTextChange = (val: string) => {
    if (activeTab === 'transformational') {
      setScribeReflection(val);
    } else {
      setStructuralReflection(val);
    }
  };

  return (
    <div className={cn(!showSealButton && "mt-24 pt-16 border-t border-slate-100 dark:border-slate-800")}>
      {!showSealButton && (
        <div className="flex items-center gap-4 mb-8">
          <PenTool className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Scribe's Reflection</span>
        </div>
      )}
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
          <div className="space-y-6">
            {/* Study Goal Toggle Tabs */}
            <div className={cn(
              "flex gap-1.5 p-1 rounded-xl max-w-sm border",
              getThemeClass(
                "bg-slate-100/60 border-slate-200/50",
                "bg-[#EAE1C9]/50 border-[#D6C5A2]",
                "bg-slate-900/60 border-slate-800/40"
              )
            )}>
              <button
                onClick={() => setActiveTab('transformational')}
                className={cn(
                  "flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2",
                  activeTab === 'transformational'
                    ? getThemeClass(
                        "bg-white text-primary shadow-sm",
                        "bg-[#FAF6EE] text-amber-900 border border-[#E6D7B8] shadow-sm",
                        "bg-slate-800 text-white shadow-sm"
                      )
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                )}
              >
                <Heart className="h-3 w-3 shrink-0" />
                Transformational
              </button>
              <button
                onClick={() => setActiveTab('structural')}
                className={cn(
                  "flex-1 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2",
                  activeTab === 'structural'
                    ? getThemeClass(
                        "bg-white text-primary shadow-sm",
                        "bg-[#FAF6EE] text-amber-900 border border-[#E6D7B8] shadow-sm",
                        "bg-slate-800 text-white shadow-sm"
                      )
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                )}
              >
                <Binary className="h-3.5 w-3.5 shrink-0" />
                Structural Focus
              </button>
            </div>

            {activePrompt && (
              <div className={cn(
                "p-6 rounded-2xl border transition-all duration-300",
                getThemeClass(
                  "bg-primary/5 border-primary/10",
                  "bg-[#FAF6EE]/70 border-[#E6D7B8]/70",
                  "bg-slate-900/30 border-slate-800"
                )
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {activeTab === 'transformational' ? (
                    <Heart className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Binary className="h-3.5 w-3.5 text-primary" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {activeTab === 'transformational' ? 'Transformational Prompt' : 'Structural Prompt'}
                  </span>
                </div>
                <p className={cn(
                  "text-base md:text-lg font-bold font-serif italic leading-relaxed",
                  getThemeClass("text-primary", "text-[#433422]", "text-slate-200")
                )}>
                  "{activePrompt}"
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Textarea 
                placeholder={activeTab === 'transformational' 
                  ? "Write down your transformational reflection, personal insights, or heart responses..."
                  : "Write down your structural analysis, observations on narrative ratio, parallelism patterns..."
                }
                className={cn(
                  "min-h-[160px] rounded-2xl transition-all p-6 text-base font-serif focus:ring-primary/10 focus:outline-none focus-visible:ring-primary/10 focus-visible:ring-offset-0",
                  getThemeClass(
                    "bg-white border-slate-200 text-slate-900", 
                    "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422]", 
                    "bg-slate-900/50 border-slate-800 text-slate-200"
                  )
                )}
                value={activeValue}
                onChange={(e) => handleTextChange(e.target.value)}
              />

              {showSealButton && onSealScroll && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Progress: {activeValue.trim().length > 0 ? "Drafting reflection..." : "Awaiting input"}
                  </span>
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full font-bold px-6 bg-brand-gradient hover:opacity-90 border-none text-white shadow-lg flex items-center gap-2"
                    onClick={onSealScroll}
                  >
                    <span>📜</span> Seal the Scroll
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
