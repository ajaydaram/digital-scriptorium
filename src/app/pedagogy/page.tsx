
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
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PEDAGOGICAL_PATHS = [
  {
    title: "Chronological Path",
    subtitle: "Follow the Bible's Timeline",
    learn: "Read the Bible in the order events actually happened",
    duration: "365 days",
    bestFor: "First-time Bible readers and history lovers",
    discoveries: [
      "How Old Testament stories connect to Jesus",
      "Why the prophets said what they did",
      "The amazing flow of God's plan through history",
      "Cultural context that makes stories come alive"
    ],
    example: "Read about King David's life, then immediately read the psalms he wrote during those experiences!",
    icon: History,
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    badge: "bg-blue-100/50 text-blue-700 border-blue-200/50"
  },
  {
    title: "Thematic Path",
    subtitle: "Trace Big Ideas Through Scripture",
    learn: "Follow major themes like God's kingdom, justice, or love",
    duration: "260 days",
    bestFor: "Those wanting deeper theological understanding",
    discoveries: [
      "How topics like 'covenant' appear throughout Scripture",
      "Connections between Old and New Testament themes",
      "The Bible's unified message across different books",
      "How to find all verses related to any topic"
    ],
    example: "Week 1 might explore 'God as Father' through Genesis, Psalms, and the Gospels all in one study!",
    icon: Lightbulb,
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
    badge: "bg-emerald-100/50 text-emerald-700 border-emerald-200/50"
  },
  {
    title: "Genre Path",
    subtitle: "Learn to Read Different Types of Biblical Literature",
    learn: "How to read poetry, prophecy, parables, and letters",
    duration: "180 days",
    bestFor: "Those who want to interpret Scripture accurately",
    discoveries: [
      "Why you shouldn't read poetry like history",
      "How to understand Jesus's parables properly",
      "The difference between prophecy and fortune-telling",
      "Why knowing the genre prevents misinterpretation"
    ],
    example: "Learn why 'the mountains will sing' (Psalm 98) isn't about literal singing mountains!",
    icon: Library,
    color: "text-purple-500",
    bg: "bg-purple-50/50",
    badge: "bg-purple-100/50 text-purple-700 border-purple-200/50"
  }
];

const RESEARCH_PRINCIPLES = [
  { title: "Scaffolded Learning", desc: "Progressive complexity building for mastery.", icon: Brain },
  { title: "Multiple Intelligences", desc: "Various learning style accommodation.", icon: Zap },
  { title: "Spaced Repetition", desc: "Long-term retention optimization.", icon: History },
  { title: "Social Learning", desc: "Community-based knowledge construction.", icon: Users },
  { title: "Metacognitive Development", desc: "Teaching students how to learn.", icon: GraduationCap }
];

const LITERACY_RESEARCH = [
  { title: "Genre Awareness", desc: "Critical for accurate interpretation.", icon: BookOpen },
  { title: "Historical Context", desc: "Essential for understanding meaning.", icon: Search },
  { title: "Canonical Reading", desc: "Scripture interpreting Scripture.", icon: Library },
  { title: "Community Hermeneutics", desc: "Collective interpretive wisdom.", icon: Users },
  { title: "Formative Reading", desc: "Scripture shaping life and character.", icon: ShieldCheck }
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
              OUR METHODOLOGY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Our <span className="gradient-text">Pedagogy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              We bridge the gap from casual reading to deep study through a structured, research-backed framework that respects both the text and the learner.
            </p>
          </div>
        </section>

        {/* Guided Learning Paths */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">Three Guided Learning Paths</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Instead of random Bible reading, choose a structured path that teaches you how to read the Bible well. Each path builds specific skills while keeping you engaged and growing.
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
                      <p className="text-xs font-bold text-slate-400 uppercase">What You'll Learn</p>
                      <p className="text-sm text-slate-700 font-medium">{path.learn}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                        <p className="text-xs font-bold text-slate-900">{path.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Best For</p>
                        <p className="text-xs font-bold text-slate-900">{path.bestFor}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">You'll Discover</p>
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
                        <p className="text-[10px] font-bold text-slate-400 uppercase not-italic mb-1">Example</p>
                        <p className="text-xs text-slate-700 leading-relaxed">{path.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Foundation */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-20">
              <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest mb-4">RESEARCH FOUNDATION</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">Grounded in Biblical Literacy and Educational Research</h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto font-body leading-relaxed">
                Our Three Paths approach is not just a plan—it's a scientifically grounded methodology for holistic spiritual formation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Educational Principles */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">Educational Principles</h3>
                </div>
                <div className="grid gap-4">
                  {RESEARCH_PRINCIPLES.map((item) => (
                    <Card key={item.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Biblical Literacy Research */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">Biblical Literacy Research</h3>
                </div>
                <div className="grid gap-4">
                  {LITERACY_RESEARCH.map((item) => (
                    <Card key={item.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 tracking-tight">Ready to Begin Your Scholarly Journey?</h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-10 text-lg font-body">
              Join thousands who are moving beyond surface-level reading through our proven pedagogical framework.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/reader">
                <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold rounded-xl shadow-xl shadow-primary/20 text-lg">
                  Launch Bible Reader
                </Button>
              </Link>
              <Link href="/paths">
                <Button variant="outline" size="lg" className="px-12 py-8 h-auto font-bold rounded-xl border-slate-200 text-lg">
                  Explore Learning Paths
                </Button>
              </Link>
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
