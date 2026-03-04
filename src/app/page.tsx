"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ReadingPathsSection } from "@/components/reading-paths";
import { AnnotationMock } from "@/components/annotation-mock";
import { GuidedAscentStepper } from "@/components/guided-ascent-stepper";
import { UserJourney } from "@/components/user-journey";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  BookOpen, 
  Search, 
  Globe, 
  Link2, 
  Users, 
  MessageSquare, 
  MessageCircle,
  BookText,
  Milestone,
  TrendingUp,
  Library,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const PLATFORM_FEATURES = [
  {
    title: "Clean Reading Interface",
    description: "Distraction-free Bible reading with beautiful typography, adjustable text size, and focus on content over features.",
    icon: BookText,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Structured Reading Paths",
    description: "Three research-backed approaches to systematic Bible study with clear progression and skill development.",
    icon: Milestone,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Community Study Groups",
    description: "Join others on the same reading path, share insights, and encourage each other in consistent study habits.",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "Social Annotations",
    description: "Collaborative highlighting and note-taking with community insights and moderated discussions.",
    icon: MessageSquare,
    color: "text-accent",
    bg: "bg-purple-50/50"
  },
  {
    title: "Progress Tracking",
    description: "Visual progress indicators, streak tracking, and completion badges to maintain motivation and accountability.",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "Study Hub Resources",
    description: "Contextual maps, timelines, commentaries, and word studies integrated into the reading experience.",
    icon: Library,
    color: "text-primary",
    bg: "bg-primary/5"
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10">
      {/* Beta Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium">
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-white border-white/30 bg-white/10 uppercase tracking-widest text-[10px]">BETA</Badge>
          <span>🎉 The Scriptorium is now live! Help us test and improve the platform.</span>
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden lg:py-32 bg-white">
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    285+ Bible Versions • 175+ Languages • Powered by API.Bible
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-headline font-bold mb-8 leading-[1.1] tracking-tight">
                  <span className="gradient-text">Bridge the Gap from <br /> Casual to Deep Study</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
                  The Scriptorium is the perfect bridge—helping everyday believers grow from basic reading to meaningful study without needing a seminary degree.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                  <Link href="/reader">
                    <Button size="lg" className="btn-gradient text-lg px-10 py-8 h-auto font-bold shadow-2xl shadow-primary/25 gap-3 rounded-xl hover:scale-[1.02] transition-transform">
                      Start Enhanced Reading <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/paths">
                    <Button variant="outline" size="lg" className="text-lg px-10 py-8 h-auto font-bold border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      Explore Three Paths
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Users className="h-4 w-4" /> Real-time Collaboration
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Search className="h-4 w-4" /> Advanced Search
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Globe className="h-4 w-4" /> Multi-Language
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-2xl relative">
                <div className="absolute -inset-10 bg-brand-gradient opacity-10 blur-[100px] rounded-full animate-pulse" />
                <div className="relative z-10">
                  <AnnotationMock />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">USER JOURNEY</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-slate-900">
                Your Learning Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
                From curious beginner to confident Bible student - here's how The Scriptorium guides your growth.
              </p>
            </div>

            <UserJourney />
          </div>
        </section>

        {/* Pedagogical Framework Section */}
        <section className="py-24 bg-slate-50/30 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">PEDAGOGICAL FRAMEWORK</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-slate-900">
                Three Structured Paths to Biblical Mastery
              </h2>
            </div>
            
            <ReadingPathsSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-[120px] tune-in-glow" />
          <div className="container relative z-10 mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-8 tracking-tight">
               Ready to Transform Your Bible Study?
             </h2>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
               Stop settling for shallow devotionals. Start your journey toward deep, collaborative Scripture engagement today.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/reader">
                  <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold text-lg rounded-xl shadow-2xl shadow-primary/40">
                    Start Enhanced Reading
                  </Button>
                </Link>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-20 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <span className="text-white font-headline font-bold text-xl">The Scriptorium</span>
            </div>
            <p className="text-sm text-slate-500 font-body">
              © 2025 The Scriptorium. Powered by API.Bible • American Bible Society.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
