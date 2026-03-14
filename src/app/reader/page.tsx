"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GuidedAscentStepper } from "@/components/guided-ascent-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { BibleVersionSwitcher } from "@/components/bible-version-switcher";
import { getPlanDay, type PathId } from "@/lib/reading-plans";
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { saveAnnotation, getAnnotationsQuery } from "@/services/annotationService";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { explainScripture, type AIAnnotatorExplanationOutput } from "@/ai/flows/ai-annotator-explanation";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Bookmark, 
  Share2, 
  Search, 
  Loader2,
  Sun,
  Moon,
  MessageSquare,
  AlertCircle,
  Plus,
  LogIn,
  History,
  Link2,
  Library,
  PenTool,
  Users,
  Compass,
  TableProperties,
  ArrowRight,
  ListChecks,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ReaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const pathParam = searchParams.get('path') as PathId | null;
  const dayParam = parseInt(searchParams.get('day') || "0");
  const initialRef = searchParams.get('reference') || "John 3:16";

  const { user } = useUser();
  const auth = useAuth();
  const { firestore } = useFirestore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [error, setError] = useState<string | null>(null);
  const [scribeReflection, setScribeReflection] = useState("");
  
  // AI Flow State
  const [aiAnalysis, setAiAnalysis] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const annotationsQuery = useMemoFirebase(() => {
    if (!firestore || !currentRef) return null;
    return getAnnotationsQuery(firestore, currentRef);
  }, [firestore, currentRef]);

  const { data: remoteAnnotations, isLoading: isAnnotationsLoading } = useCollection(annotationsQuery);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState("");

  const planDay = pathParam && dayParam > 0 ? getPlanDay(pathParam, dayParam) : null;

  useEffect(() => {
    if (pathParam && dayParam > 0) {
      const dayData = getPlanDay(pathParam, dayParam);
      if (dayData) {
        setCurrentRef(dayData.reference);
        setSearchQuery(dayData.reference);
      }
    } else if (!searchQuery) {
      setSearchQuery(initialRef);
    }
  }, [pathParam, dayParam, initialRef]);

  useEffect(() => {
    if (currentRef) {
      loadScripture(currentRef, version);
      setScribeReflection(""); // Reset reflection on passage change
      setAiAnalysis(null); // Reset AI analysis
    }
  }, [currentRef, version]);

  const loadScripture = async (ref: string, v: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
    } catch (error: any) {
      setError(error.message || "Could not retrieve this passage. Please try a different reference.");
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

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Error",
        description: error.message,
      });
    }
  };

  const handleAddInsight = () => {
    if (!user) {
      handleSignIn();
      return;
    }

    if (!newComment.trim()) return;
    
    saveAnnotation(firestore, user, currentRef, "", newComment);

    setNewComment("");
    setShowAddForm(false);
    toast({
      title: "Insight Shared",
      description: "Your note has been added to the living commentary.",
    });
  };

  const handleAiAnalysis = async () => {
    if (!scripture) return;
    setIsAiLoading(true);
    try {
      const result = await explainScripture({ scripturePassage: scripture.text });
      setAiAnalysis(result);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "The AI guide is currently offline. Please try again later.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 selection:bg-primary/20",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Path-Specific Header */}
        {pathParam && (
          <div className={cn(
            "mb-8 p-6 rounded-2xl border flex items-center gap-6 transition-all animate-in fade-in slide-in-from-top-4",
            pathParam === 'chronological' ? "bg-blue-50/50 border-blue-100 text-blue-700" : 
            pathParam === 'thematic' ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" :
            "bg-purple-50/50 border-purple-100 text-purple-700"
          )}>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              {pathParam === 'chronological' ? <History className="h-6 w-6" /> : 
               pathParam === 'thematic' ? <Link2 className="h-6 w-6" /> :
               <Library className="h-6 w-6" />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Scribal Strategy Active: {pathParam.toUpperCase()}</p>
              <h3 className="text-base font-bold">
                {pathParam === 'chronological' ? "Historical Contextualization: Follow the sequence of the Grand Narrative." : 
                 pathParam === 'thematic' ? "Canonical Reading: Trace the 'Golden Threads' across the canon." :
                 "Genre Awareness: Adjusting lineation for literary form."}
              </h3>
            </div>
            {planDay && (
              <Badge variant="outline" className="bg-white/50 border-none font-bold text-sm px-4 py-1.5">
                Day {planDay.day}: {planDay.title}
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-headline font-bold tracking-tight">Scriptorium Reader</h1>
              <Button 
                variant="ghost" size="icon" 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className="rounded-full hover:bg-primary/10 h-11 w-11"
              >
                {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 lg:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Reference e.g. Romans 8:28"
                  className={cn(
                    "pl-12 h-12 rounded-xl text-base transition-all shadow-sm border-slate-200 focus:ring-primary/20",
                    isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white"
                  )}
                />
              </form>
              <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-12 w-12 shadow-sm"><Bookmark className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-12 w-12 shadow-sm"><Share2 className="h-5 w-5" /></Button>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            <Card className={cn(
              "border-none shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[700px] flex flex-col",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-2 w-full" />
              
              <div className="px-10 md:px-20 pt-14">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-10 md:p-24 flex-1 pt-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 opacity-30">
                    <Loader2 className="h-12 w-12 animate-spin mb-6 text-primary" />
                    <p className="text-base font-bold uppercase tracking-widest">Consulting the Scriptorium...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center max-w-md mx-auto">
                    <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-8">
                      <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Retrieval Error</h3>
                    <p className="text-base text-slate-500 mb-8">{error}</p>
                    <Button variant="outline" onClick={() => loadScripture(currentRef, version)} className="rounded-xl h-12 px-8">Try Again</Button>
                  </div>
                ) : scripture ? (
                  <article className="max-w-4xl mx-auto space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <header className="text-center space-y-6">
                      {planDay?.audience && (
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 mb-4">
                          <Users className="h-5 w-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">Audience: {planDay.audience}</span>
                        </div>
                      )}
                      <h2 className={cn("text-6xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h2>
                    </header>
                    
                    <div className={cn(
                      "bible-reader-text font-serif transition-colors duration-500",
                      isDark ? "text-slate-300" : "text-slate-800",
                      pathParam === 'genre' && "poetic-lineation"
                    )}>
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    </div>

                    {planDay?.mainTruth && (
                      <div className="p-10 rounded-3xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-6">
                        <div className="flex items-center justify-center gap-3 text-slate-400">
                          <Sparkles className="h-5 w-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">The One Main Truth</span>
                        </div>
                        <p className="text-2xl font-headline font-bold text-slate-900 leading-relaxed italic text-center">
                          "{planDay.mainTruth}"
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-24 pt-12 border-t border-slate-100/10">
                      <div className="flex items-center gap-3 mb-8">
                        <PenTool className="h-5 w-5 text-primary" />
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Scribe's Reflection</span>
                      </div>
                      <div className="space-y-6">
                        {planDay?.reflectionQuestion && (
                          <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-sm font-bold text-primary italic leading-relaxed">Scribe's Illumination: {planDay.reflectionQuestion}</p>
                          </div>
                        )}
                        <Textarea 
                          placeholder={planDay?.reflectionQuestion ? "Answer the Illumination question or reflect on today's strategy..." : "What did you learn about how this text works today? Reflect on the strategy and the narrative..."}
                          className={cn(
                            "min-h-[160px] rounded-2xl border-dashed transition-all text-base p-6",
                            isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-50/50 border-slate-200"
                          )}
                          value={scribeReflection}
                          onChange={(e) => setScribeReflection(e.target.value)}
                        />
                      </div>
                      <p className="mt-4 text-xs text-slate-400 font-medium italic">Metacognition: Teaching yourself how to learn scripture.</p>
                    </div>

                    {pathParam && (
                      <div className="pt-16 flex items-center justify-center gap-8">
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            if (dayParam > 1) router.push(`/reader?path=${pathParam}&day=${dayParam - 1}`);
                          }} 
                          disabled={dayParam <= 1}
                          className="rounded-xl gap-3 font-bold text-sm uppercase tracking-widest h-12"
                        >
                          <ChevronLeft className="h-5 w-5" /> Previous Day
                        </Button>
                        <Separator orientation="vertical" className="h-12" />
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            router.push(`/reader?path=${pathParam}&day=${dayParam + 1}`);
                          }}
                          className="rounded-xl gap-3 font-bold text-sm uppercase tracking-widest h-12"
                        >
                          Next Day <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </article>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-8">
            {/* Thematic Ledger - Specific for Thematic Path */}
            {planDay?.thematicLedger && (
              <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden bg-white border border-slate-100")}>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                    <ListChecks className="h-5 w-5" /> Covenant Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-5">
                  <p className="text-xs text-slate-400 italic">Tracing the Golden Thread of Redemption.</p>
                  <div className="space-y-3">
                    {planDay.thematicLedger.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold text-slate-500">{item.label}</span>
                        <span className="text-xs font-bold text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-primary italic leading-relaxed">
                    Covenants are the relational 'glue' of the 66 books.
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Historical Snapshot - For Chronological Path */}
            {planDay?.historicalSnapshot && (
              <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden bg-slate-900 text-white")}>
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                    <History className="h-5 w-5" /> Historical Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-5">
                  <div className="p-5 bg-white/5 rounded-xl border border-white/10 space-y-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{planDay.historicalSnapshot.ref}</p>
                    <p className="text-base font-serif italic text-slate-300 leading-relaxed">
                      "{planDay.historicalSnapshot.text}"
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    Contextualizing the prayer within the pressure of the moment.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Symbolic Mapping Ledger */}
            {planDay?.symbolicMapping && (
              <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100", isDark ? "bg-slate-950/20" : "")}>
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                    <TableProperties className="h-5 w-5" /> Parallel Ledger
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-5">
                  <p className="text-xs text-slate-400 leading-relaxed italic mb-6">Translating physical symbols to spiritual realities.</p>
                  <div className="space-y-5">
                    {planDay.symbolicMapping.map((map, i) => (
                      <div key={i} className="space-y-2 p-4 rounded-xl bg-white/50 border border-white dark:bg-white/5 dark:border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{map.symbol}</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold text-primary">{map.reality}</span>
                        </div>
                        <p className="text-xs text-slate-500 italic leading-snug">{map.insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cultural Insights - Marginalia */}
            {planDay?.culturalInsights && (
               <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden bg-amber-50 border border-amber-100", isDark ? "bg-amber-950/20" : "")}>
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-amber-600">
                    <Compass className="h-5 w-5" /> Scribe's Marginalia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-5">
                  {planDay.culturalInsights.map((insight, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-xs font-bold text-amber-800">{insight.title}</p>
                      <p className="text-xs text-amber-700/80 leading-relaxed italic">{insight.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Scribal Strategy Panel */}
            {planDay?.scribalStrategy && (
              <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden bg-purple-50 border border-purple-100", isDark ? "bg-purple-950/20" : "")}>
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-purple-600">
                    <PenTool className="h-5 w-5" /> {planDay.scribalStrategy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                  <div className="space-y-4">
                    {planDay.scribalStrategy.instructions.map((step, i) => (
                      <div key={i} className="space-y-1.5">
                        <p className="text-xs font-bold text-purple-800">{i + 1}. {step.split(':')[0]}</p>
                        <p className="text-xs text-purple-600/80 leading-relaxed">{step.includes(':') ? step.split(':')[1] : step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Analysis Result */}
            {aiAnalysis && (
              <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-primary/5 border border-primary/10 animate-in slide-in-from-right duration-500">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" /> Scholarly Deep-Dive
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400 mb-2">Explanation</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{aiAnalysis.explanation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400 mb-2">Grand Narrative Context</p>
                      <p className="text-sm text-slate-700 leading-relaxed italic">{aiAnalysis.theologicalContext}</p>
                    </div>
                    {aiAnalysis.suggestedReferences.length > 0 && (
                      <div className="pt-3">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-3">Cross References</p>
                        <div className="space-y-3">
                          {aiAnalysis.suggestedReferences.map((ref, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                              <p className="text-xs font-bold text-primary">{ref.ref}</p>
                              <p className="text-xs text-slate-500 italic mt-1 leading-snug">{ref.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden flex flex-col min-h-[500px]", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="p-8 pb-6 border-b border-slate-100/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" /> Community Feed
                    </CardTitle>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{currentRef}</p>
                  </div>
                  {user && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-full bg-primary/5 text-primary"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      <Plus className={cn("h-5 w-5 transition-transform", showAddForm && "rotate-45")} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 flex flex-col">
                {showAddForm && user && (
                  <div className="p-8 bg-primary/5 border-b border-primary/10 animate-in slide-in-from-top duration-300">
                    <Textarea 
                      placeholder="Share a scholarly insight..."
                      className="min-h-[120px] mb-4 text-base rounded-xl border-primary/20 bg-white p-4"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        className="btn-gradient rounded-lg text-xs font-bold uppercase tracking-widest px-6 h-10" 
                        onClick={handleAddInsight}
                        disabled={!newComment.trim()}
                      >
                        Publish Insight
                      </Button>
                    </div>
                  </div>
                )}

                <ScrollArea className="flex-1">
                  {!user && (
                    <div className="p-12 text-center space-y-6">
                      <LogIn className="h-10 w-10 mx-auto text-slate-300" />
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Sign in to share your scholarly insights
                      </p>
                      <Button variant="outline" size="sm" onClick={handleSignIn} className="rounded-xl text-xs font-bold uppercase tracking-widest h-10 px-6">
                        Sign In with Google
                      </Button>
                    </div>
                  )}

                  {isAnnotationsLoading ? (
                    <div className="p-16 flex flex-col items-center opacity-20">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <span className="text-xs font-bold uppercase">Loading Feed...</span>
                    </div>
                  ) : remoteAnnotations && remoteAnnotations.length > 0 ? (
                    <div className="divide-y divide-slate-100/10">
                      {remoteAnnotations.map((ann) => (
                        <div key={ann.id} className="p-8 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-10 w-10 border border-slate-200">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {ann.userDisplayName?.charAt(0) || "S"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate">{ann.userDisplayName}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                {ann.createdAt?.seconds 
                                  ? new Date(ann.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                            {ann.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-16 text-center opacity-40">
                      <MessageSquare className="h-10 w-10 mx-auto mb-6" />
                      <p className="text-sm font-bold uppercase tracking-widest">No insights yet for this passage.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className={cn("border-none shadow-xl rounded-[2rem] bg-brand-gradient/5 border border-primary/10", isDark ? "bg-slate-900/40" : "")}>
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Scholarly Guide</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate a deep-dive analysis of <strong>{currentRef}</strong>.
                </p>
                <Button 
                  className="w-full btn-gradient font-bold h-12 text-xs rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20"
                  onClick={handleAiAnalysis}
                  disabled={isAiLoading || !scripture}
                >
                  {isAiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Analyze Context"}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <style jsx global>{`
        .bible-reader-text {
          font-size: 1.5rem;
          line-height: 2.2;
          max-width: 80ch;
          margin-left: auto;
          margin-right: auto;
        }
        .bible-reader-text sup {
          font-size: 0.85rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 1rem;
          vertical-align: super;
          font-family: 'Space Grotesk', sans-serif;
        }
        .bible-reader-text p {
          margin-bottom: 2.5rem;
        }
        .poetic-lineation p {
          padding-left: 2.5rem;
          text-indent: -2.5rem;
          margin-bottom: 1.5rem;
          line-height: 2;
        }
      `}</style>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
