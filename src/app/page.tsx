
"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ReadingPathsSection } from "@/components/reading-paths";
import { AnnotationMock } from "@/components/annotation-mock";
import { GuidedAscentStepper } from "@/components/guided-ascent-stepper";
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
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10">
      {/* Beta Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium">
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-white border-white/30 bg-white/10 uppercase tracking-widest text-[10px]">BETA</Badge>
          <span>🎉 The Scriptorium is now live! Help us test and improve the platform.</span>
          <button className="underline hover:opacity-80 transition-opacity">Share Feedback →</button>
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
                  Most Bible apps are either too simple (like YouVersion) or too complex (like Logos). The Scriptorium is the perfect bridge—helping everyday believers grow from basic reading to meaningful study without needing a seminary degree.
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

                <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Users className="h-4 w-4" /> Real-time Collaboration
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Search className="h-4 w-4" /> Advanced Search
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <Link2 className="h-4 w-4" /> Cross-References
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

        {/* Pedagogical Framework Section */}
        <section className="py-24 bg-slate-50/30 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">PEDAGOGICAL FRAMEWORK</Badge>
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-slate-900">
                Three Structured Paths to Biblical Mastery
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed font-body">
                Our research-backed pedagogical framework guides you through three complementary approaches to Scripture study, each building essential interpretive skills.
              </p>
            </div>
            
            <ReadingPathsSection />
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="flex-1 space-y-8">
                <Badge variant="secondary" className="font-bold uppercase tracking-widest">ADVANCED FEATURES</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-slate-900">
                  For Deeper Study
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-body">
                  Experience the most comprehensive Bible study platform with cutting-edge technology and authentic biblical content from American Bible Society.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2">285+ Bible Versions</h4>
                      <p className="text-slate-500 font-body leading-relaxed">
                        Access the world's most comprehensive collection of Bible translations across 175+ languages, from ancient manuscripts to modern paraphrases.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-[10px]">ESV</Badge>
                        <Badge variant="outline" className="text-[10px]">NIV</Badge>
                        <Badge variant="outline" className="text-[10px]">KJV</Badge>
                        <Badge variant="outline" className="text-[10px]">Hebrew</Badge>
                        <Badge variant="outline" className="text-[10px]">Greek</Badge>
                        <Badge variant="outline" className="text-primary font-bold text-[10px]">+280 more</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Search className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2">Advanced Search Engine</h4>
                      <p className="text-slate-500 font-body leading-relaxed">
                        Find exactly what you're looking for with our intelligent search that understands context, themes, and cross-references.
                      </p>
                      <p className="text-xs font-mono text-slate-400 mt-2">Search: "love" → 631 results in John</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <Link2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2">Cross-Reference Discovery</h4>
                      <p className="text-slate-500 font-body leading-relaxed">
                        Discover connections throughout Scripture with our intelligent system that reveals thematic and textual relationships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="bg-slate-900 rounded-3xl p-1 shadow-2xl overflow-hidden">
                  <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="mx-auto text-[10px] font-mono text-slate-500 uppercase tracking-widest">Enhanced Bible Reader</div>
                  </div>
                  <div className="bg-white p-8 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b">
                       <div className="flex items-center gap-4">
                         <Badge className="bg-slate-100 text-slate-900 border-none">Read</Badge>
                         <span className="text-slate-300">|</span>
                         <span className="text-sm font-bold text-slate-400">Search</span>
                         <span className="text-slate-300">|</span>
                         <span className="text-sm font-bold text-slate-400">Cross-Ref</span>
                       </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-headline font-bold text-lg text-primary">John 3:16 - Berean Standard Bible</h3>
                      <p className="text-2xl font-serif text-slate-800 leading-relaxed italic">
                        "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life."
                      </p>
                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase font-bold">Cross-refs (12)</Button>
                        <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase font-bold">Notes</Button>
                        <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase font-bold">Share</Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> Real-time Sync
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">285 versions loaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-accent/20 text-accent font-bold uppercase tracking-widest">COMMUNITY FEATURES</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-slate-900">
                Collaborative Scripture Discovery
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
                Transform Bible study from individual reading to community discovery through social annotation and guided discussions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Social Annotation Card */}
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <MessageSquare className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">Social Annotation</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed font-body">
                    Highlight any word, verse, or phrase and attach comments or insights. Your group sees these annotations in real-time, creating a "living commentary" of collective discovery.
                  </p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">JD</span>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">John 3:16 • "loved"</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          The Greek word here is <strong className="text-primary">agape</strong> - unconditional love. This is the same word used in 1 Cor 13.
                        </p>
                        <div className="flex gap-4 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">12 likes</span>
                          <span className="text-[10px] font-bold text-primary uppercase cursor-pointer">Reply</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                    <div className="text-center">
                      <div className="text-xl font-headline font-bold text-accent">3-5x</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Engagement Boost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-headline font-bold text-accent">Deeper</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Comprehension</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-headline font-bold text-accent">Shared</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Meaning-making</div>
                    </div>
                  </div>
               </div>

               {/* Guided Discussions Card */}
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">Guided Discussions</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed font-body">
                    Weekly forums with carefully crafted prompts that stimulate critical thinking and theological reflection, avoiding dead-end conversations.
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">This Week: Romans 8</span>
                          <span className="text-[10px] text-slate-400 font-bold">42 participants</span>
                       </div>
                       <p className="text-sm font-medium text-slate-700 italic">
                         "How does Paul contrast 'life in the flesh' vs 'life in the Spirit'? What practical implications does this have for daily Christian living?"
                       </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-900">Covenant Study Track</span>
                          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Expert Moderated</span>
                       </div>
                       <p className="text-xs text-slate-500">
                         8-week series tracing God's promises from Abraham to Christ.
                       </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-8">
                     <Button className="flex-1 btn-gradient rounded-xl font-bold">Join Discussion</Button>
                     <Button variant="outline" className="flex-1 rounded-xl font-bold border-slate-200">Create Group</Button>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Guided Ascent Intro */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
             <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-8">
                  <Badge variant="outline" className="font-bold uppercase tracking-widest border-primary/20 text-primary">UNIQUE VALUE PROPOSITION</Badge>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">The Guided Ascent</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-body">
                    Bridge the gap between YouVersion's accessibility and Logos' academic depth. Our unique "Guided Ascent" systematically develops your biblical interpretive skills.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-1.5 h-auto bg-primary rounded-full" />
                      <div>
                        <h4 className="font-bold mb-1">Pedagogical Structure</h4>
                        <p className="text-sm text-slate-500">Learn to read with historical context, theological coherence, and literary skill.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1.5 h-auto bg-accent rounded-full" />
                      <div>
                        <h4 className="font-bold mb-1">Collaborative Community</h4>
                        <p className="text-sm text-slate-500">Learn from others' insights while contributing your own understanding.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1.5 h-auto bg-slate-900 rounded-full" />
                      <div>
                        <h4 className="font-bold mb-1">Curated Depth</h4>
                        <p className="text-sm text-slate-500">Context-aware Study Hub provides rich resources without overwhelming complexity.</p>
                      </div>
                    </div>
                  </div>

                  <Button className="btn-gradient px-10 py-6 h-auto font-bold rounded-xl shadow-lg shadow-primary/20 gap-2">
                    Begin Your Guided Ascent <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 w-full">
                  <GuidedAscentStepper />
                </div>
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-8 tracking-tight">
               Ready to Transform Your Bible Study?
             </h2>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
               Stop settling for shallow devotionals. Start your journey toward deep, collaborative Scripture engagement with The Scriptorium's proven pedagogical framework.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold text-lg rounded-xl shadow-2xl shadow-primary/40">
                  Start Enhanced Reading
                </Button>
                <Button size="lg" variant="outline" className="px-12 py-8 h-auto font-bold text-lg rounded-xl border-slate-700 text-white hover:bg-slate-800">
                  Explore Three Paths
                </Button>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] text-slate-300 py-20 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <BookOpen className="h-6 w-6 text-accent" />
                <span className="text-white font-headline font-bold text-xl">The Scriptorium</span>
              </div>
              <p className="text-sm text-slate-500 font-body leading-relaxed pr-8">
                Bridging the gap between shallow devotionals and academic complexity through collaborative, pedagogical Bible study.
              </p>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Platform</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="/reader" className="hover:text-primary transition-colors">Simple Reader</Link></li>
                <li><Link href="/reader" className="hover:text-primary transition-colors">Enhanced Reader</Link></li>
                <li><Link href="/paths" className="hover:text-primary transition-colors">Three Paths Journey</Link></li>
                <li><Link href="/hub" className="hover:text-primary transition-colors">Study Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Community</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="#" className="hover:text-primary transition-colors">Discussion Forums</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Prayer Wall</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Group Management</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Leader Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-headline font-bold mb-8 text-lg">Support</h4>
              <ul className="space-y-4 text-sm font-body">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-500 font-body">
                © 2025 The Scriptorium. All rights reserved. Powered by API.Bible from American Bible Society.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest mr-2">Built with</span>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono uppercase">Next.js 15</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono uppercase">TypeScript</Badge>
              <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px] py-1 px-3 rounded-md font-mono uppercase">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
