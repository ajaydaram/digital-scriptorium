"use client";

import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepId = "Read" | "Understand" | "Master";

interface Step {
  id: StepId;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: "Read", title: "Read", description: "Surface level" },
  { id: "Understand", title: "Understand", description: "Context & meaning" },
  { id: "Master", title: "Master", description: "Interpretive skill" },
];

interface GuidedAscentProps {
  currentStep: StepId;
  onStepClick?: (stepId: StepId) => void;
}

export function GuidedAscent({ currentStep, onStepClick }: GuidedAscentProps) {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between items-start">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
        <div 
          className="absolute top-5 left-0 h-1 bg-brand-gradient transition-all duration-700 ease-in-out -translate-y-1/2 rounded-full"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isMaster = step.id === "Master";

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center flex-1 group">
              <button 
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary",
                  isActive 
                    ? "bg-white border-primary text-primary" 
                    : "bg-white border-slate-200 text-slate-400 grayscale",
                  isCurrent && "scale-125 ring-8 ring-primary/5 shadow-xl",
                  isActive && isMaster && "border-amber-400 text-amber-500 bg-amber-50"
                )}
              >
                {index < currentIndex ? (
                  <Check className="h-5 w-5" />
                ) : isMaster ? (
                  <Star className={cn("h-5 w-5", isActive ? "fill-amber-400" : "")} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </button>
              
              <div className="mt-4 text-center px-2">
                <p className={cn(
                  "text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors",
                  isActive ? "text-slate-900" : "text-slate-400"
                )}>
                  {step.title}
                </p>
                <p className={cn(
                  "text-[9px] md:text-[10px] font-medium leading-tight transition-colors hidden sm:block",
                  isActive ? "text-slate-500" : "text-slate-300"
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
