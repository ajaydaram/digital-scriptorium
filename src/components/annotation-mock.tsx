"use client";

import { MessageSquare, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AnnotationMock() {
  return (
    <div className="relative p-8 bg-white border rounded-2xl shadow-inner min-h-[300px] flex items-center justify-center overflow-visible">
      <div className="max-w-md text-center">
        <p className="text-2xl font-serif italic text-slate-700 leading-relaxed">
          "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have <span className="bg-accent/30 border-b-2 border-accent px-1 relative group cursor-help">everlasting life.</span>"
        </p>
        
        {/* Annotation Bubble */}
        <div className="absolute top-0 right-0 md:translate-x-12 -translate-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Card className="w-64 p-4 shadow-2xl border-primary/20 bg-white relative z-20">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-brand-gradient flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Insight</span>
              <Badge className="ml-auto text-[10px] h-4" variant="outline">GREEK</Badge>
            </div>
            <p className="text-sm text-slate-600 mb-3 leading-snug">
              The phrase <strong className="text-primary italic">zōēn aiōnion</strong> refers not just to duration, but to a quality of life—the very life of the age to come.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MessageSquare className="h-3 w-3" />
              <span>Shared by 4 scholars</span>
            </div>
            {/* Pointer */}
            <div className="absolute bottom-0 left-12 w-4 h-4 bg-white border-r border-b border-primary/10 rotate-45 translate-y-2 z-10 shadow-sm" />
          </Card>
        </div>

        {/* User Comment Bubble - Using Annotation Highlight Color */}
        <div className="absolute bottom-0 left-0 md:-translate-x-12 translate-y-12 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
          <Card className="w-56 p-4 shadow-xl border-border bg-[#FEF9C3] relative">
             <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-3 w-3 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">Sarah M.</span>
            </div>
            <p className="text-xs text-slate-500 italic">
              "This reminds me of the 'living water' conversation in the next chapter. The continuity of God's provision."
            </p>
             <div className="absolute top-0 right-12 w-4 h-4 bg-[#FEF9C3] border-l border-t border-border rotate-45 -translate-y-2" />
          </Card>
        </div>
      </div>
    </div>
  );
}