
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
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { BibleVersionSwitcher } from "@/components/bible-version-switcher";
import { 
  Sparkles, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Search, 
  History, 
  Loader2,
  Sun,
  Moon,
  List,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MOCK_CROSS_REFS = [
  { ref: "1 John 4:9", snippet: "In this was manifested the love of God toward us..." },
  { ref: "Romans 5:8", snippet: "But God commendeth his love toward us, in that..." },
  { ref: "Ephesians 2:4", snippet: "But God, who is rich in mercy, for his great love..." }
];

function ReaderContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('reference') || "John 3:16";
  const initialPath = searchParams.get('path') || null;

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { toast } = useToast();

  useEffect(() => {
    loadScripture(currentRef, version);
  }, [currentRef, version]);

  const loadScripture = async (ref: string, v: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Passage Not Found",
        description: `Could not retrieve "${ref}". Try a different reference.`
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

  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-headline font-bold">Enhanced Reader</h1>
            {initialPath && (
              <Badge variant="secondary" className="bg-primary/10 text-primary font-bold uppercase tracking-widest border-none">
                {initialPath.charAt(0).toUpperCase() + initialPath.slice(1)} Path
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
            className="rounded-full"
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
              placeholder="Search e.g. Romans 8:28..."
              className={cn(
                "pl-11 h-12 rounded-xl transition-all shadow-sm",
                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"
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
          <div className="lg:col-span-2">
            <Card className={cn(
              "border-none shadow-xl overflow-hidden rounded-3xl min-h-[500px]",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-2 w-full" />
              <CardContent className="p-8 md:p-12">
                <div className="mb-12">
                  <GuidedAscent currentStep="Read" onStepClick={() => {}} />
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 opacity-40">
                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                    <p className="text-sm font-medium">Retrieving Scripture...</p>
                  </div>
                ) : scripture ? (
                  <div className="space-y-8 animate-in fade-in duration-700">
                    <div className="flex items-center justify-between">
                      <h3 className={cn("text-3xl font-headline font-bold", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h3>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">
                        {SUPPORTED_VERSIONS.find(v => v.id === version)?.name}
                      </Badge>
                    </div>
                    <div className={cn(
                      "prose lg:prose-xl max-w-none leading-relaxed font-serif",
                      isDark ? "prose-invert" : "prose-slate"
                    )}>
                      <p className="text-2xl italic">
                        {scripture.text}
                      </p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className={cn("border-none shadow-lg", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="pb-4 border-b border-slate-100/10">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <List className="h-4 w-4 text-primary" /> Advanced Cross-Refs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="divide-y divide-slate-100/10">
                    {MOCK_CROSS_REFS.map((ref, i) => (
                      <div key={i} className="p-4 hover:bg-slate-500/5 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-primary">{ref.ref}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 italic">"{ref.snippet}"</p>
                      </div>
                    ))}
                    <div className="p-6 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">More Connections Available</p>
                      <Button variant="outline" size="sm" className="w-full text-[10px] font-bold uppercase">Load Full Mapping</Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className={cn("border-none shadow-lg bg-primary/5", isDark ? "border-primary/20" : "")}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Scholarly Guide</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Click on any verse to see a deep-dive into historical context, original language roots, and theological coherence.
                </p>
                <Button className="w-full btn-gradient font-bold h-9 text-xs rounded-xl">Unlock Analysis</Button>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
