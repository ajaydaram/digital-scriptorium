"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ShieldAlert, Compass, Map, Waypoints } from "lucide-react";

interface JudeanMapProps {
  currentDay: number;
  onDaySelect: (day: number) => void;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
}

interface MapNode {
  day: number;
  name: string;
  x: number;
  y: number;
  description: string;
  snippet: string;
}

const MAP_NODES: MapNode[] = [
  {
    day: 15,
    name: "Gath",
    x: 100,
    y: 90,
    description: "Philistine Borderlands",
    snippet: "David feigns madness before Achish."
  },
  {
    day: 16,
    name: "Cave of Adullam",
    x: 280,
    y: 160,
    description: "The Craggy Caves",
    snippet: "Four hundred distressed outcasts gather."
  },
  {
    day: 17,
    name: "En-Gedi Oasis",
    x: 480,
    y: 70,
    description: "Waterfalls & Wildgoats",
    snippet: "David spares Saul's life in the cave."
  },
  {
    day: 18,
    name: "Ziph Wilderness",
    x: 680,
    y: 140,
    description: "The Dry Desert Sands",
    snippet: "David takes Saul's spear in the night."
  }
];

export default function JudeanMap({ currentDay, onDaySelect, getThemeClass }: JudeanMapProps) {
  // Check if a path segment should be highlighted
  const isSegmentActive = (fromDay: number, toDay: number) => {
    // If the current day is equal to or greater than the destination day, highlight the trail!
    return currentDay >= toDay;
  };

  return (
    <div className={cn(
      "w-full p-4 rounded-3xl border select-none transition-all duration-500 overflow-hidden relative",
      getThemeClass(
        "bg-[#FAF6EE] border-[#E6D7B8] shadow-sm",
        "bg-[#F4ECD8] border-[#E6D7B8] shadow-sm",
        "bg-slate-900/40 border-slate-850 shadow-md"
      )
    )}>
      {/* Map Header */}
      <div className="flex items-center justify-between mb-4 border-b border-amber-500/10 pb-2 relative z-10">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-amber-600 dark:text-amber-500 animate-spin-slow" />
          <h3 className={cn("text-xs font-bold uppercase tracking-[0.2em] font-headline", getThemeClass("text-slate-850", "text-[#433422]", "text-slate-300"))}>
            Judean Wilderness: David's Exile Scroll
          </h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
          Click nodes to navigate
        </span>
      </div>

      {/* Interactive Map Area */}
      <div className="relative w-full overflow-x-auto scrollbar-none py-2">
        <div className="min-w-[760px] w-full relative h-[210px]">
          {/* Hand-drawn SVG elements */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 760 210" fill="none">
            {/* Compass Rose Decoration */}
            <g transform="translate(60, 40)" className="opacity-30 dark:opacity-20">
              <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="1" className="text-amber-600" />
              <line x1="0" y1="-24" x2="0" y2="24" stroke="currentColor" strokeWidth="1.5" className="text-amber-600" />
              <line x1="-24" y1="0" x2="24" stroke="0" strokeWidth="1.5" className="text-amber-600" />
              <polygon points="0,-24 4,-6 0,0 -4,-6" fill="currentColor" className="text-amber-600" />
              <polygon points="0,24 4,6 0,0 -4,6" fill="currentColor" className="text-amber-600" />
              <polygon points="-24,0 -6,4 0,0 -6,-4" fill="currentColor" className="text-amber-600" />
              <polygon points="24,0 6,4 0,0 6,-4" fill="currentColor" className="text-amber-600" />
              <text x="-4" y="-28" className="text-[8px] font-bold fill-current text-amber-700">N</text>
            </g>

            {/* Mountains, Sea and Land details */}
            {/* Dead Sea outline on the right */}
            <path
              d="M 580,20 C 600,40 620,80 620,110 C 620,140 600,180 590,200 L 610,200 C 630,170 650,130 650,110 C 650,80 630,40 610,20 Z"
              fill={getThemeClass("rgba(30, 41, 59, 0.03)", "rgba(67, 52, 34, 0.04)", "rgba(59, 130, 246, 0.05)")}
              stroke={getThemeClass("rgba(30, 41, 59, 0.1)", "rgba(67, 52, 34, 0.15)", "rgba(59, 130, 246, 0.1)")}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            {/* Water lines in the Dead Sea */}
            <g className="text-slate-400 opacity-20">
              <path d="M 605,60 C 615,62 620,60 625,62" stroke="currentColor" strokeWidth="1" />
              <path d="M 600,100 C 610,102 615,100 620,102" stroke="currentColor" strokeWidth="1" />
              <path d="M 595,140 C 605,142 610,140 615,142" stroke="currentColor" strokeWidth="1" />
            </g>
            <text x="630" y="105" className="text-[9px] font-serif italic fill-current text-slate-400 dark:text-slate-500 tracking-widest rotate-90 Origin-center">
              DEAD SEA
            </text>

            {/* Little Mountain Carey Peaks in Cave / Craggy Areas */}
            <g className="text-amber-700/20 dark:text-amber-500/10" stroke="currentColor" strokeWidth="1.5">
              {/* Mountains near Adullam (left-center) */}
              <path d="M 230,180 L 240,165 L 250,180 M 240,180 L 250,160 L 260,180 M 220,190 L 230,175 L 240,190" />
              {/* Mountains near En-Gedi (right-center) */}
              <path d="M 420,100 L 430,85 L 440,100 M 430,100 L 440,80 L 450,100 M 405,110 L 415,95 L 425,110" />
              {/* Dunes near Ziph */}
              <path d="M 630,160 C 640,155 650,155 660,160 M 645,170 C 655,165 665,165 675,170" strokeWidth="1" />
            </g>

            {/* Path segments between nodes */}
            {/* Segment 1: Gath -> Adullam */}
            <path
              d="M 100,90 Q 180,105 280,160"
              fill="none"
              stroke={isSegmentActive(15, 16) ? "#dc2626" : "#94a3b8"}
              strokeWidth={isSegmentActive(15, 16) ? "2.5" : "1.5"}
              strokeDasharray="6 4"
              className={cn(isSegmentActive(15, 16) && "animate-pulse")}
              opacity={isSegmentActive(15, 16) ? "0.85" : "0.35"}
            />
            {/* Segment 2: Adullam -> En-Gedi */}
            <path
              d="M 280,160 Q 380,140 480,70"
              fill="none"
              stroke={isSegmentActive(16, 17) ? "#dc2626" : "#94a3b8"}
              strokeWidth={isSegmentActive(16, 17) ? "2.5" : "1.5"}
              strokeDasharray="6 4"
              className={cn(isSegmentActive(16, 17) && "animate-pulse")}
              opacity={isSegmentActive(16, 17) ? "0.85" : "0.35"}
            />
            {/* Segment 3: En-Gedi -> Ziph */}
            <path
              d="M 480,70 Q 580,120 680,140"
              fill="none"
              stroke={isSegmentActive(17, 18) ? "#dc2626" : "#94a3b8"}
              strokeWidth={isSegmentActive(17, 18) ? "2.5" : "1.5"}
              strokeDasharray="6 4"
              className={cn(isSegmentActive(17, 18) && "animate-pulse")}
              opacity={isSegmentActive(17, 18) ? "0.85" : "0.35"}
            />
          </svg>

          {/* Interactive node marker divs */}
          {MAP_NODES.map((node) => {
            const isNodeActive = currentDay === node.day;
            const isPassed = currentDay > node.day;

            return (
              <div
                key={node.day}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                onClick={() => onDaySelect(node.day)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
              >
                {/* Outer pulsing ring for active node */}
                {isNodeActive && (
                  <span className="absolute -inset-4 rounded-full bg-red-600/20 border border-red-600/40 animate-ping duration-1000 pointer-events-none" />
                )}

                {/* Node Center Dot */}
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-md",
                  isNodeActive
                    ? "bg-red-600 border-white text-white scale-125 ring-4 ring-red-600/30"
                    : isPassed
                      ? "bg-red-950/20 dark:bg-red-600/10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      : getThemeClass(
                          "bg-white border-slate-350 text-slate-500 hover:border-slate-500 hover:text-slate-800",
                          "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422] hover:border-[#3E2F1F]",
                          "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white"
                        )
                )}>
                  <span className="text-[10px] font-bold font-headline">
                    {node.day}
                  </span>
                </div>

                {/* Location text label below or above the dot */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 mt-2 py-0.5 px-2 rounded-md transition-all duration-300 pointer-events-none w-[120px] text-center",
                  isNodeActive
                    ? "bg-red-600/10 border border-red-500/20 dark:bg-red-600/20 shadow-sm"
                    : "bg-transparent border-transparent"
                )}>
                  <p className={cn(
                    "text-[11px] font-headline font-bold leading-tight",
                    isNodeActive 
                      ? "text-red-700 dark:text-red-400" 
                      : getThemeClass("text-slate-700", "text-[#4A3C2D]", "text-slate-400")
                  )}>
                    {node.name}
                  </p>
                </div>

                {/* Styled Parchment Hover Tooltip Card */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover:block w-[240px] p-4 rounded-xl border z-50 shadow-lg text-left animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none",
                  getThemeClass(
                    "bg-[#FAF6EE] border-[#E6D7B8] text-slate-800",
                    "bg-[#F4ECD8] border-[#E6D7B8] text-[#433422]",
                    "bg-slate-950 border-slate-800 text-slate-200"
                  )
                )}>
                  <div className="flex items-center justify-between border-b border-amber-500/10 pb-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      Day {node.day} Study Node
                    </span>
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-500/10">
                      {node.name}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-sm leading-tight mb-1">
                    {node.description}
                  </h4>
                  <p className="text-[11px] italic leading-normal opacity-80">
                    "{node.snippet}"
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-500/20" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 24s linear infinite;
        }
      `}} />
    </div>
  );
}
