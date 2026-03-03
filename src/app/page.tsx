"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ReadingPathsSection } from "@/components/reading-paths";
import { AnnotationMock } from "@/components/annotation-mock";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden lg:py-32">
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Scholarly Excellence for Everyone</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-[1.1]">
                  Bridge the Gap from <br />
                  <span className="gradient-text font-bold">Casual to Deep Study</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Most Bible apps are either too simple (like YouVersion) or too complex (like Logos). The Scriptorium is the perfect bridge—helping everyday believers grow without needing a seminary degree.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/demo">
                    <Button size="lg" className="btn-gradient text-lg px-8 py-7 h-auto font-bold shadow-xl shadow-primary/20 gap-2">
                      <Play className="h-5 w-5 fill-current" /> Interactive Demo
                    </Button>
                  </Link>
                  <Link href="/reader">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-7 h-auto font-bold border-slate-200">
                      Start Your Journey
                    </Button>
                  </Link>
                </div>
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale contrast-125">
                   <div className="flex items-center gap-2 font-headline font-bold">
                    <div className="w-8 h-8 rounded-full bg-slate-300" /> ACADEMIA
                   </div>
                   <div className="flex items-center gap-2 font-headline font-bold">
                    <div className="w-8 h-8 rounded-full bg-slate-300" /> THEOLOGOS
                   </div>
                   <div className="flex items-center gap-2 font-headline font-bold">
                    <div className="w-8 h-8 rounded-full bg-slate-300" /> HERMENEUTICS
                   </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-2xl">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-gradient opacity-20 blur-3xl rounded-full" />
                  <AnnotationMock />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReadingPathsSection />

        {/* Feature Highlights */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="flex-1 order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                    <div className="p-1 rounded-2xl bg-brand-gradient">
                      <div className="bg-white p-6 rounded-[calc(1rem-4px)]">
                        <h4 className="font-bold text-lg mb-2">Enhanced Reader</h4>
                        <p className="text-sm text-slate-500">Real-time scholarly annotations and cross-references.</p>
                      </div>
                    </div>
                     <div className="p-1 rounded-2xl bg-brand-gradient">
                      <div className="bg-white p-6 rounded-[calc(1rem-4px)]">
                        <h4 className="font-bold text-lg mb-2">Guided Ascent</h4>
                        <p className="text-sm text-slate-500">Track your progression from reading to mastery.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-1 rounded-2xl bg-brand-gradient">
                      <div className="bg-white p-6 rounded-[calc(1rem-4px)]">
                        <h4 className="font-bold text-lg mb-2">AI Insights</h4>
                        <p className="text-sm text-slate-500">Instant context-specific explanations for difficult passages.</p>
                      </div>
                    </div>
                    <div className="p-1 rounded-2xl bg-brand-gradient">
                      <div className="bg-white p-6 rounded-[calc(1rem-4px)]">
                        <h4 className="font-bold text-lg mb-2">Community Hub</h4>
                        <p className="text-sm text-slate-500">Learn alongside scholars and passionate readers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl font-headline font-bold mb-6">Designed for Depth, Built for Modern Life</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Most Bible apps focus on streaks and quick verses. We focus on comprehension. Our interface is designed to reduce cognitive load while maximizing scholarly engagement.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-medium text-slate-700">Distraction-free reading environment</p>
                  </li>
                  <li className="flex items-start gap-3">
                     <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-medium text-slate-700">Integrated Greek & Hebrew word studies</p>
                  </li>
                  <li className="flex items-start gap-3">
                     <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="font-medium text-slate-700">Research-backed learning milestones</p>
                  </li>
                </ul>
                <Button className="btn-gradient px-8">Discover the Features</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-white font-headline font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/demo" className="hover:text-primary transition-colors">Interactive Demo</Link></li>
                <li><Link href="/paths" className="hover:text-primary transition-colors">Reading Paths</Link></li>
                <li><Link href="/reader" className="hover:text-primary transition-colors">Bible Reader</Link></li>
                <li><Link href="/hub" className="hover:text-primary transition-colors">Study Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-6">Community</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Scholar Network</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Study Groups</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Annotation Feed</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Version History</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Licensing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <BookOpen className="h-6 w-6 text-accent" />
              <p className="text-xs text-slate-500">
                © 2025 The Scriptorium. Powered by API.Bible from American Bible Society.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-0 px-2 rounded-sm h-5">Next.js 15</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-0 px-2 rounded-sm h-5">TypeScript</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-0 px-2 rounded-sm h-5">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
