"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Users, 
  Library, 
  TrendingUp, 
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const JOURNEY_STEPS = [
  {
    number: "1",
    title: "Discover & Choose Your Path",
    description: "Start by exploring our Three Paths framework. Take the quick assessment to find which approach best matches your learning style and current biblical familiarity. Each path offers a different lens through which to understand Scripture.",
    icon: Search,
    tags: ["Chronological Path", "Thematic Path", "Genre Path"],
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    number: "2",
    title: "Begin Daily Reading",
    description: "Start with Day 1 of your chosen path. Each daily reading includes carefully selected Bible passages, historical context, reflection prompts, and study questions. The clean interface keeps you focused on the text while providing helpful resources when needed.",
    icon: BookOpen,
    tags: ["Daily Passages", "Context Notes", "Reflection Prompts"],
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    number: "3",
    title: "Engage with Community",
    description: "Join study groups following the same reading path. Share insights through social annotations, participate in weekly discussions, and build relationships with fellow learners. Community wisdom enriches individual understanding.",
    icon: Users,
    tags: ["Study Groups", "Social Annotations", "Weekly Discussions"],
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    number: "4",
    title: "Deepen with Study Hub",
    description: "Access contextual resources as your curiosity grows. Explore historical maps, archaeological insights, word studies, and theological commentaries. The Study Hub provides depth without overwhelming the reading experience.",
    icon: Library,
    tags: ["Historical Maps", "Word Studies", "Commentaries"],
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    number: "5",
    title: "Track Progress & Celebrate Growth",
    description: "Watch your biblical literacy grow through visual progress tracking, completion badges, and reflection on insights gained. Share milestones with your community and celebrate the journey of spiritual and intellectual growth.",
    icon: TrendingUp,
    tags: ["Progress Tracking", "Achievement Badges", "Growth Reflection"],
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    number: "6",
    title: "Lead & Mentor Others",
    description: "As your confidence grows, consider leadership roles. Create study groups, mentor new users, contribute to community discussions, and help others discover the joy of systematic Bible study. Teaching deepens your own understanding.",
    icon: GraduationCap,
    tags: ["Group Leadership", "Mentorship", "Community Contribution"],
    color: "text-accent",
    bg: "bg-purple-50/50"
  }
];

export function UserJourney() {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {JOURNEY_STEPS.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-[2.5rem]">
              <CardContent className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", step.bg, step.color)}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <span className="text-5xl font-headline font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8 font-body">
                  {step.description}
                </p>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {step.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-100 text-xs text-slate-500 font-bold border-none px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <div className="p-2 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-6 px-8">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Ready to start step 1?</span>
          <button className="flex items-center gap-2 text-primary font-bold text-base hover:gap-4 transition-all">
            Find Your Path <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
