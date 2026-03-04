
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
  ChevronRight,
  History,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PATH_CARDS = [
  {
    id: "chronological",
    title: "Chronological Path",
    description: "Follow the Bible's timeline. Read the Bible in the order events actually happened.",
    icon: History,
    color: "text-blue-500",
    bg: "bg-blue-50",
    ref: "Genesis 1"
  },
  {
    id: "thematic",
    title: "Thematic Path",
    description: "Trace big ideas through Scripture. Follow major themes like kingdom, justice, or love.",
    icon: Lightbulb,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    ref: "Genesis 1"
  },
  {
    id: "genre",
    title: "Genre Path",
    description: "Learn to read literature types. Master poetry, prophecy, parables, and letters.",
    icon: Library,
    color: "text-purple-500",
    bg: "bg-purple-50",
    ref: "Genesis 1"
  }
];

export default function ReadingPathsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">
              PEDAGOGICAL FRAMEWORK
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              Move beyond random reading. Each path provides a structured "smart preset" to help you master biblical interpretive skills.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PATH_CARDS.map((path) => (
              <Card key={path.id} className="border-none shadow-xl rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className={`h-2 w-full ${path.id === 'chronological' ? 'bg-blue-500' : path.id === 'thematic' ? 'bg-emerald-500' : 'bg-purple-500'}`} />
                <CardHeader className="p-8">
                  <div className={`w-12 h-12 rounded-2xl ${path.bg} ${path.color} flex items-center justify-center mb-6`}>
                    <path.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold">{path.title}</CardTitle>
                  <CardDescription className="text-slate-500 pt-2 leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href={`/reader?path=${path.id}&reference=${encodeURIComponent(path.ref)}`}>
                    <Button className="w-full btn-gradient font-bold h-12 rounded-xl text-sm group-hover:shadow-lg transition-all">
                      Start Your Journey <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
