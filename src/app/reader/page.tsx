
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
  History,
  Link2,
  Library,
  PenTool,
  Users,
  Compass,
  ListChecks,
  TableProperties,
  BookOpen,
  Send
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
      setError(error.message || "Could not retrieve this passage.");
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
      description: "Note added to the community feed.",
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
        title: "AI Analysis Offline",
        description: "The guide is currently resting.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      isDark ? "bg-[#0B0F1A] text-slate-200" : "bg-[#F8FAFC] text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-6 py-10 max-w-[1400px]">
        {pathParam && (
          <div className={cn(
            "mb-10 p-8 rounded-3xl border shadow-sm flex items-center gap-8 animate-in fade-in slide-in-from-top-4",
            pathParam === 'chronological' ? "bg-blue-50/40 border-blue-100 text-blue-900" : 
            pathParam === 'thematic' ? "bg-emerald-50/40 border-emerald-100 text-emerald-900" :
            "bg-purple-50/40 border-purple-100 text-purple-900"
          )}>
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              {pathParam === 'chronological' ? <History className="h-8 w-8 text-blue-600" /> : 
               pathParam === 'thematic' ? <Link2 className="h-8 w-8 text-emerald-600" /> :
               <Library className="h-8 w-8 text-purple-600" />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Path: {pathParam}</p>
              <h3 className="text-xl font-bold font-headline">
                {pathParam === 'chronological' ? "Historical Contextualization: Sequence of the Grand Narrative." : 
                 pathParam === 'thematic' ? "Canonical Reading: Tracing 'Golden Threads' through Scripture." :
                 "Genre Awareness: Adapting lineation for literary form."}
              </h3>
            </div>
            {planDay && (
              <Badge variant="outline" className="bg-white border-slate-200 font-bold text-lg px-6 py-2.5 rounded-full">
                Day {planDay.day}: {planDay.title}
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-slate-900">Scriptorium</h1>
            <Button 
              variant="outline" size="icon" 
              onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
              className="rounded-full h-11 w-11 hover:bg-slate-100 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 lg:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., Genesis 1:1"
                  className={cn(
                    "pl-11 h-12 rounded-xl text-base shadow-sm border-slate-200 transition-all focus:ring-2 focus:ring-primary/10",
                    isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white"
                  )}
                />
              </form>
              <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 hover:bg-slate-50"><Bookmark className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 hover:bg-slate-50"><Share2 className="h-5 w-5" /></Button>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <Card className={cn(
              "border-none shadow-xl rounded-[2.5rem] overflow-hidden flex flex-col min-h-[800px]",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-1.5 w-full" />
              
              <div className="px-10 pt-16">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-10 md:p-20 flex-1 pt-10">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full py-40 opacity-40">
                    <Loader2 className="h-12 w-12 animate-spin mb-6 text-primary" />
                    <p className="text-sm font-bold uppercase tracking-[0.3em]">Consulting the Scriptorium...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full py-32 text-center space-y-8">
                    <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Passage Not Found</h3>
                      <p className="text-slate-500 max-w-sm">{error}</p>
                    </div>
                    <Button variant="outline" onClick={() => loadScripture(currentRef, version)} className="rounded-full px-8 h-12 font-bold">Retry Retrieval</Button>
                  </div>
                ) : scripture ? (
                  <article className="max-w-3xl mx-auto space-y-16 animate-in fade-in duration-700">
                    <header className="text-center space-y-6">
                      {planDay?.audience && (
                        <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border-none">
                          Audience: {planDay.audience}
                        </Badge>
                      )}
                      <h2 className={cn("text-5xl md:text-7xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h2>
                    </header>
                    
                    <div className={cn(
                      "bible-reader-text leading-relaxed font-serif transition-all duration-300",
                      isDark ? "text-slate-300" : "text-slate-800",
                      pathParam === 'genre' && "poetic-lineation"
                    )}>
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    </div>

                    {planDay?.mainTruth && (
                      <div className="p-10 rounded-3xl bg-slate-50/50 border border-slate-100 text-center space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">The Core Truth</span>
                        <p className="text-2xl font-headline font-bold text-slate-900 leading-snug italic">
                          "{planDay.mainTruth}"
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-24 pt-16 border-t border-slate-100">
                      <div className="flex items-center gap-4 mb-8">
                        <PenTool className="h-6 w-6 text-primary" />
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Scribe's Reflection</span>
                      </div>
                      <div className="space-y-6">
                        {planDay?.reflectionQuestion && (
                          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-lg font-bold text-primary italic">Reflection: {planDay.reflectionQuestion}</p>
                          </div>
                        )}
                        <Textarea 
                          placeholder="Your study notes..."
                          className={cn(
                            "min-h-[200px] rounded-2xl transition-all p-8 text-lg border-slate-200 focus:ring-primary/10",
                            isDark ? "bg-slate-900/50 border-slate-800" : "bg-white"
                          )}
                          value={scribeReflection}
                          onChange={(e) => setScribeReflection(e.target.value)}
                        />
                      </div>
                    </div>

                    {pathParam && (
                      <div className="pt-20 flex items-center justify-between border-t border-slate-100">
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            if (dayParam > 1) router.push(`/reader?path=${pathParam}&day=${dayParam - 1}`);
                          }} 
                          disabled={dayParam <= 1}
                          className="rounded-full gap-3 font-bold text-sm h-11 px-6 hover:bg-slate-50"
                        >
                          <ChevronLeft className="h-5 w-5" /> Previous Day
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            router.push(`/reader?path=${pathParam}&day=${dayParam + 1}`);
                          }}
                          className="rounded-full gap-3 font-bold text-sm h-11 px-6 hover:bg-slate-50"
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

          <aside className="lg:col-span-4 space-y-10">
            {planDay?.thematicLedger && (
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white border border-slate-100">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-primary">
                    <ListChecks className="h-5 w-5" /> Covenant Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                  {planDay.thematicLedger.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {planDay?.culturalInsights && (
               <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white border border-slate-100">
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-amber-600">
                    <Compass className="h-5 w-5" /> Marginalia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  {planDay.culturalInsights.map((insight, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-sm font-bold text-slate-900">{insight.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed italic">{insight.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {planDay?.scribalStrategy && (
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-[#F1F5F9] border border-slate-200">
                <CardHeader className="p-8 pb-4">
                   <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-slate-700">
                    <PenTool className="h-5 w-5" /> Scribal Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-5">
                  <div className="space-y-4">
                    {planDay.scribalStrategy.instructions.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="h-5 w-5 shrink-0 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">{i + 1}</span>
                        <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className={cn("border-none shadow-xl rounded-3xl overflow-hidden flex flex-col min-h-[500px]", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="p-8 pb-6 border-b border-slate-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" /> Community
                  </CardTitle>
                  {user && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-full hover:bg-primary/5 text-primary"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      <Plus className={cn("h-5 w-5 transition-transform duration-300", showAddForm && "rotate-45")} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 flex flex-col">
                {showAddForm && user && (
                  <div className="p-6 bg-slate-50/50 border-b border-slate-50 animate-in slide-in-from-top duration-300">
                    <Textarea 
                      placeholder="Share a scholarly insight..."
                      className="min-h-[120px] mb-4 text-base rounded-xl border-slate-200 bg-white p-4"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        className="btn-gradient rounded-full font-bold px-6 h-10 gap-2" 
                        onClick={handleAddInsight}
                        disabled={!newComment.trim()}
                      >
                        Post <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}

                <ScrollArea className="flex-1">
                  {isAnnotationsLoading ? (
                    <div className="p-20 flex flex-col items-center opacity-20">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Updating...</span>
                    </div>
                  ) : remoteAnnotations && remoteAnnotations.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {remoteAnnotations.map((ann) => (
                        <div key={ann.id} className="p-6 hover:bg-slate-50/30 transition-colors">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                {ann.userDisplayName?.charAt(0) || "S"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate text-slate-900">{ann.userDisplayName}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                {ann.createdAt?.seconds 
                                  ? new Date(ann.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed font-body">
                            {ann.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-20 text-center opacity-30 flex flex-col items-center space-y-4">
                      <BookOpen className="h-10 w-10" />
                      <p className="text-xs font-bold uppercase tracking-widest">No insights yet.</p>
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
          font-size: 1.75rem;
          line-height: 2.4;
          max-width: 75ch;
          margin: 0 auto;
        }
        .bible-reader-text sup {
          font-size: 1.1rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 1.25rem;
          vertical-align: super;
          font-family: 'Space Grotesk', sans-serif;
        }
        .bible-reader-text p {
          margin-bottom: 2.5rem;
        }
        .poetic-lineation p {
          padding-left: 3.5rem;
          text-indent: -3.5rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
