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
    bgClass: "bg-blue-50/50",
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
    bgClass: "bg-emerald-50/50",
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
    bgClass: "bg-purple-50/50",
    accentColor: "text-purple-600",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200"
  }
];

export function ReadingPathsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold mb-4">Three Structured Paths to Biblical Mastery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our research-backed pedagogical frameworks help you engage with the Bible in ways that stick, moving from simple reading to scholarly mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATHS.map((path) => (
            <Card 
              key={path.id} 
              className={cn(
                "group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl",
                path.bgClass
              )}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={path.image || ""} 
                  alt={path.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={path.id === "chronological" ? "history timeline" : path.id === "thematic" ? "theology connections" : "ancient scrolls"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    {path.icon}
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider">{path.subtitle}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                  {path.title}
                </CardTitle>
                <CardDescription className="text-slate-600 pt-2">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-8">
                  {path.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={cn("h-4 w-4 mt-0.5 shrink-0", path.accentColor)} />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={cn(
                  "flex items-center gap-2 font-bold hover:gap-3 transition-all",
                  path.accentColor
                )}>
                  Begin Path <ArrowRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
