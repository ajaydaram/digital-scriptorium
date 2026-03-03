
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Compass, GraduationCap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-brand-gradient p-1.5 rounded-lg shadow-sm">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-headline font-bold">The Scriptorium</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/paths" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Compass className="h-4 w-4" /> Reading Paths
          </Link>
          <Link href="/hub" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" /> Study Hub
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
            <Users className="h-4 w-4" /> Community
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/reader">
            <Button variant="default" className="btn-gradient font-semibold">
              Bible Reader
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
