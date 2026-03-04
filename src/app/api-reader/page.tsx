"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BookOpen, 
  Headphones, 
  BookMarked, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  Search
} from "lucide-react";
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { useToast } from "@/hooks/use-toast";

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

export default function ApiReaderPage() {
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState("1");
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-slate-200">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight">Bible Reader</h1>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger className="w-[160px] bg-slate-800 border-slate-700 h-10 text-xs font-medium focus:ring-blue-500">
              <SelectValue placeholder="Select Book" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200 max-h-[300px]">
              {BIBLE_BOOKS.map((b) => (
                <SelectItem key={b} value={b} className="text-xs hover:bg-slate-800 focus:bg-slate-800">
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger className="w-[110px] bg-slate-800 border-slate-700 h-10 text-xs font-medium focus:ring-blue-500">
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
              {[...Array(150)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()} className="text-xs">
                  Chapter {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-[110px] bg-slate-800 border-slate-700 h-10 text-[10px] font-bold uppercase tracking-wider focus:ring-blue-500">
              <SelectValue placeholder="Version" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
              {SUPPORTED_VERSIONS.map((v) => (
                <SelectItem key={v.id} value={v.id} className="text-[10px] font-bold uppercase">
                  {v.name.split(' ').map(word => word[0]).join('')} ({v.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300 gap-2 h-10 px-4 rounded-lg transition-colors">
              <Headphones className="h-4 w-4" />
              <span className="text-xs font-semibold">Listen</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300 gap-2 h-10 px-4 rounded-lg transition-colors">
              <BookMarked className="h-4 w-4" />
              <span className="text-xs font-semibold">Study</span>
            </Button>
            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden h-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevChapter}
                className="bg-slate-800 border-r border-slate-700 hover:bg-slate-700 rounded-none w-10 h-10 text-slate-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNextChapter}
                className="bg-slate-800 hover:bg-slate-700 rounded-none w-10 h-10 text-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-[#1E293B] border-none shadow-2xl rounded-2xl min-h-[600px] flex flex-col overflow-hidden">
          <div className="p-12 md:p-16 flex-1 text-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-40">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="text-sm font-medium tracking-wide">Retrieving Sacred Text...</p>
              </div>
            ) : scripture ? (
              <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white">{scripture.reference}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    {SUPPORTED_VERSIONS.find(v => v.id === version)?.name || "OFFICIAL VERSION"}
                  </p>
                  <div className="w-1/4 h-px bg-slate-700 mx-auto mt-8" />
                </div>
                
                <div className="text-left">
                  <div 
                    className="prose prose-invert prose-slate max-w-none bible-text-display"
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

          <div className="p-8 pt-4 border-t border-slate-800 bg-slate-900/30 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Content provided by API.Bible • American Bible Society</span>
            <span className="flex items-center gap-1.5 italic">
              Powered by Scripture Engine v1.0
            </span>
          </div>
        </Card>
      </main>

      <style jsx global>{`
        .bible-text-display {
          font-family: 'Inter', sans-serif;
          font-size: 1.125rem;
          line-height: 1.85;
          color: #CBD5E1;
        }
        .bible-text-display sup {
          font-size: 0.65rem;
          font-weight: 700;
          color: #64748B;
          margin-right: 0.5rem;
          vertical-align: super;
        }
        .bible-text-display p {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}

/**
 * Basic formatting to handle verse numbers if they appear as text
 * In a real app, API.Bible returns specific HTML/JSON that would be parsed.
 */
function formatBibleText(text: string): string {
  // Simple regex to find numbers and wrap them in sup tags for styling
  // This is a basic simulation of how scholarly readers handle verse numbering
  return text
    .replace(/(\d+)/g, '<sup>$1</sup>')
    .split('\n')
    .map(para => para.trim() ? `<p>${para}</p>` : '')
    .join('');
}
