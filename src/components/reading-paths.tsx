
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Library, Lightbulb } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const PATHS = [
  {
    title: "Chronological Path",
    subtitle: "Narrative Framework",
    description: "Follow the story as it unfolded. See the Psalms woven into David's life and the historical triggers for the major prophets.",
    icon: <History className="h-5 w-5" />,
    features: ["Narrative Integration", "Historical Context", "Cultural Eras"],
    image: PlaceHolderImages.find(i => i.id === "path-chronological")?.imageUrl
  },
  {
    title: "Thematic Path",
    subtitle: "Theological Framework",
    description: "Explore the deep threads of doctrine. Use interactive cross-reference mapping to connect systematic theology across the testaments.",
    icon: <Lightbulb className="h-5 w-5" />,
    features: ["Cross-Reference Mapping", "Systematic Integration", "Doctrine Deep-Dives"],
    image: PlaceHolderImages.find(i => i.id === "path-thematic")?.imageUrl
  },
  {
    title: "Genre Path",
    subtitle: "Literary Framework",
    description: "Master the art of literary sensitivity. Study poetry, prophecy, and epistles with primers designed for genre-specific interpretation.",
    icon: <Library className="h-5 w-5" />,
    features: ["Genre Primers", "Sensitivity Training", "Structure Analysis"],
    image: PlaceHolderImages.find(i => i.id === "path-genre")?.imageUrl
  }
];

export function ReadingPathsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold mb-4">Choose Your Path</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our research-backed pedagogical frameworks help you engage with the Bible in ways that stick.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATHS.map((path) => (
            <Card key={path.title} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={path.image || ""} 
                  alt={path.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg">
                    {path.icon}
                  </div>
                  <span className="font-semibold">{path.subtitle}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{path.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {path.features.map(f => (
                    <Badge key={f} variant="secondary" className="bg-slate-100 text-slate-700">
                      {f}
                    </Badge>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                  Explore Path <ArrowRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
