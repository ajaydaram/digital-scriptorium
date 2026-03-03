"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, CheckCircle2, ChevronRight, Globe, Info, Zap } from "lucide-react";
import { getScripture, type Scripture } from "@/services/bibleService";
import { useToast } from "@/hooks/use-toast";

const POPULAR_PASSAGES = [
  "John 3:16",
  "Psalm 23:1-6",
  "Romans 8:28",
  "Philippians 4:13",
  "Isaiah 41:10",
  "Matthew 5:3-10",
  "Jeremiah 29:11",
  "Proverbs 3:5-6",
];

export default function ApiReaderPage() {
  const [searchQuery, setSearchQuery] = useState("John 3:16");
  const [currentRef, setCurrentRef] = useState("John 3:16");
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    handleFetchScripture(currentRef);
  }, [currentRef]);

  const handleFetchScripture = async (ref: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref);
      setScripture(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search Error",
        description: `Could not find passage "${ref}".`,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentRef(searchQuery.trim());
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Controls & Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-brand-gradient h-1.5 w-full" />
              <CardHeader>
                <CardTitle className="text-xl font-headline font-bold">API.Bible Reader</CardTitle>
                <CardDescription className="text-xs">
                  Simple Bible reading powered by API.Bible from the American Bible Society
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest leading-tight">
                    API.Bible Connected - Full Access to 2,500+ Versions
                  </span>
                </div>

                <form onSubmit={onSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search Scripture..."
                    className="pl-9 h-11 rounded-xl border-slate-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="h-3 w-3" /> Popular Passages
                  </h3>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {POPULAR_PASSAGES.map((ref) => (
                        <button
                          key={ref}
                          onClick={() => {
                            setCurrentRef(ref);
                            setSearchQuery(ref);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                            currentRef === ref 
                              ? "bg-primary/10 text-primary border border-primary/20" 
                              : "bg-white border border-slate-100 hover:border-primary/20 hover:bg-slate-50"
                          }`}
                        >
                          {ref}
                          <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${currentRef === ref ? 'opacity-100' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl bg-slate-900 text-white overflow-hidden">
               <CardHeader>
                 <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                   <Info className="h-5 w-5 text-primary" /> How to Use
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6 text-sm">
                 <div className="space-y-2">
                   <h4 className="font-bold text-primary flex items-center gap-2">
                     <BookOpen className="h-4 w-4" /> Search Bible Passages
                   </h4>
                   <p className="text-slate-400 text-xs leading-relaxed">
                     Enter any Bible reference like "John 3:16", "Psalm 23", or "Romans 8:28-39" in the search box above.
                   </p>
                 </div>

                 <div className="space-y-2">
                   <h4 className="font-bold text-primary flex items-center gap-2">
                     <Zap className="h-4 w-4" /> Get Full Access
                   </h4>
                   <p className="text-slate-400 text-xs leading-relaxed">
                     Sign up for a free API key at <a href="https://api.bible" target="_blank" className="underline hover:text-white transition-colors">api.bible</a> and add it to your .env.local file as NEXT_PUBLIC_BIBLE_API_KEY.
                   </p>
                 </div>

                 <div className="space-y-2">
                   <h4 className="font-bold text-primary flex items-center gap-2">
                     <Globe className="h-4 w-4" /> 2,500+ Bible Versions
                   </h4>
                   <p className="text-slate-400 text-xs leading-relaxed">
                     With an API key, you get access to the world's largest collection of Bible translations in hundreds of languages.
                   </p>
                 </div>
               </CardContent>
            </Card>
          </div>

          {/* Right Main Content: Bible Display */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-2xl rounded-3xl min-h-[600px] flex flex-col bg-white">
              <CardHeader className="border-b border-slate-50 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-headline font-bold text-slate-900">{scripture?.reference || currentRef}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Berean Standard Bible (Simulated for Demo)
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold py-1 px-3 border-primary/20 text-primary bg-primary/5 uppercase tracking-widest h-fit">
                    API.BIBLE SOURCE
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-8 md:p-12">
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-6 bg-slate-100 rounded-full w-3/4" />
                    <div className="h-6 bg-slate-100 rounded-full w-full" />
                    <div className="h-6 bg-slate-100 rounded-full w-5/6" />
                    <div className="h-6 bg-slate-100 rounded-full w-4/6" />
                  </div>
                ) : scripture ? (
                  <div className="animate-in fade-in duration-700">
                    <div className="prose prose-slate prose-xl max-w-none">
                      <p className="font-serif text-2xl md:text-3xl text-slate-800 leading-relaxed italic first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                        {scripture.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <BookOpen className="h-16 w-16" />
                    <p className="font-headline font-bold text-xl">Select a passage to begin reading</p>
                  </div>
                )}
              </CardContent>

              <div className="p-8 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Content provided by API.Bible • American Bible Society</span>
                <span className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" /> API VERSION: 1.0.4
                </span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
