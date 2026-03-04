"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, ArrowRight, BookOpen, Search, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type StageId = "read" | "understand" | "master";

interface Stage {
  id: StageId;
  label: string;
  description: string;
  icon: any;
  details: {
    title: string;
    content: string;
    action: string;
  };
}

const STAGES: Stage[] = [
  {
    id: "read",
    label: "Read",
    description: "Surface level",
    icon: BookOpen,
    details: {
      title: "The Initial Encounter",
      content: "Begin with a distraction-free environment. Remove the noise and encounter the text as it was written—simply and clearly. This is the foundation of scholarly engagement.",
      action: "Focus on the Text"
    }
  },
  {
    id: "understand",
    label: "Understand",
    description: "Context & meaning",
    icon: Search,
    details: {
      title: "Contextual Clarity",
      content: "Move beyond the surface. Utilize multiple versions to see linguistic nuances and explore cross-references that reveal the biblical author's broader theological intent.",
      action: "Compare Versions"
    }
  },
  {
    id: "master",
    label: "Master",
    description: "Interpretive skill",
    icon: GraduationCap,
    details: {
      title: "Hermeneutical Mastery",
      content: "Achieve mastery through synthesis. Practice interpreting scripture with advanced Genre and Theme tools to develop the skill of systematic biblical engagement.",
      action: "Explore Themes"
    }
  }
];

export function GuidedAscentStepper() {
  const [activeStage, setActiveStage] = React.useState<StageId>("read");
  const activeIndex = STAGES.findIndex((s) => s.id === activeStage);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative mb-12">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
        
        {/* Progress Fill */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-brand-gradient -translate-y-1/2 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: activeIndex / (STAGES.length - 1) }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between">
          {STAGES.map((stage, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;
            const isMaster = stage.id === "master";

            return (
              <div key={stage.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStage(stage.id)}
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/20 bg-white",
                    isCompleted ? "border-primary text-primary" : 
                    isActive ? "border-primary text-primary scale-110 shadow-lg shadow-primary/20 ring-4 ring-primary/5" : 
                    "border-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <stage.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
                  )}
                </button>
                <div className="absolute top-14 text-center w-32">
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    isActive ? "text-slate-900" : "text-slate-400"
                  )}>
                    {stage.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-headline font-bold text-slate-900">
                  {STAGES[activeIndex].details.title}
                </h3>
                <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[9px]">
                  {STAGES[activeIndex].label}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-body">
                {STAGES[activeIndex].details.content}
              </p>
              <button className="flex items-center gap-2 text-primary font-bold text-xs group">
                {STAGES[activeIndex].details.action}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold border", className)}>
      {children}
    </span>
  );
}
