
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
    description: "Read the Bible as one unfolding historical narrative. See how historical events triggered divine revelation across millennia.",
    icon: <History className="h-5 w-5 text-blue-600" />,
    features: [
      "Psalms integrated with David's life", 
      "Prophets placed in historical context",
      "Interactive timeline visualization",
      "Archaeological insights"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-chronological")?.imageUrl,
    bgClass: "bg-blue-50/70",
    accentColor: "text-blue-600",
    badgeText: "NARRATIVE",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: "thematic",
    title: "Grasping Theological Unity & Coherence",
    subtitle: "Thematic Path",
    description: "Trace key themes like covenant, kingdom, and justice. Discover the Bible's profound theological consistency.",
    icon: <Lightbulb className="h-5 w-5 text-emerald-600" />,
    features: [
      "Cross-reference connections", 
      "Thematic progressions mapping",
      "Theological depth building",
      "Systematic doctrine integration"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-thematic")?.imageUrl,
    bgClass: "bg-emerald-50/70",
    accentColor: "text-emerald-600",
    badgeText: "THEOLOGICAL",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200"
  },
  {
    id: "genre",
    title: "Interpreting with Literary Skill & Precision",
    subtitle: "Genre Path",
    description: "Learn to read Law, Poetry, and Prophecy with appropriate skills. Master the 'rules of the game' for each literary type.",
    icon: <Library className="h-5 w-5 text-purple-600" />,
    features: [
      "Genre-specific primers", 
      "Interpretive accuracy tools",
      "Literary sensitivity training",
      "Cultural context insights"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-genre")?.imageUrl,
    bgClass: "bg-purple-50/70",
    accentColor: "text-purple-600",
    badgeText: "LITERARY",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200"
  }
];

export function ReadingPathsSection() {
  return (
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
            <div className="absolute top-4 right-4">
              <Badge className={cn("text-[9px] font-bold tracking-widest px-3 py-1", path.badgeClass)}>
                {path.badgeText}
              </Badge>
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
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Key Features:</div>
              <div className="space-y-3 mb-10">
                {path.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("h-4 w-4 mt-0.5 shrink-0", path.accentColor)} />
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
  );
}
