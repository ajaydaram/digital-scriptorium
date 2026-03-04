"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GuidedAscent } from "@/components/guided-ascent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { explainScripture, type AIAnnotatorExplanationOutput } from "@/ai/flows/ai-annotator-explanation";
import { studyWord, type WordStudyOutput } from "@/ai/flows/word-study";
import { BibleVersionSwitcher } from "@/components/bible-version-switcher";
import { 
  Sparkles, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  MessageSquare,
  Search,
  History,
  Send,
  Loader2,
  Languages,
  Zap,
  List,
  Sun,
  Moon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProgress } from "@/hooks/use-user-progress";
import { useAnnotations } from "@/hooks/use-annotations";
import { useUser, useFirestore } from "@/firebase";
import { format } from "date-fns";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { cn } from "@/lib/utils";

function ReaderContent() {
  const { user } = useUser();
  const { firestore } = useFirestore();
  const searchParams = useSearchParams();
  
  const initialRef = searchParams.get('reference') || "John 3:16";
  const initialPath = searchParams.get('path') || null;

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [wordStudyLoading, setWordStudyLoading] = useState(false);
  const [wordStudyResult, setWordStudyResult] = useState<WordStudyOutput | null>(null);
  const [selectedWord, setSelectedWord] = useState("");
  const [newNote, setNewNote] = useState("");
  
  const { toast } = useToast();
  const readingUnitId = currentRef.toLowerCase().replace(/[\s:]/g, "-");
  const { currentStep, updateProgress, progress, updatePath } = useUserProgress(readingUnitId);
  const { annotations, addAnnotation, isLoading: isNotesLoading } = useAnnotations(currentRef);

  // Initialize path if provided in URL
  useEffect(() => {
    if (initialPath) {
      updatePath(initialPath);
    }
  }, [initialPath]);

  // Handle reference change from URL
  useEffect(() => {
    const ref = searchParams.get('reference');
    if (ref && ref !== currentRef) {
      setCurrentRef(ref);
      setSearchQuery(ref);
    }
  }, [searchParams]);

  useEffect(() => {
    loadScripture(currentRef, version);
  }, [currentRef, version]);

  const loadScripture = async (ref: string, v: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
      setAiResult(null);
      setWordStudyResult(null);
      setSelectedWord("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Passage Not Found",
        description: `API.Bible could not find "${ref}". Try a different reference.`
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

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  const isDark = theme === "dark";

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

  const handleWordStudy = async () => {
    if (!selectedWord || !scripture) return;
    setWordStudyLoading(true);
    try {
      const result = await studyWord({ word: selectedWord, context: scripture.text });
      setWordStudyResult(result);
      
      if (user && firestore) {
        const colRef = collection(firestore, 'users', user.uid, 'word_studies');
        addDocumentNonBlocking(colRef, {
          userId: user.uid,
          word: selectedWord,
          originalWord: result.originalWord,
          transliteration: result.transliteration,
          definition: result.definition,
          theologicalSignificance: result.pedagogicalInsight,
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Word Study Error",
        description: "Could not perform original language study."
      });
    } finally {
      setWordStudyLoading(false);
    }
  };

  const handleSaveNote = () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please sign in to save your scholarly notes." });
      return;
    }
    if (!newNote.trim()) return;
    addAnnotation(newNote);
    setNewNote("");
    toast({ title: "Note Saved", description: "Your scholarly insight has been added to your collection." });
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             {(progress?.pathId || initialPath) && (
              <div className={cn(
                "flex items-center gap-3 border p-2 px-3 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500",
                isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100 shadow-sm"
              )}>
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <List className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Path</p>
                  <p className={cn("text-[11px] font-bold", isDark ? "text-slate-300" : "text-slate-700")}>
                    {((progress?.pathId || initialPath) as string).charAt(0).toUpperCase() + ((progress?.pathId || initialPath) as string).slice(1)}
                  </p>
                </div>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className={cn("rounded-full", isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-200 text-slate-600")}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. John 3:16, Romans 8:28..."
              className={cn(
                "pl-11 h-12 rounded-xl transition-all shadow-sm",
                isDark ? "bg-slate-900 border-slate-700 text-white focus:ring-blue-500/20" : "bg-white border-slate-200 focus:ring-primary/20"
              )}
            />
          </form>
          
          <div className="flex items-center gap-4">
            <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon" className="rounded-xl"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className={cn(
              "border-none shadow-xl overflow-hidden rounded-3xl transition-colors duration-300",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-2 w-full" />
              <CardContent className="p-6 md:p-12">
                <div className="mb-12">
                  <GuidedAscent currentStep={currentStep} onStepClick={updateProgress} />
                </div>

                <div className="prose lg:prose-xl max-w-none min-h-[300px]">
                  {loading ? (
                    <div className="space-y-6 animate-pulse pt-4">
                      <div className={cn("h-8 rounded-full w-48", isDark ? "bg-slate-800" : "bg-slate-100")} />
                      <div className="space-y-3">
                        <div className={cn("h-6 rounded w-full", isDark ? "bg-slate-800/50" : "bg-slate-50")} />
                        <div className={cn("h-6 rounded w-5/6", isDark ? "bg-slate-800/50" : "bg-slate-50")} />
                        <div className={cn("h-6 rounded w-4/6", isDark ? "bg-slate-800/50" : "bg-slate-50")} />
                      </div>
                    </div>
                  ) : scripture ? (
                    <div className="space-y-8 animate-in fade-in duration-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={cn("border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1", isDark ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary")}>
                            {scripture.translation_name || 'REAL TEXT'}
                          </Badge>
                          <h3 className={cn("text-sm font-bold uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>
                            {scripture.reference}
                          </h3>
                        </div>
                      </div>
                      <p className={cn(
                        "font-serif leading-relaxed text-3xl selection:bg-accent/20 first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left",
                        isDark ? "text-slate-200 first-letter:text-blue-500" : "text-slate-800 first-letter:text-primary"
                      )}>
                        {scripture.text}
                      </p>
                      
                      <div className={cn("flex flex-col sm:flex-row gap-4 pt-12 border-t", isDark ? "border-slate-800" : "border-slate-50")}>
                        <Button 
                          onClick={handleAskAI} 
                          disabled={aiLoading}
                          className="btn-gradient font-bold rounded-xl px-8 py-6 h-auto gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex-1"
                        >
                          {aiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                          Consult AI Guide
                        </Button>

                        <div className="flex gap-2 flex-1">
                          <Input 
                            placeholder="Study word..."
                            value={selectedWord}
                            onChange={(e) => setSelectedWord(e.target.value)}
                            className={cn(
                              "h-auto rounded-xl",
                              isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"
                            )}
                          />
                          <Button 
                            onClick={handleWordStudy}
                            disabled={wordStudyLoading || !selectedWord}
                            variant="outline"
                            className={cn(
                              "rounded-xl px-6 h-auto font-bold border-slate-200",
                              isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" : "hover:bg-slate-50"
                            )}
                          >
                            {wordStudyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {aiResult && (
              <Card className={cn(
                "shadow-2xl border-none rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500",
                isDark ? "bg-[#1E293B]" : "bg-white"
              )}>
                <CardHeader className={cn("py-4", isDark ? "bg-blue-500/5" : "bg-primary/5")}>
                  <CardTitle className={cn("text-base font-bold flex items-center gap-2", isDark ? "text-blue-400" : "text-primary")}>
                    <Sparkles className="h-4 w-4" /> AI Scholarly Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exegetical Summary</h4>
                        <p className={cn("text-sm leading-relaxed", isDark ? "text-slate-300" : "text-slate-700")}>
                          {aiResult.explanation}
                        </p>
                      </div>
                      <div className={cn("p-5 rounded-2xl border", isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-100")}>
                        <h4 className={cn("text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2 font-bold", isDark ? "text-blue-400" : "text-primary")}>
                          <History className="h-3 w-3" /> Historical Narrative
                        </h4>
                        <p className={cn("text-xs italic leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>
                          {aiResult.theologicalContext}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cross-References</h4>
                      {aiResult.suggestedReferences.map((ref, i) => (
                        <div key={i} className={cn(
                          "group p-4 rounded-xl border transition-all cursor-pointer",
                          isDark ? "bg-slate-900/30 border-slate-800 hover:bg-slate-800" : "border-slate-50 hover:bg-white hover:shadow-md"
                        )} onClick={() => {
                          setCurrentRef(ref.ref);
                          setSearchQuery(ref.ref);
                        }}>
                          <div className={cn("text-sm font-bold mb-1 flex items-center justify-between", isDark ? "text-blue-400" : "text-primary")}>
                            {ref.ref}
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className={cn("text-[11px] leading-snug", isDark ? "text-slate-500" : "text-slate-500")}>
                            {ref.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className={cn(
              "border-none shadow-lg rounded-3xl overflow-hidden",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <CardHeader className={cn("py-4", isDark ? "bg-slate-900/50" : "bg-slate-50/50")}>
                <CardTitle className={cn("text-sm font-bold flex items-center gap-2", isDark ? "text-slate-400" : "text-slate-600")}>
                  <MessageSquare className="h-4 w-4" /> Add Scholarly Annotation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Textarea 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record your cross-references, historical insights, or theological reflections..."
                  className={cn(
                    "min-h-[120px] rounded-2xl focus:ring-primary/20",
                    isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100"
                  )}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSaveNote} disabled={!newNote.trim()} className="btn-gradient rounded-xl font-bold px-6">
                    Save to Journal <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {wordStudyResult && (
              <Card className={cn(
                "shadow-2xl border-none rounded-3xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500",
                isDark ? "bg-[#1E293B]" : "bg-white"
              )}>
                <CardHeader className={cn("py-4 border-b", isDark ? "bg-purple-500/5 border-purple-500/10" : "bg-accent/5 border-accent/10")}>
                  <CardTitle className={cn("text-sm font-bold flex items-center gap-2", isDark ? "text-purple-400" : "text-accent")}>
                    <Languages className="h-4 w-4" /> Original Language Study
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className={cn("text-3xl font-headline font-bold", isDark ? "text-white" : "text-slate-900")}>
                          {wordStudyResult.originalWord}
                        </h2>
                        <p className={cn("text-sm font-bold uppercase tracking-widest", isDark ? "text-purple-400" : "text-accent")}>
                          {wordStudyResult.transliteration}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn("text-[10px] font-bold", isDark ? "border-purple-500/20 text-purple-400" : "border-accent/20 text-accent")}>
                        {wordStudyResult.language} • {wordStudyResult.strongsNumber}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lexical Definition</h4>
                      <p className={cn("text-sm leading-relaxed p-4 rounded-xl border", isDark ? "bg-slate-900/50 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700")}>
                        {wordStudyResult.definition}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className={cn("text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold", isDark ? "text-purple-400" : "text-accent")}>
                        <Zap className="h-3 w-3" /> Narrative Significance
                      </h4>
                      <p className={cn("text-xs italic leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>
                        {wordStudyResult.pedagogicalInsight}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className={cn(
              "shadow-xl border-none rounded-3xl overflow-hidden",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <CardHeader className={cn("py-4 border-b", isDark ? "border-slate-800" : "border-slate-50")}>
                <CardTitle className={cn("text-sm font-bold flex items-center gap-2", isDark ? "text-slate-400" : "text-slate-600")}>
                  <History className="h-4 w-4 text-accent" /> Your Annotations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px]">
                  {isNotesLoading ? (
                    <div className="p-8 text-center text-slate-400 text-xs italic">Syncing with Scriptorium...</div>
                  ) : annotations && annotations.length > 0 ? (
                    <div className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
                      {annotations.map((note) => (
                        <div key={note.id} className={cn("p-5 transition-colors", isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50/50")}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              {note.createdAt?.toDate ? format(note.createdAt.toDate(), 'MMM d, p') : 'Just now'}
                            </span>
                          </div>
                          <p className={cn("text-sm leading-relaxed font-medium", isDark ? "text-slate-300" : "text-slate-700")}>
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center space-y-3">
                      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mx-auto", isDark ? "bg-slate-800 text-slate-700" : "bg-slate-50 text-slate-300")}>
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">No scholarly notes for this passage.</p>
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

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
