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
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <Badge variant="secondary" className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-muted text-muted-foreground border-none">
                  Academic Bible Engagement
                </Badge>
                
                <h1 className="text-5xl md:text-8xl font-headline font-bold leading-[1] tracking-tighter">
                  From Casual to <br /> 
                  <span className="gradient-text">Deep Study</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
                  A research-backed platform for serious scripture engagement. Master the Bible through structured paths, community hermeneutics, and AI insights.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                  <Link href="/reader" className="w-full sm:w-auto">
                    <Button size="lg" className="h-16 px-10 font-bold text-lg rounded-xl w-full">
                      Launch Enhanced Reader
                    </Button>
                  </Link>
                  <Link href="/paths" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="h-16 px-10 font-bold text-lg rounded-xl w-full border-border">
                      Explore 3 Paths
                    </Button>
                  </Link>
                </div>

                <div className="pt-10 flex flex-wrap justify-center lg:justify-start gap-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Research-Backed
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <CheckCircle2 className="h-5 w-5 text-blue-500" /> Collaborative
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-10 bg-brand-gradient/10 blur-[100px] rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative z-10 border border-border rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-white">
                  <AnnotationMock />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Section */}
        <section className="py-32 border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 tracking-tighter">The Scholar's Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-20 leading-relaxed">
              From initial curiosity to authoritative mentorship—a scaffolded approach to biblical literacy.
            </p>
            <UserJourney />
          </div>
        </section>

        {/* Framework Section */}
        <section className="py-32 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 px-5 py-1.5 text-primary font-bold uppercase tracking-widest border-border">PEDAGOGICAL FRAMEWORK</Badge>
              <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">Three Structured Paths</h2>
            </div>
            <ReadingPathsSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
          <div className="container relative z-10 mx-auto px-4 text-center space-y-12">
             <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">
               Ready to Deepen Your Study?
             </h2>
             <p className="text-2xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
               Join a global community of students moving beyond the surface into the riches of God's Word.
             </p>
             <div className="flex justify-center pt-8">
                <Link href="/reader">
                  <Button size="lg" variant="secondary" className="h-20 px-16 font-bold text-xl rounded-2xl shadow-2xl hover:scale-105 transition-transform">
                    Start Your Journey Today <ArrowRight className="h-6 w-6 ml-3" />
                  </Button>
                </Link>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="font-headline font-bold text-2xl tracking-tighter">The Scriptorium</span>
            </div>
            <div className="flex gap-10 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <Link href="/paths" className="hover:text-primary transition-colors">Paths</Link>
              <Link href="/pedagogy" className="hover:text-primary transition-colors">Pedagogy</Link>
              <Link href="/hub" className="hover:text-primary transition-colors">Study Hub</Link>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              © 2025 Scriptorium. Content by API.Bible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}