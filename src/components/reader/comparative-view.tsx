"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { Scripture } from "@/services/bibleService";

interface ComparativeViewProps {
  scripture: Scripture;
  version: string;
  secondaryScripture: Scripture | null;
  secondaryVersion: string;
  isSecondaryLoading: boolean;
  secondaryError: string | null;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
  SUPPORTED_VERSIONS: { id: string; name: string; code: string }[];
}

export default function ComparativeView({
  scripture,
  version,
  secondaryScripture,
  secondaryVersion,
  isSecondaryLoading,
  secondaryError,
  getThemeClass,
  SUPPORTED_VERSIONS
}: ComparativeViewProps) {

  const primaryCode = SUPPORTED_VERSIONS.find(v => v.id === version)?.code.toUpperCase() || 'KJV';
  const secondaryCode = SUPPORTED_VERSIONS.find(v => v.id === secondaryVersion)?.code.toUpperCase() || 'ASV';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
      {/* Primary Column */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Primary Translation</span>
          <Badge variant="outline" className="text-xs rounded-full">
            {primaryCode}
          </Badge>
        </div>
        <div className={cn(
          "bible-reader-text leading-relaxed font-serif",
          getThemeClass("text-slate-800", "text-[#433422]", "text-slate-300")
        )}>
          <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
        </div>
      </div>

      {/* Secondary Column */}
      <div className="pt-6 md:pt-0 md:pl-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Secondary Translation</span>
          <Badge variant="outline" className="text-xs rounded-full">
            {secondaryCode}
          </Badge>
        </div>
        {isSecondaryLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Retrieving comparison...</span>
          </div>
        ) : secondaryError ? (
          <div className="text-center py-12 space-y-2">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="text-sm text-slate-500">{secondaryError}</p>
          </div>
        ) : secondaryScripture ? (
          <div className={cn(
            "bible-reader-text leading-relaxed font-serif",
            getThemeClass("text-slate-800", "text-[#433422]", "text-slate-300")
          )}>
            <div dangerouslySetInnerHTML={{ __html: secondaryScripture.text }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
