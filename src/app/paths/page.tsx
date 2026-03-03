
"use client";

import { Navbar } from "@/components/navbar";
import { ReadingPathsSection } from "@/components/reading-paths";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Zap, 
  ShieldCheck, 
  MessageCircle,
  BarChart3,
  Library,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHY_THREE_PATHS = [
  {
    title: "Beginner Friendly",
    description: "Each path provides clear guidance for those new to Bible study, building confidence progressively through structured reading plans.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "Scholarly Rigorous",
    description: "Research-backed methodology ensures you develop accurate interpretive skills and deep understanding of historical and theological contexts.",
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-blue-50"
  },
  {
    title: "Community Focused",
    description: "Designed for group study with integrated discussion prompts and collaborative social annotation features built into every unit.",
    icon: MessageCircle,
    color: "text-accent",
    bg: "bg-purple-50"
  }
];

export default function ReadingPathsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-white border-b border-slate-200 py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">
              PEDAGOGICAL FRAMEWORK
            </Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Three Structured Paths to Biblical Mastery
            </h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              Our research-backed pedagogical framework guides you through three complementary approaches to Scripture study, each building essential interpretive skills and deep biblical understanding.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="space-y-12">
            <div className="flex justify-center border-b border-slate-200">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                {[
                  { id: "overview", label: "Overview", icon: BookOpen },
                  { id: "progress", label: "My Progress", icon: BarChart3 },
                  { id: "community", label: "Community", icon: Users },
                  { id: "resources", label: "Resources", icon: Library },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="bg-transparent border-none p-0 pb-4 text-slate-400 data-[state=active]:text-primary data-[state=active]:shadow-none relative after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-20 m-0 outline-none animate-in fade-in duration-500">
              {/* The actual paths */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-headline font-bold text-slate-900">Choose Your Learning Path</h2>
                  <Button variant="ghost" className="text-primary font-bold text-sm">Compare Paths <ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
                <ReadingPathsSection />
              </div>

              {/* Why Three Paths Section */}
              <div className="space-y-12 bg-white p-12 rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-headline font-bold text-slate-900">Why Three Paths?</h2>
                  <p className="text-slate-500 max-w-2xl mx-auto">
                    Our pedagogical approach addresses different learning styles and builds complementary skills for a holistic understanding of God's Word.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {WHY_THREE_PATHS.map((item) => (
                    <Card key={item.title} className="border-none shadow-none bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <item.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl font-headline font-bold text-slate-900">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-500 leading-relaxed font-body">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="m-0 outline-none">
              <Card className="border-none shadow-sm p-12 text-center space-y-6">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <BarChart3 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Track Your Mastery</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Sign in to see your personalized progress through the Guided Ascent stages and track your completion across all three paths.
                  </p>
                </div>
                <Button className="btn-gradient px-8 py-6 h-auto font-bold rounded-xl shadow-lg">Sign In to View Progress</Button>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="m-0 outline-none">
              <Card className="border-none shadow-sm p-12 text-center space-y-6">
                 <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
                  <Users className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Collaborative Learning</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Join thousands of other scholars in our path-specific discussion groups and social annotation circles.
                  </p>
                </div>
                <Button className="btn-gradient px-8 py-6 h-auto font-bold rounded-xl shadow-lg">Explore Groups</Button>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="m-0 outline-none">
               <Card className="border-none shadow-sm p-12 text-center space-y-6">
                 <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <Library className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">Path Library</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Access PDFs, scholarly primers, and archaeological charts specifically curated for your active path.
                  </p>
                </div>
                <Button variant="outline" className="px-8 py-6 h-auto font-bold rounded-xl border-slate-200">Go to Study Hub</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
