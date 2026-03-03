
"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ReadingPathsSection } from "@/components/reading-paths";
import { AnnotationMock } from "@/components/annotation-mock";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden lg:py-32 bg-white">
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Scholarly Excellence for Everyone</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-headline font-bold mb-8 leading-[1.1] tracking-tight">
                  <span className="gradient-text">Bridge the Gap from <br /> Casual to Deep Study</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
                  Most Bible apps are either too simple (like YouVersion) or too complex (like Logos). The Scriptorium is the perfect bridge—helping everyday believers grow without needing a seminary degree.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                  <Link href="/demo">
                    <Button size="lg" className="btn-gradient text-lg px-10 py-8 h-auto font-bold shadow-2xl shadow-primary/25 gap-3 rounded-xl hover:scale-[1.02] transition-transform">
                      <Play className="h-5 w-5 fill-current" /> Interactive Demo
                    </Button>
                  </Link>
                  <Link href="/reader">
                    <Button variant="outline" size="lg" className="text-lg px-10 py-8 h-auto font-bold border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      Start Your Journey
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 flex items-center justify-center lg:justify-start gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                   <div className="flex items-center gap-2 font-headline font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-slate-200" /> ACADEMIA
                   </div>
                   <div className="flex items-center gap-2 font-headline font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-slate-200" /> THEOLOGOS
                   </div>
                   <div className="flex items-center gap-2 font-headline font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-slate-200" /> HERMENEUTICS
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

        <ReadingPathsSection />

        {/* Feature Highlights */}
        <section className="py-24 bg-slate-50/50 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="flex-1 order-2 md:order-1">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 translate-y-12">
                    <div className="p-0.5 rounded-2xl bg-brand-gradient shadow-lg">
                      <div className="bg-white p-8 rounded-[calc(1rem-2px)]">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-2">Enhanced Reader</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-body">Real-time scholarly annotations and cross-references.</p>
                      </div>
                    </div>
                     <div className="p-0.5 rounded-2xl bg-brand-gradient shadow-lg">
                      <div className="bg-white p-8 rounded-[calc(1rem-2px)]">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                          <ArrowRight className="h-5 w-5 text-accent" />
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-2">Guided Ascent</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-body">Track your progression from reading to mastery.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-0.5 rounded-2xl bg-brand-gradient shadow-lg">
                      <div className="bg-white p-8 rounded-[calc(1rem-2px)]">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-2">AI Insights</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-body">Instant context-specific explanations for difficult passages.</p>
                      </div>
                    </div>
                    <div className="p-0.5 rounded-2xl bg-brand-gradient shadow-lg">
                      <div className="bg-white p-8 rounded-[calc(1rem-2px)]">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                          <ArrowRight className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-2">Community Hub</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-body">Learn alongside scholars and passionate readers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 tracking-tight">Designed for Depth, Built for Modern Life</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-body">
                  Most Bible apps focus on streaks and quick verses. We focus on comprehension. Our interface is designed to reduce cognitive load while maximizing scholarly engagement.
                </p>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-semibold text-slate-700 font-body">Distraction-free reading environment</p>
                  </li>
                  <li className="flex items-center gap-4">
                     <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-semibold text-slate-700 font-body">Integrated Greek & Hebrew word studies</p>
                  </li>
                  <li className="flex items-center gap-4">
                     <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-semibold text-slate-700 font-body">Research-backed learning milestones</p>
                  </li>
                </ul>
                <Button className="btn-gradient px-10 py-6 h-auto font-bold rounded-xl shadow-lg shadow-primary/20">Discover the Features</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-20 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Platform</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="/demo" className="hover:text-primary transition-colors">Interactive Demo</Link></li>
                <li><Link href="/paths" className="hover:text-primary transition-colors">Reading Paths</Link></li>
                <li><Link href="/reader" className="hover:text-primary transition-colors">Bible Reader</Link></li>
                <li><Link href="/hub" className="hover:text-primary transition-colors">Study Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Community</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="#" className="hover:text-primary transition-colors">Scholar Network</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Study Groups</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Annotation Feed</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Support</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Version History</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Legal</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Licensing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <BookOpen className="h-6 w-6 text-accent" />
              <p className="text-sm text-slate-500 font-body">
                © 2025 The Scriptorium. Powered by API.Bible from American Bible Society.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono">Next.js 15</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono">TypeScript</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
