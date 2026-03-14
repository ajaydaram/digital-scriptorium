"use client";

import { Navbar } from "@/components/navbar";
import { ReadingPathsSection } from "@/components/reading-paths";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  History, 
  Lightbulb, 
  Library, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PATH_CARDS = [
  {
    id: "chronological",
    title: "Chronological Path",
    subtitle: "GRAND HISTORICAL NARRATIVE",
    description: "Follow the Bible's timeline. Read the Bible in the order events actually happened.",
    icon: History,
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    link: "/reader?path=chronological&day=1",
    active: true
  },
  {
    id: "thematic",
    title: "Thematic Path",
    subtitle: "THEOLOGICAL UNITY",
    description: "Trace big ideas through Scripture. Follow major themes like kingdom, justice, or love.",
    icon: Lightbulb,
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
    link: "/reader?path=thematic&day=22",
    active: true
  },
  {
    id: "genre",
    title: "Genre Path",
    subtitle: "LITERARY PRECISION",
    description: "Learn to read literature types. 7-Day Starter: Master the Parables of Jesus.",
    icon: Library,
    color: "text-purple-500",
    bg: "bg-purple-50/50",
    link: "/reader?path=genre&day=1",
    active: true
  }
];

export default function ReadingPathsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-[0.2em]">
              PEDAGOGICAL FRAMEWORK
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Choose Your <span className="gradient-text">Learning Path</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              Move beyond random reading. Each path provides a structured "smart preset" to help you master biblical interpretive skills.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PATH_CARDS.map((path) => (
              <Card key={path.id} className={cn(
                "border-none shadow-xl rounded-[2rem] overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500",
                path.bg
              )}>
                <CardHeader className="p-10 pb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110", path.color)}>
                      <path.icon className="h-7 w-7" />
                    </div>
                    {path.active && (
                      <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px] tracking-widest uppercase">
                        READY
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold mb-2">{path.title}</CardTitle>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {path.subtitle}
                  </p>
                  <CardDescription className="text-slate-500 leading-relaxed font-body text-sm">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 mt-auto">
                  <Link href={path.link}>
                    <Button 
                      className={cn(
                        "w-full font-bold h-14 rounded-2xl text-sm group-hover:shadow-lg transition-all",
                        path.active ? "btn-gradient" : "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200"
                      )}
                      disabled={!path.active}
                    >
                      {path.active ? "Start Journey" : "Coming Soon"} 
                      {path.active && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gradient opacity-10 blur-[100px]" />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 flex-1">
                   <div className="flex items-center gap-2 text-primary">
                     <Sparkles className="h-5 w-5" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Active Methodology</span>
                   </div>
                   <h2 className="text-3xl font-headline font-bold">The Three Paths framework ensures you never study in isolation.</h2>
                   <p className="text-slate-400 leading-relaxed max-w-xl">
                     By following a specific path, you join a cohort of scholars engaging with the same text, developing the same interpretive skills through shared community insights.
                   </p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 w-full md:w-auto">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                      <span className="font-bold">Select Your Preset</span>
                   </div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
                      <span className="font-bold">Launch Enhanced Reader</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">3</div>
                      <span className="font-bold">Engage & Annotate</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
