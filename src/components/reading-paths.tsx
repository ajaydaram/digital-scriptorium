"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Library, Lightbulb, CheckCircle2, PenTool } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PATHS = [
  {
    id: "chronological",
    title: "The Narrative Arc: Historical Sequence",
    subtitle: "Chronological Path",
    description: "Align your pen with history. Scribe the Bible in the order events unfolded to witness God's plan through the millennia.",
    icon: <History className="h-6 w-6 text-blue-600" />,
    strategy: "Historical Contextualization",
    features: [
      "Timeline Headers for every passage", 
      "Psalms integrated with David's life",
      "Ink-coded historical links",
      "Archaeological context cues"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-chronological")?.imageUrl,
    bgClass: "bg-blue-50/50",
    accentColor: "text-blue-600",
    badgeText: "SCRIBAL HISTORY",
    badgeClass: "bg-blue-100/50 text-blue-700 border-blue-200/50",
    startRef: "Psalm 56",
    day: 15
  },
  {
    id: "thematic",
    title: "The Thematic Ledger: Golden Threads",
    subtitle: "Thematic Path",
    description: "Trace the 'Golden Threads' of scripture. Use wide margins for cross-referencing and canonical echoes from Genesis to Revelation.",
    icon: <Lightbulb className="h-6 w-6 text-emerald-600" />,
    strategy: "Canonical Reading",
    features: [
      "Cross-referencing margins", 
      "Thematic Echoes side-panel",
      "Systematic theological mapping",
      "Covenantal progression tracking"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-thematic")?.imageUrl,
    bgClass: "bg-emerald-50/50",
    accentColor: "text-emerald-600",
    badgeText: "CANONICAL UNITY",
    badgeClass: "bg-emerald-100/50 text-emerald-700 border-emerald-200/50",
    startRef: "Genesis 1:26",
    day: 22
  },
  {
    id: "genre",
    title: "Literary Form: The Genre Portfolio",
    subtitle: "Genre Path",
    description: "Master the Parables of Jesus. Adapt your lineation for poetry and parables to prevent misinterpretation.",
    icon: <Library className="h-6 w-6 text-purple-600" />,
    strategy: "Genre Awareness",
    features: [
      "Stanza-based poetic lineation", 
      "Audience identification headers",
      "Narrative arc sketches",
      "The 'One Main Truth' reflection"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-genre")?.imageUrl,
    bgClass: "bg-purple-50/50",
    accentColor: "text-purple-600",
    badgeText: "LITERARY PRECISION",
    badgeClass: "bg-purple-100/50 text-purple-700 border-purple-200/50",
    startRef: "Matthew 13:1",
    day: 1
  }
];

export function ReadingPathsSection() {
  const router = useRouter();

  const handleBeginPath = (pathId: string, day: number) => {
    router.push(`/reader?path=${pathId}&day=${day}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {PATHS.map((path) => (
        <Card 
          key={path.id} 
          className={cn(
            "group overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-500 rounded-3xl flex flex-col",
            path.bgClass
          )}
        >
          <div className="relative h-56 w-full overflow-hidden">
            <Image 
              src={path.image || "https://picsum.photos/seed/scripture/600/400"} 
              alt={path.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              data-ai-hint={path.id === "chronological" ? "history timeline" : path.id === "thematic" ? "theology connections" : "ancient scrolls"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                {path.icon}
              </div>
              <span className="font-headline font-bold text-sm uppercase tracking-widest">{path.subtitle}</span>
            </div>
            <div className="absolute top-6 right-6">
              <Badge className={cn("text-xs font-bold tracking-widest px-3 py-1", path.badgeClass)}>
                {path.badgeText}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-8">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <PenTool className={cn("h-4 w-4", path.accentColor)} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Strategy: {path.strategy}</span>
              </div>
              <CardTitle className="text-2xl font-headline font-bold leading-tight text-slate-900">
                {path.title}
              </CardTitle>
              <CardDescription className="text-slate-600 pt-3 font-body text-base leading-relaxed">
                {path.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-1">
              <div className="space-y-3.5 mb-8">
                {path.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("h-5 w-5 mt-0.5 shrink-0", path.accentColor)} />
                    <span className="text-sm font-semibold text-slate-700 font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <button 
              onClick={() => handleBeginPath(path.id, path.day)}
              className={cn(
                "flex items-center gap-3 font-headline font-bold text-base group-hover:gap-4 transition-all w-fit py-2",
                path.accentColor
              )}
            >
              Start Scribal Path <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
