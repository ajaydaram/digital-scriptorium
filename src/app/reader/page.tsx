"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { GuidedAscent, type StepId } from "@/components/guided-ascent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getScripture, type Scripture } from "@/services/bibleService";
import { explainScripture, type AIAnnotatorExplanationOutput } from "@/ai/flows/ai-annotator-explanation";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Highlighter, 
  MessageSquare,
  Search,
  BookOpen,
  Info,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ReaderPage() {
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>("Read");
  const { toast } = useToast();

  useEffect(() => {
    loadScripture("John 3:16");
  }, []);

  const loadScripture = async (ref: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref);
      setScripture(data);
      setAiResult(null);
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
      setAiResult(result);
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
            <h2 className="text-3xl font-headline font-bold">{scripture?.reference.split(':')[0] || "Select Text"}</h2>
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
              <CardContent className="p-6 md:p-12">
                <div className="mb-8">
                  <GuidedAscent 
                    currentStep={currentStep} 
                    onStepClick={(stepId) => setCurrentStep(stepId)}
                  />
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
                      
                      <div className="flex flex-wrap gap-4 pt-8">
                        <Button 
                          onClick={handleAskAI} 
                          disabled={aiLoading}
                          className="btn-gradient font-bold rounded-full px-6 gap-2"
                        >
                          <Sparkles className="h-4 w-4" /> 
                          {aiLoading ? "Consulting Scholar..." : "Pedagogical Guide"}
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
            {aiResult && (
              <Card className="shadow-lg border-primary/10 overflow-hidden animate-in fade-in slide-in-from-right-4">
                <CardHeader className="bg-primary/5 py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> AI Annotator
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white text-[10px]">PEDAGOGICAL GUIDE</Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[450px] pr-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3" /> Exegesis
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {aiResult.explanation}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h4 className="text-xs font-bold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <History className="h-3 w-3" /> Grand Historical Narrative
                        </h4>
                        <p className="text-slate-600 text-sm italic leading-relaxed">
                          {aiResult.theologicalContext}
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Significant Cross-References</h4>
                        <div className="space-y-4">
                          {aiResult.suggestedReferences.map((ref, i) => (
                            <div key={i} className="group cursor-help">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-start gap-2">
                                      <div className="mt-1 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                      <div>
                                        <button className="text-sm text-primary hover:underline font-bold text-left">
                                          {ref.ref}
                                        </button>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">
                                          {ref.reason}
                                        </p>
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">Pedagogical significance explained</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      </div>
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

            {!aiResult && (
               <Card className="shadow-md border-dashed border-2 border-slate-200 bg-transparent">
                <CardContent className="p-8 text-center">
                  <Info className="h-8 w-8 text-slate-300 mx-auto mb-4" />
                  <p className="text-sm text-slate-400 font-medium">Use the AI Pedagogical Guide to unlock deeper insights and narrative context.</p>
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
          </div>
        </div>
      </main>
    </div>
  );
}
