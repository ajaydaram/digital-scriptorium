
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { GuidedAscent } from "@/components/guided-ascent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  History,
  Send,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserProgress } from "@/hooks/use-user-progress";
import { useAnnotations } from "@/hooks/use-annotations";
import { useUser } from "@/firebase";
import { format } from "date-fns";

export default function ReaderPage() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("John 3:16");
  const [currentRef, setCurrentRef] = useState("John 3:16");
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [newNote, setNewNote] = useState("");
  
  const { toast } = useToast();
  
  // Transform ref into a ID-safe string for Firestore
  const readingUnitId = currentRef.toLowerCase().replace(/[\s:]/g, "-");
  const { currentStep, updateProgress } = useUserProgress(readingUnitId);
  const { annotations, addAnnotation, isLoading: isNotesLoading } = useAnnotations(currentRef);

  useEffect(() => {
    loadScripture(currentRef);
  }, [currentRef]);

  const loadScripture = async (ref: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref);
      setScripture(data);
      setAiResult(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Reference "${ref}" not found in our current library.`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentRef(searchQuery.trim());
    }
  };

  const handleAskAI = async () => {
    if (!scripture) return;
    setAiLoading(true);
    try {
      const result = await explainScripture({ scripturePassage: `${scripture.reference}: ${scripture.text}` });
      setAiResult(result);
      updateProgress("Understand");
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

  const handleSaveNote = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your scholarly notes."
      });
      return;
    }
    if (!newNote.trim()) return;
    
    addAnnotation(newNote);
    setNewNote("");
    toast({
      title: "Note Saved",
      description: "Your scholarly insight has been added to your collection."
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Genesis 1:1, Romans 8:28..."
              className="pl-11 h-12 rounded-xl bg-white border-slate-200 focus:ring-primary/20 transition-all shadow-sm"
            />
          </form>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white font-bold px-3 py-1">KJV</Badge>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon" className="rounded-xl"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl bg-white">
              <div className="bg-brand-gradient h-2 w-full" />
              <CardContent className="p-6 md:p-12">
                <div className="mb-12">
                  <GuidedAscent 
                    currentStep={currentStep} 
                    onStepClick={updateProgress}
                  />
                </div>

                <div className="prose prose-slate lg:prose-xl max-w-none min-h-[300px]">
                  {loading ? (
                    <div className="space-y-6 animate-pulse pt-4">
                      <div className="h-8 bg-slate-100 rounded-full w-48" />
                      <div className="space-y-3">
                        <div className="h-6 bg-slate-50 rounded w-full" />
                        <div className="h-6 bg-slate-50 rounded w-5/6" />
                        <div className="h-6 bg-slate-50 rounded w-4/6" />
                      </div>
                    </div>
                  ) : scripture ? (
                    <div className="space-y-8 animate-in fade-in duration-700">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                          ACTIVE PASSAGE
                        </Badge>
                        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">{scripture.reference}</h3>
                      </div>
                      <p className="font-serif leading-relaxed text-slate-800 text-3xl selection:bg-accent/20">
                        {scripture.text}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 pt-12 border-t border-slate-50">
                        <Button 
                          onClick={handleAskAI} 
                          disabled={aiLoading}
                          className="btn-gradient font-bold rounded-xl px-8 py-6 h-auto gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                          {aiLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Sparkles className="h-5 w-5" />
                          )}
                          Consult AI Pedagogical Guide
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {/* Note Entry Area */}
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 py-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-600">
                  <MessageSquare className="h-4 w-4" /> Add Scholarly Annotation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Textarea 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record your cross-references, historical insights, or theological reflections..."
                  className="min-h-[120px] rounded-2xl bg-white border-slate-100 focus:ring-primary/20"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveNote}
                    disabled={!newNote.trim()}
                    className="btn-gradient rounded-xl font-bold px-6"
                  >
                    Save to Journal <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* AI Result */}
            {aiResult && (
              <Card className="shadow-2xl border-none rounded-3xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                <CardHeader className="bg-primary/5 py-4">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <BookOpen className="h-3 w-3" /> Exegetical Summary
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {aiResult.explanation}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <h4 className="text-[10px] font-bold text-primary mb-3 uppercase tracking-widest flex items-center gap-2">
                          <History className="h-3 w-3" /> Historical Narrative
                        </h4>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                          {aiResult.theologicalContext}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cross-References</h4>
                        {aiResult.suggestedReferences.map((ref, i) => (
                          <div key={i} className="group p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <button 
                              onClick={() => {
                                setCurrentRef(ref.ref);
                                setSearchQuery(ref.ref);
                              }}
                              className="text-sm text-primary font-bold hover:underline block mb-1"
                            >
                              {ref.ref}
                            </button>
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {ref.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* User Annotations Feed */}
            <Card className="shadow-xl border-none rounded-3xl overflow-hidden bg-white">
              <CardHeader className="py-4 border-b border-slate-50">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <History className="h-4 w-4 text-accent" /> Your Annotations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px]">
                  {isNotesLoading ? (
                    <div className="p-8 text-center text-slate-400 text-xs italic">Syncing with Scriptorium...</div>
                  ) : annotations && annotations.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {annotations.map((note) => (
                        <div key={note.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              {note.createdAt?.toDate ? format(note.createdAt.toDate(), 'MMM d, p') : 'Just now'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center space-y-3">
                      <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        No scholarly notes yet for this passage. Start recording your insights below.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
