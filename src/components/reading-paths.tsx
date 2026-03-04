"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Library, Lightbulb, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PATHS = [
  {
    id: "chronological",
    title: "Understanding the Grand Historical Narrative",
    subtitle: "Chronological Path",
    description: "Read the Bible as one unfolding historical narrative. See how creation, covenants, and redemption connect across millennia.",
    icon: <History className="h-5 w-5 text-blue-600" />,
    features: [
      "Psalms integrated with David's life", 
      "Prophets placed in historical context",
      "Interactive timeline visualization",
      "Archaeological insights"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-chronological")?.imageUrl,
    bgClass: "bg-blue-50/50",
    accentColor: "text-blue-600",
    badgeText: "NARRATIVE",
    badgeClass: "bg-blue-100/50 text-blue-700 border-blue-200/50",
    startRef: "Genesis 1"
  },
  {
    id: "thematic",
    title: "Grasping Theological Unity & Coherence",
    subtitle: "Thematic Path",
    description: "Trace key themes like covenant and kingdom from Genesis to Revelation. Discover the Bible's profound theological consistency.",
    icon: <Lightbulb className="h-5 w-5 text-emerald-600" />,
    features: [
      "Cross-reference connections", 
      "Thematic progressions mapping",
      "Theological depth building",
      "Systematic doctrine integration"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-thematic")?.imageUrl,
    bgClass: "bg-emerald-50/50",
    accentColor: "text-emerald-600",
    badgeText: "THEOLOGICAL",
    badgeClass: "bg-emerald-100/50 text-emerald-700 border-emerald-200/50",
    startRef: "Genesis 1"
  },
  {
    id: "genre",
    title: "Interpreting with Literary Skill & Precision",
    subtitle: "Genre Path",
    description: "Learn to read Law, Poetry, and Prophecy with skill. Master the 'rules of the game' for each literary type.",
    icon: <Library className="h-5 w-5 text-purple-600" />,
    features: [
      "Genre-specific primers", 
      "Interpretive accuracy tools",
      "Literary sensitivity training",
      "Cultural context insights"
    ],
    image: PlaceHolderImages.find(i => i.id === "path-genre")?.imageUrl,
    bgClass: "bg-purple-50/50",
    accentColor: "text-purple-600",
    badgeText: "LITERARY",
    badgeClass: "bg-purple-100/50 text-purple-700 border-purple-200/50",
    startRef: "Genesis 1"
  }
];

export function ReadingPathsSection() {
  const router = useRouter();

  const handleBeginPath = (pathId: string, ref: string) => {
    // Navigate to the reader with path and reference as smart presets
    const encodedRef = encodeURIComponent(ref);
    router.push(`/reader?path=${pathId}&reference=${encodedRef}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PATHS.map((path) => (
        <Card 
          key={path.id} 
          className={cn(
            "group overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl flex flex-col",
            path.bgClass
          )}
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image 
              src={path.image || "https://picsum.photos/seed/scripture/600/400"} 
              alt={path.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              data-ai-hint={path.id === "chronological" ? "history timeline" : path.id === "thematic" ? "theology connections" : "ancient scrolls"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                {path.icon}
              </div>
              <span className="font-headline font-bold text-xs uppercase tracking-widest">{path.subtitle}</span>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={cn("text-[10px] font-bold tracking-widest px-2.5 py-0.5", path.badgeClass)}>
                {path.badgeText}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-headline font-bold leading-tight text-slate-900">
                {path.title}
              </CardTitle>
              <CardDescription className="text-slate-600 pt-2 font-body text-sm leading-relaxed">
                {path.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-1">
              <div className="space-y-2.5 mb-6">
                {path.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className={cn("h-4 w-4 mt-0.5 shrink-0", path.accentColor)} />
                    <span className="text-xs font-semibold text-slate-700 font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <button 
              onClick={() => handleBeginPath(path.id, path.startRef)}
              className={cn(
                "flex items-center gap-2 font-headline font-bold text-sm group-hover:gap-3 transition-all w-fit py-1",
                path.accentColor
              )}
            >
              Start Path <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
