
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Link2, 
  Languages, 
  Columns, 
  StickyNote, 
  Map, 
  History, 
  Pickaxe, 
  Library,
  ChevronRight,
  Sparkles,
  Search,
  BookText,
  FileText,
  Compass
} from "lucide-react";
import { useUser } from "@/firebase";

const QUICK_TOOLS = [
  { name: "Cross References", description: "Find related verses", count: "63,779", icon: Link2, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Word Study", description: "Original language lookup", count: "14,298", icon: Languages, color: "text-accent", bg: "bg-purple-50" },
  { name: "Parallel Passages", description: "Compare across Gospels", count: "1,247", icon: Columns, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Commentary Notes", description: "Scholar insights", count: "31,102", icon: StickyNote, color: "text-amber-500", bg: "bg-amber-50" },
];

const RESOURCE_CATEGORIES = [
  {
    title: "Biblical Commentary",
    description: "Verse-by-verse explanations from trusted scholars",
    icon: BookText,
    items: [
      { name: "Matthew Henry Commentary", detail: "31,102 • Classic" },
      { name: "ESV Study Bible Notes", detail: "25,000+ • Modern" },
      { name: "Reformer Notes", detail: "15,847 • Reformed" }
    ],
    action: "Explore Biblical Commentary"
  },
  {
    title: "Biblical Maps & Geography",
    description: "Visualize the biblical world and understand context",
    icon: Map,
    items: [
      { name: "Biblical World Atlas", detail: "127 maps • All Eras" },
      { name: "Paul's Missionary Journeys", detail: "12 detailed maps • NT" },
      { name: "Old Testament Locations", detail: "89 maps • OT" }
    ],
    action: "Explore Biblical Maps & Geography"
  },
  {
    title: "Historical Timeline",
    description: "Place events in chronological context",
    icon: History,
    items: [
      { name: "Biblical Timeline", detail: "2,400+ events • 4000 BC - 100 AD" },
      { name: "Kings & Prophets", detail: "340 events • 1050-400 BC" },
      { name: "NT Church History", detail: "150 events • 30-100 AD" }
    ],
    action: "Explore Historical Timeline"
  },
  {
    title: "Original Languages",
    description: "Hebrew and Greek word studies with definitions",
    icon: Languages,
    items: [
      { name: "Hebrew Lexicon", detail: "8,674 words • Hebrew" },
      { name: "Greek Lexicon", detail: "5,624 words • Greek" },
      { name: "Aramaic Terms", detail: "267 words • Aramaic" }
    ],
    action: "Explore Original Languages"
  },
  {
    title: "Archaeological Insights",
    description: "Discoveries that illuminate biblical texts",
    icon: Pickaxe,
    items: [
      { name: "Dead Sea Scrolls", detail: "972 texts • 1947-1956" },
      { name: "Biblical Archaeology", detail: "500+ sites • Ongoing" },
      { name: "Ancient Manuscripts", detail: "5,800+ NT manuscripts • Various" }
    ],
    action: "Explore Archaeological Insights"
  },
  {
    title: "Theological Themes",
    description: "Explore major biblical doctrines and themes",
    icon: Library,
    items: [
      { name: "Biblical Theology", detail: "200+ topics • Systematic" },
      { name: "Covenant Theology", detail: "12 covenants • Reformed" },
      { name: "Kingdom Theology", detail: "50+ aspects • Christocentric" }
    ],
    action: "Explore Theological Themes"
  }
];

export default function StudyHubPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-white border-b border-slate-200 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary font-bold uppercase tracking-widest border-primary/20">STUDY HUB</Badge>
                <h1 className="text-4xl font-headline font-bold text-slate-900">Study Hub</h1>
                <p className="text-lg text-slate-500 font-body">
                  Comprehensive biblical study resources for deeper understanding
                </p>
              </div>
              <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 text-center md:text-left">
                <div className="text-2xl font-bold text-primary">15,000+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Resources</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="library" className="space-y-12">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger 
                  value="library" 
                  className="bg-transparent border-none p-0 text-slate-400 data-[state=active]:text-primary data-[state=active]:shadow-none relative after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Resource Library
                </TabsTrigger>
                <TabsTrigger 
                  value="interactive" 
                  className="bg-transparent border-none p-0 text-slate-400 data-[state=active]:text-primary data-[state=active]:shadow-none relative after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Interactive Session
                </TabsTrigger>
              </TabsList>
              
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <TabsContent value="library" className="space-y-12 m-0 outline-none">
              {/* Quick Tools Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" /> Quick Study Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {QUICK_TOOLS.map((tool) => (
                    <Card key={tool.name} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-slate-900">{tool.name}</h3>
                          <p className="text-xs text-slate-500">{tool.description}</p>
                          <div className="text-[10px] font-bold text-slate-400 pt-1">{tool.count} items</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Main Resources Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                  <Library className="h-5 w-5 text-accent" /> Study Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {RESOURCE_CATEGORIES.map((cat) => (
                    <Card key={cat.title} className="flex flex-col border-none shadow-lg rounded-2xl overflow-hidden group">
                      <div className="bg-white p-6 pb-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                            <cat.icon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">FEATURED</Badge>
                        </div>
                        <h3 className="text-lg font-headline font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                      
                      <CardContent className="px-6 flex-1">
                        <div className="space-y-4">
                          {cat.items.map((item) => (
                            <div key={item.name} className="flex items-center justify-between group/item cursor-pointer">
                              <div className="space-y-0.5">
                                <div className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors">{item.name}</div>
                                <div className="text-[10px] font-medium text-slate-400">{item.detail}</div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-slate-200 group-hover/item:text-primary transition-colors" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      
                      <div className="p-6 pt-2">
                        <Separator className="mb-4" />
                        <Button variant="link" className="p-0 text-primary font-bold text-xs gap-1 h-auto hover:no-underline">
                          {cat.action} <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="m-0 outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
                {/* Left: Interactive Context Panel */}
                <Card className="flex flex-col border-none shadow-xl overflow-hidden">
                  <div className="bg-brand-gradient h-1.5 w-full" />
                  <CardHeader>
                    <CardTitle className="text-xl font-headline font-bold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" /> Active Study Session
                    </CardTitle>
                    <CardDescription>Persist your scholarly annotations and explore narrative context.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-center items-center text-center p-12 space-y-6">
                    <div className="max-w-md space-y-4">
                      <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-headline font-bold">Ready to Dive Deeper?</h3>
                      <p className="text-slate-500 leading-relaxed">
                        Open a passage in the Reader to begin an interactive study session with the AI Pedagogical Guide.
                      </p>
                      <Button className="btn-gradient px-8 py-6 h-auto font-bold rounded-xl shadow-lg shadow-primary/20">
                        Go to Bible Reader
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Right: Mock Feed for Context */}
                <Card className="border-none shadow-xl flex flex-col overflow-hidden">
                   <ScrollArea className="flex-1 p-6">
                      <div className="space-y-6">
                        <div className="flex gap-4 opacity-60">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">JD</div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">JD (Scholastic Lead)</span>
                              <Badge variant="outline" className="text-[9px]">GREEK LEXICON</Badge>
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                              <p className="text-sm text-slate-700 leading-relaxed italic">
                                The Greek word here is <strong className="text-primary">agape</strong>. It represents covenantal commitment rather than simple emotion.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-4">
                           <div className="flex items-center gap-2 text-primary">
                             <Sparkles className="h-4 w-4" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">AI Pedagogical Insight</span>
                           </div>
                           <p className="text-sm text-slate-700 leading-relaxed">
                             This passage serves as the pivot point in the Grand Historical Narrative, moving from the legal strictures of the old covenant to the redemptive grace of the new.
                           </p>
                        </div>
                      </div>
                   </ScrollArea>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
