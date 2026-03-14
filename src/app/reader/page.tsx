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
      setScribeReflection(""); 
      setAiAnalysis(null); 
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
        {pathParam && (
          <div className={cn(
            "mb-8 p-10 rounded-2xl border flex items-center gap-8 transition-all animate-in fade-in slide-in-from-top-4",
            pathParam === 'chronological' ? "bg-blue-50/50 border-blue-100 text-blue-700" : 
            pathParam === 'thematic' ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" :
            "bg-purple-50/50 border-purple-100 text-purple-700"
          )}>
            <div className="p-5 bg-white rounded-xl shadow-sm">
              {pathParam === 'chronological' ? <History className="h-10 w-10" /> : 
               pathParam === 'thematic' ? <Link2 className="h-10 w-10" /> :
               <Library className="h-10 w-10" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">Scribal Strategy Active: {pathParam.toUpperCase()}</p>
              <h3 className="text-2xl font-bold">
                {pathParam === 'chronological' ? "Historical Contextualization: Follow the sequence of the Grand Narrative." : 
                 pathParam === 'thematic' ? "Canonical Reading: Trace the 'Golden Threads' across the canon." :
                 "Genre Awareness: Adjusting lineation for literary form."}
              </h3>
            </div>
            {planDay && (
              <Badge variant="outline" className="bg-white/50 border-none font-bold text-xl px-6 py-3">
                Day {planDay.day}: {planDay.title}
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-6">
              <h1 className="text-6xl font-headline font-bold tracking-tight">Scriptorium Reader</h1>
              <Button 
                variant="ghost" size="icon" 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className="rounded-full hover:bg-primary/10 h-14 w-14"
              >
                {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 lg:w-[450px] group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Reference e.g. Romans 8:28"
                  className={cn(
                    "pl-14 h-16 rounded-xl text-xl transition-all shadow-sm border-slate-200 focus:ring-primary/20",
                    isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white"
                  )}
                />
              </form>
              <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-16 w-16 shadow-sm"><Bookmark className="h-7 w-7" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-16 w-16 shadow-sm"><Share2 className="h-7 w-7" /></Button>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-16">
            <Card className={cn(
              "border-none shadow-2xl rounded-[3rem] overflow-hidden min-h-[800px] flex flex-col",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-3 w-full" />
              
              <div className="px-12 md:px-24 pt-20">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-12 md:p-28 flex-1 pt-12">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full py-32 opacity-30">
                    <Loader2 className="h-20 w-20 animate-spin mb-8 text-primary" />
                    <p className="text-2xl font-bold uppercase tracking-widest">Consulting the Scriptorium...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full py-32 text-center max-w-xl mx-auto">
                    <div className="h-28 w-28 bg-red-50 rounded-full flex items-center justify-center mb-10">
                      <AlertCircle className="h-14 w-14 text-red-500" />
                    </div>
                    <h3 className="text-4xl font-bold mb-6">Retrieval Error</h3>
                    <p className="text-xl text-slate-500 mb-12">{error}</p>
                    <Button variant="outline" onClick={() => loadScripture(currentRef, version)} className="rounded-2xl h-16 px-12 text-lg font-bold">Try Again</Button>
                  </div>
                ) : scripture ? (
                  <article className="max-w-4xl mx-auto space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <header className="text-center space-y-10">
                      {planDay?.audience && (
                        <div className="inline-flex items-center gap-5 px-8 py-4 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 mb-6">
                          <Users className="h-8 w-8" />
                          <span className="text-xl font-bold uppercase tracking-widest">Audience: {planDay.audience}</span>
                        </div>
                      )}
                      <h2 className={cn("text-8xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
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
                      <div className="p-14 rounded-[3rem] bg-slate-50 border border-dashed border-slate-200 text-center space-y-10">
                        <div className="flex items-center justify-center gap-5 text-slate-400">
                          <Sparkles className="h-8 w-8" />
                          <span className="text-lg font-bold uppercase tracking-widest">The One Main Truth</span>
                        </div>
                        <p className="text-4xl font-headline font-bold text-slate-900 leading-relaxed italic text-center">
                          "{planDay.mainTruth}"
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-32 pt-20 border-t border-slate-100/10">
                      <div className="flex items-center gap-5 mb-12">
                        <PenTool className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold uppercase tracking-widest text-slate-400">Scribe's Reflection</span>
                      </div>
                      <div className="space-y-10">
                        {planDay?.reflectionQuestion && (
                          <div className="p-10 bg-primary/5 rounded-3xl border border-primary/10">
                            <p className="text-2xl font-bold text-primary italic leading-relaxed">Scribe's Illumination: {planDay.reflectionQuestion}</p>
                          </div>
                        )}
                        <Textarea 
                          placeholder={planDay?.reflectionQuestion ? "Answer the Illumination question..." : "What did you learn today?"}
                          className={cn(
                            "min-h-[250px] rounded-[2rem] border-dashed transition-all text-xl p-10",
                            isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-50/50 border-slate-200"
                          )}
                          value={scribeReflection}
                          onChange={(e) => setScribeReflection(e.target.value)}
                        />
                      </div>
                      <p className="mt-8 text-lg text-slate-400 font-medium italic">Metacognition: Teaching yourself how to learn scripture.</p>
                    </div>

                    {pathParam && (
                      <div className="pt-24 flex items-center justify-center gap-12">
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            if (dayParam > 1) router.push(`/reader?path=${pathParam}&day=${dayParam - 1}`);
                          }} 
                          disabled={dayParam <= 1}
                          className="rounded-2xl gap-5 font-bold text-xl uppercase tracking-widest h-16 px-10"
                        >
                          <ChevronLeft className="h-8 w-8" /> Previous Day
                        </Button>
                        <Separator orientation="vertical" className="h-16" />
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            router.push(`/reader?path=${pathParam}&day=${dayParam + 1}`);
                          }}
                          className="rounded-2xl gap-5 font-bold text-xl uppercase tracking-widest h-16 px-10"
                        >
                          Next Day <ChevronRight className="h-8 w-8" />
                        </Button>
                      </div>
                    )}
                  </article>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-12">
            {planDay?.thematicLedger && (
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
                <CardHeader className="p-10 pb-6">
                  <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-4 text-primary">
                    <ListChecks className="h-8 w-8" /> Covenant Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-8">
                  <p className="text-lg text-slate-400 italic">Tracing the Golden Thread of Redemption.</p>
                  <div className="space-y-5">
                    {planDay.thematicLedger.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-lg font-bold text-slate-500">{item.label}</span>
                        <span className="text-lg font-bold text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {planDay?.culturalInsights && (
               <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-amber-50 border border-amber-100">
                <CardHeader className="p-10 pb-6">
                   <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-4 text-amber-600">
                    <Compass className="h-8 w-8" /> Scribe's Marginalia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                  {planDay.culturalInsights.map((insight, i) => (
                    <div key={i} className="space-y-4">
                      <p className="text-2xl font-bold text-amber-800">{insight.title}</p>
                      <p className="text-lg text-amber-700/90 leading-relaxed italic">{insight.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {planDay?.scribalStrategy && (
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-purple-50 border border-purple-100">
                <CardHeader className="p-10 pb-6">
                   <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-4 text-purple-600">
                    <PenTool className="h-8 w-8" /> Scribal Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-8">
                  <div className="space-y-6">
                    {planDay.scribalStrategy.instructions.map((step, i) => (
                      <div key={i} className="space-y-3">
                        <p className="text-lg font-bold text-purple-800">{i + 1}. {step.split(':')[0]}</p>
                        <p className="text-lg text-purple-600/90 leading-relaxed">{step.includes(':') ? step.split(':')[1] : step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className={cn("border-none shadow-xl rounded-[2.5rem] overflow-hidden flex flex-col min-h-[600px]", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="p-10 pb-8 border-b border-slate-100/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-4">
                      <MessageSquare className="h-8 w-8 text-primary" /> Community Feed
                    </CardTitle>
                  </div>
                  {user && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-14 w-14 rounded-full bg-primary/5 text-primary"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      <Plus className={cn("h-8 w-8 transition-transform", showAddForm && "rotate-45")} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 flex flex-col">
                {showAddForm && user && (
                  <div className="p-10 bg-primary/5 border-b border-primary/10 animate-in slide-in-from-top duration-300">
                    <Textarea 
                      placeholder="Share a scholarly insight..."
                      className="min-h-[160px] mb-8 text-xl rounded-2xl border-primary/20 bg-white p-8"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button 
                        size="lg" 
                        className="btn-gradient rounded-xl text-xl font-bold uppercase tracking-widest px-10 h-14" 
                        onClick={handleAddInsight}
                        disabled={!newComment.trim()}
                      >
                        Publish Insight
                      </Button>
                    </div>
                  </div>
                )}

                <ScrollArea className="flex-1">
                  {isAnnotationsLoading ? (
                    <div className="p-24 flex flex-col items-center opacity-20">
                      <Loader2 className="h-12 w-12 animate-spin mb-8" />
                      <span className="text-lg font-bold uppercase tracking-widest">Loading Feed...</span>
                    </div>
                  ) : remoteAnnotations && remoteAnnotations.length > 0 ? (
                    <div className="divide-y divide-slate-100/10">
                      {remoteAnnotations.map((ann) => (
                        <div key={ann.id} className="p-12 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-6 mb-8">
                            <Avatar className="h-14 w-14 border border-slate-200">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                {ann.userDisplayName?.charAt(0) || "S"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-2xl font-bold truncate">{ann.userDisplayName}</p>
                              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">
                                {ann.createdAt?.seconds 
                                  ? new Date(ann.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                            {ann.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-24 text-center opacity-40">
                      <MessageSquare className="h-14 w-14 mx-auto mb-10" />
                      <p className="text-xl font-bold uppercase tracking-widest">No insights yet for this passage.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <style jsx global>{`
        .bible-reader-text {
          font-size: 2.25rem;
          line-height: 2.6;
          max-width: 80ch;
          margin-left: auto;
          margin-right: auto;
        }
        .bible-reader-text sup {
          font-size: 1.25rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 1.5rem;
          vertical-align: super;
          font-family: 'Space Grotesk', sans-serif;
        }
        .bible-reader-text p {
          margin-bottom: 3.5rem;
        }
        .poetic-lineation p {
          padding-left: 4rem;
          text-indent: -4rem;
          margin-bottom: 2.5rem;
          line-height: 2.4;
        }
      `}</style>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}