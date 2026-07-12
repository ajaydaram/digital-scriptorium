"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ReadingPathsSection } from "@/components/reading-paths";
import { AnnotationMock } from "@/components/annotation-mock";
import { UserJourney } from "@/components/user-journey";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section: The Scriptorium Entrance */}
        <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden">
          {/* Subtle background flourishes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 blur-[120px] rounded-full" />
          </div>

          <div className="container relative z-10 mx-auto px-6">
            <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
              <Badge variant="outline" className="px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-600 border-blue-200 bg-blue-50/50">
                Academic Bible Engagement
              </Badge>
              
              <h1 className="text-6xl md:text-9xl font-headline font-bold leading-[0.9] tracking-tighter text-slate-900">
                From Casual to <br /> 
                <span className="gradient-text">Deep Study</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-body">
                A research-backed platform for serious scripture engagement. Master the Bible through structured paths, community hermeneutics, and AI-powered insights.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <Link href="/reader" className="w-full sm:w-auto">
                  <Button size="lg" className="btn-gradient h-16 px-12 font-bold text-lg rounded-2xl w-full shadow-2xl shadow-blue-500/20">
                    Launch Enhanced Reader
                  </Button>
                </Link>
                <Link href="/paths" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-16 px-12 font-bold text-lg rounded-2xl w-full border-slate-200 hover:bg-slate-50 text-slate-900">
                    Explore 3 Paths
                  </Button>
                </Link>
              </div>

              <div className="pt-12 flex flex-wrap justify-center gap-12">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" /> Research-Backed
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <Sparkles className="h-5 w-5 text-blue-500" /> AI Guided
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <Zap className="h-5 w-5 text-purple-500" /> Collaborative
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Anchor: The Reader Interface Mock */}
        <section className="pb-20">
           <div className="container mx-auto px-6">
              <div className="relative group max-w-6xl mx-auto">
                <div className="absolute -inset-10 bg-brand-gradient/5 blur-[100px] rounded-full opacity-50" />
                <div className="relative z-10 border border-slate-100 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
                  <AnnotationMock />
                </div>
              </div>
           </div>
        </section>

        {/* The Scholar's Journey Section */}
        <section className="py-20 border-t border-slate-100 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="px-5 py-1.5 text-primary font-bold uppercase tracking-widest border-slate-200">THE METHODOLOGY</Badge>
              <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-slate-900">The Scholar's Journey</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                From initial curiosity to authoritative mentorship—a scaffolded approach to biblical literacy.
              </p>
            </div>
            <UserJourney />
          </div>
        </section>

        {/* The Three Paths Framework */}
        <section className="py-20 border-t border-slate-100 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 space-y-4">
              <Badge variant="outline" className="px-5 py-1.5 text-primary font-bold uppercase tracking-widest border-slate-200">PEDAGOGICAL FRAMEWORK</Badge>
              <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-slate-900">Three Structured Paths</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Move beyond random reading. Each path provides a specific lens to master the Bible's architecture.
              </p>
            </div>
            <ReadingPathsSection />
          </div>
        </section>

        {/* Final CTA: High Impact Conversion */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-[150px] -translate-y-1/2" />
          <div className="container relative z-10 mx-auto px-6 text-center space-y-8">
             <h2 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-[1]">
               Ready to Deepen <br /> Your Study?
             </h2>
             <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
               Join a global community of students moving beyond the surface into the riches of God's Word.
             </p>
             <div className="flex justify-center pt-8">
                <Link href="/reader">
                  <Button size="lg" className="btn-gradient h-20 px-16 font-bold text-xl rounded-2xl shadow-3xl hover:scale-105 transition-transform">
                    Start Your Journey Today <ArrowRight className="h-6 w-6 ml-4" />
                  </Button>
                </Link>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-headline font-bold text-2xl tracking-tighter text-slate-900">The Scriptorium</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Scribal Excellence</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <Link href="/paths" className="hover:text-blue-600 transition-colors">Paths</Link>
              <Link href="/pedagogy" className="hover:text-blue-600 transition-colors">Pedagogy</Link>
              <Link href="/hub" className="hover:text-blue-600 transition-colors">Study Hub</Link>
              <Link href="/demo" className="hover:text-blue-600 transition-colors">Platform</Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 font-medium">
                © 2025 Scriptorium. Content by API.Bible.
              </p>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">American Bible Society</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
