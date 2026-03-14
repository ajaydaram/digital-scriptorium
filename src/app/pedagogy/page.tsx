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
  Search, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Brain,
  ShieldCheck,
  Zap,
  Table,
  PenTool
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PEDAGOGICAL_PATHS = [
  {
    title: "Chronological Path",
    subtitle: "Focus: The Narrative Arc",
    learn: "Read in the order events occurred to master historical context.",
    duration: "365 days",
    bestFor: "History lovers and narrative thinkers",
    strategy: "Ink-coded historical links & Timeline Headers",
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
    bestFor: "Theologians and systematic thinkers",
    strategy: "Cross-referencing margins & Thematic Echoes",
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
    bestFor: "Literary students and hermeneutics enthusiasts",
    strategy: "Stanza lineation & Narrative Arc sketches",
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

const IMPLEMENTATION_TIPS = [
  { element: "Scaffolded Learning", application: "Start with the 180-day Genre path to learn HOW to read before the 365-day trek.", icon: Brain },
  { element: "Spaced Repetition", application: "At the start of each session, re-read (out loud) the last three pages you scribed.", icon: History },
  { element: "Metacognition", application: "Use the bottom 'Scribe's Reflection' for daily growth notes.", icon: GraduationCap }
];

export default function PedagogyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">
              OUR SCRIPTORIUM METHODOLOGY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Scribal <span className="gradient-text">Pedagogy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              We transform the act of reading into a deep, meditative study by aligning your pen with chosen learning logic.
            </p>
          </div>
        </section>

        {/* Guided Learning Paths */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">The Three Scriptorium Paths</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Each path physically changes how you engage with the text, building specialized interpretive skills through scribal strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PEDAGOGICAL_PATHS.map((path) => (
                <Card key={path.title} className={cn("border-slate-100 flex flex-col hover:shadow-xl transition-shadow duration-300", path.bg)}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-3 rounded-2xl bg-white shadow-sm", path.color)}>
                        <path.icon className="h-6 w-6" />
                      </div>
                      <Badge className={cn("font-bold tracking-widest uppercase text-[10px]", path.badge)}>
                        {path.title.split(" ")[0]}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-headline font-bold text-slate-900">{path.title}</CardTitle>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-widest pt-1">{path.subtitle}</p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Scribe's Strategy</p>
                      <p className="text-sm text-slate-700 font-bold">{path.strategy}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                        <p className="text-xs font-bold text-slate-900">{path.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Focus</p>
                        <p className="text-xs font-bold text-slate-900">{path.subtitle.split(": ")[1]}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Scribal Mastery</p>
                      <ul className="space-y-3">
                        {path.discoveries.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className={cn("h-4 w-4 shrink-0 mt-0.5", path.color)} />
                            <span className="text-xs text-slate-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-auto">
                      <div className="p-4 bg-white/60 rounded-xl border border-white/40 italic">
                        <p className="text-[10px] font-bold text-slate-400 uppercase not-italic mb-1">Layout Example</p>
                        <p className="text-xs text-slate-700 leading-relaxed">{path.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Table Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest mb-4">WORKFLOW</Badge>
                 <h2 className="text-4xl font-headline font-bold mb-6">Workspace Implementation</h2>
                 <p className="text-slate-400 text-lg mb-10">Apply these scribal principles to your daily study rhythm for long-term retention and theological growth.</p>
                 
                 <div className="space-y-6">
                   {IMPLEMENTATION_TIPS.map((tip) => (
                     <div key={tip.element} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                        <div className="p-3 bg-slate-800 rounded-xl text-primary group-hover:scale-110 transition-transform">
                          <tip.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">{tip.element}</h4>
                          <p className="text-sm text-slate-400">{tip.application}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
                <h3 className="text-2xl font-headline font-bold text-center">Implementation Summary</h3>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <tr>
                        <th className="p-4">Element</th>
                        <th className="p-4">Scriptorium Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="p-4 font-bold">Lineation</td>
                        <td className="p-4 text-slate-400">Poetry indented; Epistles in dense logical blocks.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold">Margins</td>
                        <td className="p-4 text-slate-400">Wide left for Cross-Refs; Bottom for Reflection.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold">Metacognition</td>
                        <td className="p-4 text-slate-400">Scribe's Reflection area for learning assessment.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link href="/reader">
                    <Button className="btn-gradient px-8 py-6 h-auto font-bold rounded-xl shadow-xl shadow-primary/20">
                      Launch Scriptorium Reader <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 mb-4">
            © 2025 The Scriptorium. Powered by API.Bible from American Bible Society.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">Next.js 15</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">TypeScript</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">Tailwind CSS</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
