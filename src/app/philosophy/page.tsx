
"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Library, 
  Compass, 
  Users, 
  Target, 
  ShieldCheck, 
  Heart,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const DESIGN_GOALS = [
  {
    title: "Biblical Literacy Development",
    description: "Build genuine familiarity with Scripture's content, context, and themes. Users should gain confidence navigating the Bible and understanding its unified message.",
    icon: Library,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Interpretive Skill Building",
    description: "Develop accurate hermeneutical practices through genre awareness, historical context understanding, and cross-reference connections.",
    icon: Compass,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "Community Formation",
    description: "Foster authentic relationships through shared study, collaborative insights, and supportive accountability in spiritual growth.",
    icon: Users,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Sustained Engagement",
    description: "Create habits that last beyond initial enthusiasm through clear progress tracking, achievable goals, and meaningful rewards.",
    icon: Target,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "Accessible Excellence",
    description: "Maintain scholarly rigor while ensuring the platform is approachable for users at any level of biblical familiarity.",
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    title: "Practical Application",
    description: "Bridge the gap between study and life through reflection prompts, discussion questions, and practical spiritual formation.",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-50"
  }
];

const UX_PRINCIPLES = [
  {
    title: "Respect for Time",
    description: "Efficient interfaces, fast loading, and meaningful content that honors users' limited study time.",
    icon: Clock
  },
  {
    title: "Content First",
    description: "Clean, distraction-free reading experience where Scripture and study content take priority.",
    icon: FileText
  },
  {
    title: "Inclusive Design",
    description: "Accessible to diverse learning styles, technical abilities, and levels of biblical background.",
    icon: Globe
  }
];

export default function PhilosophyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gradient opacity-[0.03] blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest">
              OUR MISSION
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 mb-6 tracking-tight">
              Our <span className="gradient-text">Design Philosophy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-body leading-relaxed">
              Every design decision is guided by educational effectiveness, community building, and long-term spiritual growth.
            </p>
          </div>
        </section>

        {/* Primary Design Goals */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">Primary Design Goals</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                The core pillars that define how we build tools for meaningful scripture engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DESIGN_GOALS.map((goal) => (
                <Card key={goal.title} className="border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl ${goal.bg} ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <goal.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-headline font-bold text-slate-900">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 font-body leading-relaxed">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* UX Principles */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6">
                <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest">PRINCIPLES</Badge>
                <h2 className="text-4xl font-headline font-bold tracking-tight">User Experience Principles</h2>
                <p className="text-lg text-slate-400 font-body leading-relaxed">
                  We believe that a scholarly tool should be as intuitive as it is rigorous. Our UX philosophy prioritizes the reader's journey above all else.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                {UX_PRINCIPLES.map((principle) => (
                  <div key={principle.title} className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <principle.icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-headline font-bold">{principle.title}</h4>
                    <p className="text-sm text-slate-400 font-body leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Measure Success */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-4">How We Measure Success</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                We aren't just building an app; we're measuring transformation and depth of engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Learning Outcomes */}
              <Card className="border-none shadow-lg bg-slate-50 overflow-hidden">
                <div className="bg-primary h-1.5 w-full" />
                <CardHeader className="pt-8 px-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-headline font-bold">Learning Outcomes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4">
                    {[
                      "Increased biblical familiarity through reading path completion",
                      "Improved interpretive skills demonstrated through discussions",
                      "Enhanced cross-reference recognition and thematic understanding",
                      "Growth in confidence when studying Scripture independently"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Community Engagement */}
              <Card className="border-none shadow-lg bg-slate-50 overflow-hidden">
                <div className="bg-accent h-1.5 w-full" />
                <CardHeader className="pt-8 px-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-headline font-bold">Community Engagement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4">
                    {[
                      "Active participation in group discussions and annotations",
                      "Long-term retention and consistent daily engagement",
                      "Quality of shared insights and collaborative learning",
                      "Formation of lasting study relationships and accountability"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 tracking-tight">Experience the Philosophy in Action</h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-10 text-lg font-body">
              Join us in bridging the gap from casual reading to deep, scholarly engagement with the Word of God.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/reader">
                <Button size="lg" className="btn-gradient px-12 py-8 h-auto font-bold rounded-xl shadow-xl shadow-primary/20 text-lg">
                  Launch Bible Reader
                </Button>
              </Link>
              <Link href="/paths">
                <Button variant="outline" size="lg" className="px-12 py-8 h-auto font-bold rounded-xl border-slate-200 text-lg">
                  Explore Learning Paths
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Philosophy Page Specific Footer Snippet (Reused branding) */}
      <footer className="bg-[#0F172A] text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 mb-4">
            © 2025 The Scriptorium. Powered by API.Bible from American Bible Society.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">Next.js 15</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">TypeScript</Badge>
            <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-400 text-[10px]">Tailwind CSS</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
