
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Library, Lightbulb, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const PATHS = [
  {
    id: "chronological",
    title: "Understanding the Grand Historical Narrative",
    subtitle: "Chronological Path",
    description: "Follow the story as it unfolded. See how historical events triggered divine revelation.",
    icon: <History className="h-5 w-5 text-blue-600" />,
    features: ["Psalms integrated with David's life", "Prophets in historical context"],
    image: PlaceHolderImages.find(i => i.id === "path-chronological")?.imageUrl,
    bgClass: "bg-blue-50/70",
    accentColor: "text-blue-600",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: "thematic",
    title: "Grasping Theological Unity & Coherence",
    subtitle: "Thematic Path",
    description: "Explore the deep threads of doctrine across both testaments.",
    icon: <Lightbulb className="h-5 w-5 text-emerald-600" />,
    features: ["Cross-reference connections", "Systematic doctrine integration"],
    image: PlaceHolderImages.find(i => i.id === "path-thematic")?.imageUrl,
    bgClass: "bg-emerald-50/70",
    accentColor: "text-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  {
    id: "genre",
    title: "Interpreting with Literary Skill & Precision",
    subtitle: "Genre Path",
    description: "Master the art of literary sensitivity for poetic and prophetic texts.",
    icon: <Library className="h-5 w-5 text-purple-600" />,
    features: ["Genre-specific primers", "Interpretive accuracy tools"],
    image: PlaceHolderImages.find(i => i.id === "path-genre")?.imageUrl,
    bgClass: "bg-purple-50/70",
    accentColor: "text-purple-600",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200"
  }
];

export function ReadingPathsSection() {
  return (
    <section className="py-24 bg-white" id="paths">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-bold">SCHOLARLY FRAMEWORKS</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-slate-900">
            Three Structured Paths to Biblical Mastery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
            Our research-backed pedagogical frameworks help you engage with the Bible in ways that stick, moving from simple reading to scholarly mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PATHS.map((path) => (
            <Card 
              key={path.id} 
              className={cn(
                "group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col",
                path.bgClass
              )}
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={path.image || "https://picsum.photos/seed/scripture/600/400"} 
                  alt={path.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint={path.id === "chronological" ? "history timeline" : path.id === "thematic" ? "theology connections" : "ancient scrolls"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                    {path.icon}
                  </div>
                  <span className="font-headline font-bold text-sm uppercase tracking-[0.2em]">{path.subtitle}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-headline font-bold leading-[1.2] text-slate-900 group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 pt-4 font-body leading-relaxed text-base">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0 flex-1">
                  <div className="space-y-4 mb-10">
                    {path.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={cn("h-5 w-5 mt-0.5 shrink-0", path.accentColor)} />
                        <span className="text-sm font-semibold text-slate-700 font-body">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <button className={cn(
                  "flex items-center gap-3 font-headline font-bold group-hover:gap-5 transition-all w-fit py-2",
                  path.accentColor
                )}>
                  Begin Path <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
