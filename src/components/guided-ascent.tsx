
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "Read" | "Understand" | "Master";

interface GuidedAscentProps {
  currentStep: Step;
}

export function GuidedAscent({ currentStep }: GuidedAscentProps) {
  const steps: Step[] = ["Read", "Understand", "Master"];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-brand-gradient transition-all duration-500 ease-in-out -translate-y-1/2"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isActive ? "bg-white border-primary shadow-lg" : "bg-muted border-muted",
                  isCurrent && "scale-110 ring-4 ring-primary/10"
                )}
              >
                {index < currentIndex ? (
                  <Check className="h-5 w-5 text-primary" />
                ) : (
                  <span className={cn("text-sm font-bold", isActive ? "text-primary" : "text-muted-foreground")}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={cn(
                "mt-2 text-xs font-semibold tracking-wide uppercase",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
