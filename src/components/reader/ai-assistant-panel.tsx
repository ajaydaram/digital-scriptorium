"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, ChevronRight, Search } from "lucide-react";

interface AIAssistantPanelProps {
  planDay: any;
  aiAnalysis: any;
  isAiLoading: boolean;
  selectedWord: string | null;
  wordStudyResult: any;
  isWordStudyLoading: boolean;
  customWordQuery: string;
  setCustomWordQuery: (val: string) => void;
  version: string;
  setCurrentRef: (ref: string) => void;
  setSearchQuery: (ref: string) => void;
  loadScripture: (ref: string, ver: string) => void;
  onAiAnalysis: () => void;
  onWordStudy: (word: string) => void;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
}

export default function AIAssistantPanel({
  planDay,
  aiAnalysis,
  isAiLoading,
  selectedWord,
  wordStudyResult,
  isWordStudyLoading,
  customWordQuery,
  setCustomWordQuery,
  version,
  setCurrentRef,
  setSearchQuery,
  loadScripture,
  onAiAnalysis,
  onWordStudy,
  getThemeClass
}: AIAssistantPanelProps) {

  return (
    <Card className={cn(
      "border-none shadow-md rounded-2xl overflow-hidden flex flex-col mb-6",
      getThemeClass("bg-white", "bg-[#FAF6EE] border border-[#E6D7B8]", "bg-[#1E293B]")
    )}>
      <CardHeader className="p-5 pb-4 border-b border-slate-50 dark:border-slate-800">
        <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" /> Scholarly AI Guide
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        {!aiAnalysis && !isAiLoading ? (
          <div className="text-center py-6 space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed font-body">
              Consult the Scriptorium's AI Guide for scholarly commentary, narrative context, and original language word studies.
            </p>
            <Button 
              onClick={onAiAnalysis} 
              className="btn-gradient rounded-full font-bold px-8 h-12 gap-2 shadow-md w-full"
            >
              <Sparkles className="h-4 w-4" /> Consult AI Guide
            </Button>
          </div>
        ) : isAiLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center">Consulting lexicons & commentaries...</span>
          </div>
        ) : aiAnalysis ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {aiAnalysis.literaryContext && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">📑 1. Literary Context</h4>
                <p className={cn(
                  "text-sm leading-relaxed font-body",
                  getThemeClass("text-slate-600", "text-[#5C4033]", "text-slate-300")
                )}>
                  {aiAnalysis.literaryContext}
                </p>
              </div>
            )}

            {aiAnalysis.structuralMechanics && (
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">🛠️ 2. Structural Mechanics</h4>
                <p className={cn(
                  "text-sm leading-relaxed font-body",
                  getThemeClass("text-slate-600", "text-[#5C4033]", "text-slate-300")
                )}>
                  {aiAnalysis.structuralMechanics}
                </p>
              </div>
            )}

            {aiAnalysis.exegeticalOutline && aiAnalysis.exegeticalOutline.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">📋 3. Exegetical Outline</h4>
                <div className="space-y-3 font-serif">
                  {aiAnalysis.exegeticalOutline.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1.5">
                      <p className={cn("text-sm font-bold", getThemeClass("text-slate-900", "text-[#433422]", "text-slate-100"))}>
                        {item.heading}
                      </p>
                      <ul className="list-none pl-4 space-y-1">
                        {item.subPoints.map((sub: string, sIdx: number) => (
                          <li key={sIdx} className={cn("text-xs leading-relaxed", getThemeClass("text-slate-500", "text-[#5C4033]/80", "text-slate-400"))}>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiAnalysis.historicalMarginalia && aiAnalysis.historicalMarginalia.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">🏺 4. Historical Marginalia</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {aiAnalysis.historicalMarginalia.map((item: any, idx: number) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "p-4 rounded-xl border text-xs space-y-1",
                        getThemeClass("bg-slate-50/50 border-slate-150", "bg-[#F3EAD5]/40 border-[#E1D0B0]", "bg-slate-900/40 border-slate-800/80")
                      )}
                    >
                      <span className={cn("font-bold uppercase tracking-wider block text-[10px]", getThemeClass("text-slate-800", "text-amber-900", "text-slate-200"))}>
                        {item.concept}
                      </span>
                      <p className={cn("leading-relaxed", getThemeClass("text-slate-500", "text-[#5C4033]/90", "text-slate-400"))}>
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiAnalysis.keyWords && aiAnalysis.keyWords.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Linguistic Word Study</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click any word to examine its original language root, Strong's number, and theological depth.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {aiAnalysis.keyWords.map((word: string, i: number) => (
                    <Button
                      key={i}
                      variant={selectedWord === word ? "default" : "outline"}
                      size="sm"
                      onClick={() => onWordStudy(word)}
                      className="rounded-full text-xs px-4 h-8"
                    >
                      {word}
                    </Button>
                  ))}
                </div>

                {/* Custom word search input */}
                <div className="relative mt-3">
                  <Input
                    placeholder="Or enter another word to study..."
                    value={customWordQuery}
                    onChange={(e) => setCustomWordQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customWordQuery.trim()) {
                        onWordStudy(customWordQuery);
                      }
                    }}
                    className="pr-10 h-9 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      if (customWordQuery.trim()) {
                        onWordStudy(customWordQuery);
                      }
                    }}
                    className="absolute right-0 top-0 h-9 w-9 text-slate-400 hover:text-primary rounded-lg"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Word study result rendering */}
                {selectedWord && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {isWordStudyLoading ? (
                      <div className="flex items-center justify-center py-6 gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Analyzing root...</span>
                      </div>
                    ) : wordStudyResult ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-sm font-headline">{wordStudyResult.originalWord}</span>
                            <span className="text-slate-400 ml-2 italic text-[11px]">({wordStudyResult.transliteration})</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary text-[9px] uppercase font-bold hover:bg-primary/10 border-none rounded-full px-2 py-0.5">
                            {wordStudyResult.language} • {wordStudyResult.strongsNumber}
                          </Badge>
                        </div>
                        <div className="space-y-1 pt-1">
                          <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Lexical Definition</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-body">{wordStudyResult.definition}</p>
                        </div>
                        <div className="space-y-1 pt-1">
                          <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Pedagogical Insight</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-body italic">{wordStudyResult.pedagogicalInsight}</p>
                        </div>
                        {wordStudyResult.relatedVerses && wordStudyResult.relatedVerses.length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Related Verses</span>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {wordStudyResult.relatedVerses.map((verseRef: string, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setCurrentRef(verseRef);
                                    setSearchQuery(verseRef);
                                    loadScripture(verseRef, version);
                                  }}
                                  className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary hover:bg-primary/5 transition-colors font-bold"
                                >
                                  {verseRef}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-2">Failed to study word root.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
