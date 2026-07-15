"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Compass, PenTool, CheckCircle2, MessageSquare, Info, ShieldAlert } from "lucide-react";

interface GenreWorkbenchProps {
  day: number;
  scripture: { reference: string; text: string };
  planDay: any;
  theme: string;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
  onMouseUp: () => void;
}

export default function GenreWorkbench({
  day,
  scripture,
  planDay,
  theme,
  getThemeClass,
  onMouseUp
}: GenreWorkbenchProps) {
  // Parable state
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  // Poetry state
  const [poetryFilter, setPoetryFilter] = useState<"all" | "synonymous" | "antithetic" | "synthetic">("all");

  // Prophecy state
  const [prophecyFilter, setProphecyFilter] = useState<"all" | "judgment" | "salvation">("all");

  // Helper to dynamically highlight symbols in the parable text
  const highlightSymbolInText = (htmlText: string, symbol: string | null) => {
    if (!symbol) return htmlText;

    // Convert common terms to regex patterns
    let matchPattern = symbol;
    if (symbol.toLowerCase().includes("seed")) matchPattern = "seed";
    else if (symbol.toLowerCase().includes("birds")) matchPattern = "bird";
    else if (symbol.toLowerCase().includes("thorns")) matchPattern = "thorn";
    else if (symbol.toLowerCase().includes("soil") || symbol.toLowerCase().includes("ground")) matchPattern = "(soil|ground)";
    else if (symbol.toLowerCase().includes("sun") || symbol.toLowerCase().includes("heat")) matchPattern = "sun";
    else if (symbol.toLowerCase().includes("wheat")) matchPattern = "wheat";
    else if (symbol.toLowerCase().includes("weeds") || symbol.toLowerCase().includes("tares")) matchPattern = "(weed|tare)";
    else if (symbol.toLowerCase().includes("pearl")) matchPattern = "pearl";
    else if (symbol.toLowerCase().includes("net")) matchPattern = "net";

    const escaped = matchPattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Case-insensitive boundary matching with optional trailing letters (e.g. s, ed, ing)
    const regex = new RegExp(`\\b(${escaped}[a-z]*)\\b`, 'gi');
    
    return htmlText.replace(regex, (match) => {
      return `<span class="bg-purple-500/20 dark:bg-purple-500/25 border-b-2 border-purple-500 font-bold px-1 rounded transition-all duration-300 animate-pulse">${match}</span>`;
    });
  };

  // Helper to split a plain scriptural text block into fallbacks for poetry lineation couplets
  const getPoetryCouplets = () => {
    if (planDay?.poetryCouplets && planDay.poetryCouplets.length > 0) {
      return planDay.poetryCouplets;
    }

    // Default couplets fallbacks based on specific days
    if (scripture.reference.includes("Psalm 19")) {
      return [
        {
          line1: "The heavens declare the glory of God;",
          line2: "and the sky shows his handiwork.",
          type: "synonymous",
          explanation: "The sky repeats and amplifies the declaration of God's glory declared by the heavens."
        },
        {
          line1: "Day after day they pour out speech,",
          line2: "and night after night they display knowledge.",
          type: "synonymous",
          explanation: "Synonymous parallel: Day matches day, night matches night, speech matches knowledge."
        },
        {
          line1: "There is no speech nor language",
          line2: "where their voice is not heard.",
          type: "synthetic",
          explanation: "Synthetic progression: The second line completes the assertion of the first line."
        }
      ];
    }

    if (scripture.reference.includes("Psalm 42")) {
      return [
        {
          line1: "As the deer pants for the water brooks,",
          line2: "so my soul pants for you, God.",
          type: "synonymous",
          explanation: "Synonymous parallel: A physical longing (deer for water) matches a spiritual longing (soul for God)."
        },
        {
          line1: "My soul thirsts for God, for the living God.",
          line2: "When shall I come and appear before God?",
          type: "synthetic",
          explanation: "Synthetic progression: Thirsting for God progresses into the longing for His tabernacle presence."
        },
        {
          line1: "Deep calls to deep at the noise of your waterfalls.",
          line2: "All your waves and your billows have gone over me.",
          type: "synthetic",
          explanation: "Synthetic progression: The internal storm of the soul matches the physical crashing waves of the sea."
        }
      ];
    }

    // Dynamic generator fallback splitting by punctuation
    const textClean = scripture.text.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const lines = textClean.split(/[.;,]/).map(s => s.trim()).filter(Boolean);
    const couplets = [];
    for (let i = 0; i < lines.length - 1; i += 2) {
      couplets.push({
        line1: lines[i] + ",",
        line2: lines[i + 1] + ".",
        type: i % 3 === 0 ? "synonymous" : i % 3 === 1 ? "synthetic" : "antithetic",
        explanation: "Dynamic couplet segment generated from punctuation boundary."
      });
    }
    return couplets.slice(0, 4); // Limit fallbacks
  };

  // Helper to split a plain scriptural text block into fallbacks for prophetic oracles
  const getPropheticOracles = () => {
    if (planDay?.propheticOracles && planDay.propheticOracles.length > 0) {
      return planDay.propheticOracles;
    }

    // Default oracle breakdowns
    const textClean = scripture.text.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const sentences = textClean.split(/[.!?]/).map(s => s.trim()).filter(Boolean);
    return sentences.map((sentence, idx) => {
      const type = idx % 2 === 0 ? "judgment" : "salvation";
      return {
        text: sentence + ".",
        type: type,
        explanation: type === "judgment" 
          ? "Exposes covenant violations or warns of coming exile and corrective refining."
          : "Declares God's ultimate covenant fidelity, restoration promise, and redemptive grace."
      };
    });
  };

  const couplets = getPoetryCouplets();
  const oracles = getPropheticOracles();

  // Mode selection: Parables, Poetry, or Prophesy
  const isParableMode = planDay?.symbolicMapping || day <= 8;
  const isPoetryMode = scripture.reference.toLowerCase().includes("psalm") || (day >= 9 && day <= 14) || (day >= 29 && day <= 42);
  const isProphesyMode = !isParableMode && !isPoetryMode;

  return (
    <div className="space-y-6">
      {/* Visual Header / Banner indicating Scriptorium Studio mode */}
      <div className={cn(
        "p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
        getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
      )}>
        <div>
          <Badge className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 mb-2 border",
            isParableMode ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200/50" :
            isPoetryMode ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50" :
            "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200/50"
          )}>
            {isParableMode ? "Parable Decrypter Workspace" :
             isPoetryMode ? "Poetry Parallelism Workbench" :
             "Prophetic Oracle Prism"}
          </Badge>
          <h2 className={cn("text-2xl font-headline font-bold leading-tight", getThemeClass("text-slate-900", "text-[#433422]", "text-white"))}>
            {scripture.reference} <span className="font-light opacity-50 font-serif">({planDay?.title || "Genre Passage"})</span>
          </h2>        </div>

        {planDay?.audience && (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
            <Compass className="h-4 w-4 text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Audience: {planDay.audience}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scripture text reader with interactive hover/click features */}
        <div className="lg:col-span-7 space-y-6">
          <Card className={cn(
            "border-none shadow-md rounded-[2.5rem] overflow-hidden border",
            getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
          )}>
            <CardHeader className="p-8 pb-3 flex flex-row items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Holy Scripture Viewport</span>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {isParableMode ? (
                <div 
                  onMouseUp={onMouseUp}
                  className={cn(
                    "bible-reader-text leading-relaxed font-serif text-lg transition-all duration-300",
                    getThemeClass("text-slate-800", "text-[#433422]", "text-slate-200")
                  )}
                  dangerouslySetInnerHTML={{ 
                    __html: highlightSymbolInText(scripture.text, selectedSymbol) 
                  }}
                />
              ) : isPoetryMode ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button 
                      size="sm" 
                      variant={poetryFilter === "all" ? "default" : "outline"} 
                      onClick={() => setPoetryFilter("all")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider"
                    >
                      All Lines
                    </Button>
                    <Button 
                      size="sm" 
                      variant={poetryFilter === "synonymous" ? "default" : "outline"} 
                      onClick={() => setPoetryFilter("synonymous")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/5"
                    >
                      Synonymous Parallelism
                    </Button>
                    <Button 
                      size="sm" 
                      variant={poetryFilter === "antithetic" ? "default" : "outline"} 
                      onClick={() => setPoetryFilter("antithetic")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/5"
                    >
                      Antithetic Parallelism
                    </Button>
                    <Button 
                      size="sm" 
                      variant={poetryFilter === "synthetic" ? "default" : "outline"} 
                      onClick={() => setPoetryFilter("synthetic")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      Synthetic Parallelism
                    </Button>
                  </div>

                  <div 
                    onMouseUp={onMouseUp}
                    className={cn(
                      "bible-reader-text leading-relaxed font-serif text-lg transition-all duration-300 space-y-3",
                      getThemeClass("text-slate-800", "text-[#433422]", "text-slate-200")
                    )}
                  >
                    <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Prophetic filters */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      size="sm" 
                      variant={prophecyFilter === "all" ? "default" : "outline"} 
                      onClick={() => setProphecyFilter("all")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider"
                    >
                      All Oracles
                    </Button>
                    <Button 
                      size="sm" 
                      variant={prophecyFilter === "judgment" ? "default" : "outline"} 
                      onClick={() => setProphecyFilter("judgment")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/5"
                    >
                      ☠️ Judgment/Admonition
                    </Button>
                    <Button 
                      size="sm" 
                      variant={prophecyFilter === "salvation" ? "default" : "outline"} 
                      onClick={() => setProphecyFilter("salvation")} 
                      className="rounded-full text-[10px] h-7 px-3 font-bold uppercase tracking-wider border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      🕊️ Salvation/Restoration
                    </Button>
                  </div>

                  <div 
                    onMouseUp={onMouseUp}
                    className={cn(
                      "bible-reader-text leading-relaxed font-serif text-lg transition-all duration-300 space-y-4",
                      getThemeClass("text-slate-800", "text-[#433422]", "text-slate-200")
                    )}
                  >
                    {/* Render colorized sentences or default text */}
                    {prophecyFilter === "all" ? (
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    ) : (
                      <div className="space-y-3">
                        {oracles.map((oracle: any, oIdx: number) => {
                          const isActive = prophecyFilter === oracle.type;
                          return (
                            <p 
                              key={oIdx} 
                              className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                isActive && oracle.type === "judgment" && "bg-rose-500/10 border-l-4 border-rose-500 dark:bg-rose-500/5 pl-3",
                                isActive && oracle.type === "salvation" && "bg-emerald-500/10 border-l-4 border-emerald-500 dark:bg-emerald-500/5 pl-3",
                                !isActive && "opacity-40 blur-[0.5px]"
                              )}
                            >
                              {oracle.text}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Decrypter panels */}
        <div className="lg:col-span-5 space-y-6">
          {isParableMode && planDay?.symbolicMapping && (
            <Card className={cn(
              "border-none shadow-md rounded-[2rem] overflow-hidden border",
              getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
            )}>
              <CardHeader className="p-6 pb-2">
                 <CardTitle className="text-xs font-bold uppercase tracking-widest text-purple-600 flex items-center gap-2">
                   <Compass className="h-4 w-4" /> Symbolic Translator
                 </CardTitle>
                 <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                   Click any item to highlight its position in scripture.
                 </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {planDay.symbolicMapping.map((item: any, i: number) => {
                  const isActive = selectedSymbol === item.symbol;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSymbol(isActive ? null : item.symbol)}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl border transition-all duration-300 space-y-2",
                        isActive 
                          ? "bg-purple-500/10 border-purple-500/30 dark:bg-purple-500/5 shadow-inner"
                          : getThemeClass("bg-slate-50/50 border-slate-100 hover:border-purple-200 hover:bg-purple-500/5", "bg-[#F3EAD5]/40 border-[#E1D0B0] hover:border-purple-300", "bg-slate-900/40 border-slate-800/80 hover:border-purple-800")
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">{item.symbol}</span>
                          <span className="text-slate-300 dark:text-slate-650">→</span>
                          <span className={cn("font-bold text-xs uppercase tracking-wider", getThemeClass("text-slate-800", "text-[#433422]", "text-slate-200"))}>{item.reality}</span>
                        </div>
                        {isActive && (
                          <Badge variant="outline" className="text-[8px] font-bold px-1.5 py-0 border-purple-300 bg-purple-50 text-purple-600">Active Highlight</Badge>
                        )}
                      </div>
                      <p className={cn("text-xs leading-relaxed italic", getThemeClass("text-slate-500", "text-[#5C4033]", "text-slate-400"))}>
                        "{item.insight}"
                      </p>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {isPoetryMode && (
            <Card className={cn(
              "border-none shadow-md rounded-[2rem] overflow-hidden border",
              getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
            )}>
              <CardHeader className="p-6 pb-2">
                 <CardTitle className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
                   <PenTool className="h-4 w-4" /> Parallelism Ledger
                 </CardTitle>
                 <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                   Parallel lines in Hebrew verse work as Echo chambers.
                 </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {couplets.map((couplet: any, cIdx: number) => {
                  const isFiltered = poetryFilter !== "all" && couplet.type !== poetryFilter;
                  return (
                    <div 
                      key={cIdx} 
                      className={cn(
                        "p-4 rounded-2xl border transition-all duration-300 space-y-3",
                        isFiltered ? "opacity-30 blur-[0.2px] scale-95" : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <Badge className={cn(
                          "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border",
                          couplet.type === "synonymous" ? "bg-blue-500/10 text-blue-600 border-blue-200/50" :
                          couplet.type === "antithetic" ? "bg-rose-500/10 text-rose-600 border-rose-200/50" :
                          "bg-emerald-500/10 text-emerald-600 border-emerald-200/50"
                        )}>
                          {couplet.type}
                        </Badge>
                      </div>

                      <div className="space-y-1 font-serif text-sm">
                        <p className={cn("font-bold", getThemeClass("text-slate-800", "text-[#433422]", "text-white"))}>
                          {couplet.line1}
                        </p>
                        <p className={cn("italic pl-4 text-slate-500 dark:text-slate-400", 
                          couplet.type === "synonymous" && "border-l border-blue-300 dark:border-blue-800",
                          couplet.type === "antithetic" && "border-l border-rose-300 dark:border-rose-800",
                          couplet.type === "synthetic" && "border-l border-emerald-300 dark:border-emerald-800"
                        )}>
                          {couplet.line2}
                        </p>
                      </div>

                      <div className="flex gap-2 items-start text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-body leading-relaxed">
                        <Info className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                        <p>{couplet.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {isProphesyMode && prophecyFilter !== "all" && (
            <Card className={cn(
              "border-none shadow-md rounded-[2rem] overflow-hidden border",
              getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
            )}>
              <CardHeader className="p-6 pb-2">
                 <CardTitle className="text-xs font-bold uppercase tracking-widest text-rose-600 flex items-center gap-2">
                   <ShieldAlert className="h-4 w-4" /> Oracle Insight
                 </CardTitle>
                 <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">
                   Prophets oscillate between corrective warnings and hope.
                 </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {oracles.filter((o: any) => o.type === prophecyFilter).map((oracle: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 space-y-2">
                    <p className={cn("text-xs font-serif leading-relaxed", getThemeClass("text-slate-700", "text-[#433422]", "text-slate-350"))}>
                      "{oracle.text}"
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-body">
                      {oracle.explanation}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {planDay?.scribalStrategy && (
            <Card className={cn(
              "border-none shadow-md rounded-[2rem] overflow-hidden border",
              getThemeClass("bg-[#F1F5F9] border-slate-200", "bg-[#EAE1C9] border-[#D6C5A2]", "bg-slate-900 border-slate-850")
            )}>
              <CardHeader className="p-6 pb-2">
                 <CardTitle className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2", getThemeClass("text-slate-700", "text-[#433422]", "text-slate-200"))}>
                   <PenTool className="h-4 w-4" /> strategy: {planDay.scribalStrategy.title}
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-3">
                {planDay.scribalStrategy.instructions.map((step: string, i: number) => (
                  <div key={i} className="flex gap-3 text-xs leading-relaxed">
                    <span className={cn(
                      "h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold border",
                      getThemeClass("bg-white text-slate-400 border-slate-200", "bg-[#FAF6EE] text-[#8C6D58] border-[#E6D7B8]", "bg-slate-800 text-slate-400 border-slate-700")
                    )}>{i + 1}</span>
                    <p className={getThemeClass("text-slate-600", "text-[#5C4033]", "text-slate-300")}>{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
