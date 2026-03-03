"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Target, 
  ShieldCheck,
  Zap,
  BookOpen,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const TARGET_AUDIENCES = [
  {
    title: "Small Group Leaders",
    description: "Who need structured, research-backed curriculum for their groups.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Young Adults",
    description: "Wanting to deepen their faith with intellectual and spiritual rigor.",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "New Christians",
    description: "Ready to move beyond the basics into meaningful study.",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  }
];

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">
              PLATFORM OVERVIEW
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Bridge the Gap from <br />
              <span className="gradient-text">Casual Reading to Deep Study</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed mb-10">
              Most Bible apps are either too simple (like YouVersion) or too complex (like Logos). The Scriptorium is the perfect bridge—helping everyday believers grow without needing a seminary degree.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reader">
                <Button size="lg" className="btn-gradient px-10 py-7 h-auto font-bold rounded-xl shadow-xl shadow-primary/20 text-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-10 py-7 h-auto font-bold rounded-xl border-slate-200 text-lg">
                Explore Features
              </Button>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">The Problem We're Solving</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                The huge gap for everyday believers who want to grow deeper in their understanding of Scripture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Too Simple */}
              <Card className="border-slate-200 bg-slate-50/50 flex flex-col opacity-80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-slate-200 flex items-center justify-center mb-4">
                    <XCircle className="h-6 w-6 text-slate-500" />
                  </div>
                  <CardTitle className="text-xl font-headline font-bold text-slate-900">Too Simple</CardTitle>
                  <CardDescription className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">APPS LIKE YOUVERSION</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3">
                    {["Daily verse snippets", "Shallow devotional content", "No skill development", "Limited community features"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-slate-200 mt-auto">
                    <p className="text-xs font-bold text-slate-500 italic">"Great for beginners, but keeps you at the surface level."</p>
                  </div>
                </CardContent>
              </Card>

              {/* Just Right */}
              <Card className="border-primary/20 bg-white shadow-2xl shadow-primary/10 relative z-10 scale-105 ring-4 ring-primary/5">
                <div className="bg-brand-gradient h-1.5 w-full absolute top-0 left-0 rounded-t-lg" />
                <CardHeader className="pt-8">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold text-primary">Just Right</CardTitle>
                  <CardDescription className="font-bold text-primary/60 uppercase tracking-widest text-[10px]">THE SCRIPTORIUM</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {["Guided learning paths", "Progressive skill building", "Community-based study", "Deep but accessible", "Structured spiritual growth"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm font-bold text-primary italic">"The perfect bridge to deeper, scholarly study."</p>
                  </div>
                </CardContent>
              </Card>

              {/* Too Complex */}
              <Card className="border-slate-200 bg-slate-50/50 flex flex-col opacity-80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-slate-200 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-slate-500" />
                  </div>
                  <CardTitle className="text-xl font-headline font-bold text-slate-900">Too Complex</CardTitle>
                  <CardDescription className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">TOOLS LIKE LOGOS</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3">
                    {["Expensive subscriptions", "Seminary-level complexity", "Overwhelming interface", "Requires extensive training"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-slate-200 mt-auto">
                    <p className="text-xs font-bold text-slate-500 italic">"Great for scholars, but intimidates everyday believers."</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest">TARGET AUDIENCE</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Who Is The Scriptorium For?</h2>
                <p className="text-xl text-slate-400 font-body leading-relaxed">
                  Perfect for believers who want to grow beyond daily devotionals but feel overwhelmed by seminary-level tools.
                </p>
                
                <div className="space-y-6 pt-6">
                  {[
                    "Want to grow beyond daily verse snippets",
                    "Feel intimidated by complex study software",
                    "Want to study the Bible with others meaningfully",
                    "Prefer structured, guided learning",
                    "Want spiritual formation, not just information"
                  ].map((check) => (
                    <div key={check} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="text-lg font-medium text-slate-200">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-headline font-bold mb-8">Perfect For These Groups:</h3>
                <div className="grid gap-6">
                  {TARGET_AUDIENCES.map((audience) => (
                    <Card key={audience.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-default group">
                      <CardContent className="p-6 flex items-start gap-5">
                        <div className={`p-3 rounded-xl ${audience.bg} ${audience.color} group-hover:scale-110 transition-transform`}>
                          <audience.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-headline font-bold text-white mb-1">{audience.title}</h4>
                          <p className="text-slate-400 font-body">{audience.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="pt-8">
                   <div className="p-6 rounded-2xl bg-brand-gradient/10 border border-primary/20 flex items-center justify-between gap-6">
                      <p className="text-sm font-bold text-slate-300 italic">
                        "Ready to experience the perfect bridge for your Bible study?"
                      </p>
                      <Link href="/reader">
                        <Button className="btn-gradient font-bold px-6 py-6 h-auto rounded-xl">
                          Try the Reader <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-headline font-bold mb-6">Start Your Scholarly Journey Today</h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-10 text-lg">
              Join thousands who are moving beyond surface-level reading into deep, collaborative Scripture engagement.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/reader">
                <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold rounded-xl shadow-2xl shadow-primary/20 text-lg">
                  Launch Bible Reader
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
