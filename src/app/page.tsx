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
  Users, 
  BookText,
  Milestone,
  TrendingUp,
  Library
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <Badge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Powered by API.Bible
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tighter">
                  Bridge the Gap from <br /> 
                  <span className="gradient-text">Casual to Deep Study</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  The Scriptorium is a research-backed Bible study platform helping everyday believers grow from reading to meaningful engagement.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/reader">
                    <Button size="lg" className="h-14 px-8 font-bold text-lg rounded-md w-full sm:w-auto">
                      Start Enhanced Reading
                    </Button>
                  </Link>
                  <Link href="/paths">
                    <Button variant="outline" size="lg" className="h-14 px-8 font-bold text-lg rounded-md w-full sm:w-auto">
                      Explore Paths
                    </Button>
                  </Link>
                </div>

                <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                    <Users className="h-4 w-4" /> Collaborative
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                    <BookOpen className="h-4 w-4" /> Research-Backed
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                     285+ Versions
                  </div>
                </div>
              </div>

              <div className="relative group perspective-1000">
                <div className="absolute -inset-4 bg-brand-gradient/10 blur-[60px] rounded-full group-hover:bg-brand-gradient/20 transition-all duration-700" />
                <div className="relative z-10 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 hover:rotate-y-2">
                  <AnnotationMock />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Section */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 tracking-tight">Your Learning Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-16">
              From curious beginner to confident mentor - guided growth in biblical understanding.
            </p>
            <UserJourney />
          </div>
        </section>

        {/* Framework Section */}
        <section className="py-24 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-primary font-bold uppercase tracking-widest border-primary/20">METHODOLOGY</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">Three Structured Paths</h2>
            </div>
            <ReadingPathsSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center space-y-8">
             <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
               Transform Your Study Today
             </h2>
             <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
               Join a community moving beyond surface-level reading into deep Scripture engagement.
             </p>
             <div className="flex justify-center pt-4">
                <Link href="/reader">
                  <Button size="lg" variant="secondary" className="h-16 px-12 font-bold text-lg rounded-md shadow-xl hover:scale-105 transition-transform">
                    Launch Bible Reader <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg uppercase tracking-wider">The Scriptorium</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Scriptorium Platform. Powered by API.Bible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}