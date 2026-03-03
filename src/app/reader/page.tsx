
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { GuidedAscent } from "@/components/guided-ascent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchScripture, type Scripture } from "@/lib/bible-api";
import { explainScripture } from "@/ai/flows/ai-annotator-explanation";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Highlighter, 
  MessageSquare,
  Search,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReaderPage() {
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"Read" | "Understand" | "Master">("Read");
  const { toast } = useToast();

  useEffect(() => {
    loadScripture("John 3:16");
  }, []);

  const loadScripture = async (ref: string) => {
    setLoading(true);
    try {
      const data = await fetchScripture(ref);
      setScripture(data);
      setExplanation(null);
      setCurrentStep("Read");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load scripture."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = async () => {
    if (!scripture) return;
    setAiLoading(true);
    try {
      const result = await explainScripture({ scripturePassage: `${scripture.reference}: ${scripture.text}` });
      setExplanation(result.explanation);
      setCurrentStep("Understand");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Assistant Error",
        description: "Could not generate an explanation at this time."
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleMastery = () => {
    setCurrentStep("Master");
    toast({
      title: "Mastery Achieved",
      description: "You've completed this study segment. Progress saved."
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-headline font-bold">John 3</h2>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white">KJV</Badge>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Reader Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="bg-brand-gradient h-2 w-full" />
              <CardContent className="p-12">
                <div className="mb-8">
                  <GuidedAscent currentStep={currentStep} />
                </div>

                <div className="prose prose-slate lg:prose-xl max-w-none">
                  {loading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-6 bg-slate-100 rounded w-3/4" />
                      <div className="h-6 bg-slate-100 rounded w-full" />
                      <div className="h-6 bg-slate-100 rounded w-5/6" />
                    </div>
                  ) : scripture ? (
                    <div className="space-y-6">
                      <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">{scripture.reference}</h3>
                      <p className="font-serif leading-relaxed text-slate-800 text-2xl relative group selection:bg-accent/30">
                        {scripture.text}
                      </p>
                      
                      <div className="flex gap-4 pt-8">
                        <Button 
                          onClick={handleAskAI} 
                          disabled={aiLoading}
                          className="btn-gradient font-bold rounded-full px-6 gap-2"
                        >
                          <Sparkles className="h-4 w-4" /> 
                          {aiLoading ? "Consulting Scholar..." : "AI Annotation"}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="rounded-full px-6 gap-2 border-slate-200"
                        >
                          <Highlighter className="h-4 w-4" /> Highlight
                        </Button>
                        <Button 
                          variant="outline" 
                          className="rounded-full px-6 gap-2 border-slate-200"
                        >
                          <MessageSquare className="h-4 w-4" /> Comment
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center px-4">
               <span className="text-sm text-slate-400 font-medium">Reading Path: Chronological > Life of Christ</span>
               <Button variant="link" className="text-primary font-bold">View Path Progress <ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            {/* AI Explanation Card */}
            {explanation && (
              <Card className="shadow-lg border-primary/10 overflow-hidden animate-in fade-in slide-in-from-right-4">
                <CardHeader className="bg-primary/5 py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> AI Annotator
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white text-[10px]">VERIFIED</Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {explanation}
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Suggested Cross-References</p>
                      <ul className="space-y-2">
                        <li><button className="text-xs text-primary hover:underline font-semibold">Romans 5:8</button></li>
                        <li><button className="text-xs text-primary hover:underline font-semibold">1 John 4:9</button></li>
                        <li><button className="text-xs text-primary hover:underline font-semibold">Ephesians 2:8-9</button></li>
                      </ul>
                    </div>
                  </ScrollArea>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 rounded-lg font-bold border-slate-200 hover:bg-slate-50"
                    onClick={handleMastery}
                    disabled={currentStep === "Master"}
                  >
                    Mark as Mastered
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-md border-none">
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-slate-400" /> Study Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                 <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm font-medium transition-colors">Strong's Concordance</button>
                 <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm font-medium transition-colors">Interlinear Greek</button>
                 <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm font-medium transition-colors">Commentary: Barnes' Notes</button>
                 <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm font-medium transition-colors">Matthew Henry's Method</button>
              </CardContent>
            </Card>

            <Card className="shadow-md border-none bg-brand-gradient text-white">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2">Join a Study Cohort</h4>
                <p className="text-xs text-white/80 mb-4 leading-relaxed">Discuss this passage with our community of students and scholars.</p>
                <Button variant="secondary" size="sm" className="w-full font-bold bg-white text-primary hover:bg-white/90">Join Community Hub</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
