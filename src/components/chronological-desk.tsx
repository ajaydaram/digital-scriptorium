"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CHRONOLOGICAL_DAYS_DATA, Linkage } from "@/lib/chronological-linkages";
import { getLocalStepBiblePassage } from "@/lib/stepbible-database";
import { History, Heart, ShieldAlert, Zap, PenTool, Eraser, Sparkles, BookOpen } from "lucide-react";

interface ChronologicalDeskProps {
  day: number;
  theme: string;
  version: string;
  getThemeClass: (
    light: string, 
    sepia: string, 
    dark: string, 
    byzantine?: string, 
    irish?: string, 
    gutenberg?: string
  ) => string;
}

interface PlacedStamp {
  id: string;
  type: "bottle" | "hem" | "wing" | "spear";
  x: number;
  y: number;
}

export default function ChronologicalDesk({ day, theme, version, getThemeClass }: ChronologicalDeskProps) {
  const router = useRouter();
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark" || theme === "byzantine";

  // Scribal Illumination States
  const [scribalHand, setScribalHand] = useState<"standard" | "cramp" | "uncial">("standard");
  const [placedStamps, setPlacedStamps] = useState<PlacedStamp[]>([]);
  const [activeStampType, setActiveStampType] = useState<"bottle" | "hem" | "wing" | "spear" | null>(null);

  const dayData = CHRONOLOGICAL_DAYS_DATA[day];

  // Load real verses from local database if available, otherwise fall back to English defaults in chronological-linkages
  const getPassageTextForVersion = (reference: string, versionId: string): string => {
    try {
      const passage = getLocalStepBiblePassage(reference);
      if (passage && passage.verses && passage.verses.length > 0) {
        return passage.verses
          .map((v) => {
            const translation = v.translations[versionId] || v.translations["9879dbb7aec41528-01"] || "";
            const prefix = translation.trim().startsWith(`[${v.verseNumber}]`) ? "" : `[${v.verseNumber}] `;
            return `${prefix}${translation}`;
          })
          .join("\n");
      }
    } catch (e) {
      console.error(`Error loading offline passage for reference "${reference}":`, e);
    }
    return "";
  };

  const historyText = dayData ? (getPassageTextForVersion(dayData.historyRef, version) || dayData.historyText) : "";
  const poeticText = dayData ? (getPassageTextForVersion(dayData.poeticRef, version) || dayData.poeticText) : "";

  // Load saved state from LocalStorage on mount/day change
  useEffect(() => {
    const savedStamps = localStorage.getItem(`scriptorium-stamps-${day}`);
    const savedHand = localStorage.getItem(`scriptorium-hand-${day}`);
    
    if (savedStamps) {
      try {
        setPlacedStamps(JSON.parse(savedStamps));
      } catch (e) {
        console.error("Error parsing saved stamps:", e);
      }
    } else {
      setPlacedStamps([]);
    }

    if (savedHand) {
      setScribalHand(savedHand as any);
    } else {
      setScribalHand("standard");
    }
    setActiveStampType(null);
  }, [day]);

  // Save state to LocalStorage
  useEffect(() => {
    if (placedStamps.length > 0) {
      localStorage.setItem(`scriptorium-stamps-${day}`, JSON.stringify(placedStamps));
    } else {
      localStorage.removeItem(`scriptorium-stamps-${day}`);
    }
  }, [placedStamps, day]);

  useEffect(() => {
    localStorage.setItem(`scriptorium-hand-${day}`, scribalHand);
  }, [scribalHand, day]);

  // Listen for Escape key to clear active stamp selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveStampType(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Coordinate recalculator for dynamic SVG linkages
  useEffect(() => {
    if (!hoveredLinkId || !containerRef.current || !dayData) {
      setLineCoords(null);
      return;
    }

    const updateCoordinates = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const leftEl = containerRef.current.querySelector(`[data-link-id="${hoveredLinkId}"][data-pane="history"]`);
      const rightEl = containerRef.current.querySelector(`[data-link-id="${hoveredLinkId}"][data-pane="poetry"]`);

      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        const x1 = leftRect.right - containerRect.left;
        const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;

        const x2 = rightRect.left - containerRect.left;
        const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

        setLineCoords({ x1, y1, x2, y2 });
      }
    };

    updateCoordinates();

    window.addEventListener("resize", updateCoordinates);
    window.addEventListener("scroll", updateCoordinates);

    return () => {
      window.removeEventListener("resize", updateCoordinates);
      window.removeEventListener("scroll", updateCoordinates);
    };
  }, [hoveredLinkId, dayData]);

  // Handle clicking on the desk canvas to drop a stamp
  const handleDeskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeStampType || !containerRef.current) return;

    // Prevent placing stamps when clicking on control buttons or existing stamps
    const target = e.target as HTMLElement;
    if (target.closest(".desk-controls") || target.closest(".stamp-element") || target.closest(".connection-insight")) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    setPlacedStamps((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: activeStampType,
        x,
        y
      }
    ]);
  };

  // Get CSS class based on chosen Scribal Hand
  const getScribalHandClass = () => {
    switch (scribalHand) {
      case "cramp":
        // Jagged, cramped, slanted script mapping fear
        return "font-sans font-light italic tracking-tighter leading-normal scale-x-90 skew-x-6 origin-left text-slate-700 dark:text-slate-400 select-text";
      case "uncial":
        // Wide, grand, uncial capital letters mapping high praise
        return "font-serif font-extrabold uppercase tracking-widest leading-loose text-amber-900 dark:text-amber-500 select-text";
      case "standard":
      default:
        // Elegant medieval bookhand
        return "font-serif tracking-normal leading-relaxed text-slate-900 dark:text-slate-200 select-text";
    }
  };

  // If it's Day 20, render the specialized "The Great Fall / Spiritual Desert" layout
  if (day === 20) {
    return (
      <div className={cn(
        "p-8 md:p-12 rounded-3xl border-4 transition-all duration-500 shadow-xl",
        "bg-[#2B2F36] border-[#1C1F24] text-slate-100"
      )}>
        <header className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 flex items-center justify-center gap-2 mb-2">
            <ShieldAlert className="h-4 w-4 animate-pulse" /> Scribal Strategy: The Darkened Page
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white">
            2 Samuel 11: The Great Fall
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start min-h-[500px]">
          {/* Left Side: The Progress of Sin */}
          <div className="md:col-span-5 space-y-8 border-r border-slate-800 pr-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              The Progression of Sin
            </h3>
            
            <div className="space-y-6">
              {[
                { step: "REMAINED", desc: "David stayed behind at Jerusalem when kings went out to battle, neglecting his royal duty." },
                { step: "SAW", desc: "He looked down from his palace roof and saw Bathsheba bathing, allowing desire to take root." },
                { step: "TOOK", desc: "He sent messengers, took her to his quarters, and lay with her." },
                { step: "MURDERED", desc: "He wrote Uriah's death warrant, ordering Joab to abandon Uriah on the front lines of battle." }
              ].map((item, idx) => (
                <div key={idx} className="group relative flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span className="h-7 w-7 rounded-full bg-red-650/10 text-red-550 border border-red-600/35 flex items-center justify-center text-xs font-bold font-headline">
                      {idx + 1}
                    </span>
                    {idx < 3 && <div className="w-[1px] h-12 bg-red-600/20" />}
                  </div>
                  <div>
                    <h4 className="font-mono tracking-widest font-black uppercase text-base text-red-500 pb-0.5 mb-1">
                      {item.step}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-350 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Empty Spiritual Desert */}
          <div className="md:col-span-7 flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6 relative overflow-hidden rounded-2xl bg-black/30 border border-white/5 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#ff00000a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            <div className="max-w-sm space-y-6 relative z-10">
              <span className="text-4xl">🏜️</span>
              <h3 className="text-xl font-headline font-bold italic text-slate-300">
                "The Spiritual Desert"
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                This section of the page is intentionally left blank. It represents David's isolation, the silence of a dry soul, and the absence of a Psalm. For a full year after his sin, David remained unrepentant, dry, and silent.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback if dayData is not defined for this specific day
  if (!dayData) {
    return (
      <div className="text-center py-10 opacity-60">
        <p className="text-sm font-bold uppercase tracking-widest">Chronological workspace details loading...</p>
      </div>
    );
  }

  // Helper to match snippet across translations
  const matchSnippet = (line: string, snippet: string) => {
    const cleanLine = line.toLowerCase();
    const cleanSnippet = snippet.toLowerCase();
    
    // 1. Direct match
    if (cleanLine.includes(cleanSnippet)) {
      return { matched: true, exact: true, startIndex: cleanLine.indexOf(cleanSnippet), length: snippet.length };
    }
    
    // 2. Keyword match (60% threshold for common non-trivial words)
    const words = snippet.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"?]/g,"").split(/\s+/).filter(w => w.length > 3);
    if (words.length === 0) return { matched: false };
    
    const matchedWords = words.filter(w => cleanLine.includes(w));
    if (matchedWords.length / words.length >= 0.6) {
      return { matched: true, exact: false };
    }
    
    return { matched: false };
  };

  // Render the interactive dual-pane view helper
  const renderVerses = (text: string, linkages: Linkage[], pane: "history" | "poetry") => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      let matchedLink: Linkage | null = null;
      let matchInfo: { matched: boolean; exact?: boolean; startIndex?: number; length?: number } = { matched: false };

      for (const link of linkages) {
        const targetSnippet = pane === "history" ? link.historySnippet : link.poeticSnippet;
        const res = matchSnippet(line, targetSnippet);
        if (res.matched) {
          matchedLink = link;
          matchInfo = res;
          break;
        }
      }

      if (matchedLink && matchInfo.matched) {
        if (matchInfo.exact && typeof matchInfo.startIndex === "number" && typeof matchInfo.length === "number") {
          const originalSnippet = line.substring(matchInfo.startIndex, matchInfo.startIndex + matchInfo.length);
          const parts = [
            line.substring(0, matchInfo.startIndex),
            line.substring(matchInfo.startIndex + matchInfo.length)
          ];
          return (
            <p 
              key={lIdx} 
              className="mb-4"
              style={day === 16 ? { textShadow: "0 0 6px rgba(245, 158, 11, 0.45), 0 0 2px rgba(245, 158, 11, 0.7)" } : {}}
            >
              {parts[0]}
              <span
                data-link-id={matchedLink.id}
                data-pane={pane}
                onMouseEnter={() => setHoveredLinkId(matchedLink!.id)}
                onMouseLeave={() => setHoveredLinkId(null)}
                className={cn(
                  "px-1.5 py-0.5 rounded transition-all duration-300 cursor-pointer select-none font-bold border-b-2",
                  hoveredLinkId === matchedLink.id
                    ? "bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-900 dark:text-amber-200 scale-[1.03] shadow-sm"
                    : "bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/30 text-amber-950 dark:text-amber-500 hover:bg-amber-500/20"
                )}
                style={day === 16 ? { textShadow: "0 0 8px rgba(245, 158, 11, 0.65), 0 0 3px rgba(245, 158, 11, 0.85)" } : {}}
              >
                {originalSnippet}
              </span>
              {parts[1]}
            </p>
          );
        } else {
          // Highlight entire line for keyword match
          return (
            <p 
              key={lIdx} 
              className="mb-4"
              style={day === 16 ? { textShadow: "0 0 6px rgba(245, 158, 11, 0.45), 0 0 2px rgba(245, 158, 11, 0.7)" } : {}}
            >
              <span
                data-link-id={matchedLink.id}
                data-pane={pane}
                onMouseEnter={() => setHoveredLinkId(matchedLink!.id)}
                onMouseLeave={() => setHoveredLinkId(null)}
                className={cn(
                  "px-1.5 py-0.5 rounded transition-all duration-300 cursor-pointer select-none font-bold border-b-2",
                  hoveredLinkId === matchedLink.id
                    ? "bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-900 dark:text-amber-200 scale-[1.03] shadow-sm"
                    : "bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/30 text-amber-950 dark:text-amber-500 hover:bg-amber-500/20"
                )}
                style={day === 16 ? { textShadow: "0 0 8px rgba(245, 158, 11, 0.65), 0 0 3px rgba(245, 158, 11, 0.85)" } : {}}
              >
                {line}
              </span>
            </p>
          );
        }
      }

      return (
        <p 
          key={lIdx} 
          className="mb-4 opacity-90"
          style={day === 16 ? { textShadow: "0 0 6px rgba(245, 158, 11, 0.45), 0 0 2px rgba(245, 158, 11, 0.7)" } : {}}
        >
          {line}
        </p>
      );
    });
  };

  const dx = lineCoords ? Math.abs(lineCoords.x2 - lineCoords.x1) * 0.4 : 0;
  const pathD = lineCoords
    ? `M ${lineCoords.x1} ${lineCoords.y1} C ${lineCoords.x1 + dx} ${lineCoords.y1}, ${lineCoords.x2 - dx} ${lineCoords.y2}, ${lineCoords.x2} ${lineCoords.y2}`
    : "";

  const activeLink = dayData.linkages.find((l) => l.id === hoveredLinkId);

  const getContainerStyle = () => {
    if (day === 16) {
      // Dark, stone-textured frame, constricted borders
      return {
        className: cn(
          "relative p-10 md:p-16 rounded-3xl border-8 transition-all duration-500 shadow-2xl max-w-[850px] mx-auto",
          activeStampType && "cursor-crosshair",
          "bg-[#1A1D20] border-slate-950 text-slate-200"
        ),
        style: {
          backgroundImage: "radial-gradient(circle at 50% 50%, #2A2E33 0%, #111315 100%)",
        }
      };
    }

    if (theme === "byzantine") {
      return {
        className: cn(
          "relative p-6 md:p-8 rounded-3xl border-4 transition-all duration-500 shadow-2xl",
          activeStampType && "cursor-crosshair",
          "border-amber-500 bg-[#1e100a] text-[#F3E5AB] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        ),
        style: {
          backgroundImage: "radial-gradient(circle at center, #2e180f 0%, #160a06 100%)"
        }
      };
    }

    if (theme === "irish") {
      return {
        className: cn(
          "relative p-6 md:p-8 rounded-3xl border-4 transition-all duration-500 shadow-xl",
          activeStampType && "cursor-crosshair",
          "border-emerald-600 bg-[#FAF8F5] text-[#1A3F2C]"
        ),
        style: {
          backgroundImage: "radial-gradient(circle at center, #FCFAF7 0%, #EFEAE2 100%)"
        }
      };
    }

    if (theme === "gutenberg") {
      return {
        className: cn(
          "relative p-6 md:p-8 rounded-none border-4 border-double transition-all duration-500 shadow-lg",
          activeStampType && "cursor-crosshair",
          "border-black bg-[#EFECE6] text-black"
        ),
        style: {}
      };
    }
    
    // Normal style
    return {
      className: cn(
        "relative p-6 md:p-8 rounded-3xl border transition-all duration-500",
        activeStampType && "cursor-crosshair",
        getThemeClass(
          "bg-[#FAF6EE] border-[#E6D7B8] shadow-md",
          "bg-[#F4ECD8] border-[#E6D7B8] shadow-md",
          "bg-slate-900/40 border-slate-850 shadow-lg"
        )
      ),
      style: {}
    };
  };

  const eras = [
    { id: "david", label: "Age of David", date: "1000 BC", range: [15, 21] as [number, number], startDay: 15 },
    { id: "kings", label: "Age of the Kings", date: "960 BC", range: [71, 77] as [number, number], startDay: 71 },
    { id: "exile", label: "Age of Exile/Return", date: "500 BC", range: [43, 49] as [number, number], startDay: 43 },
    { id: "incarnation", label: "Age of Incarnation", date: "30 AD", range: [57, 63] as [number, number], startDay: 57 },
    { id: "apostles", label: "Age of the Apostles", date: "60 AD", range: [64, 70] as [number, number], startDay: 64 },
    { id: "newcreation", label: "Age of New Creation", date: "95 AD", range: [78, 84] as [number, number], startDay: 78 }
  ];

  const activeEra = eras.find(e => day >= e.range[0] && day <= e.range[1]);
  const containerStyle = getContainerStyle();

  return (
    <div 
      ref={containerRef}
      onClick={handleDeskClick}
      className={containerStyle.className}
      style={containerStyle.style}
    >
      {/* Redemptive History Chronological Timeline */}
      <div className="w-full mb-8 p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10 shadow-inner">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Chronological Timeline of Scripture
          </span>
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-4 mt-2">
            {/* The connector line track (hidden on mobile, shown on md screens) */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-amber-500/10 hidden md:block" />
            
            {eras.map((era) => {
              const isActive = activeEra?.id === era.id;
              
              return (
                <button
                  key={era.id}
                  onClick={() => router.push(`/reader?path=chronological&day=${era.startDay}`)}
                  className={cn(
                    "relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 px-4 py-3 md:py-2 rounded-xl border text-left md:text-center transition-all duration-300 hover:scale-[1.02] md:w-[15%]",
                    isActive 
                      ? "bg-amber-600 border-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]"
                      : getThemeClass(
                          "bg-white border-slate-200 hover:bg-slate-50 text-slate-700",
                          "bg-[#FAF6EE] border-[#E6D7B8] hover:bg-[#FAF6EE]/70 text-[#433422]",
                          "bg-slate-950/40 border-slate-800 hover:bg-slate-900/40 text-slate-300"
                        )
                  )}
                >
                  {/* Indicator bullet */}
                  <div className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0",
                    isActive 
                      ? "bg-white border-white animate-pulse" 
                      : "bg-transparent border-amber-500/30"
                  )}>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />}
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold font-headline">{era.label}</span>
                    <span className={cn("text-[10px] font-bold opacity-80 mt-0.5", isActive ? "text-amber-100" : "text-amber-600/80")}>
                      {era.date} • Days {era.range[0]}–{era.range[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="desk-controls w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-amber-500/5 dark:bg-slate-950/30 border border-amber-500/10 dark:border-slate-800">
        
        {/* Left: Tactile Font Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="h-3 w-3" /> Scribal Hand (Tactile Script)
          </span>
          <div className="flex items-center gap-2">
            {[
              { id: "standard", label: "Standard", hint: "Bookhand" },
              { id: "cramp", label: "Cramp-Script", hint: "Fear (Gath)" },
              { id: "uncial", label: "Gothic Uncial", hint: "Praise (En-Gedi)" }
            ].map((hand) => (
              <button
                key={hand.id}
                onClick={() => setScribalHand(hand.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  scribalHand === hand.id
                    ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                    : getThemeClass(
                        "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                        "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422] hover:bg-[#FAF6EE]/65",
                        "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                      )
                )}
                title={hand.hint}
              >
                {hand.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right: Illumination Stamps Drawer */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Marginal Stamps Drawer
          </span>
          <div className="flex items-center flex-wrap gap-2">
            {[
              { type: "bottle", label: "💧 Tear Bottle", hint: "David's Tears (Gath)" },
              { type: "hem", label: "✂️ Royal Hem", hint: "Saul's Corner (En-Gedi)" },
              { type: "wing", label: "🪶 Wing of Refuge", hint: "Shielding Shadow" },
              { type: "spear", label: "🗡️ Saul's Spear", hint: "Ziph Midnight" }
            ].map((stamp) => (
              <button
                key={stamp.type}
                onClick={() => setActiveStampType(activeStampType === stamp.type ? null : (stamp.type as any))}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
                  activeStampType === stamp.type
                    ? "bg-red-600 border-red-600 text-white animate-pulse"
                    : getThemeClass(
                        "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                        "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422] hover:bg-[#FAF6EE]/65",
                        "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                      )
                )}
                title={stamp.hint}
              >
                {stamp.label}
              </button>
            ))}

            {placedStamps.length > 0 && (
              <button
                onClick={() => setPlacedStamps([])}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center gap-1"
                title="Clear all stamps"
              >
                <Eraser className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Active stamp cursor banner reminder */}
      {activeStampType && (
        <div className="desk-controls w-full mb-4 p-2.5 rounded-xl bg-red-600/10 border border-red-500/20 text-center animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="text-xs font-bold text-red-600 dark:text-red-400">
            📌 Click anywhere on the parchment below to place a stamp! (Press <kbd className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 shadow-sm">ESC</kbd> to exit stamp mode)
          </p>
        </div>
      )}

      {/* 2. Placed Stamps Layer */}
      {placedStamps.map((stamp) => (
        <div
          key={stamp.id}
          style={{ left: `${stamp.x}px`, top: `${stamp.y}px` }}
          onDoubleClick={() => setPlacedStamps(prev => prev.filter(s => s.id !== stamp.id))}
          className="stamp-element absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 select-none"
          title="Double click to erase stamp"
        >
          {stamp.type === "bottle" && (
            <div className="text-blue-600 dark:text-blue-400 filter drop-shadow-md">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M50,15 C45,15 42,25 42,40 C30,45 25,60 25,75 C25,85 35,90 50,90 C65,90 75,85 75,75 C75,60 70,45 58,40 C58,25 55,15 50,15 Z" fill="rgba(37, 99, 235, 0.15)" stroke="currentColor" strokeWidth="4.5"/>
                <path d="M38,25 L62,25" stroke="currentColor" strokeWidth="4.5"/>
              </svg>
            </div>
          )}
          {stamp.type === "hem" && (
            <div className="text-amber-600 dark:text-amber-450 filter drop-shadow-md">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M20,20 L80,20 L80,50 L50,80 L20,80 Z" fill="rgba(217, 119, 6, 0.15)" stroke="currentColor" strokeWidth="4.5"/>
                <path d="M80,20 L20,80" stroke="currentColor" strokeWidth="3" strokeDasharray="4 3"/>
                <circle cx="50" cy="50" r="5" fill="currentColor"/>
              </svg>
            </div>
          )}
          {stamp.type === "wing" && (
            <div className="text-yellow-600 dark:text-yellow-450 filter drop-shadow-md">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M20,50 C20,30 40,20 70,20 C75,25 80,35 80,45 C80,60 60,75 20,80 C30,70 35,60 20,50 Z" fill="rgba(234, 179, 8, 0.15)" stroke="currentColor" strokeWidth="4.5"/>
                <path d="M35,45 C45,40 55,42 65,45" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M30,60 C42,52 52,55 60,60" stroke="currentColor" strokeWidth="2.5"/>
              </svg>
            </div>
          )}
          {stamp.type === "spear" && (
            <div className="text-slate-500 dark:text-slate-400 filter drop-shadow-md">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M50,15 L62,35 L54,38 L54,85 L46,85 L46,38 L38,35 Z" fill="rgba(148, 163, 184, 0.15)" stroke="currentColor" strokeWidth="4.5"/>
                <path d="M30,30 L70,30" stroke="currentColor" strokeWidth="3.5"/>
              </svg>
            </div>
          )}
          {/* Eraser Hint Marker */}
          <span className="absolute -top-2 -right-2 h-4.5 w-4.5 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow pointer-events-none transform scale-90 group-hover:scale-100">
            ×
          </span>
        </div>
      ))}

      {/* SVG Linkage Overlay Layer */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full z-20">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {lineCoords && (
          <path
            d={pathD}
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            fill="none"
            filter="url(#glow)"
            strokeDasharray="6"
            className="animate-[dash_8s_linear_infinite]"
          />
        )}
      </svg>

      {/* 3. Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        
        {/* Left Pane: Historical Chronicle */}
        <div className="history-pane space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-amber-500/10">
            <History className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0" />
            <h3 className={cn("text-sm font-bold uppercase tracking-wider", getThemeClass("text-slate-800", "text-[#433422]", "text-slate-350"))}>
              The Historical Chronicle: {dayData.historyRef}
            </h3>
          </div>
          <div className={cn("transition-all duration-300", getScribalHandClass())}>
            {renderVerses(historyText, dayData.linkages, "history")}
          </div>
        </div>

        {/* Right Pane: Poetic Reflection / Soul */}
        <div className="poetry-pane space-y-6 md:border-l md:border-amber-500/10 md:pl-8">
          <div className="flex items-center gap-2 pb-3 border-b border-amber-500/10">
            <Heart className="h-5 w-5 text-red-500 shrink-0" />
            <h3 className={cn("text-sm font-bold uppercase tracking-wider", getThemeClass("text-slate-800", "text-[#433422]", "text-slate-350"))}>
              The Heart's Reflection: {dayData.poeticRef}
            </h3>
          </div>
          <div className={cn("transition-all duration-300", getScribalHandClass())}>
            {renderVerses(poeticText, dayData.linkages, "poetry")}
          </div>
        </div>

      </div>

      {/* Floating Connection Insight Bar */}
      <div className="connection-insight mt-8 relative min-h-[70px]">
        {activeLink ? (
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 flex items-center gap-2">
                Theological Bridge: "{activeLink.historySnippet}" ↔ "{activeLink.poeticSnippet}"
              </h4>
              <p className={cn("text-sm leading-relaxed", getThemeClass("text-slate-700", "text-[#433422]", "text-slate-300"))}>
                {activeLink.explanation}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-850 flex items-center justify-center gap-2 text-slate-400">
            <PenTool className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-bold">
              Hover highlighted phrases above to draw golden linkages. Use the top drawer to toggle hands and place stamps!
            </span>
          </div>
        )}
      </div>

      {/* CSS Animation rule injected directly to keep it self-contained */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </div>
  );
}
