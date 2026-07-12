
"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
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
import { getPlanDay, getPlanDays, type PathId } from "@/lib/reading-plans";
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { saveAnnotation, getAnnotationsQuery, toggleAnnotationReaction } from "@/services/annotationService";
import { getUserCirclesQuery } from "@/services/circleService";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { explainScripture, type AIAnnotatorExplanationOutput } from "@/ai/flows/ai-annotator-explanation";
import { studyWord, type WordStudyOutput } from "@/ai/flows/word-study";
import { getInterlinearAnalysis, type InterlinearOutput } from "@/ai/flows/interlinear";
import { Switch } from "@/components/ui/switch";
import ChronologicalDesk from "@/components/chronological-desk";
import JudeanMap from "@/components/judean-map";
import AnnotationFeed from "@/components/reader/annotation-feed";
import ScribeReflection from "@/components/reader/scribe-reflection";
import AIAssistantPanel from "@/components/reader/ai-assistant-panel";
import ComparativeView from "@/components/reader/comparative-view";
import { CHRONOLOGICAL_DAYS_DATA } from "@/lib/chronological-linkages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  
  const getInitialRef = () => {
    if (pathParam && dayParam > 0) {
      const dayData = getPlanDay(pathParam, dayParam);
      if (dayData) return dayData.reference;
    }
    return searchParams.get('reference') || "John 3:16";
  };

  const initialRef = getInitialRef();

  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "sepia" | "dark" | "byzantine" | "irish" | "gutenberg">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "sepia" || saved === "dark" || saved === "byzantine" || saved === "irish" || saved === "gutenberg") {
      setTheme(saved as any);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const getThemeClass = (
    light: string, 
    sepia: string, 
    dark: string, 
    byzantine?: string, 
    irish?: string, 
    gutenberg?: string
  ) => {
    if (!mounted) return light;
    if (theme === "dark") return dark;
    if (theme === "sepia") return sepia;
    if (theme === "byzantine") return byzantine !== undefined ? byzantine : dark;
    if (theme === "irish") return irish !== undefined ? irish : sepia;
    if (theme === "gutenberg") return gutenberg !== undefined ? gutenberg : light;
    return light;
  };
  const [error, setError] = useState<string | null>(null);
  const [scribeReflection, setScribeReflection] = useState("");
  
  // AI Flow State
  const [aiAnalysis, setAiAnalysis] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordStudyResult, setWordStudyResult] = useState<WordStudyOutput | null>(null);
  const [isWordStudyLoading, setIsWordStudyLoading] = useState(false);
  const [customWordQuery, setCustomWordQuery] = useState("");

  // Comparative & Interlinear State
  const [isComparative, setIsComparative] = useState(false);
  const [secondaryVersion, setSecondaryVersion] = useState(SUPPORTED_VERSIONS[1]?.id || SUPPORTED_VERSIONS[0].id);
  const [secondaryScripture, setSecondaryScripture] = useState<Scripture | null>(null);
  const [isSecondaryLoading, setIsSecondaryLoading] = useState(false);
  const [secondaryError, setSecondaryError] = useState<string | null>(null);

  const [isInterlinear, setIsInterlinear] = useState(false);
  const [interlinearData, setInterlinearData] = useState<InterlinearOutput | null>(null);
  const [isInterlinearLoading, setIsInterlinearLoading] = useState(false);
  const [interlinearError, setInterlinearError] = useState<string | null>(null);

  // Wax Seal States for Day 21
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (dayParam === 21) {
      const saved = localStorage.getItem("scriptorium-seal-broken-21");
      setIsSealBroken(saved === "true");
    } else {
      setIsSealBroken(false);
    }
  }, [dayParam]);

  // Circles & Threads State
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null); // null = Public Feed
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState("");

  const userCirclesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getUserCirclesQuery(firestore, user.uid);
  }, [firestore, user]);

  const { data: userCircles } = useCollection(userCirclesQuery);

  const annotationsQuery = useMemoFirebase(() => {
    if (!firestore || !currentRef) return null;
    return getAnnotationsQuery(firestore, currentRef, selectedCircleId);
  }, [firestore, currentRef, selectedCircleId]);

  const { data: remoteAnnotations, isLoading: isAnnotationsLoading } = useCollection(annotationsQuery);

  const filteredAnnotations = useMemo(() => {
    if (!remoteAnnotations) return [];
    return [...(remoteAnnotations as any[])].sort((a: any, b: any) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  }, [remoteAnnotations]);

  const annotationThreads = useMemo(() => {
    const list = filteredAnnotations || [];
    const map: Record<string, any> = {};
    const roots: any[] = [];

    list.forEach((ann: any) => {
      map[ann.id] = { ...ann, replies: [] };
    });

    list.forEach((ann: any) => {
      const mapped = map[ann.id];
      if (ann.parentId && map[ann.parentId]) {
        map[ann.parentId].replies.push(mapped);
      } else {
        roots.push(mapped);
      }
    });

    return roots;
  }, [filteredAnnotations]);

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
      setSecondaryScripture(null);
      setInterlinearData(null);
      if (isComparative) {
        loadSecondaryScripture(currentRef, secondaryVersion);
      }
      if (isInterlinear) {
        loadInterlinearData(currentRef);
      }
      setScribeReflection(""); 
      setAiAnalysis(null); 
      setSelectedWord(null);
      setWordStudyResult(null);
      setCustomWordQuery(""); 
      setReplyingToId(null);
      setReplyComment("");
    }
  }, [currentRef, version]);

  useEffect(() => {
    if (currentRef && isComparative) {
      loadSecondaryScripture(currentRef, secondaryVersion);
    }
  }, [currentRef, secondaryVersion, isComparative]);

  useEffect(() => {
    if (currentRef && isInterlinear && !interlinearData) {
      loadInterlinearData(currentRef);
    }
  }, [currentRef, isInterlinear]);

  const loadSecondaryScripture = async (ref: string, v: string) => {
    setIsSecondaryLoading(true);
    setSecondaryError(null);
    try {
      const data = await getScripture(ref, v);
      setSecondaryScripture(data);
    } catch (error: any) {
      setSecondaryError(error.message || "Could not retrieve secondary passage.");
    } finally {
      setIsSecondaryLoading(false);
    }
  };

  const loadInterlinearData = async (ref: string) => {
    setIsInterlinearLoading(true);
    setInterlinearError(null);
    try {
      const data = await getInterlinearAnalysis({ reference: ref });
      setInterlinearData(data);
    } catch (error: any) {
      setInterlinearError("Could not retrieve original language data.");
    } finally {
      setIsInterlinearLoading(false);
    }
  };

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

  const handleAddInsight = (commentText: string) => {
    if (!user) {
      handleSignIn();
      return;
    }

    saveAnnotation(firestore, user, currentRef, "", commentText, selectedCircleId);

    toast({
      title: "Insight Shared",
      description: selectedCircleId ? "Note added to your study circle feed." : "Note added to the community feed.",
    });
  };

  const handleAddReply = (commentText: string, parentId: string) => {
    if (!user) {
      handleSignIn();
      return;
    }

    saveAnnotation(firestore, user, currentRef, "", commentText, selectedCircleId, parentId);

    toast({
      title: "Reply Shared",
      description: "Your reply has been posted.",
    });
  };

  const handleToggleAnnotationReaction = async (annId: string, type: 'insightful' | 'needsContext') => {
    if (!user) {
      handleSignIn();
      return;
    }
    try {
      await toggleAnnotationReaction(firestore, annId, user.uid, type);
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleWordStudy = async (word: string) => {
    if (!word.trim()) return;
    setSelectedWord(word);
    setIsWordStudyLoading(true);
    setWordStudyResult(null);
    try {
      const result = await studyWord({ word, context: scripture?.text || "" });
      setWordStudyResult(result);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Word Study Offline",
        description: "The lexical tutor is currently resting.",
      });
    } finally {
      setIsWordStudyLoading(false);
    }
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

  const isDark = theme === "dark" || theme === "byzantine";

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      theme === "byzantine" && "theme-byzantine",
      theme === "irish" && "theme-irish",
      theme === "gutenberg" && "theme-gutenberg",
      getThemeClass("bg-[#F8FAFC] text-slate-900", "bg-[#F4ECD8] text-[#433422]", "bg-[#0B0F1A] text-slate-200")
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 max-w-[1300px]">
        {pathParam && (
          <div className={cn(
            "mb-6 p-5 rounded-2xl border shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-4",
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

        {pathParam === 'chronological' && (
          <div className="mb-6">
            <JudeanMap
              currentDay={dayParam}
              onDaySelect={(selectedDay) => router.push(`/reader?path=chronological&day=${selectedDay}`)}
              getThemeClass={getThemeClass}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-6">
            <h1 className={cn(
              "text-4xl md:text-5xl font-headline font-bold tracking-tight",
              getThemeClass("text-slate-900", "text-[#433422]", "text-white")
            )}>Scriptorium</h1>
            <Select value={theme} onValueChange={(val: any) => setTheme(val)}>
              <SelectTrigger className={cn(
                "w-[180px] h-11 rounded-full font-bold text-xs uppercase tracking-wider",
                getThemeClass("bg-white border-slate-200 text-slate-800", "bg-[#FAF6EE] border-[#E6D7B8] text-[#433422]", "bg-slate-900 border-slate-800 text-slate-200")
              )}>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="light" className="text-xs font-bold uppercase">☀️ Light</SelectItem>
                <SelectItem value="sepia" className="text-xs font-bold uppercase">📖 Sepia</SelectItem>
                <SelectItem value="dark" className="text-xs font-bold uppercase">🌙 Dark Scholar</SelectItem>
                <SelectItem value="byzantine" className="text-xs font-bold uppercase">👑 Byzantine Desk</SelectItem>
                <SelectItem value="irish" className="text-xs font-bold uppercase">☘️ Irish Monastery</SelectItem>
                <SelectItem value="gutenberg" className="text-xs font-bold uppercase">🖨️ Gutenberg Press</SelectItem>
              </SelectContent>
            </Select>
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

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-6">
            {/* Comparative Mode toggle */}
            <div className="flex items-center gap-3">
              <Switch 
                id="comparative-mode"
                checked={isComparative}
                onCheckedChange={(checked) => {
                  setIsComparative(checked);
                  if (checked) {
                    setIsInterlinear(false); // disable interlinear when comparative is active
                  }
                }}
              />
              <label htmlFor="comparative-mode" className="text-sm font-bold cursor-pointer select-none text-slate-700 dark:text-slate-200">
                Comparative Mode
              </label>
            </div>
            
            {isComparative && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Compare with:</span>
                <Select
                  value={secondaryVersion}
                  onValueChange={(val) => setSecondaryVersion(val)}
                >
                  <SelectTrigger className="w-[200px] h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-850">
                    <SelectValue placeholder="Select Translation" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {SUPPORTED_VERSIONS.map((v) => (
                      <SelectItem key={v.id} value={v.id} disabled={v.id === version} className="text-xs">
                        {v.name} ({v.code.toUpperCase()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Interlinear view toggle */}
            <Switch 
              id="interlinear-mode"
              checked={isInterlinear}
              onCheckedChange={(checked) => {
                setIsInterlinear(checked);
                if (checked) {
                  setIsComparative(false); // disable comparative when interlinear is active
                }
              }}
            />
            <label htmlFor="interlinear-mode" className="text-sm font-bold cursor-pointer select-none text-slate-700 dark:text-slate-200">
              Interlinear View (Original Language)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className={cn(
              "border-none shadow-md rounded-2xl overflow-hidden flex flex-col min-h-[800px]",
              getThemeClass("bg-white", "bg-[#FAF6EE] border border-[#E6D7B8]", "bg-[#1E293B]")
            )}>
              <div className="bg-brand-gradient h-1.5 w-full" />
              
              <div className="px-6 pt-8">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-6 md:p-8 flex-1 pt-4">
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
                  <article className={cn("mx-auto space-y-16 animate-in fade-in duration-700", !isComparative && !isInterlinear ? "max-w-3xl" : "w-full")}>
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
                    
                    {isComparative ? (
                      <ComparativeView
                        scripture={scripture}
                        version={version}
                        secondaryScripture={secondaryScripture}
                        secondaryVersion={secondaryVersion}
                        isSecondaryLoading={isSecondaryLoading}
                        secondaryError={secondaryError}
                        getThemeClass={getThemeClass}
                        SUPPORTED_VERSIONS={SUPPORTED_VERSIONS}
                      />
                    ) : isInterlinear ? (
                      <div className="space-y-8 animate-in fade-in duration-500">
                        {isInterlinearLoading ? (
                          <div className="flex flex-col items-center justify-center py-40 space-y-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading original language analysis...</span>
                          </div>
                        ) : interlinearError ? (
                          <div className="text-center py-20 space-y-4">
                            <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
                            <p className="text-sm text-slate-500">{interlinearError}</p>
                            <Button onClick={() => loadInterlinearData(currentRef)} variant="outline" size="sm" className="rounded-full">Retry Analysis</Button>
                          </div>
                        ) : interlinearData && interlinearData.verses ? (
                          <TooltipProvider delayDuration={150}>
                            <div className="space-y-8">
                              {interlinearData.verses.map((verse) => (
                                <div key={verse.verseNumber} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                  <span className="text-xs font-bold font-headline text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded shrink-0">
                                    Verse {verse.verseNumber}
                                  </span>
                                  <div className="flex flex-wrap gap-x-6 gap-y-8 leading-loose">
                                    {verse.words.map((wordObj, wIdx) => (
                                      <Tooltip key={wIdx}>
                                        <TooltipTrigger asChild>
                                          <div className="flex flex-col items-center cursor-help border-b border-dashed border-slate-300 hover:border-primary/50 pb-1 transition-all">
                                            {/* Original (Hebrew/Greek) */}
                                            <span className="text-2xl font-bold font-serif text-slate-900 dark:text-white pb-1 select-all">
                                              {wordObj.original}
                                            </span>
                                            {/* Transliteration */}
                                            <span className="text-xs text-slate-400 italic">
                                              {wordObj.transliteration}
                                            </span>
                                            {/* English Equivalent */}
                                            <span className="text-xs font-bold text-primary dark:text-slate-300">
                                              {wordObj.english}
                                            </span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="p-3 max-w-[260px] space-y-2 rounded-xl">
                                          <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-1">
                                            <span className="font-bold text-xs font-headline text-primary">Concordance</span>
                                            <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0 border-none rounded-full bg-slate-100">
                                              {wordObj.strongs}
                                            </Badge>
                                          </div>
                                          <div className="space-y-1 text-xs">
                                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Grammatical Parsing</p>
                                            <p className="font-mono text-slate-800 dark:text-slate-200">{wordObj.parsing}</p>
                                          </div>
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TooltipProvider>
                        ) : null}
                      </div>
                    ) : pathParam === 'chronological' && (CHRONOLOGICAL_DAYS_DATA[dayParam] || dayParam === 20) ? (
                      <ChronologicalDesk day={dayParam} theme={theme} version={version} getThemeClass={getThemeClass} />
                    ) : (
                      <div className={cn(
                        "bible-reader-text leading-relaxed font-serif transition-all duration-300",
                        getThemeClass("text-slate-800", "text-[#433422]", "text-slate-300"),
                        pathParam === 'genre' && "poetic-lineation"
                      )}>
                        <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                      </div>
                    )}

                    {planDay?.mainTruth && (
                      <div className="p-10 rounded-3xl bg-slate-50/50 border border-slate-100 text-center space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">The Core Truth</span>
                        <p className="text-2xl font-headline font-bold text-slate-900 leading-snug italic">
                          "{planDay.mainTruth}"
                        </p>
                      </div>
                    )}
                    
                    <ScribeReflection
                      dayParam={dayParam}
                      planDay={planDay}
                      scribeReflection={scribeReflection}
                      setScribeReflection={setScribeReflection}
                      isSealBroken={isSealBroken}
                      setIsSealBroken={setIsSealBroken}
                      isShaking={isShaking}
                      setIsShaking={setIsShaking}
                      getThemeClass={getThemeClass}
                      toast={toast}
                    />

                    {pathParam && (
                      <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                        {(() => {
                          const pathDays = getPlanDays(pathParam);
                          const currentIndex = pathDays.indexOf(dayParam);
                          const prevDay = currentIndex > 0 ? pathDays[currentIndex - 1] : null;
                          const nextDay = currentIndex < pathDays.length - 1 ? pathDays[currentIndex + 1] : null;

                          return (
                            <>
                              <Button 
                                variant="ghost" 
                                onClick={() => {
                                  if (prevDay !== null) router.push(`/reader?path=${pathParam}&day=${prevDay}`);
                                }} 
                                disabled={prevDay === null}
                                className="rounded-full gap-3 font-bold text-sm h-11 px-6 hover:bg-slate-50"
                              >
                                <ChevronLeft className="h-5 w-5" /> Previous Day
                              </Button>
                              <Button 
                                variant="ghost" 
                                onClick={() => {
                                  if (nextDay !== null) router.push(`/reader?path=${pathParam}&day=${nextDay}`);
                                }}
                                disabled={nextDay === null}
                                className="rounded-full gap-3 font-bold text-sm h-11 px-6 hover:bg-slate-50"
                              >
                                Next Day <ChevronRight className="h-5 w-5" />
                              </Button>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </article>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            {planDay?.historicalSnapshot && (
              <Card className={cn(
                "border-none shadow-md rounded-2xl overflow-hidden border animate-in fade-in slide-in-from-right-4 duration-500",
                getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
              )}>
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-blue-600 dark:text-blue-400">
                    <History className="h-5 w-5" /> Narrative Anchor
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  <div className={cn(
                    "p-4 rounded-xl border text-xs leading-relaxed italic font-serif",
                    getThemeClass("bg-slate-50 border-slate-100 text-slate-650", "bg-[#F4ECD8] border-[#E6D7B8] text-[#5C4033]", "bg-slate-900/50 border-slate-800 text-slate-355")
                  )}>
                    "{planDay.historicalSnapshot.text}"
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Background: {planDay.historicalSnapshot.ref}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {planDay?.thematicLedger && (
              <Card className={cn(
                "border-none shadow-md rounded-2xl overflow-hidden border",
                getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
              )}>
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-primary">
                    <ListChecks className="h-5 w-5" /> Covenant Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  {planDay.thematicLedger.map((item, i) => (
                    <div key={i} className={cn(
                      "flex items-center justify-between p-4 rounded-xl border",
                      getThemeClass("bg-slate-50 border-slate-100", "bg-[#F4ECD8] border-[#E6D7B8] text-[#433422]", "bg-slate-900 border-slate-800 text-slate-200")
                    )}>
                      <span className={cn("text-xs font-bold uppercase tracking-wider", getThemeClass("text-slate-500", "text-[#8C6D58]", "text-slate-400"))}>{item.label}</span>
                      <span className="text-sm font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {planDay?.culturalInsights && (
               <Card className={cn(
                 "border-none shadow-md rounded-2xl overflow-hidden border",
                 getThemeClass("bg-white border-slate-100", "bg-[#FAF6EE] border-[#E6D7B8]", "bg-[#1E293B] border-slate-800")
               )}>
                <CardHeader className="p-5 pb-3">
                   <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 text-amber-600">
                    <Compass className="h-5 w-5" /> Marginalia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                  {planDay.culturalInsights.map((insight, i) => (
                    <div key={i} className="space-y-2">
                      <p className={cn("text-sm font-bold", getThemeClass("text-slate-900", "text-[#433422]", "text-white"))}>{insight.title}</p>
                      <p className={cn("text-sm leading-relaxed italic", getThemeClass("text-slate-500", "text-[#5C4033]", "text-slate-400"))}>{insight.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {planDay?.scribalStrategy && (
              <Card className={cn(
                "border-none shadow-md rounded-2xl overflow-hidden border",
                getThemeClass("bg-[#F1F5F9] border-slate-200", "bg-[#EAE1C9] border-[#D6C5A2]", "bg-slate-900 border-slate-800")
              )}>
                <CardHeader className="p-5 pb-3">
                   <CardTitle className={cn("text-sm font-bold uppercase tracking-widest flex items-center gap-3", getThemeClass("text-slate-700", "text-[#433422]", "text-slate-200"))}>
                    <PenTool className="h-5 w-5" /> Scribal Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                  <div className="space-y-4">
                    {planDay.scribalStrategy.instructions.map((step, i) => (
                      <div key={i} className="flex gap-3 animate-in fade-in duration-300">
                        <span className={cn(
                          "h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold border",
                          getThemeClass("bg-white text-slate-400 border-slate-200", "bg-[#FAF6EE] text-[#8C6D58] border-[#E6D7B8]", "bg-slate-800 text-slate-450 border-slate-750")
                        )}>{i + 1}</span>
                        <p className={cn("text-sm leading-relaxed", getThemeClass("text-slate-600", "text-[#5C4033]", "text-slate-300"))}>{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <AIAssistantPanel
              planDay={planDay}
              aiAnalysis={aiAnalysis}
              isAiLoading={isAiLoading}
              selectedWord={selectedWord}
              wordStudyResult={wordStudyResult}
              isWordStudyLoading={isWordStudyLoading}
              customWordQuery={customWordQuery}
              setCustomWordQuery={setCustomWordQuery}
              version={version}
              setCurrentRef={setCurrentRef}
              setSearchQuery={setSearchQuery}
              loadScripture={loadScripture}
              onAiAnalysis={handleAiAnalysis}
              onWordStudy={handleWordStudy}
              getThemeClass={getThemeClass}
            />

            <AnnotationFeed
              currentRef={currentRef}
              user={user}
              selectedCircleId={selectedCircleId}
              userCircles={userCircles || []}
              setSelectedCircleId={setSelectedCircleId}
              annotationThreads={annotationThreads}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              replyComment={replyComment}
              setReplyComment={setReplyComment}
              newComment={newComment}
              setNewComment={setNewComment}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              onSaveAnnotation={async (text, parentId) => {
                if (parentId) {
                  handleAddReply(text, parentId);
                } else {
                  handleAddInsight(text);
                }
              }}
              onToggleReaction={handleToggleAnnotationReaction}
              getThemeClass={getThemeClass}
            />
          </aside>
        </div>
      </main>
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
