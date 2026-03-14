"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Lightbulb, 
  Library, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Brain,
  Zap,
  BookOpen,
  Microscope,
  ScrollText,
  Users
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PEDAGOGICAL_PATHS = [
  {
    title: "Chronological Path",
    subtitle: "Focus: The Narrative Arc",
    learn: "Read in the order events occurred to master historical context.",
    duration: "365 days",
    strategy: "Historical Contextualization",
    discoveries: [
      "Psalms integrated with David's life",
      "Prophets placed in their historical setting",
      "Historical link identification",
      "Grand Narrative visualization"
    ],
    example: "Read 2 Samuel alongside the specific Psalms David wrote during those events.",
    icon: History,
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    badge: "bg-blue-100/50 text-blue-700 border-blue-200/50"
  },
  {
    title: "Thematic Path",
    subtitle: "Focus: Interconnectivity",
    learn: "Trace 'Golden Threads' across the canon for theological unity.",
    duration: "260 days",
    strategy: "Canonical Reading",
    discoveries: [
      "Canonical reading (Scripture interpreting Scripture)",
      "Covenantal progression mapping",
      "Thematic interconnectivity",
      "Systematic doctrine building"
    ],
    example: "Study the 'Covenant' in Genesis while noting its echoes in Hebrews.",
    icon: Lightbulb,
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
    badge: "bg-emerald-100/50 text-emerald-700 border-emerald-200/50"
  },
  {
    title: "Genre Path",
    subtitle: "Focus: Literary Form",
    learn: "Learn distinct lineation for Poetry, Law, and Epistles.",
    duration: "180 days",
    strategy: "Genre Awareness",
    discoveries: [
      "Indented parallel lines for Hebrew poetry",
      "Logical connector highlights in Epistles",
      "Narrative arc mapping for parables",
      "Form-based interpretive precision"
    ],
    example: "Write Psalms in stanzas to visualize the underlying poetic structure.",
    icon: Library,
    color: "text-purple-500",
    bg: "bg-purple-50/50",
    badge: "bg-purple-100/50 text-purple-700 border-purple-200/50"
  }
];

const EDUCATIONAL_PRINCIPLES = [
  { title: "Scaffolded Learning", description: "Progressive complexity building from reading to mastery.", icon: Brain },
  { title: "Multiple Intelligences", description: "Accommodating various learning styles through visual and textual engagement.", icon: Zap },
  { title: "Spaced Repetition", description: "Long-term retention optimized through systematic review.", icon: History },
  { title: "Social Learning", description: "Community-based knowledge construction through shared annotations.", icon: Users },
  { title: "Metacognitive Development", description: "Teaching scholars how to learn and reflect on their progress.", icon: GraduationCap }
];

const RESEARCH_FOUNDATIONS = [
  { title: "Genre Awareness", detail: "Critical for accurate interpretation of diverse biblical literature.", icon: Library },
  { title: "Historical Context", detail: "Essential for understanding the author's original meaning.", icon: History },
  { title: "Canonical Reading", detail: "The principle of Scripture interpreting Scripture.", icon: BookOpen },
  { title: "Community Hermeneutics", detail: "Collective interpretive wisdom across the global Scriptorium.", icon: Users },
  { title: "Formative Reading", detail: "Scripture shaping life and character, not just transferring information.", icon: ScrollText }
];

export default function PedagogyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary font-bold uppercase tracking-widest text-xs">
              OUR SCRIPTORIUM METHODOLOGY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Scribal <span className="gradient-text">Pedagogy</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              Our "Three Paths" approach is grounded in biblical literacy and educational research, transforming reading into deep, meditative study.
            </p>
          </div>
        </section>

        {/* Research Foundation Section */}
        <section className="py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 space-y-6">
                <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-xs px-4 py-1.5">
                  RESEARCH FOUNDATION
                </Badge>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900">The Science of Study</h2>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-body">
                  The Scriptorium's methodology is built on established educational principles and rigorous biblical literacy research.
                </p>
                <div className="pt-4">
                  <Microscope className="h-16 w-16 text-slate-200" />
                </div>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {RESEARCH_FOUNDATIONS.map((item) => (
                  <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm md:text-base text-slate-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Educational Principles */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-white/10 text-white border-white/20 font-bold uppercase tracking-widest text-xs px-4 py-1.5 mb-4">
                EDUCATIONAL PRINCIPLES
              </Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">How We Teach</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {EDUCATIONAL_PRINCIPLES.map((principle) => (
                <div key={principle.title} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="p-4 bg-primary/20 rounded-2xl mb-6">
                    <principle.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">{principle.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guided Learning Paths */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/20 text-primary font-bold uppercase tracking-widest text-xs">
                SYSTEMATIC APPROACH
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">The Three Scriptorium Paths</h2>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-body">
                Each path builds specialized interpretive skills, aligning your study logic with the Bible's inherent architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PEDAGOGICAL_PATHS.map((path) => (
                <Card key={path.title} className={cn("border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]", path.bg)}>
                  <CardHeader className="p-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn("p-4 rounded-2xl bg-white shadow-sm", path.color)}>
                        <path.icon className="h-7 w-7" />
                      </div>
                      <Badge className={cn("font-bold tracking-widest uppercase text-[10px] px-3 py-1", path.badge)}>
                        {path.title.split(" ")[0]}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-headline font-bold text-slate-900">{path.title}</CardTitle>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-widest pt-2">{path.subtitle}</p>
                  </CardHeader>
                  <CardContent className="flex-1 px-10 pb-10 space-y-8">
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scribe's Strategy</p>
                      <p className="text-base md:text-lg text-slate-700 font-bold leading-tight">{path.strategy}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scribal Mastery</p>
                      <ul className="space-y-4">
                        {path.discoveries.map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle2 className={cn("h-5 w-5 shrink-0 mt-0.5", path.color)} />
                            <span className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-auto">
                      <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 italic shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase not-italic mb-2 tracking-widest">Layout Example</p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">{path.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 tracking-tight">Experience Research-Backed Study</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/reader">
                <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold rounded-2xl shadow-xl shadow-primary/20 text-lg">
                  Launch Bible Reader
                </Button>
              </Link>
              <Link href="/paths">
                <Button variant="outline" size="lg" className="px-12 py-8 h-auto font-bold rounded-2xl border-slate-200 text-lg hover:bg-white">
                  Explore Learning Paths
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 mb-6 font-medium">
            © 2025 The Scriptorium. Powered by API.Bible • American Bible Society.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[11px] px-3 py-1">Next.js 15</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[11px] px-3 py-1">TypeScript</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[11px] px-3 py-1">Genkit AI</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
