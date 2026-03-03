"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Users, 
  Library, 
  TrendingUp, 
  GraduationCap,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const JOURNEY_STEPS = [
  {
    number: "1",
    title: "Discover & Choose Your Path",
    description: "Start by exploring our Three Paths framework. Take the quick assessment to find which approach best matches your learning style and current biblical familiarity.",
    icon: Search,
    tags: ["Chronological Path", "Thematic Path", "Genre Path"],
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    number: "2",
    title: "Begin Daily Reading",
    description: "Start with Day 1 of your chosen path. Each daily reading includes carefully selected Bible passages, historical context, reflection prompts, and study questions.",
    icon: BookOpen,
    tags: ["Daily Passages", "Context Notes", "Reflection Prompts"],
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    number: "3",
    title: "Engage with Community",
    description: "Join study groups following the same reading path. Share insights through social annotations, participate in weekly discussions, and build relationships.",
    icon: Users,
    tags: ["Study Groups", "Social Annotations", "Weekly Discussions"],
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    number: "4",
    title: "Deepen with Study Hub",
    description: "Access contextual resources as your curiosity grows. Explore historical maps, archaeological insights, word studies, and theological commentaries.",
    icon: Library,
    tags: ["Historical Maps", "Word Studies", "Commentaries"],
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    number: "5",
    title: "Track Progress & Celebrate Growth",
    description: "Watch your biblical literacy grow through visual progress tracking, completion badges, and reflection on insights gained.",
    icon: TrendingUp,
    tags: ["Progress Tracking", "Achievement Badges", "Growth Reflection"],
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    number: "6",
    title: "Lead & Mentor Others",
    description: "As your confidence grows, consider leadership roles. Create study groups, mentor new users, and help others discover the joy of systematic Bible study.",
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
            <Card className="h-full border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", step.bg, step.color)}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-4xl font-headline font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-headline font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  {step.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {step.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-50 text-[10px] text-slate-500 font-bold border-none">
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
        <div className="p-1.5 rounded-full bg-slate-50 border border-slate-200 flex items-center gap-4 px-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ready to start step 1?</span>
          <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
            Find Your Path <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
