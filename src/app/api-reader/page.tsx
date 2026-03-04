"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  Sun,
  Moon,
  Zap,
  Layout
} from "lucide-react";
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
  "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

export default function SimpleReaderPage() {
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState("1");
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { toast } = useToast();

  useEffect(() => {
    handleFetchScripture(`${book} ${chapter}`);
  }, [book, chapter, version]);

  const handleFetchScripture = async (ref: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref, version);
      setScripture(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Passage Error",
        description: `Could not retrieve "${ref}".`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrevChapter = () => {
    const current = parseInt(chapter);
    if (current > 1) setChapter((current - 1).toString());
  };

  const handleNextChapter = () => {
    const current = parseInt(chapter);
    setChapter((current + 1).toString());
  };

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  const isDark = theme === "dark";

  return (
    <div className={cn(
      "flex flex-col min-h-screen transition-colors duration-300",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Zap className={cn("h-6 w-6", isDark ? "text-blue-500" : "text-primary")} />
              <h1 className="text-2xl font-bold tracking-tight">Simple Reader</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">Distraction-free quick reference</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/reader">
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 rounded-xl border-slate-200 font-bold text-xs uppercase tracking-widest">
                <Layout className="h-4 w-4" /> Switch to Enhanced
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className={cn("rounded-full h-10 w-10", isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-200 text-slate-600")}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className={cn(
          "flex flex-wrap items-center gap-3 mb-6 p-2 rounded-xl border transition-colors duration-300",
          isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        )}>
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger className={cn(
              "w-[160px] h-10 text-xs font-bold uppercase tracking-widest focus:ring-blue-500 rounded-lg",
              isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
            )}>
              <SelectValue placeholder="Select Book" />
            </SelectTrigger>
            <SelectContent className={cn(
              "max-h-[300px]",
              isDark ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-white border-slate-200"
            )}>
              {BIBLE_BOOKS.map((b) => (
                <SelectItem key={b} value={b} className="text-xs font-bold uppercase tracking-widest">
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger className={cn(
              "w-[110px] h-10 text-xs font-bold uppercase tracking-widest focus:ring-blue-500 rounded-lg",
              isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
            )}>
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent className={cn(
              isDark ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-white border-slate-200"
            )}>
              {[...Array(150)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()} className="text-xs font-bold uppercase tracking-widest">
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className={cn(
              "w-[110px] h-10 text-[10px] font-bold uppercase tracking-wider focus:ring-blue-500 rounded-lg",
              isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
            )}>
              <SelectValue placeholder="Version" />
            </SelectTrigger>
            <SelectContent className={cn(
              isDark ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-white border-slate-200"
            )}>
              {SUPPORTED_VERSIONS.map((v) => (
                <SelectItem key={v.id} value={v.id} className="text-[10px] font-bold uppercase tracking-widest">
                  {v.name.split(' ').map(word => word[0]).join('')} ({v.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center border rounded-lg overflow-hidden h-10 shadow-sm",
              isDark ? "border-slate-700" : "border-slate-200"
            )}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevChapter}
                className={cn(
                  "border-r rounded-none w-10 h-10",
                  isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNextChapter}
                className={cn(
                  "rounded-none w-10 h-10",
                  isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-400" : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <Card className={cn(
          "border-none shadow-2xl rounded-2xl min-h-[600px] flex flex-col overflow-hidden transition-colors duration-300",
          isDark ? "bg-[#1E293B]" : "bg-white"
        )}>
          <div className="p-12 md:p-16 flex-1 text-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-40">
                <Loader2 className={cn("h-10 w-10 animate-spin", isDark ? "text-blue-500" : "text-primary")} />
                <p className="text-sm font-bold uppercase tracking-[0.2em]">Consulting the Scriptorium...</p>
              </div>
            ) : scripture ? (
              <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700">
                <div className="space-y-4">
                  <h2 className={cn("text-5xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                    {scripture.reference}
                  </h2>
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", isDark ? "text-slate-400" : "text-slate-500")}>
                    {SUPPORTED_VERSIONS.find(v => v.id === version)?.name || "OFFICIAL VERSION"}
                  </p>
                  <div className={cn("w-16 h-1 mx-auto mt-8 rounded-full", isDark ? "bg-blue-500/20" : "bg-primary/10")} />
                </div>
                
                <div className="text-left">
                  <div 
                    className={cn(
                      "prose max-w-none bible-text-display transition-colors duration-300",
                      isDark ? "prose-invert prose-slate" : "prose-slate"
                    )}
                    style={{ color: isDark ? '#CBD5E1' : '#1E293B' }}
                    dangerouslySetInnerHTML={{ __html: formatBibleText(scripture.text) }}
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                <BookOpen className="h-16 w-16" />
                <p className="text-lg font-medium">Select a chapter to begin reading</p>
              </div>
            )}
          </div>

          <div className={cn(
            "p-8 pt-4 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest",
            isDark ? "border-slate-800 bg-slate-900/30 text-slate-500" : "border-slate-100 bg-slate-50 text-slate-400"
          )}>
            <span>Content provided by API.Bible • American Bible Society</span>
            <span className="flex items-center gap-1.5 italic">
              Powered by Scriptorium Engine v1.1
            </span>
          </div>
        </Card>
      </main>

      <style jsx global>{`
        .bible-text-display {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          line-height: 2.1;
        }
        .bible-text-display sup {
          font-size: 0.7rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 0.8rem;
          vertical-align: super;
        }
        .bible-text-display p {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

function formatBibleText(text: string): string {
  return text
    .replace(/(\d+)/g, '<sup>$1</sup>')
    .split('\n')
    .map(para => para.trim() ? `<p>${para}</p>` : '')
    .join('');
}
