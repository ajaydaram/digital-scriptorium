"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type StageId = "read" | "understand" | "master";

interface Stage {
  id: StageId;
  label: string;
  description: string;
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
    details: {
      title: "The Initial Encounter",
      content: "Begin with a distraction-free environment. Our reader removes the noise of modern life, allowing you to encounter the text as it was written—simply and clearly.",
      action: "Start Reading"
    }
  },
  {
    id: "understand",
    label: "Understand",
    description: "Context & meaning",
    details: {
      title: "Contextual Clarity",
      content: "Move beyond the surface. Integrated scholarly annotations provide historical context, original language insights, and cross-references that reveal the author's intent.",
      action: "Deepen Understanding"
    }
  },
  {
    id: "master",
    label: "Master",
    description: "Interpretive skill",
    details: {
      title: "Hermeneutical Mastery",
      content: "Achieve mastery through synthesis. Connect individual passages to the Grand Historical Narrative and develop the skill to teach and apply these truths effectively.",
      action: "Claim Mastery"
    }
  }
];

export function GuidedAscentStepper() {
  const [activeStage, setActiveStage] = React.useState<StageId>("read");
  const activeIndex = STAGES.findIndex((s) => s.id === activeStage);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="relative mb-16">
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
                    "relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/20 bg-white",
                    isCompleted ? "border-primary text-primary" : 
                    isActive ? "border-primary text-primary scale-125 shadow-xl shadow-primary/20 ring-4 ring-primary/5" : 
                    "border-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : isMaster ? (
                    <Star className={cn("h-6 w-6", isActive ? "fill-amber-400 text-amber-400" : "text-slate-400")} />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </button>
                <div className="absolute top-16 text-center w-32 -translate-x-0">
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-1",
                    isActive ? "text-slate-900" : "text-slate-400"
                  )}>
                    {stage.label}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-24 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px]">
                  {STAGES[activeIndex].label} Stage
                </Badge>
                <h3 className="text-2xl font-headline font-bold text-slate-900">
                  {STAGES[activeIndex].details.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {STAGES[activeIndex].details.content}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold text-sm group">
                  {STAGES[activeIndex].details.action}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                {activeStage === 'read' && <div className="p-4 text-center opacity-40 italic text-sm">Distraction-free Reading Mockup</div>}
                {activeStage === 'understand' && <div className="p-4 text-center opacity-40 italic text-sm">Annotation Context UI</div>}
                {activeStage === 'master' && <div className="p-4 text-center opacity-40 italic text-sm">Theological Narrative Map</div>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", className)}>
      {children}
    </span>
  );
}
